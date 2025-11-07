const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();

//********middleware*******
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//********routes**********
const cartRoutes = require('./routes/cart.route');
const productRoutes = require('./routes/product.route')

// Main API routes for the assignment
app.use('/api', cartRoutes);
app.use('/api', productRoutes);

module.exports = app;