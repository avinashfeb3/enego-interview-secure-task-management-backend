import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { protect, validateRequest, validateQuery } from '../middleware/auth.js';
import { createTaskSchema, updateTaskSchema, querySchema } from '../validations/schemas.js';

const router = express.Router();

// Apply protection middleware to all routes
router.use(protect);

// Task routes
router.post('/', validateRequest(createTaskSchema), taskController.createTask);
router.get('/', validateQuery(querySchema), taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validateRequest(updateTaskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
