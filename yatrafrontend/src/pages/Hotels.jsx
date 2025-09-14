import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { MapPin, Filter, SlidersHorizontal, Star, Award, Search, Navigation, Globe } from 'lucide-react';
import HotelSearch from '../components/Hotels/HotelSearch';
import HotelCard from '../components/Hotels/HotelCard';
import HotelBookingForm from '../components/Hotels/HotelBookingForm';
import { realHotelBookingService } from '../services/realHotelApi';
import { indianDestinations } from '../data/indianDestinations';

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [destinationQuery, setDestinationQuery] = useState('');
  const [error, setError] = useState(null);

  // Load initial data on component mount
  useEffect(() => {
    // Check if there's a destination from URL params or location state
    const destinationFromParams = searchParams.get('destination');
    const destinationFromState = location.state?.destination;
    
    if (destinationFromParams || destinationFromState) {
      const destination = destinationFromParams || destinationFromState;
      setDestinationQuery(destination);
      handleSearch({
        destination: destination,
        checkIn: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        checkOut: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        guests: 2,
        rooms: 1,
        state: ''
      });
    } else {
      loadInitialData();
    }
    loadStates();
  }, [searchParams, location.state]);

  const loadInitialData = async () => {
    handleSearch({
      destination: 'India',
      checkIn: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      checkOut: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
      guests: 2,
      rooms: 1,
      state: ''
    });
  };

  const loadStates = async () => {
    try {
      const result = await realHotelBookingService.getStatesWithHotels();
      if (result.success) {
        setStates(result.data);
      }
    } catch (error) {
      console.error('Failed to load states:', error);
    }
  };

  const handleSearch = async (searchDataParam) => {
    setIsLoading(true);
    setError(null);
    const finalSearchData = {...searchDataParam, state: selectedState};
    setSearchData(finalSearchData);
    
    try {
      console.log('Searching with params:', JSON.stringify(finalSearchData));
      const result = await realHotelBookingService.searchHotels(finalSearchData);
      console.log('Search result:', JSON.stringify(result));
      
      if (result.success) {
        setHotels(result.data || []);
        if ((result.data || []).length === 0) {
          setError(`No hotels found for "${finalSearchData.destination}". Try a different destination or check your spelling.`);
        }
      } else {
        console.error('Hotel search failed:', result.error);
        setError(result.error || 'Failed to search hotels. Please try again.');
        setHotels([]);
      }
    } catch (error) {
      console.error('Hotel search error:', error);
      setError('An error occurred while searching for hotels. Please try again.');
      setHotels([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Search destinations function
  const searchDestinations = (query) => {
    if (!query || query.length < 2) {
      setDestinationSuggestions([]);
      setShowDestinationSuggestions(false);
      return;
    }

    const filtered = indianDestinations.filter(dest => 
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.state.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setDestinationSuggestions(filtered);
    setShowDestinationSuggestions(filtered.length > 0);
  };

  // Handle destination input change
  const handleDestinationChange = (query) => {
    setDestinationQuery(query);
    searchDestinations(query);
  };

  // Handle destination selection
  const handleDestinationSelect = (destination) => {
    setDestinationQuery(destination.name);
    setShowDestinationSuggestions(false);
    setDestinationSuggestions([]);
    
    // Trigger search with selected destination
    if (searchData) {
      handleSearch({
        ...searchData,
        destination: destination.name
      });
    }
  };

  const handleStateChange = (stateName) => {
    setSelectedState(stateName);
    if (searchData) {
      handleSearch({
        ...searchData,
        state: stateName
      });
    }
  };

  const handleBookNow = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingForm(true);
  };

  const handleViewDetails = (hotel) => {
    // Navigate to hotel details page or show modal
    console.log('View details for:', hotel.name);
  };

  const handleBookingComplete = (bookingData) => {
    console.log('Booking completed:', bookingData);
    setShowBookingForm(false);
    setSelectedHotel(null);
    // You could show a success message or redirect to booking confirmation
  };

  const handleBookingCancel = () => {
    setShowBookingForm(false);
    setSelectedHotel(null);
  };

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'distance', label: 'Distance' }
  ];

  const [sortBy, setSortBy] = useState('relevance');

  const sortedHotels = [...hotels].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        const priceA = a.pricePerNight || a.price || 0;
        const priceB = b.pricePerNight || b.price || 0;
        return priceA - priceB;
      case 'price_high':
        const priceHighA = a.pricePerNight || a.price || 0;
        const priceHighB = b.pricePerNight || b.price || 0;
        return priceHighB - priceHighA;
      case 'rating':
        const ratingA = parseFloat(a.rating) || 0;
        const ratingB = parseFloat(b.rating) || 0;
        return ratingB - ratingA;
      default:
        return 0;
    }
  });

  if (showBookingForm && selectedHotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>
            <p className="text-gray-600">
              {selectedHotel.name} - {
                typeof selectedHotel.location === 'string' 
                  ? selectedHotel.location 
                  : selectedHotel.city && selectedHotel.state 
                    ? `${selectedHotel.city}, ${selectedHotel.state}` 
                    : 'Location not specified'
              }
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HotelBookingForm
            hotel={selectedHotel}
            onBookingComplete={handleBookingComplete}
            onCancel={handleBookingCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotels & Stays</h1>
          <p className="text-gray-600">Find verified hotels with transparent pricing and no hidden charges</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Destination Search */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Navigation className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Search Hotels by Destination</h3>
          </div>
          
          <div className="relative max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter destination (e.g., Jaipur, Goa, Delhi...)"
                value={destinationQuery}
                onChange={(e) => handleDestinationChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Destination Suggestions */}
            {showDestinationSuggestions && destinationSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {destinationSuggestions.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => handleDestinationSelect(destination)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{destination.name}</div>
                        <div className="text-sm text-gray-600">{destination.state}</div>
                      </div>
                      <div className="ml-auto">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{destination.rating}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {destinationQuery && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <Globe className="w-4 h-4 inline mr-1" />
                Searching hotels in <strong>{destinationQuery}</strong> - Showing verified properties with transparent pricing.
              </p>
            </div>
          )}
        </div>

        {/* Search Component */}
        <HotelSearch onSearch={handleSearch} isLoading={isLoading} />

        {/* State Filter */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Filter by State:
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleStateChange('')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedState === '' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All States
              </button>
              {states.map((state) => (
                <button
                  key={state.code}
                  onClick={() => handleStateChange(state.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                    selectedState === state.name 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {state.name}
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    {state.hotelsCount}
                  </span>
                </button>
              ))}
            </div>
          </div>
          {selectedState && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <Award className="w-4 h-4 inline mr-1" />
                Showing verified hotels in <strong>{selectedState}</strong> - All properties are government verified and FSSAI certified.
              </p>
            </div>
          )}
        </div>

        {/* Results Header */}
        {searchData && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                {hotels.length} verified hotels found
                {selectedState && (
                  <span className="text-gray-600 font-normal"> in {selectedState}</span>
                )}
                {!selectedState && searchData.destination && searchData.destination !== 'India' && (
                  <span className="text-gray-600 font-normal"> for {searchData.destination}</span>
                )}
              </h2>
              {searchData.checkIn && searchData.checkOut && (
                <p className="text-gray-600 text-sm">
                  {new Date(searchData.checkIn).toLocaleDateString()} - {new Date(searchData.checkOut).toLocaleDateString()}
                  • {searchData.guests} guest{searchData.guests > 1 ? 's' : ''} • {searchData.rooms} room{searchData.rooms > 1 ? 's' : ''}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-300 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Searching for the best hotels...</span>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-red-900 mb-1">Search Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && hotels.length === 0 && searchData && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or choose a different destination
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => handleSearch({ ...searchData, destination: 'London' })}
                className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 bg-blue-50 rounded-lg"
              >
                Try London
              </button>
              <button
                onClick={() => handleSearch({ ...searchData, destination: 'Mumbai' })}
                className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 bg-blue-50 rounded-lg"
              >
                Try Mumbai
              </button>
              <button
                onClick={() => handleSearch({ ...searchData, destination: 'Delhi' })}
                className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 bg-blue-50 rounded-lg"
              >
                Try Delhi
              </button>
            </div>
          </div>
        )}

        {/* Hotels Grid */}
        {!isLoading && sortedHotels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedHotels.map((hotel, index) => (
              <HotelCard
                key={hotel.id || hotel._id || `hotel-${index}`}
                hotel={hotel}
                onBookNow={handleBookNow}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && sortedHotels.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Load More Hotels
            </button>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Why Book Hotels with Yatra?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Government Verified</h4>
              <p className="text-gray-600 text-sm">All hotels are verified by government authorities for your safety</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">No Hidden Charges</h4>
              <p className="text-gray-600 text-sm">Transparent pricing with all taxes and fees included upfront</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">24x7 Support</h4>
              <p className="text-gray-600 text-sm">Round-the-clock customer support for all your booking needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
