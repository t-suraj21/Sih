import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server Configuration
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/yatra_db',
  
  // Redis Configuration
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
  
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'yatra_jwt_secret_key_2024',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  
  // Razorpay Configuration
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
  },
  
  // Google OAuth Configuration
  googleOAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/auth/google/callback',
  },
  
  // Twilio Configuration (SMS/WhatsApp)
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  
  // SendGrid Configuration (Email)
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.FROM_EMAIL || 'support@yatra.com',
    fromName: process.env.FROM_NAME || 'Yatra Support',
  },
  
  // Cloudinary Configuration (File Upload)
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  
  // External API Keys
  externalApis: {
    oyo: {
      baseUrl: process.env.OYO_API_BASE_URL,
      apiKey: process.env.OYO_API_KEY,
    },
    mmt: {
      baseUrl: process.env.MMT_API_BASE_URL,
      apiKey: process.env.MMT_API_KEY,
    },
    rezlive: {
      baseUrl: process.env.REZLIVE_API_BASE_URL,
      apiKey: process.env.REZLIVE_API_KEY,
    },
    googleMaps: {
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  
  // File Upload Configuration
  upload: {
    path: process.env.UPLOAD_PATH || './uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    allowedDocumentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    skipSuccessfulRequests: true,
  },
  
  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://localhost:5173',
      'http://localhost:5174'
    ],
    credentials: true,
  },
  
  // Frontend URL
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // Email Templates
  emailTemplates: {
    welcomeTemplate: process.env.WELCOME_TEMPLATE_ID,
    bookingConfirmationTemplate: process.env.BOOKING_CONFIRMATION_TEMPLATE_ID,
    passwordResetTemplate: process.env.PASSWORD_RESET_TEMPLATE_ID,
  },
  
  // SMS Templates
  smsTemplates: {
    otpTemplate: process.env.OTP_SMS_TEMPLATE,
    bookingConfirmationTemplate: process.env.BOOKING_SMS_TEMPLATE,
  },
  
  // Cache TTL (Time To Live) in seconds
  cacheTtl: {
    hotels: 30 * 60, // 30 minutes
    userProfile: 15 * 60, // 15 minutes
    searchResults: 10 * 60, // 10 minutes
    otp: 5 * 60, // 5 minutes
    session: 24 * 60 * 60, // 24 hours
  },
  
  // Pagination
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
  
  // Security
  security: {
    bcryptRounds: 12,
    maxLoginAttempts: 5,
    lockoutDuration: 30 * 60 * 1000, // 30 minutes
    passwordMinLength: 8,
  },
  
  // Booking Configuration
  booking: {
    maxAdvanceBookingDays: 365, // 1 year
    minAdvanceBookingHours: 2, // 2 hours
    cancellationDeadlineHours: 24, // 24 hours
  },
};

// Validate required environment variables for production
if (config.nodeEnv === 'production') {
  const requiredEnvVars = [
    'JWT_SECRET',
    'MONGO_URI',
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET'
  ];

  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
  }
}

export default config;