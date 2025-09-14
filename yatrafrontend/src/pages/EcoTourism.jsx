import { useState, useEffect, useCallback } from 'react';
import { 
  Leaf, 
  Award, 
  TreePine, 
  Recycle, 
  Sun, 
  Droplets, 
  Mountain, 
  Star,
  CheckCircle,
  MapPin,
  Users,
  TrendingUp,
  Heart,
  Globe,
  Filter,
  Search,
  Clock,
  Calendar,
  Shield,
  Camera,
  BookOpen,
  Zap,
  Wind,
  Flower2,
  Bird,
  Fish,
  Compass,
  Target,
  ArrowRight,
  Play,
  ExternalLink,
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp,
  Info,
  AlertCircle,
  Sparkles,
  Waves,
  Loader2,
  X
} from 'lucide-react';
import ecoTourismAPI from '../services/ecoTourismApi.js';
import BookingModal from '../components/BookingModal.jsx';

const EcoTourism = () => {
  // State management
  const [ecoOptions, setEcoOptions] = useState([]);
  const [featuredOptions, setFeaturedOptions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [userEcoPoints, setUserEcoPoints] = useState(1250);
  const [expandedTips, setExpandedTips] = useState({});
  
  // Filter states
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    region: '',
    minEcoRating: '',
    carbonFootprint: '',
    search: '',
    sortBy: 'ratings.overall',
    sortOrder: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Load data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load data when filters change
  useEffect(() => {
    if (!loading) {
      loadEcoOptions();
    }
  }, [loadEcoOptions, loading]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [optionsResponse, featuredResponse, statsResponse] = await Promise.all([
        ecoTourismAPI.getEcoTourismOptions({ limit: 12, page: 1 }),
        ecoTourismAPI.getFeaturedEcoTourism({ limit: 6 }),
        ecoTourismAPI.getEcoTourismStats()
      ]);

      setEcoOptions(optionsResponse.data.ecoOptions || []);
      setFeaturedOptions(featuredResponse.data || []);
      setStats(statsResponse.data || {});
      
      if (optionsResponse.data.pagination) {
        setTotalPages(optionsResponse.data.pagination.totalPages);
        setHasMore(optionsResponse.data.pagination.hasNextPage);
      }

      setError(null);
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError('Failed to load eco-tourism data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadEcoOptions = useCallback(async () => {
    try {
      const params = {
        ...filters,
        page: currentPage,
        limit: 12
      };

      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === undefined) {
          delete params[key];
        }
      });

      const response = await ecoTourismAPI.getEcoTourismOptions(params);
      
      if (currentPage === 1) {
        setEcoOptions(response.data.ecoOptions || []);
      } else {
        setEcoOptions(prev => [...prev, ...(response.data.ecoOptions || [])]);
      }

      if (response.data.pagination) {
        setTotalPages(response.data.pagination.totalPages);
        setHasMore(response.data.pagination.hasNextPage);
      }
    } catch (err) {
      console.error('Error loading eco options:', err);
      setError('Failed to load eco-tourism options.');
    }
  }, [filters, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleFilterChange('search', e.target.search.value);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleBooking = (option) => {
    setSelectedOption(option);
    setShowBookingModal(true);
  };

  const toggleTipExpansion = (category) => {
    setExpandedTips(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Enhanced eco tips with more comprehensive information
  const ecoTips = [
    {
      category: 'Transportation',
      icon: <Mountain className="w-6 h-6 text-green-600" />,
      color: 'green',
      tips: [
        'Choose trains over flights when possible - 75% less carbon emissions',
        'Use public transport or shared rides in destinations',
        'Rent electric vehicles or bicycles for short distances',
        'Walk whenever feasible to reduce carbon footprint',
        'Choose direct flights if flying is necessary',
        'Offset your carbon emissions through verified programs'
      ]
    },
    {
      category: 'Accommodation',
      icon: <TreePine className="w-6 h-6 text-blue-600" />,
      color: 'blue',
      tips: [
        'Stay at eco-certified hotels and lodges',
        'Reuse towels and linens to save water',
        'Turn off lights, AC, and electronics when not in room',
        'Choose accommodations with renewable energy',
        'Support locally-owned properties',
        'Use refillable water bottles instead of plastic'
      ]
    },
    {
      category: 'Activities',
      icon: <Sun className="w-6 h-6 text-yellow-600" />,
      color: 'yellow',
      tips: [
        'Choose nature-based and low-impact activities',
        'Support wildlife conservation programs',
        'Avoid activities that exploit or harm animals',
        'Participate in local conservation efforts',
        'Choose small group tours over mass tourism',
        'Learn about local ecosystems and biodiversity'
      ]
    },
    {
      category: 'Consumption',
      icon: <Recycle className="w-6 h-6 text-purple-600" />,
      color: 'purple',
      tips: [
        'Carry reusable water bottles and shopping bags',
        'Say no to single-use plastics',
        'Eat local, seasonal, and organic food',
        'Buy from local artisans and fair-trade sources',
        'Minimize waste generation and pack light',
        'Choose biodegradable toiletries and products'
      ]
    }
  ];

  // Enhanced eco rewards system
  const ecoRewards = [
    { points: 50, reward: 'Eco Explorer', description: 'Digital badge for your first sustainable journey', icon: <Leaf className="w-5 h-5" /> },
    { points: 100, reward: '5% Green Discount', description: 'On your next eco-certified booking', icon: <Award className="w-5 h-5" /> },
    { points: 250, reward: 'Tree Guardian', description: 'Plant 5 trees in your name', icon: <TreePine className="w-5 h-5" /> },
    { points: 500, reward: '10% Eco Warrior', description: 'Discount on all eco-tourism packages', icon: <Shield className="w-5 h-5" /> },
    { points: 1000, reward: 'Conservation Hero', description: 'Free wildlife conservation expedition', icon: <Heart className="w-5 h-5" /> },
    { points: 2000, reward: 'Eco Ambassador', description: 'Certified eco-travel ambassador status', icon: <Globe className="w-5 h-5" /> }
  ];

  if (loading && ecoOptions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading eco-tourism experiences...</p>
        </div>
      </div>
    );
  }

  if (error && ecoOptions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={loadInitialData}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="w-12 h-12 mr-4 text-white animate-pulse" />
              <h1 className="text-5xl font-bold text-white">
                Eco-Friendly Tourism
              </h1>
            </div>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Discover sustainable travel experiences that protect our planet while creating unforgettable memories. 
              Every journey contributes to conservation efforts and supports local communities.
            </p>
            
            {/* User eco points display */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 mb-8">
              <Sparkles className="w-6 h-6 mr-3 text-yellow-300" />
            <div className="text-center">
                <div className="text-3xl font-bold text-white">{userEcoPoints.toLocaleString()}</div>
                <div className="text-sm text-green-100">Eco Points Earned</div>
              </div>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search eco-friendly destinations, activities, or experiences..."
                  className="w-full px-6 py-4 pl-12 pr-20 rounded-full bg-white/90 backdrop-blur-sm border-0 focus:ring-4 focus:ring-white/30 focus:outline-none text-gray-800 placeholder-gray-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Impact Statistics */}
        {stats.overview && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-green-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
              Global Eco Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TreePine className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600">{(stats.overview.totalTreesPlanted || 0).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Trees Planted</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Wind className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600">{(stats.overview.totalCO2Reduced || 0).toLocaleString()}kg</div>
                <div className="text-sm text-gray-600">CO₂ Reduced</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600">{(stats.overview.totalCommunitiesSupported || 0).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Communities Supported</div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-yellow-600">{stats.overview.avgEcoRating ? stats.overview.avgEcoRating.toFixed(1) : '0'}</div>
                <div className="text-sm text-gray-600">Avg Eco Rating</div>
              </div>
            </div>
          </div>
        )}

        {/* Eco Points & Rewards */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 mb-12 text-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <Award className="w-6 h-6 mr-2" />
              Your Eco Journey
            </h2>
            <div className="text-right">
              <div className="text-sm opacity-90">Next Reward</div>
              <div className="text-lg font-semibold">250 points to go!</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {ecoRewards.map((reward, index) => (
              <div key={index} className={`text-center p-4 rounded-xl border-2 transition-all ${
                userEcoPoints >= reward.points 
                  ? 'border-white bg-white/20 shadow-lg' 
                  : 'border-white/30 bg-white/5'
              }`}>
                <div className={`mb-2 ${userEcoPoints >= reward.points ? 'text-white' : 'text-white/60'}`}>
                  {reward.icon}
                </div>
                <div className={`text-lg font-bold ${
                  userEcoPoints >= reward.points ? 'text-white' : 'text-white/60'
                }`}>
                  {reward.points}
                </div>
                <div className={`text-xs ${
                  userEcoPoints >= reward.points ? 'text-white/90' : 'text-white/50'
                }`}>
                  {reward.reward}
                </div>
                {userEcoPoints >= reward.points && (
                  <CheckCircle className="w-4 h-4 text-white mx-auto mt-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filter Experiences</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              {showFilters ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>
                </div>
                
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {ecoTourismAPI.getTypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {ecoTourismAPI.getCategories().map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Regions</option>
                {ecoTourismAPI.getRegions().map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>

              <select
                value={filters.carbonFootprint}
                onChange={(e) => handleFilterChange('carbonFootprint', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Carbon Impact</option>
                {ecoTourismAPI.getCarbonFootprintLevels().map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="ratings.overall">Highest Rated</option>
                <option value="sustainability.ecoRating">Eco Rating</option>
                <option value="pricing.basePrice">Price: Low to High</option>
                <option value="createdAt">Newest First</option>
                <option value="popularityScore">Most Popular</option>
              </select>
                    </div>
          )}
                  </div>

        {/* Featured Eco-Tourism Options */}
        {featuredOptions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-yellow-500" />
              Featured Eco Experiences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredOptions.slice(0, 6).map((option) => (
                <EcoOptionCard 
                  key={option._id} 
                  option={option} 
                  onBook={() => handleBooking(option)}
                  featured={true}
                />
            ))}
          </div>
        </div>
        )}

        {/* All Eco-Tourism Options */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Globe className="w-8 h-8 mr-3 text-green-600" />
            Sustainable Travel Experiences
            <span className="ml-4 text-lg font-normal text-gray-500">
              ({ecoOptions.length} experiences)
            </span>
          </h2>
          
          {ecoOptions.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No experiences found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
                  </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ecoOptions.map((option) => (
                  <EcoOptionCard 
                    key={option._id} 
                    option={option} 
                    onBook={() => handleBooking(option)}
                  />
                ))}
                  </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center mx-auto"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 text-white mr-2" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Experiences
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                    </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sustainable Travel Tips */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            <BookOpen className="w-8 h-8 mr-3 text-blue-600 inline" />
            Sustainable Travel Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecoTips.map((tipCategory, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`bg-gradient-to-r from-${tipCategory.color}-500 to-${tipCategory.color}-600 p-6`}>
                  <div className="flex items-center text-white">
                  {tipCategory.icon}
                    <h3 className="text-lg font-bold ml-3">{tipCategory.category}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {tipCategory.tips.slice(0, expandedTips[tipCategory.category] ? tipCategory.tips.length : 3).map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-gray-700 text-sm flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                  {tipCategory.tips.length > 3 && (
                    <button
                      onClick={() => toggleTipExpansion(tipCategory.category)}
                      className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                    >
                      {expandedTips[tipCategory.category] ? (
                        <>
                          Show Less
                          <ChevronUp className="w-4 h-4 ml-1" />
                        </>
                      ) : (
                        <>
                          Show More ({tipCategory.tips.length - 3} more)
                          <ChevronDown className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative">
            <h2 className="text-4xl font-bold mb-4">Start Your Eco Journey Today</h2>
            <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
              Join millions of conscious travelers making a positive impact on our planet. 
              Every sustainable choice you make helps preserve our beautiful world for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center">
                <Compass className="w-5 h-5 mr-2" />
                Explore Destinations
              </button>
              <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center">
                <Target className="w-5 h-5 mr-2" />
                Calculate My Impact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedOption && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedOption(null);
          }}
          serviceType="eco-tourism"
          serviceData={selectedOption}
        />
      )}
    </div>
  );
};

// Enhanced Eco Option Card Component
const EcoOptionCard = ({ option, onBook, featured = false }) => {
  const [bookmarked, setBookmarked] = useState(false);
  
  const getCarbonFootprintColor = (footprint) => {
    switch (footprint) {
      case 'Very Low': return 'text-green-600 bg-green-100';
      case 'Low': return 'text-blue-600 bg-blue-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Destination': return <MapPin className="w-4 h-4" />;
      case 'Activity': return <Camera className="w-4 h-4" />;
      case 'Accommodation': return <TreePine className="w-4 h-4" />;
      case 'Tour': return <Compass className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${featured ? 'ring-2 ring-yellow-400' : ''}`}>
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={option.images?.[0]?.url || '/placeholder-eco.jpg'} 
          alt={option.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Top badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </span>
          )}
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <Leaf className="w-3 h-3 mr-1" />
            Eco {option.sustainability?.ecoRating || 'N/A'}
          </span>
        </div>

        {/* Top right actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              bookmarked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCarbonFootprintColor(option.sustainability?.carbonFootprint)}`}>
              {option.sustainability?.carbonFootprint || 'Unknown'} Carbon
            </span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              +{option.rewards?.ecoPointsEarned || 0} Points
            </span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="text-green-600 mr-2">
                {getTypeIcon(option.type)}
              </span>
              <span className="text-sm text-gray-500 font-medium">{option.type}</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-500">{option.category}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{option.name}</h3>
            <p className="text-gray-600 flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {option.location?.city}, {option.location?.state}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {option.shortDescription || option.description}
        </p>

        {/* Features */}
        {option.sustainability?.ecoFeatures && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {option.sustainability.ecoFeatures.slice(0, 3).map((feature, index) => (
                <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs">
                  {feature.feature}
                </span>
              ))}
              {option.sustainability.ecoFeatures.length > 3 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                  +{option.sustainability.ecoFeatures.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Ratings and Duration */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-medium">{option.ratings?.overall?.toFixed(1) || 'New'}</span>
            <span className="mx-1">•</span>
            <span>{option.ratings?.totalReviews || 0} reviews</span>
          </div>
          {option.duration?.recommended && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{option.duration.recommended}</span>
            </div>
          )}
        </div>

        {/* Certifications */}
        {option.sustainability?.certifications?.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {option.sustainability.certifications.slice(0, 2).map((cert, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs flex items-center">
                  <Award className="w-3 h-3 mr-1" />
                  {cert.name}
                </span>
              ))}
              {option.sustainability.certifications.length > 2 && (
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
                  +{option.sustainability.certifications.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-green-600">
              {ecoTourismAPI.formatPrice(option.pricing?.basePrice || 0)}
            </span>
            <span className="text-gray-600 text-sm">/{option.pricing?.priceUnit || 'person'}</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
              <Info className="w-4 h-4 mr-1" />
              Details
            </button>
            <button 
              onClick={() => onBook(option)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoTourism;