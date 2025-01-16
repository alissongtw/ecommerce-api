# Ecommerce API

## Overview
The Ecommerce API allows you to manage products, orders, and customers for an online store. It provides endpoints to create, read, update, and delete resources.

## Installation
To install the Ecommerce API, clone the repository and install the dependencies:
```bash
git clone https://github.com/yourusername/ecommerce-api.git
cd ecommerce-api
npm install
```

## Usage
To start the server, run:
```bash
npm start
```
The server will start on `http://localhost:3000`.

## Web Interface
To access the web interface, open your browser and navigate to `http://localhost:3000`. The web interface provides a user-friendly way to interact with the API.

## Swagger
To access the Swagger UI, open your browser and navigate to `http://localhost:3000/api-docs`. The Swagger UI provides a way to interact with the API and view the available endpoints.

## Endpoints

### Products
- `GET /products` - Retrieve a list of products
- `GET /products/:id` - Retrieve a single product by ID
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product by ID
- `DELETE /products/:id` - Delete a product by ID

### Orders
- `GET /orders` - Retrieve a list of orders
- `GET /orders/:id` - Retrieve a single order by ID
- `POST /orders` - Create a new order
- `PUT /orders/:id` - Update an order by ID
- `DELETE /orders/:id` - Delete an order by ID

### Customers
- `GET /customers` - Retrieve a list of customers
- `GET /customers/:id` - Retrieve a single customer by ID
- `POST /customers` - Create a new customer
- `PUT /customers/:id` - Update a customer by ID
- `DELETE /customers/:id` - Delete a customer by ID

## License
This project is licensed under the MIT License.
