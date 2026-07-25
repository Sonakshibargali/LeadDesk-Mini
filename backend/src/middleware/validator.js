import { body, param, validationResult } from 'express-validator';

// Generic validation runner
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Lead submission validation rules
export const leadSubmissionRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('budget')
    .trim()
    .notEmpty().withMessage('Budget range is required')
    .isIn(['<₹50k', '₹50k-₹2L', '₹2L-₹5L', '₹5L+']).withMessage('Invalid budget range specified'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters long')
];

// Lead status update validation rules
export const leadStatusUpdateRules = [
  param('id')
    .trim()
    .notEmpty().withMessage('Lead ID is required'),
  
  body('status')
    .trim()
    .notEmpty().withMessage('Status is required')
    .isIn(['NEW', 'CONTACTED', 'CLOSED']).withMessage('Status must be either NEW, CONTACTED, or CLOSED')
];

// Login validation rules
export const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
];

