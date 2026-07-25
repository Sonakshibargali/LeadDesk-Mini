import express from 'express';
import { login } from '../controllers/authController.js';
import { loginRules, validate } from '../middleware/validator.js';

const router = express.Router();

// POST /api/auth/login - Admin Login
router.post('/login', loginRules, validate, login);

export default router;
