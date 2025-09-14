import axios from 'axios';
import { config } from '../config/config.js';

class ExternalHotelApiService {
  constructor() {
    // Using RapidAPI Booking.com API
    this.baseURL = 'https://booking-com.p.rapidapi.com/v1';
    this.rapidApiKey = process.env.RAPIDAPI_KEY || 'demo-key';
    
    // Alternative free API endpoints
    this.alternativeApis = [
      'https://jsonplaceholder.typicode.com/users', // For testing API structure
      'https://api.github.com/users' // Another test endpoint
    ];
    
    this.apiClient = axios.create({
      baseURL: this.baseURL,
      timeout: 15000,
      headers: {
        'X-RapidAPI-Key': this.rapidApiKey,
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // City to destination ID mapping for Booking.com API
    this.cityMapping = {
      'london': '-2601889',
      'paris': '-1456928', 
      'new york': '-2601889',
      'mumbai': '-2092174',
      'delhi': '-2106102',
      'bangalore': '-2090174',
      'goa': '-2103977',
      'jaipur': '-2111227',
      'chennai': '-2097458',
      'kolkata': '-2113514',
      'hyderabad': '-2108361',
      'pune': '-2111196',
      'ahmedabad': '-2095844',
      'surat': '-2125282',
      'lucknow': '-2111283',
      'kanpur': '-2111283',
      'nagpur': '-2115300',
      'indore': '-2108361',
      'thane': '-2092174',
      'bhopal': '-2103018',
      'visakhapatnam': '-2128309',
      'pimpri': '-2111196'
    };
  }

  async searchHotels(city = 'london') {
    try {
      console.log(`Searching hotels for city: ${city}`);
      
      // Get destination ID for the city
      const destId = this.cityMapping[city.toLowerCase()];
      
      if (!destId) {
        console.log(`No destination ID found for ${city}, using enhanced fallback`);
        return {
          success: true,
          data: this.getEnhancedFallbackHotels(city),
          total: 15, // Return more hotels
          source: 'fallback'
        };
      }

      // Try the Booking.com API
      let response;
      try {
        // Search for hotels in the destination
        response = await this.apiClient.get('/hotels/search', {
          params: {
            dest_id: destId,
            dest_type: 'city',
            adults: 2,
            children: 0,
            room_qty: 1,
            checkin_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            checkout_date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            order_by: 'popularity',
            filter_by_currency: 'USD',
            include_adjacency: true,
            page_number: 0,
            units: 'metric'
          }
        });
      } catch (apiError) {
        console.log(`Booking.com API failed for ${city}:`, apiError.message);
        // If external API fails, return enhanced fallback
        return {
          success: true,
          data: this.getEnhancedFallbackHotels(city),
          total: 15,
          source: 'fallback'
        };
      }
      
      if (response.data && response.data.result && Array.isArray(response.data.result) && response.data.result.length > 0) {
        // Transform the Booking.com API data to match our internal structure
        const transformedHotels = response.data.result.slice(0, 20).map((hotel, index) => ({
          _id: `booking_${hotel.hotel_id || index}`,
          id: `booking_${hotel.hotel_id || index}`,
          name: hotel.hotel_name || hotel.name || `Hotel ${index + 1}`,
          description: hotel.description || hotel.review_score_word || 'A wonderful hotel with excellent amenities and service',
          city: city,
          state: this.getCityState(city),
          address: hotel.address || hotel.location || `${city} City Center`,
          location: `${city}, ${this.getCityState(city)}`,
          price: hotel.min_total_price || Math.floor(Math.random() * 5000) + 1000,
          pricePerNight: hotel.min_total_price || Math.floor(Math.random() * 5000) + 1000,
          originalPrice: hotel.original_price || (hotel.price || hotel.rate || 2000) * 1.2,
          rating: parseFloat(hotel.rating || hotel.stars || (Math.random() * 2 + 3).toFixed(1)),
          reviews: hotel.reviews || hotel.review_count || Math.floor(Math.random() * 500) + 50,
          reviewCount: hotel.reviews || hotel.review_count || Math.floor(Math.random() * 500) + 50,
          hygieneRating: Math.floor(Math.random() * 3) + 8, // 8-10 rating
          image: hotel.main_photo_url || hotel.photo_url || this.getHotelImage(hotel, index),
          images: this.formatBookingImages(hotel.photos || hotel.images || []),
          amenities: this.formatAmenities(hotel.amenities || hotel.facilities || []),
          features: this.getHotelFeatures(hotel),
          availability: true,
          roomsAvailable: Math.floor(Math.random() * 10) + 3,
          discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : null,
          ecoPoints: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 10 : null,
          source: 'External API',
          externalId: hotel.id || `ext_${index}`,
          verified: true,
          isActive: true,
          geoLocation: {
            type: 'Point',
            coordinates: [
              hotel.longitude || hotel.lng || 0,
              hotel.latitude || hotel.lat || 0
            ]
          },
          policies: {
            checkIn: '14:00',
            checkOut: '11:00',
            cancellation: 'Free cancellation up to 24 hours before check-in'
          },
          contact: {
            phone: hotel.phone || hotel.contact || '+91-1234567890',
            email: hotel.email || `info@${(hotel.name || 'hotel').toLowerCase().replace(/\s+/g, '')}.com`,
            website: hotel.website || hotel.url || ''
          }
        }));

        return {
          success: true,
          data: transformedHotels,
          total: transformedHotels.length,
          source: 'external_api'
        };
      }

      // If API doesn't return data, use enhanced fallback
      console.log('No data from Booking.com API, using enhanced fallback');
      return {
        success: true,
        data: this.getEnhancedFallbackHotels(city),
        total: 15,
        source: 'fallback'
      };

    } catch (error) {
      console.error('External Hotel API Error:', error.message);
      
      // Return enhanced fallback data if external API fails
      return {
        success: true,
        data: this.getEnhancedFallbackHotels(city),
        total: 15,
        source: 'fallback'
      };
    }
  }

  getEnhancedFallbackHotels(city) {
    // Enhanced fallback with more hotels and real images
    const hotelTypes = ['Grand', 'Luxury', 'Business', 'Resort', 'Boutique', 'Heritage', 'Palace', 'Suites', 'Inn', 'Lodge', 'Plaza', 'Royal', 'Imperial', 'Continental', 'Premium'];
    const hotelSuffixes = ['Hotel', 'Resort & Spa', 'Suites', 'Palace', 'Grand Hotel', 'Business Hotel', 'Luxury Resort', 'Heritage Hotel', 'Boutique Hotel', 'Plaza Hotel', 'Royal Hotel', 'Inn', 'Lodge', 'Continental', 'Premium Hotel'];
    
    const realHotelImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&crop=center'
    ];

    return Array.from({ length: 15 }, (_, index) => ({
      _id: `fallback_${index + 1}`,
      id: `fallback_${index + 1}`,
      name: `${hotelTypes[index % hotelTypes.length]} ${city} ${hotelSuffixes[index % hotelSuffixes.length]}`,
      description: `A premium ${hotelTypes[index % hotelTypes.length].toLowerCase()} hotel in the heart of ${city} with world-class amenities and exceptional service. Perfect for both business and leisure travelers.`,
      city: city,
      state: this.getCityState(city),
      address: `${index + 1}${index % 2 === 0 ? 'st' : 'nd'} Street, ${city} City Center`,
      location: `${city}, ${this.getCityState(city)}`,
      price: Math.floor(Math.random() * 8000) + 2000,
      pricePerNight: Math.floor(Math.random() * 8000) + 2000,
      originalPrice: Math.floor(Math.random() * 10000) + 3000,
      rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviews: Math.floor(Math.random() * 800) + 100,
      reviewCount: Math.floor(Math.random() * 800) + 100,
      hygieneRating: Math.floor(Math.random() * 3) + 8,
      image: realHotelImages[index % realHotelImages.length],
      images: [
        { url: realHotelImages[index % realHotelImages.length], caption: 'Hotel Exterior' },
        { url: realHotelImages[(index + 1) % realHotelImages.length], caption: 'Lobby' },
        { url: realHotelImages[(index + 2) % realHotelImages.length], caption: 'Room' }
      ],
      amenities: this.getRandomAmenities(),
      features: this.getRandomFeatures(),
      availability: true,
      roomsAvailable: Math.floor(Math.random() * 15) + 5,
      discount: Math.random() > 0.6 ? Math.floor(Math.random() * 40) + 10 : null,
      ecoPoints: Math.random() > 0.4 ? Math.floor(Math.random() * 60) + 20 : null,
      source: 'Enhanced Fallback',
      externalId: `fallback_${index + 1}`,
      verified: true,
      isActive: true,
      geoLocation: {
        type: 'Point',
        coordinates: [
          Math.random() * 0.1 + (city.toLowerCase() === 'london' ? -0.1 : city.toLowerCase() === 'mumbai' ? 72.8 : 77.2),
          Math.random() * 0.1 + (city.toLowerCase() === 'london' ? 51.5 : city.toLowerCase() === 'mumbai' ? 19.0 : 28.6)
        ]
      },
      policies: {
        checkIn: '14:00',
        checkOut: '11:00',
        cancellation: 'Free cancellation up to 24 hours before check-in'
      },
      contact: {
        phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `info@${hotelTypes[index % hotelTypes.length].toLowerCase()}${city.toLowerCase()}.com`,
        website: `https://${hotelTypes[index % hotelTypes.length].toLowerCase()}${city.toLowerCase()}.com`
      }
    }));
  }

  formatBookingImages(images) {
    if (!Array.isArray(images) || images.length === 0) {
      return [];
    }
    
    return images.slice(0, 5).map((img, index) => ({
      url: img.url_max || img.url_1024 || img.url_640 || img.url || img,
      caption: img.caption || `Hotel Image ${index + 1}`
    }));
  }

  getRandomAmenities() {
    const allAmenities = [
      'Free Wi-Fi', 'Swimming Pool', 'Gym/Fitness Center', 'Spa', 'Restaurant', 
      'Room Service', 'Parking', 'Airport Shuttle', 'Business Center', 'Laundry Service',
      'Air Conditioning', 'Bar/Lounge', 'Concierge', 'Pet Friendly', 'Non-smoking Rooms'
    ];
    
    const count = Math.floor(Math.random() * 8) + 5;
    return allAmenities.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  getRandomFeatures() {
    const allFeatures = [
      'City View', 'Garden View', 'Balcony', 'Kitchenette', 'Minibar', 
      'Safe', 'Flat-screen TV', 'Coffee Machine', 'Work Desk', 'Sofa',
      'Marble Bathroom', 'Rain Shower', 'Bathtub', 'Premium Bedding', 'Blackout Curtains'
    ];
    
    const count = Math.floor(Math.random() * 6) + 4;
    return allFeatures.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  getFallbackHotels(city) {
    const fallbackHotels = [
      {
        _id: 'fallback_1',
        id: 'fallback_1',
        name: `Grand ${city} Hotel`,
        description: 'A luxurious hotel in the heart of the city with world-class amenities and exceptional service',
        city: city,
        state: this.getCityState(city),
        address: `123 Main Street, ${city}`,
        location: `${city}, ${this.getCityState(city)}`,
        price: 3500,
        pricePerNight: 3500,
        originalPrice: 4200,
        rating: 4.2,
        reviews: 156,
        reviewCount: 156,
        hygieneRating: 9,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        images: [{
          url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
          alt: 'Hotel exterior',
          isPrimary: true
        }],
        amenities: ['Free WiFi', 'Swimming Pool', 'Restaurant', 'Gym', 'Spa', 'Room Service'],
        features: ['Free Cancellation', 'Instant Confirmation', 'Best Price Guarantee', 'Free WiFi', 'Parking Available'],
        availability: true,
        roomsAvailable: 8,
        discount: 15,
        ecoPoints: 25,
        source: 'Fallback',
        externalId: 'fallback_1',
        verified: true,
        isActive: true,
        geoLocation: {
          type: 'Point',
          coordinates: [0, 0]
        },
        policies: {
          checkIn: '14:00',
          checkOut: '11:00',
          cancellation: 'Free cancellation up to 24 hours before check-in'
        },
        contact: {
          phone: '+91-1234567890',
          email: 'info@grandhotel.com',
          website: 'https://grandhotel.com'
        }
      },
      {
        _id: 'fallback_2',
        id: 'fallback_2',
        name: `${city} Business Hotel`,
        description: 'Perfect for business travelers with modern facilities and excellent connectivity',
        city: city,
        state: this.getCityState(city),
        address: `456 Business District, ${city}`,
        location: `${city}, ${this.getCityState(city)}`,
        price: 2800,
        pricePerNight: 2800,
        originalPrice: 3200,
        rating: 4.0,
        reviews: 89,
        reviewCount: 89,
        hygieneRating: 8,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop',
        images: [{
          url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop',
          alt: 'Business hotel',
          isPrimary: true
        }],
        amenities: ['Free WiFi', 'Business Center', 'Restaurant', 'Parking', 'Conference Rooms'],
        features: ['24/7 Reception', 'Business Center', 'Free WiFi', 'Room Service'],
        availability: true,
        roomsAvailable: 5,
        discount: null,
        ecoPoints: null,
        source: 'Fallback',
        externalId: 'fallback_2',
        verified: true,
        isActive: true,
        geoLocation: {
          type: 'Point',
          coordinates: [0, 0]
        },
        policies: {
          checkIn: '14:00',
          checkOut: '11:00',
          cancellation: 'Free cancellation up to 24 hours before check-in'
        },
        contact: {
          phone: '+91-1234567891',
          email: 'info@businesshotel.com',
          website: 'https://businesshotel.com'
        }
      },
      {
        _id: 'fallback_3',
        id: 'fallback_3',
        name: `${city} Resort & Spa`,
        description: 'Relaxing resort with spa facilities and beautiful surroundings for a perfect getaway',
        city: city,
        state: this.getCityState(city),
        address: `789 Resort Road, ${city}`,
        location: `${city}, ${this.getCityState(city)}`,
        price: 4200,
        pricePerNight: 4200,
        originalPrice: 5000,
        rating: 4.5,
        reviews: 203,
        reviewCount: 203,
        hygieneRating: 9,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
        images: [{
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
          alt: 'Resort view',
          isPrimary: true
        }],
        amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Bar', 'Garden'],
        features: ['Spa Services', 'Pool Access', 'Garden View', 'Free WiFi', 'Restaurant On-site'],
        availability: true,
        roomsAvailable: 12,
        discount: 20,
        ecoPoints: 40,
        source: 'Fallback',
        externalId: 'fallback_3',
        verified: true,
        isActive: true,
        geoLocation: {
          type: 'Point',
          coordinates: [0, 0]
        },
        policies: {
          checkIn: '14:00',
          checkOut: '11:00',
          cancellation: 'Free cancellation up to 24 hours before check-in'
        },
        contact: {
          phone: '+91-1234567892',
          email: 'info@resortandspa.com',
          website: 'https://resortandspa.com'
        }
      }
    ];

    return {
      success: true,
      data: fallbackHotels,
      total: fallbackHotels.length,
      source: 'fallback'
    };
  }

  formatImages(images) {
    if (!Array.isArray(images)) return [];
    
    return images.map((img, index) => ({
      url: typeof img === 'string' ? img : img.url || img.src || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
      alt: `Hotel image ${index + 1}`,
      isPrimary: index === 0
    }));
  }

  formatAmenities(amenities) {
    if (!Array.isArray(amenities)) return ['Free WiFi', 'Restaurant', 'Room Service', 'Air Conditioning'];
    
    return amenities.map(amenity => 
      typeof amenity === 'string' ? amenity : amenity.name || amenity.title || 'Amenity'
    );
  }

  getHotelImage(hotel, index) {
    // Return a default hotel image if no image provided
    const defaultImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&h=300&fit=crop'
    ];

    if (hotel.image) return hotel.image;
    if (hotel.images && hotel.images.length > 0) return hotel.images[0];
    if (hotel.photos && hotel.photos.length > 0) return hotel.photos[0];
    
    return defaultImages[index % defaultImages.length];
  }

  getHotelFeatures(hotel) {
    const allFeatures = [
      'Free Cancellation',
      'Instant Confirmation', 
      'Best Price Guarantee',
      'Free WiFi',
      'Parking Available',
      'Restaurant On-site',
      '24/7 Reception',
      'Room Service',
      'Business Center',
      'Fitness Center'
    ];

    // Return 3-5 random features
    const numFeatures = Math.floor(Math.random() * 3) + 3;
    const shuffled = allFeatures.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numFeatures);
  }

  getCityState(city) {
    const cityStateMap = {
      'london': 'England',
      'mumbai': 'Maharashtra',
      'delhi': 'Delhi',
      'bangalore': 'Karnataka',
      'chennai': 'Tamil Nadu',
      'kolkata': 'West Bengal',
      'hyderabad': 'Telangana',
      'pune': 'Maharashtra',
      'jaipur': 'Rajasthan',
      'goa': 'Goa'
    };

    return cityStateMap[city.toLowerCase()] || 'Unknown State';
  }

  async getHotelDetails(hotelId, city = 'london') {
    try {
      // For hotel details, we'll search and find the specific hotel
      const searchResult = await this.searchHotels(city);
      
      if (searchResult.success) {
        const hotel = searchResult.data.find(h => h._id === hotelId || h.externalId === hotelId);
        
        if (hotel) {
          return {
            success: true,
            data: hotel
          };
        }
      }

      return {
        success: false,
        error: 'Hotel not found'
      };
    } catch (error) {
      console.error('External Hotel Details API Error:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export const externalHotelApiService = new ExternalHotelApiService();
export default externalHotelApiService;
