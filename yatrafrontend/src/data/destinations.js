// Destination data for the Yatra Tourism application
// This file contains comprehensive information about all featured destinations

export const destinationsData = {
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
    bestTime: 'Oct-Mar',
    startingPrice: '₹2,500',
    duration: '3-5 days',
    bestFor: ['Heritage Tours', 'Shopping', 'Photography', 'Cultural Experience'],
    
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
  }

  // Add more destinations as needed...
};

export default destinationsData;
