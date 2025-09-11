import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, AlertTriangle, Home, MapPin, Hotel, Leaf, User, Phone, HelpCircle, Info, LogIn, UserPlus, LogOut } from 'lucide-react';
import apiService from '../../services/api.service';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = apiService.isAuthenticated();
      const user = apiService.getCurrentUser();
      setIsAuthenticated(authenticated);
      setUserData(user);
    };

    checkAuth();
    
    // Listen for auth changes (simple polling approach)
    const interval = setInterval(checkAuth, 5000);
    return () => clearInterval(interval);
  }, [location]);

  const handleLogout = async () => {
    try {
      await apiService.logout();
      setIsAuthenticated(false);
      setUserData(null);
      setIsMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Primary navigation - always visible on desktop
  const primaryNavigation = [
    { name: 'Services', href: '/services', description: 'Guides & Transport' },
    { name: 'Food & Hygiene', href: '/services?tab=food', description: 'FSSAI Certified' },
    { name: 'Contact', href: '/contact', description: '24x7 Support' }
  ];

  // Secondary navigation - shown in hamburger menu
  const secondaryNavigation = [
    { name: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Destinations', href: '/destinations', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Hotels & Stays', href: '/hotels', icon: <Hotel className="w-5 h-5" /> },
    { name: 'Eco Tourism', href: '/eco-tourism', icon: <Leaf className="w-5 h-5" /> },
    { name: 'About Us', href: '/about', icon: <Info className="w-5 h-5" /> },
    { name: 'FAQ', href: '/faq', icon: <HelpCircle className="w-5 h-5" /> }
  ];

  const languages = ['EN', 'HI', 'BN', 'TA', 'TE'];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-2xl font-bold text-gray-900">Yatra</div>
                <div className="text-xs text-green-600 font-semibold tracking-wide">TRUSTED TOURISM</div>
              </div>
            </Link>
          </div>

          {/* Desktop Primary Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md ${
                  location.pathname === item.href || 
                  (item.href.includes('?tab=') && location.pathname + location.search === item.href)
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{item.name}</div>
                  <div className={`text-xs mt-0.5 ${
                    location.pathname === item.href || 
                    (item.href.includes('?tab=') && location.pathname + location.search === item.href)
                      ? 'text-blue-100'
                      : 'text-gray-500 group-hover:text-blue-500'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-3">
            {/* SOS Button - Always visible */}
            <Link
              to="/safety-sos"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">SOS</span>
            </Link>

            {/* Desktop Right Items */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none bg-gray-50 border-0 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <Globe className="absolute right-2 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* Login/Signup */}
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Hamburger Menu - Always visible */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors relative"
              title="More options"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              {/* Notification dot for desktop users */}
              <div className="hidden lg:block absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Slide-out Menu */}
            <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Y</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">Menu</div>
                      <div className="text-xs text-gray-500">Explore Yatra</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Primary Navigation for Mobile/Quick Access */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    <span className="lg:hidden">Main Services</span>
                    <span className="hidden lg:inline">Quick Access</span>
                  </h3>
                  <div className="space-y-1">
                    {primaryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center justify-between p-3 rounded-xl font-medium transition-colors ${
                          location.pathname === item.href || 
                          (item.href.includes('?tab=') && location.pathname + location.search === item.href)
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className={`text-xs mt-0.5 ${
                            location.pathname === item.href || 
                            (item.href.includes('?tab=') && location.pathname + location.search === item.href)
                              ? 'text-blue-100'
                              : 'text-gray-500'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Secondary Navigation */}
                <div className="flex-1 px-6 py-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    <span className="lg:hidden">Explore</span>
                    <span className="hidden lg:inline">All Pages</span>
                  </h3>
                  <div className="space-y-1">
                    {secondaryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-3 p-3 rounded-xl font-medium transition-colors ${
                          location.pathname === item.href
                            ? 'bg-gray-100 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="p-6 border-t border-gray-100 space-y-4">
                  {/* Language Selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Language</span>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-gray-50 border-0 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Login/Signup - Only show on mobile/tablet */}
                  <div className="flex space-x-3 lg:hidden">
                    <Link
                      to="/login"
                      className="flex-1 text-center text-gray-700 hover:text-blue-600 px-4 py-3 rounded-xl font-medium border border-gray-200 hover:border-blue-300 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex-1 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>

                  {/* Desktop Additional Options */}
                  <div className="hidden lg:block">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-blue-900">Account</div>
                            <div className="text-xs text-blue-700">Manage your profile</div>
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        to="/dashboard/user"
                        className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span>My Dashboard</span>
                      </Link>
                      
                      <Link
                        to="/safety-sos"
                        className="flex items-center space-x-3 p-3 rounded-xl text-red-700 hover:bg-red-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <AlertTriangle className="w-5 h-5" />
                        <span>Emergency Center</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
