const express = require('express')
const { placeOrder, cancelOrder, trackOrder, getAllOrders } = require('../controller/order.controller')
const router = express.Router()



router.post('/place/:id', placeOrder)

router.put('/cancel/:id', cancelOrder)

router.get('/track/:id', trackOrder)

router.get('/orders', getAllOrders )
 





module.exports = router