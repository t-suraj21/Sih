import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  QrCode,
  Download,
  ArrowLeft,
  Star,
  Wifi,
  Coffee,
  Car
} from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  
  // Get destination data from navigation state
  const destinationData = location.state?.destination;
  
  const [bookingData, setBookingData] = useState({
    serviceType: destinationData?.type || 'destination',
    serviceName: destinationData?.name || 'Heritage Palace Hotel',
    location: destinationData?.location || 'India',
    checkIn: '2024-12-25',
    checkOut: '2024-12-28',
    guests: 2,
    rooms: 1,
    specialRequests: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [serviceDetails, setServiceDetails] = useState(destinationData || null);

  useEffect(() => {
    // Update booking data if destination data is available
    if (destinationData) {
      setBookingData(prev => ({
        ...prev,
        serviceType: destinationData.type || 'destination',
        serviceName: destinationData.name,
        location: destinationData.name // Use destination name as location
      }));
      setServiceDetails(destinationData);
    }
  }, [destinationData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    if (destinationData?.price) {
      // Parse the price from the destination (remove ₹ and convert to number)
      const basePrice = parseInt(destinationData.price.replace(/[₹,\s]/g, ''));
      const guestMultiplier = bookingData.guests || 1;
      const subtotal = basePrice * guestMultiplier;
      const tax = subtotal * 0.18; // 18% GST
      return {
        subtotal,
        tax,
        total: subtotal + tax
      };
    }
    if (!serviceDetails) return { subtotal: 0, taxes: 0, serviceFee: 0, total: 0, nights: 0 };
    
    const nights = Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24));
    const subtotal = (serviceDetails.price || serviceDetails.pricePerNight || 0) * nights * (bookingData.rooms || 1);
    const taxes = Math.round(subtotal * 0.12); // 12% GST
    const serviceFee = 99;
    return { subtotal, taxes, serviceFee, total: subtotal + taxes + serviceFee, nights };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4); // Confirmation step
    }, 3000);
  };

  const renderBookingDetails = () => {
  const { subtotal, taxes, serviceFee, total, nights } = calculateTotal();

  // Show loading state if service details are not loaded
  if (!serviceDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dates and Guests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                  <select
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rooms</label>
                  <select
                    name="rooms"
                    value={bookingData.rooms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1,2,3,4].map(num => (
                      <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="guestName"
                      value={bookingData.guestName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="guestEmail"
                      value={bookingData.guestEmail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="guestPhone"
                      value={bookingData.guestPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Requests</h3>
                <textarea
                  name="specialRequests"
                  value={bookingData.specialRequests}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special requests or requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img src={serviceDetails.image} alt={serviceDetails.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{serviceDetails.name}</h4>
                  <p className="text-gray-600 text-sm flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {serviceDetails.location}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{serviceDetails.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-green-600">Hygiene: {serviceDetails.hygieneRating}/10</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{nights} night{nights > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{bookingData.guests} guest{bookingData.guests > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rooms:</span>
                    <span>{bookingData.rooms} room{bookingData.rooms > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Room rate (₹{serviceDetails.pricePerNight} × {nights} nights)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & fees</span>
                    <span>₹{taxes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>₹{serviceFee}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span className="text-green-600">₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">Free cancellation</span>
                </div>
                <p className="text-xs text-green-700 mt-1">{serviceDetails.cancellationPolicy}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Why book with us?</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-blue-800">
                <Shield className="w-4 h-4" />
                <span>Government verified services</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-800">
                <CheckCircle className="w-4 h-4" />
                <span>No hidden charges</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-800">
                <Clock className="w-4 h-4" />
                <span>24x7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPayment = () => {
    const { total } = calculateTotal();
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Choose Payment Method</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" /> },
                  { id: 'upi', name: 'UPI', icon: <div className="w-5 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center">₹</div> },
                  { id: 'wallet', name: 'Digital Wallet', icon: <div className="w-5 h-5 bg-purple-600 rounded text-white text-xs flex items-center justify-center">W</div> }
                ].map((method) => (
                  <label key={method.id} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    bookingData.paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={bookingData.paymentMethod === method.id}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      {method.icon}
                      <span className="font-medium">{method.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Card Payment Form */}
            {bookingData.paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={bookingData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={bookingData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={bookingData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI Payment Form */}
            {bookingData.paymentMethod === 'upi' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  value={bookingData.upiId}
                  onChange={handleInputChange}
                  placeholder="yourname@paytm"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {/* Total Amount */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">₹{total}</span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Secure Payment</h4>
                  <p className="text-sm text-blue-700">Your payment information is encrypted and secure. We never store your card details.</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay ₹${total}`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderConfirmation = () => {
    const bookingId = 'YTR' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your booking has been successfully confirmed. You'll receive a confirmation email shortly.</p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Booking QR Code</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Booking ID:</span>
                <span className="font-mono text-blue-600">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Service:</span>
                <span>{serviceDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Check-in:</span>
                <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Paid:</span>
                <span className="text-green-600 font-semibold">₹{calculateTotal().total}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Receipt</span>
            </button>
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              View Booking Details
            </button>
          </div>
          
          <div className="mt-6 text-sm text-gray-600">
            <p>Need help? Contact our 24x7 support at <span className="text-blue-600">1800-XXX-XXXX</span></p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {step === 1 ? 'Booking Details' : step === 2 ? 'Payment' : 'Booking Confirmation'}
              </h1>
              <p className="text-gray-600">
                {step === 1 ? 'Enter your booking information' : 
                 step === 2 ? 'Complete your payment' : 
                 'Your booking is confirmed!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {step < 4 && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    step >= stepNumber ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {stepNumber === 1 ? 'Details' : stepNumber === 2 ? 'Payment' : 'Confirmation'}
                  </span>
                  {stepNumber < 3 && (
                    <div className={`w-12 h-1 mx-4 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 1 && renderBookingDetails()}
        {step === 2 && renderPayment()}
        {step === 4 && renderConfirmation()}
      </div>
    </div>
  );
};

export default Booking;
