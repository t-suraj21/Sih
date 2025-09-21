import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Shield, Utensils, Users, CheckCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { indianDestinations } from '../data/indianDestinations';

/**
 * Destinations.jsx
 * Component for showing all travel destinations in India
 * Includes filters, sorting, and service exploration navigation
 * Managed by [Your Name]
 */

const Destinations = () => {
  const navigate = useNavigate();

  // ---------------- Filters State ----------------
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    budget: '',
    tourismType: '',
    sortBy: 'rating'
  });

  // ---------------- Data State ----------------
  const [destinations, setDestinations] = useState([]);

  // ---------------- Static Lists ----------------
  const allStates = ['All States', ...Array.from(new Set(indianDestinations.map(d => d.state)))];
  const budgetRanges = ['All Budgets', ...Array.from(new Set(indianDestinations.map(d => d.budget)))];
  const tourismTypes = ['All Types', ...Array.from(new Set(indianDestinations.map(d => d.type)))];

  // ---------------- Effect: Apply Filters ----------------
  useEffect(() => {
    console.log("Filters updated:", filters); // Debugging purpose, shows active filters

    let filtered = indianDestinations;

    // Search Filter
    if (filters.search) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        dest.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // State Filter
    if (filters.state && filters.state !== 'All States') {
      filtered = filtered.filter(dest => dest.state === filters.state);
    }

    // Budget Filter
    if (filters.budget && filters.budget !== 'All Budgets') {
      filtered = filtered.filter(dest => dest.budget === filters.budget);
    }

    // Tourism Type Filter
    if (filters.tourismType && filters.tourismType !== 'All Types') {
      filtered = filtered.filter(dest => dest.type === filters.tourismType);
    }

    // Sorting
    if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'hygiene') {
      filtered.sort((a, b) => b.hygieneScore - a.hygieneScore);
    }

    setDestinations(filtered);
  }, [filters]);

  // ---------------- Utility Functions ----------------
  const getBudgetColor = (budget) => {
    switch (budget) {
      case 'Low': return 'text-green-400 bg-green-800/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-800/20';
      case 'High': return 'text-red-400 bg-red-800/20';
      default: return 'text-gray-400 bg-gray-800/20';
    }
  };

  const getSafetyColor = (level) => {
    switch (level) {
      case 'High': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const handleExploreServices = (destination) => {
    navigate(`/destination/${encodeURIComponent(destination.name)}/services`);
  };

  // ---------------- Extra Feature: Fun Travel Facts ----------------
  const travelFacts = [
    "India is home to the world’s highest motorable road at Umling La Pass, Ladakh.",
    "The Sundarbans in West Bengal is the world’s largest mangrove forest.",
    "Mawsynram in Meghalaya holds the record for being the wettest place on Earth.",
    "Shani Shingnapur village in Maharashtra has houses with no doors — crime-free for centuries.",
    "Lonar Lake in Maharashtra was created by a meteor impact around 50,000 years ago."
  ];
  const randomFact = travelFacts[Math.floor(Math.random() * travelFacts.length)];

  // ---------------- UI Rendering ----------------
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative">

      {/* Back Arrow Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate('/NewHomepage')}
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-800/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-100 hover:text-gray-300" />
          <span className="text-gray-100 font-medium hover:text-gray-300">Back</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gray-800/90 backdrop-blur-sm text-white shadow-2xl rounded-b-3xl">
        <div className="absolute inset-0 bg-gray-700/20 rounded-b-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Explore <span className="text-yellow-400">India's Destinations</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover {indianDestinations.length}+ verified and safe travel destinations across Bharat with trusted guides and transparent services.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center bg-gray-700/50 px-6 py-3 rounded-full shadow-xl border border-gray-600">
              <CheckCircle className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="font-semibold">Verified Services</span>
            </div>
            <div className="flex items-center bg-gray-700/50 px-6 py-3 rounded-full shadow-xl border border-gray-600">
              <Shield className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="font-semibold">Safety Guaranteed</span>
            </div>
            <div className="flex items-center bg-gray-700/50 px-6 py-3 rounded-full shadow-xl border border-gray-600">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="font-semibold">Quality Assured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: indianDestinations.length, label: 'Total Destinations', color: 'text-green-400' },
          { value: Array.from(new Set(indianDestinations.map(d => d.state))).length, label: 'States & UTs', color: 'text-emerald-400' },
          { value: indianDestinations.reduce((sum, d) => sum + d.verifiedServices, 0), label: 'Verified Services', color: 'text-green-400' },
          { value: (indianDestinations.reduce((sum, d) => sum + d.rating, 0) / indianDestinations.length).toFixed(1), label: 'Average Rating', color: 'text-yellow-400' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-gray-800/50 rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700">
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
            <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters & Destinations */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-gray-800/85 backdrop-blur-md rounded-2xl shadow-xl p-10 sticky top-32 border border-gray-700 space-y-6">
            <h2 className="text-xl font-semibold text-gray-100 flex items-center mb-6">
              <Filter className="w-6 h-6 mr-3 text-green-400" />
              Filters
            </h2>

            {/* Search Input */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-300 text-sm font-medium">Search</label>
              <input
                type="text"
                placeholder="Type destination..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* State Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-300 text-sm font-medium">State</label>
              <select
                value={filters.state}
                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {allStates.map((state, idx) => (
                  <option key={idx} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Budget Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-300 text-sm font-medium">Budget</label>
              <select
                value={filters.budget}
                onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {budgetRanges.map((budget, idx) => (
                  <option key={idx} value={budget}>{budget}</option>
                ))}
              </select>
            </div>

            {/* Tourism Type Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-300 text-sm font-medium">Tourism Type</label>
              <select
                value={filters.tourismType}
                onChange={(e) => setFilters({ ...filters, tourismType: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {tourismTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Sort By Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-300 text-sm font-medium">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="rating">Rating</option>
                <option value="name">Name</option>
                <option value="hygiene">Hygiene</option>
              </select>
            </div>

          </div>
        </div>

        {/* Destinations Grid */}
        <div className="lg:w-2/3">
          <p className="text-gray-300 mb-6 font-medium">
            Showing {destinations.length} destination{destinations.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map(destination => (
              <div key={destination.id} className="bg-gray-800/70 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 border border-gray-700">
                <div className="relative">
                  <img src={destination.image} alt={destination.name} className="w-full h-64 object-cover rounded-t-2xl" />
                  <div className="absolute top-4 right-4 space-y-2">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getBudgetColor(destination.budget)}`}>
                      {destination.budget} Budget
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    {destination.type} Tourism
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-100">{destination.name}</h3>
                      <p className="text-gray-300 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {destination.state}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-300">{destination.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">Best: {destination.bestTime}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{destination.description}</p>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Utensils className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-300">Hygiene: {destination.hygieneScore}/10</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield className={`w-4 h-4 ${getSafetyColor(destination.safetyLevel)}`} />
                      <span className={`text-sm font-medium ${getSafetyColor(destination.safetyLevel)}`}>
                        {destination.safetyLevel} Safety
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-300 mb-2">Top Attractions:</p>
                    <div className="flex flex-wrap gap-1">
                      {destination.attractions.slice(0, 3).map((attraction, index) => (
                        <span key={index} className="bg-gray-700 text-green-400 px-2 py-1 rounded text-xs">
                          {attraction}
                        </span>
                      ))}
                      {destination.attractions.length > 3 && (
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                          +{destination.attractions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{destination.verifiedServices} Services</span>
                      </span>
                    </div>
                    <button 
                      onClick={() => handleExploreServices(destination)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Explore Services
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {destinations.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 mx-auto text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No destinations found</h3>
              <p className="text-gray-400">Try adjusting your filters to see more results</p>
            </div>
          )}

          {/* Did You Know Section - Travel Fact */}
          <div className="mt-12 bg-gradient-to-r from-green-700/30 to-emerald-600/20 rounded-2xl shadow-xl border border-green-800 p-8 flex items-start gap-4">
            <Sparkles className="w-10 h-10 text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-green-300 mb-2">🌍 Did You Know?</h3>
              <p className="text-gray-200 leading-relaxed">{randomFact}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Destinations;
