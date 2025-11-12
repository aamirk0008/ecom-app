const express = require('express');
const { createProduct, fetchProducts } = require('../controller/product.controller');
const router = express.Router();


router.post('/createProduct', createProduct)

router.get('/fetchProducts', fetchProducts)











module.exports = router;