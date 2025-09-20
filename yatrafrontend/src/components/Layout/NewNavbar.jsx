import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const NewNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'HOME', href: '/' },
    { name: 'TOURS', href: '/destinations' },
    { name: 'CATEGORY', href: '/services' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'CONTACT', href: '/contact' }
  ];

  const isActiveLink = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Leaf className="w-8 h-8 text-green-500 transform group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold tracking-tight">
                    BHARAT
                  </div>
                  <div className="text-xs font-medium tracking-widest text-green-400 -mt-1">
                    BHRAMAN
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-6 py-2 text-sm font-semibold tracking-wider transition-all duration-300 group ${
                    isActiveLink(item.href)
                      ? 'text-green-400'
                      : 'text-white hover:text-green-400'
                  }`}
                >
                  {item.name}
                  
                  {/* Active/Hover underline */}
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-green-400 transition-all duration-300 ${
                    isActiveLink(item.href) 
                      ? 'w-8' 
                      : 'w-0 group-hover:w-8'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Auth Section - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to={user?.role === 'admin' ? '/dashboard/admin' : user?.role === 'vendor' ? '/dashboard/vendor' : '/dashboard/user'}
                    className="text-white hover:text-green-400 transition-colors text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-white hover:text-green-400 transition-colors text-sm font-medium px-4 py-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-green-500/20">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-semibold tracking-wider transition-all duration-300 rounded-lg ${
                    isActiveLink(item.href)
                      ? 'text-green-400 bg-green-500/10'
                      : 'text-white hover:text-green-400 hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-green-500/20 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to={user?.role === 'admin' ? '/dashboard/admin' : user?.role === 'vendor' ? '/dashboard/vendor' : '/dashboard/user'}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-white hover:text-green-400 transition-colors font-medium rounded-lg hover:bg-white/5"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-white hover:text-green-400 transition-colors font-medium rounded-lg hover:bg-white/5"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="block bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>
    </>
  );
};

export default NewNavbar;
