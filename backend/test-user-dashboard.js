import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Test user credentials (you can use any existing user)
const testCredentials = {
  email: 'test@example.com',
  password: 'password123'
};

async function testUserDashboard() {
  try {
    console.log('🧪 Testing User Dashboard Integration...\n');

    // Step 1: Login to get token
    console.log('1️⃣ Logging in...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, testCredentials);
    
    if (!loginResponse.data.success) {
      console.log('❌ Login failed. Creating test user first...');
      
      // Create test user
      const registerData = {
        name: 'Test User',
        email: testCredentials.email,
        password: testCredentials.password,
        phone: '+1234567890',
        role: 'tourist'
      };
      
      const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, registerData);
      
      if (registerResponse.data.success) {
        console.log('✅ Test user created successfully');
      } else {
        console.error('❌ Failed to create test user:', registerResponse.data.message);
        return;
      }
    } else {
      console.log('✅ Login successful');
    }

    const token = loginResponse.data.data?.token || 
                  (await axios.post(`${API_BASE_URL}/auth/login`, testCredentials)).data.data.token;

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Step 2: Test user dashboard endpoint
    console.log('\n2️⃣ Testing user dashboard endpoint...');
    const dashboardResponse = await axios.get(`${API_BASE_URL}/users/dashboard`, { headers });
    
    if (dashboardResponse.data.success) {
      console.log('✅ Dashboard endpoint working');
      console.log('📊 Dashboard data structure:');
      console.log(JSON.stringify(dashboardResponse.data.data, null, 2));
    } else {
      console.error('❌ Dashboard endpoint failed:', dashboardResponse.data.message);
    }

    // Step 3: Test user profile endpoint
    console.log('\n3️⃣ Testing user profile endpoint...');
    const profileResponse = await axios.get(`${API_BASE_URL}/users/profile`, { headers });
    
    if (profileResponse.data.success) {
      console.log('✅ Profile endpoint working');
      console.log('👤 User profile data:');
      console.log(JSON.stringify(profileResponse.data.data.user, null, 2));
    } else {
      console.error('❌ Profile endpoint failed:', profileResponse.data.message);
    }

    // Step 4: Test profile update endpoint
    console.log('\n4️⃣ Testing profile update endpoint...');
    const updateData = {
      name: 'Test User Updated',
      location: 'Test City'
    };
    
    const updateResponse = await axios.put(`${API_BASE_URL}/users/profile`, updateData, { headers });
    
    if (updateResponse.data.success) {
      console.log('✅ Profile update endpoint working');
      console.log('📝 Updated profile data:');
      console.log(JSON.stringify(updateResponse.data.data.user, null, 2));
    } else {
      console.error('❌ Profile update endpoint failed:', updateResponse.data.message);
    }

    // Step 5: Test bookings endpoint
    console.log('\n5️⃣ Testing user bookings endpoint...');
    const bookingsResponse = await axios.get(`${API_BASE_URL}/bookings`, { headers });
    
    if (bookingsResponse.data.success) {
      console.log('✅ Bookings endpoint working');
      console.log('🏨 User bookings:');
      console.log(JSON.stringify(bookingsResponse.data.data, null, 2));
    } else {
      console.error('❌ Bookings endpoint failed:', bookingsResponse.data.message);
    }

    console.log('\n🎉 User Dashboard Integration Test Complete!');

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testUserDashboard();
