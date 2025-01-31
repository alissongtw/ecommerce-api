const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const ordersRouter = require('../routes/orders');

const app = express();
app.use(bodyParser.json());
app.use('/orders', ordersRouter);

describe('Orders API', () => {
  it('should retrieve a list of orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should retrieve a single order by ID', async () => {
    const res = await request(app).get('/orders/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should create a new order', async () => {
    const newOrder = { productId: 1, quantity: 2 };
    const res = await request(app).post('/orders').send(newOrder);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should update an order by ID', async () => {
    const updatedOrder = { productId: 1, quantity: 3 };
    const res = await request(app).put('/orders/1').send(updatedOrder);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should delete an order by ID', async () => {
    const res = await request(app).delete('/orders/1');
    expect(res.statusCode).toEqual(204);
  });
});
