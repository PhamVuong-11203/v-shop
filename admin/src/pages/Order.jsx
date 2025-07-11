import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets, backendUrl } from '../assets/assets';


const Order = ({ token }) => {

  const [orders, setOrders] = useState([]);

  const featchOrders = async () => {
    if (!token) return;
    try {

      const res = await axios.get(backendUrl + '/api/order/list-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        console.log("Orders fetched successfully:", res.data.orders);
        
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message || "Failed to fetch orders");
      }

    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error appropriately, e.g., show a toast notification

    }
  }

  const handleStatusChange = async (orderId, e) => {
    if (!token) return;
    try {
      const res = await axios.post(backendUrl + '/api/order/oder-status', { orderId, status: e.target.value }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        await featchOrders(); // Refresh orders after updating status
        toast.success("Order status updated successfully");
      } else {
        toast.error(res.data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  }

  useEffect(() => {
    if (token) {
      featchOrders();
    }
  }, []);

  return (
    <div>
      <h3>Order Page</h3>
      <div className="">
        {
          orders.map((order, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 
              items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" >
              <img className="w-12" src={assets.parcel_icon} alt="" />
                <div >
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p key={index} className="py-0.5">
                          {item.name} x {item.quantity} <span> {item.size}</span> </p>
                      } else {
                        return <p key={index} className="py-0.5">
                          {item.name} x {item.quantity} <span> {item.size}</span> , </p>
                      }
                    })
                  }
                    <p className='mt-3 mb-2 font-medium'>{order.address.firstName + ' ' + order.address.lastName}</p>
                    <div >
                  <p>{order.address.street}</p>
                  <p>{order.address.city} , {order.address.state} , {order.address.country} , {order.address.zipcode}</p>
                  <p>{order.address.phone}</p>
                </div>
                </div>
                
                <div>
                  <p className="text-sm sm:text-[15px]">Items :{order.items.length}</p>
                  <p className="mt-3">Method :{order.paymentMethod}</p>
                  <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm sm:text-[15px]">${order.amount}</p>
                <select onChange={(e) => handleStatusChange(order._id, e)} value={order.status} className="p-2 font-semibold">
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order


