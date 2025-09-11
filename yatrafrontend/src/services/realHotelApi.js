// Real Hotel Booking API Service
import axios from 'axios';
import { API_CONFIG, createHeaders, getApiUrl, getAuthToken } from '../config/api';
import apiService from './api.service';

class RealHotelBookingService {
  constructor() {
    this.apiKey = API_CONFIG.PROVIDED_API_KEY;
    
    // Initialize axios instance for hotel data (mock endpoints)
    this.hotelApi = axios.create({
      baseURL: 'http://localhost:3000/api', // Mock API base URL
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
      // For now, we'll use a combination of real API structure with enhanced mock data
      // This simulates real hotel data from various Indian states
      const hotels = await this.getEnhancedHotelData(destination, state, checkIn, checkOut, guests, rooms);
      
      return {
        success: true,
        data: hotels,
        total: hotels.length,
        searchParams: {
          destination,
          checkIn,
          checkOut,
          guests,
          rooms,
          state
        }
      };
    } catch (error) {
      console.error('Hotel search error:', error);
      return {
        success: false,
        error: 'Failed to search hotels. Please try again.',
        data: []
      };
    }
  }

  // Get enhanced hotel data with real-like structure
  async getEnhancedHotelData(destination, state, checkIn, checkOut, guests, rooms) {
    // Real hotel data structure for Indian states
    const stateHotels = {
      'Rajasthan': [
        {
          id: 'raj_001',
          name: 'Taj Lake Palace Udaipur',
          location: 'Udaipur, Rajasthan',
          state: 'Rajasthan',
          city: 'Udaipur',
          image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop',
          rating: 4.9,
          reviews: 1247,
          pricePerNight: 25000,
          originalPrice: 30000,
          discount: 17,
          currency: 'INR',
          amenities: ['Lake View', 'Spa', 'Fine Dining', 'Butler Service', 'Boat Transfer'],
          features: ['Government Verified', 'Heritage Hotel', 'Luxury'],
          hygieneRating: 9.8,
          description: 'Iconic palace hotel floating on Lake Pichola with unmatched luxury.',
          availability: true,
          roomsAvailable: 8,
          coordinates: { lat: 24.5760, lng: 73.6822 }
        },
        {
          id: 'raj_002',
          name: 'Rambagh Palace Jaipur',
          location: 'Jaipur, Rajasthan',
          state: 'Rajasthan',
          city: 'Jaipur',
          image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
          rating: 4.8,
          reviews: 892,
          pricePerNight: 18000,
          originalPrice: 22000,
          discount: 18,
          currency: 'INR',
          amenities: ['Palace Gardens', 'Spa', 'Multiple Restaurants', 'Pool', 'Fitness Center'],
          features: ['Government Verified', 'Heritage Hotel', 'Royal Experience'],
          hygieneRating: 9.6,
          description: 'Former residence of Maharaja, now a luxury palace hotel.',
          availability: true,
          roomsAvailable: 12,
          coordinates: { lat: 26.9124, lng: 75.7873 }
        },
        {
          id: 'raj_003',
          name: 'Suryagarh Jaisalmer',
          location: 'Jaisalmer, Rajasthan',
          state: 'Rajasthan',
          city: 'Jaisalmer',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
          rating: 4.7,
          reviews: 654,
          pricePerNight: 15000,
          originalPrice: 18000,
          discount: 17,
          currency: 'INR',
          amenities: ['Desert View', 'Camel Safari', 'Cultural Shows', 'Spa', 'Fine Dining'],
          features: ['Government Verified', 'Desert Resort', 'Cultural Experience'],
          hygieneRating: 9.4,
          description: 'Luxury desert resort with authentic Rajasthani architecture.',
          availability: true,
          roomsAvailable: 15,
          coordinates: { lat: 26.9157, lng: 70.9083 }
        }
      ],
      'Goa': [
        {
          id: 'goa_001',
          name: 'The Leela Goa',
          location: 'Cavelossim, Goa',
          state: 'Goa',
          city: 'South Goa',
          image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
          rating: 4.8,
          reviews: 1156,
          pricePerNight: 12000,
          originalPrice: 15000,
          discount: 20,
          currency: 'INR',
          amenities: ['Beach Access', 'Golf Course', 'Spa', 'Multiple Pools', 'Water Sports'],
          features: ['Government Verified', 'Beach Resort', 'Luxury'],
          hygieneRating: 9.7,
          description: 'Luxury beach resort with pristine coastline and world-class amenities.',
          availability: true,
          roomsAvailable: 20,
          coordinates: { lat: 15.1394, lng: 74.1240 }
        },
        {
          id: 'goa_002',
          name: 'Taj Exotica Resort & Spa',
          location: 'Benaulim, Goa',
          state: 'Goa',
          city: 'South Goa',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
          rating: 4.7,
          reviews: 943,
          pricePerNight: 10000,
          originalPrice: 12500,
          discount: 20,
          currency: 'INR',
          amenities: ['Private Beach', 'Spa', 'Restaurants', 'Pool', 'Kids Club'],
          features: ['Government Verified', 'Family Friendly', 'Beach Resort'],
          hygieneRating: 9.5,
          description: 'Tropical paradise with lush gardens and serene beach.',
          availability: true,
          roomsAvailable: 18,
          coordinates: { lat: 15.2593, lng: 73.9442 }
        }
      ],
      'Kerala': [
        {
          id: 'ker_001',
          name: 'Kumarakom Lake Resort',
          location: 'Kumarakom, Kerala',
          state: 'Kerala',
          city: 'Kumarakom',
          image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c60a?w=600&h=400&fit=crop',
          rating: 4.9,
          reviews: 876,
          pricePerNight: 14000,
          originalPrice: 17000,
          discount: 18,
          currency: 'INR',
          amenities: ['Backwater View', 'Ayurvedic Spa', 'Houseboat', 'Traditional Cuisine'],
          features: ['Government Verified', 'Eco-Friendly', 'Backwater Resort'],
          hygieneRating: 9.8,
          description: 'Luxury backwater resort with traditional Kerala architecture.',
          availability: true,
          roomsAvailable: 10,
          coordinates: { lat: 9.6177, lng: 76.4274 }
        },
        {
          id: 'ker_002',
          name: 'Marari Beach Resort',
          location: 'Mararikulam, Kerala',
          state: 'Kerala',
          city: 'Alleppey',
          image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
          rating: 4.6,
          reviews: 567,
          pricePerNight: 8500,
          originalPrice: 10500,
          discount: 19,
          currency: 'INR',
          amenities: ['Beach Access', 'Ayurvedic Center', 'Yoga', 'Fishing', 'Cultural Programs'],
          features: ['Government Verified', 'Eco-Friendly', 'Beach Resort'],
          hygieneRating: 9.3,
          description: 'Serene beach resort with authentic Kerala experience.',
          availability: true,
          roomsAvailable: 14,
          coordinates: { lat: 9.5916, lng: 76.1947 }
        }
      ],
      'Maharashtra': [
        {
          id: 'mah_001',
          name: 'The Taj Mahal Palace Mumbai',
          location: 'Colaba, Mumbai',
          state: 'Maharashtra',
          city: 'Mumbai',
          image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop',
          rating: 4.8,
          reviews: 2134,
          pricePerNight: 20000,
          originalPrice: 25000,
          discount: 20,
          currency: 'INR',
          amenities: ['Harbor View', 'Spa', 'Fine Dining', 'Pool', 'Business Center'],
          features: ['Government Verified', 'Heritage Hotel', 'Iconic'],
          hygieneRating: 9.7,
          description: 'Iconic luxury hotel overlooking the Gateway of India.',
          availability: true,
          roomsAvailable: 25,
          coordinates: { lat: 18.9220, lng: 72.8347 }
        },
        {
          id: 'mah_002',
          name: 'Hilltop Resort Mahabaleshwar',
          location: 'Mahabaleshwar, Maharashtra',
          state: 'Maharashtra',
          city: 'Mahabaleshwar',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
          rating: 4.5,
          reviews: 432,
          pricePerNight: 6500,
          originalPrice: 8000,
          discount: 19,
          currency: 'INR',
          amenities: ['Hill View', 'Garden', 'Restaurant', 'Bonfire', 'Trekking'],
          features: ['Government Verified', 'Hill Station', 'Nature Resort'],
          hygieneRating: 9.1,
          description: 'Scenic hill resort with panoramic valley views.',
          availability: true,
          roomsAvailable: 16,
          coordinates: { lat: 17.9334, lng: 73.6582 }
        }
      ],
      'Tamil Nadu': [
        {
          id: 'tn_001',
          name: 'ITC Grand Chola Chennai',
          location: 'Guindy, Chennai',
          state: 'Tamil Nadu',
          city: 'Chennai',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
          rating: 4.7,
          reviews: 1543,
          pricePerNight: 11000,
          originalPrice: 14000,
          discount: 21,
          currency: 'INR',
          amenities: ['Luxury Spa', 'Multiple Restaurants', 'Pool', 'Fitness Center', 'Business Center'],
          features: ['Government Verified', 'Business Hotel', 'Luxury'],
          hygieneRating: 9.6,
          description: 'Luxury business hotel with Chola dynasty inspired architecture.',
          availability: true,
          roomsAvailable: 22,
          coordinates: { lat: 13.0097, lng: 80.2209 }
        }
      ]
    };

    // Get hotels based on state or destination
    let selectedHotels = [];
    
    if (state && stateHotels[state]) {
      selectedHotels = stateHotels[state];
    } else {
      // If no specific state, get hotels from all states that match destination
      Object.keys(stateHotels).forEach(stateName => {
        const stateHotelList = stateHotels[stateName];
        const matchingHotels = stateHotelList.filter(hotel => 
          hotel.location.toLowerCase().includes(destination.toLowerCase()) ||
          hotel.city.toLowerCase().includes(destination.toLowerCase()) ||
          hotel.state.toLowerCase().includes(destination.toLowerCase())
        );
        selectedHotels = [...selectedHotels, ...matchingHotels];
      });
      
      // If no matches found, return all hotels (at least 10)
      if (selectedHotels.length === 0) {
        selectedHotels = Object.values(stateHotels).flat();
      }
    }

    // Ensure we have at least 10 hotels by duplicating with variations if needed
    while (selectedHotels.length < 10) {
      const baseHotels = Object.values(stateHotels).flat();
      const additionalHotels = baseHotels.map((hotel, index) => ({
        ...hotel,
        id: `${hotel.id}_var_${index}`,
        name: `${hotel.name} - Premium Wing`,
        pricePerNight: hotel.pricePerNight + 1000,
        originalPrice: hotel.originalPrice + 1200,
        roomsAvailable: Math.floor(Math.random() * 20) + 5
      }));
      selectedHotels = [...selectedHotels, ...additionalHotels];
    }

    // Return at least 10 hotels
    return selectedHotels.slice(0, Math.max(10, selectedHotels.length));
  }

  // Get all states with hotels
  async getStatesWithHotels() {
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
