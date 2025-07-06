import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../assets/assets';
import { toast } from 'react-toastify';

const List = ({ token }) => {

  const [list, setList] = useState([]);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(backendUrl + '/api/products/list')
      setList(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);

    }

  }

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + `/api/products/${id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        await fetchProducts(); // Refresh the product list after deletion
        toast.success(response.data.message || "Product deleted successfully!");
      } else {
        toast.error(response.data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);



  return (
    <div className='w-full h-full '>
      <p className="mb-2">All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border
       bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {
          list.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr]
           items-center gap-2 py-1 px-2 border text-sm" >
              <img className="w-12" src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => deleteProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List


