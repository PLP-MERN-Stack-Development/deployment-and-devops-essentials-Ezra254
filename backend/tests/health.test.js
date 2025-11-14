const request = require('supertest');
const app = require('../server');

describe('Health Check Endpoints', () => {
  test('GET /health should return 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('message', 'OK');
  });

  test('GET /health/ready should return status', async () => {
    const response = await request(app).get('/health/ready');
    expect([200, 503]).toContain(response.statusCode);
    expect(response.body).toHaveProperty('status');
  });

  test('GET /health/live should return alive', async () => {
    const response = await request(app).get('/health/live');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'alive');
  });
});

