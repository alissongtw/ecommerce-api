const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const customersRouter = require('../routes/customers');

const app = express();
app.use(bodyParser.json());
app.use('/customers', customersRouter);

describe('Customers API', () => {
  it('should retrieve a list of customers', async () => {
    const res = await request(app).get('/customers');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should retrieve a single customer by ID', async () => {
    const res = await request(app).get('/customers/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should register a new customer', async () => {
    const newCustomer = { name: 'Test Customer', email: 'test@example.com' };
    const res = await request(app).post('/customers').send(newCustomer);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should retrieve orders for a customer by ID', async () => {
    const res = await request(app).get('/customers/1/orders');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
