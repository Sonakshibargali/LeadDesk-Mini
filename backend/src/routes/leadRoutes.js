import express from 'express';
import { createLead, getLeads, updateLeadStatus } from '../controllers/leadController.js';
import { leadSubmissionRules, leadStatusUpdateRules, validate } from '../middleware/validator.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// POST /api/leads - Create a new lead (Lead Submission - PUBLIC)
router.post('/', leadSubmissionRules, validate, createLead);

// GET /api/leads - Retrieve all leads (with search & filters - PROTECTED)
router.get('/', authMiddleware, getLeads);

// PATCH /api/leads/:id/status - Update lead status (PROTECTED)
router.patch('/:id/status', authMiddleware, leadStatusUpdateRules, validate, updateLeadStatus);

export default router;

