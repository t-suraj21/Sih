import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Star,
  CheckCircle,
  Filter,
  TrendingUp,
  Car,
  Hotel as HotelIcon,
  Utensils,
  Clock,
  Users,
  Shield,
  Calendar,
  DollarSign,
  Award,
  Phone,
  Mail,
  Globe,
  Heart,
  Share2,
  Bookmark,
  ShoppingCart,
  Plus
} from 'lucide-react';
import { getStateByName } from '../data/indianStates';
import { getStateServices } from '../data/stateServices';
import { useBooking } from '../contexts/BookingContext';

const StateDetails = () => {
  const { stateName } = useParams();
  const navigate = useNavigate();
  const { addItem, getItemCount } = useBooking();
  
  const [state, setState] = useState(null);
  const [services, setServices] = useState(null);
  const [activeTab, setActiveTab] = useState('travel');
  const [priceFilter, setPriceFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [filteredServices, setFilteredServices] = useState([]);
  const [showAddedNotification, setShowAddedNotification] = useState(false);

  useEffect(() => {
    const decodedStateName = decodeURIComponent(stateName);
    const stateData = getStateByName(decodedStateName);
    const servicesData = getStateServices(decodedStateName);
    
    if (stateData) {
      setState(stateData);
      setServices(servicesData);
    }
  }, [stateName]);

  useEffect(() => {
    if (services && activeTab) {
      let filtered = services[activeTab] || [];
      
      // Apply price filter
      if (priceFilter !== 'All') {
        filtered = filtered.filter(service => service.priceRange === priceFilter);
      }
      
      // Apply sorting
      if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'priceLow') {
        filtered.sort((a, b) => (a.price || a.avgPrice) - (b.price || b.avgPrice));
      } else if (sortBy === 'priceHigh') {
        filtered.sort((a, b) => (b.price || b.avgPrice) - (a.price || a.avgPrice));
      }
      
      setFilteredServices(filtered);
    }
  }, [services, activeTab, priceFilter, sortBy]);

  if (!state || !services) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'travel', name: 'Travel & Tours', icon: <Car className="w-5 h-5" />, count: services.travel?.length || 0 },
    { id: 'hotels', name: 'Hotels & Stay', icon: <HotelIcon className="w-5 h-5" />, count: services.hotels?.length || 0 },
    { id: 'food', name: 'Food & Dining', icon: <Utensils className="w-5 h-5" />, count: services.food?.length || 0 }
  ];

  const getPriceRangeColor = (range) => {
    switch (range) {
      case 'Low': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddToList = (service) => {
    const serviceWithCategory = { ...service, category: activeTab };
    addItem(serviceWithCategory, state);
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 3000);
  };

  const renderServiceCard = (service) => {
    const isTravel = activeTab === 'travel';
    const isHotel = activeTab === 'hotels';
    const isFood = activeTab === 'food';

    return (
      <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-56 overflow-hidden">
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {service.verified && (
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </span>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${getPriceRangeColor(service.priceRange)}`}>
              {service.priceRange}
            </span>
          </div>

          {/* Service Type Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
              {service.type}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Title and Rating */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 flex-1">{service.name}</h3>
            <div className="flex items-center ml-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-lg font-bold text-gray-900">{service.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

          {/* Service Specific Details */}
          <div className="space-y-3 mb-4">
            {isTravel && (
              <>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-medium">Duration:</span>
                  <span className="ml-2">{service.duration}</span>
                </div>
                {service.includes && (
                  <div className="flex flex-wrap gap-1">
                    {service.includes.map((item, idx) => (
                      <span key={idx} className="bg-green-50 text-green-700 px-2 py-1 rounded-lg text-xs font-medium">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}

            {isHotel && (
              <>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">{service.location}</span>
                </div>
                {service.amenities && (
                  <div className="flex flex-wrap gap-1">
                    {service.amenities.slice(0, 4).map((amenity, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                        {amenity}
                      </span>
                    ))}
                    {service.amenities.length > 4 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                        +{service.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </>
            )}

            {isFood && (
              <>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">{service.location}</span>
                </div>
                {service.specialties && (
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.specialties.slice(0, 3).map((specialty, idx) => (
                        <span key={idx} className="bg-orange-50 text-orange-700 px-2 py-1 rounded-lg text-xs font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <div className="text-2xl font-bold text-green-600">
                ₹{(service.price || service.avgPrice).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">
                {isFood ? 'Avg for two' : isHotel ? 'per night' : 'per person'}
              </div>
            </div>
            <button 
              onClick={() => handleAddToList(service)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add to List
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={state.image} 
          alt={state.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/destinations')}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white transition-all duration-300 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Destinations</span>
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-2">
          <button 
            onClick={() => navigate('/user-list')}
            className="relative p-3 bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            {getItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getItemCount()}
              </span>
            )}
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white transition-all">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white transition-all">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white transition-all">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* State Info */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {state.type}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-semibold">
              {state.region}
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-3">{state.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Capital: {state.capital}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400 fill-current" />
              <span className="font-bold">{state.rating}</span>
              <span className="ml-1">Rating</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>{state.touristCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="bg-white shadow-md border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600">Best Time</div>
              <div className="font-bold text-gray-900">{state.bestTime}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Climate</div>
              <div className="font-bold text-gray-900">{state.climate}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Budget</div>
              <div className="font-bold text-gray-900">{state.budget}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Languages</div>
              <div className="font-bold text-gray-900">{state.languages.slice(0, 2).join(', ')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* State Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {state.name}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{state.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2 text-green-600" />
                Famous For
              </h3>
              <p className="text-gray-600">{state.speciality}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                Top Attractions
              </h3>
              <div className="flex flex-wrap gap-2">
                {state.topAttractions.map((attraction, idx) => (
                  <span key={idx} className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                    {attraction}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Services in {state.name}</h2>
          
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900">Filters:</span>
                
                {/* Price Range Filter */}
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="All">All Prices</option>
                  <option value="Low">Low Budget</option>
                  <option value="Medium">Medium Budget</option>
                  <option value="High">High Budget</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600 font-medium">
              Showing <span className="text-green-600 font-bold">{filteredServices.length}</span> {tabs.find(t => t.id === activeTab)?.name.toLowerCase()}
            </p>
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map(renderServiceCard)}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <div className="text-gray-400 mb-4">
                {activeTab === 'travel' && <Car className="w-20 h-20 mx-auto" />}
                {activeTab === 'hotels' && <HotelIcon className="w-20 h-20 mx-auto" />}
                {activeTab === 'food' && <Utensils className="w-20 h-20 mx-auto" />}
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No services found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
              <button 
                onClick={() => {
                  setPriceFilter('All');
                  setSortBy('rating');
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Need Help Planning Your Trip?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our travel experts are here to help you plan the perfect trip to {state.name}. 
              Get personalized recommendations and exclusive deals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Us
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Added to List Notification */}
      {showAddedNotification && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up z-50">
          <CheckCircle className="w-6 h-6" />
          <div>
            <p className="font-bold">Added to List!</p>
            <p className="text-sm text-green-100">Item added to your booking list</p>
          </div>
          <button 
            onClick={() => navigate('/user-list')}
            className="ml-4 bg-white/20 px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            View List
          </button>
        </div>
      )}
    </div>
  );
};

export default StateDetails;

