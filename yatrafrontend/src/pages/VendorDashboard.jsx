import { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Star, 
  TrendingUp, 
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Edit,
  Eye,
  Settings,
  Upload,
  Award
} from 'lucide-react';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock vendor data
  const vendorData = {
    businessName: 'Heritage Palace Hotel',
    businessType: 'Hotel/Resort',
    location: 'Jaipur, Rajasthan',
    verificationStatus: 'verified',
    rating: 4.8,
    totalReviews: 324,
    totalBookings: 1250,
    totalEarnings: 485000,
    monthlyEarnings: 45000
  };

  const stats = [
    { label: 'Total Bookings', value: '1,250', change: '+12%', icon: <Calendar className="w-6 h-6 text-blue-600" /> },
    { label: 'Total Earnings', value: '₹4.85L', change: '+8%', icon: <DollarSign className="w-6 h-6 text-green-600" /> },
    { label: 'Average Rating', value: '4.8', change: '+0.2', icon: <Star className="w-6 h-6 text-yellow-600" /> },
    { label: 'Active Listings', value: '3', change: '0', icon: <Users className="w-6 h-6 text-purple-600" /> }
  ];

  const recentBookings = [
    {
      id: 'YTR001',
      guestName: 'Priya Sharma',
      checkIn: '2024-12-25',
      checkOut: '2024-12-28',
      amount: 10500,
      status: 'confirmed',
      guests: 2
    },
    {
      id: 'YTR002',
      guestName: 'Rajesh Kumar',
      checkIn: '2024-12-22',
      checkOut: '2024-12-24',
      amount: 7000,
      status: 'completed',
      guests: 2
    },
    {
      id: 'YTR003',
      guestName: 'Anita Patel',
      checkIn: '2024-12-30',
      checkOut: '2025-01-02',
      amount: 14000,
      status: 'pending',
      guests: 4
    }
  ];

  const services = [
    {
      id: 1,
      name: 'Deluxe Room',
      type: 'Accommodation',
      price: 3500,
      status: 'active',
      bookings: 45,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Heritage Suite',
      type: 'Accommodation',
      price: 5500,
      status: 'active',
      bookings: 28,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Royal Villa',
      type: 'Accommodation',
      price: 8500,
      status: 'draft',
      bookings: 0,
      rating: 0
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'bookings', name: 'Bookings', icon: <Calendar className="w-5 h-5" /> },
    { id: 'services', name: 'My Services', icon: <Users className="w-5 h-5" /> },
    { id: 'analytics', name: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'profile', name: 'Profile', icon: <Settings className="w-5 h-5" /> }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {recentBookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{booking.guestName}</p>
                  <p className="text-sm text-gray-600">{booking.checkIn} - {booking.checkOut}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">₹{booking.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Occupancy Rate</span>
              <span className="font-semibold text-gray-900">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="font-semibold text-gray-900">4.8/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Response Time</span>
              <span className="font-semibold text-gray-900">2.3 hrs</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Booking Management</h2>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Bookings</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.guestName}</div>
                      <div className="text-sm text-gray-500">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.checkIn} to {booking.checkOut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ₹{booking.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircle className="w-4 h-4" />
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

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">My Services</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {service.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{service.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium text-green-600">₹{service.price}/night</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bookings:</span>
                <span className="font-medium">{service.bookings}</span>
              </div>
              {service.rating > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{service.rating}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-1">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Business Profile</h2>
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-green-600" />
          <span className="text-green-600 font-medium">Verified Business</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={vendorData.businessName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                <input
                  type="text"
                  value={vendorData.businessType}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={vendorData.location}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents & Verification</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">Business License Verified</span>
                </div>
                <span className="text-green-600 text-sm">Valid until Dec 2025</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">FSSAI Certificate Verified</span>
                </div>
                <span className="text-green-600 text-sm">Valid until Mar 2025</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">Tourism Board Registration</span>
                </div>
                <span className="text-green-600 text-sm">Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Stats</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{vendorData.rating}</div>
                <div className="text-gray-600">Average Rating</div>
                <div className="flex justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(vendorData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <div className="text-sm text-gray-500 mt-1">{vendorData.totalReviews} reviews</div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-semibold">{vendorData.totalBookings}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-semibold text-green-600">₹{(vendorData.totalEarnings / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold text-blue-600">₹{(vendorData.monthlyEarnings / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Photos</span>
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>View Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{vendorData.businessName}</h1>
              <div className="flex items-center space-x-4 mt-1">
                <p className="text-gray-600">{vendorData.location}</p>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 text-sm font-medium">Verified</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{vendorData.rating}</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">₹{(vendorData.monthlyEarnings / 1000).toFixed(0)}K</div>
                <div className="text-xs text-gray-500">This Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'services' && renderServices()}
        {activeTab === 'profile' && renderProfile()}
      </div>
    </div>
  );
};

export default VendorDashboard;
