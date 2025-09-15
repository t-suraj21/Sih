import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Shield, CheckCircle, Phone, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, isAuthenticated, user, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'tourist'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');
  const [message, setMessage] = useState({ type: '', text: '' });

  const userTypes = [
    { 
      id: 'tourist', 
      name: 'Tourist', 
      description: 'Book and explore travel services',
      icon: '🧳',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    { 
      id: 'vendor', 
      name: 'Service Provider', 
      description: 'Manage your travel business',
      icon: '🏢',
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    { 
      id: 'admin', 
      name: 'Administrator', 
      description: 'Platform management and oversight',
      icon: '👑',
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    }
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Basic validation
    if (!formData.email || !formData.password) {
      setMessage({
        type: 'error',
        text: 'Please fill in all required fields.'
      });
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        setMessage({
          type: 'success',
          text: 'Login successful! Redirecting...'
        });
        
        // Navigate to appropriate dashboard
        const dashboardPath = getDashboardPath(result.user.role);
        setTimeout(() => {
          navigate(dashboardPath, { replace: true });
        }, 1000);
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Login failed. Please check your credentials.'
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear messages when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
    if (error) {
      clearError();
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back to Bharat Bhraman
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your trusted platform for safe travel experiences in India
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* User Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Select your account type:
            </label>
            <div className="space-y-3">
              {userTypes.map((type) => (
                <label 
                  key={type.id} 
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                    formData.role === type.id 
                      ? 'border-blue-500 bg-blue-50 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300'
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
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="text-2xl">{type.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">{type.name}</div>
                      <div className="text-xs text-gray-600">{type.description}</div>
                    </div>
                    {formData.role === type.id && (
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Login Method Toggle */}
          <div className="mb-6">
            <div className="flex rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  loginMethod === 'email' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  loginMethod === 'phone' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Phone Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {loginMethod === 'email' ? 'Email address' : 'Phone number'}
              </label>
              <input
                id="email"
                name="email"
                type={loginMethod === 'email' ? 'email' : 'tel'}
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder={loginMethod === 'email' ? 'Enter your email address' : 'Enter your phone number (+91XXXXXXXXXX)'}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
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

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign in to your account'
                )}
              </button>
            </div>

            {/* OTP Login Option */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                onClick={() => navigate('/login/otp')}
              >
                Sign in with OTP instead →
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6 grid grid-cols-1 gap-3">
              <button 
                onClick={handleGoogleLogin}
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

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-medium">Secure Login</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium">Govt. Verified</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
              <span className="font-medium">Trusted by 1M+</span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Need help? Contact our{' '}
            <Link to="/support" className="text-blue-600 hover:text-blue-500">
              24/7 Support Team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;