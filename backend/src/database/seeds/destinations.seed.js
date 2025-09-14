
import mongoose from 'mongoose';
import Destination from '../../models/Destination.js';

const realDestinationsData = [
  {
    name: "Jaipur",
    state: "Rajasthan",
    region: "North India",
    description: "The Pink City of India, Jaipur is a magnificent blend of ancient heritage and modern vibrancy. Known for its stunning palaces, colorful bazaars, and rich cultural heritage, Jaipur offers a royal experience with its majestic forts, intricate architecture, and warm hospitality.",
    shortDescription: "The Pink City with majestic palaces, forts, and vibrant bazaars offering a royal Rajasthani experience.",
    highlights: [
      "Amber Fort - Magnificent hilltop fortress with mirror work",
      "City Palace - Royal residence with museums and courtyards", 
      "Hawa Mahal - Iconic palace of winds with 953 windows",
      "Jantar Mantar - UNESCO World Heritage astronomical observatory",
      "Nahargarh Fort - Stunning views of the Pink City",
      "Jaigarh Fort - Home to the world's largest cannon"
    ],
    attractions: [
      {
        name: "Amber Fort",
        description: "Magnificent hilltop fortress showcasing Rajput architecture with intricate mirror work and stunning views.",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
        category: "Historical",
        timings: "8:00 AM - 6:00 PM",
        entryFee: "₹500 for foreigners, ₹50 for Indians",
        duration: "2-3 hours",
        rating: 4.8
      },
      {
        name: "City Palace",
        description: "Royal residence of the Maharaja with museums, courtyards, and stunning architecture.",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
        category: "Historical",
        timings: "9:30 AM - 5:00 PM",
        entryFee: "₹300 for adults, ₹200 for children",
        duration: "2-3 hours",
        rating: 4.6
      },
      {
        name: "Hawa Mahal",
        description: "Iconic five-story palace with 953 windows designed for royal women to observe street festivals.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        category: "Historical",
        timings: "9:00 AM - 4:30 PM",
        entryFee: "₹200 for foreigners, ₹50 for Indians",
        duration: "1 hour",
        rating: 4.4
      },
      {
        name: "Jantar Mantar",
        description: "UNESCO World Heritage astronomical observatory with 19 architectural instruments.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        category: "Historical",
        timings: "9:00 AM - 4:30 PM",
        entryFee: "₹200 for foreigners, ₹50 for Indians",
        duration: "1-2 hours",
        rating: 4.5
      }
    ],
    bestTimeToVisit: {
      months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      season: "Winter",
      description: "Best time to visit is from October to March when the weather is pleasant and cool."
    },
    weather: {
      summer: {
        temperature: { min: 25, max: 45 },
        description: "Hot and dry with temperatures reaching 45°C"
      },
      monsoon: {
        rainfall: "Moderate rainfall from July to September",
        description: "Pleasant with occasional showers"
      },
      winter: {
        temperature: { min: 8, max: 25 },
        description: "Cool and pleasant, ideal for sightseeing"
      }
    },
    howToReach: {
      byAir: {
        airport: "Jaipur International Airport (JAI)",
        distance: "13 km from city center",
        airlines: ["IndiGo", "SpiceJet", "Air India", "Vistara"]
      },
      byRail: {
        station: "Jaipur Junction Railway Station",
        distance: "2 km from city center",
        trains: ["Rajdhani Express", "Shatabdi Express", "Duronto Express"]
      },
      byRoad: {
        majorHighways: ["NH-48", "NH-52", "NH-21"],
        busServices: ["Rajasthan State Transport", "Private operators"]
      }
    },
    localTransport: {
      metro: { available: false, stations: [] },
      buses: { available: true, routes: ["City Bus Service", "AC Bus Service"] },
      taxis: { available: true, providers: ["Ola", "Uber", "Local Taxis"] },
      autoRickshaws: { available: true }
    },
    cuisine: [
      {
        name: "Rajasthani Thali",
        description: "Traditional multi-course meal with dal, curry, roti, and sweets",
        restaurants: [
          { name: "Chokhi Dhani", address: "Tonk Road", specialty: "Authentic Rajasthani", rating: 4.5 },
          { name: "Laxmi Misthan Bhandar", address: "Johari Bazaar", specialty: "Traditional sweets", rating: 4.3 }
        ]
      },
      {
        name: "Dal Baati Churma",
        description: "Signature Rajasthani dish with lentil curry, wheat balls, and sweet crumble",
        restaurants: [
          { name: "Rawat Misthan Bhandar", address: "Station Road", specialty: "Dal Baati", rating: 4.4 }
        ]
      }
    ],
    shopping: [
      {
        market: "Johari Bazaar",
        specialty: "Traditional jewelry and gems",
        location: "Pink City",
        timings: "10:00 AM - 8:00 PM"
      },
      {
        market: "Bapu Bazaar",
        specialty: "Textiles, handicrafts, and souvenirs",
        location: "Near City Palace",
        timings: "10:00 AM - 8:00 PM"
      },
      {
        market: "Tripolia Bazaar",
        specialty: "Brassware and lac bangles",
        location: "Old City",
        timings: "10:00 AM - 7:00 PM"
      }
    ],
    accommodation: {
      luxury: {
        count: 15,
        startingPrice: 25000,
        examples: ["Rambagh Palace", "The Oberoi Rajvilas", "Taj Rambagh Palace"]
      },
      midRange: {
        count: 45,
        startingPrice: 5000,
        examples: ["Hotel Pearl Palace", "Treebo Trend", "FabHotel"]
      },
      budget: {
        count: 78,
        startingPrice: 1500,
        examples: ["Zostel Jaipur", "Hotel Sweet Dream", "Backpacker Panda"]
      }
    },
    activities: [
      {
        name: "Elephant Ride at Amber Fort",
        category: "Cultural",
        description: "Traditional elephant ride to the top of Amber Fort",
        duration: "30 minutes",
        price: "₹900 per person",
        operator: "Amber Fort Authority"
      },
      {
        name: "Hot Air Balloon Ride",
        category: "Adventure",
        description: "Aerial view of the Pink City at sunrise",
        duration: "1 hour",
        price: "₹8,000 per person",
        operator: "Sky Waltz Balloon Adventures"
      },
      {
        name: "Cooking Class",
        category: "Cultural",
        description: "Learn to cook authentic Rajasthani dishes",
        duration: "3 hours",
        price: "₹2,500 per person",
        operator: "Spice Garden Cooking School"
      }
    ],
    festivals: [
      {
        name: "Jaipur Literature Festival",
        month: "January",
        description: "World's largest free literary festival",
        duration: "5 days"
      },
      {
        name: "Teej Festival",
        month: "August",
        description: "Traditional monsoon festival with processions and celebrations",
        duration: "3 days"
      },
      {
        name: "Gangaur Festival",
        month: "March-April",
        description: "Spring festival dedicated to Goddess Gauri",
        duration: "18 days"
      }
    ],
    tips: [
      {
        category: "Travel",
        tip: "Wear comfortable walking shoes as you'll be exploring many palaces and forts"
      },
      {
        category: "Food",
        tip: "Try the traditional Rajasthani thali for an authentic culinary experience"
      },
      {
        category: "Shopping",
        tip: "Bargain while shopping in bazaars - it's part of the local culture"
      },
      {
        category: "Safety",
        tip: "Keep your belongings secure while exploring crowded markets"
      },
      {
        category: "Culture",
        tip: "Respect local customs and dress modestly when visiting religious sites"
      }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&h=800&fit=crop",
        alt: "Amber Fort Jaipur",
        caption: "Magnificent Amber Fort overlooking the Pink City",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop",
        alt: "Hawa Mahal Jaipur",
        caption: "Iconic Palace of Winds with 953 windows",
        isPrimary: false
      },
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop",
        alt: "City Palace Jaipur",
        caption: "Royal residence with stunning architecture",
        isPrimary: false
      }
    ],
    coordinates: {
      latitude: 26.9124,
      longitude: 75.7873
    },
    tags: ["heritage", "palace", "fort", "rajasthani", "pink-city", "culture", "history", "royal"],
    isPopular: true,
    verified: true,
    statistics: {
      hotelsCount: 138,
      restaurantsCount: 245,
      attractionsCount: 12,
      averageRating: 4.7,
      visitorCount: 4500000
    }
  },
  {
    name: "Goa",
    state: "Goa",
    region: "West India",
    description: "India's beach paradise, Goa offers pristine beaches, Portuguese heritage, vibrant nightlife, and a laid-back atmosphere. From the bustling beaches of North Goa to the serene shores of South Goa, this coastal state provides the perfect blend of relaxation and adventure.",
    shortDescription: "Beach paradise with pristine coastlines, Portuguese heritage, and vibrant nightlife.",
    highlights: [
      "Calangute Beach - Queen of beaches with water sports",
      "Baga Beach - Popular for nightlife and water activities",
      "Anjuna Beach - Famous for flea markets and parties",
      "Old Goa - UNESCO World Heritage churches",
      "Dudhsagar Falls - Majestic four-tiered waterfall",
      "Fort Aguada - Historic Portuguese fort with lighthouse"
    ],
    attractions: [
      {
        name: "Calangute Beach",
        description: "Popular beach known as the 'Queen of Beaches' with water sports and beach shacks.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
        category: "Natural",
        timings: "All day",
        entryFee: "Free",
        duration: "Half day",
        rating: 4.3
      },
      {
        name: "Basilica of Bom Jesus",
        description: "UNESCO World Heritage church housing the mortal remains of St. Francis Xavier.",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        category: "Religious",
        timings: "9:00 AM - 6:30 PM",
        entryFee: "Free",
        duration: "1-2 hours",
        rating: 4.6
      },
      {
        name: "Dudhsagar Falls",
        description: "Majestic four-tiered waterfall surrounded by lush greenery and wildlife.",
        image: "https://images.unsplash.com/photo-1520637836862-4d197d17c60a?w=800&h=600&fit=crop",
        category: "Natural",
        timings: "7:00 AM - 5:00 PM",
        entryFee: "₹20 per person",
        duration: "3-4 hours",
        rating: 4.7
      }
    ],
    bestTimeToVisit: {
      months: ["Nov", "Dec", "Jan", "Feb", "Mar"],
      season: "Winter",
      description: "Best time is November to March with pleasant weather and clear skies."
    },
    weather: {
      summer: {
        temperature: { min: 25, max: 35 },
        description: "Hot and humid with sea breeze"
      },
      monsoon: {
        rainfall: "Heavy rainfall from June to September",
        description: "Lush green landscapes but limited beach activities"
      },
      winter: {
        temperature: { min: 20, max: 30 },
        description: "Perfect weather for beach activities and sightseeing"
      }
    },
    howToReach: {
      byAir: {
        airport: "Goa International Airport (GOI)",
        distance: "29 km from Panaji",
        airlines: ["IndiGo", "SpiceJet", "Air India", "Vistara"]
      },
      byRail: {
        station: "Madgaon Railway Station",
        distance: "35 km from Panaji",
        trains: ["Konkan Railway", "Mumbai-Goa Express", "Delhi-Goa Express"]
      },
      byRoad: {
        majorHighways: ["NH-66", "NH-4A"],
        busServices: ["Kadamba Transport", "Private operators"]
      }
    },
    localTransport: {
      metro: { available: false, stations: [] },
      buses: { available: true, routes: ["Kadamba Transport", "Private buses"] },
      taxis: { available: true, providers: ["Ola", "Uber", "Local taxis"] },
      autoRickshaws: { available: true }
    },
    cuisine: [
      {
        name: "Goan Fish Curry",
        description: "Spicy coconut-based curry with fresh fish",
        restaurants: [
          { name: "Martin's Corner", address: "Betim", specialty: "Goan cuisine", rating: 4.5 },
          { name: "Viva Panjim", address: "Fontainhas", specialty: "Traditional Goan", rating: 4.4 }
        ]
      },
      {
        name: "Bebinca",
        description: "Traditional Goan layered dessert",
        restaurants: [
          { name: "Confeitaria 31 de Janeiro", address: "Panaji", specialty: "Goan sweets", rating: 4.3 }
        ]
      }
    ],
    shopping: [
      {
        market: "Anjuna Flea Market",
        specialty: "Handicrafts, jewelry, and souvenirs",
        location: "Anjuna Beach",
        timings: "Wednesday 8:00 AM - 6:00 PM"
      },
      {
        market: "Mapusa Market",
        specialty: "Spices, cashews, and local products",
        location: "Mapusa",
        timings: "Friday 6:00 AM - 2:00 PM"
      }
    ],
    accommodation: {
      luxury: {
        count: 25,
        startingPrice: 15000,
        examples: ["The Leela Goa", "Taj Exotica", "Grand Hyatt Goa"]
      },
      midRange: {
        count: 89,
        startingPrice: 4000,
        examples: ["Hotel Fidalgo", "Treebo Trend", "FabHotel"]
      },
      budget: {
        count: 156,
        startingPrice: 1200,
        examples: ["Zostel Goa", "Backpacker Panda", "Hostelavie"]
      }
    },
    activities: [
      {
        name: "Water Sports at Baga Beach",
        category: "Adventure",
        description: "Parasailing, jet skiing, and banana boat rides",
        duration: "2-3 hours",
        price: "₹500-2000 per activity",
        operator: "Baga Beach Water Sports"
      },
      {
        name: "Spice Plantation Tour",
        category: "Nature",
        description: "Guided tour of spice plantations with traditional lunch",
        duration: "4-5 hours",
        price: "₹800 per person",
        operator: "Sahakari Spice Farm"
      },
      {
        name: "Dolphin Spotting",
        category: "Nature",
        description: "Boat ride to spot dolphins in their natural habitat",
        duration: "2 hours",
        price: "₹600 per person",
        operator: "Local boat operators"
      }
    ],
    festivals: [
      {
        name: "Carnival",
        month: "February",
        description: "Colorful parade with floats, music, and dancing",
        duration: "4 days"
      },
      {
        name: "Feast of St. Francis Xavier",
        month: "December",
        description: "Religious festival with processions and prayers",
        duration: "10 days"
      }
    ],
    tips: [
      {
        category: "Travel",
        tip: "Rent a two-wheeler for easy beach hopping and exploring"
      },
      {
        category: "Safety",
        tip: "Be cautious of strong currents while swimming in the sea"
      },
      {
        category: "Culture",
        tip: "Respect local customs and dress appropriately when visiting churches"
      }
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop",
        alt: "Goa Beach",
        caption: "Pristine beaches of Goa with golden sand and blue waters",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop",
        alt: "Basilica of Bom Jesus",
        caption: "UNESCO World Heritage church in Old Goa",
        isPrimary: false
      }
    ],
    coordinates: {
      latitude: 15.2993,
      longitude: 74.1240
    },
    tags: ["beach", "party", "portuguese", "heritage", "nightlife", "water-sports", "relaxation", "culture"],
    isPopular: true,
    verified: true,
    statistics: {
      hotelsCount: 270,
      restaurantsCount: 456,
      attractionsCount: 18,
      averageRating: 4.5,
      visitorCount: 8200000
    }
  }
];

export const seedDestinations = async () => {
  try {
    console.log('🌱 Seeding destinations data...');
    
    // Clear existing destinations
    await Destination.deleteMany({});
    
    // Add slugs to destinations data
    const destinationsWithSlugs = realDestinationsData.map(destination => ({
      ...destination,
      slug: destination.name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim()
    }));
    
    // Insert destinations data
    const createdDestinations = await Destination.insertMany(destinationsWithSlugs);
    
    console.log(`✅ Successfully seeded ${createdDestinations.length} destinations`);
    
    // Create indexes for better search performance
    await Destination.collection.createIndex({ name: 'text', description: 'text', state: 'text' });
    await Destination.collection.createIndex({ state: 1, region: 1, isActive: 1 });
    await Destination.collection.createIndex({ coordinates: '2dsphere' });
    await Destination.collection.createIndex({ tags: 1 });
    await Destination.collection.createIndex({ isPopular: 1, isActive: 1 });
    
    console.log('✅ Destination indexes created successfully');
    
    return createdDestinations;
  } catch (error) {
    console.error('❌ Error seeding destinations:', error);
    throw error;
  }
};

export default seedDestinations;
