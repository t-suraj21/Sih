import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building, BarChart3, Users, Calendar, Star, DollarSign, 
  Plus, Edit, Eye, Trash2, Settings, Bell, Award, TrendingUp,
  MapPin, Clock, CheckCircle, AlertCircle, XCircle, Phone,
  Mail, Camera, Upload, Download, Filter, Search, RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadVendorData();
  }, []);

  const loadVendorData = async () => {
    try {
      // Mock data - replace with actual API calls
      setServices([
        {
          id: 1,
          name: 'Luxury Hotel Stay',
          type: 'Hotel',
          location: 'Goa',
          price: 5000,
          rating: 4.8,
          bookings: 45,
          status: 'active',
          image: '/api/placeholder/300/200'
        },
        {
          id: 2,
          name: 'Heritage City Tour',
          type: 'Tour Guide',
          location: 'Jaipur',
          price: 2500,
          rating: 4.9,
          bookings: 32,
          status: 'active',
          image: '/api/placeholder/300/200'
        },
        {
          id: 3,
          name: 'Adventure Trekking',
          type: 'Adventure Sports',
          location: 'Himachal Pradesh',
          price: 3500,
          rating: 4.7,
          bookings: 28,
          status: 'pending',
          image: '/api/placeholder/300/200'
        }
      ]);

      setBookings([
        {
          id: 1,
          customerName: 'Raj Sharma',
          serviceName: 'Luxury Hotel Stay',
          date: '2024-01-15',
          amount: 5000,
          status: 'confirmed',
          customerPhone: '+91 9876543210'
        },
        {
          id: 2,
          customerName: 'Priya Singh',
          serviceName: 'Heritage City Tour',
          date: '2024-01-20',
          amount: 2500,
          status: 'pending',
          customerPhone: '+91 9876543211'
        },
        {
          id: 3,
          customerName: 'Amit Kumar',
          serviceName: 'Adventure Trekking',
          date: '2024-01-25',
          amount: 3500,
          status: 'completed',
          customerPhone: '+91 9876543212'
        }
      ]);

      setAnalytics({
        totalRevenue: 125000,
        totalBookings: 105,
        activeServices: 8,
        averageRating: 4.8,
        monthlyGrowth: 15.2,
        pendingPayouts: 25000
      });

      setNotifications([
        {
          id: 1,
          type: 'booking',
          title: 'New Booking',
          message: 'Raj Sharma booked your Luxury Hotel Stay',
          time: '2 hours ago',
          read: false
        },
        {
          id: 2,
          type: 'review',
          title: 'New Review',
          message: 'You received a 5-star review',
          time: '4 hours ago',
          read: false
        }
      ]);
    } catch (error) {
      console.error('Error loading vendor data:', error);
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
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                <div>
                    <h3 className="font-semibold text-gray-900">{booking.customerName}</h3>
                    <p className="text-sm text-gray-600">{booking.serviceName}</p>
                    <p className="text-xs text-gray-500">{booking.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{booking.amount.toLocaleString()}</p>
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
            ))}
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
          {services.map((service) => (
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
          ))}
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
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                          <div>
                      <p className="font-medium text-gray-900">{booking.customerName}</p>
                      <p className="text-sm text-gray-600">{booking.customerPhone}</p>
                          </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-900">{booking.serviceName}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-900">{booking.date}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-gray-900">₹{booking.amount.toLocaleString()}</p>
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
              ))}
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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