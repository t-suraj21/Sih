import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  
  return (
    <footer className={`transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-950 text-slate-100 border-t border-slate-800'
        : 'bg-gray-900 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BB</span>
              </div>
              <div>
                <div className="text-xl font-bold">Bharat Bhraman</div>
                <div className="text-sm text-green-400">Trusted Tourism</div>
              </div>
            </div>
            <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-gray-400'
                }`}>
              Safe, verified, and transparent travel in India. Your trusted partner for fraud-free tourism experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className={`transition-colors text-sm ${
                  isDark 
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-400 hover:text-white'
                }`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/destinations" className={`transition-colors text-sm ${
                  isDark 
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-400 hover:text-white'
                }`}>
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/services" className={`transition-colors text-sm ${
                  isDark 
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-400 hover:text-white'
                }`}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/eco-tourism" className={`transition-colors text-sm ${
                  isDark 
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-400 hover:text-white'
                }`}>
                  Eco Tourism
                </Link>
              </li>
              <li>
                <Link to="/safety-sos" className={`transition-colors text-sm ${
                  isDark 
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-400 hover:text-white'
                }`}>
                  Safety & SOS
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className={`transition-colors text-sm ${
                  isDark 
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-400 hover:text-white'
                }`}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className={`transition-colors text-sm ${
                  isDark 
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-400 hover:text-white'
                }`}>
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className={`transition-colors text-sm ${
                  isDark 
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-400 hover:text-white'
                }`}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors text-sm ${
                  isDark 
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-400 hover:text-white'
                }`}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors text-sm ${
                  isDark 
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-400 hover:text-white'
                }`}>
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">24x7 Helpline</p>
                  <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-gray-400'
                }`}>1800-XXX-XXXX</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">Email Support</p>
                  <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-gray-400'
                }`}>support@yatra.gov.in</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">Headquarters</p>
                  <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-gray-400'
                }`}>New Delhi, India</p>
                </div>
              </div>
            </div>
            
            {/* Download App */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Download Our App</p>
              <div className="flex space-x-2">
                <button className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}>
                  📱 Play Store
                </button>
                <button className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}>
                  🍎 App Store
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Government Partners */}
        <div className={`border-t ${
          isDark ? 'border-slate-700' : 'border-gray-800'
        } mt-8 pt-8`}>
          <div className="text-center">
            <p className={`text-sm mb-4 ${
              isDark ? 'text-slate-400' : 'text-gray-400'
            }`}>Trusted Government Partners</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <span className="text-xs">🇮🇳 Ministry of Tourism</span>
              <span className="text-xs">🛡️ FSSAI Certified</span>
              <span className="text-xs">✅ Govt. Verified</span>
              <span className="text-xs">🏛️ State Tourism Boards</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`border-t ${
          isDark ? 'border-slate-700' : 'border-gray-800'
        } mt-8 pt-8 text-center`}>
          <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-gray-400'
                }`}>
            © 2024 Yatra - Trusted Tourism. All rights reserved. | Powered by Government of India Initiative
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
