const request = require('supertest');
const app = require('../app');

describe('Product Endpoints', () => {
    it('should create a new product', async () => {
        const res = await request(app)
            .post('/products')
            .send({
                name: 'Test Product',
                description: 'Test Description',
                price: 100,
                stock: 10
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should fetch all products', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should fetch a single product by ID', async () => {
        const res = await request(app).get('/products/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should update a product by ID', async () => {
        const res = await request(app)
            .put('/products/1')
            .send({
                name: 'Updated Product',
                description: 'Updated Description',
                price: 150,
                stock: 5
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should delete a product by ID', async () => {
        const res = await request(app).delete('/products/1');
        expect(res.statusCode).toEqual(200);
    });
});
