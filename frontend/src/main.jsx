import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { testAPIConnection } from './utils/apiTest.js'

// Make API test function available globally for debugging
if (typeof window !== 'undefined') {
  window.testAPIConnection = testAPIConnection
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

