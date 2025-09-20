import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute, { AdminRoute, VendorRoute, TouristRoute, PublicRoute } from './components/ProtectedRoute';
import NewHomepage from './pages/NewHomepage';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import Services from './pages/Services';
import Hotels from './pages/Hotels';
import Booking from './pages/Booking';
import SafetySOS from './pages/SafetySOS';
import EcoTourism from './pages/EcoTourism';
import UserDashboard from './pages/UserDashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
// Vendor Pages
import VendorServices from './pages/vendor/VendorServices';
import VendorBookings from './pages/vendor/VendorBookings';
import VendorAnalytics from './pages/vendor/VendorAnalytics';
// Admin Pages
import AdminUsers from './pages/admin/AdminUsers';
import AdminVendors from './pages/admin/AdminVendors';
import AdminContent from './pages/admin/AdminContent';
import AdminAnalytics from './pages/admin/AdminAnalytics';
// Profile Pages
import UserProfile from './pages/UserProfile';
import ProfileSettings from './pages/ProfileSettings';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
          <Layout>
            <Routes>
              {/* Homepage with Africa Tours design */}
              <Route path="/" element={<NewHomepage />} />
              
              {/* All other routes */}
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destination/:destinationName" element={<DestinationDetails />} />
              <Route path="/services" element={<Services />} />
              <Route path="/destination/:destinationName/services" element={<Services />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/safety-sos" element={<SafetySOS />} />
              <Route path="/eco-tourism" element={<EcoTourism />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              
              {/* Auth Routes (redirect if already logged in) */}
              <Route path="/login" element={
                <PublicRoute redirectIfAuthenticated={true}>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute redirectIfAuthenticated={true}>
                  <Signup />
                </PublicRoute>
              } />
              
              {/* Protected Routes - Require Authentication */}
              <Route path="/booking" element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              } />
              
              {/* Tourist Dashboard - All authenticated users */}
              <Route path="/dashboard/user" element={
                <TouristRoute>
                  <UserDashboard />
                </TouristRoute>
              } />
              
              {/* Vendor Dashboard - Vendors and Admins */}
              <Route path="/dashboard/vendor" element={
                <VendorRoute>
                  <VendorDashboard />
                </VendorRoute>
              } />
              
              {/* Admin Dashboard - Admins only */}
              <Route path="/dashboard/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              
              {/* Vendor Routes */}
              <Route path="/vendor/services" element={
                <VendorRoute>
                  <VendorServices />
                </VendorRoute>
              } />
              <Route path="/vendor/bookings" element={
                <VendorRoute>
                  <VendorBookings />
                </VendorRoute>
              } />
              <Route path="/vendor/analytics" element={
                <VendorRoute>
                  <VendorAnalytics />
                </VendorRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/users" element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              } />
              <Route path="/admin/vendors" element={
                <AdminRoute>
                  <AdminVendors />
                </AdminRoute>
              } />
              <Route path="/admin/content" element={
                <AdminRoute>
                  <AdminContent />
                </AdminRoute>
              } />
              <Route path="/admin/analytics" element={
                <AdminRoute>
                  <AdminAnalytics />
                </AdminRoute>
              } />
              
              {/* Profile Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              <Route path="/profile/settings" element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;