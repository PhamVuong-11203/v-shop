import express from 'express';
import adminAuth from '../middlewares/adminAuth.js';
import authUser from '../middlewares/auth.js';
import { placeOderCOD, placeOderStripe, placeOderRazorpay, getAllOrders, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';
const orderRouter = express.Router();

// Order using COD
orderRouter.post('/order-cod', authUser, placeOderCOD);
// Order using Stripe
orderRouter.post('/order-stripe', authUser, placeOderStripe);
// Order using Razorpay
orderRouter.post('/order-razorpay', authUser, placeOderRazorpay);
// Get user orders
orderRouter.get('/user-orders', authUser, getUserOrders);


// admin routes
// Get all orders
orderRouter.get('/list-orders', adminAuth, getAllOrders);
// Update order status for admin panel
orderRouter.post('/oder-status', updateOrderStatus);
