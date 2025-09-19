import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getVendorServices,
  updateServiceStatus,
  getServiceStats,
  searchServices
} from '../controllers/service.controller.js';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { body, param, query } from 'express-validator';

const router = express.Router();

// Validation schemas
const createServiceValidation = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Service name must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('type')
    .isIn(['Hotel/Resort', 'Tour Guide', 'Transport Service', 'Restaurant/Food', 'Adventure Sports', 'Cultural Experience', 'Travel Agency', 'Eco Tourism'])
    .withMessage('Invalid service type'),
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('location.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('pricing.basePrice')
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number'),
  body('pricing.unit')
    .optional()
    .isIn(['per person', 'per night', 'per day', 'per group', 'fixed'])
    .withMessage('Invalid pricing unit')
];

const updateServiceValidation = [
  param('serviceId').isMongoId().withMessage('Invalid service ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Service name must be between 3 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('type')
    .optional()
    .isIn(['Hotel/Resort', 'Tour Guide', 'Transport Service', 'Restaurant/Food', 'Adventure Sports', 'Cultural Experience', 'Travel Agency', 'Eco Tourism'])
    .withMessage('Invalid service type'),
  body('pricing.basePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number')
];

// Public routes
router.get('/', getAllServices);
router.get('/search', searchServices);
router.get('/:serviceId', 
  param('serviceId').isMongoId().withMessage('Invalid service ID'),
  validateRequest,
  getServiceById
);

// Vendor routes (require authentication and vendor role)
router.post('/', 
  authMiddleware,
  requireRole(['vendor']),
  createServiceValidation,
  validateRequest,
  createService
);

router.put('/:serviceId',
  authMiddleware,
  requireRole(['vendor', 'admin']),
  updateServiceValidation,
  validateRequest,
  updateService
);

router.delete('/:serviceId',
  authMiddleware,
  requireRole(['vendor', 'admin']),
  param('serviceId').isMongoId().withMessage('Invalid service ID'),
  validateRequest,
  deleteService
);

router.get('/vendor/:vendorId?',
  authMiddleware,
  param('vendorId').optional().isMongoId().withMessage('Invalid vendor ID'),
  validateRequest,
  getVendorServices
);

// Admin routes
router.patch('/:serviceId/status',
  authMiddleware,
  requireRole(['admin']),
  param('serviceId').isMongoId().withMessage('Invalid service ID'),
  body('status')
    .isIn(['draft', 'pending', 'active', 'suspended', 'rejected'])
    .withMessage('Invalid status'),
  validateRequest,
  updateServiceStatus
);

router.get('/stats/overview',
  authMiddleware,
  requireRole(['vendor', 'admin']),
  getServiceStats
);

export default router;
