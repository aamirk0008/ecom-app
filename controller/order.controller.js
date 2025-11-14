const Order = require('../model/order.model')

const Cart = require('../model/cart.model')

const User = require('../model/user.model')



// const placeOrder = async (req, res) => {
//     try {
//         const userId = req.params.id

//         const cart = await Cart.findOne({userId: userId})

//         if (cart.products.length === 0) {
//             return res.status(400).json({ message: 'Cart is empty' })
//         }

//         const user = await User.findOne({userId: userId})

//         const shippingAddress = user.address || 'Default Address'

//         const order = new Order({
//             userId,
//             items: cart.products,
//             totalAmount: cart.totalAmount,
//             shippingAddress,
//             orderStatus: 'Pending'

//         })
//         if (!user || !user.address) {
//     return res.status(400).json({ message: 'User or shipping address not found' });
// }

//         await order.save()

//         await Cart.findByIdAndDelete(cart._id)

//         res.status(201).json({ message: 'Order placed successfully', orderId: order._id })
//     } catch (error) {
//         console.error('Error placing order:', error)
//         res.status(500).json({ message: 'Internal Server Error' })  
//     }
// }

const placeOrder = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        
        
        const cart = await Cart.findOne({ userId: userId });

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const user = await User.findById(userId);
        console.log(user);

        if (!user || !user.address) {
            return res.status(400).json({ message: 'User or shipping address not found' });
        }

        const shippingAddress = user.address || 'Default Address';

        // Transform cart.products to ensure quantity and price are numbers (to match Order schema)
        const items = cart.products.map(item => ({
            productId: item.productId,  // Assuming this is already a valid ObjectId or string
            quantity: Number(item.quantity),  // Convert string to number
            price: Number(item.price)        // Convert string to number
        }));

        const order = new Order({
            userId,
            items,  // Use the transformed items array
            totalAmount: cart.totalAmount,
            shippingAddress,
            orderStatus: 'Pending'  // Fixed: Matches schema enum
        });

        await order.save();

        await Cart.findByIdAndDelete(cart._id);

        res.status(201).json({ message: 'Order placed successfully', orderId: order._id, orderItem: order });
    } catch (error) {
        console.error('Error placing order:', error);  // Log the exact error for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const cancelOrder = async (req, res) => {
    try {
        const id = req.params.id

        const order = await Order.findOne({_id: id})

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }
        order.orderStatus = 'Cancelled'

        await order.save()
        res.status(200).json({ message: 'Order cancelled successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const trackOrder = async (req, res) => {
    try {
        const id = req.params.id
        const order = await Order.findOne({_id: id})

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }
        res.status(200).json({ orderStatus: order.orderStatus })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


module.exports = {
    placeOrder,
    cancelOrder,
    trackOrder,
    getAllOrders
}