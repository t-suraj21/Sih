import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate, requireAdmin);

// GET /api/admin/dashboard - Get admin dashboard metrics
router.get('/dashboard', async (req, res) => {
  try {
    // Mock dashboard metrics
    const metrics = {
      totalUsers: 1250,
      totalBookings: 3420,
      totalHotels: 156,
      totalRevenue: 2450000,
      activeSOSAlerts: 2,
      pendingVerifications: 15,
      monthlyGrowth: {
        users: 12.5,
        bookings: 8.3,
        revenue: 15.7
      },
      recentActivity: [
        { type: 'booking', message: 'New booking created', timestamp: new Date() },
        { type: 'user', message: 'New user registered', timestamp: new Date() },
        { type: 'sos', message: 'SOS alert resolved', timestamp: new Date() }
      ]
    };

    res.json({
      success: true,
      data: { metrics }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard metrics'
    });
  }
});

// POST /api/admin/verify-hotel/:id - Verify hotel
router.post('/verify-hotel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { verified, notes } = req.body;

    // Mock hotel verification
    res.json({
      success: true,
      message: `Hotel ${verified ? 'verified' : 'rejected'} successfully`,
      data: {
        hotelId: id,
        verified,
        notes,
        verifiedBy: req.user.id,
        verifiedAt: new Date()
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify hotel'
    });
  }
});

// PUT /api/admin/block-user/:id - Block/unblock user
router.put('/block-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { blocked, reason } = req.body;

    // Mock user blocking
    res.json({
      success: true,
      message: `User ${blocked ? 'blocked' : 'unblocked'} successfully`,
      data: {
        userId: id,
        blocked,
        reason,
        actionBy: req.user.id,
        actionAt: new Date()
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user status'
    });
  }
});

// GET /api/admin/users - Get all users with pagination
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, role, status } = req.query;

    // Mock users data
    const users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'tourist',
        verified: true,
        blocked: false,
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Hotel Owner',
        email: 'owner@hotel.com',
        role: 'vendor',
        verified: true,
        blocked: false,
        createdAt: new Date()
      }
    ];

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(users.length / limit),
          count: users.length,
          totalCount: users.length
        }
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get users'
    });
  }
});

// GET /api/admin/bookings - Get all bookings with pagination
router.get('/bookings', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    // Mock bookings data
    const bookings = [
      {
        id: 'YTR123',
        userId: 1,
        hotelId: 1,
        status: 'confirmed',
        totalAmount: 3500,
        createdAt: new Date()
      }
    ];

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(bookings.length / limit),
          count: bookings.length,
          totalCount: bookings.length
        }
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get bookings'
    });
  }
});

export default router;
