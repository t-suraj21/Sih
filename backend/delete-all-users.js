import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import { connectMongoDB, closeDatabaseConnections } from './src/config/database.js';

dotenv.config();

const deleteAllUsers = async () => {
  try {
    console.log('🚀 Starting user deletion process...\n');
    
    // Connect to MongoDB
    await connectMongoDB();
    console.log('✅ Connected to MongoDB\n');
    
    // Count existing users
    const userCount = await User.countDocuments({});
    console.log(`📊 Found ${userCount} users in the database\n`);
    
    if (userCount === 0) {
      console.log('ℹ️  No users found. Database is already empty.\n');
      await closeDatabaseConnections();
      process.exit(0);
    }
    
    // Show breakdown by role
    const adminCount = await User.countDocuments({ role: 'admin' });
    const vendorCount = await User.countDocuments({ role: 'vendor' });
    const touristCount = await User.countDocuments({ role: 'tourist' });
    
    console.log('📋 User breakdown:');
    console.log(`   • Admin users: ${adminCount}`);
    console.log(`   • Vendor users: ${vendorCount}`);
    console.log(`   • Tourist users: ${touristCount}\n`);
    
    // Delete all users
    console.log('🗑️  Deleting all users...');
    const result = await User.deleteMany({});
    
    console.log(`✅ Successfully deleted ${result.deletedCount} users from the database\n`);
    
    // Verify deletion
    const remainingCount = await User.countDocuments({});
    if (remainingCount === 0) {
      console.log('✅ Verification: All users have been deleted successfully\n');
    } else {
      console.log(`⚠️  Warning: ${remainingCount} users still remain in the database\n`);
    }
    
    // Close database connection
    await closeDatabaseConnections();
    console.log('✅ Process completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error deleting users:', error);
    await closeDatabaseConnections();
    process.exit(1);
  }
};

// Run the script
deleteAllUsers();

