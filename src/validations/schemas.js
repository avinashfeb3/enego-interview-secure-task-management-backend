import { z } from 'zod';

// Auth Validation Schemas
export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Task Validation Schemas
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional().default(''),
  priority: z.enum(['Low', 'Medium', 'High']).default('Medium'),
  status: z.enum(['Pending', 'Completed']).default('Pending'),
  dueDate: z.string().datetime('Invalid date format'),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long').optional(),
  description: z.string().max(1000, 'Description too long').optional(),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
  status: z.enum(['Pending', 'Completed']).optional(),
  dueDate: z.string().optional(),
}).strict(false);

export const querySchema = z.object({
  page: z.string().regex(/^\d+$/, 'Page must be a number').optional().default('1'),
  limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional().default('10'),
  status: z.enum(['Pending', 'Completed']).optional(),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
  search: z.string().optional(),
});
