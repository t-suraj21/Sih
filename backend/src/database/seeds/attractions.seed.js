import mongoose from 'mongoose';
import Attraction from '../../models/Attraction.js';
import Destination from '../../models/Destination.js';

export const seedAttractions = async (destinations = []) => {
  try {
    console.log('🌱 Seeding attractions data...');
    
    // Clear existing attractions
    await Attraction.deleteMany({});
    
    // Get destinations if not provided
    if (destinations.length === 0) {
      destinations = await Destination.find({});
    }
    
    // Create destination map for easy lookup
    const destinationMap = {};
    destinations.forEach(dest => {
      destinationMap[dest.name] = dest._id;
    });
    
    const realAttractionsData = [
      // Jaipur Attractions
      {
        name: "Amber Fort",
        description: "Magnificent hilltop fortress showcasing Rajput architecture with intricate mirror work, stunning views of Maota Lake, and the famous Sheesh Mahal (Mirror Palace). Built in the 16th century, it represents the grandeur of Rajput rulers.",
        shortDescription: "Historic hilltop fortress with stunning mirror work and panoramic views.",
        destination: destinationMap['Jaipur'],
        city: "Jaipur",
        state: "Rajasthan",
        category: "Historical",
        subcategory: "Fort",
        images: [
          {
            url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
            alt: "Amber Fort Jaipur",
            caption: "Magnificent Amber Fort with traditional Rajput architecture",
            isPrimary: true
          },
          {
            url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
            alt: "Sheesh Mahal",
            caption: "Famous Sheesh Mahal (Mirror Palace) inside Amber Fort",
            isPrimary: false
          }
        ],
        location: {
          type: "Point",
          coordinates: [75.8513, 26.9855],
          address: "Amber, Jaipur, Rajasthan 302001"
        },
        timings: {
          opening: "8:00 AM",
          closing: "6:00 PM",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          specialNotes: "Elephant rides available from 10:00 AM to 4:00 PM"
        },
        entryFee: {
          indianAdult: 50,
          indianChild: 25,
          foreignAdult: 500,
          foreignChild: 250,
          camera: 50,
          video: 200,
          notes: "Elephant ride charges extra: ₹900 per person"
        },
        duration: {
          recommended: "2-3 hours",
          minimum: "1 hour",
          maximum: "4 hours"
        },
        bestTimeToVisit: {
          months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
          season: "Winter",
          description: "Best visited during winter months when weather is pleasant for exploring"
        },
        facilities: ["Parking", "Restaurant", "Gift Shop", "Audio Guide", "Guided Tours", "Restrooms", "First Aid", "Photography Allowed", "Video Allowed"],
        activities: [
          {
            name: "Elephant Ride",
            description: "Traditional elephant ride to the top of the fort",
            duration: "30 minutes",
            price: "₹900 per person",
            operator: "Amber Fort Authority",
            requirements: "No age restrictions, but not recommended for elderly"
          },
          {
            name: "Light and Sound Show",
            description: "Evening light and sound show depicting the history of Amber Fort",
            duration: "1 hour",
            price: "₹200 per person",
            operator: "Rajasthan Tourism Department",
            requirements: "Show available in English and Hindi"
          }
        ],
        nearbyAttractions: [
          {
            name: "Jaigarh Fort",
            distance: "1 km",
            type: "Historical"
          },
          {
            name: "Nahargarh Fort",
            distance: "15 km",
            type: "Historical"
          },
          {
            name: "Maota Lake",
            distance: "500 m",
            type: "Natural"
          }
        ],
        transportation: {
          byAir: {
            airport: "Jaipur International Airport",
            distance: "20 km"
          },
          byRail: {
            station: "Jaipur Junction",
            distance: "15 km"
          },
          byRoad: {
            majorHighways: ["NH-48", "NH-21"],
            busServices: ["Rajasthan State Transport", "Private buses"]
          },
          localTransport: {
            available: true,
            options: ["Taxi", "Auto-rickshaw", "Bus", "Elephant ride"],
            cost: "₹100-500 depending on mode"
          }
        },
        accessibility: {
          wheelchair: {
            available: false,
            description: "Not wheelchair accessible due to steep pathways and stairs"
          },
          elderly: {
            friendly: true,
            description: "Elephant rides available for easier access to top"
          },
          children: {
            friendly: true,
            description: "Great for children with elephant rides and open spaces"
          }
        },
        safety: {
          guidelines: [
            "Wear comfortable walking shoes",
            "Carry water bottles",
            "Be cautious on steep pathways",
            "Follow guide instructions during elephant rides"
          ],
          emergencyContacts: ["Police: 100", "Tourist Helpline: +91-141-1363"],
          restrictions: [
            "No smoking inside the fort",
            "No littering",
            "Respect historical artifacts"
          ]
        },
        history: {
          built: "16th century",
          builtBy: "Raja Man Singh I",
          significance: "Former capital of Kachwaha Rajputs, showcases blend of Hindu and Mughal architecture",
          architecture: "Red sandstone and marble with intricate mirror work",
          interestingFacts: [
            "Home to the world's largest cannon on wheels",
            "Famous Sheesh Mahal has thousands of mirrors",
            "Built without using any cement or mortar"
          ]
        },
        ratings: {
          overall: 4.8,
          cleanliness: 4.5,
          accessibility: 4.2,
          value: 4.6,
          totalReviews: 1234
        },
        tags: ["fort", "rajasthan", "history", "mirror-work", "elephant-ride", "rajput", "architecture", "unesco"],
        isPopular: true,
        verified: true,
        featured: true
      },
      {
        name: "Hawa Mahal",
        description: "The iconic 'Palace of Winds' is a five-story palace with 953 small windows (jharokhas) designed for royal women to observe street festivals without being seen. Built in 1799, it's a masterpiece of Rajput architecture.",
        shortDescription: "Iconic palace with 953 windows designed for royal women to observe street life.",
        destination: destinationMap['Jaipur'],
        city: "Jaipur",
        state: "Rajasthan",
        category: "Historical",
        subcategory: "Palace",
        images: [
          {
            url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            alt: "Hawa Mahal Jaipur",
            caption: "Famous Palace of Winds with 953 windows",
            isPrimary: true
          }
        ],
        location: {
          type: "Point",
          coordinates: [75.8267, 26.9239],
          address: "Hawa Mahal, Badi Choupad, Pink City, Jaipur, Rajasthan 302002"
        },
        timings: {
          opening: "9:00 AM",
          closing: "4:30 PM",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          specialNotes: "Best photography time is early morning when the sun illuminates the pink facade"
        },
        entryFee: {
          indianAdult: 50,
          indianChild: 25,
          foreignAdult: 200,
          foreignChild: 100,
          camera: 20,
          video: 50,
          notes: "Combined ticket available with City Palace"
        },
        duration: {
          recommended: "1 hour",
          minimum: "30 minutes",
          maximum: "2 hours"
        },
        bestTimeToVisit: {
          months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
          season: "Winter",
          description: "Pleasant weather for photography and exploration"
        },
        facilities: ["Parking", "Gift Shop", "Audio Guide", "Restrooms", "Photography Allowed"],
        activities: [
          {
            name: "Photography Tour",
            description: "Guided photography tour focusing on architectural details",
            duration: "1 hour",
            price: "₹500 per person",
            operator: "Local Photography Guides",
            requirements: "Bring your own camera"
          }
        ],
        nearbyAttractions: [
          {
            name: "City Palace",
            distance: "500 m",
            type: "Historical"
          },
          {
            name: "Jantar Mantar",
            distance: "300 m",
            type: "Historical"
          },
          {
            name: "Johari Bazaar",
            distance: "200 m",
            type: "Cultural"
          }
        ],
        transportation: {
          byAir: {
            airport: "Jaipur International Airport",
            distance: "13 km"
          },
          byRail: {
            station: "Jaipur Junction",
            distance: "3 km"
          },
          byRoad: {
            majorHighways: ["NH-48"],
            busServices: ["City Bus Service"]
          },
          localTransport: {
            available: true,
            options: ["Walking", "Auto-rickshaw", "Taxi"],
            cost: "₹50-200"
          }
        },
        accessibility: {
          wheelchair: {
            available: false,
            description: "Limited wheelchair access due to narrow passages"
          },
          elderly: {
            friendly: true,
            description: "Easy access from ground floor, upper floors have stairs"
          },
          children: {
            friendly: true,
            description: "Interesting for children to see the unique architecture"
          }
        },
        safety: {
          guidelines: [
            "Be careful on narrow passages",
            "Don't lean over the jharokhas",
            "Keep belongings secure in crowded areas"
          ],
          emergencyContacts: ["Police: 100", "Tourist Helpline: +91-141-1363"],
          restrictions: ["No climbing on windows", "No smoking", "Respect the historical structure"]
        },
        history: {
          built: "1799",
          builtBy: "Maharaja Sawai Pratap Singh",
          significance: "Built for royal women to observe street festivals without being seen",
          architecture: "Red and pink sandstone in the shape of Lord Krishna's crown",
          interestingFacts: [
            "Has 953 small windows called jharokhas",
            "Built without foundation",
            "No stairs, only ramps to reach upper floors",
            "Designed to allow cool breeze to flow through"
          ]
        },
        ratings: {
          overall: 4.4,
          cleanliness: 4.2,
          accessibility: 4.0,
          value: 4.3,
          totalReviews: 987
        },
        tags: ["palace", "rajasthan", "windows", "architecture", "pink-city", "royal", "history", "photography"],
        isPopular: true,
        verified: true,
        featured: true
      },

      // Goa Attractions
      {
        name: "Basilica of Bom Jesus",
        description: "UNESCO World Heritage church housing the mortal remains of St. Francis Xavier, one of the most revered saints in Christianity. Built in 1605, it's a masterpiece of Baroque architecture and a significant pilgrimage site.",
        shortDescription: "UNESCO World Heritage church with the remains of St. Francis Xavier.",
        destination: destinationMap['Goa'],
        city: "Old Goa",
        state: "Goa",
        category: "Religious",
        subcategory: "Church",
        images: [
          {
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
            alt: "Basilica of Bom Jesus",
            caption: "UNESCO World Heritage Basilica of Bom Jesus",
            isPrimary: true
          }
        ],
        location: {
          type: "Point",
          coordinates: [73.9103, 15.4994],
          address: "Old Goa, Goa 403402"
        },
        timings: {
          opening: "9:00 AM",
          closing: "6:30 PM",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          specialNotes: "Mass timings: 7:00 AM, 8:15 AM, 9:30 AM (Sundays)"
        },
        entryFee: {
          indianAdult: 0,
          indianChild: 0,
          foreignAdult: 0,
          foreignChild: 0,
          camera: 25,
          video: 100,
          notes: "Entry is free, photography charges apply"
        },
        duration: {
          recommended: "1-2 hours",
          minimum: "30 minutes",
          maximum: "3 hours"
        },
        bestTimeToVisit: {
          months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
          season: "Winter",
          description: "Pleasant weather for visiting and attending mass"
        },
        facilities: ["Parking", "Gift Shop", "Restrooms", "Photography Allowed", "Guided Tours"],
        activities: [
          {
            name: "Guided Tour",
            description: "Learn about the history and architecture of the basilica",
            duration: "1 hour",
            price: "₹200 per person",
            operator: "Local Guides",
            requirements: "Respectful dress code required"
          }
        ],
        nearbyAttractions: [
          {
            name: "Se Cathedral",
            distance: "200 m",
            type: "Religious"
          },
          {
            name: "Church of St. Francis of Assisi",
            distance: "300 m",
            type: "Religious"
          },
          {
            name: "Archaeological Museum",
            distance: "400 m",
            type: "Museum"
          }
        ],
        transportation: {
          byAir: {
            airport: "Goa International Airport",
            distance: "25 km"
          },
          byRail: {
            station: "Madgaon Railway Station",
            distance: "10 km"
          },
          byRoad: {
            majorHighways: ["NH-66"],
            busServices: ["Kadamba Transport"]
          },
          localTransport: {
            available: true,
            options: ["Taxi", "Bus", "Auto-rickshaw"],
            cost: "₹100-300"
          }
        },
        accessibility: {
          wheelchair: {
            available: true,
            description: "Wheelchair accessible with ramps"
          },
          elderly: {
            friendly: true,
            description: "Easy access and seating available"
          },
          children: {
            friendly: true,
            description: "Educational and peaceful environment"
          }
        },
        safety: {
          guidelines: [
            "Maintain silence inside the church",
            "Dress modestly and respectfully",
            "No photography during mass",
            "Keep mobile phones silent"
          ],
          emergencyContacts: ["Police: 100", "Tourist Helpline: +91-832-222-6515"],
          restrictions: [
            "No smoking or alcohol",
            "No loud conversations",
            "Respect religious sentiments"
          ]
        },
        history: {
          built: "1605",
          builtBy: "Portuguese",
          significance: "Houses the mortal remains of St. Francis Xavier, patron saint of Goa",
          architecture: "Baroque architecture with Doric, Ionic and Corinthian orders",
          interestingFacts: [
            "Body of St. Francis Xavier is displayed every 10 years",
            "Built without any mortar or cement",
            "UNESCO World Heritage Site since 1986",
            "Contains the largest church bell in Goa"
          ]
        },
        ratings: {
          overall: 4.6,
          cleanliness: 4.8,
          accessibility: 4.5,
          value: 4.7,
          totalReviews: 876
        },
        tags: ["church", "unesco", "st-francis-xavier", "baroque", "heritage", "pilgrimage", "portuguese", "goa"],
        isPopular: true,
        verified: true,
        featured: true
      }
    ];
    
    const createdAttractions = await Attraction.insertMany(realAttractionsData);
    
    console.log(`✅ Successfully seeded ${createdAttractions.length} attractions`);
    console.log(`   • Historical: ${createdAttractions.filter(a => a.category === 'Historical').length}`);
    console.log(`   • Religious: ${createdAttractions.filter(a => a.category === 'Religious').length}`);
    console.log(`   • Natural: ${createdAttractions.filter(a => a.category === 'Natural').length}`);
    
    // Create indexes for better search performance
    await Attraction.collection.createIndex({ name: 'text', description: 'text', city: 'text' });
    await Attraction.collection.createIndex({ destination: 1, category: 1, isActive: 1 });
    await Attraction.collection.createIndex({ city: 1, state: 1, category: 1 });
    await Attraction.collection.createIndex({ location: '2dsphere' });
    await Attraction.collection.createIndex({ tags: 1 });
    await Attraction.collection.createIndex({ isPopular: 1, featured: 1, isActive: 1 });
    await Attraction.collection.createIndex({ 'ratings.overall': -1 });
    
    console.log('✅ Attraction indexes created successfully');
    
    return createdAttractions;
  } catch (error) {
    console.error('❌ Error seeding attractions:', error);
    throw error;
  }
};

export default seedAttractions;
