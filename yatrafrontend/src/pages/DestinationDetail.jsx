import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Star, Clock, Calendar, Users, Car, Plane, Train, 
  Camera, Heart, Share2, Bookmark, Navigation, Phone, Globe,
  Utensils, ShoppingBag, Hotel, Wifi, Shield, Award, Zap,
  ChevronRight, ChevronLeft, Play, Pause, Volume2, VolumeX,
  Thermometer, Droplets, Wind, Sun, Moon, Cloud, CloudRain,
  CheckCircle, XCircle, AlertTriangle, Info, ExternalLink
} from 'lucide-react';
import destinationApi from '../services/destinationApi.js';
import attractionApi from '../services/attractionApi.js';
import apiService from '../services/api.service.js';
import { Loader2 } from 'lucide-react';

const DestinationDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (name) {
      loadDestinationData();
    }
  }, [name]);

  const loadDestinationData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load destination details
      const destinationResponse = await destinationApi.getDestinationByName(name);
      if (destinationResponse.success) {
        setDestination(destinationResponse.data.destination);
      }

      // Load attractions
      const attractionsResponse = await attractionApi.getDestinationAttractions(name, { limit: 20 });
      if (attractionsResponse.success) {
        setAttractions(attractionsResponse.data.attractions || []);
      }

      // Load hotels
      const hotelsResponse = await apiService.searchHotels({
        destination: name,
        checkIn: new Date().toISOString().split('T')[0],
        checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        guests: 2,
        rooms: 1,
        limit: 12
      });
      if (hotelsResponse.success) {
        setHotels(hotelsResponse.data.hotels || []);
      }

    } catch (err) {
      console.error('Error loading destination data:', err);
      setError('Failed to load destination information');
    } finally {
      setLoading(false);
    }
  };

  const handleBookHotel = (hotel) => {
    navigate(`/hotels/${hotel.id}`);
  };

  const handleExploreAttraction = (attraction) => {
    navigate(`/attractions/${attraction._id}`);
  };

  const getWeatherIcon = (season) => {
    switch (season) {
      case 'Summer': return <Sun className="w-5 h-5 text-orange-500" />;
      case 'Monsoon': return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'Winter': return <Moon className="w-5 h-5 text-blue-300" />;
      default: return <Cloud className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTransportIcon = (type) => {
    switch (type) {
      case 'byAir': return <Plane className="w-5 h-5" />;
      case 'byRail': return <Train className="w-5 h-5" />;
      case 'byRoad': return <Car className="w-5 h-5" />;
      default: return <Navigation className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading destination information...</p>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Destination Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested destination could not be found.'}</p>
          <button
            onClick={() => navigate('/destinations')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info className="w-4 h-4" /> },
    { id: 'attractions', label: 'Tourist Places', icon: <Award className="w-4 h-4" /> },
    { id: 'hotels', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
    { id: 'activities', label: 'Activities', icon: <Zap className="w-4 h-4" /> },
    { id: 'food', label: 'Food & Shopping', icon: <Utensils className="w-4 h-4" /> },
    { id: 'travel', label: 'How to Reach', icon: <Navigation className="w-4 h-4" /> },
    { id: 'weather', label: 'Weather', icon: <Thermometer className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {destination.images && destination.images.length > 0 ? (
          <img
            src={destination.images[0]?.url || destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold">{destination.name}</h1>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div className="text-white">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">{destination.state}, {destination.region}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{destination.name}</h1>
                <p className="text-xl text-gray-200 max-w-2xl">
                  {destination.shortDescription || destination.description}
                </p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="font-medium">{destination.statistics?.averageRating?.toFixed(1) || '4.5'}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-1" />
                    <span>{destination.statistics?.visitorCount?.toLocaleString() || '10,000+'} visitors</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-1" />
                    <span>{destination.statistics?.attractionsCount || attractions.length} attractions</span>
                  </div>
                  <div className="flex items-center">
                    <Hotel className="w-5 h-5 mr-1" />
                    <span>{destination.statistics?.hotelsCount || hotels.length} hotels</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 md:mt-0">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`p-3 rounded-full transition-colors ${
                    isFavorited ? 'bg-red-500 text-white' : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3 rounded-full transition-colors ${
                    isBookmarked ? 'bg-blue-500 text-white' : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                  }`}
                >
                  <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {destination.description}
                  </p>
                  
                  {destination.highlights && destination.highlights.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Highlights</h3>
                      <ul className="space-y-2">
                        {destination.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  {/* Quick Info Card */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Best Time to Visit</span>
                        <span className="font-medium">{destination.bestTimeToVisit?.season || 'Year Round'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">2-5 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Budget</span>
                        <span className="font-medium">₹2,000 - ₹8,000/day</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Language</span>
                        <span className="font-medium">Hindi, English</span>
                      </div>
                    </div>
                  </div>

                  {/* Safety & Verification */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety & Verification</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Verified Destination</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Tourist Friendly</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Government Approved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tourist Places Tab */}
          {activeTab === 'attractions' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Tourist Places in {destination.name}</h2>
                <span className="text-gray-600">{attractions.length} attractions found</span>
              </div>
              
              {attractions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {attractions.map((attraction) => (
                    <div key={attraction._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={attraction.image || '/api/placeholder/400/250'}
                          alt={attraction.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          {attraction.featured && (
                            <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{attraction.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{attraction.description}</p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{attraction.ratings?.overall?.toFixed(1) || '4.5'}</span>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {attraction.category}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => handleExploreAttraction(attraction)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                        >
                          Explore
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No attractions found</h3>
                  <p className="text-gray-600">Attractions for this destination are being updated.</p>
                </div>
              )}
            </div>
          )}

          {/* Hotels Tab */}
          {activeTab === 'hotels' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Hotels in {destination.name}</h2>
                <span className="text-gray-600">{hotels.length} hotels found</span>
              </div>
              
              {hotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hotels.map((hotel) => (
                    <div key={hotel.id || hotel._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={hotel.image || hotel.images?.[0] || '/api/placeholder/400/250'}
                          alt={hotel.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Available
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{hotel.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {hotel.location || hotel.address}
                        </p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{hotel.rating?.toFixed(1) || '4.5'}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">
                              ₹{hotel.price?.toLocaleString() || '2,500'}
                            </div>
                            <div className="text-xs text-gray-500">per night</div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleBookHotel(hotel)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Hotel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
                  <p className="text-gray-600">Hotels for this destination are being updated.</p>
                </div>
              )}
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === 'activities' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Activities & Experiences</h2>
              {destination.activities && destination.activities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.activities.map((activity, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center mb-3">
                        <Zap className="w-6 h-6 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {activity.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-green-600">{activity.price}</span>
                        </div>
                        {activity.operator && (
                          <div className="text-xs text-gray-400">
                            Operator: {activity.operator}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Activities Coming Soon</h3>
                  <p className="text-gray-600">We're working on adding exciting activities for this destination.</p>
                </div>
              )}
            </div>
          )}

          {/* Food & Shopping Tab */}
          {activeTab === 'food' && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cuisine Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Local Cuisine</h2>
                  {destination.cuisine && destination.cuisine.length > 0 ? (
                    <div className="space-y-4">
                      {destination.cuisine.map((dish, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{dish.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{dish.description}</p>
                          {dish.restaurants && dish.restaurants.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Recommended Restaurants:</h4>
                              <div className="space-y-2">
                                {dish.restaurants.map((restaurant, rIndex) => (
                                  <div key={rIndex} className="text-sm">
                                    <div className="font-medium">{restaurant.name}</div>
                                    <div className="text-gray-600">{restaurant.address}</div>
                                    <div className="text-blue-600">{restaurant.specialty}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">Cuisine information is being updated.</p>
                    </div>
                  )}
                </div>

                {/* Shopping Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping</h2>
                  {destination.shopping && destination.shopping.length > 0 ? (
                    <div className="space-y-4">
                      {destination.shopping.map((market, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{market.market}</h3>
                          <p className="text-gray-600 text-sm mb-2">{market.specialty}</p>
                          <div className="space-y-1 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{market.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{market.timings}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">Shopping information is being updated.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* How to Reach Tab */}
          {activeTab === 'travel' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Reach {destination.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* By Air */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <Plane className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">By Air</h3>
                  </div>
                  {destination.howToReach?.byAir ? (
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-gray-900">{destination.howToReach.byAir.airport}</div>
                        <div className="text-sm text-gray-600">{destination.howToReach.byAir.distance}</div>
                      </div>
                      {destination.howToReach.byAir.airlines && (
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Airlines:</div>
                          <div className="text-sm text-gray-600">
                            {destination.howToReach.byAir.airlines.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">Air connectivity information not available.</p>
                  )}
                </div>

                {/* By Rail */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <Train className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">By Rail</h3>
                  </div>
                  {destination.howToReach?.byRail ? (
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-gray-900">{destination.howToReach.byRail.station}</div>
                        <div className="text-sm text-gray-600">{destination.howToReach.byRail.distance}</div>
                      </div>
                      {destination.howToReach.byRail.trains && (
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Trains:</div>
                          <div className="text-sm text-gray-600">
                            {destination.howToReach.byRail.trains.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">Rail connectivity information not available.</p>
                  )}
                </div>

                {/* By Road */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <Car className="w-6 h-6 text-orange-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">By Road</h3>
                  </div>
                  {destination.howToReach?.byRoad ? (
                    <div className="space-y-3">
                      {destination.howToReach.byRoad.majorHighways && (
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Highways:</div>
                          <div className="text-sm text-gray-600">
                            {destination.howToReach.byRoad.majorHighways.join(', ')}
                          </div>
                        </div>
                      )}
                      {destination.howToReach.byRoad.busServices && (
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Bus Services:</div>
                          <div className="text-sm text-gray-600">
                            {destination.howToReach.byRoad.busServices.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">Road connectivity information not available.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Weather Tab */}
          {activeTab === 'weather' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Weather & Best Time to Visit</h2>
              
              {/* Best Time to Visit */}
              {destination.bestTimeToVisit && (
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Time to Visit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-medium">{destination.bestTimeToVisit.season}</span>
                      </div>
                      {destination.bestTimeToVisit.months && (
                        <div className="text-sm text-gray-600">
                          Months: {destination.bestTimeToVisit.months.join(', ')}
                        </div>
                      )}
                    </div>
                    {destination.bestTimeToVisit.description && (
                      <div className="text-sm text-gray-700">
                        {destination.bestTimeToVisit.description}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Weather Information */}
              {destination.weather && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Summer */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <Sun className="w-6 h-6 text-orange-500 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Summer</h3>
                    </div>
                    {destination.weather.summer ? (
                      <div className="space-y-2">
                        {destination.weather.summer.temperature && (
                          <div className="flex items-center">
                            <Thermometer className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm">
                              {destination.weather.summer.temperature.min}°C - {destination.weather.summer.temperature.max}°C
                            </span>
                          </div>
                        )}
                        {destination.weather.summer.description && (
                          <p className="text-sm text-gray-600">{destination.weather.summer.description}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-sm">Summer weather information not available.</p>
                    )}
                  </div>

                  {/* Monsoon */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <CloudRain className="w-6 h-6 text-blue-500 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Monsoon</h3>
                    </div>
                    {destination.weather.monsoon ? (
                      <div className="space-y-2">
                        {destination.weather.monsoon.rainfall && (
                          <div className="flex items-center">
                            <Droplets className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm">{destination.weather.monsoon.rainfall}</span>
                          </div>
                        )}
                        {destination.weather.monsoon.description && (
                          <p className="text-sm text-gray-600">{destination.weather.monsoon.description}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-sm">Monsoon weather information not available.</p>
                    )}
                  </div>

                  {/* Winter */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <Moon className="w-6 h-6 text-blue-300 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Winter</h3>
                    </div>
                    {destination.weather.winter ? (
                      <div className="space-y-2">
                        {destination.weather.winter.temperature && (
                          <div className="flex items-center">
                            <Thermometer className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm">
                              {destination.weather.winter.temperature.min}°C - {destination.weather.winter.temperature.max}°C
                            </span>
                          </div>
                        )}
                        {destination.weather.winter.description && (
                          <p className="text-sm text-gray-600">{destination.weather.winter.description}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-sm">Winter weather information not available.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
