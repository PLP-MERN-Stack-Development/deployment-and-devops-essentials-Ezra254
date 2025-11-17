import axios from 'axios'

// Get API URL from environment variable
let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Ensure API_URL doesn't have trailing slash
API_URL = API_URL.replace(/\/$/, '')

// Ensure API_URL includes /api path
if (!API_URL.endsWith('/api')) {
  API_URL = `${API_URL}/api`
}

// Log API URL configuration (helpful for debugging)
console.log('🔧 API Configuration:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  finalAPI_URL: API_URL,
  environment: import.meta.env.MODE
})

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Log request in both dev and production for debugging
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
      data: config.data,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`
    })
    return config
  },
  (error) => {
    console.error('❌ Request setup error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.data)
    return response.data
  },
  (error) => {
    // Enhanced error handling with detailed logging
    let message = 'An error occurred'
    let errorDetails = {}
    
    if (error.response) {
      // Server responded with error status
      errorDetails = {
        type: 'Server Error',
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: `${error.config?.baseURL}${error.config?.url}`,
        method: error.config?.method?.toUpperCase()
      }
      
      message = error.response.data?.error || 
                error.response.data?.message || 
                `Server error (${error.response.status}): ${error.response.statusText}`
      
      console.error('❌ API Server Error:', errorDetails)
      
    } else if (error.request) {
      // Request made but no response received (Network Error)
      errorDetails = {
        type: 'Network Error',
        message: 'No response received from server',
        url: `${error.config?.baseURL}${error.config?.url}`,
        method: error.config?.method?.toUpperCase(),
        possibleCauses: [
          'Backend server is down or not accessible',
          'CORS policy blocking the request',
          'Network connectivity issue',
          'Backend URL is incorrect',
          'Render free tier service may have spun down (wait 30 seconds)'
        ]
      }
      
      message = `Network error: Could not reach the server at ${error.config?.baseURL}${error.config?.url}. ` +
                `Please check: 1) Backend is running, 2) CORS is configured, 3) URL is correct.`
      
      console.error('❌ API Network Error:', errorDetails)
      console.error('Full error object:', error)
      
    } else {
      // Error setting up request
      errorDetails = {
        type: 'Request Setup Error',
        message: error.message
      }
      message = error.message || 'An unexpected error occurred'
      console.error('❌ API Request Setup Error:', errorDetails)
    }
    
    return Promise.reject(new Error(message))
  }
)

export const taskService = {
  getAll: (params = {}) => api.get('/tasks', { params }),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
  getStats: () => api.get('/tasks/stats'),
}

export default api

