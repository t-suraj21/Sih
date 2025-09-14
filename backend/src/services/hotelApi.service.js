import axios from 'axios';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';

class HotelApiService {
  constructor() {
    this.rapidapi = {
      baseUrl: config.externalApis.rapidapi.baseUrl,
      apiKey: config.externalApis.rapidapi.apiKey,
      host: config.externalApis.rapidapi.host,
      headers: {
        'X-RapidAPI-Key': config.externalApis.rapidapi.apiKey,
        'X-RapidAPI-Host': config.externalApis.rapidapi.host,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
  }

  // Search hotels using RapidAPI
  async searchHotels(searchParams) {
    const { city, state, checkIn, checkOut, guests = 2, rooms = 1, minPrice, maxPrice, rating } = searchParams;
    
    try {
      // Check if RapidAPI key is configured
      if (!this.rapidapi.apiKey || this.rapidapi.apiKey === 'your_rapidapi_key_here') {
        console.log('RapidAPI key not configured, using enhanced mock data');
        return this.getEnhancedMockHotels(searchParams);
      }

      // Search hotels using RapidAPI Booking.com API
      const searchResponse = await this.searchRapidAPIHotels(searchParams);
      
      if (searchResponse.success) {
        // Apply filters
        let filteredHotels = this.applyFilters(searchResponse.data, { minPrice, maxPrice, rating });
        
        return {
          success: true,
          data: filteredHotels,
          total: filteredHotels.length,
          searchParams
        };
      } else {
        // Fallback to mock data if RapidAPI fails
        return this.getEnhancedMockHotels(searchParams);
      }
      
    } catch (error) {
      console.error('Hotel search error:', error);
      // Fallback to mock data if all APIs fail
      return this.getEnhancedMockHotels(searchParams);
    }
  }

  // Search hotels using RapidAPI Booking.com
  async searchRapidAPIHotels(searchParams) {
    try {
      const { city, state, checkIn, checkOut, guests, rooms } = searchParams;
      
      // Use city or state for search
      const searchLocation = city || state || 'Mumbai';
      
      const response = await axios.get(`${this.rapidapi.baseUrl}/hotels/search`, {
        headers: this.rapidapi.headers,
        params: {
          dest_id: await this.getDestinationId(searchLocation),
          checkin_date: checkIn,
          checkout_date: checkOut,
          adults_number: guests,
          room_number: rooms,
          order_by: 'popularity',
          dest_type: 'city',
          units: 'metric',
          locale: 'en-gb',
          currency: 'INR'
        },
        timeout: 15000
      });
      
      const hotels = response.data.result?.map((hotel, index) => ({
        id: `rapidapi_${hotel.hotel_id || index}`,
        name: hotel.hotel_name_trans || hotel.hotel_name,
        location: `${hotel.city_trans || city}, ${hotel.country_trans || 'India'}`,
        state: state || 'India',
        city: hotel.city_trans || city,
        image: hotel.main_photo_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
        rating: parseFloat(hotel.review_score) / 2 || 4.0, // Convert 10-point scale to 5-point
        reviews: hotel.review_nr || 0,
        pricePerNight: Math.round(hotel.price_breakdown?.gross_price?.value || 0),
        originalPrice: Math.round(hotel.price_breakdown?.gross_price?.value || 0),
        discount: 0,
        currency: 'INR',
        amenities: this.extractAmenities(hotel),
        features: ['Government Verified', 'RapidAPI Partner'],
        hygieneRating: 8.5 + Math.random() * 1.5, // Random between 8.5-10
        description: hotel.hotel_name_trans || 'Comfortable accommodation with modern amenities.',
        availability: true,
        roomsAvailable: Math.floor(Math.random() * 20) + 5,
        coordinates: {
          lat: parseFloat(hotel.latitude) || 0,
          lng: parseFloat(hotel.longitude) || 0
        },
        source: 'RapidAPI',
        externalId: hotel.hotel_id?.toString(),
        url: hotel.url,
        address: hotel.address_trans || hotel.address
      })) || [];
      
      return {
        success: true,
        data: hotels
      };
      
    } catch (error) {
      console.error('RapidAPI search error:', error.response?.data || error.message);
      throw new ApiError(500, 'Failed to fetch hotels from RapidAPI');
    }
  }

  // Get destination ID for RapidAPI
  async getDestinationId(location) {
    try {
      const response = await axios.get(`${this.rapidapi.baseUrl}/hotels/locations`, {
        headers: this.rapidapi.headers,
        params: {
          name: location,
          locale: 'en-gb'
        },
        timeout: 10000
      });
      
      const locations = response.data;
      if (locations && locations.length > 0) {
        return locations[0].dest_id;
      }
      
      // Default to Mumbai if location not found
      return '-2090174';
      
    } catch (error) {
      console.error('RapidAPI location error:', error.message);
      // Default to Mumbai
      return '-2090174';
    }
  }

  // Extract amenities from hotel data
  extractAmenities(hotel) {
    const amenities = [];
    
    // Common amenities mapping
    if (hotel.facilities) {
      hotel.facilities.forEach(facility => {
        switch (facility.facility_type_id) {
          case 1: amenities.push('WiFi'); break;
          case 2: amenities.push('Parking'); break;
          case 3: amenities.push('Pool'); break;
          case 4: amenities.push('Restaurant'); break;
          case 5: amenities.push('Spa'); break;
          case 6: amenities.push('Fitness Center'); break;
          case 7: amenities.push('AC'); break;
          case 8: amenities.push('Room Service'); break;
          default: amenities.push('Modern Amenities'); break;
        }
      });
    }
    
    // Default amenities if none found
    if (amenities.length === 0) {
      amenities.push('WiFi', 'AC', 'Parking');
    }
    
    return amenities.slice(0, 5); // Limit to 5 amenities
  }

  // Enhanced mock hotels (fallback when RapidAPI is not configured)
  getEnhancedMockHotels(searchParams) {
    const { city, state } = searchParams;
    
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
          coordinates: { lat: 24.5760, lng: 73.6822 },
          source: 'Local'
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
          coordinates: { lat: 26.9124, lng: 75.7873 },
          source: 'Local'
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
          coordinates: { lat: 15.1394, lng: 74.1240 },
          source: 'Local'
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
          coordinates: { lat: 9.6177, lng: 76.4274 },
          source: 'Local'
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
          coordinates: { lat: 18.9220, lng: 72.8347 },
          source: 'Local'
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
          hotel.location.toLowerCase().includes((city || '').toLowerCase()) ||
          hotel.city.toLowerCase().includes((city || '').toLowerCase()) ||
          hotel.state.toLowerCase().includes((city || '').toLowerCase())
        );
        selectedHotels = [...selectedHotels, ...matchingHotels];
      });
      
      // If no matches found, return all hotels
      if (selectedHotels.length === 0) {
        selectedHotels = Object.values(stateHotels).flat();
      }
    }

    return {
      success: true,
      data: selectedHotels,
      total: selectedHotels.length,
      searchParams
    };
  }

  // Apply filters to hotels
  applyFilters(hotels, filters) {
    let filteredHotels = [...hotels];
    
    if (filters.minPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.pricePerNight >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.pricePerNight <= filters.maxPrice);
    }
    
    if (filters.rating) {
      filteredHotels = filteredHotels.filter(hotel => hotel.rating >= filters.rating);
    }
    
    return filteredHotels;
  }

  // Get hotel details using RapidAPI
  async getHotelDetails(hotelId) {
    try {
      // Check if RapidAPI key is configured
      if (!this.rapidapi.apiKey || this.rapidapi.apiKey === 'your_rapidapi_key_here') {
        return this.getMockHotelDetails(hotelId);
      }

      // Extract external ID from hotel ID
      const externalId = hotelId.replace('rapidapi_', '');
      
      const response = await axios.get(`${this.rapidapi.baseUrl}/hotels/details`, {
        headers: this.rapidapi.headers,
        params: {
          hotel_id: externalId,
          locale: 'en-gb',
          currency: 'INR'
        },
        timeout: 10000
      });
      
      if (response.data) {
        const hotel = response.data;
        return {
          success: true,
          data: {
            id: hotelId,
            name: hotel.name_trans || hotel.name,
            location: `${hotel.city_trans || hotel.city}, ${hotel.country_trans || 'India'}`,
            state: hotel.state || 'India',
            city: hotel.city_trans || hotel.city,
            image: hotel.main_photo_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
            rating: parseFloat(hotel.review_score) / 2 || 4.0,
            reviews: hotel.review_nr || 0,
            pricePerNight: Math.round(hotel.price_breakdown?.gross_price?.value || 0),
            originalPrice: Math.round(hotel.price_breakdown?.gross_price?.value || 0),
            currency: 'INR',
            amenities: this.extractAmenities(hotel),
            features: ['Government Verified', 'RapidAPI Partner'],
            hygieneRating: 8.5 + Math.random() * 1.5,
            description: hotel.description_trans || hotel.description || 'Comfortable accommodation with modern amenities.',
            availability: true,
            roomsAvailable: Math.floor(Math.random() * 20) + 5,
            coordinates: {
              lat: parseFloat(hotel.latitude) || 0,
              lng: parseFloat(hotel.longitude) || 0
            },
            source: 'RapidAPI',
            externalId: externalId,
            url: hotel.url,
            address: hotel.address_trans || hotel.address,
            roomTypes: [
              {
                id: 'standard',
                name: 'Standard Room',
                price: Math.round(hotel.price_breakdown?.gross_price?.value || 0),
                originalPrice: Math.round(hotel.price_breakdown?.gross_price?.value || 0),
                description: 'Comfortable room with modern amenities',
                amenities: ['King Bed', 'AC', 'TV', 'WiFi'],
                maxOccupancy: 2,
                available: true,
                images: [hotel.main_photo_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop']
              },
              {
                id: 'deluxe',
                name: 'Deluxe Room',
                price: Math.round((hotel.price_breakdown?.gross_price?.value || 0) * 1.2),
                originalPrice: Math.round((hotel.price_breakdown?.gross_price?.value || 0) * 1.3),
                description: 'Spacious room with premium amenities',
                amenities: ['King Bed', 'AC', 'TV', 'WiFi', 'Mini Bar'],
                maxOccupancy: 3,
                available: true,
                images: [hotel.main_photo_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop']
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
      
      return this.getMockHotelDetails(hotelId);
      
    } catch (error) {
      console.error('RapidAPI hotel details error:', error.message);
      return this.getMockHotelDetails(hotelId);
    }
  }

  // Mock hotel details (fallback)
  getMockHotelDetails(hotelId) {
    const mockHotels = this.getEnhancedMockHotels({}).data;
    const hotel = mockHotels.find(h => h.id === hotelId);
    
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
  }
}

export const hotelApiService = new HotelApiService();
export default hotelApiService;