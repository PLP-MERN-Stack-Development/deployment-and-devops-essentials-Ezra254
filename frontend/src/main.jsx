import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import and expose API test function for debugging
if (typeof window !== 'undefined') {
  import('./utils/apiTest.js').then(({ testAPIConnection }) => {
    window.testAPIConnection = testAPIConnection
    console.log('✅ API test function loaded. Run testAPIConnection() in console to test API.')
  }).catch(err => {
    console.warn('Could not load API test function:', err)
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

