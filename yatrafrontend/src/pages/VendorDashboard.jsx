import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
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
  Award,
  LogOut
} from 'lucide-react';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [vendorData, setVendorData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is a vendor
    if (!apiService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const currentUser = apiService.getCurrentUser();
    if (currentUser?.role !== 'vendor') {
      navigate('/dashboard/user');
      return;
    }

    loadVendorData();
    loadBookings();
  }, [navigate]);

  const loadVendorData = async () => {
    try {
      const currentUser = apiService.getCurrentUser();
      if (currentUser) {
        setVendorData({
          businessName: currentUser.businessName || 'Your Business',
          businessType: currentUser.businessType || 'Service Provider',
          location: currentUser.location || 'Location not set',
          verificationStatus: currentUser.kycVerified ? 'verified' : 'pending',
          rating: 0, // Will be calculated from reviews
          totalReviews: 0,
          totalBookings: 0,
          totalEarnings: 0,
          monthlyEarnings: 0
        });
      }

      // Try to get fresh profile data from API
      const profileResponse = await apiService.getProfile();
      if (profileResponse.success && profileResponse.data?.user) {
        const user = profileResponse.data.user;
        setVendorData(prev => ({
          ...prev,
          businessName: user.businessName || prev.businessName,
          businessType: user.businessType || prev.businessType,
          location: user.location || prev.location,
          verificationStatus: user.kycVerified ? 'verified' : 'pending'
        }));
      }
    } catch (error) {
      console.error('Error loading vendor data:', error);
    }
  };

  const loadBookings = async () => {
    try {
      const response = await apiService.getBookings();
      if (response.success && response.data?.bookings) {
        const vendorBookings = response.data.bookings.filter(booking => 
          booking.vendorId === apiService.getCurrentUser()?._id
        );
        setBookings(vendorBookings);
        
        // Update stats
        const totalBookings = vendorBookings.length;
        const totalEarnings = vendorBookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);
        const monthlyEarnings = vendorBookings
          .filter(booking => {
            const bookingDate = new Date(booking.createdAt);
            const currentDate = new Date();
            return bookingDate.getMonth() === currentDate.getMonth() && 
                   bookingDate.getFullYear() === currentDate.getFullYear();
          })
          .reduce((sum, booking) => sum + (booking.amount || 0), 0);

        setVendorData(prev => ({
          ...prev,
          totalBookings,
          totalEarnings,
          monthlyEarnings
        }));
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
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
      label: 'Total Bookings', 
      value: vendorData?.totalBookings?.toString() || '0', 
      change: '+0%', 
      icon: <Calendar className="w-6 h-6 text-blue-600" /> 
    },
    { 
      label: 'Total Earnings', 
      value: `₹${(vendorData?.totalEarnings || 0).toLocaleString()}`, 
      change: '+0%', 
      icon: <DollarSign className="w-6 h-6 text-green-600" /> 
    },
    { 
      label: 'Average Rating', 
      value: vendorData?.rating?.toString() || '0.0', 
      change: '+0.0', 
      icon: <Star className="w-6 h-6 text-yellow-600" /> 
    },
    { 
      label: 'Active Listings', 
      value: '0', 
      change: '0', 
      icon: <Users className="w-6 h-6 text-purple-600" /> 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {vendorData?.businessName || 'Vendor Dashboard'}
              </h1>
              <p className="text-gray-600 mt-1">
                {vendorData?.businessType} • {vendorData?.location}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                vendorData?.verificationStatus === 'verified' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {vendorData?.verificationStatus === 'verified' ? (
                  <><CheckCircle className="w-4 h-4 inline mr-1" /> Verified</>
                ) : (
                  <><Clock className="w-4 h-4 inline mr-1" /> Pending</>
                )}
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
                { id: 'bookings', name: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
                { id: 'listings', name: 'Listings', icon: <Users className="w-4 h-4" /> },
                { id: 'analytics', name: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
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
                  <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Your Dashboard</h3>
                  <p className="text-gray-600 mb-6">
                    Start by adding your first service listing to begin receiving bookings.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Your First Listing
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{booking.serviceName}</h4>
                            <p className="text-sm text-gray-600">{booking.guestName}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">₹{booking.amount?.toLocaleString()}</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Yet</h3>
                    <p className="text-gray-600">
                      Bookings will appear here once customers start booking your services.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'listings' && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Listings Yet</h3>
                <p className="text-gray-600 mb-6">
                  Create your first service listing to start attracting customers.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Create Listing
                </button>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-600">
                  Detailed analytics and insights will be available once you have bookings and listings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;