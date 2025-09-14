import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, Lock, UserX } from 'lucide-react';

const ProtectedRoute = ({ 
  children, 
  requiredRoles = null, 
  requireAuth = true,
  fallbackPath = '/login'
}) => {
  const { isAuthenticated, user, loading, canAccess } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to={fallbackPath} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Check role-based access
  if (requiredRoles && !canAccess(requiredRoles)) {
    return <UnauthorizedAccess userRole={user?.role} requiredRoles={requiredRoles} />;
  }

  return children;
};

// Component for unauthorized access
const UnauthorizedAccess = ({ userRole, requiredRoles }) => {
  const getRoleDisplayName = (role) => {
    const roleNames = {
      'tourist': 'Tourist',
      'vendor': 'Service Provider',
      'admin': 'Administrator'
    };
    return roleNames[role] || role;
  };

  const getRequiredRolesText = (roles) => {
    if (!Array.isArray(roles)) roles = [roles];
    return roles.map(getRoleDisplayName).join(' or ');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-yellow-800 font-medium mb-1">Insufficient Permissions</p>
              <p className="text-yellow-700 text-sm">
                This page requires {getRequiredRolesText(requiredRoles)} access.
                {userRole && (
                  <span className="block mt-1">
                    You are currently logged in as: <strong>{getRoleDisplayName(userRole)}</strong>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Go Back
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Go to Homepage
          </button>

          {userRole === 'tourist' && requiredRoles.includes('vendor') && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                Need to become a service provider?
              </p>
              <button
                onClick={() => window.location.href = '/vendor/register'}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Register as Service Provider
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Higher-order component for route protection
export const withRoleProtection = (Component, requiredRoles) => {
  return (props) => (
    <ProtectedRoute requiredRoles={requiredRoles}>
      <Component {...props} />
    </ProtectedRoute>
  );
};

// Specific role-based route components
export const AdminRoute = ({ children }) => (
  <ProtectedRoute requiredRoles={['admin']}>
    {children}
  </ProtectedRoute>
);

export const VendorRoute = ({ children }) => (
  <ProtectedRoute requiredRoles={['vendor', 'admin']}>
    {children}
  </ProtectedRoute>
);

export const TouristRoute = ({ children }) => (
  <ProtectedRoute requiredRoles={['tourist', 'vendor', 'admin']}>
    {children}
  </ProtectedRoute>
);

export const AuthenticatedRoute = ({ children }) => (
  <ProtectedRoute requireAuth={true}>
    {children}
  </ProtectedRoute>
);

export const PublicRoute = ({ children, redirectIfAuthenticated = false, redirectTo = '/' }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (redirectIfAuthenticated && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
