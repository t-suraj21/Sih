import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, MapPin, Calendar, Heart, Star, Award, Shield, Bell, 
  CreditCard, Settings, LogOut, Plane, Hotel, Camera, 
  TrendingUp, Clock, CheckCircle, AlertCircle, Phone, Mail,
  Edit, Plus, Eye, Download, Share2, BookOpen, Leaf, Gift
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedTrips: 0,
    savedDestinations: 0,
    ecoPoints: 0,
    loyaltyLevel: 'Explorer'
  });

  useEffect(() => {
    // Load user data and statistics
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      setBookings([
        {
          id: 1,
          type: 'Hotel',
          title: 'Luxury Resort Goa',
          destination: 'Goa',
          date: '2024-01-15',
          status: 'confirmed',
          amount: 15000,
          image: '/api/placeholder/300/200'
        },
        {
          id: 2,
          type: 'Tour',
          title: 'Golden Triangle Tour',
          destination: 'Delhi-Agra-Jaipur',
          date: '2024-02-10',
          status: 'pending',
          amount: 25000,
          image: '/api/placeholder/300/200'
        }
      ]);

      setFavorites([
        {
          id: 1,
          name: 'Kerala Backwaters',
          type: 'Destination',
          rating: 4.8,
          image: '/api/placeholder/300/200'
        },
        {
          id: 2,
          name: 'Rajasthan Heritage Tour',
          type: 'Experience',
          rating: 4.9,
          image: '/api/placeholder/300/200'
        }
      ]);

      setNotifications([
        {
          id: 1,
          type: 'booking',
          title: 'Booking Confirmed',
          message: 'Your Goa resort booking has been confirmed',
          time: '2 hours ago',
          read: false
        },
        {
          id: 2,
          type: 'offer',
          title: 'Special Offer',
          message: '20% off on Himachal Pradesh tours',
          time: '1 day ago',
          read: false
        }
      ]);

      setStats({
        totalBookings: 12,
        completedTrips: 8,
        savedDestinations: 15,
        ecoPoints: 2450,
        loyaltyLevel: 'Explorer'
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getLoyaltyColor = (level) => {
    switch (level) {
      case 'Explorer': return 'from-green-500 to-emerald-600';
      case 'Adventurer': return 'from-blue-500 to-indigo-600';
      case 'Legend': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100">Ready for your next adventure?</p>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 bg-gradient-to-r ${getLoyaltyColor(stats.loyaltyLevel)} rounded-full flex items-center justify-center mb-2`}>
              <Award className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm font-medium">{stats.loyaltyLevel}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed Trips</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedTrips}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Saved Places</p>
              <p className="text-2xl font-bold text-gray-900">{stats.savedDestinations}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Eco Points</p>
              <p className="text-2xl font-bold text-gray-900">{stats.ecoPoints}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <Link to="/bookings" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <img 
                  src={booking.image} 
                  alt={booking.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{booking.title}</h3>
                  <p className="text-sm text-gray-600">{booking.destination}</p>
                  <p className="text-sm text-gray-500">{booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{booking.amount.toLocaleString()}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link 
          to="/destinations" 
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <p className="font-medium text-gray-900">Explore</p>
          <p className="text-sm text-gray-600">Destinations</p>
        </Link>

        <Link 
          to="/hotels" 
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
            <Hotel className="w-6 h-6 text-green-600" />
          </div>
          <p className="font-medium text-gray-900">Book</p>
          <p className="text-sm text-gray-600">Hotels</p>
        </Link>

        <Link 
          to="/eco-tourism" 
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <p className="font-medium text-gray-900">Eco</p>
          <p className="text-sm text-gray-600">Tourism</p>
        </Link>

        <Link 
          to="/safety-sos" 
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group"
        >
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-red-200 transition-colors">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <p className="font-medium text-gray-900">Safety</p>
          <p className="text-sm text-gray-600">SOS</p>
        </Link>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
        <Link 
          to="/destinations" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          New Booking
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <img 
              src={booking.image} 
              alt={booking.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{booking.type}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.title}</h3>
              <p className="text-gray-600 mb-4">{booking.destination}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="text-xl font-bold text-gray-900">₹{booking.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                  View Details
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-blue-600 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue={user?.phone}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Your city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <User className="w-5 h-5" /> },
    { id: 'bookings', name: 'My Bookings', icon: <Calendar className="w-5 h-5" /> },
    { id: 'favorites', name: 'Favorites', icon: <Heart className="w-5 h-5" /> },
    { id: 'profile', name: 'Profile', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'bookings' && renderBookings()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">My Favorites</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.type}</p>
                        <div className="flex items-center mt-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;