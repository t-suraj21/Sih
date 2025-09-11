import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, CheckCircle, Phone, Mail, User, Building, AlertCircle } from 'lucide-react';
import apiService from '../services/api.service';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Account Type, 2: Basic Info, 3: Verification
  const [formData, setFormData] = useState({
    userType: 'tourist',
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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const userTypes = [
    { 
      id: 'tourist', 
      name: 'Tourist', 
      icon: <User className="w-8 h-8" />,
      description: 'Book verified services and explore destinations safely',
      features: ['Book Hotels & Guides', 'Access Safety Features', 'Earn Eco Points', 'Get 24x7 Support']
    },
    { 
      id: 'vendor', 
      name: 'Service Provider', 
      icon: <Building className="w-8 h-8" />,
      description: 'List your services and connect with verified travelers',
      features: ['List Your Services', 'Get Verified Badge', 'Manage Bookings', 'Access Analytics']
    }
  ];

  const businessTypes = [
    'Hotel/Resort', 'Tour Guide', 'Transport Service', 'Restaurant/Food', 'Adventure Sports', 'Cultural Experience'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    if (step < 3) {
      // Validate current step
      if (step === 2) {
        // Validate basic info
        if (!formData.firstName || !formData.lastName || !formData.email || 
            !formData.phone || !formData.password || !formData.confirmPassword) {
          setMessage({
            type: 'error',
            text: 'Please fill in all required fields'
          });
          return;
        }
        
        if (formData.password !== formData.confirmPassword) {
          setMessage({
            type: 'error',
            text: 'Passwords do not match'
          });
          return;
        }
        
        if (formData.password.length < 8) {
          setMessage({
            type: 'error',
            text: 'Password must be at least 8 characters long'
          });
          return;
        }
      }
      
      setStep(step + 1);
      return;
    }

    // Final step - submit registration
    setIsLoading(true);
    
    try {
      const registrationData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.userType
      };

      const response = await apiService.register(registrationData);

      if (response.success) {
        setMessage({
          type: 'success',
          text: 'Registration successful! Redirecting to dashboard...'
        });
        
        // Get user data and redirect based on role
        const userData = apiService.getCurrentUser();
        setTimeout(() => {
          if (userData?.role === 'vendor') {
            navigate('/dashboard/vendor');
          } else {
            navigate('/dashboard/user');
          }
        }, 1500);
      } else {
        setMessage({
          type: 'error',
          text: response.message || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Account Type</h2>
        <p className="text-gray-600">Select how you want to use Yatra</p>
      </div>

      <div className="space-y-4">
        {userTypes.map((type) => (
          <label key={type.id} className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${
            formData.userType === type.id 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}>
            <input
              type="radio"
              name="userType"
              value={type.id}
              checked={formData.userType === type.id}
              onChange={handleChange}
              className="sr-only"
            />
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${
                formData.userType === type.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {type.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                  {formData.userType === type.id && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <p className="text-gray-600 mb-3">{type.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Continue
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter last name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter email address"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter phone number"
        />
      </div>

      {formData.userType === 'vendor' && (
        <>
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
              Business Name *
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              required
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter business name"
            />
          </div>

          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
              Business Type *
            </label>
            <select
              id="businessType"
              name="businessType"
              required
              value={formData.businessType}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select business type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Create password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Confirm password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification & Terms</h2>
        <p className="text-gray-600">Complete your registration</p>
      </div>

      {formData.userType === 'vendor' && (
        <div>
          <label htmlFor="govtId" className="block text-sm font-medium text-gray-700 mb-1">
            Government ID Number *
          </label>
          <input
            id="govtId"
            name="govtId"
            type="text"
            required
            value={formData.govtId}
            onChange={handleChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter Aadhaar/PAN/License number"
          />
          <p className="text-xs text-gray-500 mt-1">
            Required for vendor verification and trust badge
          </p>
        </div>
      )}

      <div className="space-y-4">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">User Agreement</a> *
          </span>
        </label>

        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="acceptPrivacy"
            checked={formData.acceptPrivacy}
            onChange={handleChange}
            required
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>{' '}
            and consent to data processing *
          </span>
        </label>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Your data is secure</h4>
            <p className="text-xs text-blue-700 mt-1">
              All information is encrypted and stored securely. We never share your personal data without consent.
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading || !formData.acceptTerms || !formData.acceptPrivacy}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Join Yatra
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Start your verified travel journey today
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-8 h-1 mx-2 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </form>

          {step === 1 && (
            <>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    <span>Google</span>
                  </button>
                  <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    <span>Facebook</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in here
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-green-600 mr-1" />
              <span>Secure Signup</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-1" />
              <span>Govt. Verified</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              <span>Trusted Platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
