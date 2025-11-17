import axios from 'axios'

// Get API URL from environment variable
let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Ensure API_URL doesn't have trailing slash
API_URL = API_URL.replace(/\/$/, '')

// Ensure API_URL includes /api path
if (!API_URL.endsWith('/api')) {
  API_URL = `${API_URL}/api`
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // Enhanced error handling
    let message = 'An error occurred'
    
    if (error.response) {
      // Server responded with error status
      message = error.response.data?.error || error.response.data?.message || `Server error: ${error.response.status}`
      
      // Log full error in development
      if (import.meta.env.DEV) {
        console.error('API Error Response:', {
          status: error.response.status,
          data: error.response.data,
          url: error.config?.url,
          baseURL: error.config?.baseURL
        })
      }
    } else if (error.request) {
      // Request made but no response received
      message = 'Network error: Could not reach the server. Please check your connection and try again.'
      console.error('API Network Error:', error.request)
    } else {
      // Error setting up request
      message = error.message || 'An unexpected error occurred'
      console.error('API Error:', error.message)
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

