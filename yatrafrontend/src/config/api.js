// API Configuration
export const API_CONFIG = {
  // Backend API base URL
  BASE_URL: 'http://localhost:3001/api',
  
  // API keys from environment variables
  PROVIDED_API_KEY: import.meta.env.VITE_PROVIDED_API_KEY || '',
  STRIPE_API_KEY: import.meta.env.VITE_STRIPE_API_KEY || '',
  
  // API endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      PROFILE: '/auth/profile',
      UPDATE_PROFILE: '/auth/profile',
      VERIFY_PHONE: '/auth/verify-phone',
      SEND_OTP: '/auth/send-otp',
      GOOGLE_AUTH: '/auth/google',
      VERIFY_AADHAAR: '/auth/verify-aadhaar',
      LOGOUT: '/auth/logout'
    },
    
    // Hotels
    HOTELS: {
      SEARCH: '/hotels',
      DETAILS: '/hotels',
      ADD: '/hotels'
    },
    
    // Bookings
    BOOKINGS: {
      CREATE: '/bookings',
      LIST: '/bookings',
      DETAILS: '/bookings',
      CANCEL: '/bookings'
    },
    
    // Payments
    PAYMENTS: {
      INITIATE: '/payments/initiate',
      CONFIRM: '/payments/confirm',
      WEBHOOK: '/payments/webhook',
      DETAILS: '/payments'
    },
    
    // Reviews
    REVIEWS: {
      ADD: '/reviews',
      LIST: '/reviews'
    },
    
    // SOS
    SOS: {
      SEND: '/sos',
      STATUS: '/sos',
      LIST: '/sos'
    },
    
    // Admin
    ADMIN: {
      DASHBOARD: '/admin/dashboard',
      VERIFY_HOTEL: '/admin/verify-hotel',
      BLOCK_USER: '/admin/block-user',
      USERS: '/admin/users',
      BOOKINGS: '/admin/bookings'
    },
    
    // Stripe
    STRIPE_BASE: 'https://api.stripe.com/v1'
  },
  
  // Default configuration
  DEFAULT_CURRENCY: 'INR',
  DEFAULT_COUNTRY: 'IN',
  
  // Payment configuration
  PAYMENT_METHODS: {
    CARD: 'card',
    UPI: 'upi',
    WALLET: 'wallet'
  }
};

// Helper function to create headers
export const createHeaders = (token = null, contentType = 'application/json') => {
  const headers = {
    'Content-Type': contentType,
    'Accept': 'application/json'
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Helper function to get full URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// Helper function to get user data from localStorage
export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Helper function to set user data
export const setUserData = (userData) => {
  if (userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  } else {
    localStorage.removeItem('userData');
  }
};

export default API_CONFIG;

