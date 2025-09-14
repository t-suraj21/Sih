import mongoose from 'mongoose';
import Hotel from '../../models/Hotel.js';
import User from '../../models/User.js';

const realHotelsData = [
  // Mumbai Hotels
  {
    name: "The Taj Mahal Palace Mumbai",
    description: "Iconic luxury hotel overlooking the Gateway of India and Arabian Sea. A symbol of Indian hospitality with world-class amenities and heritage architecture.",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Apollo Bunder, Colaba, Mumbai, Maharashtra 400001",
    location: {
      type: "Point",
      coordinates: [72.8347, 18.9220]
    },
    price: 25000,
    originalPrice: 30000,
    rating: 4.8,
    reviewCount: 2134,
    images: [
      { url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop", alt: "Taj Mahal Palace Mumbai", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop", alt: "Luxury Suite", isPrimary: false },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop", alt: "Hotel Restaurant", isPrimary: false }
    ],
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Fitness Center", "Business Center", "Concierge", "Valet Parking"],
    roomTypes: [
      { type: "Deluxe Room", price: 25000, capacity: 2, amenities: ["King Bed", "City View", "Marble Bathroom"] },
      { type: "Executive Suite", price: 45000, capacity: 4, amenities: ["Separate Living", "Sea View", "Butler Service"] },
      { type: "Presidential Suite", price: 85000, capacity: 6, amenities: ["Private Terrace", "Jacuzzi", "Personal Butler"] }
    ],
    verified: true,
    contact: {
      phone: "+91-22-6665-3366",
      email: "mumbai@tajhotels.com",
      website: "https://www.tajhotels.com"
    },
    certificates: [
      { type: "FSSAI", number: "FSSAI123456", validUntil: new Date("2025-12-31") },
      { type: "Tourism Board", number: "MTB789012", validUntil: new Date("2025-06-30") }
    ]
  },
  {
    name: "The Oberoi Mumbai",
    description: "Modern luxury hotel in Nariman Point with stunning Arabian Sea views and contemporary design.",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Nariman Point, Mumbai, Maharashtra 400021",
    location: {
      type: "Point",
      coordinates: [72.8217, 18.9224]
    },
    price: 22000,
    originalPrice: 28000,
    rating: 4.7,
    reviewCount: 1876,
    images: [
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop", alt: "Oberoi Mumbai", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1520637836862-4d197d17c60a?w=800&h=600&fit=crop", alt: "Sea View Room", isPrimary: false }
    ],
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Fitness Center", "Business Center"],
    roomTypes: [
      { type: "Deluxe Room", price: 22000, capacity: 2, amenities: ["Sea View", "Modern Amenities"] },
      { type: "Executive Suite", price: 40000, capacity: 4, amenities: ["Separate Living", "City View"] }
    ],
    verified: true,
    contact: {
      phone: "+91-22-6632-5757",
      email: "mumbai@oberoihotels.com",
      website: "https://www.oberoihotels.com"
    }
  },

  // Delhi Hotels
  {
    name: "The Leela Palace New Delhi",
    description: "Luxury hotel in Chanakyapuri with royal architecture and modern amenities, close to diplomatic enclave.",
    city: "New Delhi",
    state: "Delhi",
    address: "Chanakyapuri, New Delhi, Delhi 110023",
    location: {
      type: "Point",
      coordinates: [77.1865, 28.5965]
    },
    price: 18000,
    originalPrice: 22000,
    rating: 4.6,
    reviewCount: 1543,
    images: [
      { url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop", alt: "Leela Palace Delhi", isPrimary: true }
    ],
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Fitness Center", "Business Center"],
    roomTypes: [
      { type: "Deluxe Room", price: 18000, capacity: 2, amenities: ["City View", "Modern Amenities"] }
    ],
    verified: true,
    contact: {
      phone: "+91-11-3933-1234",
      email: "newdelhi@theleela.com",
      website: "https://www.theleela.com"
    }
  },
  {
    name: "ITC Maurya New Delhi",
    description: "Business luxury hotel in Diplomatic Enclave with award-winning restaurants and modern facilities.",
    city: "New Delhi",
    state: "Delhi",
    address: "Diplomatic Enclave, New Delhi, Delhi 110021",
    location: {
      type: "Point",
      coordinates: [77.1878, 28.5961]
    },
    price: 16000,
    originalPrice: 20000,
    rating: 4.5,
    reviewCount: 1234,
    images: [
      { url: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop", alt: "ITC Maurya", isPrimary: true }
    ],
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Fitness Center", "Business Center"],
    roomTypes: [
      { type: "Executive Room", price: 16000, capacity: 2, amenities: ["Business Amenities"] }
    ],
    verified: true,
    contact: {
      phone: "+91-11-2611-2233",
      email: "maurya@itchotels.in",
      website: "https://www.itchotels.com"
    }
  },

  // Rajasthan Hotels
  {
    name: "Rambagh Palace Jaipur",
    description: "Former royal residence of the Maharaja of Jaipur, now a luxury hotel with palatial architecture and royal gardens.",
    city: "Jaipur",
    state: "Rajasthan",
    address: "Bhawani Singh Road, Jaipur, Rajasthan 302005",
    location: {
      type: "Point",
      coordinates: [75.7873, 26.9124]
    },
    price: 25000,
    originalPrice: 30000,
    rating: 4.9,
    reviewCount: 892,
    images: [
      { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop", alt: "Rambagh Palace", isPrimary: true }
    ],
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Fitness Center", "Palace Gardens", "Royal Experience"],
    roomTypes: [
      { type: "Palace Room", price: 25000, capacity: 2, amenities: ["Palace View", "Royal Amenities"] },
      { type: "Royal Suite", price: 45000, capacity: 4, amenities: ["Separate Living", "Palace Gardens"] }
    ],
    verified: true,
    contact: {
      phone: "+91-141-221-1919",
      email: "jaipur@tajhotels.com",
      website: "https://www.tajhotels.com"
    }
  },
  {
    name: "Taj Lake Palace Udaipur",
    description: "Iconic palace hotel floating on Lake Pichola with unmatched luxury and stunning lake views.",
    city: "Udaipur",
    state: "Rajasthan",
    address: "Lake Pichola, Udaipur, Rajasthan 313001",
    location: {
      type: "Point",
      coordinates: [73.6822, 24.5760]
    },
    price: 45000,
    originalPrice: 55000,
    rating: 4.9,
    reviewCount: 1247,
    images: [
      { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop", alt: "Lake Palace", isPrimary: true }
    ],
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Lake Views", "Boat Transfer", "Royal Experience"],
    roomTypes: [
      { type: "Lake View Room", price: 45000, capacity: 2, amenities: ["Lake View", "Palace Amenities"] },
      { type: "Royal Suite", price: 75000, capacity: 4, amenities: ["Private Terrace", "Lake Views"] }
    ],
    verified: true,
    contact: {
      phone: "+91-294-242-8800",
      email: "lake.palace@tajhotels.com",
      website: "https://www.tajhotels.com"
    }
  },

  // Goa Hotels
  {
    name: "The Leela Goa",
    description: "Luxury beach resort with pristine coastline, golf course, and world-class amenities in South Goa.",
    city: "Cavelossim",
    state: "Goa",
    address: "Cavelossim Beach, South Goa, Goa 403731",
    location: {
      type: "Point",
      coordinates: [74.1240, 15.1394]
    },
    price: 15000,
    originalPrice: 18000,
    rating: 4.8,
    reviewCount: 1156,
    images: [
      { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop", alt: "Leela Goa", isPrimary: true }
    ],
    amenities: ["WiFi", "Beach Access", "Golf Course", "Spa", "Pool", "Restaurant", "Water Sports"],
    roomTypes: [
      { type: "Garden View Room", price: 15000, capacity: 2, amenities: ["Garden View", "Beach Access"] },
      { type: "Beach Villa", price: 25000, capacity: 4, amenities: ["Private Beach", "Villa Amenities"] }
    ],
    verified: true,
    contact: {
      phone: "+91-832-287-1234",
      email: "goa@theleela.com",
      website: "https://www.theleela.com"
    }
  },

  // Kerala Hotels
  {
    name: "Kumarakom Lake Resort",
    description: "Luxury backwater resort with traditional Kerala architecture and stunning Vembanad Lake views.",
    city: "Kumarakom",
    state: "Kerala",
    address: "Kumarakom, Kottayam, Kerala 686563",
    location: {
      type: "Point",
      coordinates: [76.4274, 9.6177]
    },
    price: 18000,
    originalPrice: 22000,
    rating: 4.9,
    reviewCount: 876,
    images: [
      { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop", alt: "Kumarakom Resort", isPrimary: true }
    ],
    amenities: ["WiFi", "Backwater Views", "Ayurvedic Spa", "Houseboat", "Restaurant", "Cultural Shows"],
    roomTypes: [
      { type: "Backwater Villa", price: 18000, capacity: 2, amenities: ["Backwater View", "Traditional Architecture"] },
      { type: "Heritage Villa", price: 28000, capacity: 4, amenities: ["Private Pool", "Heritage Design"] }
    ],
    verified: true,
    contact: {
      phone: "+91-481-252-4900",
      email: "kumarakom@kumarakomlakeresort.in",
      website: "https://www.kumarakomlakeresort.in"
    }
  },

  // Himachal Pradesh Hotels
  {
    name: "Wildflower Hall Shimla",
    description: "Historic luxury resort in Shimla with colonial architecture and panoramic mountain views.",
    city: "Shimla",
    state: "Himachal Pradesh",
    address: "Chharabra, Shimla, Himachal Pradesh 171012",
    location: {
      type: "Point",
      coordinates: [77.1734, 31.1048]
    },
    price: 20000,
    originalPrice: 25000,
    rating: 4.7,
    reviewCount: 654,
    images: [
      { url: "https://images.unsplash.com/photo-1605538883669-825200433431?w=800&h=600&fit=crop", alt: "Wildflower Hall", isPrimary: true }
    ],
    amenities: ["WiFi", "Mountain Views", "Spa", "Restaurant", "Fitness Center", "Adventure Activities"],
    roomTypes: [
      { type: "Mountain View Room", price: 20000, capacity: 2, amenities: ["Mountain View", "Colonial Charm"] },
      { type: "Heritage Suite", price: 35000, capacity: 4, amenities: ["Separate Living", "Historic Design"] }
    ],
    verified: true,
    contact: {
      phone: "+91-177-264-8585",
      email: "shimla@wildflowerhall.com",
      website: "https://www.wildflowerhall.com"
    }
  },

  // Karnataka Hotels
  {
    name: "The Oberoi Bangalore",
    description: "Luxury business hotel in Bangalore with modern amenities and excellent business facilities.",
    city: "Bangalore",
    state: "Karnataka",
    address: "MG Road, Bangalore, Karnataka 560001",
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716]
    },
    price: 12000,
    originalPrice: 15000,
    rating: 4.6,
    reviewCount: 987,
    images: [
      { url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop", alt: "Oberoi Bangalore", isPrimary: true }
    ],
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Fitness Center", "Business Center", "Tech Amenities"],
    roomTypes: [
      { type: "Executive Room", price: 12000, capacity: 2, amenities: ["City View", "Business Amenities"] },
      { type: "Executive Suite", price: 20000, capacity: 4, amenities: ["Separate Living", "City View"] }
    ],
    verified: true,
    contact: {
      phone: "+91-80-2558-5858",
      email: "bangalore@oberoihotels.com",
      website: "https://www.oberoihotels.com"
    }
  },

  // Tamil Nadu Hotels
  {
    name: "Taj Coromandel Chennai",
    description: "Luxury hotel in Chennai with South Indian architecture and modern amenities.",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "37, Mahatma Gandhi Road, Chennai, Tamil Nadu 600034",
    location: {
      type: "Point",
      coordinates: [80.2620, 13.0827]
    },
    price: 14000,
    originalPrice: 18000,
    rating: 4.5,
    reviewCount: 756,
    images: [
      { url: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop", alt: "Taj Coromandel", isPrimary: true }
    ],
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Fitness Center", "Business Center"],
    roomTypes: [
      { type: "Deluxe Room", price: 14000, capacity: 2, amenities: ["City View", "Modern Amenities"] }
    ],
    verified: true,
    contact: {
      phone: "+91-44-6600-0000",
      email: "chennai@tajhotels.com",
      website: "https://www.tajhotels.com"
    }
  }
];

export const seedHotels = async () => {
  try {
    console.log('🌱 Seeding hotels data...');
    
    // Clear existing hotels
    await Hotel.deleteMany({});
    
    // Get admin user for hotel ownership
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('⚠️  No admin user found. Creating hotels without owner...');
    }
    
    // Insert hotels data
    const hotelsWithOwner = realHotelsData.map(hotel => ({
      ...hotel,
      owner: adminUser?._id
    }));
    
    const createdHotels = await Hotel.insertMany(hotelsWithOwner);
    
    console.log(`✅ Successfully seeded ${createdHotels.length} hotels`);
    
    // Create index for better search performance
    await Hotel.collection.createIndex({ location: '2dsphere' });
    await Hotel.collection.createIndex({ city: 1, state: 1, isActive: 1 });
    await Hotel.collection.createIndex({ name: 'text', description: 'text', city: 'text' });
    
    console.log('✅ Hotel indexes created successfully');
    
    return createdHotels;
  } catch (error) {
    console.error('❌ Error seeding hotels:', error);
    throw error;
  }
};

export default seedHotels;
