import mongoose from 'mongoose';
import User from '../../models/User.js';

const realUsersData = [
  // Admin Users
  {
    name: "Admin Yatra",
    email: "admin@yatra.com",
    password: "Admin@123456",
    phone: "+91-9876543210",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Emergency Admin",
      phone: "+91-9876543211",
      relation: "Manager"
    }
  },
  {
    name: "Suraj Kumar",
    email: "suraj@yatra.com",
    password: "Suraj@123456",
    phone: "+91-9876543212",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Family Contact",
      phone: "+91-9876543213",
      relation: "Family"
    }
  },

  // Vendor Users
  {
    name: "Rajesh Sharma",
    email: "rajesh.sharma@hotel.com",
    password: "Vendor@123456",
    phone: "+91-9876543214",
    role: "vendor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Business Partner",
      phone: "+91-9876543215",
      relation: "Business"
    }
  },
  {
    name: "Priya Singh",
    email: "priya.singh@resort.com",
    password: "Vendor@123456",
    phone: "+91-9876543216",
    role: "vendor",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Family Member",
      phone: "+91-9876543217",
      relation: "Family"
    }
  },

  // Tourist Users
  {
    name: "Amit Kumar",
    email: "amit.kumar@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543218",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Ravi Kumar",
      phone: "+91-9876543219",
      relation: "Brother"
    }
  },
  {
    name: "Sunita Devi",
    email: "sunita.devi@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543220",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Mohan Lal",
      phone: "+91-9876543221",
      relation: "Father"
    }
  },
  {
    name: "Ravi Patel",
    email: "ravi.patel@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543222",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    kycVerified: false,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Kavita Patel",
      phone: "+91-9876543223",
      relation: "Wife"
    }
  },
  {
    name: "Deepika Sharma",
    email: "deepika.sharma@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543224",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: false,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Ankit Sharma",
      phone: "+91-9876543225",
      relation: "Husband"
    }
  },
  {
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543226",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: false,
    isActive: true,
    emergencyContact: {
      name: "Neha Singh",
      phone: "+91-9876543227",
      relation: "Sister"
    }
  },
  {
    name: "Anjali Gupta",
    email: "anjali.gupta@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543228",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Rakesh Gupta",
      phone: "+91-9876543229",
      relation: "Father"
    }
  },
  {
    name: "Mohammed Ali",
    email: "mohammed.ali@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543230",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Fatima Ali",
      phone: "+91-9876543231",
      relation: "Mother"
    }
  },
  {
    name: "Sneha Reddy",
    email: "sneha.reddy@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543232",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Krishna Reddy",
      phone: "+91-9876543233",
      relation: "Husband"
    }
  },
  {
    name: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543234",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Shilpa Mehta",
      phone: "+91-9876543235",
      relation: "Wife"
    }
  },
  {
    name: "Pooja Jain",
    email: "pooja.jain@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543236",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Rajesh Jain",
      phone: "+91-9876543237",
      relation: "Father"
    }
  },
  {
    name: "Suresh Kumar",
    email: "suresh.kumar@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543238",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Laxmi Kumar",
      phone: "+91-9876543239",
      relation: "Wife"
    }
  },
  {
    name: "Meera Iyer",
    email: "meera.iyer@gmail.com",
    password: "Tourist@123456",
    phone: "+91-9876543240",
    role: "tourist",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    kycVerified: true,
    phoneVerified: true,
    emailVerified: true,
    isActive: true,
    emergencyContact: {
      name: "Venkat Iyer",
      phone: "+91-9876543241",
      relation: "Husband"
    }
  }
];

export const seedUsers = async () => {
  try {
    console.log('🌱 Seeding users data...');
    
    // Clear existing users
    await User.deleteMany({});
    
    // Insert users data
    const createdUsers = await User.insertMany(realUsersData);
    
    console.log(`✅ Successfully seeded ${createdUsers.length} users`);
    console.log(`   • Admin users: ${createdUsers.filter(u => u.role === 'admin').length}`);
    console.log(`   • Vendor users: ${createdUsers.filter(u => u.role === 'vendor').length}`);
    console.log(`   • Tourist users: ${createdUsers.filter(u => u.role === 'tourist').length}`);
    
    return createdUsers;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

export default seedUsers;
