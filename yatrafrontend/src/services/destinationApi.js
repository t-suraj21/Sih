import api from '../config/api';

// Get all destinations with optional filters
export const getAllDestinations = async (params = {}) => {
  try {
    const response = await api.get('/destinations', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
};

// Get destination by name
export const getDestinationByName = async (name) => {
  try {
    const response = await api.get(`/destinations/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destination:', error);
    throw error;
  }
};

// Get destinations by region
export const getDestinationsByRegion = async (region, params = {}) => {
  try {
    const response = await api.get(`/destinations/region/${region}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations by region:', error);
    throw error;
  }
};

// Search destinations
export const searchDestinations = async (query, params = {}) => {
  try {
    const response = await api.get('/destinations/search', { 
      params: { q: query, ...params } 
    });
    return response.data;
  } catch (error) {
    console.error('Error searching destinations:', error);
    throw error;
  }
};

// Get popular destinations
export const getPopularDestinations = async (limit = 10) => {
  try {
    const response = await api.get('/destinations/popular', { 
      params: { limit } 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular destinations:', error);
    throw error;
  }
};

// Get destination attractions
export const getDestinationAttractions = async (name, params = {}) => {
  try {
    const response = await api.get(`/destinations/${name}/attractions`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching destination attractions:', error);
    throw error;
  }
};

// Get destination statistics
export const getDestinationStats = async () => {
  try {
    const response = await api.get('/destinations/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching destination stats:', error);
    throw error;
  }
};

export default {
  getAllDestinations,
  getDestinationByName,
  getDestinationsByRegion,
  searchDestinations,
  getPopularDestinations,
  getDestinationAttractions,
  getDestinationStats
};