import { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, DollarSign, 
  Calendar, Download, RefreshCw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Mock data
      setAnalytics({
        overview: {
          totalUsers: 1250,
          totalVendors: 85,
          totalRevenue: 5650000,
          totalBookings: 2340
        }
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive platform insights and metrics</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={loadAnalytics}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview?.totalUsers?.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Vendors</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview?.totalVendors}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{(analytics.overview?.totalRevenue / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview?.totalBookings?.toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">Detailed analytics and reporting features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
