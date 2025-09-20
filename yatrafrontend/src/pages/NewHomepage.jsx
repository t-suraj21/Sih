import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Play, 
  ArrowRight, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Phone, 
  ChevronLeft, 
  ChevronRight,
  Camera,
  Mountain,
  Waves,
  TreePine,
  Plus,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Menu,
  X,
  Leaf,
  CheckCircle
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const NewHomepage = () => {
  const { isDark } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Navbar states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Existing states
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(2); // Center item
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStartX, setScrollStartX] = useState(0);
  const [scrollStartY, setScrollStartY] = useState(0);
  const destinationsRef = useRef(null);
  const popularDestinationsRef = useRef(null);
  const topDestinationsRef = useRef(null);

  // Hero video destinations
  const heroDestinations = [
    {
      id: 1,
      number: "01",
      title: "NEVER STOP",
      subtitle: "EXPLORING BHARAT",
      description: "Discover the incredible diversity of India with verified guides, FSSAI-approved restaurants, and transparent pricing. From the majestic Himalayas to pristine beaches.",
      backgroundImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&h=1080&fit=crop",
      cta: "CONTACT US",
      watchPromo: "WATCH PROMO"
    }
  ];

  // Featured destinations with video thumbnails
  const featuredDestinations = [
    {
      id: 1,
      number: "01",
      title: "Golden Temple",
      subtitle: "January 27 12:24 Pm",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop",
      hasVideo: true
    },
    {
      id: 2,
      number: "02",
      title: "Kashmir Valley",
      subtitle: "January 27 12:24 Pm",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      hasVideo: true
    },
    {
      id: 3,
      number: "03",
      title: "Kerala Backwaters",
      subtitle: "January 27 12:24 Pm",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=300&fit=crop",
      hasVideo: true
    },
    {
      id: 4,
      number: "04",
      title: "Rajasthan Desert",
      subtitle: "January 27 12:24 Pm",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=300&fit=crop",
      hasVideo: true
    }
  ];

  // Top destinations carousel
  const topDestinations = [
    {
      id: 1,
      name: "Goa Beaches",
      description: "Experience pristine beaches, vibrant nightlife, and Portuguese heritage in India's coastal paradise",
      price: "₹ 15,000",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=500&fit=crop"
    },
    {
      id: 2,
      name: "Kashmir Valley",
      description: "Discover the 'Paradise on Earth' with stunning lakes, snow-capped mountains, and houseboats",
      price: "₹ 25,000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop"
    },
    {
      id: 3,
      name: "Taj Mahal, Agra",
      description: "Marvel at the world's most beautiful monument to love, a UNESCO World Heritage Site",
      price: "₹ 8,500",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=500&fit=crop"
    },
    {
      id: 4,
      name: "Rajasthan Royal Tour",
      description: "Explore majestic palaces, desert landscapes, and rich cultural heritage of the Land of Kings",
      price: "₹ 22,000",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=500&fit=crop"
    },
    {
      id: 5,
      name: "Kerala Backwaters",
      description: "Cruise through serene backwaters, lush greenery, and experience God's Own Country",
      price: "₹ 18,000",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=500&fit=crop"
    },
    {
      id: 6,
      name: "Himachal Pradesh",
      description: "Adventure in the Himalayas with trekking, skiing, and breathtaking mountain views",
      price: "₹ 16,500",
      image: "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=500&fit=crop"
    },
    {
      id: 7,
      name: "Golden Temple, Amritsar",
      description: "Visit the holiest Sikh shrine with its golden architecture and spiritual serenity",
      price: "₹ 12,000",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=500&fit=crop"
    },
    {
      id: 8,
      name: "Leh Ladakh",
      description: "Experience high-altitude desert landscapes, ancient monasteries, and adventure sports",
      price: "₹ 28,000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop"
    },
    {
      id: 9,
      name: "Andaman Islands",
      description: "Dive into crystal-clear waters, pristine beaches, and vibrant coral reefs",
      price: "₹ 32,000",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop"
    },
    {
      id: 10,
      name: "Varanasi",
      description: "Witness ancient spiritual traditions along the sacred Ganges River in India's oldest city",
      price: "₹ 10,000",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=500&fit=crop"
    }
  ];

  // Excursion route
  const excursionRoute = {
    title: "Golden Triangle Tour",
    day: "Day 01",
    subtitle: "Classic India Heritage Circuit",
    description: "Embark on India's most iconic journey through the Golden Triangle - Delhi, Agra, and Jaipur. This carefully curated 7-day expedition takes you through UNESCO World Heritage sites, magnificent Mughal architecture, and vibrant Rajasthani culture. Experience authentic Indian hospitality with government-certified guides, FSSAI-approved restaurants, and luxury accommodations.",
    duration: "7 Days / 6 Nights",
    price: "₹ 35,000",
    rating: 4.8,
    reviews: 2847,
    mainImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    galleryImages: [
      {
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop",
        title: "Red Fort, Delhi",
        description: "Explore Mughal architecture"
      },
      {
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
        title: "Hawa Mahal, Jaipur",
        description: "Pink City's iconic palace"
      },
      {
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop",
        title: "Taj Mahal, Agra",
        description: "Monument of eternal love"
      }
    ],
    highlights: [
      "UNESCO World Heritage Sites",
      "Government Certified Guides",
      "FSSAI Approved Restaurants",
      "Luxury Transportation",
      "24/7 Support",
      "Cultural Experiences"
    ],
    itinerary: [
      { day: 1, city: "Delhi", activity: "Arrival & Red Fort" },
      { day: 2, city: "Delhi", activity: "India Gate & Lotus Temple" },
      { day: 3, city: "Agra", activity: "Taj Mahal & Agra Fort" },
      { day: 4, city: "Agra", activity: "Fatehpur Sikri" },
      { day: 5, city: "Jaipur", activity: "Amber Fort & City Palace" },
      { day: 6, city: "Jaipur", activity: "Hawa Mahal & Local Markets" },
      { day: 7, city: "Delhi", activity: "Departure" }
    ],
    currentDay: "02/07",
    tourOperators: [
      { name: "Incredible India", logo: "🇮🇳", rating: 4.9 },
      { name: "Heritage Tours", logo: "🏛️", rating: 4.8 },
      { name: "Royal Rajasthan", logo: "👑", rating: 4.7 },
      { name: "Golden Triangle Co.", logo: "🔶", rating: 4.8 },
      { name: "India Discovery", logo: "🗺️", rating: 4.6 }
    ]
  };

  // Tour price includes
  const tourIncludes = [
    "Air-conditioned vehicle",
    "Vehicle pick up from Airport",
    "Hotel 3 stars",
    "Transport hotel to Airport",
    "Transport hotel to Airport",
    "Train tickets to destinations",
    "Tour guide for all tours",
    "Breakfast (4)"
  ];

  // Destination categories
  const destinationCategories = [
    {
      id: 1,
      name: "Adventure Trip",
      count: "24 Destinations",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Heritage Tour",
      count: "30 Destinations",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Spiritual Journey",
      count: "45 Destinations",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Beach Holiday",
      count: "34 Destinations",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Hill Station",
      count: "49 Destinations",
      image: "https://images.unsplash.com/photo-1605538883669-825200433431?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Cultural Experience",
      count: "28 Destinations",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&h=200&fit=crop"
    }
  ];

  // Popular destinations
  const popularDestinations = [
    {
      id: 1,
      name: "Kerala Backwaters",
      location: "Kerala",
      duration: "10 Days Trip",
      price: "₹ 25,000",
      tag: "Popular",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Rajasthan Royal Tour",
      location: "Rajasthan",
      duration: "10 Days Trip",
      price: "₹ 35,000",
      tag: "Heritage",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Goa Beach Paradise",
      location: "Goa",
      duration: "10 Days Trip",
      price: "₹ 20,000",
      tag: "Beach",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Himachal Adventure",
      location: "Himachal Pradesh",
      duration: "10 Days Trip",
      price: "₹ 28,000",
      tag: "Adventure",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Golden Triangle Classic",
      location: "Delhi-Agra-Jaipur",
      duration: "10 Days Trip",
      price: "₹ 22,000",
      tag: "Classic",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      name: "South India Temple Tour",
      location: "Tamil Nadu",
      duration: "10 Days Trip",
      price: "₹ 18,000",
      tag: "Spiritual",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop"
    },
    {
      id: 7,
      name: "Kashmir Paradise",
      location: "Kashmir",
      duration: "10 Days Trip",
      price: "₹ 32,000",
      tag: "Nature",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    },
    {
      id: 8,
      name: "Northeast Explorer",
      location: "Meghalaya",
      duration: "10 Days Trip",
      price: "₹ 26,000",
      tag: "Explorer",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=200&fit=crop"
    }
  ];

  // Statistics
  const statistics = [
    { number: "50K+", label: "Happy Travelers" },
    { number: "15+", label: "Years Of Experience" },
    { number: "200+", label: "Destinations" },
    { number: "4.9", label: "Overall Rating" }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Mumbai",
      rating: 5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor pofout incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud poloy lop exercitationLorem minim veniam, quis nostrud poloy lop exercitationLorem",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      comment: "Amazing experience with Bharat Bhraman! The guides were knowledgeable and all arrangements were perfect. Highly recommended for anyone looking for authentic Indian travel experiences.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Amit Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Excellent service and attention to detail. The Golden Triangle tour was perfectly organized with verified guides and safe accommodations throughout.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  // Photo gallery
  const photoGallery = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      title: "Himalayan Trek"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=300&fit=crop",
      title: "Backwater Journey"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=300&fit=crop",
      title: "Heritage Sites"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      title: "Mountain Adventure"
    }
  ];

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "What makes Bharat Bhraman different from other travel companies?",
      answer: "Bharat Bhraman focuses on verified, safe, and transparent travel experiences. All our guides are government-certified, restaurants are FSSAI-approved, and we provide 24/7 SOS support with real-time location tracking."
    },
    {
      id: 2,
      question: "Are all your tour guides certified?",
      answer: "Yes, all our tour guides carry valid government IDs and are certified by the respective state tourism boards. They undergo regular training and background verification for your safety and authentic experience."
    },
    {
      id: 3,
      question: "How do you ensure food safety during tours?",
      answer: "We partner only with FSSAI-certified restaurants and food outlets. Our team regularly monitors hygiene standards and we provide real-time hygiene ratings for all dining options."
    },
    {
      id: 4,
      question: "What is included in your SOS support service?",
      answer: "Our 24/7 SOS support includes emergency assistance, location tracking, direct police contact, medical emergency support, and immediate travel assistance in case of any unforeseen circumstances."
    }
  ];

  // Navigation items for navbar
  const navigationItems = [
    { name: 'HOME', href: '/' },
    { name: 'Destination', href: '/destinations' },
    { name: 'Service', href: '/services' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'CONTACT', href: '/contact' }
  ];

  // Navbar functions
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

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation functions
  const scrollDestinations = (direction) => {
    if (destinationsRef.current) {
      const scrollAmount = 320;
      destinationsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollTopDestinations = (direction) => {
    if (topDestinationsRef.current) {
      const scrollAmount = 450; // Match card width + gap
      topDestinationsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollPopularDestinations = (direction) => {
    if (popularDestinationsRef.current) {
      const scrollAmount = 320;
      popularDestinationsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const nextDestination = () => {
    setCurrentDestinationIndex((prev) => 
      prev >= topDestinations.length - 1 ? 0 : prev + 1
    );
  };

  const prevDestination = () => {
    setCurrentDestinationIndex((prev) => 
      prev <= 0 ? topDestinations.length - 1 : prev - 1
    );
  };

  // Cursor-based scrolling functions for top destinations
  const handleTopDestinationsMouseDown = (e) => {
    setIsScrolling(true);
    setScrollStartX(e.clientX);
    setScrollStartY(e.clientY);
    e.preventDefault();
  };

  const handleTopDestinationsMouseMove = (e) => {
    if (!isScrolling || !topDestinationsRef.current) return;
    
    const deltaX = e.clientX - scrollStartX;
    const deltaY = e.clientY - scrollStartY;
    
    // Only scroll horizontally if horizontal movement is greater
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const scrollAmount = deltaX * 2; // Increased sensitivity for better control
      topDestinationsRef.current.scrollLeft -= scrollAmount;
      setScrollStartX(e.clientX);
    }
  };

  const handleTopDestinationsMouseUp = () => {
    setIsScrolling(false);
  };

  const handleTopDestinationsMouseLeave = () => {
    setIsScrolling(false);
  };

  // Handle booking functionality
  const handleBookNow = (destination) => {
    if (!isAuthenticated) {
      // If user is not authenticated, redirect to login with return URL
      navigate('/login', { 
        state: { 
          from: '/booking',
          destination: destination
        }
      });
      return;
    }

    // If authenticated, navigate to booking page with destination data
    navigate('/booking', {
      state: {
        destination: {
          id: destination.id,
          name: destination.name,
          description: destination.description,
          price: destination.price,
          image: destination.image,
          type: 'destination'
        }
      }
    });
  };

  // Add event listeners for cursor scrolling
  useEffect(() => {
    if (isScrolling) {
      document.addEventListener('mousemove', handleTopDestinationsMouseMove);
      document.addEventListener('mouseup', handleTopDestinationsMouseUp);
      document.addEventListener('mouseleave', handleTopDestinationsMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleTopDestinationsMouseMove);
      document.removeEventListener('mouseup', handleTopDestinationsMouseUp);
      document.removeEventListener('mouseleave', handleTopDestinationsMouseLeave);
    };
  }, [isScrolling, scrollStartX, scrollStartY]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-black text-white'}`}>
      {/* Navbar */}
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden -mt-20">
        {/* Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("${heroDestinations[0].backgroundImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)'
          }}
        />
        
        {/* Green overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/60 to-transparent z-10" /> */}
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
          {/* Left Content */}
          <div className="flex-1 max-w-3xl lg:pr-30">
            <div className="text-8xl md:text-9xl font-bold text-white/20 mb-4">
              01
            </div>
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                NEVER STOP
                <br />
                <span className="text-green-400">EXPLORING BHARAT</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
                Discover the incredible diversity of India with verified guides, FSSAI-approved restaurants, and transparent pricing. From the majestic Himalayas to pristine beaches.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => navigate('/contact')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="bg-green-600/20 hover:bg-green-600/30 border border-green-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 hover:scale-105">
                <Play className="w-5 h-5" />
                <span>WATCH PROMO</span>
              </button>
            </div>
            
            {/* User Avatars and Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-3">
                {[1,2,3,4,5,6,7,8].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="text-2xl font-bold">4.9</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Video Thumbnails */}
          <div className="hidden lg:flex flex-col space-y-6 max-w-sm ml-4">
            {featuredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  index === currentVideoIndex ? 'scale-105 ring-4 ring-green-400' : 'hover:scale-102'
                }`}
                onClick={() => setCurrentVideoIndex(index)}
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 text-4xl font-bold text-white/50">
                  {destination.number}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">{destination.title}</h3>
                  <p className="text-gray-300 text-sm">{destination.subtitle}</p>
                </div>
                {destination.hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations Section */}
      <section className="py-20 bg-black">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Top Destinations
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover India's most breathtaking destinations with verified guides and authentic experiences. From heritage sites to natural wonders.
            </p>
          </div>
          
          {/* Full Display Scrollable Destinations */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => scrollTopDestinations('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-black/80 hover:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-2xl"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-7 h-7 text-white group-hover:text-green-400 transition-colors duration-300" />
            </button>
            
            <button
              onClick={() => scrollTopDestinations('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-black/80 hover:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-2xl"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-7 h-7 text-white group-hover:text-green-400 transition-colors duration-300" />
            </button>

            {/* Scroll indicator */}
            <div className="text-center mb-8">
              <p className="text-gray-400 text-sm">← Drag to scroll or use arrow buttons →</p>
            </div>
            
            <div 
              ref={topDestinationsRef}
              className={`flex gap-8 overflow-x-auto scrollbar-hide pb-6 ${
                isScrolling ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onMouseDown={handleTopDestinationsMouseDown}
              onMouseMove={handleTopDestinationsMouseMove}
              onMouseUp={handleTopDestinationsMouseUp}
              onMouseLeave={handleTopDestinationsMouseLeave}
              style={{ 
                userSelect: 'none',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {topDestinations.map((destination, index) => (
                <div
                  key={destination.id}
                  className="flex-shrink-0 w-96 lg:w-[450px] transition-all duration-200 hover:scale-105"
                >
                  <div className="relative h-[350px] lg:h-[500px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
                    {/* Background Image */}
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      draggable={false}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Hover Effect - Glow Outside */}
                    <div className="absolute -inset-6 bg-gradient-to-r from-green-400/30 via-green-500/30 to-green-400/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl -z-10" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      {/* Destination Info */}
                      <div className="text-white">
                        <h3 className="text-3xl lg:text-4xl font-bold mb-3 group-hover:text-green-400 transition-colors duration-300">
                          {destination.name}
                        </h3>
                        <p className="text-gray-200 mb-6 text-base lg:text-lg leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                          {destination.description}
                        </p>
                        
                        {/* Price and Button */}
                        <div className="flex items-center justify-between">
                          <span className="text-3xl lg:text-4xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                            {destination.price}
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookNow(destination);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-green-500/25 hover:shadow-2xl"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                      
                      {/* Additional Hover Elements */}
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">4.9</span>
                        </div>
                      </div>
                      
                      {/* Location Badge */}
                      <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
                          <MapPin className="w-5 h-5 text-green-400" />
                          <span className="text-white font-medium">India</span>
                        </div>
                      </div>
                      
                      {/* Destination Number */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                        <span className="text-8xl lg:text-9xl font-bold text-white">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Excursion Route Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-400 font-semibold text-lg tracking-wider uppercase">Featured Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-4">
              Premium Excursion Routes
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover India's most iconic destinations through carefully curated multi-day journeys with expert guides, luxury accommodations, and authentic cultural experiences.
            </p>
          </div>
          
          {/* Main Content Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-700/50">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* Left Content */}
              <div className="lg:col-span-3">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-sm">
                    {excursionRoute.day}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{excursionRoute.rating}</span>
                    <span className="text-gray-400">({excursionRoute.reviews} reviews)</span>
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {excursionRoute.title}
                </h3>
                
                <p className="text-green-400 text-lg font-semibold mb-6">
                  {excursionRoute.subtitle}
                </p>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {excursionRoute.description}
                </p>
                
                {/* Tour Highlights */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {excursionRoute.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
                
                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-green-400">{excursionRoute.price}</span>
                    <span className="text-gray-400 ml-2">per person</span>
                    <div className="text-sm text-gray-400">{excursionRoute.duration}</div>
                  </div>
                  <button 
                    onClick={() => handleBookNow({
                      id: 'golden-triangle',
                      name: excursionRoute.title,
                      description: excursionRoute.description,
                      price: excursionRoute.price,
                      image: excursionRoute.mainImage,
                      type: 'tour'
                    })}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
                  >
                    Book This Journey
                  </button>
                </div>
              </div>
              
              {/* Right Content - Enhanced Images */}
              <div className="lg:col-span-2">
                <div className="relative">
                  {/* Main Featured Image */}
                  <div className="relative rounded-2xl overflow-hidden mb-4 group">
                    <img
                      src={excursionRoute.mainImage}
                      alt={excursionRoute.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Main Destination
                      </span>
                    </div>
                  </div>
                  
                  {/* Gallery Images */}
                  <div className="grid grid-cols-3 gap-2">
                    {excursionRoute.galleryImages.map((item, index) => (
                      <div key={index} className="relative rounded-xl overflow-hidden group cursor-pointer">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-medium text-center px-2">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Itinerary Timeline */}
          <div className="mt-16">
            <h4 className="text-2xl font-bold text-white mb-8 text-center">7-Day Itinerary</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {excursionRoute.itinerary.map((day, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-800/70 rounded-xl p-4 min-w-[200px] transition-all duration-300 hover:bg-gray-700/70 ${
                    index === 1 ? 'ring-2 ring-green-400 bg-green-900/20' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 1 ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                    }`}>
                      {day.day}
                    </span>
                    <span className="text-green-400 font-semibold">{day.city}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{day.activity}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Tour Operators */}
          <div className="mt-16">
            <h4 className="text-2xl font-bold text-white mb-8 text-center">Trusted Tour Partners</h4>
            <div className="flex flex-wrap justify-center gap-6">
              {excursionRoute.tourOperators.map((operator, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-800/70 rounded-xl p-6 text-center transition-all duration-300 hover:bg-gray-700/70 hover:scale-105 min-w-[150px] ${
                    index === 2 ? 'ring-2 ring-green-400 bg-green-900/20' : ''
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 mx-auto ${
                    index === 2 ? 'bg-green-600' : 'bg-gray-700'
                  }`}>
                    {operator.logo}
                  </div>
                  <h5 className={`font-semibold mb-1 ${
                    index === 2 ? 'text-green-400' : 'text-white'
                  }`}>
                    {operator.name}
                  </h5>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-400 text-sm">{operator.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tour Price Includes Section */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Tour Price Includes</h3>
              <p className="text-gray-400 mb-6">
                Our comprehensive packages include everything you need for a hassle-free journey through incredible India.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {tourIncludes.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Category Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Destinations Category
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose your perfect Indian adventure from our carefully curated travel categories, each offering unique experiences and memories.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {destinationCategories.map((category) => (
              <div
                key={category.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/destinations?category=${category.name.toLowerCase().replace(' ', '-')}`)}
              >
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-green-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations For Your Trip Plans */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Popular Destinations For Your<br />Trip Plans
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover the most sought-after destinations in India, carefully selected based on traveler reviews and authentic experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <div
                key={destination.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/destination/${destination.name.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {destination.tag}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1">{destination.name}</h3>
                    <div className="flex items-center text-gray-300 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{destination.location}</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-400">{destination.price}</span>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.slice(0, 4).map((stat, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl ${
                  index === 1 ? 'bg-green-600' : 'bg-gray-800'
                }`}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Happy Trip Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
            <div>
              <div className="mb-6">
                <span className="text-green-400 font-semibold text-lg">Happy Trip</span>
                <div className="w-20 h-1 bg-green-400 mt-2 mb-4"></div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Experience the joy of authentic Indian travel with thousands of satisfied customers who have explored incredible destinations with complete safety and transparency. Join our community of happy travelers and create unforgettable memories across beautiful Bharat.
              </p>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop"
                alt="Happy travelers"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 relative">
        {/* Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              F.A.Q
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Find answers to commonly asked questions about traveling with Bharat Bhraman and our verified services.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? -1 : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-white font-semibold text-lg pr-8">
                    {faq.question}
                  </span>
                  <Plus
                    className={`w-6 h-6 text-white transition-transform duration-300 ${
                      activeFAQ === index ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                
                {activeFAQ === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default NewHomepage;
