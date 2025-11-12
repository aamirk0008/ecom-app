const Product = require('../model/product.model')

const createProduct = async (req, res) => {
    try {
        const product = req.body

        const productData = await Product.create(product)

        res.status(201).json({
            message: 'Product created successfully',
            product: productData
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const fetchProducts = async (req, res) => {
    try {
        const fetched = await Product.find()

        res.status(200).json({
            message: 'Products fetched successfully',
            products: fetched
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


module.exports = {
    createProduct,
    fetchProducts
}