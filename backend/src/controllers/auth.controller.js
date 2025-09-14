import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config/config.js';
import { redis } from '../config/database.js';
import { sendOTP, verifyOTP } from '../services/sms.service.js';
import { sendWelcomeEmail } from '../services/email.service.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Generate JWT tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
  
  const refreshToken = jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });

  return { accessToken, refreshToken };
};

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role = 'tourist' } = req.body;

  // Validation
  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email, and password are required');
  }

  if (password.length < config.security.passwordMinLength) {
    throw new ApiError(400, `Password must be at least ${config.security.passwordMinLength} characters long`);
  }

  // Check if user already exists
  const query = { email };
  if (phone) {
    query.$or = [{ email }, { phone }];
  }
  
  const existingUser = await User.findOne(query);

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ApiError(409, 'User with this email already exists');
    }
    if (phone && existingUser.phone === phone) {
      throw new ApiError(409, 'User with this phone number already exists');
    }
  }

  // Create user
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    phone: phone?.trim(),
    role,
    emailVerified: false,
    phoneVerified: false
  });

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Store refresh token in Redis (if available)
  try {
    await redis.set(`refresh_token:${user._id}`, refreshToken, 30 * 24 * 60 * 60); // 30 days
  } catch (error) {
    console.warn('Redis not available, refresh token not cached:', error.message);
  }

  // Send welcome email
  try {
    await sendWelcomeEmail(user.email, user.name);
  } catch (emailError) {
    console.error('Welcome email failed:', emailError);
    // Don't fail registration if email fails
  }

  // Remove password from response
  const userResponse = user.toJSON();

  res.status(201).json(
    new ApiResponse(201, {
      user: userResponse,
      token: accessToken,
      refreshToken
    }, 'User registered successfully')
  );
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, phone } = req.body;

  if (!email && !phone) {
    throw new ApiError(400, 'Email or phone number is required');
  }

  if (!password) {
    throw new ApiError(400, 'Password is required');
  }

  // Find user
  const query = email 
    ? { email: email.toLowerCase().trim() }
    : { phone: phone.trim() };

  const user = await User.findOne(query);

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  if (!user.isActive) {
    throw new ApiError(401, 'Account is deactivated. Please contact support');
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Update last login
  await user.updateLastLogin();

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Store refresh token in Redis (if available)
  try {
    await redis.set(`refresh_token:${user._id}`, refreshToken, 30 * 24 * 60 * 60); // 30 days
  } catch (error) {
    console.warn('Redis not available, refresh token not cached:', error.message);
  }

  // Remove password from response
  const userResponse = user.toJSON();

  res.json(
    new ApiResponse(200, {
      user: userResponse,
      token: accessToken,
      refreshToken
    }, 'Login successful')
  );
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Remove refresh token from Redis (if available)
  try {
    await redis.del(`refresh_token:${userId}`);
  } catch (error) {
    console.warn('Redis not available, refresh token not removed from cache:', error.message);
  }

  // Add access token to blacklist
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    const decoded = jwt.decode(token);
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    if (expiresIn > 0) {
      await redis.set(`blacklist:${token}`, true, expiresIn);
    }
  }

  res.json(new ApiResponse(200, null, 'Logout successful'));
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  res.json(new ApiResponse(200, { user }, 'Profile retrieved successfully'));
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const updates = req.body;

  // Remove sensitive fields that shouldn't be updated via this endpoint
  delete updates.password;
  delete updates.email; // Email changes should go through verification
  delete updates.role;
  delete updates.kycVerified;

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(new ApiResponse(200, { user }, 'Profile updated successfully'));
});

// Send Phone OTP
export const sendPhoneOTP = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    throw new ApiError(400, 'Phone number is required');
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in Redis with 5-minute expiration (if available)
  try {
    await redis.set(`otp:${phone}`, otp, config.cacheTtl.otp);
  } catch (error) {
    console.warn('Redis not available, OTP not cached:', error.message);
    // For development without Redis, you could log the OTP
    console.log(`Development OTP for ${phone}: ${otp}`);
  }

  // Send OTP via SMS
  try {
    await sendOTP(phone, otp);
    res.json(new ApiResponse(200, null, 'OTP sent successfully'));
  } catch (error) {
    console.error('SMS sending failed:', error);
    throw new ApiError(500, 'Failed to send OTP. Please try again');
  }
});

// Verify Phone OTP
export const verifyPhoneOTP = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  const userId = req.user?._id;

  if (!phone || !otp) {
    throw new ApiError(400, 'Phone number and OTP are required');
  }

  // Get stored OTP from Redis (if available)
  let storedOTP;
  try {
    storedOTP = await redis.get(`otp:${phone}`);
  } catch (error) {
    console.warn('Redis not available, OTP verification may fail:', error.message);
    // For development, you could implement a fallback mechanism
    storedOTP = null;
  }

  if (!storedOTP) {
    throw new ApiError(400, 'OTP expired or invalid');
  }

  if (storedOTP !== otp) {
    throw new ApiError(400, 'Invalid OTP');
  }

  // Remove OTP from Redis (if available)
  try {
    await redis.del(`otp:${phone}`);
  } catch (error) {
    console.warn('Redis not available, OTP not removed from cache:', error.message);
  }

  // Update user's phone verification status if logged in
  if (userId) {
    await User.findByIdAndUpdate(userId, {
      phoneVerified: true,
      phone: phone
    });
  }

  res.json(new ApiResponse(200, null, 'Phone verified successfully'));
});

// Refresh Token
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token is required');
  }

  try {
    const decoded = jwt.verify(refreshToken, config.jwt.secret);
    const userId = decoded.userId;

    // Check if refresh token exists in Redis (if available)
    let storedToken;
    try {
      storedToken = await redis.get(`refresh_token:${userId}`);
      if (storedToken && storedToken !== refreshToken) {
        throw new ApiError(401, 'Invalid refresh token');
      }
    } catch (error) {
      console.warn('Redis not available, skipping refresh token validation:', error.message);
      // Continue without Redis validation in development
    }

    // Get user
    const user = await User.findById(userId);
    if (!user || !user.isActive) {
      throw new ApiError(401, 'User not found or inactive');
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(userId);

    // Store new refresh token (if available)
    try {
      await redis.set(`refresh_token:${userId}`, newRefreshToken, 30 * 24 * 60 * 60);
    } catch (error) {
      console.warn('Redis not available, new refresh token not cached:', error.message);
    }

    res.json(
      new ApiResponse(200, {
        token: accessToken,
        refreshToken: newRefreshToken
      }, 'Token refreshed successfully')
    );

  } catch (error) {
    throw new ApiError(401, 'Invalid refresh token');
  }
});

// Change Password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, 'Current password and new password are required');
  }

  if (newPassword.length < config.security.passwordMinLength) {
    throw new ApiError(400, `New password must be at least ${config.security.passwordMinLength} characters long`);
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Verify current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    throw new ApiError(400, 'Current password is incorrect');
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Invalidate all existing tokens (if Redis available)
  try {
    await redis.del(`refresh_token:${userId}`);
  } catch (error) {
    console.warn('Redis not available, tokens not invalidated from cache:', error.message);
  }

  res.json(new ApiResponse(200, null, 'Password changed successfully. Please login again'));
});