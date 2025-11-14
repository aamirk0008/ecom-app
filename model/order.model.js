const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', 
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    shippingAddress: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;