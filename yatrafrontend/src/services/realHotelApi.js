// Real Hotel Booking API Service
import axios from 'axios';
import { API_CONFIG, createHeaders, getApiUrl, getAuthToken } from '../config/api';
import apiService from './api.service';

class RealHotelBookingService {
  constructor() {
    this.apiKey = API_CONFIG.PROVIDED_API_KEY;
    
    // Initialize axios instance for backend API
    this.hotelApi = axios.create({
      baseURL: 'http://localhost:3001/api', // Backend API base URL
      timeout: 10000,
      headers: createHeaders()
    });

    // Mock payment processing - no external API calls
    this.mockPayment = API_CONFIG.MOCK_PAYMENT;
  }

  // Search hotels by location and state
  async searchHotels(searchParams) {
    const { destination, checkIn, checkOut, guests = 2, rooms = 1, state = '' } = searchParams;
    
    try {
      // Call backend API to get real hotel data
      const response = await this.hotelApi.get('/hotels/search', {
        params: {
          city: destination,
          state: state,
          checkIn: checkIn,
          checkOut: checkOut,
          guests: guests,
          rooms: rooms,
          limit: 20
        }
      });

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data.hotels,
          total: response.data.data.pagination.totalCount,
          searchParams: {
            destination,
            checkIn,
            checkOut,
            guests,
            rooms,
            state
          }
        };
      } else {
        throw new Error(response.data.message || 'Failed to search hotels');
      }
    } catch (error) {
      console.error('Hotel search error:', error);
      return {
        success: false,
        error: 'Failed to search hotels. Please try again.',
        data: []
      };
    }
  }

  // Get all states with hotels
  async getStatesWithHotels() {
    try {
      // For now, return static state data
      // In a real implementation, this would come from the backend
      return {
        success: true,
        data: [
          { code: 'RJ', name: 'Rajasthan', hotelsCount: 150 },
          { code: 'GA', name: 'Goa', hotelsCount: 89 },
          { code: 'KL', name: 'Kerala', hotelsCount: 112 },
          { code: 'MH', name: 'Maharashtra', hotelsCount: 234 },
          { code: 'TN', name: 'Tamil Nadu', hotelsCount: 187 },
          { code: 'KA', name: 'Karnataka', hotelsCount: 156 },
          { code: 'UP', name: 'Uttar Pradesh', hotelsCount: 198 },
          { code: 'WB', name: 'West Bengal', hotelsCount: 134 },
          { code: 'HP', name: 'Himachal Pradesh', hotelsCount: 98 },
          { code: 'UK', name: 'Uttarakhand', hotelsCount: 76 }
        ]
      };
    } catch (error) {
      console.error('Failed to load states:', error);
      return {
        success: false,
        error: 'Failed to load states',
        data: []
      };
    }
  }

  // Get hotel details from backend API
  async getHotelDetails(hotelId, city = 'london') {
    try {
      // Add city parameter for external hotels
      const response = await this.hotelApi.get(`/hotels/${hotelId}`, {
        params: {
          city: city
        }
      });
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data.hotel
        };
      } else {
        throw new Error(response.data.message || 'Failed to get hotel details');
      }
    } catch (error) {
      console.error('Hotel details error:', error);
      return {
        success: false,
        error: 'Failed to get hotel details'
      };
    }
  }

  // Get all states with hotels
  async getStatesWithHotels() {
    try {
      // For now, return static state data
      // In a real implementation, this would come from the backend
      return {
        success: true,
        data: [
          { code: 'RJ', name: 'Rajasthan', hotelsCount: 150 },
          { code: 'GA', name: 'Goa', hotelsCount: 89 },
          { code: 'KL', name: 'Kerala', hotelsCount: 112 },
          { code: 'MH', name: 'Maharashtra', hotelsCount: 234 },
          { code: 'TN', name: 'Tamil Nadu', hotelsCount: 187 },
          { code: 'KA', name: 'Karnataka', hotelsCount: 156 },
          { code: 'UP', name: 'Uttar Pradesh', hotelsCount: 198 },
          { code: 'WB', name: 'West Bengal', hotelsCount: 134 },
          { code: 'HP', name: 'Himachal Pradesh', hotelsCount: 98 },
          { code: 'UK', name: 'Uttarakhand', hotelsCount: 76 }
        ]
      };
    } catch (error) {
      console.error('Failed to load states:', error);
      return {
        success: false,
        error: 'Failed to load states',
        data: []
      };
    }
  }

  // Create Mock Payment Intent (simulates real payment gateway)
  async createPaymentIntent(amount, currency = 'inr', metadata = {}) {
    try {
      // Simulate API processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock payment intent
      const paymentIntent = {
        id: `pi_${Math.random().toString(36).substr(2, 24)}`,
        amount: Math.round(amount * 100), // Convert to paise
        currency: currency.toLowerCase(),
        status: 'requires_payment_method',
        client_secret: `pi_${Math.random().toString(36).substr(2, 24)}_secret_${Math.random().toString(36).substr(2, 16)}`,
        created: Math.floor(Date.now() / 1000),
        metadata: {
          booking_type: 'hotel',
          api_key_used: this.apiKey.substring(0, 10) + '...',
          ...metadata
        }
      };
      
      return {
        success: true,
        data: paymentIntent
      };
    } catch (error) {
      console.error('Payment intent creation error:', error);
      return {
        success: false,
        error: 'Failed to create payment intent'
      };
    }
  }

  // Confirm Mock Payment (simulates payment confirmation)
  async confirmPayment(paymentIntentId, paymentMethodId) {
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, this.mockPayment.PROCESSING_DELAY));
      
      // Simulate success/failure based on mock settings
      const isSuccess = Math.random() < this.mockPayment.SUCCESS_RATE;
      
      if (isSuccess) {
        return {
          success: true,
          data: {
            id: paymentIntentId,
            status: 'succeeded',
            amount_received: 0, // Will be set by calling function
            currency: 'inr',
            payment_method: paymentMethodId,
            charges: {
              data: [{
                id: `ch_${Math.random().toString(36).substr(2, 24)}`,
                payment_method_details: {
                  card: {
                    brand: 'visa',
                    last4: '4242'
                  }
                }
              }]
            }
          }
        };
      } else {
        throw new Error('Your card was declined. Please try a different payment method.');
      }
    } catch (error) {
      console.error('Payment confirmation error:', error);
      return {
        success: false,
        error: error.message || 'Failed to confirm payment'
      };
    }
  }

  // Create hotel booking with payment
  async createBooking(bookingData, paymentIntentId) {
    try {
      // Create payment intent first
      const paymentIntent = await this.createPaymentIntent(
        bookingData.totalAmount,
        'inr',
        {
          hotel_id: bookingData.hotelId,
          guest_name: bookingData.guestDetails.name,
          check_in: bookingData.checkIn,
          check_out: bookingData.checkOut
        }
      );

      if (paymentIntent.success) {
        // Create booking record
        const booking = {
          id: `YTR${Date.now().toString(36).toUpperCase()}`,
          hotelId: bookingData.hotelId,
          hotelName: bookingData.hotelName,
          guestDetails: bookingData.guestDetails,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: bookingData.guests,
          rooms: bookingData.rooms,
          roomType: bookingData.roomType,
          totalAmount: bookingData.totalAmount,
          currency: 'INR',
          status: 'confirmed',
          paymentIntentId: paymentIntent.data.id,
          paymentStatus: 'pending',
          createdAt: new Date().toISOString(),
          confirmationCode: `YTR-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
        };

        return {
          success: true,
          data: {
            booking,
            paymentIntent: paymentIntent.data
          }
        };
      }

      return {
        success: false,
        error: 'Payment processing failed'
      };
    } catch (error) {
      console.error('Booking creation error:', error);
      return {
        success: false,
        error: 'Failed to create booking'
      };
    }
  }

  // Get hotel details
  async getHotelDetails(hotelId) {
    try {
      const allHotels = await this.getEnhancedHotelData('', '', '', '', 2, 1);
      const hotel = allHotels.find(h => h.id === hotelId);
      
      if (hotel) {
        return {
          success: true,
          data: {
            ...hotel,
            roomTypes: [
              {
                id: 'deluxe',
                name: 'Deluxe Room',
                price: hotel.pricePerNight,
                originalPrice: hotel.originalPrice,
                description: 'Spacious room with modern amenities',
                amenities: ['King Bed', 'AC', 'TV', 'Mini Bar', 'WiFi'],
                maxOccupancy: 2,
                available: true,
                images: [hotel.image]
              },
              {
                id: 'suite',
                name: 'Executive Suite',
                price: hotel.pricePerNight + 2000,
                originalPrice: hotel.originalPrice + 2500,
                description: 'Luxury suite with separate living area',
                amenities: ['King Bed', 'AC', 'TV', 'Mini Bar', 'WiFi', 'Living Area', 'Balcony'],
                maxOccupancy: 4,
                available: true,
                images: [hotel.image]
              }
            ],
            policies: {
              checkIn: '14:00',
              checkOut: '12:00',
              cancellation: 'Free cancellation until 24 hours before check-in',
              children: 'Children under 12 stay free',
              pets: 'Pet-friendly (charges may apply)'
            },
            nearbyAttractions: [
              'Local attractions within 5km',
              'Shopping centers nearby',
              'Restaurants and cafes'
            ]
          }
        };
      }
      
      return {
        success: false,
        error: 'Hotel not found'
      };
    } catch (error) {
      console.error('Hotel details error:', error);
      return {
        success: false,
        error: 'Failed to get hotel details'
      };
    }
  }
}

export const realHotelBookingService = new RealHotelBookingService();
export default realHotelBookingService;
