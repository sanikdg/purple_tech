const express = require('express');
const morgan = require('morgan');
const corsMiddleware = require('./config/cors');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');
const routes = require('./routes');

const app = express();

// Core middleware
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
