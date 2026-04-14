// Comprehensive Services Data for Indian States
// This includes Travel, Hotels, and Food services with price ranges

export const stateServices = {
  // Sample data structure - can be expanded for all states
  'Jammu & Kashmir': {
    travel: [
      {
        id: 1,
        name: 'Kashmir Valley Tour',
        type: 'Package Tour',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
        description: 'Complete Kashmir valley tour covering Srinagar, Gulmarg, Pahalgam, and Sonamarg',
        price: 15000,
        duration: '5 Days / 4 Nights',
        rating: 4.8,
        includes: ['Transportation', 'Guide', 'Sightseeing'],
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 2,
        name: 'Shikara Ride - Dal Lake',
        type: 'Water Activity',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
        description: 'Traditional Shikara boat ride on the beautiful Dal Lake',
        price: 500,
        duration: '1 Hour',
        rating: 4.9,
        includes: ['Boat Ride', 'Life Jacket'],
        verified: true,
        priceRange: 'Low'
      },
      {
        id: 3,
        name: 'Gulmarg Gondola Ride',
        type: 'Cable Car',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
        description: 'Asia\'s highest cable car ride with breathtaking mountain views',
        price: 1800,
        duration: '2-3 Hours',
        rating: 4.7,
        includes: ['Round Trip Cable Car', 'Mountain Views'],
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 4,
        name: 'Ladakh Bike Expedition',
        type: 'Adventure Tour',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
        description: 'Epic motorcycle journey through Ladakh\'s high mountain passes',
        price: 45000,
        duration: '10 Days / 9 Nights',
        rating: 4.9,
        includes: ['Bike Rental', 'Fuel', 'Accommodation', 'Guide'],
        verified: true,
        priceRange: 'High'
      }
    ],
    hotels: [
      {
        id: 1,
        name: 'The Lalit Grand Palace',
        type: 'Luxury Hotel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        description: 'Heritage luxury hotel with stunning Dal Lake views',
        price: 8500,
        rating: 4.8,
        amenities: ['WiFi', 'Restaurant', 'Spa', 'Lake View', 'Room Service'],
        location: 'Srinagar',
        verified: true,
        priceRange: 'High'
      },
      {
        id: 2,
        name: 'Houseboat Stay - Dal Lake',
        type: 'Houseboat',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        description: 'Traditional Kashmiri houseboat experience on Dal Lake',
        price: 3500,
        rating: 4.6,
        amenities: ['WiFi', 'Meals Included', 'Lake View', 'Traditional Decor'],
        location: 'Srinagar',
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 3,
        name: 'Hotel Pine Spring',
        type: 'Mid-Range Hotel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        description: 'Comfortable hotel in the heart of Gulmarg',
        price: 4500,
        rating: 4.4,
        amenities: ['WiFi', 'Restaurant', 'Heating', 'Mountain View'],
        location: 'Gulmarg',
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 4,
        name: 'Budget Inn Pahalgam',
        type: 'Budget Hotel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        description: 'Clean and affordable accommodation in Pahalgam',
        price: 1500,
        rating: 4.2,
        amenities: ['WiFi', 'Hot Water', 'Valley View'],
        location: 'Pahalgam',
        verified: true,
        priceRange: 'Low'
      }
    ],
    food: [
      {
        id: 1,
        name: 'Ahdoos Restaurant',
        type: 'Traditional Kashmiri',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        description: 'Authentic Kashmiri Wazwan and traditional cuisine',
        avgPrice: 800,
        rating: 4.7,
        specialties: ['Rogan Josh', 'Gushtaba', 'Yakhni', 'Kahwa'],
        location: 'Srinagar',
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 2,
        name: 'Mughal Darbar',
        type: 'Multi-Cuisine',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        description: 'Popular restaurant serving Kashmiri and North Indian food',
        avgPrice: 600,
        rating: 4.5,
        specialties: ['Mutton Rogan Josh', 'Chicken Tikka', 'Kashmiri Pulao'],
        location: 'Srinagar',
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 3,
        name: 'Shamyana Restaurant',
        type: 'Multi-Cuisine',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        description: 'Family restaurant with variety of cuisines',
        avgPrice: 400,
        rating: 4.3,
        specialties: ['Tandoori Items', 'Chinese', 'Continental'],
        location: 'Srinagar',
        verified: true,
        priceRange: 'Low'
      },
      {
        id: 4,
        name: 'Stream Restaurant',
        type: 'Fine Dining',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        description: 'Upscale dining with river views and international cuisine',
        avgPrice: 1500,
        rating: 4.8,
        specialties: ['Continental', 'Kashmiri', 'Seafood', 'Wine Selection'],
        location: 'Pahalgam',
        verified: true,
        priceRange: 'High'
      }
    ]
  },
  
  // Add more states with similar structure
  'Rajasthan': {
    travel: [
      {
        id: 1,
        name: 'Golden Triangle Tour',
        type: 'Heritage Tour',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&h=300&fit=crop',
        description: 'Complete Jaipur, Udaipur, and Jodhpur heritage circuit',
        price: 18000,
        duration: '7 Days / 6 Nights',
        rating: 4.9,
        includes: ['AC Transportation', 'Guide', 'Entry Tickets'],
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 2,
        name: 'Desert Safari - Jaisalmer',
        type: 'Adventure',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&h=300&fit=crop',
        description: 'Camel safari in Thar Desert with cultural evening',
        price: 2500,
        duration: '1 Day',
        rating: 4.7,
        includes: ['Camel Ride', 'Desert Camp', 'Dinner', 'Cultural Show'],
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 3,
        name: 'Jaipur City Tour',
        type: 'Sightseeing',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&h=300&fit=crop',
        description: 'Full day Pink City tour covering all major attractions',
        price: 1200,
        duration: '8 Hours',
        rating: 4.6,
        includes: ['Car', 'Driver', 'Entry Tickets'],
        verified: true,
        priceRange: 'Low'
      },
      {
        id: 4,
        name: 'Luxury Palace Tour',
        type: 'Premium Tour',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&h=300&fit=crop',
        description: 'Exclusive tour of Rajasthan\'s heritage palaces and forts',
        price: 55000,
        duration: '5 Days / 4 Nights',
        rating: 5.0,
        includes: ['Luxury Car', 'Palace Hotels', 'Private Guide', 'All Meals'],
        verified: true,
        priceRange: 'High'
      }
    ],
    hotels: [
      {
        id: 1,
        name: 'Taj Lake Palace',
        type: 'Heritage Luxury',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        description: 'Iconic palace hotel floating on Lake Pichola',
        price: 25000,
        rating: 5.0,
        amenities: ['WiFi', 'Spa', 'Pool', 'Fine Dining', 'Butler Service'],
        location: 'Udaipur',
        verified: true,
        priceRange: 'High'
      },
      {
        id: 2,
        name: 'Umaid Bhawan Palace',
        type: 'Palace Hotel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        description: 'World\'s 6th best hotel, royal palace experience',
        price: 35000,
        rating: 5.0,
        amenities: ['WiFi', 'Museum', 'Spa', 'Pool', 'Fine Dining'],
        location: 'Jodhpur',
        verified: true,
        priceRange: 'High'
      },
      {
        id: 3,
        name: 'Hotel Pearl Palace',
        type: 'Heritage Hotel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        description: 'Charming heritage hotel with rooftop restaurant',
        price: 3500,
        rating: 4.5,
        amenities: ['WiFi', 'Restaurant', 'Rooftop', 'Traditional Decor'],
        location: 'Jaipur',
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 4,
        name: 'Zostel Jaipur',
        type: 'Hostel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        description: 'Backpacker friendly hostel with vibrant atmosphere',
        price: 600,
        rating: 4.3,
        amenities: ['WiFi', 'Common Area', 'Cafe', 'Events'],
        location: 'Jaipur',
        verified: true,
        priceRange: 'Low'
      }
    ],
    food: [
      {
        id: 1,
        name: 'Chokhi Dhani',
        type: 'Rajasthani Thali',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        description: 'Traditional Rajasthani village resort with authentic cuisine',
        avgPrice: 1200,
        rating: 4.6,
        specialties: ['Dal Baati Churma', 'Gatte ki Sabzi', 'Ker Sangri'],
        location: 'Jaipur',
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 2,
        name: 'Laxmi Mishthan Bhandar (LMB)',
        type: 'Traditional Vegetarian',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        description: 'Iconic restaurant serving authentic Rajasthani food since 1954',
        avgPrice: 500,
        rating: 4.5,
        specialties: ['Rajasthani Thali', 'Sweets', 'Pyaaz Kachori'],
        location: 'Jaipur',
        verified: true,
        priceRange: 'Low'
      },
      {
        id: 3,
        name: '1135 AD',
        type: 'Fine Dining',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        description: 'Royal dining experience at Amber Fort',
        avgPrice: 2500,
        rating: 4.8,
        specialties: ['Royal Rajasthani', 'Continental', 'Mughlai'],
        location: 'Jaipur',
        verified: true,
        priceRange: 'High'
      },
      {
        id: 4,
        name: 'Rawat Mishthan Bhandar',
        type: 'Snacks & Sweets',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        description: 'Famous for pyaaz kachori and traditional sweets',
        avgPrice: 200,
        rating: 4.7,
        specialties: ['Pyaaz Kachori', 'Mirchi Vada', 'Ghewar'],
        location: 'Jaipur',
        verified: true,
        priceRange: 'Low'
      }
    ]
  }
};

// Helper function to get services for a state
export const getStateServices = (stateName) => {
  return stateServices[stateName] || generateDefaultServices(stateName);
};

// Generate default services for states without specific data
const generateDefaultServices = (stateName) => {
  return {
    travel: [
      {
        id: 1,
        name: `${stateName} Heritage Tour`,
        type: 'Cultural Tour',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop',
        description: `Explore the rich heritage and culture of ${stateName}`,
        price: 5000,
        duration: '3 Days / 2 Nights',
        rating: 4.5,
        includes: ['Transportation', 'Guide', 'Sightseeing'],
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 2,
        name: `${stateName} City Tour`,
        type: 'Sightseeing',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop',
        description: `Full day city tour covering major attractions`,
        price: 1500,
        duration: '1 Day',
        rating: 4.3,
        includes: ['Car', 'Driver', 'Entry Tickets'],
        verified: true,
        priceRange: 'Low'
      }
    ],
    hotels: [
      {
        id: 1,
        name: `${stateName} Grand Hotel`,
        type: 'Luxury Hotel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        description: 'Premium accommodation with world-class amenities',
        price: 6000,
        rating: 4.6,
        amenities: ['WiFi', 'Restaurant', 'Spa', 'Pool', 'Gym'],
        location: stateName,
        verified: true,
        priceRange: 'High'
      },
      {
        id: 2,
        name: `${stateName} Comfort Inn`,
        type: 'Mid-Range Hotel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        description: 'Comfortable stay with modern amenities',
        price: 2500,
        rating: 4.2,
        amenities: ['WiFi', 'Restaurant', 'Room Service'],
        location: stateName,
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 3,
        name: `${stateName} Budget Stay`,
        type: 'Budget Hotel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
        description: 'Clean and affordable accommodation',
        price: 1000,
        rating: 4.0,
        amenities: ['WiFi', 'Hot Water', 'TV'],
        location: stateName,
        verified: true,
        priceRange: 'Low'
      }
    ],
    food: [
      {
        id: 1,
        name: `${stateName} Traditional Restaurant`,
        type: 'Local Cuisine',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        description: 'Authentic local cuisine and specialties',
        avgPrice: 600,
        rating: 4.4,
        specialties: ['Local Dishes', 'Traditional Thali', 'Regional Specialties'],
        location: stateName,
        verified: true,
        priceRange: 'Medium'
      },
      {
        id: 2,
        name: `${stateName} Multi-Cuisine`,
        type: 'Multi-Cuisine',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        description: 'Variety of Indian and international cuisines',
        avgPrice: 400,
        rating: 4.2,
        specialties: ['North Indian', 'Chinese', 'Continental'],
        location: stateName,
        verified: true,
        priceRange: 'Low'
      }
    ]
  };
};

export default stateServices;

