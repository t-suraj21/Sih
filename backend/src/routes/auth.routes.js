import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  sendPhoneOTP,
  verifyPhoneOTP,
  refreshToken,
  changePassword
} from '../controllers/auth.controller.js';
import { authMiddleware, rateLimitByUser } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { body } from 'express-validator';

const router = express.Router();

// Registration validation
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('role')
    .optional()
    .isIn(['tourist', 'vendor', 'admin'])
    .withMessage('Role must be either tourist, vendor, or admin')
];

// Login validation
const loginValidation = [
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Phone OTP validation
const phoneOTPValidation = [
  body('phone')
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number')
];

// OTP verification validation
const verifyOTPValidation = [
  body('phone')
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('OTP must be a 6-digit number')
];

// Change password validation
const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
];

// Public routes
router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);
router.post('/refresh-token', refreshToken);

// OTP routes
router.post('/send-otp', phoneOTPValidation, validateRequest, sendPhoneOTP);
router.post('/verify-otp', verifyOTPValidation, validateRequest, verifyPhoneOTP);

// Protected routes
router.use(authMiddleware); // All routes below this middleware require authentication

router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/change-password', 
  changePasswordValidation, 
  validateRequest, 
  rateLimitByUser(5, 15 * 60 * 1000), // 5 attempts per 15 minutes
  changePassword
);

export default router;