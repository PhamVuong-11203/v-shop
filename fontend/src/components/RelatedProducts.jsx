import { ShopContext } from '../context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({category, subCategory}) => {

    const {products} = useContext(ShopContext)
    const [data, setData] = useState([])

    useEffect(() =>{
        if (products.length > 0){
            let productCopys =products.slice()
            productCopys = productCopys.filter((item) => category === item.category )
            productCopys = productCopys.filter((item) => subCategory === item.subCategory )

            setData(productCopys.slice(0,5))
        }
    },[category, products, subCategory])

  return (
<div className='my-10'>
            <div className="text-center py-8 text-3xl">
                <Title text1={'RELATED  '} text2={' PRODUCTS'} />
                <p className='w-3/4 m-auto sm:text-sm md:text-base text-gray-600'>
                    something i will write here to introduce my lastest products. but i have not thought of it.
                    let's make this line longer :3
                </p>
            </div>
            <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                lg:grid-cols-5 gap-4 gap-y-6">
                    {
                        data.map((item, index) => (
                            <ProductItem key={index} id={item._id} image={item.image}
                                name={item.name} price={item.price}
                            />
                        ))
                        
                    }
            </div>
        </div>
  )
}

export default RelatedProducts
