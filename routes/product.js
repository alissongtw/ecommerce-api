const express = require('express');
const router = express.Router();
const db = require('../models/product');

// Create a new product
router.post('/', (req, res) => {
    const { name, description, price, stock } = req.body;
    console.log('Creating a new product:', req.body);
    if (!name || !description || !price || !stock) {
        console.error('Validation error: All fields are required');
        return res.status(400).send({ error: 'All fields are required' });
    }
    db.run(`INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)`, [name, description, price, stock], function(err) {
        if (err) {
            console.error('Error inserting product:', err);
            return res.status(400).send(err);
        }
        console.log('Product created with ID:', this.lastID);
        res.status(201).send({ id: this.lastID, name, description, price, stock });
    });
});

// Get all products
router.get('/', (req, res) => {
    console.log('Fetching all products');
    db.all(`SELECT * FROM products`, [], (err, rows) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send(err);
        }
        res.status(200).send(rows);
    });
});

// Get a product by ID
router.get('/:id', (req, res) => {
    console.log('Fetching product with ID:', req.params.id);
    db.get(`SELECT * FROM products WHERE id = ?`, [req.params.id], (err, row) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).send(err);
        }
        if (!row) {
            console.warn('Product not found with ID:', req.params.id);
            return res.status(404).send();
        }
        res.status(200).send(row);
    });
});

// Update a product by ID
router.put('/:id', (req, res) => {
    const { name, description, price, stock } = req.body;
    console.log('Updating product with ID:', req.params.id, req.body);
    if (!name || !description || !price || !stock) {
        console.error('Validation error: All fields are required');
        return res.status(400).send({ error: 'All fields are required' });
    }
    db.run(`UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?`, [name, description, price, stock, req.params.id], function(err) {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(400).send(err);
        }
        if (this.changes === 0) {
            console.warn('Product not found with ID:', req.params.id);
            return res.status(404).send();
        }
        console.log('Product updated with ID:', req.params.id);
        res.status(200).send({ id: req.params.id, name, description, price, stock });
    });
});

// Delete a product by ID
router.delete('/:id', (req, res) => {
    console.log('Deleting product with ID:', req.params.id);
    db.run(`DELETE FROM products WHERE id = ?`, [req.params.id], function(err) {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).send(err);
        }
        if (this.changes === 0) {
            console.warn('Product not found with ID:', req.params.id);
            return res.status(404).send();
        }
        console.log('Product deleted with ID:', req.params.id);
        res.status(200).send();
    });
});

module.exports = router;
