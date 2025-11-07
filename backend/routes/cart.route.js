const express = require('express');
const router = express.Router();

//controller
const {addToCart, removeFromCart, getCart, checkout} = require('../controller/cart.controller');

// Required endpoints for assignment (no auth for simplicity)
router.post('/cart', addToCart);
router.delete('/cart/:id', removeFromCart);
router.get('/cart', getCart);
router.post('/checkout', checkout);

module.exports = router;