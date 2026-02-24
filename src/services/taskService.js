import Task from '../models/Task.js';

export const createTask = async (taskData, userId) => {
  const task = await Task.create({
    ...taskData,
    userId,
  });
  return task;
};

export const getTasks = async (userId, { page, limit, status, priority, search }) => {
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  // Build filter object
  const filter = { userId };

  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  if (search) {
    filter.$text = { $search: search };
  }

  // Get total count for pagination
  const total = await Task.countDocuments(filter);

  // Get paginated tasks
  const tasks = await Task.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum)
    .lean();

  return {
    tasks,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

export const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({
    _id: taskId,
    userId,
  });

  if (!task) {
    throw new Error('Task not found or unauthorized');
  }

  return task;
};

export const updateTask = async (taskId, userId, updateData) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    updateData,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new Error('Task not found or unauthorized');
  }

  return task;
};

export const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    userId,
  });

  if (!task) {
    throw new Error('Task not found or unauthorized');
  }

  return task;
};
