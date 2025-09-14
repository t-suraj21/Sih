import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building, BarChart3, Users, Calendar, Star, DollarSign, 
  Plus, Edit, Eye, Trash2, Settings, Bell, Award, TrendingUp,
  MapPin, Clock, CheckCircle, AlertCircle, XCircle, Phone,
  Mail, Camera, Upload, Download, Filter, Search, RefreshCw, LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api.service';

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVendorData();
  }, []);

  const loadVendorData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load vendor bookings
      const bookingsResponse = await apiService.getBookings();
      if (bookingsResponse.success) {
        setBookings(bookingsResponse.data.bookings || []);
      }

      // Load vendor services (hotels for now)
      const servicesResponse = await apiService.searchHotels({ 
        limit: 20 
      });
      if (servicesResponse.success) {
        const hotelServices = servicesResponse.data.hotels.map(hotel => ({
          id: hotel._id,
          name: hotel.name,
          type: 'Hotel',
          location: `${hotel.city}, ${hotel.state}`,
          price: hotel.price,
          rating: hotel.rating || 4.5,
          bookings: Math.floor(Math.random() * 50) + 10, // Mock booking count
          status: hotel.isActive ? 'active' : 'inactive',
          image: hotel.images?.[0] || '/api/placeholder/300/200'
        }));
        setServices(hotelServices);
      }

      // Calculate analytics from real data
      const totalRevenue = bookingsResponse.success ? 
        bookingsResponse.data.bookings?.reduce((sum, booking) => sum + (booking.pricing?.totalAmount || 0), 0) || 0 : 0;
      
      const totalBookings = bookingsResponse.success ? bookingsResponse.data.bookings?.length || 0 : 0;
      const activeServices = servicesResponse.success ? servicesResponse.data.hotels?.filter(h => h.isActive)?.length || 0 : 0;
      const averageRating = servicesResponse.success ? 
        (servicesResponse.data.hotels?.reduce((sum, hotel) => sum + (hotel.rating || 0), 0) / (servicesResponse.data.hotels?.length || 1)) || 4.5 : 4.5;

      setAnalytics({
        totalRevenue,
        totalBookings,
        activeServices,
        averageRating: Math.round(averageRating * 10) / 10,
        monthlyGrowth: 15.2, // Mock growth
        pendingPayouts: Math.floor(totalRevenue * 0.2) // Mock pending payouts (20% of revenue)
      });

      // Mock notifications for now
      setNotifications([
        {
          id: 1,
          type: 'booking',
          title: 'Welcome to Yatra!',
          message: 'Start managing your tourism business with our platform',
          time: '1 day ago',
          read: false
        }
      ]);

    } catch (error) {
      console.error('Error loading vendor data:', error);
      setError('Failed to load dashboard data. Please try again.');
      
      // Set fallback data
      setServices([]);
      setBookings([]);
      setAnalytics({
        totalRevenue: 0,
        totalBookings: 0,
        activeServices: 0,
        averageRating: 0,
        monthlyGrowth: 0,
        pendingPayouts: 0
      });
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'confirmed': return 'text-green-600 bg-green-50 border-green-200';
      case 'completed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h1>
            <p className="text-green-100">Manage your tourism business with ease</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <Building className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm font-medium">Service Provider</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{analytics.totalRevenue?.toLocaleString()}</p>
              <p className="text-green-600 text-sm">+{analytics.monthlyGrowth}% this month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalBookings}</p>
              <p className="text-blue-600 text-sm">Active services</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Services</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeServices}</p>
              <p className="text-purple-600 text-sm">Listed services</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}</p>
              <p className="text-yellow-600 text-sm">Customer satisfaction</p>
              </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <Link to="#" className="text-green-600 hover:text-green-500 text-sm font-medium">
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No bookings yet</p>
                <p className="text-sm text-gray-400">Your bookings will appear here once customers start booking your services.</p>
              </div>
            ) : (
              bookings.slice(0, 5).map((booking) => (
              <div key={booking._id || booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                <div>
                    <h3 className="font-semibold text-gray-900">
                      {booking.guestDetails?.primaryGuest?.name || booking.customerName || 'Guest'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {booking.hotel?.name || booking.serviceName || 'Service'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : booking.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{(booking.pricing?.totalAmount || booking.amount || 0).toLocaleString()}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              ))
            )}
            </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
            <Plus className="w-6 h-6 text-green-600" />
          </div>
          <p className="font-medium text-gray-900">Add Service</p>
          <p className="text-sm text-gray-600">List new service</p>
        </button>

        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <p className="font-medium text-gray-900">Analytics</p>
          <p className="text-sm text-gray-600">View reports</p>
        </button>

        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <p className="font-medium text-gray-900">Customers</p>
          <p className="text-sm text-gray-600">Manage clients</p>
                </button>

        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-200 transition-colors">
            <Settings className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="font-medium text-gray-900">Settings</p>
          <p className="text-sm text-gray-600">Account setup</p>
        </button>
      </div>
    </div>
  );

  const renderServices = () => (
              <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Services</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search services..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="">All Types</option>
              <option value="hotel">Hotel</option>
              <option value="tour">Tour Guide</option>
              <option value="adventure">Adventure Sports</option>
            </select>
          </div>
          <button className="text-gray-600 hover:text-gray-800 p-2">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No services listed yet</p>
              <p className="text-sm text-gray-400 mb-6">Start by adding your tourism services to attract customers.</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto">
                <Plus className="w-4 h-4" />
                <span>Add Your First Service</span>
              </button>
            </div>
          ) : (
            services.map((service) => (
            <div key={service.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <img 
                src={service.image} 
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {service.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {service.location}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{service.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{service.bookings} bookings</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Export
                  </button>
        </div>
                </div>
                
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Service</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Amount</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No bookings found</p>
                    <p className="text-sm text-gray-400">Customer bookings will appear here.</p>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                <tr key={booking._id || booking.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                          <div>
                      <p className="font-medium text-gray-900">
                        {booking.guestDetails?.primaryGuest?.name || booking.customerName || 'Guest'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.guestDetails?.primaryGuest?.phone || booking.customerPhone || 'N/A'}
                      </p>
                          </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-900">{booking.hotel?.name || booking.serviceName || 'Service'}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-900">
                      {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : booking.date}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-gray-900">
                      ₹{(booking.pricing?.totalAmount || booking.amount || 0).toLocaleString()}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Revenue Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Booking Chart Placeholder</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{analytics.pendingPayouts?.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Pending Payouts</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1,234</p>
            <p className="text-sm text-gray-600">Total Customers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">98.5%</p>
            <p className="text-sm text-gray-600">Customer Satisfaction</p>
          </div>
                          </div>
                        </div>
                      </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'services', name: 'My Services', icon: <Building className="w-5 h-5" /> },
    { id: 'bookings', name: 'Bookings', icon: <Calendar className="w-5 h-5" /> },
    { id: 'analytics', name: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Loading vendor dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <p className="text-red-800">{error}</p>
              <button 
                onClick={loadVendorData}
                className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building className="w-8 h-8 text-white" />
                  </div>
                <h3 className="font-bold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-600">Service Provider</p>
                <div className="flex items-center justify-center mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{analytics.averageRating}</span>
                  </div>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-50 text-green-600 border border-green-200'
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
            {activeTab === 'services' && renderServices()}
            {activeTab === 'bookings' && renderBookings()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <p className="text-gray-600">Vendor settings coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;