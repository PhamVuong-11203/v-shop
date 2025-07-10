import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])

  const loadOrders = async () => {

    try {
      if (!token) {
        return null
      }
      const res = await axios.get(`${backendUrl}/api/order/user-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {

        let allOrders = []
        res.data.orders.map(order => {
          order.items.map(item => {
            item['status'] = order.status
            item['date'] = order.date
            item['paymentMethod'] = order.paymentMethod
            item['orderId'] = order._id
            item['address'] = order.address
            item['payment'] = order.payment
            allOrders.push(item)

          }) 
        }) 
        setOrderData(allOrders)
        

      } else {
        console.error("Failed to fetch orders:", res.data.message);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders. Please try again later.");
      
    }

  }

  useEffect(() => {
    loadOrders()
  }, [token])

  return (
    <div className='border-t pt-36'>
      <div className="text-2xl">
        <Title text1={'MY '} text2={' ORDERS'} />
      </div>
      <div>
        {
          orderData.slice(1, 4).map((item, index ) => (          
            <div key={index} className="py-4 border-t border-b text-gray-700
             flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                <div>
                  <p className="sm:text-base font-medium">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>{currency} {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">Date:
                    <span className=" text-gray-400">{new Date(item.date).toDateString()}</span>
                  </p>
                  
                  <p className="mt-1">Payment:
                    <span className=" text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button onClick={loadOrders} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
