import { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../services/api.service.js';

const AuthContext = createContext();

// Auth states
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on app load
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      // Try to get user profile
      try {
        const response = await apiService.getProfile();
        if (response.success && response.data?.user) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: response.data.user,
              token: token
            }
          });
        } else {
          throw new Error('Profile fetch failed');
        }
      } catch (error) {
        // Token might be expired, try to refresh
        if (refreshToken) {
          try {
            await refreshAuthToken(refreshToken);
          } catch (refreshError) {
            // Refresh failed, logout
            logout();
          }
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error('Auth state check failed:', error);
      logout();
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await apiService.login(credentials);
      
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data;

        if (!user || !token) {
          console.error('Invalid response structure:', response);
          throw new Error('Invalid response from server');
        }

        // Store tokens
        localStorage.setItem('token', token);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token }
        });

        return { success: true, user };
      } else {
        const message = response.message || 'Login failed';
        console.error('Login failed:', response);
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: message
        });
        return { success: false, error: message };
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: message
      });
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await apiService.register(userData);
      
      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data;

        if (!user || !token) {
          console.error('Invalid registration response structure:', response);
          throw new Error('Invalid response from server');
        }

        // Store tokens
        localStorage.setItem('token', token);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token }
        });

        return { success: true, user };
      } else {
        const message = response.message || 'Registration failed';
        console.error('Registration failed:', response);
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: message
        });
        return { success: false, error: message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: message
      });
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      // Call logout API if authenticated
      if (state.isAuthenticated && state.token) {
        await apiService.logout();
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with logout even if API call fails
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData'); // Also clear user data

      dispatch({ type: 'LOGOUT' });
    }
  };

  const refreshAuthToken = async (refreshToken) => {
    try {
      const response = await apiService.refreshToken(refreshToken);
      
      if (response.success && response.data) {
        const { token: newToken, refreshToken: newRefreshToken } = response.data;

        // Update stored tokens
        localStorage.setItem('token', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Get updated user profile
        const profileResponse = await apiService.getProfile();
        
        if (profileResponse.success && profileResponse.data?.user) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: profileResponse.data.user,
              token: newToken
            }
          });
        }

        return true;
      } else {
        throw new Error(response.message || 'Token refresh failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    try {
      const response = await apiService.updateUserProfile(updates);
      
      if (response.success && response.data?.user) {
        dispatch({
          type: 'UPDATE_USER',
          payload: response.data.user
        });

        return { success: true, user: response.data.user };
      } else {
        return { success: false, error: response.message || 'Profile update failed' };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Profile update failed';
      return { success: false, error: message };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const response = await apiService.changePassword(passwordData);
      return response;
    } catch (error) {
      console.error('Change password error:', error);
      const message = error.response?.data?.message || error.message || 'Password change failed';
      return { success: false, error: message };
    }
  };

  const sendPhoneOTP = async (phone) => {
    try {
      const response = await apiService.sendOTP(phone);
      return response;
    } catch (error) {
      console.error('Send OTP error:', error);
      const message = error.response?.data?.message || error.message || 'OTP sending failed';
      return { success: false, error: message };
    }
  };

  const verifyPhoneOTP = async (phone, otp) => {
    try {
      const response = await apiService.verifyPhone(phone, otp);
      
      if (response.success) {
        // Update user verification status
        if (state.user) {
          dispatch({
            type: 'UPDATE_USER',
            payload: { phoneVerified: true }
          });
        }
      }

      return response;
    } catch (error) {
      console.error('Verify OTP error:', error);
      const message = error.response?.data?.message || error.message || 'OTP verification failed';
      return { success: false, error: message };
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Helper functions
  const isAdmin = () => state.user?.role === 'admin';
  const isVendor = () => state.user?.role === 'vendor';
  const isTourist = () => state.user?.role === 'tourist';
  
  const hasRole = (roles) => {
    if (!state.user) return false;
    return Array.isArray(roles) ? roles.includes(state.user.role) : state.user.role === roles;
  };

  const canAccess = (requiredRoles) => {
    if (!requiredRoles) return true;
    if (!state.isAuthenticated) return false;
    return hasRole(requiredRoles);
  };

  const value = {
    // State
    ...state,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    sendPhoneOTP,
    verifyPhoneOTP,
    clearError,
    
    // Helper functions
    isAdmin,
    isVendor,
    isTourist,
    hasRole,
    canAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
