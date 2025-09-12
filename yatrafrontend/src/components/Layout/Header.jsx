import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, AlertTriangle, Home, MapPin, Hotel, Leaf, User, HelpCircle, Info } from 'lucide-react';
import apiService from '../../services/api.service';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mouseIdle, setMouseIdle] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = apiService.isAuthenticated();
      const user = apiService.getCurrentUser();
      setIsAuthenticated(authenticated);
      setUserData(user);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 5000);
    return () => clearInterval(interval);
  }, [location]);

  useEffect(() => {
    let mouseTimer;

    const handleMouseMove = () => {
      setIsVisible(true);
      setMouseIdle(false);
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        setMouseIdle(true);
        setIsVisible(false);
      }, 2000);
    };

    const handleMouseLeave = () => {
      setMouseIdle(true);
      setIsVisible(false);
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

  const primaryNavigation = [
    { name: t('services'), href: '/services', description: t('guidesTransport') },
    { name: t('foodHygiene'), href: '/services?tab=food', description: t('fssaiCertified') },
    { name: t('contact'), href: '/contact', description: t('support247') }
  ];

  const secondaryNavigation = [
    { name: t('home'), href: '/', icon: <Home className="w-5 h-5" /> },
    { name: t('destinations'), href: '/destinations', icon: <MapPin className="w-5 h-5" /> },
    { name: t('hotels'), href: '/hotels', icon: <Hotel className="w-5 h-5" /> },
    { name: t('ecoTourism'), href: '/eco-tourism', icon: <Leaf className="w-5 h-5" /> },
    { name: t('aboutUs'), href: '/about', icon: <Info className="w-5 h-5" /> },
    { name: t('faq'), href: '/faq', icon: <HelpCircle className="w-5 h-5" /> }
  ];

  const languages = ['EN', 'HI', 'BN', 'TA', 'TE'];

  const isActiveTab = (href) => location.pathname + location.search === href;

  return (
    <header className={`bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/30 transition-all duration-500 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-bold text-xl">B²</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">BharatBhraman</div>
                <div className="text-xs text-blue-600 font-semibold tracking-wide">TRUSTED TOURISM</div>
              </div>
            </Link>
          </div>

          {/* Desktop Primary Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg ${
                  isActiveTab(item.href)
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white/60 hover:text-blue-700'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{item.name}</div>
                  <div className={`text-xs mt-0.5 ${isActiveTab(item.href) ? 'text-blue-100' : 'text-gray-600 group-hover:text-blue-600'}`}>
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-3">
            <Link
              to="/safety-sos"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105 shadow-lg"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">SOS</span>
            </Link>

            {/* Desktop Right Items */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/70 transition-all duration-300 shadow-sm"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <Globe className="absolute right-2 top-3 w-4 h-4 text-gray-600 pointer-events-none" />
              </div>

              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-gray-700 hover:text-blue-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/60 transition-all duration-300">{t('login')}</Link>
                <Link to="/signup" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">{t('signUp')}</Link>
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl hover:bg-white/60 transition-all duration-300 relative group"
              title="More options"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-gray-700 group-hover:text-blue-700" /> : <Menu className="w-6 h-6 text-gray-700 group-hover:text-blue-700" />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation Overlay */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu */}
            <div
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out pointer-events-auto"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside menu from closing
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">B²</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{t('menu')}</div>
                      <div className="text-xs text-gray-500">{t('Explore BharatBhraman')}</div>
                    </div>
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Primary Navigation */}
                <div className="px-6 py-4 border-b border-gray-100 bg-white">
                  <div className="space-y-1">
                    {primaryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center justify-between p-3 rounded-xl font-medium transition-colors ${
                          isActiveTab(item.href) ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 bg-white'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-xs mt-0.5 text-gray-500">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Secondary Navigation */}
                <div className="flex-1 px-6 py-4 bg-white">
                  <div className="space-y-1">
                    {secondaryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-3 p-3 rounded-xl font-medium transition-colors ${
                          isActiveTab(item.href) ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50 bg-white'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ))}
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
