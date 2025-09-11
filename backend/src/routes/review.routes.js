import express from 'express';
import { verifyJWT, requireRole, optionalJWT } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { body, query } from 'express-validator';

const router = express.Router();

// Placeholder controllers - implement these based on Review model
const addReview = (req, res) => {
  res.json({ success: true, message: 'Review endpoint - to be implemented' });
};

const getHotelReviews = (req, res) => {
  res.json({ success: true, message: 'Hotel reviews endpoint - to be implemented' });
};

const updateReview = (req, res) => {
  res.json({ success: true, message: 'Update review endpoint - to be implemented' });
};

const deleteReview = (req, res) => {
  res.json({ success: true, message: 'Delete review endpoint - to be implemented' });
};

// Validation schemas
const addReviewValidation = [
  body('hotelId')
    .isMongoId()
    .withMessage('Valid hotel ID is required'),
  body('bookingId')
    .isMongoId()
    .withMessage('Valid booking ID is required'),
  body('rating.overall')
    .isInt({ min: 1, max: 5 })
    .withMessage('Overall rating must be between 1 and 5'),
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Comment must be between 10 and 1000 characters')
];

// Public routes
router.get('/hotel/:hotelId', optionalJWT, getHotelReviews);

// Protected routes
router.use(verifyJWT);

router.post('/', addReviewValidation, validateRequest, addReview);
router.put('/:id', addReviewValidation, validateRequest, updateReview);
router.delete('/:id', deleteReview);

export default router;