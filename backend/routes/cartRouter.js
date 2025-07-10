import express from 'express';
import { addToCart, getCart, uploadCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';
// Create a new router for cart-related routes
// This router will handle all cart-related operations such as adding items, retrieving the cart, removing
const cartRouter = express.Router();

// Route to add an item to the cart
cartRouter.post('/add', authUser, addToCart);
// Route to get the cart items
cartRouter.get('/get', authUser, getCart);
// Route to upload the cart items
cartRouter.post('/upload', authUser, uploadCart);

export default cartRouter;