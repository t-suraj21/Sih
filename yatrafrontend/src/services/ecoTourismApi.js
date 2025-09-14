import api from './api.service.js';

class EcoTourismAPI {
  constructor() {
    this.baseURL = '/api/eco-tourism';
  }

  // Get all eco-tourism options with filtering and pagination
  async getEcoTourismOptions(params = {}) {
    try {
      const response = await api.get(this.baseURL, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching eco-tourism options:', error);
      throw error;
    }
  }

  // Get single eco-tourism option by ID or slug
  async getEcoTourismById(id) {
    try {
      const response = await api.get(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching eco-tourism option:', error);
      throw error;
    }
  }

  // Get featured eco-tourism options
  async getFeaturedEcoTourism(params = {}) {
    try {
      const response = await api.get(`${this.baseURL}/featured`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured eco-tourism options:', error);
      throw error;
    }
  }

  // Get eco-tourism by category
  async getEcoTourismByCategory(category, params = {}) {
    try {
      const response = await api.get(`${this.baseURL}/category/${category}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching eco-tourism by category:', error);
      throw error;
    }
  }

  // Get eco-tourism statistics
  async getEcoTourismStats() {
    try {
      const response = await api.get(`${this.baseURL}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching eco-tourism statistics:', error);
      throw error;
    }
  }

  // Search eco-tourism options
  async searchEcoTourism(params = {}) {
    try {
      const response = await api.get(`${this.baseURL}/search`, { params });
      return response.data;
    } catch (error) {
      console.error('Error searching eco-tourism options:', error);
      throw error;
    }
  }

  // Get nearby eco-tourism options
  async getNearbyEcoTourism(params = {}) {
    try {
      const response = await api.get(`${this.baseURL}/nearby`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching nearby eco-tourism options:', error);
      throw error;
    }
  }

  // Create new eco-tourism option (Admin only)
  async createEcoTourism(data) {
    try {
      const response = await api.post(this.baseURL, data);
      return response.data;
    } catch (error) {
      console.error('Error creating eco-tourism option:', error);
      throw error;
    }
  }

  // Update eco-tourism option (Admin only)
  async updateEcoTourism(id, data) {
    try {
      const response = await api.put(`${this.baseURL}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating eco-tourism option:', error);
      throw error;
    }
  }

  // Delete eco-tourism option (Admin only)
  async deleteEcoTourism(id) {
    try {
      const response = await api.delete(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting eco-tourism option:', error);
      throw error;
    }
  }

  // Toggle featured status (Admin only)
  async toggleFeatured(id) {
    try {
      const response = await api.patch(`${this.baseURL}/${id}/featured`);
      return response.data;
    } catch (error) {
      console.error('Error toggling featured status:', error);
      throw error;
    }
  }

  // Helper methods for filtering and categorization
  getCategories() {
    return [
      'Wildlife Conservation',
      'Sustainable Accommodation',
      'Organic Farming',
      'Carbon Neutral Travel',
      'Community Tourism',
      'Nature Education',
      'Green Adventure',
      'Cultural Heritage'
    ];
  }

  getTypes() {
    return ['Destination', 'Activity', 'Accommodation', 'Tour'];
  }

  getCarbonFootprintLevels() {
    return ['Very Low', 'Low', 'Medium', 'High'];
  }

  getRegions() {
    return [
      'North India',
      'South India',
      'East India',
      'West India',
      'Central India',
      'Northeast India'
    ];
  }

  // Calculate eco points for user actions
  calculateUserEcoPoints(bookings = [], activities = []) {
    let totalPoints = 0;
    
    // Points from bookings
    bookings.forEach(booking => {
      if (booking.ecoTourism && booking.ecoTourism.rewards) {
        totalPoints += booking.ecoTourism.rewards.ecoPointsEarned || 0;
      }
    });

    // Points from activities
    activities.forEach(activity => {
      totalPoints += activity.ecoPointsEarned || 0;
    });

    return totalPoints;
  }

  // Get eco rewards based on points
  getEcoRewards(points) {
    const rewards = [
      { points: 50, reward: 'Eco Badge', description: 'Digital badge for sustainable travel' },
      { points: 100, reward: '5% Discount', description: 'On next eco-certified booking' },
      { points: 250, reward: 'Tree Plantation', description: 'Plant a tree in your name' },
      { points: 500, reward: '10% Discount', description: 'On eco-tourism packages' },
      { points: 1000, reward: 'Conservation Trip', description: 'Free wildlife conservation tour' },
      { points: 2000, reward: 'Eco Ambassador', description: 'Become a certified eco-travel ambassador' }
    ];

    return rewards.filter(reward => points >= reward.points);
  }

  // Format price with currency
  formatPrice(price, currency = 'INR') {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(price);
  }

  // Calculate environmental impact
  calculateEnvironmentalImpact(ecoOptions = []) {
    const impact = {
      totalTreesPlanted: 0,
      totalCO2Reduced: 0,
      totalWaterConserved: 0,
      totalCommunitiesSupported: 0,
      totalWasteReduced: 0
    };

    ecoOptions.forEach(option => {
      if (option.sustainability && option.sustainability.conservationImpact) {
        const conservation = option.sustainability.conservationImpact;
        impact.totalTreesPlanted += conservation.treesPlanted || 0;
        impact.totalCO2Reduced += conservation.co2Reduced || 0;
        impact.totalWaterConserved += conservation.waterConserved || 0;
        impact.totalCommunitiesSupported += conservation.communitiesSupported || 0;
        impact.totalWasteReduced += conservation.wasteReduced || 0;
      }
    });

    return impact;
  }
}

const ecoTourismAPI = new EcoTourismAPI();
export default ecoTourismAPI;
