import mongoose from 'mongoose';
import { connectMongoDB } from '../../config/database.js';
import { config } from '../../config/config.js';

// Import seed functions
import seedHotels from './hotels.seed.js';
import seedDestinations from './destinations.seed.js';
import seedUsers from './users.seed.js';
import seedAttractions from './attractions.seed.js';
import seedReviews from './reviews.seed.js';
import { seedEcoTourism } from './ecotourism.seed.js';
import { seedServices } from './services.seed.js';
import seedPackages from './packages.seed.js';

const runAllSeeds = async () => {
  try {
    console.log('🌱 Starting database seeding process...');
    console.log('=====================================\n');

    // Connect to MongoDB
    await connectMongoDB();
    console.log('✅ Connected to MongoDB\n');

    // Run seeds in order (respecting dependencies)
    console.log('1️⃣ Seeding users...');
    const users = await seedUsers();
    console.log(`✅ Seeded ${users.length} users\n`);

    console.log('2️⃣ Seeding destinations...');
    const destinations = await seedDestinations();
    console.log(`✅ Seeded ${destinations.length} destinations\n`);

    console.log('3️⃣ Seeding attractions...');
    const attractions = await seedAttractions(destinations);
    console.log(`✅ Seeded ${attractions.length} attractions\n`);

    console.log('4️⃣ Seeding hotels...');
    const hotels = await seedHotels();
    console.log(`✅ Seeded ${hotels.length} hotels\n`);

    console.log('5️⃣ Seeding reviews...');
    const reviews = await seedReviews(hotels, attractions);
    console.log(`✅ Seeded ${reviews.length} reviews\n`);

    console.log('6️⃣ Seeding eco-tourism options...');
    const ecoTourism = await seedEcoTourism();
    console.log(`✅ Seeded ${ecoTourism.length} eco-tourism options\n`);

    console.log('7️⃣ Seeding services...');
    const services = await seedServices();
    console.log(`✅ Seeded ${services.length} services\n`);

    console.log('8️⃣ Seeding packages...');
    const packages = await seedPackages();
    console.log(`✅ Seeded ${packages.length} packages\n`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('=====================================');
    console.log(`📊 Summary:`);
    console.log(`   • Users: ${users.length}`);
    console.log(`   • Destinations: ${destinations.length}`);
    console.log(`   • Attractions: ${attractions.length}`);
    console.log(`   • Hotels: ${hotels.length}`);
    console.log(`   • Reviews: ${reviews.length}`);
    console.log(`   • Eco-Tourism: ${ecoTourism.length}`);
    console.log(`   • Services: ${services.length}`);
    console.log(`   • Packages: ${packages.length}`);
    console.log('=====================================\n');

    console.log('🚀 Your Yatra database is now ready with real data!');
    console.log('   Start the backend server with: npm start');
    console.log('   Start the frontend with: cd yatrafrontend && npm run dev');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('📝 Database connection closed');
  }
};

// Run seeds if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllSeeds();
}

export default runAllSeeds;
