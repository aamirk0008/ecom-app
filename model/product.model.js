const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 5000
    },
    costPrice: {
        type: Number,
        min: 0,
        required: true
    },
    salePrice: {
        type: Number,
        min: 0,
        required: true
    },
    category: {
        type: String,
        enum: ['Electronics', 'Clothing', 'Books', 'Home Appliances', 'Toys', 'Sports', 'Beauty', 'Automotive', 'others'],
        default: 'others',
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    image: [{
        type: String,
        required: true
    }],
    // createdAt: {
    //     type: Date,
    //     default: Date.now()
    // }
},
{
    timestamps: true
}

)

const product = mongoose.model('Product', productSchema)

module.exports = product