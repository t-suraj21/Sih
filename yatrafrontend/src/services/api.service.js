import axios from 'axios';
import { API_CONFIG, createHeaders, getApiUrl, getAuthToken, setAuthToken, setUserData, getUserData } from '../config/api';

// Create axios instance
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

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      setAuthToken(null);
      setUserData(null);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Service Class
class ApiService {
  // Authentication APIs
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.success && response.data.data?.token) {
        setAuthToken(response.data.data.token);
        setUserData(response.data.data.user);
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  }

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.success && response.data.data?.token) {
        setAuthToken(response.data.data.token);
        setUserData(response.data.data.user);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  }

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthToken(null);
      setUserData(null);
    }
  }

  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get profile'
      };
    }
  }

  async updateProfile(profileData) {
    try {
      const response = await api.put(API_CONFIG.ENDPOINTS.AUTH.UPDATE_PROFILE, profileData);
      
      if (response.data.success && response.data.data?.user) {
        setUserData(response.data.data.user);
      }
      
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile'
      };
    }
  }

  async sendOTP(phoneNumber) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.SEND_OTP, {
        phone: phoneNumber
      });
      return response.data;
    } catch (error) {
      console.error('Send OTP error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send OTP'
      };
    }
  }

  async verifyPhone(phoneNumber, otp) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_PHONE, {
        phone: phoneNumber,
        otp
      });
      return response.data;
    } catch (error) {
      console.error('Verify phone error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to verify phone'
      };
    }
  }

  // Hotel APIs
  async searchHotels(searchParams) {
    try {
      const response = await api.get('/hotels/search', {
        params: searchParams
      });
      return {
        success: response.data.success,
        data: {
          hotels: response.data.data?.hotels || []
        },
        message: response.data.message
      };
    } catch (error) {
      console.error('Search hotels error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to search hotels',
        data: { hotels: [] }
      };
    }
  }

  async getHotelDetails(hotelId) {
    try {
      const response = await api.get(`/hotels/${hotelId}`);
      return response.data;
    } catch (error) {
      console.error('Get hotel details error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get hotel details'
      };
    }
  }

  async addHotel(hotelData) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.HOTELS.ADD, hotelData);
      return response.data;
    } catch (error) {
      console.error('Add hotel error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add hotel'
      };
    }
  }

  // Booking APIs
  async createBooking(bookingData) {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Create booking error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create booking'
      };
    }
  }

  async getBookings() {
    try {
      const response = await api.get('/bookings');
      return {
        success: response.data.success,
        data: {
          bookings: response.data.data?.bookings || []
        },
        message: response.data.message
      };
    } catch (error) {
      console.error('Get bookings error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get bookings',
        data: { bookings: [] }
      };
    }
  }

  async getBookingDetails(bookingId) {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.BOOKINGS.DETAILS}/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Get booking details error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get booking details'
      };
    }
  }

  async cancelBooking(bookingId) {
    try {
      const response = await api.put(`${API_CONFIG.ENDPOINTS.BOOKINGS.CANCEL}/${bookingId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Cancel booking error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to cancel booking'
      };
    }
  }

  // Payment APIs
  async initiatePayment(paymentData) {
    try {
      const response = await api.post('/payments/create-order', paymentData);
      return response.data;
    } catch (error) {
      console.error('Initiate payment error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to initiate payment'
      };
    }
  }

  async confirmPayment(paymentData) {
    try {
      const response = await api.post('/payments/verify', paymentData);
      return response.data;
    } catch (error) {
      console.error('Confirm payment error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to confirm payment'
      };
    }
  }

  async getPaymentDetails(bookingId) {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.PAYMENTS.DETAILS}/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Get payment details error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get payment details'
      };
    }
  }

  // Review APIs
  async addReview(reviewData) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.REVIEWS.ADD, reviewData);
      return response.data;
    } catch (error) {
      console.error('Add review error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add review'
      };
    }
  }

  async getReviews(hotelId) {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.REVIEWS.LIST}/${hotelId}`);
      return response.data;
    } catch (error) {
      console.error('Get reviews error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get reviews',
        data: { reviews: [] }
      };
    }
  }

  // SOS APIs
  async sendSOSAlert(sosData) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.SOS.SEND, sosData);
      return response.data;
    } catch (error) {
      console.error('Send SOS alert error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send SOS alert'
      };
    }
  }

  async getSOSStatus(alertId) {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.SOS.STATUS}/${alertId}/status`);
      return response.data;
    } catch (error) {
      console.error('Get SOS status error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get SOS status'
      };
    }
  }

  // Admin APIs
  async getAdminDashboard() {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD);
      return response.data;
    } catch (error) {
      console.error('Get admin dashboard error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get dashboard data'
      };
    }
  }

  async verifyHotel(hotelId, verificationData) {
    try {
      const response = await api.post(`${API_CONFIG.ENDPOINTS.ADMIN.VERIFY_HOTEL}/${hotelId}`, verificationData);
      return response.data;
    } catch (error) {
      console.error('Verify hotel error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to verify hotel'
      };
    }
  }

  async blockUser(userId, blockData) {
    try {
      const response = await api.put(`${API_CONFIG.ENDPOINTS.ADMIN.BLOCK_USER}/${userId}`, blockData);
      return response.data;
    } catch (error) {
      console.error('Block user error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to block user'
      };
    }
  }

  // Utility method to check if user is authenticated
  isAuthenticated() {
    const token = getAuthToken();
    return !!token;
  }

  // Utility method to get current user
  getCurrentUser() {
    return getUserData();
  }
}

// Create and export singleton instance
const apiService = new ApiService();
export default apiService;
