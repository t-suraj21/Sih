import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { createServer } from 'net';
import { connectMongoDB, connectRedis } from './config/database.js';
import { config } from './config/config.js';
import { ApiError } from './utils/ApiError.js';
import { ApiResponse } from './utils/ApiResponse.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import hotelRoutes from './routes/hotel.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import reviewRoutes from './routes/review.routes.js';
import destinationRoutes from './routes/destination.routes.js';
import attractionRoutes from './routes/attraction.routes.js';
import ecoTourismRoutes from './routes/ecotourism.routes.js';
import serviceRoutes from './routes/service.routes.js';
import adminRoutes from './routes/admin.routes.js';
import sosRoutes from './routes/sos.routes.js';

const app = express();

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: config.cors.origin,
  credentials: config.cors.credentials,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health';
  },
});

app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json(new ApiResponse(200, {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
    version: process.env.npm_package_version || '1.0.0'
  }, 'Server is healthy'));
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/attractions', attractionRoutes);
app.use('/api/eco-tourism', ecoTourismRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/sos', sosRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json(new ApiResponse(404, null, `Route ${req.originalUrl} not found`));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  let error = err;

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message
    }));
    error = new ApiError(400, 'Validation Error', errors);
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ApiError(409, `${field} already exists`);
  }

  // Handle Mongoose cast errors
  if (err.name === 'CastError') {
    error = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Token expired');
  }

  // Default to 500 server error
  if (!(error instanceof ApiError)) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    error = new ApiError(statusCode, message);
  }

  // Log error in development
  if (config.nodeEnv === 'development') {
    console.error('Error:', {
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
    });
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(config.nodeEnv === 'development' && { stack: error.stack }),
    ...(error.errors && { errors: error.errors }),
  });
});

// Function to check if port is available
const isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on('error', () => resolve(false));
  });
};

// Initialize database connections
const initializeApp = async () => {
  try {
    await connectMongoDB();
    await connectRedis();
    
    console.log('✅ All database connections established');
    
    let PORT = config.port;
    
    // Check if port is available
    if (!(await isPortAvailable(PORT))) {
      console.warn(`⚠️  Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
      PORT = PORT + 1;
      
      if (!(await isPortAvailable(PORT))) {
        console.error(`❌ Port ${PORT} is also in use. Please stop other services or change PORT in .env file.`);
        console.log('💡 Try: lsof -ti:3001 | xargs kill -9');
        process.exit(1);
      }
    }
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Yatra Backend Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 API base URL: http://localhost:${PORT}/api`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`);
        console.log('💡 Try: lsof -ti:3001 | xargs kill -9');
        process.exit(1);
      } else {
        console.error('❌ Server error:', error);
        process.exit(1);
      }
    });
    
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

export { app, initializeApp };
