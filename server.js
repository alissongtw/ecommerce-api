const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const serveStatic = require('serve-static');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const logger = require('./logger');

const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const customersRouter = require('./routes/customers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('combined', { stream: logger.stream.write }));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: 'Ecommerce API documentation'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ]
  },
  apis: ['./routes/*.js'] // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve static files for the web interface
app.use(serveStatic(path.join(__dirname, 'public')));

// Register routes
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/customers', customersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
