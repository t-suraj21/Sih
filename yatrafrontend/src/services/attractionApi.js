import api from './api.service.js';

class AttractionApiService {
  // Get all attractions with filters
  async getAllAttractions(params = {}) {
    try {
      const response = await api.get('/attractions', {
        params
      });
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        message: response.data.message || 'Attractions retrieved successfully'
      };
    } catch (error) {
      console.error('Get attractions error:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch attractions'
      };
    }
  }

  // Get attraction by ID
  async getAttractionById(id) {
    try {
      const response = await api.get(`/attractions/${id}`);
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        message: response.data.message || 'Attraction retrieved successfully'
      };
    } catch (error) {
      console.error('Get attraction error:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch attraction'
      };
    }
  }

  // Search attractions
  async searchAttractions(searchParams) {
    try {
      const response = await api.get('/attractions/search', {
        params: searchParams
      });
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        message: response.data.message || 'Attractions search completed'
      };
    } catch (error) {
      console.error('Search attractions error:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to search attractions'
      };
    }
  }

  // Get featured attractions
  async getFeaturedAttractions(params = {}) {
    try {
      const response = await api.get('/attractions/featured', {
        params
      });
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        message: response.data.message || 'Featured attractions retrieved successfully'
      };
    } catch (error) {
      console.error('Get featured attractions error:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch featured attractions'
      };
    }
  }

  // Get attractions by category
  async getAttractionsByCategory(category, params = {}) {
    try {
      const response = await api.get(`/attractions/category/${category}`, {
        params
      });
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        message: response.data.message || 'Category attractions retrieved successfully'
      };
    } catch (error) {
      console.error('Get category attractions error:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch category attractions'
      };
    }
  }

  // Get attraction categories
  async getAttractionCategories() {
    try {
      const response = await api.get('/attractions/categories');
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        message: response.data.message || 'Categories retrieved successfully'
      };
    } catch (error) {
      console.error('Get categories error:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch categories'
      };
    }
  }

  // Get attraction statistics
  async getAttractionStats() {
    try {
      const response = await api.get('/attractions/stats');
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        message: response.data.message || 'Attraction statistics retrieved successfully'
      };
    } catch (error) {
      console.error('Get attraction stats error:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch attraction statistics'
      };
    }
  }

  // Get attractions for a specific destination
  async getDestinationAttractions(destinationName, params = {}) {
    try {
      const response = await api.get(`/destinations/${destinationName}/attractions`, {
        params
      });
      return {
        success: response.data.success || true,
        data: response.data.data || response.data,
        message: response.data.message || 'Destination attractions retrieved successfully'
      };
    } catch (error) {
      console.error('Get destination attractions error:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch destination attractions'
      };
    }
  }
}

const attractionApi = new AttractionApiService();
export default attractionApi;
