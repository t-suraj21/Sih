import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Download, Home, Calendar, MapPin, Users, CreditCard, Loader2 } from 'lucide-react';

const PackageBookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, packageData } = location.state || {};
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    if (!booking) {
      navigate('/services');
      return;
    }

    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
    }, 2000);
  }, [booking]);

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Confirming your booking...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-4">Your package booking has been successfully confirmed.</p>
          <div className="bg-blue-50 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">Booking ID</p>
            <p className="text-2xl font-bold text-blue-600">{booking.bookingId}</p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Package Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Package Name</p>
                  <p className="font-medium text-gray-900">{packageData?.name || 'N/A'}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{packageData?.destination?.city}, {packageData?.destination?.state}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(booking.travelDates?.startDate).toLocaleDateString()} - {' '}
                    {new Date(booking.travelDates?.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>
                    {booking.persons?.adults} Adults
                    {booking.persons?.children > 0 && `, ${booking.persons.children} Children`}
                    {booking.persons?.infants > 0 && `, ${booking.persons.infants} Infants`}
                  </span>
                </div>
              </div>
            </div>

            {/* Guest Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Primary Guest</p>
                  <p className="font-medium text-gray-900">{booking.guestDetails?.primaryGuest?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{booking.guestDetails?.primaryGuest?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{booking.guestDetails?.primaryGuest?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Options */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {booking.selectedOptions?.hotel && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">Hotel</p>
                  <p className="text-sm text-gray-600">{booking.selectedOptions.hotel.name}</p>
                  <p className="text-sm text-blue-600 mt-1">₹{booking.selectedOptions.hotel.price?.toLocaleString()}</p>
                </div>
              )}
              {booking.selectedOptions?.food && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">Food</p>
                  <p className="text-sm text-gray-600">{booking.selectedOptions.food.name}</p>
                  <p className="text-sm text-blue-600 mt-1">₹{booking.selectedOptions.food.price?.toLocaleString()}</p>
                </div>
              )}
              {booking.selectedOptions?.travel && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">Travel</p>
                  <p className="text-sm text-gray-600">{booking.selectedOptions.travel.name}</p>
                  <p className="text-sm text-blue-600 mt-1">₹{booking.selectedOptions.travel.price?.toLocaleString()}</p>
                </div>
              )}
              {booking.selectedOptions?.guide && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">Guide</p>
                  <p className="text-sm text-gray-600">{booking.selectedOptions.guide.name}</p>
                  <p className="text-sm text-blue-600 mt-1">₹{booking.selectedOptions.guide.price?.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Price Summary */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h3>
            <div className="bg-gray-50 rounded-lg p-6 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Base Price</span>
                <span>₹{booking.pricing?.basePrice?.toLocaleString() || 0}</span>
              </div>
              {booking.pricing?.hotelPrice > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Hotel</span>
                  <span>₹{booking.pricing.hotelPrice.toLocaleString()}</span>
                </div>
              )}
              {booking.pricing?.foodPrice > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Food</span>
                  <span>₹{booking.pricing.foodPrice.toLocaleString()}</span>
                </div>
              )}
              {booking.pricing?.travelPrice > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Travel</span>
                  <span>₹{booking.pricing.travelPrice.toLocaleString()}</span>
                </div>
              )}
              {booking.pricing?.guidePrice > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Guide</span>
                  <span>₹{booking.pricing.guidePrice.toLocaleString()}</span>
                </div>
              )}
              {booking.pricing?.taxes > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>₹{booking.pricing.taxes.toLocaleString()}</span>
                </div>
              )}
              {booking.pricing?.serviceCharge > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Service Charge</span>
                  <span>₹{booking.pricing.serviceCharge.toLocaleString()}</span>
                </div>
              )}
              {booking.pricing?.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{booking.pricing.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t">
                <span>Total Amount</span>
                <span>₹{booking.pricing?.totalAmount?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>

          {booking.specialRequests && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Special Requests</h3>
              <p className="text-gray-600">{booking.specialRequests}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/dashboard/user')}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageBookingConfirmation;

