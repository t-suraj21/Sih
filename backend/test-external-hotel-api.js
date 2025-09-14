#!/usr/bin/env node

// Test script for External Hotel API integration
import { externalHotelApiService } from './src/services/externalHotelApi.service.js';

async function testExternalHotelApi() {
  console.log('🚀 Testing External Hotel API Integration...\n');

  // Test 1: Search hotels for London
  console.log('1. Testing hotel search for London:');
  console.log('=====================================');
  try {
    const searchResult = await externalHotelApiService.searchHotels('london');
    console.log(`✅ Search Result: ${searchResult.success ? 'SUCCESS' : 'FAILED'}`);
    console.log(`📊 Hotels found: ${searchResult.total}`);
    console.log(`📍 Data source: ${searchResult.source}`);
    
    if (searchResult.success && searchResult.data.length > 0) {
      const firstHotel = searchResult.data[0];
      console.log(`🏨 First hotel: ${firstHotel.name}`);
      console.log(`💰 Price: ₹${firstHotel.price}`);
      console.log(`⭐ Rating: ${firstHotel.rating}`);
      console.log(`📍 Location: ${firstHotel.city}, ${firstHotel.state}`);
    }
  } catch (error) {
    console.error('❌ Search test failed:', error.message);
  }

  console.log('\n');

  // Test 2: Get hotel details
  console.log('2. Testing hotel details retrieval:');
  console.log('===================================');
  try {
    // First search to get a hotel ID
    const searchResult = await externalHotelApiService.searchHotels('london');
    
    if (searchResult.success && searchResult.data.length > 0) {
      const hotelId = searchResult.data[0]._id;
      console.log(`🔍 Testing details for hotel ID: ${hotelId}`);
      
      const detailsResult = await externalHotelApiService.getHotelDetails(hotelId, 'london');
      console.log(`✅ Details Result: ${detailsResult.success ? 'SUCCESS' : 'FAILED'}`);
      
      if (detailsResult.success) {
        const hotel = detailsResult.data;
        console.log(`🏨 Hotel: ${hotel.name}`);
        console.log(`📧 Contact: ${hotel.contact?.email}`);
        console.log(`📞 Phone: ${hotel.contact?.phone}`);
        console.log(`🛎️ Amenities: ${hotel.amenities?.join(', ')}`);
      }
    } else {
      console.log('⚠️ Skipping details test - no hotels found in search');
    }
  } catch (error) {
    console.error('❌ Details test failed:', error.message);
  }

  console.log('\n');

  // Test 3: Test fallback functionality
  console.log('3. Testing fallback functionality:');
  console.log('==================================');
  try {
    // Test with a city that might not exist in the external API
    const fallbackResult = await externalHotelApiService.searchHotels('nonexistentcity');
    console.log(`✅ Fallback Result: ${fallbackResult.success ? 'SUCCESS' : 'FAILED'}`);
    console.log(`📊 Fallback hotels: ${fallbackResult.total}`);
    console.log(`📍 Data source: ${fallbackResult.source}`);
    
    if (fallbackResult.success && fallbackResult.data.length > 0) {
      const fallbackHotel = fallbackResult.data[0];
      console.log(`🏨 Fallback hotel: ${fallbackHotel.name}`);
      console.log(`💰 Price: ₹${fallbackHotel.price}`);
    }
  } catch (error) {
    console.error('❌ Fallback test failed:', error.message);
  }

  console.log('\n');

  // Test 4: Test multiple cities
  console.log('4. Testing multiple cities:');
  console.log('===========================');
  const testCities = ['mumbai', 'delhi', 'bangalore', 'chennai'];
  
  for (const city of testCities) {
    try {
      console.log(`🔍 Testing ${city}...`);
      const result = await externalHotelApiService.searchHotels(city);
      console.log(`  ✅ ${city}: ${result.success ? 'SUCCESS' : 'FAILED'} - ${result.total} hotels`);
    } catch (error) {
      console.log(`  ❌ ${city}: FAILED - ${error.message}`);
    }
  }

  console.log('\n🎉 External Hotel API Integration Test Complete!');
}

// Run the test
testExternalHotelApi().catch(console.error);
