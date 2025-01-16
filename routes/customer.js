const express = require('express');
const router = express.Router();
const db = require('../models/customer');

// Register a new customer
router.post('/', (req, res) => {
    const { name, email, address } = req.body;
    if (!name || !email || !address) {
        return res.status(400).send({ error: 'All fields are required' });
    }
    db.run(`INSERT INTO customers (name, email, address) VALUES (?, ?, ?)`, [name, email, address], function(err) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(201).send({ id: this.lastID, name, email, address });
    });
});

// View customer's orders
router.get('/:customer_id/orders', (req, res) => {
    const customerId = req.params.customer_id;
    db.all(`SELECT * FROM orders WHERE customer_id = ?`, [customerId], (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(rows);
    });
});

module.exports = router;
