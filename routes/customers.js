const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Retrieve a list of customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', (req, res) => {
  // ...existing code...
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Retrieve a single customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: A single customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:id', (req, res) => {
  // ...existing code...
});

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Register a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The registered customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', (req, res) => {
  // ...existing code...
});

/**
 * @swagger
 * /customers/{id}/orders:
 *   get:
 *     summary: Retrieve orders for a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: A list of orders for the customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/:id/orders', (req, res) => {
  // ...existing code...
});

module.exports = router;
