import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import packageApi from '../services/packageApi.js';
import apiService from '../services/api.service.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { 
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  MapPin,
  Clock,
  Hotel,
  Utensils,
  Car,
  User as UserIcon
} from 'lucide-react';

const PackageBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { packageData, selectedOptions, pricing } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    travelDates: {
      startDate: '',
      endDate: ''
    },
    persons: {
      adults: 1,
      children: 0,
      infants: 0
    },
    guestDetails: {
      primaryGuest: {
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        idType: 'Aadhaar',
        idNumber: ''
      },
      additionalGuests: []
    },
    specialRequests: ''
  });

  useEffect(() => {
    if (!packageData || !selectedOptions) {
      navigate('/services');
      return;
    }
  }, []);

  const handleInputChange = (field, value) => {
    setBookingData(prev => {
      const keys = field.split('.');
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const calculateNights = () => {
    if (!bookingData.travelDates.startDate || !bookingData.travelDates.endDate) return 0;
    const start = new Date(bookingData.travelDates.startDate);
    const end = new Date(bookingData.travelDates.endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    if (!pricing) return 0;
    const basePrice = pricing.finalPrice || 0;
    const persons = bookingData.persons.adults + bookingData.persons.children;
    // For single packages, price is per person. For others, price might be for the whole package
    if (packageData.packageType === 'single') {
      return basePrice * persons;
    }
    // For couple/family/group, price is usually for the whole group
    return basePrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const bookingPayload = {
        packageId: packageData._id,
        selectedOptions,
        travelDates: {
          startDate: bookingData.travelDates.startDate,
          endDate: bookingData.travelDates.endDate
        },
        persons: bookingData.persons,
        guestDetails: bookingData.guestDetails,
        specialRequests: bookingData.specialRequests
      };

      const response = await packageApi.createBooking(bookingPayload);
      
      if (response.data?.success) {
        const booking = response.data.data.booking;
        navigate('/package-booking-confirmation', {
          state: { booking, packageData }
        });
      } else {
        setError(response.data?.message || 'Failed to create booking');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!packageData || !selectedOptions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Invalid booking data</p>
          <button
            onClick={() => navigate('/services')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const selectedHotel = packageData.inclusions?.hotel?.options?.[selectedOptions.hotel];
  const selectedFood = packageData.inclusions?.food?.options?.[selectedOptions.food];
  const selectedTravel = packageData.inclusions?.travel?.options?.[selectedOptions.travel];
  const selectedGuide = packageData.inclusions?.guide?.options?.[selectedOptions.guide];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/package-customization', { state: { packageData } })}
            className="flex items-center text-gray-600 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Customization
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
          <p className="text-gray-600 mt-2">Review your selections and provide booking details</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Travel Dates */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                  Travel Dates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingData.travelDates.startDate}
                      onChange={(e) => handleInputChange('travelDates.startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      required
                      min={bookingData.travelDates.startDate || new Date().toISOString().split('T')[0]}
                      value={bookingData.travelDates.endDate}
                      onChange={(e) => handleInputChange('travelDates.endDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                {calculateNights() > 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    Duration: {calculateNights()} night(s)
                  </p>
                )}
              </div>

              {/* Number of Persons */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-600" />
                  Number of Travelers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max={packageData.capacity?.maxPersons || 10}
                      value={bookingData.persons.adults}
                      onChange={(e) => handleInputChange('persons.adults', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                    <input
                      type="number"
                      min="0"
                      value={bookingData.persons.children}
                      onChange={(e) => handleInputChange('persons.children', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Infants</label>
                    <input
                      type="number"
                      min="0"
                      value={bookingData.persons.infants}
                      onChange={(e) => handleInputChange('persons.infants', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <UserIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Guest Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingData.guestDetails.primaryGuest.name}
                      onChange={(e) => handleInputChange('guestDetails.primaryGuest.name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={bookingData.guestDetails.primaryGuest.email}
                        onChange={(e) => handleInputChange('guestDetails.primaryGuest.email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={bookingData.guestDetails.primaryGuest.phone}
                        onChange={(e) => handleInputChange('guestDetails.primaryGuest.phone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ID Type</label>
                      <select
                        value={bookingData.guestDetails.primaryGuest.idType}
                        onChange={(e) => handleInputChange('guestDetails.primaryGuest.idType', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Aadhaar">Aadhaar</option>
                        <option value="Passport">Passport</option>
                        <option value="Driving License">Driving License</option>
                        <option value="Voter ID">Voter ID</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
                      <input
                        type="text"
                        value={bookingData.guestDetails.primaryGuest.idNumber}
                        onChange={(e) => handleInputChange('guestDetails.primaryGuest.idNumber', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Special Requests</h2>
                <textarea
                  rows="4"
                  value={bookingData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any special requests or requirements..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <p className="text-red-600">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h2>
                
                {/* Package Info */}
                <div className="mb-4 pb-4 border-b">
                  <h3 className="font-semibold text-gray-900">{packageData.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {packageData.destination?.city}, {packageData.destination?.state}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {packageData.duration?.days} Days / {packageData.duration?.nights} Nights
                  </div>
                </div>

                {/* Selected Options */}
                <div className="mb-4 pb-4 border-b space-y-3">
                  {selectedHotel && (
                    <div className="flex items-start">
                      <Hotel className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{selectedHotel.name}</p>
                        <p className="text-xs text-gray-600">{selectedHotel.roomType}</p>
                        <p className="text-sm text-blue-600">₹{selectedHotel.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedFood && (
                    <div className="flex items-start">
                      <Utensils className="w-4 h-4 text-red-600 mr-2 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{selectedFood.name}</p>
                        <p className="text-xs text-gray-600">{selectedFood.mealType}</p>
                        <p className="text-sm text-blue-600">₹{selectedFood.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedTravel && (
                    <div className="flex items-start">
                      <Car className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{selectedTravel.name}</p>
                        <p className="text-xs text-gray-600">{selectedTravel.vehicleType}</p>
                        <p className="text-sm text-blue-600">₹{selectedTravel.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedGuide && (
                    <div className="flex items-start">
                      <UserIcon className="w-4 h-4 text-purple-600 mr-2 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{selectedGuide.name}</p>
                        <p className="text-xs text-gray-600">{selectedGuide.languages?.join(', ')}</p>
                        <p className="text-sm text-blue-600">₹{selectedGuide.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                {pricing && (
                  <div className="mb-4 pb-4 border-b space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Base Price</span>
                      <span>₹{pricing.basePrice?.toLocaleString()}</span>
                    </div>
                    {packageData.packageType === 'single' && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Persons ({bookingData.persons.adults + bookingData.persons.children})</span>
                        <span>× {bookingData.persons.adults + bookingData.persons.children}</span>
                      </div>
                    )}
                    {pricing.taxes > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Taxes</span>
                        <span>₹{pricing.taxes?.toLocaleString()}</span>
                      </div>
                    )}
                    {pricing.serviceCharge > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Service Charge</span>
                        <span>₹{pricing.serviceCharge?.toLocaleString()}</span>
                      </div>
                    )}
                    {pricing.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-₹{pricing.discount?.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>₹{calculateTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || !bookingData.travelDates.startDate || !bookingData.travelDates.endDate}
                  className="w-full bg-blue-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Payment
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageBooking;

