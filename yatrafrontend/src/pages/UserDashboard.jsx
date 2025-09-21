import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, MapPin, Calendar, Heart, Star, Award, Shield, Bell, 
  CreditCard, Settings, LogOut, Plane, Hotel, Camera, 
  TrendingUp, Clock, CheckCircle, AlertCircle, Phone, Mail,
  Edit, Plus, Eye, Download, Share2, BookOpen, Leaf, Gift,
  BarChart3, Activity, Globe, Compass, Target, Zap, 
  ChevronRight, Filter, Search, MoreHorizontal, Bookmark,
  Navigation, Headphones, Coffee, Mountain, Waves, Sun
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api.service';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load user data and statistics
    loadDashboardData();
  }, []);

  // Update profile data when user data changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || ''
      });
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard data from backend
      const dashboardResponse = await apiService.getUserDashboard();
      
      if (dashboardResponse.success && dashboardResponse.data) {
        const data = dashboardResponse.data;
        
        // Set bookings
        setBookings(data.recentBookings || []);
        
        // Set stats
        setStats(data.stats || {
          totalBookings: 0,
          completedTrips: 0,
          savedDestinations: 0,
          ecoPoints: 0,
          loyaltyLevel: 'Explorer'
        });

        // Set favorites
        setFavorites(data.favorites || []);

        // Set notifications
        setNotifications(data.notifications || []);

      } else {
        // Fallback to empty data if API fails
        console.warn('Dashboard API failed, using fallback data:', dashboardResponse.message);
        setError('Failed to load dashboard data. Please refresh the page.');
        
        // Set minimal fallback data
        setBookings([]);
        setFavorites([]);
        setNotifications([{
          id: 1,
          type: 'info',
          title: 'Welcome to Yatra!',
          message: 'Start exploring amazing destinations and book your perfect stay.',
          time: '1 day ago',
          read: false
        }]);
        setStats({
          totalBookings: 0,
          completedTrips: 0,
          savedDestinations: 0,
          ecoPoints: 0,
          loyaltyLevel: 'Explorer'
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data. Please check your connection.');
      
      // Set fallback data on error
      setBookings([]);
      setFavorites([]);
      setNotifications([]);
      setStats({
        totalBookings: 0,
        completedTrips: 0,
        savedDestinations: 0,
        ecoPoints: 0,
        loyaltyLevel: 'Explorer'
      });
    } finally {
      setLoading(false);
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
    <div className="space-y-8">
      {/* Enhanced Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Good morning</p>
                <h1 className="text-3xl font-bold">{user?.name}!</h1>
              </div>
            </div>
            <p className="text-white/90 text-lg mb-6">Ready to explore incredible destinations today?</p>
            
            {/* Quick Stats */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-xs">Next Trip</p>
                  <p className="text-white font-semibold text-sm">Dec 25, 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-xs">Travel Goal</p>
                  <p className="text-white font-semibold text-sm">8/12 Places</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Loyalty Badge */}
          <div className="text-center">
            <div className="relative">
              <div className={`w-20 h-20 bg-gradient-to-br ${getLoyaltyColor(stats.loyaltyLevel)} rounded-2xl flex items-center justify-center mb-3 shadow-2xl`}>
                <Award className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-yellow-800 fill-current" />
              </div>
            </div>
            <p className="text-white font-semibold text-sm">{stats.loyaltyLevel}</p>
            <p className="text-white/70 text-xs">Level 3</p>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-500 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12%
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalBookings}</p>
              <p className="text-gray-400 text-xs">This month</p>
            </div>
          </div>
        </div>

        <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-green-500 text-sm font-medium">
                  <Activity className="w-4 h-4 mr-1" />
                  Active
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Completed Trips</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.completedTrips}</p>
              <p className="text-gray-400 text-xs">Total journeys</p>
            </div>
          </div>
        </div>

        <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-blue-500 text-sm font-medium">
                  <Bookmark className="w-4 h-4 mr-1" />
                  Saved
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Wishlist Places</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.savedDestinations}</p>
              <p className="text-gray-400 text-xs">Dream destinations</p>
            </div>
          </div>
        </div>

        <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-emerald-500 text-sm font-medium">
                  <Zap className="w-4 h-4 mr-1" />
                  Eco
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Eco Points</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.ecoPoints}</p>
              <p className="text-gray-400 text-xs">Sustainability score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                <p className="text-sm text-gray-600">Your latest travel adventures</p>
              </div>
            </div>
            <Link 
              to="/bookings" 
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="p-6">
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="group relative bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-2xl p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={booking.image} 
                        alt={booking.title}
                        className="w-20 h-20 rounded-2xl object-cover shadow-md"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Plane className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{booking.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-600">{booking.destination}</p>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-500">{booking.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900 mb-1">₹{booking.amount.toLocaleString()}</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">Start your journey by exploring amazing destinations</p>
              <Link 
                to="/destinations" 
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <Compass className="w-5 h-5" />
                <span>Explore Destinations</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <p className="text-sm text-gray-600">Fast access to key features</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            to="/destinations" 
            className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-100 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <p className="font-bold text-gray-900 mb-1">Explore</p>
            <p className="text-sm text-gray-600">Destinations</p>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link 
            to="/hotels" 
            className="group relative bg-gradient-to-br from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 border border-emerald-100 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Hotel className="w-7 h-7 text-white" />
            </div>
            <p className="font-bold text-gray-900 mb-1">Hotels</p>
            <p className="text-sm text-gray-600">Book Stay</p>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link 
            to="/eco-tourism" 
            className="group relative bg-gradient-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 border border-teal-100 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <p className="font-bold text-gray-900 mb-1">Eco Tour</p>
            <p className="text-sm text-gray-600">Sustainable</p>
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link 
            to="/safety-sos" 
            className="group relative bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 border border-red-100 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <p className="font-bold text-gray-900 mb-1">SOS</p>
            <p className="text-sm text-gray-600">Emergency</p>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>

      {/* Travel Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Travel Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Travel Progress</h3>
                <p className="text-sm text-gray-600">Your journey so far</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mountain className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700">Mountains</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600">3/4</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Waves className="w-4 h-4 text-cyan-600" />
                </div>
                <span className="text-gray-700">Beaches</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-cyan-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600">2/4</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Coffee className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">Cultural Sites</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600">5/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Navigation className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Travel Tips</h3>
                <p className="text-sm text-gray-600">Personalized recommendations</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Best time to visit Rajasthan</h4>
                  <p className="text-xs text-gray-600 mt-1">October to March offers pleasant weather for sightseeing</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Pack light for Kerala backwaters</h4>
                  <p className="text-xs text-gray-600 mt-1">Cotton clothes and mosquito repellent are essential</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: ''
  });
  const [profileLoading, setProfileLoading] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    
    try {
      const response = await apiService.updateUserProfile(profileData);
      
      if (response.success) {
        // Profile updated successfully
        alert('Profile updated successfully!');
        // Optionally refresh dashboard data
        loadDashboardData();
      } else {
        alert(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
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
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleProfileChange('location', e.target.value)}
                  placeholder="Your city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setProfileData({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    location: ''
                  });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={profileLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                {profileLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-5 h-5" />, color: 'blue' },
    { id: 'bookings', name: 'My Bookings', icon: <Calendar className="w-5 h-5" />, color: 'green' },
    { id: 'favorites', name: 'Favorites', icon: <Heart className="w-5 h-5" />, color: 'red' },
    { id: 'profile', name: 'Profile', icon: <Settings className="w-5 h-5" />, color: 'purple' }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <p className="text-red-800">{error}</p>
              <button 
                onClick={loadDashboardData}
                className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium bg-red-100 hover:bg-red-200 px-4 py-2 rounded-xl transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full blur-xl"></div>
                </div>
                <div className="relative text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-white">{user?.name}</h3>
                  <p className="text-white/80 capitalize text-sm">{user?.role} Member</p>
                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/90 text-xs">Online</span>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl font-medium transition-all duration-300 group ${
                        activeTab === tab.id
                          ? `bg-${tab.color}-50 text-${tab.color}-600 border border-${tab.color}-200 shadow-sm scale-105`
                          : 'text-gray-600 hover:bg-gray-50 hover:scale-102'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        activeTab === tab.id
                          ? `bg-${tab.color}-100`
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        {tab.icon}
                      </div>
                      <span className="font-semibold">{tab.name}</span>
                      {activeTab === tab.id && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  ))}
                </nav>

                {/* Support Section */}
                <div className="mt-8 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Headphones className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Need Help?</h4>
                      <p className="text-xs text-gray-600">24/7 Support Available</p>
                    </div>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-xl transition-colors">
                    Contact Support
                  </button>
                </div>

                {/* Logout */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl font-medium transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="w-10 h-10 bg-red-100 group-hover:bg-red-200 rounded-xl flex items-center justify-center transition-colors">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'bookings' && renderBookings()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'favorites' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">My Favorites</h2>
                    <p className="text-gray-600 mt-2">Places you've saved for future adventures</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-colors">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>Add New</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {favorites.length > 0 ? favorites.map((item) => (
                    <div key={item.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 right-4">
                          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                          </button>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{item.name}</h3>
                            <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View Details
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center py-16">
                      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">No favorites yet</h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">Start exploring destinations and save your favorite places for future trips.</p>
                      <Link 
                        to="/destinations" 
                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                      >
                        <Compass className="w-5 h-5" />
                        <span>Explore Destinations</span>
                      </Link>
                    </div>
                  )}
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