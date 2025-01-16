const express = require('express');
const router = express.Router();
const db = require('../models/order');

// Create an order
router.post('/', (req, res) => {
    const { customer_id, products, total } = req.body;
    if (!customer_id || !products || !total) {
        return res.status(400).send({ error: 'All fields are required' });
    }
    db.run(`INSERT INTO orders (customer_id, total) VALUES (?, ?)`, [customer_id, total], function(err) {
        if (err) {
            return res.status(400).send(err);
        }
        const orderId = this.lastID;
        const orderProducts = products.map(product => [orderId, product.id]);
        db.run(`INSERT INTO order_products (order_id, product_id) VALUES ${orderProducts.map(() => '(?, ?)').join(', ')}`, [].concat(...orderProducts), function(err) {
            if (err) {
                return res.status(400).send(err);
            }
            res.status(201).send({ orderId, total, success: true });
        });
    });
});

module.exports = router;
