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

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id

        const updates = req.body

        const updatedPro = await Product.findByIdAndUpdate(
            id,
            updates,
            {
                new: true
            }
        )

        if (!updatedPro) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedPro
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}
 

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id

        const deleteProduct = await Product.findByIdAndDelete(id)

        if (!deleteProduct) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        res.status(200).json({
            message: 'Product deleted successfully',
            deletedProduct: deleteProduct
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}
 
const searchProducts = async (req, res) => {
    try {
        const {query} = req.query

        const searchResults = await Product.find(
            {
                $or: [
                    {
                        name: {
                            $regex: query
                        }
                    },
                    {
                        description: {
                            $regex: query
                        }
                    }
                ]
            }
        )

        if (searchResults.length === 0) {
            return res.status(404).json({
                message: 'No products found matching the query'
            })
        }
        res.status(200).json({
            message: 'Products fetched successfully',
            products: searchResults
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = {
    createProduct,
    fetchProducts,
    updateProduct,
    deleteProduct,
    searchProducts
}