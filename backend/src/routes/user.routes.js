import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  toggleUserStatus,
  deleteUser,
  getUserStats,
  verifyUserKYC,
  getUserActivity,
  getUserDashboard,
  getUserProfile,
  updateUserProfile
} from '../controllers/user.controller.js';
import { authMiddleware, requireAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// User routes (accessible by the user themselves)
router.get('/dashboard', getUserDashboard);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Admin only routes
router.get('/', requireAdmin, getAllUsers);
router.get('/stats', requireAdmin, getUserStats);
router.get('/:userId', requireAdmin, getUserById);
router.put('/:userId', requireAdmin, updateUser);
router.patch('/:userId/status', requireAdmin, toggleUserStatus);
router.delete('/:userId', requireAdmin, deleteUser);
router.patch('/:userId/kyc', requireAdmin, verifyUserKYC);
router.get('/:userId/activity', requireAdmin, getUserActivity);

export default router;
