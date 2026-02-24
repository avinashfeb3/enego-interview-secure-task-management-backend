import express from 'express';
import * as authController from '../controllers/authController.js';
import { protect, validateRequest } from '../middleware/auth.js';
import { signupSchema, loginSchema } from '../validations/schemas.js';

const router = express.Router();

router.post('/signup', validateRequest(signupSchema), authController.signup);
router.post('/login', validateRequest(loginSchema), authController.login);
router.get('/me', protect, authController.getMe);

export default router;
