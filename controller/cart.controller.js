const Cart = require('../model/cart.model');



const addToCart = async (req, res) => {
    try {
        const {id} = req.params;

        const {productId, quantity, price} = req.body;

        const cart = await Cart.findOne({userId:id})

        if (cart) {
            const product = {
                productId,
                quantity,
                price
            };
            cart.products.push(product)
            await cart.save()
            res.status(200).json({
                message: 'Product added to cart successfully',
                cart: cart
            })
        } else {
            const newCart = await Cart.create({
                userId: id,
                products: [
                    {
                        productId,
                        quantity,
                        price
                    }
                ],
                totalAmount: quantity * price
            })

            await newCart.save()

            res.status(201).json({
                message: 'New Cart created and product added successfully',
                cart: newCart
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const deleteFromCart = async (req, res) => {
    try {
        const userId = req.params.id;
        const {productId} = req.body;

        const cart = await Cart.findOne({userId: userId})

        if (!cart) {
            res.status(404).json({
                message: 'Cart not found for the user'
            })
        }

        const productIndex = cart.products.findIndex(
            p=> p.productId.toString() === productId.toString()
        )

        if (productIndex === -1) {
            return  res.status(404).json({
                message: 'Product not found in cart'
            })
        }

        cart.products.splice(productIndex, 1);
        cart.totalAmount = cart.products.reduce(
            (sum, item) => sum + item.quantity * item.price, 0
        )
        await cart.save();
        res.status(200).json({
            message: 'Product removed from cart successfully',
            cart: cart
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const getCartItems = async (req, res) => {
    try {
        const userId = req.params.id;
        const cart = await Cart.findOne({userId: userId})

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            })
        }

        res.status(200).json({
            message: 'Cart items fetched successfully',
            cart: cart
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


module.exports = {
    addToCart,
    deleteFromCart,
    getCartItems
}