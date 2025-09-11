import express from 'express';
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentDetails,
  refundPayment,
  getPaymentStats
} from '../controllers/payment.controller.js';
import { verifyJWT, requireRole } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { body } from 'express-validator';

const router = express.Router();

// All payment routes require authentication
router.use(verifyJWT);

// Validation schemas
const createPaymentOrderValidation = [
  body('bookingId')
    .isMongoId()
    .withMessage('Valid booking ID is required')
];

const verifyPaymentValidation = [
  body('razorpay_order_id')
    .notEmpty()
    .withMessage('Razorpay order ID is required'),
  body('paymentMethod')
    .optional()
    .isIn(['card', 'upi', 'netbanking', 'wallet', 'emi'])
    .withMessage('Invalid payment method')
];

const refundPaymentValidation = [
  body('amount')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('Refund amount must be greater than 0'),
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Refund reason must not exceed 500 characters')
];

// Payment routes
router.post('/create-order', createPaymentOrderValidation, validateRequest, createPaymentOrder);
router.post('/verify', verifyPaymentValidation, validateRequest, verifyPayment);
router.get('/:id', getPaymentDetails);

// Admin routes
router.post('/:id/refund', 
  requireRole('admin'), 
  refundPaymentValidation, 
  validateRequest, 
  refundPayment
);

router.get('/admin/stats', requireRole('admin'), getPaymentStats);

export default router;