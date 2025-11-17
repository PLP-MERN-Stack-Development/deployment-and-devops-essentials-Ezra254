/**
 * API Connection Test Utility
 * Run this in browser console to test API connectivity
 */

export const testAPIConnection = async () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const baseURL = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`
  
  console.log('🧪 Testing API Connection...')
  console.log('API URL:', baseURL)
  
  try {
    // Test 1: Health check
    console.log('\n1️⃣ Testing health endpoint...')
    const healthResponse = await fetch(`${baseURL.replace('/api', '')}/api/health`)
    const healthData = await healthResponse.json()
    console.log('✅ Health check:', healthData)
    
    // Test 2: Get tasks
    console.log('\n2️⃣ Testing GET /tasks...')
    const tasksResponse = await fetch(`${baseURL}/tasks`)
    const tasksData = await tasksResponse.json()
    console.log('✅ Get tasks:', tasksData)
    
    // Test 3: Create task
    console.log('\n3️⃣ Testing POST /tasks...')
    const createResponse = await fetch(`${baseURL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Task',
        description: 'API connection test',
        status: 'pending',
        priority: 'medium'
      })
    })
    
    if (!createResponse.ok) {
      const errorData = await createResponse.text()
      console.error('❌ Create task failed:', {
        status: createResponse.status,
        statusText: createResponse.statusText,
        error: errorData
      })
    } else {
      const createData = await createResponse.json()
      console.log('✅ Create task:', createData)
    }
    
    console.log('\n✅ All API tests completed!')
    
  } catch (error) {
    console.error('❌ API Test Error:', error)
    console.error('\n🔍 Troubleshooting:')
    console.error('1. Check if backend is running')
    console.error('2. Verify VITE_API_URL environment variable')
    console.error('3. Check CORS settings in backend')
    console.error('4. Check browser console Network tab')
  }
}

// Make it available globally for easy testing
if (typeof window !== 'undefined') {
  window.testAPIConnection = testAPIConnection
}

