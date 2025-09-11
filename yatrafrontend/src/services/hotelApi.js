// Hotel API Service with integrated payment processing
import { API_CONFIG, createHeaders } from '../config/api';

// Note: Using Stripe API key for payment processing in hotel bookings
// This service combines hotel search with secure payment processing

class HotelBookingService {
  constructor() {
    this.apiKey = API_CONFIG.STRIPE_API_KEY;
    this.baseUrl = API_CONFIG.ENDPOINTS.STRIPE_BASE;
    this.headers = createHeaders();
  }

  // Search for hotels
  async searchHotels(searchParams) {
    const { destination, checkIn, checkOut, guests, rooms } = searchParams;
    
    try {
      // Simulate API call with mock data
      const hotels = await this.getMockHotels(destination, checkIn, checkOut, guests, rooms);
      return {
        success: true,
        data: hotels,
        total: hotels.length
      };
    } catch (error) {
      console.error('Hotel search error:', error);
      return {
        success: false,
        error: 'Failed to search hotels'
      };
    }
  }

  // Get hotel details
  async getHotelDetails(hotelId) {
    try {
      const hotel = await this.getMockHotelDetails(hotelId);
      return {
        success: true,
        data: hotel
      };
    } catch (error) {
      console.error('Hotel details error:', error);
      return {
        success: false,
        error: 'Failed to get hotel details'
      };
    }
  }

  // Create booking with payment processing
  async createBooking(bookingData, paymentData) {
    try {
      // Simulate payment processing with Stripe-like flow
      const paymentIntent = await this.createPaymentIntent(bookingData.totalAmount);
      
      if (paymentIntent.success) {
        const booking = await this.processBooking(bookingData);
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
      console.error('Booking error:', error);
      return {
        success: false,
        error: 'Failed to create booking'
      };
    }
  }

  // Simulate payment intent creation (like Stripe)
  async createPaymentIntent(amount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: `pi_${Math.random().toString(36).substr(2, 24)}`,
            amount: amount * 100, // Convert to cents
            currency: 'inr',
            status: 'requires_payment_method',
            client_secret: `pi_${Math.random().toString(36).substr(2, 24)}_secret_${Math.random().toString(36).substr(2, 16)}`
          }
        });
      }, 1000);
    });
  }

  // Process booking
  async processBooking(bookingData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `YTR${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          status: 'confirmed',
          ...bookingData,
          createdAt: new Date().toISOString()
        });
      }, 1500);
    });
  }

  // Mock hotel data
  async getMockHotels(destination, checkIn, checkOut, guests, rooms) {
    const mockHotels = [
      {
        id: 'hotel_001',
        name: 'Heritage Palace Hotel',
        location: destination || 'Jaipur, Rajasthan',
        image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&h=400&fit=crop',
        rating: 4.8,
        reviews: 324,
        pricePerNight: 3500,
        originalPrice: 4200,
        discount: 17,
        amenities: ['Free WiFi', 'AC', 'Pool', 'Spa', 'Restaurant', 'Room Service'],
        features: ['Government Verified', 'FSSAI Certified', 'Eco-Friendly'],
        hygieneRating: 9.2,
        description: 'Luxury heritage hotel with traditional architecture and modern amenities.',
        availability: true,
        roomsAvailable: 15
      },
      {
        id: 'hotel_002',
        name: 'Royal Garden Resort',
        location: destination || 'Jaipur, Rajasthan',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=400&fit=crop',
        rating: 4.6,
        reviews: 256,
        pricePerNight: 2800,
        originalPrice: 3200,
        discount: 13,
        amenities: ['Free WiFi', 'AC', 'Pool', 'Garden', 'Restaurant'],
        features: ['Government Verified', 'FSSAI Certified'],
        hygieneRating: 8.9,
        description: 'Beautiful resort with lush gardens and excellent hospitality.',
        availability: true,
        roomsAvailable: 8
      },
      {
        id: 'hotel_003',
        name: 'City Center Business Hotel',
        location: destination || 'Jaipur, Rajasthan',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop',
        rating: 4.4,
        reviews: 189,
        pricePerNight: 2200,
        originalPrice: 2500,
        discount: 12,
        amenities: ['Free WiFi', 'AC', 'Business Center', 'Gym'],
        features: ['Government Verified', 'Business Friendly'],
        hygieneRating: 8.7,
        description: 'Modern business hotel in the heart of the city.',
        availability: true,
        roomsAvailable: 12
      },
      {
        id: 'hotel_004',
        name: 'Eco Retreat Lodge',
        location: destination || 'Jaipur, Rajasthan',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop',
        rating: 4.7,
        reviews: 142,
        pricePerNight: 3200,
        originalPrice: 3600,
        discount: 11,
        amenities: ['Organic Food', 'Solar Power', 'Nature Walks', 'Yoga'],
        features: ['Eco-Certified', 'Sustainable Tourism', 'Local Community'],
        hygieneRating: 9.4,
        description: 'Sustainable eco-lodge with organic amenities and nature immersion.',
        availability: true,
        roomsAvailable: 6,
        ecoPoints: 150
      }
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockHotels);
      }, 800);
    });
  }

  async getMockHotelDetails(hotelId) {
    const hotels = await this.getMockHotels();
    const hotel = hotels.find(h => h.id === hotelId);
    
    if (hotel) {
      return {
        ...hotel,
        roomTypes: [
          {
            id: 'deluxe',
            name: 'Deluxe Room',
            price: hotel.pricePerNight,
            originalPrice: hotel.originalPrice,
            description: 'Spacious room with city view',
            amenities: ['King Bed', 'AC', 'TV', 'Mini Bar'],
            maxOccupancy: 2,
            available: true
          },
          {
            id: 'suite',
            name: 'Executive Suite',
            price: hotel.pricePerNight + 1500,
            originalPrice: hotel.originalPrice + 1800,
            description: 'Luxury suite with separate living area',
            amenities: ['King Bed', 'AC', 'TV', 'Mini Bar', 'Living Area', 'Balcony'],
            maxOccupancy: 4,
            available: true
          }
        ],
        policies: {
          checkIn: '14:00',
          checkOut: '12:00',
          cancellation: 'Free cancellation until 24 hours before check-in',
          children: 'Children under 12 stay free',
          pets: 'Pet-friendly (charges apply)'
        },
        location: {
          address: 'Heritage District, Old City',
          coordinates: { lat: 26.9124, lng: 75.7873 },
          nearbyAttractions: ['City Palace - 2km', 'Hawa Mahal - 1.5km', 'Amber Fort - 11km']
        }
      };
    }
    
    throw new Error('Hotel not found');
  }

  // Get booking details
  async getBooking(bookingId) {
    try {
      // Simulate fetching booking details
      return {
        success: true,
        data: {
          id: bookingId,
          status: 'confirmed',
          hotelName: 'Heritage Palace Hotel',
          checkIn: '2024-12-25',
          checkOut: '2024-12-28',
          guests: 2,
          rooms: 1,
          totalAmount: 10500,
          paymentStatus: 'paid'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Booking not found'
      };
    }
  }

  // Cancel booking
  async cancelBooking(bookingId, reason) {
    try {
      // Simulate cancellation process
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              id: bookingId,
              status: 'cancelled',
              refundAmount: 8500, // After cancellation charges
              refundStatus: 'processing',
              estimatedRefundDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            }
          });
        }, 1000);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Failed to cancel booking'
      };
    }
  }
}

export const hotelBookingService = new HotelBookingService();
export default hotelBookingService;
