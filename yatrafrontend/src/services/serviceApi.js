import apiService from './api.service';

const serviceApi = {
  // Get all services (public)
  getAllServices: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.type) queryParams.append('type', params.type);
      if (params.location) queryParams.append('location', params.location);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice);
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
      if (params.rating) queryParams.append('rating', params.rating);
      if (params.search) queryParams.append('search', params.search);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const url = `/services${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await apiService.get(url);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching services:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch services'
      };
    }
  },

  // Search services with advanced filters
  searchServices: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.q) queryParams.append('q', params.q);
      if (params.type) queryParams.append('type', params.type);
      if (params.city) queryParams.append('city', params.city);
      if (params.state) queryParams.append('state', params.state);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice);
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
      if (params.rating) queryParams.append('rating', params.rating);
      if (params.amenities) queryParams.append('amenities', params.amenities);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);

      const url = `/services/search${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await apiService.get(url);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error searching services:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to search services'
      };
    }
  },

  // Get service by ID
  getServiceById: async (serviceId) => {
    try {
      const response = await apiService.get(`/services/${serviceId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching service:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch service details'
      };
    }
  },

  // Create service (vendor only)
  createService: async (serviceData) => {
    try {
      const response = await apiService.post('/services', serviceData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating service:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to create service'
      };
    }
  },

  // Update service (vendor/admin)
  updateService: async (serviceId, serviceData) => {
    try {
      const response = await apiService.put(`/services/${serviceId}`, serviceData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating service:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to update service'
      };
    }
  },

  // Delete service (vendor/admin)
  deleteService: async (serviceId) => {
    try {
      const response = await apiService.delete(`/services/${serviceId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error deleting service:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to delete service'
      };
    }
  },

  // Get vendor services
  getVendorServices: async (vendorId = null, params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.status) queryParams.append('status', params.status);

      const url = vendorId 
        ? `/services/vendor/${vendorId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
        : `/services/vendor${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await apiService.get(url);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching vendor services:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch vendor services'
      };
    }
  },

  // Update service status (admin only)
  updateServiceStatus: async (serviceId, status, reason = '') => {
    try {
      const response = await apiService.patch(`/services/${serviceId}/status`, {
        status,
        reason
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating service status:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to update service status'
      };
    }
  },

  // Get service statistics
  getServiceStats: async () => {
    try {
      const response = await apiService.get('/services/stats/overview');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching service stats:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch service statistics'
      };
    }
  },

  // Get service types
  getServiceTypes: () => {
    return [
      'Hotel/Resort',
      'Tour Guide',
      'Transport Service',
      'Restaurant/Food',
      'Adventure Sports',
      'Cultural Experience',
      'Travel Agency',
      'Eco Tourism'
    ];
  },

  // Get pricing units
  getPricingUnits: () => {
    return [
      'per person',
      'per night',
      'per day',
      'per group',
      'fixed'
    ];
  },

  // Format service for display
  formatServiceForDisplay: (service) => {
    return {
      id: service._id || service.id,
      name: service.name,
      description: service.description,
      type: service.type,
      location: `${service.location.city}, ${service.location.state}`,
      city: service.location.city,
      state: service.location.state,
      price: `₹${service.pricing.basePrice.toLocaleString()} ${service.pricing.unit}`,
      basePrice: service.pricing.basePrice,
      rating: service.ratings?.average || 0,
      reviewCount: service.ratings?.count || 0,
      images: service.media?.images || [],
      primaryImage: service.media?.images?.find(img => img.isPrimary)?.url || service.media?.images?.[0]?.url || '/api/placeholder/300/200',
      amenities: service.features?.amenities || [],
      included: service.features?.included || [],
      excluded: service.features?.excluded || [],
      vendor: service.vendor,
      status: service.status,
      isVerified: service.verification?.isVerified || false,
      bookings: service.stats?.bookings || 0,
      views: service.stats?.views || 0,
      availability: service.availability,
      policies: service.policies
    };
  }
};

export default serviceApi;
