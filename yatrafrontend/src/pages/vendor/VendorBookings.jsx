import { useState, useEffect } from 'react';
import { 
  Calendar, Users, Phone, Mail, Eye, CheckCircle, XCircle, 
  Clock, DollarSign, MapPin, Filter, Search, Download
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const VendorBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    // Mock data - replace with actual API call
    setBookings([
      {
        id: 1,
        bookingId: 'YT001',
        customerName: 'Raj Sharma',
        customerEmail: 'raj@example.com',
        customerPhone: '+91 9876543210',
        serviceName: 'Luxury Beach Resort',
        serviceType: 'Hotel/Resort',
        checkIn: '2024-02-15',
        checkOut: '2024-02-18',
        guests: 2,
        amount: 24000,
        commission: 2400,
        status: 'confirmed',
        paymentStatus: 'paid',
        bookingDate: '2024-01-20',
        specialRequests: 'Ocean view room preferred',
        customerNotes: 'Anniversary celebration'
      },
      {
        id: 2,
        bookingId: 'YT002',
        customerName: 'Priya Singh',
        customerEmail: 'priya@example.com',
        customerPhone: '+91 9876543211',
        serviceName: 'Heritage Walking Tour',
        serviceType: 'Tour Guide',
        checkIn: '2024-02-20',
        checkOut: '2024-02-20',
        guests: 4,
        amount: 10000,
        commission: 1000,
        status: 'pending',
        paymentStatus: 'pending',
        bookingDate: '2024-01-22',
        specialRequests: 'English speaking guide',
        customerNotes: 'Family with elderly parents'
      },
      {
        id: 3,
        bookingId: 'YT003',
        customerName: 'Amit Kumar',
        customerEmail: 'amit@example.com',
        customerPhone: '+91 9876543212',
        serviceName: 'Adventure Trekking',
        serviceType: 'Adventure Sports',
        checkIn: '2024-01-25',
        checkOut: '2024-01-27',
        guests: 3,
        amount: 15000,
        commission: 1500,
        status: 'completed',
        paymentStatus: 'paid',
        bookingDate: '2024-01-10',
        specialRequests: 'Vegetarian meals',
        customerNotes: 'First time trekkers'
      }
    ]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'completed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    // Update booking status - API call
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const BookingDetailsModal = ({ booking, onClose }) => {
    if (!booking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Booking Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Booking Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">{booking.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{booking.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{booking.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">{booking.guests} people</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Customer Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{booking.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{booking.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{booking.customerPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates & Payment */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Schedule</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">{booking.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">{booking.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booked on:</span>
                    <span className="font-medium">{booking.bookingDate}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Payment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">₹{booking.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commission:</span>
                    <span className="font-medium">₹{booking.commission.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {booking.specialRequests && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Special Requests</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {booking.specialRequests}
                </p>
              </div>
            )}

            {/* Customer Notes */}
            {booking.customerNotes && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Customer Notes</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {booking.customerNotes}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <a 
                  href={`tel:${booking.customerPhone}`}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </a>
                <a 
                  href={`mailto:${booking.customerEmail}`}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </a>
              </div>
              
              {booking.status === 'pending' && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleStatusChange(booking.id, 'confirmed')}
                    className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm
                  </button>
                  <button 
                    onClick={() => handleStatusChange(booking.id, 'cancelled')}
                    className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
    totalCommission: bookings.reduce((sum, b) => sum + b.commission, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all your service bookings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Booking</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Service</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Dates</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{booking.bookingId}</p>
                        <p className="text-sm text-gray-600">{booking.bookingDate}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{booking.customerName}</p>
                        <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{booking.serviceName}</p>
                        <p className="text-sm text-gray-600">{booking.serviceType}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-gray-900">{booking.checkIn}</p>
                        {booking.checkOut !== booking.checkIn && (
                          <p className="text-sm text-gray-600">to {booking.checkOut}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">₹{booking.amount.toLocaleString()}</p>
                        <p className="text-sm text-green-600">₹{booking.commission.toLocaleString()} commission</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a 
                          href={`tel:${booking.customerPhone}`}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <a 
                          href={`mailto:${booking.customerEmail}`}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter ? 'Try adjusting your search or filters' : 'Your bookings will appear here'}
            </p>
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </div>
    </div>
  );
};

export default VendorBookings;
