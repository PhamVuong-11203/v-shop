import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRouter.js'
// app config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
// middleware

app.use(express.json())
app.use(cors())

// api endpoint
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})