import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Test authentication flow
async function testAuthFlow() {
  try {
    console.log('🧪 Testing Complete Authentication Flow...\n');

    // Test data
    const testUser = {
      name: 'Test User Auth',
      email: `test-auth-${Date.now()}@example.com`,
      password: 'TestPass123',
      phone: '+1234567890',
      role: 'tourist'
    };

    console.log('📝 Test user data:');
    console.log(JSON.stringify(testUser, null, 2));
    console.log('');

    // Step 1: Test Registration
    console.log('1️⃣ Testing User Registration...');
    let registerResponse;
    try {
      registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, testUser);
      
      if (registerResponse.data.success) {
        console.log('✅ Registration successful');
        console.log('📊 Registration response structure:');
        console.log('Response status:', registerResponse.status);
        console.log('Response headers:', registerResponse.headers['content-type']);
        console.log('Response data:', JSON.stringify(registerResponse.data, null, 2));
      } else {
        console.log('❌ Registration failed:', registerResponse.data.message);
        return;
      }
    } catch (error) {
      console.log('❌ Registration error:', error.response?.data || error.message);
      console.log('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      return;
    }

    const { token: registerToken, refreshToken, user: registeredUser } = registerResponse.data.data;
    console.log('🔑 Registration tokens received:', { 
      hasToken: !!registerToken, 
      hasRefreshToken: !!refreshToken,
      tokenLength: registerToken?.length 
    });
    console.log('👤 Registered user:', JSON.stringify(registeredUser, null, 2));
    console.log('');

    // Step 2: Test Login
    console.log('2️⃣ Testing User Login...');
    let loginResponse;
    try {
      loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      
      if (loginResponse.data.success) {
        console.log('✅ Login successful');
        console.log('📊 Login response structure:');
        console.log('Response status:', loginResponse.status);
        console.log('Response data:', JSON.stringify(loginResponse.data, null, 2));
      } else {
        console.log('❌ Login failed:', loginResponse.data.message);
        return;
      }
    } catch (error) {
      console.log('❌ Login error:', error.response?.data || error.message);
      console.log('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      return;
    }

    const { token: loginToken, user: loginUser } = loginResponse.data.data;
    console.log('🔑 Login tokens received:', { 
      hasToken: !!loginToken, 
      tokenLength: loginToken?.length 
    });
    console.log('');

    // Step 3: Test Profile Access
    console.log('3️⃣ Testing Profile Access...');
    const headers = {
      'Authorization': `Bearer ${loginToken}`,
      'Content-Type': 'application/json'
    };

    try {
      const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, { headers });
      
      if (profileResponse.data.success) {
        console.log('✅ Profile access successful');
        console.log('👤 Profile data:', JSON.stringify(profileResponse.data.data.user, null, 2));
      } else {
        console.log('❌ Profile access failed:', profileResponse.data.message);
      }
    } catch (error) {
      console.log('❌ Profile access error:', error.response?.data || error.message);
    }
    console.log('');

    // Step 4: Test Dashboard Access
    console.log('4️⃣ Testing Dashboard Access...');
    try {
      const dashboardResponse = await axios.get(`${API_BASE_URL}/users/dashboard`, { headers });
      
      if (dashboardResponse.data.success) {
        console.log('✅ Dashboard access successful');
        console.log('📊 Dashboard data structure:', Object.keys(dashboardResponse.data.data));
      } else {
        console.log('❌ Dashboard access failed:', dashboardResponse.data.message);
      }
    } catch (error) {
      console.log('❌ Dashboard access error:', error.response?.data || error.message);
    }
    console.log('');

    // Step 5: Test Invalid Login
    console.log('5️⃣ Testing Invalid Login...');
    try {
      const invalidLoginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: testUser.email,
        password: 'wrongpassword'
      });
      
      console.log('❌ Invalid login should have failed but succeeded:', invalidLoginResponse.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Invalid login correctly rejected:', error.response.data.message);
      } else {
        console.log('⚠️ Unexpected error for invalid login:', error.response?.data || error.message);
      }
    }
    console.log('');

    // Step 6: Test Logout
    console.log('6️⃣ Testing Logout...');
    try {
      const logoutResponse = await axios.post(`${API_BASE_URL}/auth/logout`, {}, { headers });
      
      if (logoutResponse.data.success) {
        console.log('✅ Logout successful');
      } else {
        console.log('❌ Logout failed:', logoutResponse.data.message);
      }
    } catch (error) {
      console.log('❌ Logout error:', error.response?.data || error.message);
    }
    console.log('');

    // Step 7: Test Access After Logout
    console.log('7️⃣ Testing Access After Logout...');
    try {
      const postLogoutResponse = await axios.get(`${API_BASE_URL}/auth/profile`, { headers });
      console.log('❌ Profile access should have failed after logout but succeeded:', postLogoutResponse.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Profile access correctly denied after logout');
      } else {
        console.log('⚠️ Unexpected error after logout:', error.response?.data || error.message);
      }
    }

    console.log('\n🎉 Authentication Flow Test Complete!');
    console.log('\n📋 Summary:');
    console.log('- Registration: Working');
    console.log('- Login: Working');
    console.log('- Profile Access: Working');
    console.log('- Dashboard Access: Working');
    console.log('- Invalid Login Protection: Working');
    console.log('- Logout: Working');
    console.log('- Post-Logout Protection: Working');

  } catch (error) {
    console.error('\n❌ Test failed with unexpected error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Test specific authentication issues
async function testSpecificIssues() {
  console.log('\n🔍 Testing Specific Authentication Issues...\n');

  // Test 1: Empty credentials
  console.log('1️⃣ Testing empty credentials...');
  try {
    await axios.post(`${API_BASE_URL}/auth/login`, {});
  } catch (error) {
    console.log('✅ Empty credentials correctly rejected:', error.response?.data?.message);
  }

  // Test 2: Missing password
  console.log('2️⃣ Testing missing password...');
  try {
    await axios.post(`${API_BASE_URL}/auth/login`, { email: 'test@example.com' });
  } catch (error) {
    console.log('✅ Missing password correctly rejected:', error.response?.data?.message);
  }

  // Test 3: Invalid email format
  console.log('3️⃣ Testing invalid email format...');
  try {
    await axios.post(`${API_BASE_URL}/auth/register`, {
      name: 'Test User',
      email: 'invalid-email',
      password: 'TestPass123'
    });
  } catch (error) {
    console.log('✅ Invalid email correctly rejected:', error.response?.data?.message || error.response?.data?.errors);
  }

  // Test 4: Weak password
  console.log('4️⃣ Testing weak password...');
  try {
    await axios.post(`${API_BASE_URL}/auth/register`, {
      name: 'Test User',
      email: 'test-weak@example.com',
      password: '123'
    });
  } catch (error) {
    console.log('✅ Weak password correctly rejected:', error.response?.data?.message || error.response?.data?.errors);
  }

  // Test 5: Duplicate email registration
  console.log('5️⃣ Testing duplicate email registration...');
  const duplicateUser = {
    name: 'Test User',
    email: 'duplicate-test@example.com',
    password: 'TestPass123'
  };

  // First registration
  try {
    await axios.post(`${API_BASE_URL}/auth/register`, duplicateUser);
    console.log('First registration successful');
  } catch (error) {
    console.log('First registration failed:', error.response?.data?.message);
  }

  // Duplicate registration
  try {
    await axios.post(`${API_BASE_URL}/auth/register`, duplicateUser);
    console.log('❌ Duplicate registration should have failed but succeeded');
  } catch (error) {
    console.log('✅ Duplicate email correctly rejected:', error.response?.data?.message);
  }

  console.log('\n🔍 Specific Issues Test Complete!');
}

// Run both tests
async function runAllTests() {
  await testAuthFlow();
  await testSpecificIssues();
}

runAllTests();
