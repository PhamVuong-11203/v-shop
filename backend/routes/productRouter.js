import express from 'express';
import { listProducts, addProduct, removeProduct, getProductById } from '../controllers/productController.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();

productRouter.post('/add', upload([
    { name: 'image1', maxcount: 1 },
    { name: 'image2', maxcount: 1 },
    { name: 'image3', maxcount: 1 },
    { name: 'image4', maxcount: 1 },
]), addProduct);
productRouter.get('/list', listProducts);
productRouter.delete('/:id', removeProduct);
productRouter.get('/:id', getProductById);

export default productRouter;
// Compare this snippet from backend/controllers/userController.js: