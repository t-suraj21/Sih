import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Shield, CheckCircle, Phone, Mail, User, Building, AlertCircle, Loader2, Star, Crown, Briefcase } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, loading, error, isAuthenticated, user, clearError } = useAuth();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: 'tourist',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: '',
    govtId: '',
    acceptTerms: false,
    acceptPrivacy: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from || getDashboardPath(user.role);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  const getDashboardPath = (role) => {
    switch (role) {
      case 'admin':
        return '/dashboard/admin';
      case 'vendor':
        return '/dashboard/vendor';
      case 'tourist':
      default:
        return '/dashboard/user';
    }
  };

  const userTypes = [
    { 
      id: 'tourist', 
      name: 'Tourist', 
      icon: <User className="w-10 h-10" />,
      description: 'Book verified services and explore destinations safely across India',
      features: ['Book Hotels & Guides', 'Access Safety Features', 'Earn Eco Points', 'Get 24x7 Support'],
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      id: 'vendor', 
      name: 'Service Provider', 
      icon: <Building className="w-10 h-10" />,
      description: 'List your tourism services and connect with verified travelers',
      features: ['List Your Services', 'Get Verified Badge', 'Manage Bookings', 'Access Analytics'],
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    { 
      id: 'admin', 
      name: 'Administrator', 
      icon: <Crown className="w-10 h-10" />,
      description: 'Platform management and oversight with full system access',
      features: ['Manage All Users', 'Content Moderation', 'System Analytics', 'Policy Control'],
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const businessTypes = [
    'Hotel/Resort', 'Tour Guide', 'Transport Service', 'Restaurant/Food', 
    'Adventure Sports', 'Cultural Experience', 'Travel Agency', 'Eco Tourism'
  ];

  const validateStep2 = () => {
    if (!formData.firstName?.trim() || !formData.lastName?.trim() || 
        !formData.email?.trim() || !formData.phone?.trim() || 
        !formData.password || !formData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Please fill in all required fields'
      });
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid email address'
      });
      return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid phone number'
      });
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Passwords do not match'
      });
      return false;
    }
    
    if (formData.password.length < 8) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters long'
      });
      return false;
    }
    
    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(formData.password)) {
      setMessage({
        type: 'error',
        text: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
      });
      return false;
    }
    
    // Additional vendor validation
    if (formData.role === 'vendor') {
      if (!formData.businessName?.trim() || !formData.businessType?.trim()) {
        setMessage({
          type: 'error',
          text: 'Please fill in business information'
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    if (step < 3) {
      if (step === 2 && !validateStep2()) {
        return;
      }
      setStep(step + 1);
      return;
    }

    // Final step - submit registration
    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      setMessage({
        type: 'error',
        text: 'Please accept the terms and privacy policy'
      });
      return;
    }

    try {
      const registrationData = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: formData.role
      };

      const result = await register(registrationData);

      if (result.success) {
        setMessage({
          type: 'success',
          text: 'Registration successful! Redirecting to your dashboard...'
        });
        
        setTimeout(() => {
          const dashboardPath = getDashboardPath(result.user.role);
          navigate(dashboardPath, { replace: true });
        }, 1500);
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Registration failed. Please try again.'
        });
      }
    } catch (err) {
      console.error('Registration error:', err);
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear messages when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
    if (error) {
      clearError();
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Account Type</h2>
        <p className="text-gray-600">Select how you want to use Yatra platform</p>
      </div>

      <div className="space-y-4">
        {userTypes.map((type) => (
          <label 
            key={type.id} 
            className={`block p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-md ${
              formData.role === type.id 
                ? `border-transparent bg-gradient-to-r ${type.color} text-white shadow-lg` 
                : `border-gray-200 hover:border-gray-300 ${type.bgColor}`
            }`}
          >
            <input
              type="radio"
              name="role"
              value={type.id}
              checked={formData.role === type.id}
              onChange={handleChange}
              className="sr-only"
            />
            <div className="flex items-start space-x-4">
              <div className={`p-4 rounded-xl ${
                formData.role === type.id 
                  ? 'bg-white/20 backdrop-blur-sm text-white' 
                  : 'bg-white text-gray-600 shadow-sm'
              }`}>
                {type.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-xl font-bold ${
                    formData.role === type.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {type.name}
                  </h3>
                  {formData.role === type.id && (
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                </div>
                <p className={`mb-4 ${
                  formData.role === type.id ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {type.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {type.features.map((feature, index) => (
                    <div key={index} className={`flex items-center text-sm ${
                      formData.role === type.id ? 'text-white/90' : 'text-gray-700'
                    }`}>
                      <CheckCircle className={`w-4 h-4 mr-2 ${
                        formData.role === type.id ? 'text-white' : 'text-green-600'
                      }`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
      >
        Continue with {userTypes.find(t => t.id === formData.role)?.name}
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter last name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Enter your phone number (+91XXXXXXXXXX)"
        />
      </div>

      {formData.role === 'vendor' && (
        <>
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              required
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your business name"
            />
          </div>

          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
              Business Type *
            </label>
            <select
              id="businessType"
              name="businessType"
              required
              value={formData.businessType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select your business type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password *
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Create a strong password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : 
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            }
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Password must be at least 8 characters long and contain uppercase, lowercase, and number
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? 
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : 
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            }
          </button>
        </div>
      </div>

      {/* Error Message */}
      {(message.text || error) && (
        <div className={`p-4 rounded-xl flex items-center ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{message.text || error}</span>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms & Verification</h2>
        <p className="text-gray-600">Complete your registration</p>
      </div>

      {formData.role === 'vendor' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Briefcase className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Vendor Verification</h4>
              <p className="text-xs text-yellow-700">
                As a service provider, you'll need to complete additional verification steps after registration 
                to get your verified badge and start listing services.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700 leading-relaxed">
            I agree to the{' '}
            <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/user-agreement" className="text-blue-600 hover:text-blue-500 font-medium">
              User Agreement
            </Link> *
          </span>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="acceptPrivacy"
            checked={formData.acceptPrivacy}
            onChange={handleChange}
            required
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700 leading-relaxed">
            I agree to the{' '}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
              Privacy Policy
            </Link>{' '}
            and consent to data processing for platform services *
          </span>
        </label>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-green-800 mb-1">Your data is secure</h4>
            <p className="text-xs text-green-700">
              All information is encrypted and stored securely. We never share your personal data 
              without explicit consent and follow strict data protection standards.
            </p>
          </div>
        </div>
      </div>

      {/* Error/Success Message */}
      {(message.text || error) && (
        <div className={`p-4 rounded-xl flex items-center ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{message.text || error}</span>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading || !formData.acceptTerms || !formData.acceptPrivacy}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Creating Account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Join Yatra Today
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Start your verified travel journey with India's trusted platform
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step >= stepNumber 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-12 h-1 mx-2 rounded-full transition-all ${
                  step > stepNumber ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between text-xs text-gray-600 px-2">
          <span className={step >= 1 ? 'text-blue-600 font-medium' : ''}>Account Type</span>
          <span className={step >= 2 ? 'text-blue-600 font-medium' : ''}>Information</span>
          <span className={step >= 3 ? 'text-blue-600 font-medium' : ''}>Verification</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </form>

          {step === 1 && (
            <>
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">Or sign up with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button 
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                    Sign in here
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-medium">Secure Registration</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium">Govt. Verified</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-purple-600 mr-2" />
              <span className="font-medium">Trusted by 1M+</span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Need help with registration? Contact our{' '}
            <Link to="/support" className="text-blue-600 hover:text-blue-500">
              24/7 Support Team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;