import express from 'express';
import { listProducts, addProduct, removeProduct, getProductById } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
]), addProduct);
productRouter.get('/list', listProducts);
productRouter.delete('/:id', adminAuth, removeProduct);
productRouter.get('/:id', getProductById);

export default productRouter;
// Compare this snippet from backend/controllers/userController.js: