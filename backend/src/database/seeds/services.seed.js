import Service from '../../models/Service.js';
import User from '../../models/User.js';

const sampleServices = [
  {
    name: 'Rajasthan Heritage Tour Guide',
    description: 'Experienced tour guide specializing in Rajasthan heritage sites, palaces, and cultural experiences. Fluent in Hindi, English, and Rajasthani.',
    type: 'Tour Guide',
    location: {
      city: 'Jaipur',
      state: 'Rajasthan',
      address: 'Pink City, Jaipur'
    },
    pricing: {
      basePrice: 2500,
      unit: 'per day'
    },
    features: {
      amenities: ['Multilingual', 'Cultural Expert', 'Photography Assistance'],
      duration: '8 hours',
      groupSize: 15
    },
    images: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    ],
    status: 'active'
  },
  {
    name: 'Kerala Backwater Cruise',
    description: 'Traditional houseboat cruise through Kerala backwaters with authentic meals and cultural performances.',
    type: 'Adventure Sports',
    location: {
      city: 'Alleppey',
      state: 'Kerala',
      address: 'Vembanad Lake, Alleppey'
    },
    pricing: {
      basePrice: 8500,
      unit: 'per person'
    },
    features: {
      amenities: ['Traditional Meals', 'Cultural Shows', 'Fishing Equipment'],
      duration: '2 days',
      capacity: 8
    },
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop'
    ],
    status: 'active'
  },
  {
    name: 'Delhi Food Walk Experience',
    description: 'Guided street food tour through Old Delhi, experiencing authentic flavors and local culture.',
    type: 'Restaurant/Food',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      address: 'Chandni Chowk, Old Delhi'
    },
    pricing: {
      basePrice: 1200,
      unit: 'per person'
    },
    features: {
      amenities: ['Food Tasting', 'Cultural Stories', 'Local Guide'],
      duration: '4 hours',
      groupSize: 12
    },
    images: [
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop'
    ],
    status: 'active'
  },
  {
    name: 'Goa Beach Transport Service',
    description: 'Reliable transport service covering all major beaches and tourist spots in Goa with AC vehicles.',
    type: 'Transport Service',
    location: {
      city: 'Panaji',
      state: 'Goa',
      address: 'North and South Goa Coverage'
    },
    pricing: {
      basePrice: 3500,
      unit: 'per day'
    },
    features: {
      amenities: ['AC Vehicle', 'GPS Tracking', '24/7 Support', 'Fuel Included'],
      capacity: 7
    },
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'
    ],
    status: 'active'
  },
  {
    name: 'Himachal Trekking Adventure',
    description: 'Guided trekking expeditions in Himachal Pradesh with professional equipment and safety measures.',
    type: 'Adventure Sports',
    location: {
      city: 'Manali',
      state: 'Himachal Pradesh',
      address: 'Solang Valley, Manali'
    },
    pricing: {
      basePrice: 4500,
      unit: 'per person'
    },
    features: {
      amenities: ['Professional Guide', 'Safety Equipment', 'First Aid', 'Photography'],
      duration: '1 day',
      groupSize: 10
    },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    ],
    status: 'active'
  }
];

export const seedServices = async () => {
  try {
    console.log('🌱 Starting services seeding...');
    
    // Clear existing services
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing services');
    
    // Find vendor users to assign services to
    const vendors = await User.find({ role: 'vendor' }).limit(5);
    
    if (vendors.length === 0) {
      console.log('⚠️  No vendor users found. Creating sample vendor...');
      
      const sampleVendor = await User.create({
        name: 'Sample Vendor',
        email: 'vendor@example.com',
        password: 'password123',
        phone: '+91-9876543210',
        role: 'vendor',
        kycVerified: true
      });
      
      vendors.push(sampleVendor);
    }
    
    // Assign services to vendors
    const servicesWithVendors = sampleServices.map((service, index) => ({
      ...service,
      vendor: vendors[index % vendors.length]._id,
      verification: {
        isVerified: true,
        verifiedAt: new Date(),
        verifiedBy: vendors[0]._id
      },
      ratings: {
        average: 4.2 + (Math.random() * 0.8),
        count: Math.floor(Math.random() * 50) + 10
      },
      stats: {
        views: Math.floor(Math.random() * 1000) + 100,
        bookings: Math.floor(Math.random() * 50) + 5,
        revenue: 0
      }
    }));
    
    // Insert services
    const createdServices = await Service.insertMany(servicesWithVendors);
    
    console.log(`✅ Successfully seeded ${createdServices.length} services`);
    console.log('📊 Services by type:');
    
    const servicesByType = createdServices.reduce((acc, service) => {
      acc[service.type] = (acc[service.type] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(servicesByType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });
    
    return createdServices;
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    throw error;
  }
};

export default seedServices;
