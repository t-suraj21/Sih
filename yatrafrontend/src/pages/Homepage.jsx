import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Shield, Award, Leaf, Phone, Star, CheckCircle, ChevronLeft, ChevronRight, Camera, Mountain, Waves, TreePine, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Homepage = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    serviceType: 'hotel'
  });
  
  const scrollRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStartX, setScrollStartX] = useState(0);
  const [scrollLeftPosition, setScrollLeftPosition] = useState(0);
  
  // Hero images for rotation - memoized to prevent re-creation on every render
  const heroImages = useMemo(() => [
    {
      url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop',
      title: 'Taj Mahal, Delhi',
      description: 'The iconic symbol of love and architectural marvel'
    },
    {
      url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&h=1080&fit=crop',
      title: 'Lake Palace, Udaipur',
      description: 'Floating palace in the heart of Rajasthan'
    },
    {
      url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop',
      title: 'Goa Beaches',
      description: 'Pristine beaches and tropical paradise'
    },
    {
      url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&h=1080&fit=crop',
      title: 'Kerala Backwaters',
      description: 'Serene waterways and lush green landscapes'
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      title: 'Himalayan Mountains',
      description: 'Majestic peaks and adventure destinations'
    },
    {
      url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&h=1080&fit=crop',
      title: 'Jaipur Heritage',
      description: 'Pink City with royal palaces and forts'
    },
    {
      url: 'https://m.media-amazon.com/images/I/81LkCh5u4LL.jpg',
      title: 'Golden Temple',
      description: 'Historic monuments and cultural heritage'
    },
    {
      url: 'https://t4.ftcdn.net/jpg/06/31/02/21/360_F_631022109_PXYXdWEMMa494E6dwHC0GSTvqSeHc3My.jpg',
      title: 'Rajasthan Desert',
      description: 'Sand dunes and camel safaris'
    }
  ], []); // Empty dependency array since this data is static
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

 // Image rotation effect
 useEffect(() => {
 const interval = setInterval(() => {
 setCurrentImageIndex((prevIndex) => 
 (prevIndex + 1) % heroImages.length
 );
 }, 4000); // Change image every 4 seconds

 return () => clearInterval(interval);
 }, [heroImages]);

 const featuredDestinations = useMemo(() => [
 {
 id: 1,
 name: 'Jaipur',
 state: 'Rajasthan',
 region: 'North India',
 image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&h=350&fit=crop',
 description: 'Pink City with verified heritage guides and FSSAI-approved restaurants',
 highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal'],
 verifiedServices: 45,
 rating: 4.8,
 category: 'Heritage',
 icon: <Camera className="w-5 h-5" />,
 bestTime: 'Oct-Mar',
 startingPrice: '₹2,500'
 },
 {
 id: 2,
 name: 'Goa',
 state: 'Goa',
 region: 'West India',
 image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=350&fit=crop',
 description: 'Beach paradise with eco-certified resorts and verified water sports',
 highlights: ['Baga Beach', 'Old Goa Churches', 'Spice Plantations'],
 verifiedServices: 38,
 rating: 4.7,
 category: 'Beach',
 icon: <Waves className="w-5 h-5" />,
 bestTime: 'Nov-Feb',
 startingPrice: '₹3,200'
 },
 {
 id: 3,
 name: 'Agra',
 state: 'Uttar Pradesh',
 region: 'North India',
 image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=350&fit=crop',
 description: 'Home of Taj Mahal with government-certified guides and safe dining',
 highlights: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri'],
 verifiedServices: 52,
 rating: 4.9,
 category: 'Heritage',
 icon: <Camera className="w-5 h-5" />,
 bestTime: 'Oct-Mar',
 startingPrice: '₹2,800'
 },
 {
 id: 4,
 name: 'Kerala',
 state: 'Kerala',
 region: 'South India',
 image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=350&fit=crop',
 description: 'Gods Own Country with verified houseboats and organic food outlets',
 highlights: ['Backwaters', 'Hill Stations', 'Spice Gardens'],
 verifiedServices: 41,
 rating: 4.8,
 category: 'Nature',
 icon: <TreePine className="w-5 h-5" />,
 bestTime: 'Sep-Mar',
 startingPrice: '₹4,000'
 },
 {
 id: 5,
 name: 'Manali',
 state: 'Himachal Pradesh',
 region: 'North India',
 image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop',
 description: 'Himalayan paradise with adventure sports and certified mountain guides',
 highlights: ['Rohtang Pass', 'Solang Valley', 'Old Manali'],
 verifiedServices: 35,
 rating: 4.6,
 category: 'Adventure',
 icon: <Mountain className="w-5 h-5" />,
 bestTime: 'Mar-Jun',
 startingPrice: '₹3,500'
 },
 {
 id: 6,
 name: 'Udaipur',
 state: 'Rajasthan',
 region: 'North India',
 image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=350&fit=crop',
 description: 'City of Lakes with heritage hotels and royal dining experiences',
 highlights: ['City Palace', 'Lake Pichola', 'Jag Mandir'],
 verifiedServices: 42,
 rating: 4.8,
 category: 'Heritage',
 icon: <Camera className="w-5 h-5" />,
 bestTime: 'Sep-Mar',
 startingPrice: '₹3,800'
 },
 {
 id: 7,
 name: 'Rishikesh',
 state: 'Uttarakhand',
 region: 'North India',
 image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=350&fit=crop',
 description: 'Yoga capital with certified ashrams and adventure activities',
 highlights: ['Lakshman Jhula', 'River Rafting', 'Yoga Ashrams'],
 verifiedServices: 28,
 rating: 4.5,
 category: 'Spiritual',
 icon: <TreePine className="w-5 h-5" />,
 bestTime: 'Feb-May',
 startingPrice: '₹2,200'
 },
 {
 id: 8,
 name: 'Mysore',
 state: 'Karnataka',
 region: 'South India',
 image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=350&fit=crop',
 description: 'Cultural capital with verified palace tours and silk shopping',
 highlights: ['Mysore Palace', 'Chamundi Hills', 'Brindavan Gardens'],
 verifiedServices: 33,
 rating: 4.7,
 category: 'Heritage',
 icon: <Camera className="w-5 h-5" />,
 bestTime: 'Oct-Feb',
 startingPrice: '₹2,600'
 },
 {
 id: 9,
 name: 'Darjeeling',
 state: 'West Bengal',
 region: 'East India',
 image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=500&h=350&fit=crop',
 description: 'Queen of Hills with certified tea gardens and mountain railways',
 highlights: ['Tiger Hill', 'Tea Gardens', 'Toy Train'],
 verifiedServices: 25,
 rating: 4.4,
 category: 'Hill Station',
 icon: <Mountain className="w-5 h-5" />,
 bestTime: 'Mar-May',
 startingPrice: '₹2,900'
 },
 {
 id: 10,
 name: 'Hampi',
 state: 'Karnataka',
 region: 'South India',
 image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=500&h=350&fit=crop',
 description: 'UNESCO World Heritage site with archaeological wonders',
 highlights: ['Virupaksha Temple', 'Stone Chariot', 'Matanga Hill'],
 verifiedServices: 18,
 rating: 4.6,
 category: 'Heritage',
 icon: <Camera className="w-5 h-5" />,
 bestTime: 'Oct-Feb',
 startingPrice: '₹2,000'
 },
 {
 id: 11,
 name: 'Andaman Islands',
 state: 'Andaman & Nicobar',
 region: 'Islands',
 image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=350&fit=crop',
 description: 'Tropical paradise with pristine beaches and water sports',
 highlights: ['Radhanagar Beach', 'Cellular Jail', 'Scuba Diving'],
 verifiedServices: 22,
 rating: 4.8,
 category: 'Beach',
 icon: <Waves className="w-5 h-5" />,
 bestTime: 'Oct-May',
 startingPrice: '₹8,500'
 },
 {
 id: 12,
 name: 'Ladakh',
 state: 'Jammu & Kashmir',
 region: 'North India',
 image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=500&h=350&fit=crop',
 description: 'Land of high passes with monasteries and adventure trekking',
 highlights: ['Pangong Lake', 'Nubra Valley', 'Monasteries'],
 verifiedServices: 15,
 rating: 4.9,
 category: 'Adventure',
 icon: <Mountain className="w-5 h-5" />,
 bestTime: 'May-Sep',
 startingPrice: '₹12,000'
 }
 ], []); // Empty dependency array since this data is static

 const uspFeatures = useMemo(() => [
 {
 icon: <Shield className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />,
 title: 'Fraud-Free Bookings',
 description: 'Every service provider is government-verified with transparent pricing'
 },
 {
 icon: <Award className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />,
 title: 'Verified Guides & Hotels',
 description: 'All guides carry government IDs and hotels meet safety standards'
 },
 {
 icon: <CheckCircle className={`w-8 h-8 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />,
 title: 'Hygiene & Safety Ratings',
 description: 'FSSAI-certified restaurants with real-time hygiene monitoring'
 },
 {
 icon: <Phone className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} />,
 title: '24x7 SOS Support',
 description: 'Instant emergency assistance with location tracking and police contact'
 },
 {
 icon: <Leaf className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-500'}`} />,
 title: 'Eco-Friendly Travel',
 description: 'Sustainable tourism options with carbon footprint tracking'
 }
 ], [isDark]); // Added isDark dependency

 const testimonials = useMemo(() => [
 {
 id: 1,
 name: 'Sonu Yadav',
 location: 'Mumbai',
 rating: 5,
 comment: 'Amazing experience! The guide was verified and highly knowledgeable. Food recommendations were all FSSAI certified. Felt completely safe throughout the trip.',
 trip: 'Rajasthan Heritage Tour'
 },
 {
 id: 2,
 name: 'Vivek Singh',
 location: 'Delhi',
 rating: 5,
 comment: 'The SOS feature gave me confidence to explore remote areas. All hotels were exactly as described, with no hidden charges. Highly recommended!',
 trip: 'Kerala Backwater Experience'
 },
 {
 id: 3,
 name: 'Suraj Yadav',
 location: 'Ahmedabad',
 rating: 5,
 comment: 'Eco-tourism options were fantastic! Stayed at certified green hotels and supported local communities. The transparency was unmatched.',
 trip: 'Himachal Eco Adventure'
 }
], []); // Empty dependency array since this data is static

 const handleSearch = (e) => {
 e.preventDefault();
 // Redirect to appropriate page based on service type
 const params = new URLSearchParams(searchData);
 
 if (searchData.serviceType === 'hotel') {
 window.location.href = `/hotels?destination=${encodeURIComponent(searchData.destination)}&checkIn=${searchData.date}&guests=${1}&rooms=${1}`;
 } else {
 window.location.href = `/services?${params.toString()}`;
 }
 };

 const scrollLeft = () => {
 if (scrollRef.current) {
 scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
 }
 };

 const scrollRight = () => {
 if (scrollRef.current) {
 scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
 }
 };

 // Cursor-based scrolling functions
 const handleMouseDown = (e) => {
   setIsScrolling(true);
   setScrollStartX(e.pageX - scrollRef.current.offsetLeft);
   setScrollLeftPosition(scrollRef.current.scrollLeft);
   scrollRef.current.style.cursor = 'grabbing';
   scrollRef.current.style.userSelect = 'none';
 };

 const handleMouseLeave = () => {
   setIsScrolling(false);
   if (scrollRef.current) {
     scrollRef.current.style.cursor = 'grab';
     scrollRef.current.style.userSelect = 'auto';
   }
 };

 const handleMouseUp = () => {
   setIsScrolling(false);
   if (scrollRef.current) {
     scrollRef.current.style.cursor = 'grab';
     scrollRef.current.style.userSelect = 'auto';
   }
 };

 const handleMouseMove = (e) => {
   if (!isScrolling || !scrollRef.current) return;
   e.preventDefault();
   const x = e.pageX - scrollRef.current.offsetLeft;
   const walk = (x - scrollStartX) * 2; // Scroll speed multiplier
   scrollRef.current.scrollLeft = scrollLeftPosition - walk;
 };

  // Handle explore destination
  const handleExploreDestination = (destinationName) => {
    // Convert destination name to URL-friendly format
    const urlName = destinationName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/destination/${urlName}`);
  };

  // Handle view all destinations
  const handleViewAllDestinations = () => {
    navigate('/destinations');
  };

  // Handle other button actions
  const handlePlanTrip = () => {
    navigate('/destinations');
  };

  const handleExploreDestinationsButton = () => {
    navigate('/destinations');
  };

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleBrowseServices = () => {
    navigate('/services');
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Theme Toggle Button - Fixed Position */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isDark 
            ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' 
            : 'bg-gray-800 hover:bg-gray-700 text-white'
        }`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Hero Section */}
      <section className={`relative text-white overflow-hidden min-h-screen ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
          : 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900'
      }`}>
        {/* Rotating Background Images */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url("${image.url}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: isDark ? 'grayscale(30%) brightness(0.8) contrast(1.2)' : 'none'
              }}
            />
          ))}
        </div>
        
        {/* Dark overlay for better text readability */}
        <div className={`absolute inset-0 ${
          isDark ? 'bg-black opacity-50' : 'bg-black opacity-40'
        }`}></div>
        
        {/* Gradient overlay for better visual effect */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-800/80' 
            : 'bg-gradient-to-br from-blue-900/60 via-blue-800/40 to-indigo-900/60'
        }`}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            {/* Current Image Info */}
            <div className="mb-12">
              <div className={`inline-block backdrop-blur-sm rounded-full px-6 py-3 mb-6 ${
                isDark 
                  ? 'bg-gray-800/60 border border-gray-600' 
                  : 'bg-white/20'
              }`}>
                <h2 className={`text-2xl md:text-3xl font-bold ${
                  isDark ? 'text-gray-200' : 'text-white'
                }`}>
                  {heroImages[currentImageIndex].title}
                </h2>
                <p className={`text-lg mt-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-200'
                }`}>
                  {heroImages[currentImageIndex].description}
                </p>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              {isDark ? (
                <>
                  <span className="text-white">Safe, Verified, Transparent</span>
                  <span className="block text-gray-300">Travel in India</span>
                </>
              ) : (
                <>
                  Safe, Verified, Transparent
                  <span className="block text-green-400">Travel in India</span>
                </>
              )}
            </h1>
            <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto ${
              isDark ? 'text-gray-200' : 'text-gray-200'
            }`}>
              Plan your trip with verified guides, FSSAI-approved restaurants, and transparent pricing
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={handlePlanTrip}
                className={`px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Plan My Trip
              </button>
              <button 
                onClick={handleExploreDestinationsButton}
                className={`px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center border-2 ${
                  isDark
                    ? 'border-gray-400 hover:bg-gray-400 hover:text-gray-900 text-gray-300'
                    : 'border-white hover:bg-white hover:text-blue-900 text-white'
                }`}
              >
                Explore Destinations
              </button>
            </div>

 {/* Search Bar */}
 <div className={`max-w-4xl mx-auto rounded-2xl shadow-2xl p-6 ${
 isDark ? 'bg-gray-800' : 'bg-white'
 }`}>
 <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
 <div className="relative">
 <MapPin className={`absolute left-3 top-3 w-5 h-5 ${
 isDark ? 'text-gray-400' : 'text-gray-400'
 }`} />
 <input
 type="text"
 placeholder="Destination"
 value={searchData.destination}
 onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
 isDark 
 ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
 : 'border-gray-300 text-gray-900'
 }`}
 />
 </div>
 
 <div className="relative">
 <Calendar className={`absolute left-3 top-3 w-5 h-5 ${
 isDark ? 'text-gray-400' : 'text-gray-400'
 }`} />
 <input
 type="date"
 value={searchData.date}
 onChange={(e) => setSearchData({...searchData, date: e.target.value})}
 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
 isDark 
 ? 'border-gray-600 bg-gray-700 text-white' 
 : 'border-gray-300 text-gray-900'
 }`}
 />
 </div>
 
 <div className="relative">
 <Users className={`absolute left-3 top-3 w-5 h-5 ${
 isDark ? 'text-gray-400' : 'text-gray-400'
 }`} />
 <select
 value={searchData.serviceType}
 onChange={(e) => setSearchData({...searchData, serviceType: e.target.value})}
 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none ${
 isDark 
 ? 'border-gray-600 bg-gray-700 text-white' 
 : 'border-gray-300 text-gray-900'
 }`}
 >
 <option value="hotel">Hotels & Stays</option>
 <option value="guide">Guides</option>
 <option value="transport">Transport</option>
 <option value="food">Food</option>
 </select>
 </div>
 
 <button
 type="submit"
 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
 >
 <Search className="w-5 h-5" />
 <span>Search</span>
 </button>
 </form>
 </div>
 </div>
 
 {/* Image Indicators */}
 <div className="flex justify-center space-x-3 mt-8">
 {heroImages.map((_, index) => (
 <button
 key={index}
 onClick={() => setCurrentImageIndex(index)}
 className={`w-3 h-3 rounded-full transition-all duration-300 ${
 index === currentImageIndex 
 ? 'bg-white scale-125' 
 : isDark 
 ? 'bg-gray-500 hover:bg-gray-400'
 : 'bg-white/50 hover:bg-white/75'
 }`}
 aria-label={`Go to image ${index + 1}`}
 />
 ))}
 </div>
 </div>
 </section>

 {/* Featured Destinations */}
 <section className={`py-16 ${
 isDark 
 ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
 : 'bg-gradient-to-br from-gray-50 to-blue-50'
 }`}>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-12">
 <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
 isDark 
 ? 'bg-gray-700 text-gray-200' 
 : 'bg-blue-100 text-blue-800'
 }`}>
 <MapPin className="w-4 h-4 mr-2" />
 Discover India
 </div>
 <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
 isDark ? 'text-gray-100' : 'text-gray-900'
 }`}>
 Featured Destinations Across Bharat
 </h2>
 <p className={`text-xl max-w-3xl mx-auto ${
 isDark ? 'text-gray-200' : 'text-gray-600'
 }`}>
 From the snow-capped Himalayas to tropical beaches, explore India's diverse destinations with verified services and trusted local guides
 </p>
 </div>
 </div>
 
 {/* Full-width scrollable container */}
 <div className="relative w-full">
 {/* Navigation Buttons */}
 <button
 onClick={scrollLeft}
 className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border ${
 isDark 
 ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-600' 
 : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200'
 }`}
 aria-label="Scroll left"
 >
 <ChevronLeft className="w-6 h-6" />
 </button>
 
 <button
 onClick={scrollRight}
 className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border ${
 isDark 
 ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-600' 
 : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200'
 }`}
 aria-label="Scroll right"
 >
 <ChevronRight className="w-6 h-6" />
 </button>

          {/* Scrollable Container - Full width */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-16 cursor-grab select-none"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)'
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {featuredDestinations.map((destination) => (
              <div
                key={destination.id}
                className={`flex-shrink-0 w-80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleExploreDestination(destination.name);
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{
                      filter: isDark ? 'grayscale(20%) brightness(0.9) contrast(1.3)' : 'none'
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
                    isDark 
                      ? 'bg-gray-800/90 text-gray-200' 
                      : 'bg-white/90 text-gray-800'
                  }`}>
                    {destination.icon}
                    <span>{destination.category}</span>
                  </div>
                  
                  {/* Verified Badge */}
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified</span>
                  </div>

                  {/* Region Tag */}
                  <div className="absolute bottom-4 left-4 bg-blue-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {destination.region}
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${
                        isDark ? 'text-gray-100' : 'text-gray-900'
                      }`}>{destination.name}</h3>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-500'
                      }`}>{destination.state}</p>
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                      isDark ? 'bg-yellow-900/30' : 'bg-yellow-50'
                    }`}>
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className={`text-sm font-semibold ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}>{destination.rating}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className={`text-sm mb-4 line-clamp-2 ${
                    isDark ? 'text-gray-200' : 'text-gray-600'
                  }`}>{destination.description}</p>
                  
                  {/* Highlights */}
                  <div className="mb-4">
                    <p className={`text-xs mb-2 font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>TOP ATTRACTIONS</p>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-md text-xs font-medium ${
                            isDark 
                              ? 'bg-gray-600 text-gray-200' 
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Info Row */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center space-x-4">
                      <span className={`text-green-600 font-medium ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {destination.verifiedServices} Services
                      </span>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-500'}>
                        Best: {destination.bestTime}
                      </span>
                    </div>
                  </div>
                  
                  {/* Bottom Row */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs ${
                        isDark ? 'text-gray-300' : 'text-gray-500'
                      }`}>Starting from</p>
                      <p className={`text-lg font-bold ${
                        isDark ? 'text-gray-100' : 'text-gray-900'
                      }`}>{destination.startingPrice}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExploreDestination(destination.name);
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors inline-flex items-center space-x-1 hover:scale-105 transform duration-200 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mt-12">
            <button 
              onClick={handleViewAllDestinations}
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl space-x-2 hover:scale-105 transform"
            >
              <span>View All Destinations</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Why Choose Bharat Bhraman
            </h2>
            <p className={`text-xl ${
              isDark ? 'text-gray-200' : 'text-gray-600'
            }`}>
              Your safety and satisfaction is our priority
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uspFeatures.map((feature, index) => (
              <div key={index} className={`text-center p-6 rounded-xl transition-shadow ${
                isDark 
                  ? 'hover:shadow-lg hover:bg-gray-800' 
                  : 'hover:shadow-lg'
              }`}>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  isDark ? 'text-gray-100' : 'text-gray-900'
                }`}>{feature.title}</h3>
                <p className={isDark ? 'text-gray-200' : 'text-gray-600'}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-16 ${
        isDark ? 'bg-gray-800' : 'bg-blue-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>
              What Our Travelers Say
            </h2>
            <p className={`text-xl ${
              isDark ? 'text-gray-200' : 'text-gray-600'
            }`}>
              Real experiences from verified travelers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={`rounded-xl shadow-lg p-6 ${
                isDark ? 'bg-gray-700' : 'bg-white'
              }`}>
                <div className="flex items-center mb-4">
                  <div>
                    <h4 className={`font-bold ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>{testimonial.name}</h4>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-200' : 'text-gray-600'
                    }`}>{testimonial.location}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className={`mb-3 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>"{testimonial.comment}"</p>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>{testimonial.trip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 text-white ${
        isDark 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
          : 'bg-gradient-to-r from-blue-600 to-indigo-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? 'text-gray-100' : 'text-white'
          }`}>
            Ready to Start Your Safe Journey?
          </h2>
          <p className={`text-xl mb-8 ${
            isDark ? 'text-gray-200' : 'text-blue-100'
          }`}>
            Join thousands of travelers who trust us for their Indian adventures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className={`px-8 py-4 rounded-lg text-lg font-semibold transition-colors hover:scale-105 transform duration-200 ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Get Started Today
            </button>
            <button 
              onClick={handleBrowseServices}
              className={`px-8 py-4 rounded-lg text-lg font-semibold transition-colors border-2 hover:scale-105 transform duration-200 ${
                isDark
                  ? 'border-gray-400 hover:bg-gray-400 hover:text-gray-900 text-gray-300'
                  : 'border-white hover:bg-white hover:text-blue-600 text-white'
              }`}
            >
              Browse Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;