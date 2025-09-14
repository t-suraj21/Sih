import express from 'express';
import {
  getEcoTourismOptions,
  getEcoTourismById,
  getFeaturedEcoTourism,
  getEcoTourismByCategory,
  getEcoTourismStats,
  searchEcoTourism,
  getNearbyEcoTourism,
  createEcoTourism,
  updateEcoTourism,
  deleteEcoTourism,
  toggleFeatured
} from '../controllers/ecotourism.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getEcoTourismOptions);
router.get('/featured', getFeaturedEcoTourism);
router.get('/stats', getEcoTourismStats);
router.get('/search', searchEcoTourism);
router.get('/nearby', getNearbyEcoTourism);
router.get('/category/:category', getEcoTourismByCategory);
router.get('/:id', getEcoTourismById);

// Protected routes (Admin only)
router.post('/', authMiddleware, createEcoTourism);
router.put('/:id', authMiddleware, updateEcoTourism);
router.delete('/:id', authMiddleware, deleteEcoTourism);
router.patch('/:id/featured', authMiddleware, toggleFeatured);

export default router;
