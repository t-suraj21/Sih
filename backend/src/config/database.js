import mongoose from 'mongoose';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
export const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/yatra_db';
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };

    await mongoose.connect(mongoURI, options);
    
    console.log('✅ MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Redis Connection
let redisClient;

export const connectRedis = async () => {
  try {
    const redisConfig = {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      retryDelayOnFailover: 100,
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    };

    redisClient = createClient({
      socket: {
        host: redisConfig.host,
        port: redisConfig.port,
      },
      password: redisConfig.password,
    });

    redisClient.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    redisClient.on('reconnecting', () => {
      console.log('🔄 Redis reconnecting...');
    });

    redisClient.on('ready', () => {
      console.log('✅ Redis ready for commands');
    });

    await redisClient.connect();
    
    // Test the connection
    await redisClient.ping();
    console.log('✅ Redis ping successful');
    
  } catch (error) {
    console.warn('⚠️ Redis connection failed, continuing without cache:', error.message);
    redisClient = null;
  }
};

// Redis utility functions
export const redis = {
  // Set key with expiration
  async set(key, value, expireInSeconds = 3600) {
    if (!redisClient) return false;
    try {
      await redisClient.setEx(key, expireInSeconds, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Redis set error:', error);
      return false;
    }
  },

  // Get key
  async get(key) {
    if (!redisClient) return null;
    try {
      const value = await redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  },

  // Delete key
  async del(key) {
    if (!redisClient) return false;
    try {
      await redisClient.del(key);
      return true;
    } catch (error) {
      console.error('Redis delete error:', error);
      return false;
    }
  },

  // Check if key exists
  async exists(key) {
    if (!redisClient) return false;
    try {
      const result = await redisClient.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis exists error:', error);
      return false;
    }
  },

  // Set with no expiration
  async setPersistent(key, value) {
    if (!redisClient) return false;
    try {
      await redisClient.set(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Redis setPersistent error:', error);
      return false;
    }
  },

  // Increment counter
  async incr(key) {
    if (!redisClient) return 0;
    try {
      return await redisClient.incr(key);
    } catch (error) {
      console.error('Redis incr error:', error);
      return 0;
    }
  },

  // Set expiration on existing key
  async expire(key, seconds) {
    if (!redisClient) return false;
    try {
      await redisClient.expire(key, seconds);
      return true;
    } catch (error) {
      console.error('Redis expire error:', error);
      return false;
    }
  }
};

// Graceful shutdown
export const closeDatabaseConnections = async () => {
  try {
    if (redisClient) {
      await redisClient.quit();
      console.log('✅ Redis connection closed');
    }
    
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error closing database connections:', error);
  }
};