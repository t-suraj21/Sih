import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Hotel, 
  Users, 
  Car, 
  Utensils, 
  Star, 
  CheckCircle, 
  Shield, 
  MapPin, 
  Clock, 
  Phone,
  Wifi,
  Coffee,
  Tv,
  Languages,
  Award,
  Leaf
} from 'lucide-react';

const Services = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'guides');
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    rating: '',
    sortBy: 'rating'
  });

  const tabs = [
    { id: 'guides', name: 'Guides & Coordinators', icon: <Users className="w-5 h-5" /> },
    { id: 'transport', name: 'Transport', icon: <Car className="w-5 h-5" /> },
    { id: 'food', name: 'Food Outlets', icon: <Utensils className="w-5 h-5" /> }
  ];

  // Mock data for different services
  const servicesData = {
    hotels: [
      {
        id: 1,
        name: 'Heritage Palace Hotel',
        location: 'Jaipur, Rajasthan',
        image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop',
        price: 3500,
        originalPrice: 4200,
        rating: 4.8,
        reviews: 324,
        hygieneRating: 9.2,
        verified: true,
        amenities: ['Free WiFi', 'AC', 'TV', 'Room Service', 'Pool'],
        description: 'Luxury heritage hotel with traditional Rajasthani architecture and modern amenities.',
        features: ['Government Verified', 'FSSAI Certified Restaurant', 'Eco-Friendly']
      },
      {
        id: 2,
        name: 'Beachside Resort',
        location: 'Goa',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
        price: 2800,
        originalPrice: 3200,
        rating: 4.6,
        reviews: 156,
        hygieneRating: 8.9,
        verified: true,
        amenities: ['Beach Access', 'Pool', 'Spa', 'Restaurant', 'Bar'],
        description: 'Beachfront resort with stunning ocean views and water sports facilities.',
        features: ['Eco-Certified', 'Safety Verified', 'Local Cuisine']
      },
      {
        id: 3,
        name: 'Mountain View Lodge',
        location: 'Manali, Himachal Pradesh',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
        price: 2200,
        originalPrice: 2600,
        rating: 4.7,
        reviews: 89,
        hygieneRating: 8.7,
        verified: true,
        amenities: ['Mountain View', 'Fireplace', 'Restaurant', 'Trekking Guide'],
        description: 'Cozy mountain lodge with panoramic views and adventure activities.',
        features: ['Adventure Sports', 'Organic Food', 'Local Guides']
      }
    ],
    guides: [
      {
        id: 1,
        name: 'Rajesh Kumar',
        location: 'Jaipur, Rajasthan',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        hourlyRate: 800,
        rating: 4.9,
        reviews: 127,
        languages: ['Hindi', 'English', 'Rajasthani'],
        experience: '8 years',
        verified: true,
        govtId: 'Verified',
        specialties: ['Heritage Tours', 'Cultural Experiences', 'Photography Tours'],
        description: 'Expert heritage guide with deep knowledge of Rajasthani culture and history.',
        certifications: ['Govt. Licensed', 'Tourism Board Certified', 'First Aid Trained']
      },
      {
        id: 2,
        name: 'Priya Menon',
        location: 'Kerala',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        hourlyRate: 600,
        rating: 4.8,
        reviews: 94,
        languages: ['Malayalam', 'English', 'Tamil'],
        experience: '5 years',
        verified: true,
        govtId: 'Verified',
        specialties: ['Backwater Tours', 'Ayurveda', 'Spice Plantation Tours'],
        description: 'Local expert specializing in Kerala backwaters and traditional experiences.',
        certifications: ['Kerala Tourism Certified', 'Ayurveda Guide', 'Boat License']
      },
      {
        id: 3,
        name: 'Arjun Singh',
        location: 'Manali, Himachal Pradesh',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        hourlyRate: 900,
        rating: 4.9,
        reviews: 156,
        languages: ['Hindi', 'English', 'Punjabi'],
        experience: '12 years',
        verified: true,
        govtId: 'Verified',
        specialties: ['Trekking', 'Mountain Climbing', 'Adventure Sports'],
        description: 'Professional adventure guide with extensive mountain experience.',
        certifications: ['Mountaineering Certified', 'Rescue Training', 'Wilderness First Aid']
      }
    ],
    transport: [
      {
        id: 1,
        name: 'Premium Taxi Service',
        location: 'Delhi NCR',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
        type: 'Sedan',
        pricePerKm: 12,
        rating: 4.7,
        reviews: 234,
        verified: true,
        driverVerified: true,
        features: ['GPS Tracking', 'Insurance Covered', 'AC', 'Music System'],
        description: 'Reliable taxi service with verified drivers and well-maintained vehicles.',
        services: ['Airport Transfer', 'City Tours', 'Outstation']
      },
      {
        id: 2,
        name: 'Luxury Bus Service',
        location: 'Mumbai - Goa',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
        type: 'Volvo Bus',
        pricePerSeat: 1200,
        rating: 4.5,
        reviews: 89,
        verified: true,
        driverVerified: true,
        features: ['Sleeper Seats', 'AC', 'Entertainment', 'Charging Points'],
        description: 'Comfortable overnight bus service with safety features and amenities.',
        services: ['Overnight Journey', 'Multiple Stops', 'Luggage Service']
      },
      {
        id: 3,
        name: 'Adventure Vehicle Rental',
        location: 'Leh, Ladakh',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop',
        type: 'SUV',
        pricePerDay: 3500,
        rating: 4.8,
        reviews: 67,
        verified: true,
        driverVerified: true,
        features: ['4WD', 'High Altitude Ready', 'Emergency Kit', 'Satellite Phone'],
        description: 'Specialized vehicles for high-altitude adventures with experienced drivers.',
        services: ['Self Drive', 'With Driver', 'Adventure Tours']
      }
    ],
    food: [
      {
        id: 1,
        name: 'Royal Rajasthani Restaurant',
        location: 'Jaipur, Rajasthan',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
        cuisine: 'Rajasthani',
        priceLevel: '₹₹',
        rating: 4.6,
        reviews: 445,
        hygieneRating: 9.1,
        fssaiCertified: true,
        verified: true,
        specialties: ['Dal Baati Churma', 'Laal Maas', 'Ghevar', 'Traditional Thali'],
        description: 'Authentic Rajasthani cuisine in a traditional setting with live folk music.',
        features: ['FSSAI Certified', 'Organic Ingredients', 'Traditional Recipes']
      },
      {
        id: 2,
        name: 'Coastal Spice Kitchen',
        location: 'Goa',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
        cuisine: 'Goan/Seafood',
        priceLevel: '₹₹₹',
        rating: 4.8,
        reviews: 267,
        hygieneRating: 9.4,
        fssaiCertified: true,
        verified: true,
        specialties: ['Fish Curry', 'Vindaloo', 'Bebinca', 'Fresh Seafood'],
        description: 'Fresh seafood and authentic Goan delicacies with ocean views.',
        features: ['Fresh Catch Daily', 'Beachside Dining', 'Sustainable Fishing']
      },
      {
        id: 3,
        name: 'Mountain Café',
        location: 'Manali, Himachal Pradesh',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
        cuisine: 'Multi-cuisine',
        priceLevel: '₹',
        rating: 4.4,
        reviews: 123,
        hygieneRating: 8.8,
        fssaiCertified: true,
        verified: true,
        specialties: ['Maggi', 'Momos', 'Hot Chocolate', 'Local Trout'],
        description: 'Cozy mountain café with comfort food and stunning valley views.',
        features: ['Mountain View', 'Local Ingredients', 'Vegetarian Options']
      }
    ]
  };

  const renderServiceCard = (service, type) => {
    switch (type) {
      case 'hotels':
        return (
          <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>Verified</span>
              </div>
              {service.originalPrice > service.price && (
                <div className="absolute bottom-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                  {Math.round((1 - service.price / service.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                  <p className="text-gray-600 flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {service.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{service.rating}</span>
                    <span className="text-xs text-gray-500">({service.reviews})</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">{service.description}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Utensils className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">Hygiene: {service.hygieneRating}/10</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {service.amenities.slice(0, 4).map((amenity, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="flex items-center space-x-2">
                    {service.originalPrice > service.price && (
                      <span className="text-gray-400 line-through text-sm">₹{service.originalPrice}</span>
                    )}
                    <span className="text-2xl font-bold text-green-600">₹{service.price}</span>
                    <span className="text-gray-600 text-sm">/night</span>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        );

      case 'guides':
        return (
          <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <img src={service.image} alt={service.name} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-xs text-gray-500">({service.reviews})</span>
                    </div>
                  </div>
                  <p className="text-gray-600 flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {service.location}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-green-600 font-medium flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      {service.govtId}
                    </span>
                    <span className="text-sm text-blue-600">{service.experience} experience</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">{service.description}</p>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Languages:</p>
                <div className="flex flex-wrap gap-1">
                  {service.languages.map((lang, index) => (
                    <span key={index} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs flex items-center">
                      <Languages className="w-3 h-3 mr-1" />
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {service.specialties.map((specialty, index) => (
                    <span key={index} className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold text-green-600">₹{service.hourlyRate}</span>
                  <span className="text-gray-600 text-sm">/hour</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Book Guide
                </button>
              </div>
            </div>
          </div>
        );

      case 'transport':
        return (
          <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>Verified</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                {service.type}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                  <p className="text-gray-600 flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {service.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{service.rating}</span>
                    <span className="text-xs text-gray-500">({service.reviews})</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">{service.description}</p>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {service.features.map((feature, index) => (
                    <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                <div className="flex flex-wrap gap-1">
                  {service.services.map((srv, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{service.pricePerKm || service.pricePerSeat || service.pricePerDay}
                  </span>
                  <span className="text-gray-600 text-sm">
                    /{service.pricePerKm ? 'km' : service.pricePerSeat ? 'seat' : 'day'}
                  </span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        );

      case 'food':
        return (
          <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
              <div className="absolute top-4 right-4 space-y-2">
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>FSSAI</span>
                </div>
                <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {service.priceLevel}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                  <p className="text-gray-600 flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {service.location}
                  </p>
                  <p className="text-blue-600 text-sm font-medium">{service.cuisine}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{service.rating}</span>
                    <span className="text-xs text-gray-500">({service.reviews})</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">{service.description}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Utensils className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">Hygiene: {service.hygieneRating}/10</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">FSSAI Certified</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {service.specialties.slice(0, 4).map((specialty, index) => (
                    <span key={index} className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Open Now</span>
                  </span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  View Menu
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verified Services</h1>
          <p className="text-gray-600">Discover trusted and verified service providers across India</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData[activeTab]?.map((service) => renderServiceCard(service, activeTab))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
