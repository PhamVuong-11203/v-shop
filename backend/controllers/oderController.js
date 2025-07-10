import Order from '../models/orderModel.js';

// order using COD 
const placeOderCOD = async (req, res) => { }

// order using Stripe
const placeOderStripe = async (req, res) => { }


// order using Razorpay
const placeOderRazorpay = async (req, res) => { }


// Get all orders
const getAllOrders = async (req, res) => { }


// Get user orders
const getUserOrders = async (req, res) => { }

// update order status for admin panel
const updateOrderStatus = async (req, res) => { }


export { placeOderCOD, placeOderStripe, placeOderRazorpay, getAllOrders, getUserOrders, updateOrderStatus };

