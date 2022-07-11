const { describe, it } = require('mocha');
const request = require('supertest');
const assert = require('assert');
const app = require('./api');

describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app).get('/contact').expect(200);

      assert.deepStrictEqual(response.text, 'Contact us page');
    });
  });
  
  describe('/contact', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app).get('/hi').expect(200);

      assert.deepStrictEqual(response.text, 'Hello World!');
    });
  });
  
  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ userName: 'FelipeDias', password: '123' })
        .expect(200);

      assert.deepStrictEqual(response.text, 'Login has succeeded!');
    });
    
    it('should unauthorize a request on the login route when using wrong credentials and return HTTP Status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ userName: 'FelipeDias', password: '1234' })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, 'Login has failed!');
    });
  });
});