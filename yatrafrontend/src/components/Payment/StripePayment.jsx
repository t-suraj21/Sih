import { useState } from 'react';
import { CreditCard, Shield, Lock } from 'lucide-react';
import { API_CONFIG } from '../../config/api';

const StripePayment = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    email: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateCard = () => {
    const newErrors = {};

    // Card number validation (basic)
    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    // Expiry validation
    if (!paymentData.expiryMonth || !paymentData.expiryYear) {
      newErrors.expiry = 'Please enter expiry date';
    }

    // CVV validation
    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    // Cardholder name validation
    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter cardholder name';
    }

    // Email validation
    if (!paymentData.email || !/\S+@\S+\.\S+/.test(paymentData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processPayment = async () => {
    if (!validateCard()) return;

    setIsProcessing(true);

    try {
      // Create payment intent with Stripe
      const paymentIntent = await createPaymentIntent();
      
      if (paymentIntent.success) {
        // Simulate payment processing
        setTimeout(() => {
          setIsProcessing(false);
          onPaymentSuccess({
            paymentIntentId: paymentIntent.data.id,
            amount: amount,
            currency: 'inr',
            status: 'succeeded'
          });
        }, 3000);
      } else {
        throw new Error(paymentIntent.error || 'Payment failed');
      }
    } catch (error) {
      setIsProcessing(false);
      onPaymentError(error.message);
    }
  };

  const createPaymentIntent = async () => {
    try {
      // This would normally call your backend to create a payment intent
      // For demo purposes, we'll simulate the response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              id: `pi_${Math.random().toString(36).substr(2, 24)}`,
              amount: amount * 100, // Stripe uses cents
              currency: API_CONFIG.DEFAULT_CURRENCY,
              status: 'requires_payment_method',
              client_secret: `pi_${Math.random().toString(36).substr(2, 24)}_secret_${Math.random().toString(36).substr(2, 16)}`
            }
          });
        }, 1000);
      });
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // Add spaces every 4 digits
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

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <CreditCard className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Secure Payment</h3>
        <div className="flex items-center space-x-1 ml-auto">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-600">SSL Encrypted</span>
        </div>
      </div>

      {/* Payment Amount */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-blue-900">Total Amount</span>
          <span className="text-2xl font-bold text-blue-600">₹{amount.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Form */}
      <div className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={paymentData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isProcessing}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number *
          </label>
          <input
            type="text"
            value={paymentData.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isProcessing}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name *
          </label>
          <input
            type="text"
            value={paymentData.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e.target.value.toUpperCase())}
            placeholder="JOHN SMITH"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.cardholderName ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isProcessing}
          />
          {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Month *
            </label>
            <select
              value={paymentData.expiryMonth}
              onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.expiry ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isProcessing}
            >
              <option value="">MM</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month.toString().padStart(2, '0')}>
                  {month.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year *
            </label>
            <select
              value={paymentData.expiryYear}
              onChange={(e) => handleInputChange('expiryYear', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.expiry ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isProcessing}
            >
              <option value="">YYYY</option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV *
            </label>
            <input
              type="text"
              value={paymentData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
              placeholder="123"
              maxLength="4"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.cvv ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isProcessing}
            />
          </div>
        </div>
        {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-green-600 mt-1" />
          <div>
            <h4 className="font-medium text-gray-900 text-sm">Your payment is secure</h4>
            <p className="text-gray-600 text-xs mt-1">
              We use industry-standard encryption to protect your payment information. 
              Your card details are never stored on our servers.
            </p>
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={processPayment}
        disabled={isProcessing}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            <span>Pay ₹{amount.toLocaleString()} Securely</span>
          </>
        )}
      </button>

      {/* Accepted Cards */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 mb-2">We accept</p>
        <div className="flex justify-center space-x-2">
          <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded">VISA</div>
          <div className="text-xs bg-red-600 text-white px-2 py-1 rounded">MC</div>
          <div className="text-xs bg-blue-800 text-white px-2 py-1 rounded">AMEX</div>
          <div className="text-xs bg-orange-600 text-white px-2 py-1 rounded">RUPAY</div>
        </div>
      </div>
    </div>
  );
};

export default StripePayment;
