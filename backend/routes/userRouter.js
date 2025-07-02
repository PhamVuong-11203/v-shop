import express from 'express';
import { userLogin, userRegister, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

// User login route
userRouter.post('/login', userLogin);
// User registration route
userRouter.post('/register', userRegister);
// Admin login route
userRouter.post('/admin', adminLogin);

export default userRouter;