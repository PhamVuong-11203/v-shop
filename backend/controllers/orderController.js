import Order from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// order using COD 
const placeOderCOD = async (req, res) => {

    try {
        const userId = req.user.id;
        const { items, amount, address } = req.body;

        const orderData = new Order({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
            paymentMethod: 'COD',
            payment: false, // COD does not require payment confirmation
            date: Date.now(),
        });

        const newOrder = await orderData.save();
        await userModel.findByIdAndUpdate(userId, {
            catData: {}
        });

        res.json({ success: true, message: "Order placed successfully", order: newOrder });

    } catch (error) {
        console.error("Error placing COD order:", error);
        res.status(500).json({ message: error.message });

    }
}

// order using Stripe
const placeOderStripe = async (req, res) => { }


// order using Razorpay
const placeOderRazorpay = async (req, res) => { }


// Get all orders
const getAllOrders = async (req, res) => { }


// Get user orders
const getUserOrders = async (req, res) => { 
    try {
        const userId = req.user.id;

        const orders = await Order.find({ userId: userId })
        res.json({ success: true, orders: orders });
        

    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.json({ message: error.message });
        
    }
}

// update order status for admin panel
const updateOrderStatus = async (req, res) => { }


export { placeOderCOD, placeOderStripe, placeOderRazorpay, getAllOrders, getUserOrders, updateOrderStatus };

