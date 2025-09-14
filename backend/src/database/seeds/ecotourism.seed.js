import EcoTourism from '../../models/EcoTourism.js';
import { connectMongoDB } from '../../config/database.js';

const ecoTourismData = [
  {
    name: "Kerala Backwater Eco Resort",
    slug: "kerala-backwater-eco-resort",
    type: "Accommodation",
    category: "Sustainable Accommodation",
    description: "Experience sustainable luxury at our eco-friendly resort nestled in the serene backwaters of Kerala. Our resort operates on 100% renewable energy, uses organic farming practices, and supports local communities through various initiatives.",
    shortDescription: "Luxury eco-resort in Kerala backwaters with 100% renewable energy and organic farming.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
        alt: "Kerala backwater resort",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        alt: "Eco-friendly accommodation"
      }
    ],
    location: {
      city: "Alleppey",
      state: "Kerala",
      region: "South India",
      coordinates: {
        latitude: 9.4981,
        longitude: 76.3388
      },
      address: "Backwater Road, Alleppey, Kerala 688001"
    },
    pricing: {
      basePrice: 8500,
      priceUnit: "per night",
      currency: "INR",
      inclusions: ["Breakfast", "Boat ride", "Organic meals", "Nature walks"],
      exclusions: ["Transportation", "Personal expenses"]
    },
    operator: {
      name: "Kerala Eco Resorts",
      contact: {
        email: "info@keralaecoResorts.com",
        phone: "+91-477-2234567",
        website: "www.keralaecoResorts.com"
      },
      certifications: ["Eco Tourism Certified", "Green Hotel Award"],
      experience: "15 years",
      rating: 4.8
    },
    sustainability: {
      ecoRating: 4.8,
      carbonFootprint: "Very Low",
      ecoFeatures: [
        { feature: "Solar Power", description: "100% solar energy powered resort" },
        { feature: "Organic Garden", description: "Own organic vegetable and herb garden" },
        { feature: "Waste Management", description: "Zero-waste policy with composting" },
        { feature: "Water Conservation", description: "Rainwater harvesting and recycling" }
      ],
      certifications: [
        { name: "Green Certification", issuedBy: "Kerala Tourism", validUntil: new Date('2025-12-31') },
        { name: "Eco-Tourism Award", issuedBy: "India Tourism", validUntil: new Date('2025-06-30') }
      ],
      conservationImpact: {
        treesPlanted: 150,
        co2Reduced: 2500,
        waterConserved: 50000,
        communitiesSupported: 3
      }
    },
    duration: {
      recommended: "2-3 nights",
      minimum: "1 night",
      maximum: "7 nights"
    },
    ratings: {
      overall: 4.7,
      sustainability: 4.9,
      service: 4.6,
      value: 4.5,
      totalReviews: 89
    },
    featured: true,
    verified: true,
    isActive: true,
    rewards: {
      ecoPointsEarned: 150,
      carbonOffsetCredits: 25
    }
  },
  {
    name: "Himalayan Wildlife Conservation Trek",
    slug: "himalayan-wildlife-conservation-trek",
    type: "Activity",
    category: "Wildlife Conservation",
    description: "Join our guided conservation trek in the Himalayas where you'll participate in wildlife monitoring, tree plantation, and community education programs. This trek combines adventure with meaningful conservation work.",
    shortDescription: "Conservation trek in Himalayas with wildlife monitoring and tree plantation activities.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        alt: "Himalayan trek",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
        alt: "Wildlife conservation"
      }
    ],
    location: {
      city: "Manali",
      state: "Himachal Pradesh",
      region: "North India",
      coordinates: {
        latitude: 32.2432,
        longitude: 77.1892
      },
      address: "Manali, Himachal Pradesh 175131"
    },
    pricing: {
      basePrice: 12500,
      priceUnit: "per person",
      currency: "INR",
      inclusions: ["Guide", "Equipment", "Meals", "Accommodation", "Conservation activities"],
      exclusions: ["Transportation to base", "Personal gear", "Insurance"]
    },
    operator: {
      name: "Himalayan Conservation Treks",
      contact: {
        email: "info@himalayantreks.com",
        phone: "+91-1902-253456",
        website: "www.himalayantreks.com"
      },
      certifications: ["Wildlife Conservation Certified", "Adventure Tourism License"],
      experience: "12 years",
      rating: 4.9
    },
    sustainability: {
      ecoRating: 4.9,
      carbonFootprint: "Low",
      ecoFeatures: [
        { feature: "Wildlife Monitoring", description: "Participate in leopard and bear monitoring" },
        { feature: "Tree Plantation", description: "Plant native Himalayan species" },
        { feature: "Community Support", description: "Support local conservation efforts" },
        { feature: "Leave No Trace", description: "Follow strict environmental guidelines" }
      ],
      certifications: [
        { name: "Wildlife Conservation Permit", issuedBy: "Himachal Forest Dept", validUntil: new Date('2025-12-31') }
      ],
      conservationImpact: {
        treesPlanted: 500,
        co2Reduced: 1200,
        wildlifeProtected: 15,
        communitiesSupported: 5
      }
    },
    duration: {
      recommended: "7 days",
      minimum: "5 days",
      maximum: "10 days"
    },
    ratings: {
      overall: 4.8,
      sustainability: 5.0,
      adventure: 4.9,
      education: 4.7,
      totalReviews: 67
    },
    featured: true,
    verified: true,
    isActive: true,
    rewards: {
      ecoPointsEarned: 250,
      carbonOffsetCredits: 50
    }
  },
  {
    name: "Rajasthan Desert Solar Farm Tour",
    slug: "rajasthan-desert-solar-farm-tour",
    type: "Tour",
    category: "Carbon Neutral Travel",
    description: "Explore India's largest solar installations in the Thar Desert while learning about renewable energy and desert conservation. This educational tour showcases how technology can work with nature for sustainable development.",
    shortDescription: "Educational tour of solar farms in Thar Desert with renewable energy learning experience.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
        alt: "Solar farm in desert",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop",
        alt: "Desert landscape"
      }
    ],
    location: {
      city: "Jodhpur",
      state: "Rajasthan",
      region: "North India",
      coordinates: {
        latitude: 26.2389,
        longitude: 73.0243
      },
      address: "Thar Desert, Jodhpur, Rajasthan 342001"
    },
    pricing: {
      basePrice: 4500,
      priceUnit: "per person",
      currency: "INR",
      inclusions: ["Transport", "Guide", "Lunch", "Solar farm entry", "Educational materials"],
      exclusions: ["Accommodation", "Personal expenses"]
    },
    operator: {
      name: "Rajasthan Solar Tours",
      contact: {
        email: "info@rajasthansolar.com",
        phone: "+91-291-2567890",
        website: "www.rajasthansolar.com"
      },
      certifications: ["Green Tourism Certified", "Educational Tour License"],
      experience: "8 years",
      rating: 4.5
    },
    sustainability: {
      ecoRating: 4.6,
      carbonFootprint: "Very Low",
      ecoFeatures: [
        { feature: "Electric Transport", description: "Electric vehicles for desert travel" },
        { feature: "Solar Education", description: "Learn about renewable energy" },
        { feature: "Desert Conservation", description: "Support desert ecosystem preservation" },
        { feature: "Carbon Neutral", description: "100% carbon offset tour" }
      ],
      certifications: [
        { name: "Carbon Neutral Certification", issuedBy: "Green Council India", validUntil: new Date('2025-12-31') }
      ],
      conservationImpact: {
        co2Reduced: 800,
        renewableEnergySupported: 1000,
        educationReach: 50
      }
    },
    duration: {
      recommended: "1 day",
      minimum: "Half day",
      maximum: "2 days"
    },
    ratings: {
      overall: 4.5,
      sustainability: 4.8,
      education: 4.7,
      experience: 4.3,
      totalReviews: 134
    },
    featured: false,
    verified: true,
    isActive: true,
    rewards: {
      ecoPointsEarned: 80,
      carbonOffsetCredits: 15
    }
  },
  {
    name: "Organic Farm Stay Experience",
    slug: "organic-farm-stay-experience",
    type: "Accommodation",
    category: "Organic Farming",
    description: "Live and work on a certified organic farm in Punjab, learning sustainable farming practices while enjoying fresh, farm-to-table meals. Participate in daily farming activities and understand the importance of organic agriculture.",
    shortDescription: "Hands-on organic farming experience with farm-to-table meals in Punjab countryside.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
        alt: "Organic farm",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
        alt: "Farm activities"
      }
    ],
    location: {
      city: "Amritsar",
      state: "Punjab",
      region: "North India",
      coordinates: {
        latitude: 31.6340,
        longitude: 74.8723
      },
      address: "Organic Valley Farm, Amritsar, Punjab 143001"
    },
    pricing: {
      basePrice: 3500,
      priceUnit: "per night",
      currency: "INR",
      inclusions: ["Accommodation", "All organic meals", "Farm activities", "Cooking classes"],
      exclusions: ["Transportation", "Personal expenses"]
    },
    operator: {
      name: "Punjab Organic Farms",
      contact: {
        email: "info@punjaborganic.com",
        phone: "+91-183-2456789",
        website: "www.punjaborganic.com"
      },
      certifications: ["Organic Certified", "Farm Tourism License"],
      experience: "10 years",
      rating: 4.6
    },
    sustainability: {
      ecoRating: 4.7,
      carbonFootprint: "Low",
      ecoFeatures: [
        { feature: "Certified Organic", description: "100% certified organic farming" },
        { feature: "Zero Chemicals", description: "No pesticides or synthetic fertilizers" },
        { feature: "Biodiversity", description: "Support for native plant varieties" },
        { feature: "Soil Health", description: "Regenerative farming practices" }
      ],
      certifications: [
        { name: "Organic Certification", issuedBy: "APEDA", validUntil: new Date('2025-12-31') },
        { name: "Fair Trade Certified", issuedBy: "Fair Trade India", validUntil: new Date('2025-08-31') }
      ],
      conservationImpact: {
        soilRestored: 100,
        biodiversitySupported: 25,
        chemicalsFree: 50,
        communitiesSupported: 2
      }
    },
    duration: {
      recommended: "3-4 nights",
      minimum: "2 nights",
      maximum: "14 nights"
    },
    ratings: {
      overall: 4.6,
      sustainability: 4.8,
      experience: 4.5,
      food: 4.9,
      totalReviews: 76
    },
    featured: true,
    verified: true,
    isActive: true,
    rewards: {
      ecoPointsEarned: 120,
      carbonOffsetCredits: 20
    }
  },
  {
    name: "Goa Coastal Cleanup & Marine Conservation",
    slug: "goa-coastal-cleanup-marine-conservation",
    type: "Activity",
    category: "Wildlife Conservation",
    description: "Join our marine conservation program in Goa, participating in beach cleanups, turtle conservation, and coral restoration activities. Learn about marine ecosystems while making a direct positive impact on ocean health.",
    shortDescription: "Marine conservation program in Goa with beach cleanup and turtle protection activities.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
        alt: "Beach cleanup",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop",
        alt: "Marine conservation"
      }
    ],
    location: {
      city: "Goa",
      state: "Goa",
      region: "West India",
      coordinates: {
        latitude: 15.2993,
        longitude: 74.1240
      },
      address: "Coastal Conservation Center, Goa 403001"
    },
    pricing: {
      basePrice: 2500,
      priceUnit: "per person",
      currency: "INR",
      inclusions: ["Equipment", "Guide", "Lunch", "Conservation activities", "Certificate"],
      exclusions: ["Accommodation", "Transportation", "Personal expenses"]
    },
    operator: {
      name: "Goa Marine Conservation",
      contact: {
        email: "info@goamarine.org",
        phone: "+91-832-2345678",
        website: "www.goamarine.org"
      },
      certifications: ["Marine Conservation License", "Environmental Award"],
      experience: "7 years",
      rating: 4.7
    },
    sustainability: {
      ecoRating: 4.8,
      carbonFootprint: "Very Low",
      ecoFeatures: [
        { feature: "Beach Cleanup", description: "Remove plastic and debris from beaches" },
        { feature: "Turtle Conservation", description: "Protect nesting sites and hatchlings" },
        { feature: "Coral Restoration", description: "Participate in coral planting activities" },
        { feature: "Education", description: "Learn about marine ecosystem protection" }
      ],
      certifications: [
        { name: "Marine Conservation Permit", issuedBy: "Goa Forest Dept", validUntil: new Date('2025-12-31') }
      ],
      conservationImpact: {
        wasteRemoved: 200,
        marineLifeProtected: 50,
        coastlineRestored: 5,
        volunteersEducated: 100
      }
    },
    duration: {
      recommended: "1 day",
      minimum: "Half day",
      maximum: "3 days"
    },
    ratings: {
      overall: 4.7,
      sustainability: 4.9,
      impact: 4.8,
      education: 4.6,
      totalReviews: 156
    },
    featured: false,
    verified: true,
    isActive: true,
    rewards: {
      ecoPointsEarned: 100,
      carbonOffsetCredits: 10
    }
  },
  {
    name: "Sustainable Village Tourism - Meghalaya",
    slug: "sustainable-village-tourism-meghalaya",
    type: "Destination",
    category: "Community Tourism",
    description: "Experience authentic village life in Meghalaya while supporting local communities through responsible tourism. Stay with local families, learn traditional crafts, and participate in sustainable development projects.",
    shortDescription: "Authentic village tourism experience in Meghalaya supporting local communities and traditions.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        alt: "Meghalaya village",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        alt: "Traditional crafts"
      }
    ],
    location: {
      city: "Shillong",
      state: "Meghalaya",
      region: "Northeast India",
      coordinates: {
        latitude: 25.5788,
        longitude: 91.8933
      },
      address: "Khasi Hills, Shillong, Meghalaya 793001"
    },
    pricing: {
      basePrice: 4000,
      priceUnit: "per person",
      currency: "INR",
      inclusions: ["Homestay", "Local meals", "Cultural activities", "Craft workshops", "Guide"],
      exclusions: ["Transportation", "Personal shopping", "Tips"]
    },
    operator: {
      name: "Meghalaya Community Tourism",
      contact: {
        email: "info@meghalayatourism.com",
        phone: "+91-364-2567890",
        website: "www.meghalayatourism.com"
      },
      certifications: ["Community Tourism Certified", "Cultural Heritage Award"],
      experience: "20 years",
      rating: 4.8
    },
    sustainability: {
      ecoRating: 4.9,
      carbonFootprint: "Low",
      ecoFeatures: [
        { feature: "Community Owned", description: "100% community-managed tourism" },
        { feature: "Traditional Skills", description: "Learn and preserve local crafts" },
        { feature: "Local Economy", description: "Direct benefit to village families" },
        { feature: "Cultural Preservation", description: "Support traditional way of life" }
      ],
      certifications: [
        { name: "Community Tourism Award", issuedBy: "Meghalaya Tourism", validUntil: new Date('2025-12-31') },
        { name: "Responsible Tourism Certified", issuedBy: "Tourism Council", validUntil: new Date('2025-09-30') }
      ],
      conservationImpact: {
        communitiesSupported: 8,
        traditionalSkillsPreserved: 12,
        localJobsCreated: 25,
        culturalSitesProtected: 5
      }
    },
    duration: {
      recommended: "4-5 days",
      minimum: "3 days",
      maximum: "10 days"
    },
    ratings: {
      overall: 4.8,
      sustainability: 5.0,
      authenticity: 4.9,
      community: 4.8,
      totalReviews: 94
    },
    featured: true,
    verified: true,
    isActive: true,
    rewards: {
      ecoPointsEarned: 180,
      carbonOffsetCredits: 30
    }
  }
];

export const seedEcoTourism = async () => {
  try {
    console.log('🌱 Starting eco-tourism data seeding...');
    
    // Clear existing data
    await EcoTourism.deleteMany({});
    console.log('🗑️  Cleared existing eco-tourism data');

    // Insert new data
    const insertedData = await EcoTourism.insertMany(ecoTourismData);
    console.log(`✅ Successfully seeded ${insertedData.length} eco-tourism options`);

    // Create text indexes for search
    await EcoTourism.createIndexes();
    console.log('📋 Created database indexes');

    return insertedData;
  } catch (error) {
    console.error('❌ Error seeding eco-tourism data:', error);
    throw error;
  }
};

// Run seeding if this file is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  (async () => {
    try {
      await connectMongoDB();
      await seedEcoTourism();
      console.log('🎉 Eco-tourism seeding completed successfully!');
      process.exit(0);
    } catch (error) {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    }
  })();
}

export default ecoTourismData;