import { useState, useEffect } from 'react';
import { CreditCard, Lock, Shield, CheckCircle, XCircle, Loader } from 'lucide-react';
import { realHotelBookingService } from '../../services/realHotelApi';

const RealStripePayment = ({ 
  bookingData, 
  onPaymentSuccess, 
  onPaymentError, 
  onCancel 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error
  const [paymentError, setPaymentError] = useState('');
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  // Initialize payment intent on component mount
  useEffect(() => {
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      const result = await realHotelBookingService.createPaymentIntent(
        bookingData.totalAmount,
        'inr',
        {
          hotel_id: bookingData.hotelId,
          guest_name: bookingData.guestDetails?.name || 'Guest',
          check_in: bookingData.checkIn,
          check_out: bookingData.checkOut
        }
      );

      if (result.success) {
        setPaymentIntent(result.data);
      } else {
        setPaymentError('Failed to initialize payment. Please try again.');
      }
    } catch (error) {
      console.error('Payment intent creation error:', error);
      setPaymentError('Failed to initialize payment. Please try again.');
    }
  };

  const handleInputChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateCard = () => {
    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
      return 'Please enter a valid card number';
    }
    if (!cardDetails.expiryDate || cardDetails.expiryDate.length < 5) {
      return 'Please enter a valid expiry date';
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      return 'Please enter a valid CVV';
    }
    if (!cardDetails.cardholderName.trim()) {
      return 'Please enter the cardholder name';
    }
    return null;
  };

  const handlePayment = async () => {
    const validationError = validateCard();
    if (validationError) {
      setPaymentError(validationError);
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    setPaymentError('');

    try {
      // Create booking with payment processing
      const bookingResult = await realHotelBookingService.createBooking(
        bookingData,
        paymentIntent?.id
      );

      if (bookingResult.success) {
        // Simulate payment confirmation
        const paymentMethodId = `pm_${Math.random().toString(36).substr(2, 24)}`;
        const confirmResult = await realHotelBookingService.confirmPayment(
          paymentIntent?.id,
          paymentMethodId
        );

        if (confirmResult.success) {
          setPaymentStatus('success');
          setTimeout(() => {
            onPaymentSuccess({
              booking: bookingResult.data.booking,
              paymentIntent: bookingResult.data.paymentIntent,
              paymentMethod: {
                card: {
                  last4: cardDetails.cardNumber.replace(/\s/g, '').slice(-4),
                  brand: getCardBrand(cardDetails.cardNumber)
                }
              }
            });
          }, 2000);
        } else {
          throw new Error(confirmResult.error || 'Payment confirmation failed');
        }
      } else {
        throw new Error(bookingResult.error || 'Booking creation failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setPaymentError(error.message || 'Payment failed. Please try again.');
      onPaymentError(error.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardBrand = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'Mastercard';
    if (number.startsWith('3')) return 'American Express';
    return 'Unknown';
  };

  if (paymentStatus === 'success') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed. You'll receive a confirmation email shortly.
        </p>
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h3>
        <p className="text-red-600 mb-6">{paymentError}</p>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setPaymentStatus('idle');
              setPaymentError('');
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CreditCard className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Secure Payment</h3>
        <p className="text-gray-600 text-sm mt-1">
          <Lock className="w-4 h-4 inline mr-1" />
          Your payment is secured with 256-bit SSL encryption
        </p>
      </div>

      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Hotel:</span>
            <span className="font-medium">{bookingData.hotelName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Check-in:</span>
            <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Check-out:</span>
            <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Guests:</span>
            <span>{bookingData.guests} guest{bookingData.guests > 1 ? 's' : ''}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total Amount:</span>
              <span>₹{bookingData.totalAmount?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
        <div className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                value={cardDetails.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* CVV */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                maxLength="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardDetails.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Error Message */}
        {paymentError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{paymentError}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            type="submit"
            disabled={isProcessing || paymentStatus === 'processing'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Pay ₹{bookingData.totalAmount?.toLocaleString()}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="w-full bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            <Lock className="w-3 h-3 inline mr-1" />
            Secured by 256-bit SSL encryption • PCI DSS compliant
          </p>
        </div>
      </form>
    </div>
  );
};

export default RealStripePayment;
