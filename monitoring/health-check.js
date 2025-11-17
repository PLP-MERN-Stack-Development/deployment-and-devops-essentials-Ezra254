/**
 * Health Check Script
 * This script can be used to monitor your API health
 * Run with: node monitoring/health-check.js
 */

const API_URL = process.env.API_URL || 'http://localhost:5000';

async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json();
    
    if (response.ok && data.status === 'OK') {
      console.log('✅ API is healthy');
      console.log('Status:', data.status);
      console.log('Timestamp:', data.timestamp);
      console.log('Uptime:', Math.floor(data.uptime), 'seconds');
      console.log('Environment:', data.environment);
      process.exit(0);
    } else {
      console.error('❌ API health check failed');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error checking API health:', error.message);
    process.exit(1);
  }
}

checkHealth();

