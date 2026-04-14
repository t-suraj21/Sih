import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Shield, 
  CheckCircle, 
  ArrowLeft, 
  Sparkles,
  Calendar,
  Globe,
  Users,
  TrendingUp,
  Award,
  Map
} from 'lucide-react';
import { indianStates, getAllRegions, getStatesByRegion } from '../data/indianStates';

/**
 * Destinations.jsx
 * Comprehensive page showing all Indian States and Union Territories
 * Beautiful card-based design with filters and regional grouping
 */

const Destinations = () => {
  const navigate = useNavigate();

  // ---------------- State Management ----------------
  const [filters, setFilters] = useState({
    search: '',
    region: 'All Regions',
    type: 'All Types',
    budget: 'All Budgets',
    sortBy: 'rating'
  });

  const [displayedStates, setDisplayedStates] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'regional'

  // ---------------- Static Data ----------------
  const regions = ['All Regions', ...getAllRegions()];
  const types = ['All Types', 'State', 'Union Territory'];
  const budgets = ['All Budgets', 'Low', 'Medium', 'High'];

  // ---------------- Effect: Apply Filters ----------------
  useEffect(() => {
    let filtered = indianStates;

    // Search Filter
    if (filters.search) {
      filtered = filtered.filter(state => 
        state.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        state.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        state.capital.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Region Filter
    if (filters.region && filters.region !== 'All Regions') {
      filtered = filtered.filter(state => state.region === filters.region);
    }

    // Type Filter
    if (filters.type && filters.type !== 'All Types') {
      filtered = filtered.filter(state => state.type === filters.type);
    }

    // Budget Filter
    if (filters.budget && filters.budget !== 'All Budgets') {
      filtered = filtered.filter(state => state.budget === filters.budget);
    }

    // Sorting
    if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'popularity') {
      filtered.sort((a, b) => {
        const aCount = parseInt(a.touristCount.replace(/[^0-9]/g, ''));
        const bCount = parseInt(b.touristCount.replace(/[^0-9]/g, ''));
        return bCount - aCount;
      });
    }

    setDisplayedStates(filtered);
  }, [filters]);

  // ---------------- Utility Functions ----------------
  const getBudgetColor = (budget) => {
    switch (budget) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type) => {
    return type === 'State' 
      ? 'text-blue-600 bg-blue-100' 
      : 'text-purple-600 bg-purple-100';
  };

  const handleStateClick = (state) => {
    navigate(`/state/${encodeURIComponent(state.name)}`);
  };

  // ---------------- Statistics ----------------
  const stats = {
    totalStates: indianStates.filter(s => s.type === 'State').length,
    totalUTs: indianStates.filter(s => s.type === 'Union Territory').length,
    avgRating: (indianStates.reduce((sum, s) => sum + s.rating, 0) / indianStates.length).toFixed(1),
    regions: getAllRegions().length
  };

  // ---------------- Travel Facts ----------------
  const travelFacts = [
    "India has 28 states and 8 union territories, each with unique culture and heritage.",
    "Ladakh is home to the world's highest motorable road at Umling La Pass.",
    "Kerala is the first state in India to achieve 100% literacy.",
    "Rajasthan is the largest state by area, covering 342,239 sq km.",
    "Goa is the smallest state by area but one of the richest in per capita income."
  ];
  const randomFact = travelFacts[Math.floor(Math.random() * travelFacts.length)];

  // ---------------- Regional View Component ----------------
  const RegionalView = () => {
    const allRegions = getAllRegions();
    
    return (
      <div className="space-y-12">
        {allRegions.map((region) => {
          const regionStates = getStatesByRegion(region).filter(state => {
            // Apply search filter
            if (filters.search) {
              return state.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                     state.description.toLowerCase().includes(filters.search.toLowerCase());
            }
            return true;
          });

          if (regionStates.length === 0) return null;

          return (
            <div key={region} className="space-y-6">
              <div className="flex items-center space-x-3">
                <Map className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900">{region}</h2>
                <span className="text-gray-500 text-lg">({regionStates.length} destinations)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionStates.map(state => (
                  <StateCard key={state.id} state={state} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ---------------- State Card Component ----------------
  const StateCard = ({ state }) => (
    <div 
      onClick={() => handleStateClick(state)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={state.image} 
          alt={state.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {state.verified && (
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </span>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${getTypeColor(state.type)}`}>
            {state.type}
          </span>
        </div>

        {/* State Name Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1">{state.name}</h3>
          <p className="text-white/90 text-sm flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Capital: {state.capital}
          </p>
        </div>
      </div>

      <div className="p-5">
        {/* Rating and Budget */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-lg font-bold text-gray-900">{state.rating}</span>
            <span className="text-sm text-gray-500">/5</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBudgetColor(state.budget)}`}>
            {state.budget} Budget
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{state.description}</p>

        {/* Quick Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-green-600" />
            <span className="font-medium">Best Time:</span>
            <span className="ml-2">{state.bestTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2 text-green-600" />
            <span className="font-medium">Visitors:</span>
            <span className="ml-2">{state.touristCount}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Globe className="w-4 h-4 mr-2 text-green-600" />
            <span className="font-medium">Climate:</span>
            <span className="ml-2">{state.climate}</span>
          </div>
        </div>

        {/* Top Attractions */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Top Attractions:</p>
          <div className="flex flex-wrap gap-1">
            {state.topAttractions.slice(0, 3).map((attraction, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                {attraction}
              </span>
            ))}
            {state.topAttractions.length > 3 && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-medium">
                +{state.topAttractions.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Speciality */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-start">
            <Award className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-1">Famous For:</p>
              <p className="text-xs text-gray-600">{state.speciality}</p>
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleStateClick(state);
          }}
          className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Explore {state.name}
        </button>
      </div>
    </div>
  );

  // ---------------- Main UI Rendering ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Back Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 transition-colors" />
          <span className="text-gray-700 font-medium transition-colors">Back to Home</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-block mb-4">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              Explore Incredible India
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Discover <span className="text-yellow-300">All Indian States</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore all {stats.totalStates} states and {stats.totalUTs} union territories of India with verified information, 
            stunning destinations, and authentic experiences.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl">
              <CheckCircle className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-semibold">All States Covered</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl">
              <Shield className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-semibold">Verified Information</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl">
              <Star className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-semibold">{stats.avgRating} Avg Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="relative max-w-7xl mx-auto px-6 -mt-12 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: stats.totalStates, label: 'States', color: 'from-blue-500 to-blue-600', icon: <Map className="w-6 h-6" /> },
            { value: stats.totalUTs, label: 'Union Territories', color: 'from-purple-500 to-purple-600', icon: <MapPin className="w-6 h-6" /> },
            { value: stats.regions, label: 'Regions', color: 'from-green-500 to-green-600', icon: <Globe className="w-6 h-6" /> },
            { value: stats.avgRating, label: 'Average Rating', color: 'from-yellow-500 to-yellow-600', icon: <Star className="w-6 h-6" /> }
        ].map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-xl p-6 text-center text-white transform hover:scale-105 transition-all duration-300`}>
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm font-medium opacity-90">{stat.label}</div>
          </div>
        ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Filter className="w-6 h-6 mr-3 text-green-600" />
              Filter Destinations
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'all' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                All States
              </button>
              <button
                onClick={() => setViewMode('regional')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'regional' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                By Region
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                  placeholder="Search states, capitals, attractions..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Region</label>
              <select
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                {regions.map((region, idx) => (
                  <option key={idx} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                {types.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Budget Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Budget</label>
              <select
                value={filters.budget}
                onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                {budgets.map((budget, idx) => (
                  <option key={idx} value={budget}>{budget}</option>
                ))}
              </select>
            </div>
            </div>

          {/* Sort By */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600 font-medium">
              Showing <span className="text-green-600 font-bold">{displayedStates.length}</span> destination{displayedStates.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* States Grid or Regional View */}
        {viewMode === 'regional' ? (
          <RegionalView />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedStates.map(state => (
              <StateCard key={state.id} state={state} />
            ))}
          </div>
        )}

          {/* Empty State */}
        {displayedStates.length === 0 && (
          <div className="text-center py-20">
            <MapPin className="w-20 h-20 mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No destinations found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
            <button 
              onClick={() => setFilters({ search: '', region: 'All Regions', type: 'All Types', budget: 'All Budgets', sortBy: 'rating' })}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Clear All Filters
            </button>
            </div>
          )}

        {/* Did You Know Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl p-8 flex items-start gap-6 text-white">
          <Sparkles className="w-12 h-12 flex-shrink-0 text-yellow-300" />
            <div>
            <h3 className="text-2xl font-bold mb-3">🇮🇳 Did You Know?</h3>
            <p className="text-lg leading-relaxed text-white/95">{randomFact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
