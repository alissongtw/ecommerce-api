const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('../routes/products');

const app = express();
app.use(bodyParser.json());
app.use('/products', productsRouter);

describe('Products API', () => {
  it('should retrieve a list of products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should retrieve a single product by ID', async () => {
    const res = await request(app).get('/products/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should create a new product', async () => {
    const newProduct = { name: 'Test Product', price: 100 };
    const res = await request(app).post('/products').send(newProduct);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a product by ID', async () => {
    const updatedProduct = { name: 'Updated Product', price: 150 };
    const res = await request(app).put('/products/1').send(updatedProduct);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should delete a product by ID', async () => {
    const res = await request(app).delete('/products/1');
    expect(res.statusCode).toEqual(204);
  });
});
