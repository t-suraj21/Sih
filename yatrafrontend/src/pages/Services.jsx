import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import { indianDestinations, serviceCategories } from '../data/indianDestinations';
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
  Loader
} from 'lucide-react';

const Services = () => {
  const [searchParams] = useSearchParams();
  const { destinationName } = useParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'hotels');
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: searchParams.get('destination') || destinationName || '',
    priceRange: '',
    rating: '',
    sortBy: 'rating'
  });

  const serviceTypes = [
    { id: 'hotels', name: 'Hotels', icon: <Hotel className="w-5 h-5" /> },
    { id: 'guides', name: 'Tour Guides', icon: <Users className="w-5 h-5" /> },
    { id: 'transport', name: 'Transport', icon: <Car className="w-5 h-5" /> },
    { id: 'food', name: 'Food Outlets', icon: <Utensils className="w-5 h-5" /> }
  ];

  useEffect(() => {
    // Find selected destination from URL params or search params
    const destName = destinationName || searchParams.get('destination');
    if (destName) {
      const dest = indianDestinations.find(d => d.name === destName);
      setSelectedDestination(dest);
    }
    loadServices();
  }, [activeTab, filters, searchParams, destinationName]);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      let serviceData = [];

      // If we have a selected destination, use its service data
      if (selectedDestination && selectedDestination.services) {
        switch (activeTab) {
          case 'hotels':
            serviceData = selectedDestination.services.hotels || [];
            break;
          case 'guides':
            serviceData = selectedDestination.services.guides || [];
            break;
          case 'transport':
            serviceData = selectedDestination.services.transport || [];
            break;
          case 'food':
            serviceData = selectedDestination.services.food || [];
            break;
          default:
            serviceData = [];
        }
      } else {
        // Fallback to API for general search
        switch (activeTab) {
          case 'hotels':
            const response = await apiService.searchHotels({
              destination: filters.location,
              checkIn: new Date().toISOString().split('T')[0],
              checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              guests: 2,
              rooms: 1
            });
            serviceData = response.success ? (response.data?.hotels || []) : [];
            break;
          default:
            serviceData = [];
        }
      }

      setServices(serviceData);
    } catch (error) {
      console.error('Error loading services:', error);
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const renderServiceCard = (service) => {
    return (
      <div key={service.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img 
            src={service.image || 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop'} 
            alt={service.name}
            className="w-full h-48 object-cover"
          />
          {service.verified && (
            <div className="absolute top-3 right-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">{service.name}</h3>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm font-medium">{service.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{service.location}</span>
          </div>

          {service.type && (
            <div className="text-sm text-gray-500 mb-2">{service.type}</div>
          )}
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900">{service.price}</span>
            </div>
            {service.experience && (
              <span className="text-sm text-gray-500">{service.experience}</span>
            )}
          </div>

          {/* Service-specific details */}
          {activeTab === 'hotels' && service.amenities && (
            <div className="flex flex-wrap gap-1 mb-3">
              {service.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {amenity}
                </span>
              ))}
              {service.amenities.length > 3 && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  +{service.amenities.length - 3} more
                </span>
              )}
            </div>
          )}

          {activeTab === 'guides' && service.languages && (
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                {service.languages.join(', ')}
              </span>
            </div>
          )}

          {activeTab === 'transport' && service.vehicles && (
            <div className="flex flex-wrap gap-1 mb-3">
              {service.vehicles.slice(0, 3).map((vehicle, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {vehicle}
                </span>
              ))}
            </div>
          )}

          {activeTab === 'food' && service.specialties && (
            <div className="flex flex-wrap gap-1 mb-3">
              {service.specialties.slice(0, 3).map((specialty, index) => (
                <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                  {specialty}
                </span>
              ))}
            </div>
          )}

          {service.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
          )}
          
          <button 
            onClick={() => handleServiceClick(service)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedDestination ? (
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={selectedDestination.image} 
                  alt={selectedDestination.name}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                />
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-gray-900">{selectedDestination.name} Services</h1>
                  <p className="text-gray-600">{selectedDestination.state}, {selectedDestination.region}</p>
                </div>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore verified hotels, tour guides, transport services, and food outlets in {selectedDestination.name}
              </p>
              <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {selectedDestination.rating} Rating
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-500 mr-1" />
                  {selectedDestination.safetyLevel} Safety
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-blue-500 mr-1" />
                  {selectedDestination.verifiedServices} Services
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Services</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover verified hotels, tour guides, transport services, and food outlets across India
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Category Info */}
        {selectedDestination && (
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {serviceCategories[activeTab]?.name || 'Services'}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {serviceCategories[activeTab]?.description || 'Explore our verified services'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {serviceCategories[activeTab]?.features?.map((feature, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-4xl">{serviceCategories[activeTab]?.icon || '🔧'}</div>
            </div>
          </div>
        )}

        {/* Service Type Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === type.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.name}
                  {selectedDestination && selectedDestination.services && (
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {selectedDestination.services[type.id] || 0}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                placeholder="Enter city or destination"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Price</option>
                <option value="0-1000">Under ₹1,000</option>
                <option value="1000-3000">₹1,000 - ₹3,000</option>
                <option value="3000-5000">₹3,000 - ₹5,000</option>
                <option value="5000+">Above ₹5,000</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
        </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading services...</span>
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(renderServiceCard)}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Services Found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search criteria to find more services.
            </p>
          </div>
        )}
      </div>

      {/* Service Details Modal */}
      <ServiceDetailsModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceType={activeTab}
      />
    </div>
  );
};

export default Services;