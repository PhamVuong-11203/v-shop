import { ShopContext } from '../context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Cart = () => {

  const { products, cartItems, updateQuantity } = useContext(ShopContext)
  const [cartDatas, setCartDatas] = useState([])

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      const sizes = cartItems[itemId];
      for (const size in sizes) {
        const quantity = sizes[size];
        if (quantity > 0) {
          tempData.push({ _id: itemId, size, quantity });
        }
      }
    }

    setCartDatas(tempData);
  }, [cartItems]);

  return (
    <div class="border-t pt-14">
      <div class="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {
          cartDatas.map((item, index) => {
            const productData = products.find(product => product._id === item._id)
            return (

              <div key={index} class="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] 
                sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div class="flex items-start gap-6">
                  <img class="w-16 sm:w-20" src={productData.image[0]} alt="" />
                  <div>
                    <p class="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div class="flex items-center gap-5 mt-2">
                      <p>${productData.price}</p>
                      <p class="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ?
                  null : updateQuantity(item._id.item.size, Number(e.target.value))}
                  min={1} defaultValue={item.quantity} class="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} class="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon} alt="" />
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default Cart
