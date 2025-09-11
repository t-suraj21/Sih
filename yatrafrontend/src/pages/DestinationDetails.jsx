import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  CheckCircle, 
  Clock, 
  Users, 
  Camera, 
  Mountain, 
  Waves, 
  TreePine,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
  Heart,
  Share2,
  Navigation,
  Utensils,
  Bed,
  Car,
  UserCheck,
  Shield,
  Award,
  Leaf,
  ChevronRight,
  Play,
  Image as ImageIcon
} from 'lucide-react';
import BookingModal from '../components/BookingModal';

const DestinationDetails = () => {
  const { destinationName } = useParams();
  const [destination, setDestination] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Comprehensive destination data
  const destinationsData = {
    'Jaipur': {
      id: 1,
      name: 'Jaipur',
      state: 'Rajasthan',
      region: 'North India',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&h=600&fit=crop',
      description: 'The Pink City of India, Jaipur is a magnificent blend of ancient heritage and modern vibrancy. Known for its stunning palaces, colorful bazaars, and rich cultural heritage.',
      highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar', 'Nahargarh Fort'],
      verifiedServices: 45,
      rating: 4.8,
      category: 'Heritage',
      icon: <Camera className="w-5 h-5" />,
      bestTime: 'Oct-Mar',
      startingPrice: '₹2,500',
      duration: '3-5 days',
      bestFor: ['Heritage Tours', 'Shopping', 'Photography', 'Cultural Experience'],
      
      // Detailed Information
      overview: {
        description: 'Jaipur, the capital of Rajasthan, is a city that perfectly captures the essence of royal India. Founded in 1727 by Maharaja Sawai Jai Singh II, the city is known for its pink-colored buildings, magnificent palaces, and vibrant culture.',
        history: 'Jaipur was planned according to Indian Vastu Shastra by a Bengali architect, Vidyadhar Bhattacharya. The city was painted pink in 1876 to welcome the Prince of Wales, and the tradition continues today.',
        culture: 'The city is famous for its traditional crafts, including blue pottery, block printing, and jewelry making. Jaipur is also known for its delicious Rajasthani cuisine.',
        climate: 'Jaipur has a semi-arid climate with hot summers and mild winters. The best time to visit is from October to March when the weather is pleasant.'
      },

      attractions: [
        {
          id: 1,
          name: 'Amber Fort',
          image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop',
          description: 'A magnificent fort built with red sandstone and marble, offering stunning views of the city.',
          highlights: ['Sheesh Mahal', 'Diwan-e-Aam', 'Elephant Ride'],
          timings: '8:00 AM - 6:00 PM',
          entryFee: '₹500 (Indians), ₹1000 (Foreigners)',
          duration: '2-3 hours',
          rating: 4.9
        },
        {
          id: 2,
          name: 'City Palace',
          image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=300&fit=crop',
          description: 'A beautiful palace complex that houses museums, courtyards, and the royal residence.',
          highlights: ['Mubarak Mahal', 'Chandra Mahal', 'Armoury Museum'],
          timings: '9:30 AM - 5:00 PM',
          entryFee: '₹200 (Indians), ₹500 (Foreigners)',
          duration: '2-3 hours',
          rating: 4.7
        },
        {
          id: 3,
          name: 'Hawa Mahal',
          image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&h=300&fit=crop',
          description: 'The iconic Palace of Winds with 953 small windows, designed for royal women to observe street festivals.',
          highlights: ['953 Windows', 'Architectural Marvel', 'Street View'],
          timings: '9:00 AM - 4:30 PM',
          entryFee: '₹50 (Indians), ₹200 (Foreigners)',
          duration: '1 hour',
          rating: 4.5
        }
      ],

      services: {
        hotels: [
          {
            id: 1,
            name: 'Rambagh Palace',
            type: 'Luxury Heritage Hotel',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
            rating: 4.8,
            price: '₹25,000/night',
            amenities: ['Swimming Pool', 'Spa', 'Fine Dining', 'Concierge'],
            verified: true,
            location: 'Bhawani Singh Road',
            description: 'Former royal residence turned luxury hotel with opulent interiors and royal treatment.'
          },
          {
            id: 2,
            name: 'Hotel Pearl Palace',
            type: 'Boutique Hotel',
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop',
            rating: 4.6,
            price: '₹3,500/night',
            amenities: ['Restaurant', 'Rooftop', 'Air Conditioning', 'WiFi'],
            verified: true,
            location: 'Hari Kishan Somani Marg',
            description: 'Charming boutique hotel with traditional Rajasthani architecture and modern amenities.'
          }
        ],
        guides: [
          {
            id: 1,
            name: 'Rajesh Kumar',
            type: 'Certified Heritage Guide',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            rating: 4.9,
            price: '₹2,000/day',
            languages: ['Hindi', 'English'],
            experience: '15 years',
            verified: true,
            specialties: ['Heritage Tours', 'Photography Tours', 'Cultural Experiences']
          },
          {
            id: 2,
            name: 'Priya Sharma',
            type: 'Female Guide',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            rating: 4.8,
            price: '₹1,800/day',
            languages: ['Hindi', 'English', 'French'],
            experience: '8 years',
            verified: true,
            specialties: ['Women Travelers', 'Shopping Tours', 'Food Tours']
          }
        ],
        transport: [
          {
            id: 1,
            name: 'Royal Rajasthan Tours',
            type: 'Car Rental',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
            rating: 4.7,
            price: '₹3,000/day',
            vehicles: ['Sedan', 'SUV', 'Luxury Car'],
            verified: true,
            features: ['Driver Included', 'Fuel Included', 'AC', 'GPS']
          }
        ],
        food: [
          {
            id: 1,
            name: 'Laxmi Misthan Bhandar',
            type: 'Traditional Rajasthani',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
            rating: 4.6,
            price: '₹300-500/person',
            specialties: ['Dal Baati Churma', 'Ghewar', 'Kachori'],
            verified: true,
            fssaiCertified: true,
            location: 'Johari Bazaar'
          }
        ]
      }
    },
    'Goa': {
      id: 2,
      name: 'Goa',
      state: 'Goa',
      region: 'West India',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=600&fit=crop',
      description: 'India\'s beach paradise, Goa offers pristine beaches, vibrant nightlife, Portuguese heritage, and a laid-back lifestyle.',
      highlights: ['Baga Beach', 'Old Goa Churches', 'Spice Plantations', 'Anjuna Flea Market', 'Dudhsagar Falls'],
      verifiedServices: 38,
      rating: 4.7,
      category: 'Beach',
      icon: <Waves className="w-5 h-5" />,
      bestTime: 'Nov-Feb',
      startingPrice: '₹3,200',
      duration: '5-7 days',
      bestFor: ['Beach Holidays', 'Water Sports', 'Nightlife', 'Adventure'],
      
      overview: {
        description: 'Goa is India\'s smallest state but packs a punch with its beautiful beaches, Portuguese colonial architecture, and vibrant culture.',
        history: 'Goa was a Portuguese colony for over 450 years until 1961, which explains the strong Portuguese influence in architecture, cuisine, and culture.',
        culture: 'Goa has a unique blend of Indian and Portuguese cultures, evident in its festivals, music, dance, and cuisine.',
        climate: 'Goa has a tropical climate with hot and humid summers and pleasant winters. The monsoon season brings heavy rainfall.'
      },

      attractions: [
        {
          id: 1,
          name: 'Baga Beach',
          image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop',
          description: 'One of Goa\'s most popular beaches, known for its water sports and vibrant nightlife.',
          highlights: ['Water Sports', 'Beach Shacks', 'Nightlife'],
          timings: '24/7',
          entryFee: 'Free',
          duration: 'Half day',
          rating: 4.6
        },
        {
          id: 2,
          name: 'Basilica of Bom Jesus',
          image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop',
          description: 'A UNESCO World Heritage Site and one of Goa\'s most famous churches.',
          highlights: ['UNESCO Site', 'St. Francis Xavier', 'Baroque Architecture'],
          timings: '9:00 AM - 6:30 PM',
          entryFee: 'Free',
          duration: '1 hour',
          rating: 4.8
        }
      ],

      services: {
        hotels: [
          {
            id: 1,
            name: 'Taj Exotica Resort',
            type: 'Luxury Beach Resort',
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop',
            rating: 4.9,
            price: '₹18,000/night',
            amenities: ['Private Beach', 'Spa', 'Multiple Restaurants', 'Water Sports'],
            verified: true,
            location: 'Benaulim Beach',
            description: 'Luxurious beachfront resort with world-class amenities and stunning ocean views.'
          }
        ],
        guides: [
          {
            id: 1,
            name: 'Sunil Fernandes',
            type: 'Beach & Adventure Guide',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            rating: 4.8,
            price: '₹2,500/day',
            languages: ['English', 'Hindi', 'Konkani'],
            experience: '12 years',
            verified: true,
            specialties: ['Water Sports', 'Beach Tours', 'Adventure Activities']
          }
        ],
        transport: [
          {
            id: 1,
            name: 'Goa Car Rentals',
            type: 'Car & Bike Rental',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
            rating: 4.5,
            price: '₹1,500/day',
            vehicles: ['Scooter', 'Bike', 'Car'],
            verified: true,
            features: ['Self Drive', 'Helmet Included', 'Insurance']
          }
        ],
        food: [
          {
            id: 1,
            name: 'Martin\'s Corner',
            type: 'Goan Cuisine',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
            rating: 4.7,
            price: '₹800-1200/person',
            specialties: ['Fish Curry', 'Prawn Balchao', 'Bebinca'],
            verified: true,
            fssaiCertified: true,
            location: 'Betalbatim'
          }
        ]
      }
    },
    'Agra': {
      id: 3,
      name: 'Agra',
      state: 'Uttar Pradesh',
      region: 'North India',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=600&fit=crop',
      description: 'Home to the iconic Taj Mahal, Agra is a city steeped in Mughal history and architectural marvels.',
      highlights: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Itmad-ud-Daulah', 'Mehtab Bagh'],
      verifiedServices: 52,
      rating: 4.9,
      category: 'Heritage',
      icon: <Camera className="w-5 h-5" />,
      bestTime: 'Oct-Mar',
      startingPrice: '₹2,800',
      duration: '2-3 days',
      bestFor: ['Heritage Tours', 'Photography', 'Romantic Getaways', 'Historical Sites'],
      
      overview: {
        description: 'Agra, once the capital of the Mughal Empire, is home to some of the world\'s most magnificent monuments, including the UNESCO World Heritage Site, the Taj Mahal.',
        history: 'Agra was founded by Sikandar Lodi in 1504. It became the capital of the Mughal Empire under Akbar and remained so until Shah Jahan moved the capital to Delhi.',
        culture: 'The city reflects the rich Mughal culture with its architecture, cuisine, and traditions. Agra is famous for its marble inlay work and leather goods.',
        climate: 'Agra has a semi-arid climate with hot summers and cool winters. The best time to visit is from October to March.'
      },

      attractions: [
        {
          id: 1,
          name: 'Taj Mahal',
          image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop',
          description: 'The iconic white marble mausoleum, one of the Seven Wonders of the World.',
          highlights: ['Sunrise View', 'Moonlight Garden', 'Marble Inlay Work'],
          timings: '6:00 AM - 6:30 PM (Closed Fridays)',
          entryFee: '₹50 (Indians), ₹1100 (Foreigners)',
          duration: '2-3 hours',
          rating: 5.0
        },
        {
          id: 2,
          name: 'Agra Fort',
          image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=300&fit=crop',
          description: 'A massive red sandstone fort that served as the main residence of Mughal emperors.',
          highlights: ['Diwan-i-Aam', 'Diwan-i-Khas', 'Musamman Burj'],
          timings: '6:00 AM - 6:00 PM',
          entryFee: '₹30 (Indians), ₹550 (Foreigners)',
          duration: '2-3 hours',
          rating: 4.8
        }
      ],

      services: {
        hotels: [
          {
            id: 1,
            name: 'The Oberoi Amarvilas',
            type: 'Luxury Hotel',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
            rating: 4.9,
            price: '₹35,000/night',
            amenities: ['Taj View', 'Spa', 'Fine Dining', 'Concierge'],
            verified: true,
            location: 'Taj East Gate Road',
            description: 'Luxury hotel with stunning views of the Taj Mahal from every room.'
          }
        ],
        guides: [
          {
            id: 1,
            name: 'Mohammad Asif',
            type: 'Certified Heritage Guide',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            rating: 4.9,
            price: '₹2,500/day',
            languages: ['Hindi', 'English', 'Urdu'],
            experience: '20 years',
            verified: true,
            specialties: ['Taj Mahal Tours', 'Mughal History', 'Photography Tours']
          }
        ],
        transport: [
          {
            id: 1,
            name: 'Agra Heritage Tours',
            type: 'Car Rental',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
            rating: 4.6,
            price: '₹2,500/day',
            vehicles: ['Sedan', 'SUV', 'Luxury Car'],
            verified: true,
            features: ['Driver Included', 'Fuel Included', 'AC', 'Guide']
          }
        ],
        food: [
          {
            id: 1,
            name: 'Pinch Of Spice',
            type: 'Mughlai Cuisine',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
            rating: 4.7,
            price: '₹600-1000/person',
            specialties: ['Mughlai Biryani', 'Kebabs', 'Naan'],
            verified: true,
            fssaiCertified: true,
            location: 'Ground Floor, Hotel Clarks Shiraz'
          }
        ]
      }
    },
    'Kerala': {
      id: 4,
      name: 'Kerala',
      state: 'Kerala',
      region: 'South India',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&h=600&fit=crop',
      description: 'God\'s Own Country, Kerala is known for its backwaters, hill stations, beaches, and rich cultural heritage.',
      highlights: ['Backwaters', 'Hill Stations', 'Spice Gardens', 'Beaches', 'Wildlife Sanctuaries'],
      verifiedServices: 41,
      rating: 4.8,
      category: 'Nature',
      icon: <TreePine className="w-5 h-5" />,
      bestTime: 'Sep-Mar',
      startingPrice: '₹4,000',
      duration: '7-10 days',
      bestFor: ['Nature Tours', 'Backwater Cruises', 'Ayurveda', 'Wildlife'],
      
      overview: {
        description: 'Kerala, located on India\'s southwestern coast, is famous for its tropical backwaters, lush green landscapes, and unique culture.',
        history: 'Kerala has a rich history dating back to ancient times, with influences from various dynasties and colonial powers.',
        culture: 'Known for its classical dance forms like Kathakali, traditional martial arts like Kalaripayattu, and Ayurvedic medicine.',
        climate: 'Kerala has a tropical climate with heavy monsoon rains. The best time to visit is from September to March.'
      },

      attractions: [
        {
          id: 1,
          name: 'Alleppey Backwaters',
          image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=300&fit=crop',
          description: 'A network of canals, rivers, and lakes perfect for houseboat cruises.',
          highlights: ['Houseboat Stay', 'Village Tours', 'Bird Watching'],
          timings: '6:00 AM - 6:00 PM',
          entryFee: '₹500-2000/person',
          duration: '1-2 days',
          rating: 4.8
        },
        {
          id: 2,
          name: 'Munnar Hill Station',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
          description: 'Picturesque hill station famous for tea plantations and cool climate.',
          highlights: ['Tea Gardens', 'Eravikulam National Park', 'Mattupetty Dam'],
          timings: '6:00 AM - 6:00 PM',
          entryFee: '₹100-300/person',
          duration: '2-3 days',
          rating: 4.7
        }
      ],

      services: {
        hotels: [
          {
            id: 1,
            name: 'Taj Malabar Resort',
            type: 'Luxury Resort',
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop',
            rating: 4.8,
            price: '₹15,000/night',
            amenities: ['Backwater View', 'Ayurveda Spa', 'Restaurant', 'Pool'],
            verified: true,
            location: 'Cochin',
            description: 'Luxury resort overlooking the Arabian Sea and backwaters.'
          }
        ],
        guides: [
          {
            id: 1,
            name: 'Rajesh Nair',
            type: 'Nature & Backwater Guide',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            rating: 4.8,
            price: '₹2,000/day',
            languages: ['Malayalam', 'English', 'Hindi'],
            experience: '12 years',
            verified: true,
            specialties: ['Backwater Tours', 'Nature Walks', 'Wildlife Spotting']
          }
        ],
        transport: [
          {
            id: 1,
            name: 'Kerala Tourism Transport',
            type: 'Car & Boat Rental',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
            rating: 4.5,
            price: '₹2,000/day',
            vehicles: ['Car', 'Houseboat', 'Boat'],
            verified: true,
            features: ['Driver Included', 'Backwater Access', 'AC', 'Guide']
          }
        ],
        food: [
          {
            id: 1,
            name: 'Paragon Restaurant',
            type: 'Kerala Cuisine',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
            rating: 4.6,
            price: '₹400-800/person',
            specialties: ['Fish Curry', 'Appam', 'Kerala Sadya'],
            verified: true,
            fssaiCertified: true,
            location: 'Kochi'
          }
        ]
      }
    },
    'Manali': {
      id: 5,
      name: 'Manali',
      state: 'Himachal Pradesh',
      region: 'North India',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
      description: 'A picturesque hill station nestled in the Himalayas, famous for adventure sports and scenic beauty.',
      highlights: ['Rohtang Pass', 'Solang Valley', 'Old Manali', 'Hadimba Temple', 'Manu Temple'],
      verifiedServices: 35,
      rating: 4.6,
      category: 'Adventure',
      icon: <Mountain className="w-5 h-5" />,
      bestTime: 'Mar-Jun',
      startingPrice: '₹3,500',
      duration: '4-5 days',
      bestFor: ['Adventure Sports', 'Hiking', 'Skiing', 'Nature Photography'],
      
      overview: {
        description: 'Manali is a popular hill station in Himachal Pradesh, known for its snow-capped mountains, adventure activities, and pleasant climate.',
        history: 'Manali was named after the Hindu sage Manu. It has been a popular destination since the British colonial period.',
        culture: 'The town has a mix of Hindu and Buddhist cultures, with many temples and monasteries dotting the landscape.',
        climate: 'Manali has a cool climate throughout the year. Summers are pleasant, and winters can be quite cold with snowfall.'
      },

      attractions: [
        {
          id: 1,
          name: 'Rohtang Pass',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
          description: 'A high mountain pass offering breathtaking views and adventure activities.',
          highlights: ['Snow Activities', 'Scenic Views', 'Photography'],
          timings: '6:00 AM - 3:00 PM',
          entryFee: '₹550/person',
          duration: '1 day',
          rating: 4.7
        }
      ],

      services: {
        hotels: [
          {
            id: 1,
            name: 'The Himalayan Resort',
            type: 'Mountain Resort',
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop',
            rating: 4.6,
            price: '₹8,000/night',
            amenities: ['Mountain View', 'Spa', 'Restaurant', 'Adventure Desk'],
            verified: true,
            location: 'Old Manali',
            description: 'Luxury resort with stunning mountain views and adventure facilities.'
          }
        ],
        guides: [
          {
            id: 1,
            name: 'Himanshu Thakur',
            type: 'Adventure Guide',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            rating: 4.7,
            price: '₹2,500/day',
            languages: ['Hindi', 'English'],
            experience: '10 years',
            verified: true,
            specialties: ['Trekking', 'Adventure Sports', 'Mountain Tours']
          }
        ],
        transport: [
          {
            id: 1,
            name: 'Manali Adventure Tours',
            type: 'Car & Bike Rental',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
            rating: 4.4,
            price: '₹2,000/day',
            vehicles: ['Car', 'Bike', 'Scooter'],
            verified: true,
            features: ['Driver Optional', 'Mountain Routes', 'AC', 'Insurance']
          }
        ],
        food: [
          {
            id: 1,
            name: 'Casa Bella Vista',
            type: 'Multi-cuisine',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
            rating: 4.5,
            price: '₹500-1000/person',
            specialties: ['Himachali Cuisine', 'Italian', 'Continental'],
            verified: true,
            fssaiCertified: true,
            location: 'Old Manali'
          }
        ]
      }
    }
  };

  useEffect(() => {
    const dest = destinationsData[destinationName];
    if (dest) {
      setDestination(dest);
    }
  }, [destinationName]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <MapPin className="w-4 h-4" /> },
    { id: 'attractions', label: 'Attractions', icon: <Camera className="w-4 h-4" /> },
    { id: 'hotels', label: 'Hotels', icon: <Bed className="w-4 h-4" /> },
    { id: 'guides', label: 'Guides', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'transport', label: 'Transport', icon: <Car className="w-4 h-4" /> },
    { id: 'food', label: 'Food', icon: <Utensils className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        <div className="absolute top-4 left-4">
          <Link
            to="/"
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </div>

        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="flex items-center space-x-2 mb-2">
            {destination.icon}
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              {destination.category}
            </span>
            <div className="bg-green-600 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Verified</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{destination.name}</h1>
          <p className="text-xl mb-4">{destination.state}, {destination.region}</p>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold">{destination.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-5 h-5" />
              <span>{destination.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-5 h-5" />
              <span>Best: {destination.bestTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{destination.overview.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">History</h3>
                  <p className="text-gray-600">{destination.overview.history}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Culture</h3>
                  <p className="text-gray-600">{destination.overview.culture}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Climate & Best Time to Visit</h3>
                <p className="text-gray-600">{destination.overview.climate}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Perfect For</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.bestFor.map((item, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attractions' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Attractions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destination.attractions.map((attraction) => (
                  <div key={attraction.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{attraction.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{attraction.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{attraction.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{attraction.timings}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">Entry: {attraction.entryFee}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">Duration: {attraction.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hotels' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Verified Hotels & Stays</h2>
              {destination.services.hotels.map((hotel) => (
                <div key={hotel.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                          <p className="text-gray-600">{hotel.type}</p>
                          <p className="text-sm text-gray-500">{hotel.location}</p>
                        </div>
                        <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold">{hotel.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{hotel.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{hotel.price}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600 font-medium">Verified</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedService(hotel);
                            setIsBookingModalOpen(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'guides' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Certified Local Guides</h2>
              {destination.services.guides.map((guide) => (
                <div key={guide.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{guide.name}</h3>
                          <p className="text-gray-600">{guide.type}</p>
                        </div>
                        <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold">{guide.rating}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Languages:</span>
                          <p className="font-medium">{guide.languages.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Experience:</span>
                          <p className="font-medium">{guide.experience}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Price:</span>
                          <p className="font-medium">{guide.price}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-gray-500 text-sm">Specialties:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {guide.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">Verified Guide</span>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          Hire Guide
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'transport' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Transportation Services</h2>
              {destination.services.transport.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-gray-600">{service.type}</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{service.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500 text-sm">Available Vehicles:</span>
                      <p className="font-medium">{service.vehicles.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Price:</span>
                      <p className="font-medium">{service.price}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-gray-500 text-sm">Features:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {service.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Verified Service</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'food' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">FSSAI Certified Restaurants</h2>
              {destination.services.food.map((restaurant) => (
                <div key={restaurant.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
                          <p className="text-gray-600">{restaurant.type}</p>
                          <p className="text-sm text-gray-500">{restaurant.location}</p>
                        </div>
                        <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold">{restaurant.rating}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-gray-500 text-sm">Specialties:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {restaurant.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-orange-50 text-orange-700 px-2 py-1 rounded-md text-xs font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-900">{restaurant.price}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600 font-medium">FSSAI Certified</span>
                          </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                          View Menu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedService(null);
        }}
        service={selectedService}
        destination={destination}
      />
    </div>
  );
};

export default DestinationDetails;
