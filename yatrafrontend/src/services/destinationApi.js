// Destination API Service - Real Data from Backend
import apiService from './api.service';

class DestinationApiService {
  constructor() {
    this.baseUrl = 'http://localhost:3001/api';
  }

  // Get all destinations from backend
  async getAllDestinations() {
    try {
      const response = await fetch(`${this.baseUrl}/destinations`);
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          data: data.data.destinations || [],
          message: data.message
        };
      } else {
        throw new Error(data.message || 'Failed to fetch destinations');
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
      // Fallback to local data if API fails
      return this.getFallbackDestinations();
    }
  }

  // Get destination by name
  async getDestinationByName(name) {
    try {
      const response = await fetch(`${this.baseUrl}/destinations/${encodeURIComponent(name)}`);
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          data: data.data.destination,
          message: data.message
        };
      } else {
        throw new Error(data.message || 'Destination not found');
      }
    } catch (error) {
      console.error('Error fetching destination:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get destinations by region
  async getDestinationsByRegion(region) {
    try {
      const response = await fetch(`${this.baseUrl}/destinations?region=${encodeURIComponent(region)}`);
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          data: data.data.destinations || [],
          message: data.message
        };
      } else {
        throw new Error(data.message || 'Failed to fetch destinations');
      }
    } catch (error) {
      console.error('Error fetching destinations by region:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Search destinations
  async searchDestinations(query) {
    try {
      const response = await fetch(`${this.baseUrl}/destinations/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          data: data.data.destinations || [],
          message: data.message
        };
      } else {
        throw new Error(data.message || 'Search failed');
      }
    } catch (error) {
      console.error('Error searching destinations:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get popular destinations
  async getPopularDestinations(limit = 10) {
    try {
      const response = await fetch(`${this.baseUrl}/destinations/popular?limit=${limit}`);
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          data: data.data.destinations || [],
          message: data.message
        };
      } else {
        throw new Error(data.message || 'Failed to fetch popular destinations');
      }
    } catch (error) {
      console.error('Error fetching popular destinations:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Fallback destinations data (if API is not available)
  getFallbackDestinations() {
    return {
      success: true,
      data: [
        {
          _id: 'fallback_1',
          name: 'Jaipur',
          state: 'Rajasthan',
          region: 'North India',
          description: 'The Pink City of India, Jaipur is a magnificent blend of ancient heritage and modern vibrancy. Known for its stunning palaces, colorful bazaars, and rich cultural heritage.',
          shortDescription: 'The Pink City with majestic palaces, forts, and vibrant bazaars offering a royal Rajasthani experience.',
          highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar', 'Nahargarh Fort'],
          images: [
            {
              url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&h=800&fit=crop',
              alt: 'Amber Fort Jaipur',
              caption: 'Magnificent Amber Fort overlooking the Pink City',
              isPrimary: true
            }
          ],
          coordinates: {
            latitude: 26.9124,
            longitude: 75.7873
          },
          tags: ['heritage', 'palace', 'fort', 'rajasthani', 'pink-city', 'culture', 'history', 'royal'],
          isPopular: true,
          verified: true,
          statistics: {
            hotelsCount: 138,
            restaurantsCount: 245,
            attractionsCount: 12,
            averageRating: 4.7,
            visitorCount: 4500000
          }
        },
        {
          _id: 'fallback_2',
          name: 'Goa',
          state: 'Goa',
          region: 'West India',
          description: 'India\'s beach paradise, Goa offers pristine beaches, Portuguese heritage, vibrant nightlife, and a laid-back atmosphere. From the bustling beaches of North Goa to the serene shores of South Goa, this coastal state provides the perfect blend of relaxation and adventure.',
          shortDescription: 'Beach paradise with pristine coastlines, Portuguese heritage, and vibrant nightlife.',
          highlights: ['Calangute Beach', 'Baga Beach', 'Anjuna Beach', 'Old Goa', 'Dudhsagar Falls', 'Fort Aguada'],
          images: [
            {
              url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
              alt: 'Goa Beach',
              caption: 'Pristine beaches of Goa with golden sand and blue waters',
              isPrimary: true
            }
          ],
          coordinates: {
            latitude: 15.2993,
            longitude: 74.1240
          },
          tags: ['beach', 'party', 'portuguese', 'heritage', 'nightlife', 'water-sports', 'relaxation', 'culture'],
          isPopular: true,
          verified: true,
          statistics: {
            hotelsCount: 270,
            restaurantsCount: 456,
            attractionsCount: 18,
            averageRating: 4.5,
            visitorCount: 8200000
          }
        }
      ],
      message: 'Using fallback data - API not available'
    };
  }

  // Get attractions for a destination
  async getDestinationAttractions(destinationId) {
    try {
      const response = await fetch(`${this.baseUrl}/destinations/${destinationId}/attractions`);
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          data: data.data.attractions || [],
          message: data.message
        };
      } else {
        throw new Error(data.message || 'Failed to fetch attractions');
      }
    } catch (error) {
      console.error('Error fetching attractions:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get hotels for a destination
  async getDestinationHotels(destinationName) {
    try {
      const response = await fetch(`${this.baseUrl}/hotels/search?destination=${encodeURIComponent(destinationName)}`);
      const data = await response.json();
      
      if (data.success) {
        return {
          success: true,
          data: data.data.hotels || [],
          message: data.message
        };
      } else {
        throw new Error(data.message || 'Failed to fetch hotels');
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Create and export singleton instance
const destinationApiService = new DestinationApiService();
export default destinationApiService;
