import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, Users, Building, BarChart3, Settings, Bell, AlertTriangle,
  CheckCircle, XCircle, Eye, Edit, Trash2, Plus, Download, Upload,
  Search, Filter, RefreshCw, TrendingUp, DollarSign, MapPin,
  Calendar, Star, Award, Phone, Mail, Lock, Unlock, Ban
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [systemAlerts, setSystemAlerts] = useState([]);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      // Mock data - replace with actual API calls
      setUsers([
        {
          id: 1,
          name: 'Raj Sharma',
          email: 'raj@example.com',
          role: 'tourist',
          status: 'active',
          joinDate: '2024-01-15',
          lastLogin: '2024-01-20',
          bookings: 5
        },
        {
          id: 2,
          name: 'Priya Singh',
          email: 'priya@example.com',
          role: 'tourist',
          status: 'active',
          joinDate: '2024-01-10',
          lastLogin: '2024-01-19',
          bookings: 3
        },
        {
          id: 3,
          name: 'Luxury Hotels Goa',
          email: 'info@luxuryhotels.com',
          role: 'vendor',
          status: 'pending',
          joinDate: '2024-01-18',
          lastLogin: '2024-01-20',
          bookings: 0
        }
      ]);

      setVendors([
        {
          id: 1,
          name: 'Luxury Hotels Goa',
          email: 'info@luxuryhotels.com',
          businessType: 'Hotel/Resort',
          location: 'Goa',
          services: 3,
          rating: 4.8,
          revenue: 125000,
          status: 'active',
          verified: true
        },
        {
          id: 2,
          name: 'Heritage Tours Rajasthan',
          email: 'tours@heritage.com',
          businessType: 'Tour Guide',
          location: 'Rajasthan',
          services: 5,
          rating: 4.9,
          revenue: 85000,
          status: 'active',
          verified: true
        }
      ]);

      setBookings([
        {
          id: 1,
          customer: 'Raj Sharma',
          vendor: 'Luxury Hotels Goa',
          service: 'Luxury Hotel Stay',
          amount: 15000,
          date: '2024-01-15',
          status: 'completed',
          commission: 1500
        },
        {
          id: 2,
          customer: 'Priya Singh',
          vendor: 'Heritage Tours Rajasthan',
          service: 'Palace Tour',
          amount: 8000,
          date: '2024-01-20',
          status: 'confirmed',
          commission: 800
        }
      ]);

      setAnalytics({
        totalUsers: 1250,
        totalVendors: 85,
        totalBookings: 2340,
        totalRevenue: 5650000,
        monthlyGrowth: 18.5,
        pendingVerifications: 12,
        activeDisputes: 3,
        systemUptime: 99.9
      });

      setSystemAlerts([
        {
          id: 1,
          type: 'warning',
          title: 'High Server Load',
          message: 'Server CPU usage is above 80%',
          time: '10 minutes ago',
          severity: 'medium'
        },
        {
          id: 2,
          type: 'info',
          title: 'New Vendor Registration',
          message: '3 new vendors registered today',
          time: '2 hours ago',
          severity: 'low'
        },
        {
          id: 3,
          type: 'error',
          title: 'Payment Gateway Issue',
          message: 'Payment processing delayed',
          time: '4 hours ago',
          severity: 'high'
        }
      ]);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'suspended': return 'text-red-600 bg-red-50 border-red-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleUserAction = (userId, action) => {
    // Handle user actions like suspend, activate, etc.
    console.log(`${action} user ${userId}`);
  };

  const handleVendorAction = (vendorId, action) => {
    // Handle vendor actions like verify, suspend, etc.
    console.log(`${action} vendor ${vendorId}`);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-purple-100">Complete platform oversight and management</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm font-medium">Administrator</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers?.toLocaleString()}</p>
              <p className="text-blue-600 text-sm">+{analytics.monthlyGrowth}% this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Vendors</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalVendors}</p>
              <p className="text-green-600 text-sm">{analytics.pendingVerifications} pending</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{(analytics.totalRevenue / 100000).toFixed(1)}L</p>
              <p className="text-purple-600 text-sm">Platform earnings</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">System Health</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.systemUptime}%</p>
              <p className="text-green-600 text-sm">Uptime</p>
              </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">System Alerts</h2>
            <button className="text-purple-600 hover:text-purple-500 text-sm font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  alert.type === 'error' ? 'bg-red-100' : 
                  alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {alert.type === 'error' ? <XCircle className="w-5 h-5 text-red-600" /> :
                   alert.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-yellow-600" /> :
                   <CheckCircle className="w-5 h-5 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <p className="font-medium text-gray-900">User Management</p>
          <p className="text-sm text-gray-600">Manage all users</p>
        </button>

        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
            <Building className="w-6 h-6 text-green-600" />
          </div>
          <p className="font-medium text-gray-900">Vendor Approval</p>
          <p className="text-sm text-gray-600">Review vendors</p>
        </button>

        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <p className="font-medium text-gray-900">Analytics</p>
          <p className="text-sm text-gray-600">View reports</p>
        </button>

        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-red-200 transition-colors">
            <Settings className="w-6 h-6 text-red-600" />
          </div>
          <p className="font-medium text-gray-900">System Settings</p>
          <p className="text-sm text-gray-600">Configure platform</p>
        </button>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            </div>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="">All Roles</option>
            <option value="tourist">Tourist</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Export
          </button>
        </div>
        </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Role</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Join Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Last Login</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Bookings</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="capitalize text-gray-900">{user.role}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-900">{user.joinDate}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-900">{user.lastLogin}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-900">{user.bookings}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleUserAction(user.id, 'view')}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleUserAction(user.id, 'edit')}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                <button
                        onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                        className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
                      >
                        {user.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
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

  const renderVendors = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Vendor Management</h2>
        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending Approval</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Bulk Actions
          </button>
        </div>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{vendor.name}</h3>
                  <p className="text-sm text-gray-600">{vendor.businessType}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {vendor.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {vendor.verified && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(vendor.status)}`}>
                  {vendor.status}
                </span>
              </div>
                </div>
                
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{vendor.services}</p>
                <p className="text-xs text-gray-600">Services</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <p className="text-lg font-bold text-gray-900">{vendor.rating}</p>
                </div>
                <p className="text-xs text-gray-600">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">₹{(vendor.revenue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-600">Revenue</p>
              </div>
                </div>
                
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>{vendor.email}</p>
                </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleVendorAction(vendor.id, 'view')}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleVendorAction(vendor.id, 'verify')}
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleVendorAction(vendor.id, 'contact')}
                  className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Platform Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">User Growth Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Revenue Chart Placeholder</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analytics.monthlyGrowth}%</p>
            <p className="text-sm text-gray-600">Monthly Growth</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">₹2.5L</p>
            <p className="text-sm text-gray-600">Avg. Commission</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">94.2%</p>
            <p className="text-sm text-gray-600">User Retention</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-sm text-gray-600">Avg. Platform Rating</p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'users', name: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'vendors', name: 'Vendors', icon: <Building className="w-5 h-5" /> },
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
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-600">Administrator</p>
                <div className="flex items-center justify-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">System Online</span>
                </div>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-50 text-purple-600 border border-purple-200'
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
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'vendors' && renderVendors()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <p className="text-gray-600">System configuration settings coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;