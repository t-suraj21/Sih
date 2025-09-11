import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Shield, Utensils, Car, Users, CheckCircle } from 'lucide-react';

const Destinations = () => {
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    budget: '',
    tourismType: '',
    sortBy: 'rating'
  });

  const [destinations, setDestinations] = useState([]);

  // Mock data for destinations
  const destinationsData = [
    {
      id: 1,
      name: 'Jaipur',
      state: 'Rajasthan',
      type: 'Heritage',
      budget: 'Medium',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&h=300&fit=crop',
      description: 'The Pink City offers magnificent palaces, forts, and vibrant culture with verified heritage guides and FSSAI-approved food outlets.',
      rating: 4.8,
      hygieneScore: 9.2,
      safetyLevel: 'High',
      verifiedServices: 45,
      attractions: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar'],
      bestTime: 'Oct - Mar'
    },
    {
      id: 2,
      name: 'Goa',
      state: 'Goa',
      type: 'Beach',
      budget: 'Medium',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop',
      description: 'Beach paradise with eco-certified resorts, water sports, and vibrant nightlife. All activities are safety-verified.',
      rating: 4.7,
      hygieneScore: 8.9,
      safetyLevel: 'High',
      verifiedServices: 38,
      attractions: ['Baga Beach', 'Dudhsagar Falls', 'Old Goa Churches', 'Anjuna Market'],
      bestTime: 'Nov - Feb'
    },
    {
      id: 3,
      name: 'Agra',
      state: 'Uttar Pradesh',
      type: 'Heritage',
      budget: 'Low',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop',
      description: 'Home of the magnificent Taj Mahal with government-certified guides and safe dining options throughout the city.',
      rating: 4.9,
      hygieneScore: 8.7,
      safetyLevel: 'High',
      verifiedServices: 52,
      attractions: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'],
      bestTime: 'Oct - Mar'
    },
    {
      id: 4,
      name: 'Kerala Backwaters',
      state: 'Kerala',
      type: 'Eco',
      budget: 'High',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=300&fit=crop',
      description: 'Gods Own Country with verified houseboats, organic food outlets, and sustainable tourism practices.',
      rating: 4.8,
      hygieneScore: 9.4,
      safetyLevel: 'High',
      verifiedServices: 41,
      attractions: ['Alleppey Backwaters', 'Kumarakom', 'Vembanad Lake', 'Spice Plantations'],
      bestTime: 'Sep - Mar'
    },
    {
      id: 5,
      name: 'Manali',
      state: 'Himachal Pradesh',
      type: 'Adventure',
      budget: 'Medium',
      image: 'https://images.unsplash.com/photo-1605538883669-825200433431?w=500&h=300&fit=crop',
      description: 'Mountain adventure destination with verified trekking guides, safe accommodation, and eco-friendly activities.',
      rating: 4.6,
      hygieneScore: 8.5,
      safetyLevel: 'Medium',
      verifiedServices: 34,
      attractions: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple', 'Old Manali'],
      bestTime: 'Apr - Jun, Sep - Nov'
    },
    {
      id: 6,
      name: 'Udaipur',
      state: 'Rajasthan',
      type: 'Heritage',
      budget: 'High',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
      description: 'City of Lakes with luxury verified hotels, royal palaces, and authenticated cultural experiences.',
      rating: 4.9,
      hygieneScore: 9.1,
      safetyLevel: 'High',
      verifiedServices: 47,
      attractions: ['City Palace', 'Lake Pichola', 'Jag Mandir', 'Saheliyon Ki Bari'],
      bestTime: 'Oct - Mar'
    },
    {
      id: 7,
      name: 'Rishikesh',
      state: 'Uttarakhand',
      type: 'Adventure',
      budget: 'Low',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=300&fit=crop',
      description: 'Yoga capital with verified ashrams, adventure sports, and organic food outlets along the Ganges.',
      rating: 4.7,
      hygieneScore: 8.8,
      safetyLevel: 'High',
      verifiedServices: 29,
      attractions: ['Laxman Jhula', 'Ram Jhula', 'Triveni Ghat', 'Beatles Ashram'],
      bestTime: 'Feb - May, Sep - Nov'
    },
    {
      id: 8,
      name: 'Hampi',
      state: 'Karnataka',
      type: 'Heritage',
      budget: 'Low',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop',
      description: 'UNESCO World Heritage site with certified archaeological guides and authentic local cuisine experiences.',
      rating: 4.5,
      hygieneScore: 8.3,
      safetyLevel: 'Medium',
      verifiedServices: 22,
      attractions: ['Virupaksha Temple', 'Hampi Bazaar', 'Matanga Hill', 'Elephant Stables'],
      bestTime: 'Oct - Feb'
    }
  ];

  const states = ['All States', 'Rajasthan', 'Goa', 'Uttar Pradesh', 'Kerala', 'Himachal Pradesh', 'Uttarakhand', 'Karnataka'];
  const budgetRanges = ['All Budgets', 'Low', 'Medium', 'High'];
  const tourismTypes = ['All Types', 'Heritage', 'Beach', 'Adventure', 'Eco'];

  useEffect(() => {
    let filtered = destinationsData;

    if (filters.search) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        dest.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.state && filters.state !== 'All States') {
      filtered = filtered.filter(dest => dest.state === filters.state);
    }

    if (filters.budget && filters.budget !== 'All Budgets') {
      filtered = filtered.filter(dest => dest.budget === filters.budget);
    }

    if (filters.tourismType && filters.tourismType !== 'All Types') {
      filtered = filtered.filter(dest => dest.type === filters.tourismType);
    }

    // Sort results
    if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'hygiene') {
      filtered.sort((a, b) => b.hygieneScore - a.hygieneScore);
    }

    setDestinations(filtered);
  }, [filters]);

  const getBudgetColor = (budget) => {
    switch (budget) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSafetyColor = (level) => {
    switch (level) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Destinations</h1>
          <p className="text-gray-600">Discover verified and safe travel destinations across India</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* State Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={filters.state}
                  onChange={(e) => setFilters({...filters, state: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Budget Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                <select
                  value={filters.budget}
                  onChange={(e) => setFilters({...filters, budget: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {budgetRanges.map(budget => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>
              </div>

              {/* Tourism Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type of Tourism</label>
                <select
                  value={filters.tourismType}
                  onChange={(e) => setFilters({...filters, tourismType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {tourismTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                  <option value="hygiene">Hygiene Score</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setFilters({search: '', state: '', budget: '', tourismType: '', sortBy: 'rating'})}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {destinations.length} destination{destinations.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destinations.map((destination) => (
                <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-64 object-cover"
                    />
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
                        <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {destination.state}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{destination.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">Best: {destination.bestTime}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{destination.description}</p>

                    {/* Scores */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Utensils className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">Hygiene: {destination.hygieneScore}/10</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className={`w-4 h-4 ${getSafetyColor(destination.safetyLevel)}`} />
                        <span className={`text-sm font-medium ${getSafetyColor(destination.safetyLevel)}`}>
                          {destination.safetyLevel} Safety
                        </span>
                      </div>
                    </div>

                    {/* Attractions */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Top Attractions:</p>
                      <div className="flex flex-wrap gap-1">
                        {destination.attractions.slice(0, 3).map((attraction, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                            {attraction}
                          </span>
                        ))}
                        {destination.attractions.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            +{destination.attractions.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{destination.verifiedServices} Services</span>
                        </span>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Explore Services
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {destinations.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MapPin className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
