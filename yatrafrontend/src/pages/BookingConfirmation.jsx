import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  Home,
  Share2
} from 'lucide-react';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId, items = [], amount, paymentMethod } = location.state || {};

  useEffect(() => {
    // Confetti effect or celebration animation can be added here
    if (!bookingId) {
      navigate('/');
    }
  }, [bookingId, navigate]);

  const handleDownloadReceipt = () => {
    alert('Receipt download will be implemented with PDF generation');
  };

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Booking',
        text: `I just booked my trip! Booking ID: ${bookingId}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-block relative">
            <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-20 h-20 text-white" />
            </div>
            <div className="absolute inset-0 w-32 h-32 bg-green-400 rounded-full animate-ping opacity-75"></div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-8 mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your adventure awaits! We've sent the confirmation to your email.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Booking ID</p>
                <p className="text-3xl font-bold">{bookingId}</p>
              </div>
              <div className="text-right">
                <p className="text-green-100 text-sm font-medium mb-1">Total Paid</p>
                <p className="text-3xl font-bold">₹{amount?.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>
            
            {/* Booked Items */}
            <div className="space-y-4 mb-8">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.type}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.state}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl mb-6">
              <CreditCard className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-bold text-gray-900 capitalize">{paymentMethod}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleDownloadReceipt}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Receipt
              </button>
              <button
                onClick={handleShareBooking}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Check Your Email</h4>
                <p className="text-sm text-gray-600">We've sent your booking confirmation and vouchers to your email.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Mark Your Calendar</h4>
                <p className="text-sm text-gray-600">Add your travel dates to your calendar so you don't miss anything.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">24/7 Support Available</h4>
                <p className="text-sm text-gray-600">Need help? Our support team is available round the clock.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/dashboard/user')}
            className="flex-1 bg-white text-gray-900 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;

