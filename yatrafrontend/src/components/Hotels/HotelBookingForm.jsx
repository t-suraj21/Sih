import { useState } from 'react';
import { Calendar, Users, CreditCard, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { realHotelBookingService } from '../../services/realHotelApi';
import RealStripePayment from '../Payment/RealStripePayment';

const HotelBookingForm = ({ hotel, onBookingComplete, onCancel }) => {
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [isLoading, setIsLoading] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    roomType: 'deluxe',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: ''
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: ''
  });

  const [bookingResult, setBookingResult] = useState(null);

  const handleInputChange = (section, field, value) => {
    if (section === 'booking') {
      setBookingData(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setPaymentData(prev => ({ ...prev, [field]: value }));
    }
  };

  const calculateTotal = () => {
    const nights = Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24));
    const subtotal = hotel.pricePerNight * nights * bookingData.rooms;
    const taxes = Math.round(subtotal * 0.12); // 12% GST
    const serviceFee = 99;
    return { subtotal, taxes, serviceFee, total: subtotal + taxes + serviceFee, nights };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      // Payment step is now handled by RealStripePayment component
      // This block is no longer needed as payment processing is handled in renderPayment
      return;
    }
  };

  const renderBookingDetails = () => {
    const { subtotal, taxes, serviceFee, total, nights } = calculateTotal();
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
            
            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                <input
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) => handleInputChange('booking', 'checkIn', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                <input
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => handleInputChange('booking', 'checkOut', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Guests and Rooms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                <select
                  value={bookingData.guests}
                  onChange={(e) => handleInputChange('booking', 'guests', parseInt(e.target.value))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rooms</label>
                <select
                  value={bookingData.rooms}
                  onChange={(e) => handleInputChange('booking', 'rooms', parseInt(e.target.value))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {[1,2,3,4].map(num => (
                    <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Guest Information</h4>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={bookingData.guestName}
                  onChange={(e) => handleInputChange('booking', 'guestName', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={bookingData.guestEmail}
                  onChange={(e) => handleInputChange('booking', 'guestEmail', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={bookingData.guestPhone}
                  onChange={(e) => handleInputChange('booking', 'guestPhone', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  placeholder="Special Requests (Optional)"
                  value={bookingData.specialRequests}
                  onChange={(e) => handleInputChange('booking', 'specialRequests', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <img src={hotel.image} alt={hotel.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                    <p className="text-gray-600 text-sm">{hotel.location}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {bookingData.checkIn && bookingData.checkOut && (
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
                        <span>{bookingData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rooms:</span>
                        <span>{bookingData.rooms}</span>
                      </div>
                    </div>
                  </div>
                )}

                {nights > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Room rate (₹{hotel.pricePerNight} × {nights} nights)</span>
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
                )}
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-800 font-medium">Free cancellation</span>
              </div>
              <p className="text-xs text-green-700 mt-1">Cancel up to 24 hours before check-in for a full refund</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!bookingData.checkIn || !bookingData.checkOut || !bookingData.guestName || !bookingData.guestEmail}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    );
  };

  const renderPayment = () => {
    const { total, nights } = calculateTotal();
    
    const paymentBookingData = {
      hotelId: hotel.id,
      hotelName: hotel.name,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      rooms: bookingData.rooms,
      roomType: bookingData.roomType,
      totalAmount: total,
      guestDetails: {
        name: bookingData.guestName,
        email: bookingData.guestEmail,
        phone: bookingData.guestPhone
      },
      specialRequests: bookingData.specialRequests
    };

    const handlePaymentSuccess = (paymentResult) => {
      setBookingResult(paymentResult);
      setStep(3);
      if (onBookingComplete) {
        onBookingComplete(paymentResult);
      }
    };

    const handlePaymentError = (error) => {
      console.error('Payment failed:', error);
      // You can show an error message or handle the error as needed
    };

    const handlePaymentCancel = () => {
      setStep(1); // Go back to booking details
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <button
            onClick={() => setStep(1)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
          >
            ← Back to Booking Details
          </button>
        </div>
        
        <RealStripePayment
          bookingData={paymentBookingData}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
          onCancel={handlePaymentCancel}
        />
      </div>
    );
  };

  const renderConfirmation = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-600 mb-6">Your hotel booking has been successfully confirmed.</p>
      
      {bookingResult && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Booking ID:</span>
              <span className="font-mono text-blue-600">{bookingResult.booking?.id || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Confirmation Code:</span>
              <span className="font-mono text-green-600">{bookingResult.booking?.confirmationCode || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Hotel:</span>
              <span>{hotel.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Check-in:</span>
              <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Check-out:</span>
              <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span>{bookingResult.paymentMethod?.card ? `**** ${bookingResult.paymentMethod.card.last4}` : 'Card'}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Paid:</span>
              <span className="text-green-600 font-semibold">₹{calculateTotal().total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
          Download Receipt
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
          View Booking
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-center space-x-4 mb-8">
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

      {/* Step Content */}
      {step === 1 && renderBookingDetails()}
      {step === 2 && renderPayment()}
      {step === 3 && renderConfirmation()}
    </div>
  );
};

export default HotelBookingForm;
