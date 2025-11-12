const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        products: [
            {
              productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
              },
              price: {
                type: Number,
                min: 0
              },
               quantity: {
                type: Number,
                min: 0
               } 
            }
        ],
        totalAmount: {
            type: Number,
        }
    },
    { timestamps: true }
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;