#!/usr/bin/env node

/**
 * Hotel API Test Script
 * This script tests the hotel API integration to ensure it's working correctly
 */

import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const BASE_URL = process.env.FRONTEND_URL?.replace('5173', '3001') || 'http://localhost:3001';
const API_BASE = `${BASE_URL}/api`;

async function testHotelAPI() {
  console.log('🏨 Testing Hotel API Integration');
  console.log('================================\n');

  // Test 1: Basic hotel search
  console.log('Test 1: Basic Hotel Search (Mumbai)');
  try {
    const response = await axios.get(`${API_BASE}/hotels/search`, {
      params: {
        destination: 'Mumbai',
        guests: 2,
        rooms: 1
      },
      timeout: 10000
    });

    const data = response.data;
    console.log(`✅ Status: ${response.status}`);
    console.log(`📊 Hotels found: ${data.data?.hotels?.length || 0}`);
    console.log(`🔗 API Source: ${data.data?.apiInfo?.source || 'Unknown'}`);
    console.log(`🌐 API Results: ${data.data?.apiInfo?.totalApiResults || 0}`);
    console.log(`🏠 Local Results: ${data.data?.apiInfo?.totalLocalResults || 0}`);
    
    if (data.data?.hotels?.length > 0) {
      const firstHotel = data.data.hotels[0];
      console.log(`🏨 Sample Hotel: ${firstHotel.name}`);
      console.log(`💰 Price: ₹${firstHotel.pricePerNight || 'N/A'}`);
      console.log(`⭐ Rating: ${firstHotel.rating || 'N/A'}`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Message: ${error.response.data?.message || 'Unknown error'}`);
    }
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Search with filters
  console.log('Test 2: Hotel Search with Filters (Goa)');
  try {
    const response = await axios.get(`${API_BASE}/hotels/search`, {
      params: {
        destination: 'Goa',
        minPrice: 1000,
        maxPrice: 5000,
        rating: 4.0,
        guests: 2
      },
      timeout: 10000
    });

    const data = response.data;
    console.log(`✅ Status: ${response.status}`);
    console.log(`📊 Filtered hotels: ${data.data?.hotels?.length || 0}`);
    console.log(`🔗 API Source: ${data.data?.apiInfo?.source || 'Unknown'}`);
    
    if (data.data?.hotels?.length > 0) {
      const hotels = data.data.hotels;
      const avgPrice = hotels.reduce((sum, h) => sum + (h.pricePerNight || 0), 0) / hotels.length;
      const avgRating = hotels.reduce((sum, h) => sum + (h.rating || 0), 0) / hotels.length;
      console.log(`💰 Average Price: ₹${Math.round(avgPrice)}`);
      console.log(`⭐ Average Rating: ${avgRating.toFixed(1)}`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Check RapidAPI configuration
  console.log('Test 3: RapidAPI Configuration Check');
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  if (rapidApiKey && rapidApiKey !== 'your_rapidapi_key_here') {
    console.log('✅ RapidAPI key is configured');
    console.log(`🔑 Key starts with: ${rapidApiKey.substring(0, 8)}...`);
  } else {
    console.log('⚠️  RapidAPI key not configured or using placeholder');
    console.log('   The API will use fallback mock data');
    console.log('   To get real hotel data, configure your RapidAPI key in .env');
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 4: Server health check
  console.log('Test 4: Server Health Check');
  try {
    const response = await axios.get(`${BASE_URL}/health`, { timeout: 5000 });
    console.log('✅ Server is running and healthy');
    console.log(`📊 Environment: ${response.data.data?.environment || 'Unknown'}`);
    console.log(`⏱️  Uptime: ${Math.round(response.data.data?.uptime || 0)} seconds`);
  } catch (error) {
    console.log(`❌ Server health check failed: ${error.message}`);
    console.log('   Make sure the backend server is running on port 3001');
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Summary
  console.log('📋 Test Summary:');
  console.log('================');
  console.log('• If you see hotel results above, the API is working!');
  console.log('• If API Source shows "RapidAPI + Local", real data is active');
  console.log('• If API Source shows "Local Only", configure your RapidAPI key');
  console.log('• For help, see: HOTEL_API_SETUP.md');
  console.log('\n🎉 Happy hotel hunting!');
}

// Run the tests
testHotelAPI().catch(console.error);
