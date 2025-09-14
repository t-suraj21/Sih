import express from 'express';
import {
  getAllAttractions,
  getAttractionById,
  searchAttractions,
  getFeaturedAttractions,
  getAttractionsByCategory,
  getAttractionCategories,
  getAttractionStats
} from '../controllers/attraction.controller.js';

const router = express.Router();

// Public routes
router.get('/stats', getAttractionStats);
router.get('/categories', getAttractionCategories);
router.get('/featured', getFeaturedAttractions);
router.get('/category/:category', getAttractionsByCategory);
router.get('/search', searchAttractions);
router.get('/:id', getAttractionById);
router.get('/', getAllAttractions);

export default router;
