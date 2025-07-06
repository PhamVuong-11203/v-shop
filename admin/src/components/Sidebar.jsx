import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="w-[18%] min-h-screen border-r-2" >
            <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]" >
                <NavLink to="/add" className={({isActive}) =>`flex items-center gap-3 border
                     border-gray-300 border-r-0 px-3 py-2 rounded-l
                     ${isActive ? 'bg-red-200 border-pink-400' : ''}`} >
                    <img className="w-5 h-5" src={assets.add_icon} />
                    <p className="hidden md:block">Add Item</p>
                </NavLink>
                <NavLink to="/list" className={({isActive}) =>`flex items-center gap-3 border
                     border-gray-300 border-r-0 px-3 py-2 rounded-l
                     ${isActive ? 'bg-red-200 border-pink-400' : ''}`} >
                    <img className="w-5 h-5" src={assets.order_icon} />
                    <p className="hidden md:block">List Item</p>
                </NavLink>
                <NavLink to="/order" className={({isActive}) =>`flex items-center gap-3 border
                     border-gray-300 border-r-0 px-3 py-2 rounded-l
                     ${isActive ? 'bg-red-200 border-pink-400' : ''} `} >
                    <img className="w-5 h-5" src={assets.order_icon} />
                    <p className="hidden md:block">Order</p>
                </NavLink>
              
            </div>
        </div>
    )
}

export default Sidebar
