import { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import destinationApi from '../services/destinationApi.js';
import attractionApi from '../services/attractionApi.js';
import { indianDestinations } from '../data/indianDestinations';
import ServiceDetailsModal from '../components/ServiceDetailsModal';
import { 
  Hotel, 
  Users, 
  Car, 
  Utensils, 
  Star, 
  CheckCircle, 
  Shield, 
  MapPin, 
  Clock, 
  Phone,
  Wifi,
  Coffee,
  Tv,
  Languages,
  Award,
  Leaf,
  Search,
  Filter,
  Loader,
  Loader2,
  ArrowLeft,
  Bookmark,
  Heart,
  Share2,
  Navigation,
  Camera,
  Zap,
  Calendar,
  DollarSign,
  ExternalLink
} from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { destinationName } = useParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'hotels');
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: searchParams.get('destination') || destinationName || '',
    priceRange: '',
    rating: '',
    sortBy: 'rating'
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const serviceTypes = [
    { id: 'hotels', name: 'Hotels & Stays', icon: <Hotel className="w-5 h-5" />, color: 'blue', navigateTo: '/hotels' },
    { id: 'attractions', name: 'Tourist Attractions', icon: <Award className="w-5 h-5" />, color: 'purple' },
    { id: 'guides', name: 'Tour Guides', icon: <Users className="w-5 h-5" />, color: 'green' },
    { id: 'transport', name: 'Transport & Travel', icon: <Car className="w-5 h-5" />, color: 'orange' },
    { id: 'food', name: 'Food & Dining', icon: <Utensils className="w-5 h-5" />, color: 'red' },
    { id: 'activities', name: 'Activities & Experiences', icon: <Zap className="w-5 h-5" />, color: 'yellow' }
  ];

  useEffect(() => {
    const destName = destinationName || searchParams.get('destination');
    if (destName) {
      loadDestination(destName);
    }
    loadServices();
  }, [activeTab, filters, searchParams, destinationName]);

  const loadDestination = async (destName) => {
    try {
      const response = await destinationApi.getDestinationByName(destName);
      if (response.success && response.data) {
        setSelectedDestination(response.data.destination);
      } else {
        // Fallback to local data if API fails
        const dest = indianDestinations.find(d => d.name === destName);
        setSelectedDestination(dest);
      }
    } catch (error) {
      console.error('Error loading destination:', error);
      // Fallback to local data
      const dest = indianDestinations.find(d => d.name === destName);
      setSelectedDestination(dest);
    }
  };

  const loadServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let serviceData = [];

      switch (activeTab) {
        case 'hotels':
          const hotelResponse = await apiService.searchHotels({
            destination: selectedDestination ? selectedDestination.name : filters.location,
            checkIn: new Date().toISOString().split('T')[0],
            checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            guests: 2,
            rooms: 1,
            limit: 20
          });
          serviceData = hotelResponse.success ? (hotelResponse.data?.hotels || []) : [];
          break;

        case 'attractions':
          if (selectedDestination) {
            const attractionResponse = await attractionApi.getDestinationAttractions(selectedDestination.name, { limit: 20 });
            serviceData = attractionResponse.success ? (attractionResponse.data?.attractions || []) : [];
          } else {
            const attractionResponse = await attractionApi.searchAttractions({
              q: filters.location,
              limit: 20
            });
            serviceData = attractionResponse.success ? (attractionResponse.data?.attractions || []) : [];
          }
          break;

        case 'guides':
          // Mock tour guides data for now
          serviceData = generateMockGuides();
          break;

        case 'transport':
          // Mock transport data for now
          serviceData = generateMockTransport();
          break;

        case 'food':
          // Mock food data for now
          serviceData = generateMockFood();
          break;

        case 'activities':
          // Mock activities data for now
          serviceData = generateMockActivities();
          break;

        default:
          serviceData = [];
      }

      setServices(serviceData);
    } catch (err) {
      console.error('Error loading services:', err);
      setError('Failed to load services. Please try again.');
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data generators for services not yet integrated with APIs
  const generateMockGuides = () => {
    const baseNames = ['Rajesh', 'Priya', 'Amit', 'Sunita', 'Vikram', 'Deepa'];
    const specialties = ['Historical Tours', 'Cultural Heritage', 'Food Tours', 'Adventure Tours', 'Photography Tours', 'Spiritual Tours'];
    
    return baseNames.map((name, index) => ({
      id: `guide_${index + 1}`,
      name: `${name} Kumar`,
      specialty: specialties[index % specialties.length],
      rating: 4.2 + (index * 0.1),
      experience: `${3 + index} years`,
      languages: ['Hindi', 'English', 'Local Language'],
      price: `₹${2000 + (index * 500)}/day`,
      image: `https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=300&fit=crop`,
      description: `Professional tour guide specializing in ${specialties[index % specialties.length].toLowerCase()}.`,
      verified: true
    }));
  };

  const generateMockTransport = () => {
    const types = ['Cab Service', 'Bus Service', 'Bike Rental', 'Car Rental', 'Airport Transfer', 'City Tour Bus'];
    const companies = ['Yatra Cabs', 'City Transport', 'Royal Travels', 'Express Tours', 'Comfort Rides', 'Premium Travel'];
    
    return types.map((type, index) => ({
      id: `transport_${index + 1}`,
      name: companies[index],
      type: type,
      rating: 4.0 + (index * 0.1),
      price: `₹${500 + (index * 200)}/day`,
      image: `https://images.unsplash.com/photo-${1600000000000 + index}?w=400&h=300&fit=crop`,
      description: `Reliable ${type.toLowerCase()} service with professional drivers.`,
      features: ['AC Vehicle', 'GPS Tracking', '24/7 Support'],
      verified: true
    }));
  };

  const generateMockFood = () => {
    const cuisines = ['North Indian', 'South Indian', 'Street Food', 'Fine Dining', 'Local Delicacies', 'International'];
    const restaurants = ['Spice Garden', 'Royal Kitchen', 'Local Bites', 'Heritage Restaurant', 'Food Court', 'Cafe Corner'];
    
    return cuisines.map((cuisine, index) => ({
      id: `food_${index + 1}`,
      name: restaurants[index],
      cuisine: cuisine,
      rating: 4.3 + (index * 0.1),
      price: `₹${300 + (index * 100)}/person`,
      image: `https://images.unsplash.com/photo-${1700000000000 + index}?w=400&h=300&fit=crop`,
      description: `Authentic ${cuisine.toLowerCase()} cuisine with fresh ingredients.`,
      specialties: ['Traditional Recipes', 'Vegetarian Options', 'Fresh Ingredients'],
      verified: true
    }));
  };

  const generateMockActivities = () => {
    const activities = ['Adventure Sports', 'Cultural Shows', 'Wildlife Safari', 'Trekking', 'Water Sports', 'Photography Tours'];
    const operators = ['Adventure Zone', 'Cultural Hub', 'Nature Tours', 'Peak Adventures', 'Aqua Sports', 'Photo Walks'];
    
    return activities.map((activity, index) => ({
      id: `activity_${index + 1}`,
      name: operators[index],
      activity: activity,
      rating: 4.4 + (index * 0.1),
      price: `₹${1500 + (index * 300)}/person`,
      duration: `${2 + index} hours`,
      image: `https://images.unsplash.com/photo-${1800000000000 + index}?w=400&h=300&fit=crop`,
      description: `Exciting ${activity.toLowerCase()} experience with professional instructors.`,
      features: ['Equipment Provided', 'Expert Guide', 'Safety First'],
      verified: true
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Search locations function
  const searchLocations = (query) => {
    if (!query || query.length < 2) {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
      return;
    }

    const filtered = indianDestinations.filter(dest => 
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.state.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setLocationSuggestions(filtered);
    setShowLocationSuggestions(filtered.length > 0);
  };

  // Handle location input change
  const handleLocationChange = (query) => {
    handleFilterChange('location', query);
    searchLocations(query);
  };

  // Handle location selection
  const handleLocationSelect = (destination) => {
    handleFilterChange('location', destination.name);
    setShowLocationSuggestions(false);
    setLocationSuggestions([]);
    setSelectedDestination(destination);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleBookService = (service) => {
    // Navigate to booking page with service details
    navigate('/booking', { 
      state: { 
        service, 
        destination: selectedDestination,
        serviceType: activeTab 
      } 
    });
  };

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'hotels': return <Hotel className="w-6 h-6" />;
      case 'attractions': return <Award className="w-6 h-6" />;
      case 'guides': return <Users className="w-6 h-6" />;
      case 'transport': return <Car className="w-6 h-6" />;
      case 'food': return <Utensils className="w-6 h-6" />;
      case 'activities': return <Zap className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  const renderServiceCard = (service) => {
    return (
      <div key={service.id || service._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={service.image || '/api/placeholder/400/250'}
            alt={service.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {service.verified && (
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </span>
            )}
            {service.featured && (
              <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
          
          {/* Service specific info */}
          {activeTab === 'hotels' && (
            <div className="space-y-2 mb-3">
              <p className="text-gray-600 text-sm flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {service.location || service.address}
              </p>
              <p className="text-gray-600 text-sm flex items-center">
                <Star className="w-4 h-4 mr-1" />
                {service.rating?.toFixed(1) || '4.5'} • {service.reviews?.length || 0} reviews
              </p>
            </div>
          )}
          
          {activeTab === 'attractions' && (
            <div className="space-y-2 mb-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {service.category}
              </span>
              <p className="text-gray-600 text-sm flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {service.timings || 'Open Daily'}
              </p>
            </div>
          )}
          
          {activeTab === 'guides' && (
            <div className="space-y-2 mb-3">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">{service.specialty}</span>
              </p>
              <p className="text-gray-600 text-sm flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {service.experience} experience
              </p>
            </div>
          )}
          
          {activeTab === 'transport' && (
            <div className="space-y-2 mb-3">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">{service.type}</span>
              </p>
              {service.features && (
                <div className="flex flex-wrap gap-1">
                  {service.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'food' && (
            <div className="space-y-2 mb-3">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">{service.cuisine}</span>
              </p>
              {service.specialties && (
                <div className="flex flex-wrap gap-1">
                  {service.specialties.slice(0, 2).map((specialty, index) => (
                    <span key={index} className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'activities' && (
            <div className="space-y-2 mb-3">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">{service.activity}</span>
              </p>
              <p className="text-gray-600 text-sm flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {service.duration}
              </p>
            </div>
          )}

          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
            {service.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{service.rating?.toFixed(1) || '4.5'}</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">
                  {service.price}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleServiceClick(service)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              View Details
            </button>
            <button
              onClick={() => handleBookService(service)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              {activeTab === 'hotels' ? 'Book Now' : 'Book Service'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/destinations')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedDestination ? `${selectedDestination.name} Services` : 'Travel Services'}
                </h1>
                <p className="text-gray-600">
                  {selectedDestination ? `Explore all services in ${selectedDestination.name}` : 'Find the best travel services'}
                </p>
              </div>
            </div>
            
            {selectedDestination && (
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Type Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {serviceTypes.map((serviceType) => (
                <button
                  key={serviceType.id}
                  onClick={() => {
                    if (serviceType.navigateTo) {
                      // Navigate to dedicated page with location
                      const params = new URLSearchParams();
                      if (filters.location) {
                        params.set('destination', filters.location);
                      }
                      navigate(`${serviceType.navigateTo}${params.toString() ? '?' + params.toString() : ''}`);
                    } else {
                      setActiveTab(serviceType.id);
                    }
                  }}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === serviceType.id
                      ? `border-${serviceType.color}-500 text-${serviceType.color}-600`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {serviceType.icon}
                  <span>{serviceType.name}</span>
                  {serviceType.navigateTo && (
                    <ExternalLink className="w-3 h-3 ml-1" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter destination (e.g., Jaipur, Goa, Delhi...)"
                  value={filters.location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                {/* Location Suggestions */}
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {locationSuggestions.map((destination) => (
                      <button
                        key={destination.id}
                        onClick={() => handleLocationSelect(destination)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{destination.name}</div>
                            <div className="text-sm text-gray-600">{destination.state}</div>
                          </div>
                          <div className="ml-auto flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-600">{destination.rating}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                <option value="budget">Budget (₹0-1000)</option>
                <option value="mid">Mid-range (₹1000-3000)</option>
                <option value="luxury">Luxury (₹3000+)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Rating</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {serviceTypes.find(s => s.id === activeTab)?.name} 
              {selectedDestination && ` in ${selectedDestination.name}`}
            </h2>
            <span className="text-gray-600">
              {isLoading ? 'Loading...' : `${services.length} services found`}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading services...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 mb-2">⚠️ {error}</div>
            <button 
              onClick={loadServices}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(renderServiceCard)}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && services.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {getServiceIcon(activeTab)}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your filters or search in a different location.</p>
          </div>
        )}

        {/* Service Details Modal */}
        {isModalOpen && selectedService && (
          <ServiceDetailsModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            service={selectedService}
            serviceType={activeTab}
            onBook={() => handleBookService(selectedService)}
          />
        )}
      </div>
    </div>
  );
};

export default Services;