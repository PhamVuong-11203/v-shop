import { assets } from '../assets/assets'
import React from 'react'

function Footer() {
    return (
        <div className='border-t-2 mt-16'>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] 
        gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.logo} alt="" className='w-32 mb-5' />
                    <p className='w-ful sm:w-2/3 text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col text-gray-600 gap-1'>
                          <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col text-gray-600 gap-1'>
                      <li>+84-123-234-86</li>
                      <li>phamvuong11203@gmail.com</li>
                      <li>Instagram</li>
                      <li>Tik Tok</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-center text-sm'>Copyright 2024@ V-shope.com - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
