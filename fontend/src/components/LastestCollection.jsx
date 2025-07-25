import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
const LastestCollection = () => {

    const { products } = useContext(ShopContext)
    const [lastestProduct, setLastestProduct] = useState([])
    useEffect(() => {
        setLastestProduct(products.slice(0, 10))
    }, [products])


    return (
        <div className='my-10'>
            <div className="text-center py-8 text-3xl">
                <Title text1={'Lastest '} text2={' Collection'} />
                <p className='w-3/4 m-auto sm:text-sm md:text-base text-gray-600'>
                    something i will write here to introduce my lastest products. but i have not thought of it.
                    let's make this line longer :3
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                lg:grid-cols-5 gap-4 gap-y-6">
                    {
                        lastestProduct.map((item, index) => (
                            <ProductItem key={index} id={item._id} image={item.image}
                                name={item.name} price={item.price}
                            />
                        ))
                        
                    }
            </div>
        </div>
    )
}

export default LastestCollection
