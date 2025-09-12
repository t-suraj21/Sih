// Hotel API Service - Real Implementation
import apiService from './api.service';

class HotelBookingService {
  constructor() {
    // Use the main API service for hotel operations
  }

  // Search for hotels using real API
  async searchHotels(searchParams) {
    try {
      const response = await apiService.searchHotels(searchParams);
      return {
        success: response.success,
        hotels: response.data?.hotels || [],
        message: response.message
      };
    } catch (error) {
      console.error('Hotel search error:', error);
      return {
        success: false,
        hotels: [],
        message: 'Failed to search hotels'
      };
    }
  }

  // Get hotel details using real API
  async getHotelDetails(hotelId) {
    try {
      const response = await apiService.getHotelDetails(hotelId);
      return {
        success: response.success,
        hotel: response.data?.hotel || null,
        message: response.message
      };
    } catch (error) {
      console.error('Get hotel details error:', error);
      return {
        success: false,
        hotel: null,
        message: 'Failed to get hotel details'
      };
    }
  }

  // Create booking using real API
  async createBooking(bookingData) {
    try {
      const response = await apiService.createBooking(bookingData);
      return {
        success: response.success,
        booking: response.data?.booking || null,
        message: response.message
      };
    } catch (error) {
      console.error('Create booking error:', error);
      return {
        success: false,
        booking: null,
        message: 'Failed to create booking'
      };
    }
  }

  // Get user bookings using real API
  async getUserBookings() {
    try {
      const response = await apiService.getBookings();
      return {
        success: response.success,
        bookings: response.data?.bookings || [],
        message: response.message
      };
    } catch (error) {
      console.error('Get bookings error:', error);
      return {
        success: false,
        bookings: [],
        message: 'Failed to get bookings'
      };
    }
  }

  // Cancel booking using real API
  async cancelBooking(bookingId) {
    try {
      const response = await apiService.cancelBooking(bookingId);
      return {
        success: response.success,
        message: response.message
      };
    } catch (error) {
      console.error('Cancel booking error:', error);
      return {
        success: false,
        message: 'Failed to cancel booking'
      };
    }
  }

  // Initiate payment using real API
  async initiatePayment(paymentData) {
    try {
      const response = await apiService.initiatePayment(paymentData);
      return {
        success: response.success,
        paymentIntent: response.data?.paymentIntent || null,
        message: response.message
      };
    } catch (error) {
      console.error('Initiate payment error:', error);
      return {
        success: false,
        paymentIntent: null,
        message: 'Failed to initiate payment'
      };
    }
  }

  // Confirm payment using real API
  async confirmPayment(paymentData) {
    try {
      const response = await apiService.confirmPayment(paymentData);
      return {
        success: response.success,
        payment: response.data?.payment || null,
        message: response.message
      };
    } catch (error) {
      console.error('Confirm payment error:', error);
      return {
        success: false,
        payment: null,
        message: 'Failed to confirm payment'
      };
    }
  }
}

// Create and export singleton instance
const hotelBookingService = new HotelBookingService();
export default hotelBookingService;