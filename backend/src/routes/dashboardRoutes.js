import express from 'express';
import { getStats } from '../controllers/dashboardController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// GET /api/dashboard - Get lead status metrics (PROTECTED)
router.get('/', authMiddleware, getStats);

export default router;

