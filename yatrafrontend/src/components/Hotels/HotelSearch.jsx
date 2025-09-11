import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react';

const HotelSearch = ({ onSearch, isLoading }) => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: '',
    rating: '',
    amenities: [],
    hotelType: ''
  });

  const popularDestinations = [
    'Jaipur, Rajasthan',
    'Goa',
    'Mumbai, Maharashtra',
    'Delhi NCR',
    'Bangalore, Karnataka',
    'Chennai, Tamil Nadu',
    'Kolkata, West Bengal',
    'Hyderabad, Telangana'
  ];

  const amenitiesList = [
    'Free WiFi',
    'Swimming Pool',
    'Spa',
    'Gym',
    'Restaurant',
    'Room Service',
    'Parking',
    'Business Center'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'amenities') {
      setFilters(prev => ({
        ...prev,
        amenities: prev.amenities.includes(value)
          ? prev.amenities.filter(a => a !== value)
          : [...prev.amenities, value]
      }));
    } else {
      setFilters(prev => ({ ...prev, [filterType]: value }));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ ...searchData, filters });
    }
  };

  const handleQuickDestination = (destination) => {
    setSearchData(prev => ({ ...prev, destination }));
  };

  // Set default dates (today + 1 for check-in, today + 2 for check-out)
  const getDefaultDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);
    
    return {
      checkIn: tomorrow.toISOString().split('T')[0],
      checkOut: dayAfter.toISOString().split('T')[0]
    };
  };

  // Set default dates on component mount
  useState(() => {
    const defaultDates = getDefaultDates();
    setSearchData(prev => ({
      ...prev,
      checkIn: prev.checkIn || defaultDates.checkIn,
      checkOut: prev.checkOut || defaultDates.checkOut
    }));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSearch} className="space-y-6">
        {/* Main Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Destination */}
          <div className="lg:col-span-2 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="destination"
                value={searchData.destination}
                onChange={handleInputChange}
                placeholder="Where do you want to stay?"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            {/* Popular destinations dropdown */}
            {searchData.destination === '' && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Popular Destinations</p>
                  <div className="space-y-1">
                    {popularDestinations.slice(0, 4).map((destination, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleQuickDestination(destination)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                      >
                        {destination}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Check-in Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="checkIn"
                value={searchData.checkIn}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-out
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="checkOut"
                value={searchData.checkOut}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min={searchData.checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Guests & Rooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guests & Rooms
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Users className="absolute left-2 top-3 w-4 h-4 text-gray-400" />
                <select
                  name="guests"
                  value={searchData.guests}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <select
                name="rooms"
                value={searchData.rooms}
                onChange={handleInputChange}
                className="w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Search Hotels</span>
              </>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (per night)
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Price</option>
                  <option value="0-2000">Under ₹2,000</option>
                  <option value="2000-5000">₹2,000 - ₹5,000</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="10000+">Above ₹10,000</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>

              {/* Hotel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotel Type
                </label>
                <select
                  value={filters.hotelType}
                  onChange={(e) => handleFilterChange('hotelType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Type</option>
                  <option value="heritage">Heritage Hotels</option>
                  <option value="business">Business Hotels</option>
                  <option value="resort">Resorts</option>
                  <option value="eco">Eco-Friendly</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Distance</option>
                </select>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity)}
                      onChange={() => handleFilterChange('amenities', amenity)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default HotelSearch;
