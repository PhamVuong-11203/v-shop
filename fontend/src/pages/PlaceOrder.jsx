import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { cartItems, setCartItems, getCartAmount, navigate,
    backendUrl, token, delivery_fee, products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {

      let orderItems = []

      for (const itemId in cartItems) {
        const itemSizes = cartItems[itemId]
        for (const size in itemSizes) {
          const quantity = itemSizes[size]
          if( quantity > 0) {
            const itemInfor = structuredClone(products.find(item => item._id === itemId))
            if (itemInfor) {
             itemInfor.size = size
             itemInfor.quantity = quantity
              orderItems.push(itemInfor)
            }
          }
        }
      }

      console.log("Order Items:", orderItems);
      console.log(token);
      

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod': {
          const res = await axios.post(backendUrl + '/api/order/order-cod', orderData, {
            headers:{ Authorization: `Bearer ${token}` } })
            console.log("COD Order Response:", res.data);
            
          if (res.data.success) {
            setCartItems({})
            navigate('/orders')
          } else{
            toast.error(res.data.message || 'Failed to place order.')
          }
          break;
        }
        default:
          break
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message)

    }
  }

  return (
    <form onSubmit={submitHandler} className='flex flex-col sm:flex-row justify-between
     gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY '} text2={' INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={handleChange} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" placeholder='First Name' />
          <input required onChange={handleChange} name='lastName' value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" placeholder="Last name" ></input>
        </div>
        <input required onChange={handleChange} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="Email" placeholder='Email address' />
        <input required  onChange={handleChange} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="text" placeholder='Street' />
        <div className="flex gap-3">
          <input required  onChange={handleChange} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" placeholder='City' />
          <input required  onChange={handleChange} name='state' value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" placeholder="State" ></input>
        </div>
        <div className="flex gap-3">
          <input required  onChange={handleChange} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="number" placeholder='Zipcode' />
          <input required  onChange={handleChange} name='country' value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text" placeholder="Country" ></input>
        </div>
        <input required  onChange={handleChange} name='phone' value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text" placeholder="Phone" ></input>
      </div>

      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-10">
          <Title text1={'PAYMENT '} text2={' METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p onClick={() => setMethod('stripe')} className={`min-w-3.5 h-3.5 border rounded-full 
                ${method === 'stripe' ? 'bg-green-500' : ''} `}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p onClick={() => setMethod('razorpa')} className={`min-w-3.5 h-3.5 border rounded-full 
                ${method === 'razorpa' ? 'bg-green-500' : ''} `}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p onClick={() => setMethod('cod')} className={`min-w-3.5 h-3.5 border rounded-full 
                ${method === 'cod' ? 'bg-green-500' : ''} `}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end'>
            <button type='submit' className='bg-black text-white mt-10 px-14 py-3 text-sm'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>


    </form>
  )
}

export default PlaceOrder
