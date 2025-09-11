import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';
import { 
  Calendar, 
  MapPin, 
  Star, 
  QrCode, 
  Clock, 
  Heart, 
  User, 
  Phone, 
  Mail,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  Download,
  Share2,
  MessageSquare,
  Bookmark,
  Settings
} from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!apiService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Load user data and bookings
    loadUserData();
    loadBookings();
  }, [navigate]);

  const loadUserData = async () => {
    try {
      const currentUser = apiService.getCurrentUser();
      if (currentUser) {
        setUserData({
          name: currentUser.name || 'User',
          email: currentUser.email || '',
          phone: currentUser.phone || '',
          joinDate: new Date(currentUser.created_at || Date.now()).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          }),
          totalTrips: 0, // Will be updated from bookings
          ecoPoints: 1250, // Mock for now
          savedServices: 12, // Mock for now
          emergencyContact: '' // Mock for now
        });
      }

      // Try to get fresh profile data from API
      const profileResponse = await apiService.getProfile();
      if (profileResponse.success && profileResponse.data?.user) {
        const user = profileResponse.data.user;
        setUserData(prev => ({
          ...prev,
          name: user.name || prev?.name || 'User',
          email: user.email || prev?.email || '',
          phone: user.phone || prev?.phone || '',
          joinDate: new Date(user.created_at || Date.now()).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })
        }));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Use cached user data if API fails
      const currentUser = apiService.getCurrentUser();
      if (currentUser) {
        setUserData({
          name: currentUser.name || 'User',
          email: currentUser.email || '',
          phone: currentUser.phone || '',
          joinDate: 'Recently',
          totalTrips: 0,
          ecoPoints: 1250,
          savedServices: 12,
          emergencyContact: ''
        });
      }
    }
  };

  const loadBookings = async () => {
    try {
      const response = await apiService.getBookings();
      if (response.success && response.data?.bookings) {
        // Transform backend booking data to frontend format
        const transformedBookings = response.data.bookings.map(booking => ({
          id: booking.booking_id || booking.id,
          type: 'Hotel',
          serviceName: booking.hotel_name || 'Hotel Booking',
          location: booking.location || 'Location',
          date: booking.check_in,
          checkOut: booking.check_out,
          status: booking.status || 'pending',
          amount: parseFloat(booking.total_amount || 0),
          qrCode: booking.booking_id,
          image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop'
        }));
        
        setBookings(transformedBookings);
        
        // Update user total trips
        if (userData) {
          setUserData(prev => ({
            ...prev,
            totalTrips: transformedBookings.filter(b => b.status === 'confirmed').length
          }));
        }
      } else {
        // Use mock data if backend doesn't have bookings
        setBookings(mockBookings);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      // Use mock data if API fails
      setBookings(mockBookings);
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
      // Force logout even if API call fails
      navigate('/login');
    }
  };

  // Mock booking data as fallback
  const mockBookings = [
    {
      id: 'YTR001',
      type: 'Hotel',
      serviceName: 'Heritage Palace Hotel',
      location: 'Jaipur, Rajasthan',
      date: '2024-12-25',
      checkOut: '2024-12-28',
      status: 'confirmed',
      amount: 10500,
      qrCode: 'QR001',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop'
    }
  ];

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show login redirect if no user data
  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your dashboard</h2>
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Mock booking data (remove duplicate)
  const fallbackBookings = [
    {
      id: 'YTR001',
      type: 'Hotel',
      serviceName: 'Heritage Palace Hotel',
      location: 'Jaipur, Rajasthan',
      date: '2024-12-25',
      checkOut: '2024-12-28',
      status: 'confirmed',
      amount: 10500,
      qrCode: 'QR001',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=200&fit=crop'
    },
    {
      id: 'YTR002',
      type: 'Guide',
      serviceName: 'Rajesh Kumar - Heritage Guide',
      location: 'Jaipur, Rajasthan',
      date: '2024-12-26',
      duration: '4 hours',
      status: 'confirmed',
      amount: 3200,
      qrCode: 'QR002',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face'
    },
    {
      id: 'YTR003',
      type: 'Transport',
      serviceName: 'Premium Taxi Service',
      location: 'Delhi to Agra',
      date: '2024-12-20',
      status: 'completed',
      amount: 4500,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop'
    }
  ];

  const pastTrips = [
    {
      id: 1,
      destination: 'Kerala Backwaters',
      date: 'Nov 2024',
      duration: '5 days',
      rating: 5,
      review: 'Amazing experience with verified houseboats and organic food!',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=200&fit=crop',
      ecoPointsEarned: 150
    },
    {
      id: 2,
      destination: 'Goa Beaches',
      date: 'Oct 2024',
      duration: '3 days',
      rating: 4,
      review: 'Great beachside resort with eco-certified facilities.',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=200&fit=crop',
      ecoPointsEarned: 100
    }
  ];

  const savedServices = [
    {
      id: 1,
      name: 'Mountain View Lodge',
      location: 'Manali, Himachal Pradesh',
      type: 'Hotel',
      rating: 4.7,
      price: 2200,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Arjun Singh - Adventure Guide',
      location: 'Manali, Himachal Pradesh',
      type: 'Guide',
      rating: 4.9,
      price: 900,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop&crop=face'
    }
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

  const tabs = [
    { id: 'bookings', name: 'My Bookings', icon: <Calendar className="w-5 h-5" /> },
    { id: 'trips', name: 'Past Trips', icon: <MapPin className="w-5 h-5" /> },
    { id: 'saved', name: 'Saved Services', icon: <Heart className="w-5 h-5" /> },
    { id: 'profile', name: 'Profile', icon: <User className="w-5 h-5" /> }
  ];

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Upcoming Bookings</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <img src={booking.image} alt={booking.serviceName} className="w-20 h-20 rounded-lg object-cover" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{booking.serviceName}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {booking.location}
                  </p>
                  <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
              </div>
              {booking.checkOut && (
                <div>
                  <p className="text-gray-500">Check-out</p>
                  <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                </div>
              )}
              {booking.duration && (
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-medium">{booking.duration}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500">Amount</p>
                <p className="font-medium text-green-600">₹{booking.amount}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                {booking.status === 'confirmed' && (
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                    <QrCode className="w-4 h-4" />
                    <span>Show QR</span>
                  </button>
                )}
                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
              {booking.status === 'completed' && !booking.rating && (
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium">
                  Rate Experience
                </button>
              )}
              {booking.status === 'confirmed' && (
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrips = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Past Trips</h2>
        <div className="text-sm text-gray-600">
          Total trips: <span className="font-semibold text-blue-600">{userData.totalTrips}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pastTrips.map((trip) => (
          <div key={trip.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <img src={trip.image} alt={trip.destination} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{trip.destination}</h3>
                  <p className="text-gray-600">{trip.date} • {trip.duration}</p>
                </div>
                <div className="flex items-center">
                  {[...Array(trip.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">"{trip.review}"</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">+{trip.ecoPointsEarned} Eco Points</span>
                </div>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <MessageSquare className="w-4 h-4" />
                  <span>Edit Review</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSaved = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Saved Services</h2>
        <div className="text-sm text-gray-600">
          {userData.savedServices} saved items
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedServices.map((service) => (
          <div key={service.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
              <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {service.location}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{service.rating}</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-green-600">₹{service.price}</span>
                  <span className="text-gray-600 text-sm">/{service.type === 'Guide' ? 'hour' : 'night'}</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Book Now
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
        <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
          <Settings className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={userData.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={userData.phone}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                <input
                  type="text"
                  value={userData.joinDate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input
                type="text"
                value={userData.emergencyContact}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">This contact will be notified in case of emergency</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Email notifications for bookings</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">SMS alerts for trip updates</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-700">Marketing communications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Share location during trips</span>
              </label>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Travel Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Total Trips</span>
                <span className="text-2xl font-bold">{userData.totalTrips}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Eco Points</span>
                <span className="text-2xl font-bold text-green-300">{userData.ecoPoints}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Saved Services</span>
                <span className="text-2xl font-bold">{userData.savedServices}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Plan New Trip
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                View Eco Points
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Emergency SOS
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
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userData.name.split(' ')[0]}!</h1>
              <p className="text-gray-600">Manage your bookings and travel experiences</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {userData.ecoPoints} Eco Points
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>SOS</span>
              </button>
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
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'trips' && renderTrips()}
        {activeTab === 'saved' && renderSaved()}
        {activeTab === 'profile' && renderProfile()}
      </div>
    </div>
  );
};

export default UserDashboard;
