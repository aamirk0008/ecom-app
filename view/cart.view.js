const express = require('express');
const { addToCart, deleteFromCart, getCartItems } = require('../controller/cart.controller');
const router = express.Router();


router.post('/addToCart/:id', addToCart)

router.delete('/deleteFromCart/:id', deleteFromCart)

router.get('/getCartItems/:id', getCartItems)



module.exports = router;