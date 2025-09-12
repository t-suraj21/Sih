import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import { 
  Users, 
  Building, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  Clock,
  XCircle,
  Eye,
  Filter,
  Download,
  BarChart3,
  DollarSign,
  Star,
  LogOut
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (!apiService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const currentUser = apiService.getCurrentUser();
    if (currentUser?.role !== 'admin') {
      navigate('/dashboard/user');
      return;
    }

    loadAdminData();
  }, [navigate]);

  const loadAdminData = async () => {
    try {
      // Try to get admin dashboard data from API
      const response = await apiService.getAdminDashboard();
      if (response.success && response.data) {
        setAdminData(response.data);
      } else {
        // Set default empty data if API doesn't return data
        setAdminData({
          totalUsers: 0,
          activeVendors: 0,
          totalBookings: 0,
          sosAlerts: 0,
          recentUsers: [],
          pendingVerifications: [],
          recentBookings: []
        });
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
      // Set default empty data on error
      setAdminData({
        totalUsers: 0,
        activeVendors: 0,
        totalBookings: 0,
        sosAlerts: 0,
        recentUsers: [],
        pendingVerifications: [],
        recentBookings: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = [
    { 
      label: 'Total Users', 
      value: adminData?.totalUsers?.toLocaleString() || '0', 
      change: '+0%', 
      icon: <Users className="w-6 h-6 text-blue-600" /> 
    },
    { 
      label: 'Active Vendors', 
      value: adminData?.activeVendors?.toLocaleString() || '0', 
      change: '+0%', 
      icon: <Building className="w-6 h-6 text-green-600" /> 
    },
    { 
      label: 'Total Bookings', 
      value: adminData?.totalBookings?.toLocaleString() || '0', 
      change: '+0%', 
      icon: <MapPin className="w-6 h-6 text-purple-600" /> 
    },
    { 
      label: 'SOS Alerts', 
      value: adminData?.sosAlerts?.toString() || '0', 
      change: '+0%', 
      icon: <AlertTriangle className="w-6 h-6 text-red-600" /> 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Platform Management & Analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
                { id: 'users', name: 'Users', icon: <Users className="w-4 h-4" /> },
                { id: 'vendors', name: 'Vendors', icon: <Building className="w-4 h-4" /> },
                { id: 'bookings', name: 'Bookings', icon: <MapPin className="w-4 h-4" /> },
                { id: 'sos', name: 'SOS Alerts', icon: <AlertTriangle className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Admin Dashboard</h3>
                  <p className="text-gray-600 mb-6">
                    Platform management tools and analytics will be available here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Export Data
                  </button>
                </div>
                
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600">
                    User management features will be available here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'vendors' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Vendor Verification</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                
                <div className="text-center py-12">
                  <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Vendor Management</h3>
                  <p className="text-gray-600">
                    Vendor verification and management tools will be available here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Booking Management</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Booking Management</h3>
                  <p className="text-gray-600">
                    Booking management and analytics will be available here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'sos' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">SOS Alerts</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">SOS Alert Management</h3>
                  <p className="text-gray-600">
                    Emergency SOS alert management will be available here.
                  </p>
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