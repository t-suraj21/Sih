import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Mock SOS alerts storage
const mockSOSAlerts = [];

// All SOS routes require authentication
router.use(authenticate);

// POST /api/sos - Send SOS alert
router.post('/', async (req, res) => {
  try {
    const { location, message } = req.body;

    const sosAlert = {
      id: `SOS${Date.now().toString(36).toUpperCase()}`,
      userId: req.user.id,
      userName: req.user.name,
      userPhone: req.user.phone,
      location,
      message,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockSOSAlerts.push(sosAlert);

    // In production, this would:
    // 1. Send SMS to emergency contacts
    // 2. Notify local authorities
    // 3. Send push notifications to admin dashboard
    // 4. Log GPS coordinates

    res.status(201).json({
      success: true,
      message: 'SOS alert sent successfully. Help is on the way!',
      data: { sosAlert }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send SOS alert'
    });
  }
});

// GET /api/sos/:id/status - Check SOS status
router.get('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const sosAlert = mockSOSAlerts.find(alert => 
      alert.id === id && alert.userId === req.user.id
    );

    if (!sosAlert) {
      return res.status(404).json({
        success: false,
        message: 'SOS alert not found'
      });
    }

    res.json({
      success: true,
      data: { sosAlert }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get SOS status'
    });
  }
});

// GET /api/sos - Get all SOS alerts (admin only)
router.get('/', requireAdmin, async (req, res) => {
  try {
    res.json({
      success: true,
      data: { sosAlerts: mockSOSAlerts }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get SOS alerts'
    });
  }
});

// PUT /api/sos/:id/resolve - Resolve SOS alert (admin only)
router.put('/:id/resolve', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { resolution } = req.body;

    const alertIndex = mockSOSAlerts.findIndex(alert => alert.id === id);

    if (alertIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'SOS alert not found'
      });
    }

    mockSOSAlerts[alertIndex].status = 'resolved';
    mockSOSAlerts[alertIndex].resolution = resolution;
    mockSOSAlerts[alertIndex].resolvedAt = new Date();
    mockSOSAlerts[alertIndex].resolvedBy = req.user.id;

    res.json({
      success: true,
      message: 'SOS alert resolved successfully',
      data: { sosAlert: mockSOSAlerts[alertIndex] }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to resolve SOS alert'
    });
  }
});

export default router;
