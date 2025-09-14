#!/usr/bin/env node

/**
 * Environment Setup Script for Yatra Backend
 * This script helps you create the .env file with proper configuration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const envTemplate = `# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/yatra_db

# Redis Configuration (Optional)
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# JWT Configuration
JWT_SECRET=yatra_jwt_secret_key_2024_super_secure_development_only_secure
JWT_EXPIRES_IN=7d

# RapidAPI Configuration - Get your key from https://rapidapi.com/
RAPIDAPI_KEY={RAPIDAPI_KEY}
RAPIDAPI_BASE_URL=https://booking-com.p.rapidapi.com/v1
RAPIDAPI_HOST=booking-com.p.rapidapi.com

# Frontend URL
FRONTEND_URL=http://localhost:5173

# CORS Configuration
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
`;

async function setupEnvironment() {
  console.log('🏨 Yatra Backend Environment Setup');
  console.log('=====================================\n');

  console.log('This script will help you set up the .env file for the Yatra backend.');
  console.log('You can get a free RapidAPI key from: https://rapidapi.com/\n');

  const rapidApiKey = await question('Enter your RapidAPI key (or press Enter to skip): ');
  
  let finalEnv = envTemplate;
  
  if (rapidApiKey.trim()) {
    finalEnv = finalEnv.replace('{RAPIDAPI_KEY}', rapidApiKey.trim());
    console.log('✅ RapidAPI key configured');
  } else {
    finalEnv = finalEnv.replace('{RAPIDAPI_KEY}', 'your_rapidapi_key_here');
    console.log('⚠️  No RapidAPI key provided - you can add it later to the .env file');
  }

  const envPath = path.join(__dirname, '.env');
  
  try {
    fs.writeFileSync(envPath, finalEnv);
    console.log('\n✅ .env file created successfully!');
    console.log(`📁 Location: ${envPath}`);
    
    if (!rapidApiKey.trim()) {
      console.log('\n📝 Next steps:');
      console.log('1. Get a free RapidAPI key from https://rapidapi.com/');
      console.log('2. Edit the .env file and replace "your_rapidapi_key_here" with your actual key');
      console.log('3. Run "npm start" to start the backend server');
    } else {
      console.log('\n🚀 Ready to go! Run "npm start" to start the backend server');
    }
    
    console.log('\n📚 For more help, see: HOTEL_API_SETUP.md');
    
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }

  rl.close();
}

// Run the setup
setupEnvironment().catch(console.error);
