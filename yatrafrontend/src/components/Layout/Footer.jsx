import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
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
            <p className="text-gray-400 text-sm">
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
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/eco-tourism" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Eco Tourism
                </Link>
              </li>
              <li>
                <Link to="/safety-sos" className="text-gray-400 hover:text-white transition-colors text-sm">
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
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
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
                  <p className="text-gray-400 text-sm">1800-XXX-XXXX</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">Email Support</p>
                  <p className="text-gray-400 text-sm">support@yatra.gov.in</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">Headquarters</p>
                  <p className="text-gray-400 text-sm">New Delhi, India</p>
                </div>
              </div>
            </div>
            
            {/* Download App */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Download Our App</p>
              <div className="flex space-x-2">
                <button className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-xs transition-colors">
                  📱 Play Store
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-xs transition-colors">
                  🍎 App Store
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Government Partners */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">Trusted Government Partners</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <span className="text-xs">🇮🇳 Ministry of Tourism</span>
              <span className="text-xs">🛡️ FSSAI Certified</span>
              <span className="text-xs">✅ Govt. Verified</span>
              <span className="text-xs">🏛️ State Tourism Boards</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Yatra - Trusted Tourism. All rights reserved. | Powered by Government of India Initiative
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
