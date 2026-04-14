import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [status, setStatus] = useState('processing'); // processing, success, error
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get parameters from URL
        const token = searchParams.get('token');
        const refreshToken = searchParams.get('refreshToken');
        const userString = searchParams.get('user');
        const error = searchParams.get('error');

        // Check for error
        if (error) {
          setStatus('error');
          setMessage(getErrorMessage(error));
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
          return;
        }

        // Validate required parameters
        if (!token || !userString) {
          setStatus('error');
          setMessage('Invalid authentication response. Please try again.');
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
          return;
        }

        // Parse user data
        const user = JSON.parse(decodeURIComponent(userString));

        // Store tokens in localStorage
        localStorage.setItem('token', token);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }

        // Update auth context (manually dispatch since we're not using the login function)
        // This is a workaround - ideally we'd have a separate method in AuthContext
        setStatus('success');
        setMessage('Authentication successful! Redirecting...');

        // Determine redirect path based on user role
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

        const dashboardPath = getDashboardPath(user.role);

        // Wait a moment to show success message, then redirect
        setTimeout(() => {
          // Force a page reload to trigger auth state check in AuthContext
          window.location.href = dashboardPath;
        }, 1500);

      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage('An error occurred during authentication. Please try again.');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  const getErrorMessage = (error) => {
    const errorMessages = {
      'google_auth_failed': 'Google authentication failed. Please try again.',
      'authentication_failed': 'Authentication failed. Please try again.',
      'user_creation_failed': 'Failed to create user account. Please try again.',
    };
    return errorMessages[error] || 'An unknown error occurred. Please try again.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              {status === 'processing' && (
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                </div>
              )}
              {status === 'success' && (
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              )}
              {status === 'error' && (
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {status === 'processing' && 'Authenticating...'}
              {status === 'success' && 'Success!'}
              {status === 'error' && 'Authentication Failed'}
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-6">
              {message}
            </p>

            {/* Progress indicator for processing */}
            {status === 'processing' && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            )}

            {/* Error action button */}
            {status === 'error' && (
              <button
                onClick={() => navigate('/login', { replace: true })}
                className="mt-4 w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
              >
                Return to Login
              </button>
            )}
          </div>
        </div>

        {/* Info text */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {status === 'processing' && 'Please wait while we complete your authentication...'}
          {status === 'success' && 'You will be redirected shortly...'}
          {status === 'error' && 'Redirecting to login page...'}
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;

