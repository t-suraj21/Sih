import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Globe, AlertTriangle, Home, MapPin, Hotel, Leaf, User, HelpCircle, Info,
  ChevronDown, Search, Bell, Heart, ShoppingBag, UserCircle, LogOut, Settings,
  Sparkles, Zap, Star, Shield, Award, Users, Moon, Sun, Palette
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mouseIdle, setMouseIdle] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  // Auth state is now managed by AuthContext, no need for local state management

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let mouseTimer;

    const handleMouseMove = () => {
      setIsVisible(true);
      setMouseIdle(false);
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        setMouseIdle(true);
        if (window.scrollY > 100) {
          setIsVisible(false);
        }
      }, 3000);
    };

    const handleMouseLeave = () => {
      setMouseIdle(true);
      if (window.scrollY > 100) {
        setIsVisible(false);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      setMouseIdle(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(mouseTimer);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      // Scroll to top after search
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    navigate(`/destinations?search=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const primaryNavigation = useMemo(() => [
    { 
      name: 'Destinations', 
      href: '/destinations',
      icon: <MapPin className="w-4 h-4" />
    },
    { 
      name: 'Hotels', 
      href: '/hotels',
      icon: <Hotel className="w-4 h-4" />
    },
    { 
      name: 'Services', 
      href: '/services',
      icon: <Award className="w-4 h-4" />
    }
  ], []);

  const secondaryNavigation = useMemo(() => [
    { name: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'About Us', href: '/about', icon: <Info className="w-5 h-5" /> },
    { name: 'Contact', href: '/contact', icon: <HelpCircle className="w-5 h-5" /> },
    { name: 'FAQ', href: '/faq', icon: <HelpCircle className="w-5 h-5" /> }
  ], []);

  const languages = useMemo(() => [
    { code: 'EN', name: 'English'},
    { code: 'HI', name: 'हिन्दी'},
    { code: 'BN', name: 'বাংলা'},
    { code: 'TA', name: 'தமিழ்'},
    { code: 'TE', name: 'తెలుగు'}
  ], []);

  const isActiveTab = (href) => location.pathname + location.search === href;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      {/* Main Header */}
      <div className={`backdrop-blur-xl transition-all duration-300 ${
        isScrolled 
          ? isDark
            ? 'bg-slate-900/95 shadow-xl border-b border-slate-700/50'
            : 'bg-white/95 shadow-xl border-b border-gray-200/50'
          : isDark
            ? 'bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-700/95 shadow-2xl'
            : 'bg-gradient-to-r from-blue-600/95 via-purple-600/95 to-indigo-600/95 shadow-2xl'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ${
                  isScrolled 
                    ? isDark
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                      : 'bg-gradient-to-br from-blue-500 to-purple-600'
                    : isDark
                      ? 'bg-slate-700/50 backdrop-blur-sm border border-slate-600/50'
                      : 'bg-white/20 backdrop-blur-sm'
                }`}>
                  <Sparkles className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-white'}`} />
                </div>
                <div className="hidden sm:block">
                  <div className={`text-2xl font-bold transition-colors duration-300 group-hover:scale-105 ${
                    isScrolled 
                      ? isDark 
                        ? 'text-white group-hover:text-blue-400'
                        : 'text-gray-800 group-hover:text-blue-700'
                      : 'text-white'
                  }`}>
                    BB
                  </div>
                  <div className={`text-xs font-semibold tracking-wide transition-colors ${
                    isScrolled 
                      ? isDark
                        ? 'text-blue-400'
                        : 'text-blue-600'
                      : isDark
                        ? 'text-blue-300'
                        : 'text-blue-100'
                  }`}>
                    BHARAT BHRAMAN
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {primaryNavigation.map((item, index) => (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.href}
                    className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                      isActiveTab(item.href)
                        ? isScrolled
                          ? isDark
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                          : isDark
                            ? 'bg-slate-700/50 text-white shadow-lg backdrop-blur-sm border border-slate-600/50'
                            : 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                        : isScrolled
                        ? isDark
                          ? 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                        : isDark
                          ? 'text-slate-300 hover:bg-slate-700/30 hover:text-white'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="transition-transform duration-300 group-hover:rotate-12">
                      {item.icon}
                    </span>
                    <div className="text-center">
                      <div className="font-semibold flex items-center space-x-2">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold animate-pulse ${
                            item.badge === 'Hot' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className={`text-xs transition-colors ${
                        isActiveTab(item.href)
                          ? isScrolled 
                            ? isDark ? 'text-blue-200' : 'text-blue-100'
                            : isDark ? 'text-slate-300' : 'text-white/80'
                          : isScrolled 
                            ? isDark ? 'text-slate-400 group-hover:text-slate-300' : 'text-gray-500 group-hover:text-blue-600'
                            : isDark ? 'text-slate-400 group-hover:text-slate-300' : 'text-white/70 group-hover:text-white/90'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                  
                  {/* Hover Effect */}
                  <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 ${
                    isActiveTab(item.href) || 'group-hover:w-8'
                  } ${
                    isScrolled 
                      ? isDark ? 'bg-blue-400' : 'bg-blue-600'
                      : isDark ? 'bg-slate-300' : 'bg-white'
                  } rounded-full`} />
                </div>
              ))}
            </nav>

            {/* Right side items */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isScrolled 
                    ? isDark
                      ? 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                    : isDark
                      ? 'text-slate-300 hover:bg-slate-700/30'
                      : 'text-white hover:bg-white/10'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 group ${
                  isScrolled 
                    ? isDark
                      ? 'text-slate-300 hover:bg-slate-800/50 hover:text-yellow-400'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-purple-600'
                    : isDark
                      ? 'text-slate-300 hover:bg-slate-700/30 hover:text-yellow-400'
                      : 'text-white hover:bg-white/10 hover:text-yellow-300'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <div className="relative w-5 h-5">
                  <Sun className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                    isDark ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`} />
                  <Moon className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                    isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                  }`} />
                </div>
              </button>

              {/* SOS Button */}
              <Link
                to="/safety-sos"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105 shadow-lg animate-pulse"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">SOS</span>
              </Link>

              {/* Desktop Right Items */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Language Selector */}
                <div className="relative group">
                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className={`appearance-none border rounded-xl px-4 py-2.5 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 transition-all duration-300 shadow-sm ${
                      isScrolled 
                        ? isDark
                          ? 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        : isDark
                          ? 'bg-slate-700/50 border-slate-600/50 text-slate-200 backdrop-blur-sm'
                          : 'bg-white/20 border-white/30 text-white backdrop-blur-sm'
                    }`}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                  <Globe className={`absolute right-2 top-3 w-4 h-4 pointer-events-none ${
                    isScrolled 
                      ? isDark ? 'text-slate-400' : 'text-gray-600'
                      : isDark ? 'text-slate-300' : 'text-white'
                  }`} />
                </div>

                {/* User Menu */}
                {isAuthenticated ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isScrolled 
                          ? isDark
                            ? 'text-slate-300 hover:bg-slate-800/50'
                            : 'text-gray-700 hover:bg-gray-100'
                          : isDark
                            ? 'text-slate-300 hover:bg-slate-700/30'
                            : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <UserCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="hidden sm:inline font-medium">
                        {user?.name || 'User'}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl border py-2 animate-in slide-in-from-top-2 duration-300 ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700'
                          : 'bg-white border-gray-200'
                      }`}>
                        <div className={`px-4 py-3 border-b ${
                          isDark ? 'border-slate-700' : 'border-gray-100'
                        }`}>
                          <p className={`text-sm font-medium ${
                            isDark ? 'text-slate-100' : 'text-gray-900'
                          }`}>{user?.name}</p>
                          <p className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-gray-500'
                          }`}>{user?.email}</p>
                          <p className={`text-xs capitalize ${
                            isDark ? 'text-blue-400' : 'text-blue-600'
                          }`}>{user?.role}</p>
                        </div>
                        <div className="py-2">
                          {/* Dashboard Link - Role-based */}
                          <Link
                            to={user?.role === 'admin' ? '/dashboard/admin' : user?.role === 'vendor' ? '/dashboard/vendor' : '/dashboard/user'}
                            className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                              isDark 
                                ? 'text-slate-300 hover:bg-slate-700/50'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            <span>
                              {user?.role === 'admin' ? 'Admin Dashboard' : 
                               user?.role === 'vendor' ? 'Vendor Dashboard' : 
                               'My Dashboard'}
                            </span>
                          </Link>

                          {/* Role-specific Links */}
                          {user?.role === 'vendor' && (
                            <>
                              <Link
                                to="/vendor/services"
                                className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                              isDark 
                                ? 'text-slate-300 hover:bg-slate-700/50'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Award className="w-4 h-4" />
                                <span>My Services</span>
                              </Link>
                              <Link
                                to="/vendor/bookings"
                                className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                              isDark 
                                ? 'text-slate-300 hover:bg-slate-700/50'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Bell className="w-4 h-4" />
                                <span>Bookings</span>
                              </Link>
                            </>
                          )}

                          {user?.role === 'admin' && (
                            <>
                              <Link
                                to="/admin/users"
                                className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                              isDark 
                                ? 'text-slate-300 hover:bg-slate-700/50'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Users className="w-4 h-4" />
                                <span>Manage Users</span>
                              </Link>
                              <Link
                                to="/admin/content"
                                className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                              isDark 
                                ? 'text-slate-300 hover:bg-slate-700/50'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <Settings className="w-4 h-4" />
                                <span>Content Management</span>
                              </Link>
                            </>
                          )}

                          {/* Common Links */}
                          <Link
                            to="/profile"
                            className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                              isDark 
                                ? 'text-slate-300 hover:bg-slate-700/50'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Profile Settings</span>
                          </Link>

                          <div className="border-t border-gray-100 my-2"></div>

                          <button
                            onClick={handleLogout}
                            className={`flex items-center space-x-3 w-full px-4 py-2 text-sm transition-colors ${
                              isDark
                                ? 'text-red-400 hover:bg-red-900/20'
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link 
                      to="/login" 
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        isScrolled 
                          ? isDark
                            ? 'text-slate-300 hover:bg-slate-800/50 hover:text-blue-400'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                          : isDark
                            ? 'text-slate-300 hover:bg-slate-700/30'
                            : 'text-white hover:bg-white/10'
                      }`}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg ${
                        isScrolled 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl hover:shadow-blue-500/25'
                          : isDark
                            ? 'bg-slate-700/50 backdrop-blur-sm text-white hover:bg-slate-600/50 border border-slate-600/50'
                            : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                      }`}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 lg:hidden ${
                  isScrolled 
                    ? isDark
                      ? 'text-slate-300 hover:bg-slate-800/50'
                      : 'text-gray-600 hover:bg-gray-100'
                    : isDark
                      ? 'text-slate-300 hover:bg-slate-700/30'
                      : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="relative w-6 h-6">
                  <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                  }`} />
                  <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'
                  }`} />
                </div>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="pb-4 animate-in slide-in-from-top-2 duration-300">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, hotels, attractions..."
                  className={`w-full px-4 py-3 pr-12 rounded-2xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg ${
                    isScrolled 
                      ? isDark
                        ? 'bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-400'
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                      : isDark
                        ? 'bg-slate-800/90 border border-slate-600/50 text-slate-100 placeholder-slate-400 backdrop-blur-sm'
                        : 'bg-white/90 border border-white/30 text-gray-900 placeholder-gray-600 backdrop-blur-sm'
                  }`}
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
              
              {/* Quick Search Suggestions */}
              <div className="mt-3 space-y-2">
                <div className={`text-xs font-semibold mb-2 ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}>Popular Searches:</div>
                <div className="flex flex-wrap gap-2">
                  {['Taj Mahal', 'Goa Beaches', 'Kerala Backwaters', 'Rajasthan Palace', 'Himalayas', 'Golden Triangle'].map((suggestion, index) => (
                    <button
                      key={suggestion}
                      onClick={() => handleQuickSearch(suggestion)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
                        isScrolled 
                          ? isDark
                            ? 'bg-slate-700 text-slate-300 hover:bg-blue-600/20 hover:text-blue-400'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                          : isDark
                            ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 backdrop-blur-sm'
                            : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Navigation */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu */}
          <div className={`fixed top-0 right-0 h-full w-80 shadow-2xl z-50 transform transition-all duration-500 ease-out animate-in slide-in-from-right-2 ${
            isDark ? 'bg-slate-900' : 'bg-white'
          }`}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={`flex items-center justify-between p-6 border-b text-white ${
                isDark 
                  ? 'border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700'
                  : 'border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 backdrop-blur-sm rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-slate-700/50' : 'bg-white/20'
                  }`}>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">Yatra Menu</div>
                    <div className={`text-xs ${
                      isDark ? 'text-slate-300' : 'text-blue-100'
                    }`}>Explore India</div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Primary Navigation */}
              <div className={`px-6 py-4 border-b ${
                isDark ? 'border-slate-700' : 'border-gray-100'
              }`}>
                <div className="space-y-2">
                  {primaryNavigation.map((item, index) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 p-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                        isActiveTab(item.href) 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                          : isDark
                            ? 'text-slate-300 hover:bg-slate-800/50 hover:text-blue-400'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="transition-transform duration-300 hover:rotate-12">
                        {item.icon}
                      </span>
                      <div className="flex-1">
                        <div className="font-semibold flex items-center space-x-2">
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                              item.badge === 'Hot' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className={`text-xs mt-0.5 ${
                          isActiveTab(item.href)
                            ? 'text-blue-200'
                            : isDark ? 'text-slate-400' : 'text-gray-500'
                        }`}>{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Secondary Navigation */}
              <div className="flex-1 px-6 py-4 overflow-y-auto">
                <div className="space-y-2">
                  {secondaryNavigation.map((item, index) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 p-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                        isActiveTab(item.href) 
                          ? isDark
                            ? 'bg-slate-800 text-blue-400'
                            : 'bg-gray-100 text-blue-600'
                          : isDark
                            ? 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-300'
                            : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ animationDelay: `${(index + 4) * 100}ms` }}
                    >
                      <span className="transition-transform duration-300 hover:rotate-12">
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className={`p-6 border-t ${
                isDark 
                  ? 'border-slate-700 bg-slate-800/50'
                  : 'border-gray-100 bg-gray-50'
              }`}>
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className={`flex items-center space-x-3 p-3 rounded-xl ${
                      isDark ? 'bg-slate-800' : 'bg-white'
                    }`}>
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <UserCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className={`font-semibold ${
                          isDark ? 'text-slate-100' : 'text-gray-900'
                        }`}>{user?.name}</div>
                        <div className={`text-xs ${
                          isDark ? 'text-slate-400' : 'text-gray-500'
                        }`}>{user?.email}</div>
                        <div className={`text-xs capitalize ${
                          isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}>{user?.role}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                        isDark 
                          ? 'text-red-400 hover:bg-red-900/20'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      className={`w-full flex items-center justify-center space-x-2 p-3 rounded-xl transition-colors ${
                        isDark 
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Star className="w-5 h-5" />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-in slide-in-from-bottom-2"
          title="Scroll to top"
        >
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </header>
  );
};

export default Header;