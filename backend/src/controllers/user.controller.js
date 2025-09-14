import User from '../models/User.js';
import Booking from '../models/Booking.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get all users (Admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    role, 
    status, 
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build filter object
  const filter = {};
  
  if (role && role !== 'all') {
    filter.role = role;
  }
  
  if (status && status !== 'all') {
    filter.isActive = status === 'active';
  }
  
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ];
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  // Execute query with pagination
  const skip = (page - 1) * limit;
  
  const [users, totalUsers] = await Promise.all([
    User.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-password'),
    User.countDocuments(filter)
  ]);

  // Calculate pagination info
  const totalPages = Math.ceil(totalUsers / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const pagination = {
    currentPage: parseInt(page),
    totalPages,
    totalUsers,
    hasNextPage,
    hasPrevPage,
    limit: parseInt(limit)
  };

  res.json(
    new ApiResponse(200, {
      users,
      pagination
    }, 'Users retrieved successfully')
  );
});

// Get user by ID
export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  const user = await User.findById(userId).select('-password');
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(
    new ApiResponse(200, { user }, 'User retrieved successfully')
  );
});

// Update user (Admin only)
export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  // Remove sensitive fields that shouldn't be updated via this endpoint
  delete updates.password;
  delete updates._id;
  delete updates.createdAt;
  delete updates.updatedAt;

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(
    new ApiResponse(200, { user }, 'User updated successfully')
  );
});

// Suspend/Activate user
export const toggleUserStatus = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { isActive, reason } = req.body;

  const user = await User.findById(userId);
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.isActive = isActive;
  
  if (!isActive && reason) {
    user.suspensionReason = reason;
  } else if (isActive) {
    user.suspensionReason = undefined;
  }

  await user.save();

  res.json(
    new ApiResponse(200, { 
      user: user.toJSON() 
    }, `User ${isActive ? 'activated' : 'suspended'} successfully`)
  );
});

// Delete user (Admin only)
export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  await User.findByIdAndDelete(userId);

  res.json(
    new ApiResponse(200, null, 'User deleted successfully')
  );
});

// Get user statistics
export const getUserStats = asyncHandler(async (req, res) => {
  const stats = await User.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        activeUsers: {
          $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
        },
        suspendedUsers: {
          $sum: { $cond: [{ $eq: ['$isActive', false] }, 1, 0] }
        },
        tourists: {
          $sum: { $cond: [{ $eq: ['$role', 'tourist'] }, 1, 0] }
        },
        vendors: {
          $sum: { $cond: [{ $eq: ['$role', 'vendor'] }, 1, 0] }
        },
        admins: {
          $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] }
        },
        verifiedEmails: {
          $sum: { $cond: [{ $eq: ['$emailVerified', true] }, 1, 0] }
        },
        verifiedPhones: {
          $sum: { $cond: [{ $eq: ['$phoneVerified', true] }, 1, 0] }
        },
        kycVerified: {
          $sum: { $cond: [{ $eq: ['$kycVerified', true] }, 1, 0] }
        }
      }
    }
  ]);

  const userStats = stats[0] || {
    totalUsers: 0,
    activeUsers: 0,
    suspendedUsers: 0,
    tourists: 0,
    vendors: 0,
    admins: 0,
    verifiedEmails: 0,
    verifiedPhones: 0,
    kycVerified: 0
  };

  // Get registration trends (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const registrationTrends = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDaysAgo }
      }
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          role: '$role'
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.date': 1 }
    }
  ]);

  res.json(
    new ApiResponse(200, {
      stats: userStats,
      trends: registrationTrends
    }, 'User statistics retrieved successfully')
  );
});

// Verify user KYC
export const verifyUserKYC = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { verified, notes } = req.body;

  const user = await User.findById(userId);
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.kycVerified = verified;
  if (notes) {
    user.kycNotes = notes;
  }

  await user.save();

  res.json(
    new ApiResponse(200, { 
      user: user.toJSON() 
    }, `User KYC ${verified ? 'verified' : 'rejected'} successfully`)
  );
});

// Get user activity logs
export const getUserActivity = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 20 } = req.query;

  const user = await User.findById(userId);
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // This would typically come from a separate activity/audit log model
  // For now, we'll return basic user info and login history
  const activity = {
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    // In a real implementation, you'd fetch from an ActivityLog model
    logs: []
  };

  res.json(
    new ApiResponse(200, { activity }, 'User activity retrieved successfully')
  );
});

// Get User Dashboard Data
export const getUserDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    // Get user's bookings with hotel details
    const bookings = await User.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'user',
          as: 'bookings',
          pipeline: [
            {
              $lookup: {
                from: 'hotels',
                localField: 'hotel',
                foreignField: '_id',
                as: 'hotel'
              }
            },
            { $unwind: '$hotel' },
            { $sort: { createdAt: -1 } },
            { $limit: 5 }
          ]
        }
      }
    ]);

    const userBookings = bookings[0]?.bookings || [];

    // Get booking statistics
    const bookingStats = await User.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'user',
          as: 'allBookings'
        }
      },
      {
        $project: {
          totalBookings: { $size: '$allBookings' },
          completedTrips: {
            $size: {
              $filter: {
                input: '$allBookings',
                cond: { $eq: ['$$this.status', 'completed'] }
              }
            }
          },
          confirmedBookings: {
            $size: {
              $filter: {
                input: '$allBookings',
                cond: { $eq: ['$$this.status', 'confirmed'] }
              }
            }
          }
        }
      }
    ]);

    const stats = bookingStats[0] || {
      totalBookings: 0,
      completedTrips: 0,
      confirmedBookings: 0
    };

    // Get user's favorite destinations (mock for now - you can implement favorites later)
    const favorites = [];

    // Get recent notifications (mock for now)
    const notifications = [
      {
        id: 1,
        type: 'booking',
        title: 'Welcome to Yatra!',
        message: 'Start exploring amazing destinations and book your perfect stay.',
        time: '1 day ago',
        read: false
      }
    ];

    // Calculate eco points (mock calculation based on completed trips)
    const ecoPoints = stats.completedTrips * 100;
    
    // Determine loyalty level
    let loyaltyLevel = 'Explorer';
    if (stats.completedTrips >= 10) loyaltyLevel = 'Adventurer';
    if (stats.completedTrips >= 25) loyaltyLevel = 'Legend';

    const dashboardData = {
      user: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        phone: req.user.phone
      },
      stats: {
        totalBookings: stats.totalBookings,
        completedTrips: stats.completedTrips,
        savedDestinations: favorites.length,
        ecoPoints,
        loyaltyLevel
      },
      recentBookings: userBookings.map(booking => ({
        id: booking._id,
        type: 'Hotel',
        title: booking.hotel.name,
        destination: `${booking.hotel.city}, ${booking.hotel.state}`,
        date: booking.checkIn.toISOString().split('T')[0],
        status: booking.status,
        amount: booking.pricing.totalAmount,
        image: booking.hotel.images?.[0] || '/api/placeholder/300/200'
      })),
      favorites,
      notifications
    };

    res.json(
      new ApiResponse(200, dashboardData, 'Dashboard data retrieved successfully')
    );
  } catch (error) {
    console.error('Dashboard data error:', error);
    throw new ApiError(500, 'Failed to retrieve dashboard data');
  }
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(
    new ApiResponse(200, { user }, 'User profile retrieved successfully')
  );
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const updates = req.body;

  // Remove sensitive fields that shouldn't be updated via this endpoint
  delete updates.password;
  delete updates.role;
  delete updates.emailVerified;
  delete updates.phoneVerified;
  delete updates.kycVerified;
  delete updates._id;
  delete updates.createdAt;
  delete updates.updatedAt;

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(
    new ApiResponse(200, { user }, 'Profile updated successfully')
  );
});

export default {
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
};
