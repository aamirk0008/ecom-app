const express = require('express');
const { createProduct, fetchProducts, updateProduct, deleteProduct, searchProducts } = require('../controller/product.controller');
const router = express.Router();


router.post('/createProduct', createProduct)

router.get('/fetchProducts', fetchProducts)

router.put('/updateProduct/:id', updateProduct)

router.delete('/deleteProduct/:id', deleteProduct)

router.get('/search', searchProducts)











module.exports = router;