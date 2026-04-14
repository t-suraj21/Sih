import axios from 'axios';
import { API_CONFIG, getAuthToken } from '../config/api.js';

// Create axios instance for package API
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const packageApi = {
  // Get all packages
  getPackages: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          queryParams.append(key, params[key]);
        }
      });
      
      const response = await api.get(`/packages?${queryParams.toString()}`);
      return response;
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }
  },

  // Get package by ID
  getPackageById: async (id) => {
    try {
      const response = await api.get(`/packages/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching package:', error);
      throw error;
    }
  },

  // Calculate package price
  calculatePrice: async (packageId, selectedOptions) => {
    try {
      const response = await api.post('/packages/calculate-price', {
        packageId,
        selectedOptions
      });
      return response;
    } catch (error) {
      console.error('Error calculating price:', error);
      throw error;
    }
  },

  // Create package booking
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/packages/book', bookingData);
      return response;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get user's package bookings
  getUserBookings: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          queryParams.append(key, params[key]);
        }
      });
      
      const response = await api.get(`/packages/bookings/my?${queryParams.toString()}`);
      return response;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get booking by ID
  getBookingById: async (id) => {
    try {
      const response = await api.get(`/packages/bookings/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  }
};

export default packageApi;

