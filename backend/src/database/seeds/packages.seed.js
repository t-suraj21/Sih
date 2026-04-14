import mongoose from 'mongoose';
import Package from '../../models/Package.js';
import Hotel from '../../models/Hotel.js';
import Service from '../../models/Service.js';

export const seedPackages = async () => {
  try {
    console.log('🌱 Seeding packages data...');
    
    // Clear existing packages
    await Package.deleteMany({});
    
    // Get sample hotels and services for package options
    const hotels = await Hotel.find({}).limit(10);
    const foodServices = await Service.find({ type: 'Restaurant/Food' }).limit(5);
    const transportServices = await Service.find({ type: 'Transport Service' }).limit(5);
    const guideServices = await Service.find({ type: 'Tour Guide' }).limit(5);

    const packagesData = [
      // Single Package - Jaipur
      {
        name: 'Jaipur Solo Explorer',
        description: 'Perfect package for solo travelers exploring the Pink City. Includes comfortable accommodation, delicious local cuisine, convenient transport, and a knowledgeable guide.',
        packageType: 'single',
        destination: {
          city: 'Jaipur',
          state: 'Rajasthan',
          country: 'India',
          coordinates: { latitude: 26.9124, longitude: 75.7873 }
        },
        duration: { days: 3, nights: 2 },
        inclusions: {
          hotel: {
            included: true,
            options: [
              {
                hotelId: hotels[0]?._id || null,
                name: 'Budget Hotel',
                price: 1500,
                roomType: 'Single Room',
                amenities: ['WiFi', 'AC', 'Breakfast'],
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
                rating: 4.0
              },
              {
                hotelId: hotels[1]?._id || null,
                name: 'Mid-Range Hotel',
                price: 2500,
                roomType: 'Deluxe Single',
                amenities: ['WiFi', 'AC', 'Breakfast', 'Pool'],
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
                rating: 4.5
              },
              {
                hotelId: hotels[2]?._id || null,
                name: 'Luxury Hotel',
                price: 5000,
                roomType: 'Suite',
                amenities: ['WiFi', 'AC', 'Breakfast', 'Pool', 'Spa'],
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
                rating: 4.8
              }
            ],
            defaultOption: 0
          },
          food: {
            included: true,
            options: [
              {
                restaurantId: foodServices[0]?._id || null,
                name: 'Local Thali Restaurant',
                price: 800,
                mealType: 'all',
                cuisine: 'Rajasthani',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
                rating: 4.2
              },
              {
                restaurantId: foodServices[1]?._id || null,
                name: 'Multi-Cuisine Restaurant',
                price: 1500,
                mealType: 'all',
                cuisine: 'Multi-Cuisine',
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
                rating: 4.5
              }
            ],
            defaultOption: 0
          },
          travel: {
            included: true,
            options: [
              {
                transportId: transportServices[0]?._id || null,
                name: 'Auto Rickshaw',
                price: 500,
                vehicleType: 'taxi',
                capacity: 3,
                image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',
                rating: 4.0
              },
              {
                transportId: transportServices[1]?._id || null,
                name: 'Sedan Car',
                price: 2000,
                vehicleType: 'car',
                capacity: 4,
                image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
                rating: 4.5
              }
            ],
            defaultOption: 0
          },
          guide: {
            included: true,
            options: [
              {
                guideId: guideServices[0]?._id || null,
                name: 'Local Guide',
                price: 1200,
                languages: ['Hindi', 'English'],
                experience: '5 years',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                rating: 4.3
              },
              {
                guideId: guideServices[1]?._id || null,
                name: 'Professional Guide',
                price: 2000,
                languages: ['Hindi', 'English', 'French'],
                experience: '10 years',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
                rating: 4.7
              }
            ],
            defaultOption: 0
          }
        },
        pricing: {
          basePrice: 5000,
          pricePerPerson: 5000,
          currency: 'INR',
          taxes: 900,
          serviceCharge: 500,
          discount: 10,
          finalPrice: 5760
        },
        capacity: { minPersons: 1, maxPersons: 1 },
        availability: {
          isActive: true,
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        },
        features: {
          highlights: ['City Palace', 'Hawa Mahal', 'Amber Fort', 'Local Markets'],
          amenities: ['Hotel Stay', 'Meals', 'Transport', 'Guide'],
          included: ['Accommodation', 'All Meals', 'Local Transport', 'Tour Guide', 'Entry Tickets'],
          excluded: ['Personal Expenses', 'Tips', 'Optional Activities']
        },
        images: [{
          url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=800',
          caption: 'Jaipur City View',
          isPrimary: true
        }],
        ratings: { average: 4.5, count: 25 },
        status: 'active'
      },

      // Couple Package - Goa
      {
        name: 'Goa Romantic Getaway',
        description: 'Perfect romantic package for couples in the beautiful beaches of Goa. Includes beachfront resort, candlelight dinners, private transport, and couple-friendly activities.',
        packageType: 'couple',
        destination: {
          city: 'Goa',
          state: 'Goa',
          country: 'India',
          coordinates: { latitude: 15.2993, longitude: 74.1240 }
        },
        duration: { days: 4, nights: 3 },
        inclusions: {
          hotel: {
            included: true,
            options: [
              {
                hotelId: hotels[3]?._id || null,
                name: 'Beach Resort',
                price: 4000,
                roomType: 'Deluxe Double',
                amenities: ['WiFi', 'AC', 'Breakfast', 'Beach Access', 'Pool'],
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
                rating: 4.6
              },
              {
                hotelId: hotels[4]?._id || null,
                name: 'Luxury Beach Villa',
                price: 8000,
                roomType: 'Villa Suite',
                amenities: ['WiFi', 'AC', 'Breakfast', 'Beach Access', 'Pool', 'Spa', 'Private Balcony'],
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
                rating: 4.9
              }
            ],
            defaultOption: 0
          },
          food: {
            included: true,
            options: [
              {
                restaurantId: foodServices[2]?._id || null,
                name: 'Beachside Restaurant',
                price: 3000,
                mealType: 'all',
                cuisine: 'Seafood & Continental',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
                rating: 4.5
              },
              {
                restaurantId: foodServices[3]?._id || null,
                name: 'Fine Dining Restaurant',
                price: 5000,
                mealType: 'all',
                cuisine: 'International',
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
                rating: 4.7
              }
            ],
            defaultOption: 0
          },
          travel: {
            included: true,
            options: [
              {
                transportId: transportServices[2]?._id || null,
                name: 'Sedan Car',
                price: 3000,
                vehicleType: 'car',
                capacity: 4,
                image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
                rating: 4.5
              },
              {
                transportId: transportServices[3]?._id || null,
                name: 'Luxury SUV',
                price: 5000,
                vehicleType: 'car',
                capacity: 6,
                image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',
                rating: 4.7
              }
            ],
            defaultOption: 0
          },
          guide: {
            included: true,
            options: [
              {
                guideId: guideServices[2]?._id || null,
                name: 'Couple Friendly Guide',
                price: 2500,
                languages: ['Hindi', 'English'],
                experience: '7 years',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                rating: 4.6
              }
            ],
            defaultOption: 0
          }
        },
        pricing: {
          basePrice: 15000,
          pricePerPerson: 7500,
          currency: 'INR',
          taxes: 2700,
          serviceCharge: 1500,
          discount: 15,
          finalPrice: 16200
        },
        capacity: { minPersons: 2, maxPersons: 2 },
        availability: {
          isActive: true,
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        },
        features: {
          highlights: ['Beach Activities', 'Sunset Cruise', 'Spa Sessions', 'Candlelight Dinners'],
          amenities: ['Beach Resort', 'All Meals', 'Private Transport', 'Guide'],
          included: ['Accommodation', 'All Meals', 'Private Transport', 'Tour Guide', 'Beach Activities'],
          excluded: ['Water Sports', 'Personal Expenses', 'Tips']
        },
        images: [{
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
          caption: 'Goa Beach',
          isPrimary: true
        }],
        ratings: { average: 4.7, count: 45 },
        status: 'active'
      },

      // Family Package - Delhi
      {
        name: 'Delhi Family Fun Package',
        description: 'Complete family package for Delhi exploration. Includes family-friendly hotels, kid-friendly meals, comfortable transport, and family-oriented guide.',
        packageType: 'family',
        destination: {
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
          coordinates: { latitude: 28.6139, longitude: 77.2090 }
        },
        duration: { days: 5, nights: 4 },
        inclusions: {
          hotel: {
            included: true,
            options: [
              {
                hotelId: hotels[5]?._id || null,
                name: 'Family Hotel',
                price: 6000,
                roomType: 'Family Room (2 Rooms)',
                amenities: ['WiFi', 'AC', 'Breakfast', 'Kids Play Area', 'Pool'],
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
                rating: 4.3
              },
              {
                hotelId: hotels[6]?._id || null,
                name: 'Luxury Family Resort',
                price: 12000,
                roomType: 'Family Suite',
                amenities: ['WiFi', 'AC', 'Breakfast', 'Kids Play Area', 'Pool', 'Spa', 'Gym'],
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
                rating: 4.7
              }
            ],
            defaultOption: 0
          },
          food: {
            included: true,
            options: [
              {
                restaurantId: foodServices[4]?._id || null,
                name: 'Family Restaurant',
                price: 4000,
                mealType: 'all',
                cuisine: 'North Indian & Continental',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
                rating: 4.4
              }
            ],
            defaultOption: 0
          },
          travel: {
            included: true,
            options: [
              {
                transportId: transportServices[4]?._id || null,
                name: 'Family Van',
                price: 5000,
                vehicleType: 'car',
                capacity: 8,
                image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
                rating: 4.5
              }
            ],
            defaultOption: 0
          },
          guide: {
            included: true,
            options: [
              {
                guideId: guideServices[3]?._id || null,
                name: 'Family-Friendly Guide',
                price: 3500,
                languages: ['Hindi', 'English'],
                experience: '8 years',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
                rating: 4.6
              }
            ],
            defaultOption: 0
          }
        },
        pricing: {
          basePrice: 25000,
          pricePerPerson: 6250,
          currency: 'INR',
          taxes: 4500,
          serviceCharge: 2500,
          discount: 20,
          finalPrice: 25600
        },
        capacity: { minPersons: 4, maxPersons: 6 },
        availability: {
          isActive: true,
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        },
        features: {
          highlights: ['Red Fort', 'India Gate', 'Qutub Minar', 'Kids Museum', 'Shopping'],
          amenities: ['Family Hotel', 'Kid-Friendly Meals', 'Comfortable Transport', 'Family Guide'],
          included: ['Accommodation', 'All Meals', 'Transport', 'Guide', 'Entry Tickets'],
          excluded: ['Personal Expenses', 'Optional Activities', 'Tips']
        },
        images: [{
          url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
          caption: 'Delhi Monuments',
          isPrimary: true
        }],
        ratings: { average: 4.6, count: 60 },
        status: 'active'
      },

      // Group Package - Agra
      {
        name: 'Agra Group Adventure',
        description: 'Ideal for groups of friends or colleagues. Includes shared accommodation, group meals, comfortable transport, and experienced group guide.',
        packageType: 'group',
        destination: {
          city: 'Agra',
          state: 'Uttar Pradesh',
          country: 'India',
          coordinates: { latitude: 27.1767, longitude: 78.0081 }
        },
        duration: { days: 2, nights: 1 },
        inclusions: {
          hotel: {
            included: true,
            options: [
              {
                hotelId: hotels[7]?._id || null,
                name: 'Budget Hotel',
                price: 8000,
                roomType: 'Twin Sharing (4 Rooms)',
                amenities: ['WiFi', 'AC', 'Breakfast'],
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
                rating: 4.0
              },
              {
                hotelId: hotels[8]?._id || null,
                name: 'Mid-Range Hotel',
                price: 12000,
                roomType: 'Twin Sharing (4 Rooms)',
                amenities: ['WiFi', 'AC', 'Breakfast', 'Pool'],
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
                rating: 4.4
              }
            ],
            defaultOption: 0
          },
          food: {
            included: true,
            options: [
              {
                restaurantId: foodServices[0]?._id || null,
                name: 'Group Restaurant',
                price: 3000,
                mealType: 'all',
                cuisine: 'North Indian',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
                rating: 4.3
              }
            ],
            defaultOption: 0
          },
          travel: {
            included: true,
            options: [
              {
                transportId: transportServices[0]?._id || null,
                name: 'Mini Bus',
                price: 6000,
                vehicleType: 'bus',
                capacity: 15,
                image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',
                rating: 4.2
              }
            ],
            defaultOption: 0
          },
          guide: {
            included: true,
            options: [
              {
                guideId: guideServices[4]?._id || null,
                name: 'Group Guide',
                price: 2500,
                languages: ['Hindi', 'English'],
                experience: '6 years',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                rating: 4.5
              }
            ],
            defaultOption: 0
          }
        },
        pricing: {
          basePrice: 18000,
          pricePerPerson: 2250,
          currency: 'INR',
          taxes: 3240,
          serviceCharge: 1800,
          discount: 25,
          finalPrice: 17100
        },
        capacity: { minPersons: 6, maxPersons: 10 },
        availability: {
          isActive: true,
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        },
        features: {
          highlights: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Local Markets'],
          amenities: ['Shared Accommodation', 'Group Meals', 'Group Transport', 'Guide'],
          included: ['Accommodation', 'All Meals', 'Transport', 'Guide', 'Entry Tickets'],
          excluded: ['Personal Expenses', 'Tips']
        },
        images: [{
          url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
          caption: 'Taj Mahal',
          isPrimary: true
        }],
        ratings: { average: 4.5, count: 30 },
        status: 'active'
      }
    ];

    const createdPackages = await Package.insertMany(packagesData);
    
    console.log(`✅ Successfully seeded ${createdPackages.length} packages`);
    console.log(`   • Single packages: ${createdPackages.filter(p => p.packageType === 'single').length}`);
    console.log(`   • Couple packages: ${createdPackages.filter(p => p.packageType === 'couple').length}`);
    console.log(`   • Family packages: ${createdPackages.filter(p => p.packageType === 'family').length}`);
    console.log(`   • Group packages: ${createdPackages.filter(p => p.packageType === 'group').length}`);
    
    return createdPackages;
  } catch (error) {
    console.error('❌ Error seeding packages:', error);
    throw error;
  }
};

export default seedPackages;

