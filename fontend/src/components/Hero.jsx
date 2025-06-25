import { assets } from '../assets/assets'
import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* left  side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className="text-[#414141]">
                <div className="flex items-center gap-2">
                    <p className='w-8 md:w-14 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base uppercase'>our best sellers </p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'> Last Arrivals </h1>
                 <div className="flex items-center gap-2">
                    <p className='font-semibold text-sm md:text-base uppercase'>shop now </p>
                    <p className='w-8 md:w-14 h-[2px] bg-[#414141]'></p>
                </div>
            </div>
        </div>
        {/* right side */}

        <img src={assets.hero_img} alt="" className="w-full sm:w-1/2" />
      
    </div>
  )
}

export default Hero
