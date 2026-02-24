import * as taskService from '../services/taskService.js';

export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user.id);
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getTasks(req.user.id, req.query);

    res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: result.tasks,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Task retrieved successfully',
      task,
    });
  } catch (error) {
    if (error.message.includes('unauthorized')) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.user.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    if (error.message.includes('unauthorized')) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    if (error.message.includes('unauthorized')) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
