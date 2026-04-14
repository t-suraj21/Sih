import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Search,
  Filter,
  Star,
  ArrowLeft,
  Navigation,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Info
} from 'lucide-react';
import { indianStates } from '../data/indianStates';

const IndiaMap = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');

  // Tourist locations with coordinates (sample data)
  const touristLocations = [
    { id: 1, name: 'Taj Mahal', state: 'Uttar Pradesh', lat: 27.1751, lng: 78.0421, rating: 4.9, type: 'Heritage' },
    { id: 2, name: 'Golden Temple', state: 'Punjab', lat: 31.6200, lng: 74.8765, rating: 4.8, type: 'Spiritual' },
    { id: 3, name: 'Gateway of India', state: 'Maharashtra', lat: 18.9220, lng: 72.8347, rating: 4.6, type: 'Monument' },
    { id: 4, name: 'Hawa Mahal', state: 'Rajasthan', lat: 26.9239, lng: 75.8267, rating: 4.7, type: 'Heritage' },
    { id: 5, name: 'Mysore Palace', state: 'Karnataka', lat: 12.3052, lng: 76.6552, rating: 4.8, type: 'Heritage' },
    { id: 6, name: 'Dal Lake', state: 'Jammu & Kashmir', lat: 34.1089, lng: 74.8403, rating: 4.9, type: 'Nature' },
    { id: 7, name: 'Meenakshi Temple', state: 'Tamil Nadu', lat: 9.9195, lng: 78.1193, rating: 4.8, type: 'Spiritual' },
    { id: 8, name: 'Victoria Memorial', state: 'West Bengal', lat: 22.5448, lng: 88.3426, rating: 4.6, type: 'Heritage' },
    { id: 9, name: 'Charminar', state: 'Telangana', lat: 17.3616, lng: 78.4747, rating: 4.5, type: 'Monument' },
    { id: 10, name: 'Goa Beaches', state: 'Goa', lat: 15.2993, lng: 74.1240, rating: 4.7, type: 'Beach' },
    { id: 11, name: 'Qutub Minar', state: 'Delhi', lat: 28.5244, lng: 77.1855, rating: 4.6, type: 'Heritage' },
    { id: 12, name: 'Amber Fort', state: 'Rajasthan', lat: 26.9855, lng: 75.8513, rating: 4.8, type: 'Heritage' },
    { id: 13, name: 'Backwaters', state: 'Kerala', lat: 9.4981, lng: 76.3388, rating: 4.9, type: 'Nature' },
    { id: 14, name: 'Konark Sun Temple', state: 'Odisha', lat: 19.8876, lng: 86.0945, rating: 4.7, type: 'Heritage' },
    { id: 15, name: 'Kaziranga', state: 'Assam', lat: 26.5775, lng: 93.1711, rating: 4.8, type: 'Wildlife' }
  ];

  const regions = ['All', 'North India', 'South India', 'East India', 'West India', 'Northeast India', 'Central India'];

  const filteredLocations = touristLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.state.toLowerCase().includes(searchQuery.toLowerCase());
    const stateData = indianStates.find(s => s.name === location.state);
    const matchesRegion = filterRegion === 'All' || stateData?.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  const handleLocationClick = (location) => {
    const state = indianStates.find(s => s.name === location.state);
    if (state) {
      navigate(`/state/${encodeURIComponent(state.name)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Navigation className="w-8 h-8 text-blue-600" />
                  India Tourist Map
                </h1>
                <p className="text-gray-600 mt-1">Explore tourist destinations across India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations, states..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Interactive Map</h2>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg transition-colors">
                    <ZoomIn className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg transition-colors">
                    <ZoomOut className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg transition-colors">
                    <Maximize2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* SVG Map Placeholder */}
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="w-24 h-24 text-blue-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Interactive India Map</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    An interactive SVG map of India with clickable states and tourist locations will be displayed here.
                    Click on any location from the list to explore destinations.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
                    <Info className="w-4 h-4" />
                    <span className="text-sm font-medium">{filteredLocations.length} locations found</span>
                  </div>
                </div>

                {/* Sample Location Pins */}
                <div className="absolute inset-0 pointer-events-none">
                  {filteredLocations.slice(0, 10).map((location, idx) => (
                    <div
                      key={location.id}
                      className="absolute animate-bounce"
                      style={{
                        top: `${20 + (idx * 8)}%`,
                        left: `${30 + (idx * 6)}%`,
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      <div className="relative pointer-events-auto cursor-pointer group">
                        <MapPin className="w-8 h-8 text-red-600 drop-shadow-lg hover:scale-125 transition-transform" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                          <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
                            {location.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Legend */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span className="text-gray-600">Heritage Sites</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span className="text-gray-600">Nature & Wildlife</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-600">Spiritual Sites</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-600">Beaches</span>
                </div>
              </div>
            </div>
          </div>

          {/* Locations List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Tourist Locations ({filteredLocations.length})
              </h3>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => handleLocationClick(location)}
                    className="p-4 bg-gray-50 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 mb-1 truncate">{location.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{location.state}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {location.type}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-semibold text-gray-700">{location.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredLocations.length === 0 && (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No locations found</p>
                  <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Locations', value: touristLocations.length, color: 'blue' },
            { label: 'States Covered', value: new Set(touristLocations.map(l => l.state)).size, color: 'green' },
            { label: 'Heritage Sites', value: touristLocations.filter(l => l.type === 'Heritage').length, color: 'purple' },
            { label: 'Avg Rating', value: (touristLocations.reduce((sum, l) => sum + l.rating, 0) / touristLocations.length).toFixed(1), color: 'yellow' }
          ].map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-2xl shadow-lg p-6 text-white text-center`}>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm font-medium opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;

