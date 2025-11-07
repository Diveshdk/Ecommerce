const express = require('express');
const router = express.Router();

//controller
const {createProduct, getAllProducts, getDetailsOfProduct, updatingProduct, deleteProduct} = require('../controller/product.controller');

//middleware
const {auth, isProducer} = require('../middleware/auth.middleware')

// Required endpoint for assignment
router.get('/products', getAllProducts);

// Existing routes (optional for admin/producer functionality)
router.post('/create/product', auth, isProducer, createProduct);
router.get('/get/product/:id', auth, getDetailsOfProduct);
router.put('/update/product/:id', auth, isProducer, updatingProduct);
router.delete('/delete/product/:id', auth, isProducer, deleteProduct);

module.exports = router;