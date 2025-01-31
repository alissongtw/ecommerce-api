const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a db module for database operations

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', async (req, res, next) => {
  try {
    const products = await db.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:id', async (req, res, next) => {
  try {
    const product = await db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await db.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/:id', async (req, res, next) => {
  try {
    const updatedProduct = await db.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       204:
 *         description: No content
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedProduct = await db.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
