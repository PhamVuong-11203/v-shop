import { assets } from '../assets/assets'
import React from 'react'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 
        text-gray-700 text-xs sm:text-sm md:text-base text-center mb-5 mt-36'>
      <div>
        <img src={assets.exchange_icon} alt="" className='w-12 m-auto mb-1' />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free exchange Policy</p>
      </div>
        <div>
        <img src={assets.quality_icon} alt="" className='w-12 m-auto mb-1' />
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 Days free return policy</p>
      </div>
        <div>
        <img src={assets.support_img} alt="" className='w-12 m-auto mb-1' />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
