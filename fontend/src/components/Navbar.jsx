import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from "react-router";
import { ShopContext } from '../context/ShopContext';
const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium '>
      <Link to='/'><img src={assets.logo} alt="" className='w-36' /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to="/" className='flex flex-col items-center gap-1  text-gray-700' >
          {({ isActive }) => (
            <>
              <p>HOME</p>
              {isActive && (
                <hr className="w-2/4 border-none bg-gray-700 h-[1.5px]" />
              )}
            </>
          )}
        </NavLink>
        <NavLink to="/collection" className='flex flex-col items-center gap-1  text-gray-700' >
          {({ isActive }) => (
            <>
              <p>COLLECTION</p>
              {isActive && (
                <hr className="w-2/4 border-none bg-gray-700 h-[1.5px]" />
              )}
            </>
          )}
        </NavLink>
        <NavLink to="/about" className='flex flex-col items-center gap-1  text-gray-700' >
          {({ isActive }) => (
            <>
              <p>ABOUT</p>
              {isActive && (
                <hr className="w-2/4 border-none bg-gray-700 h-[1.5px]" />
              )}
            </>
          )}
        </NavLink>
        <NavLink to="/contact" className='flex flex-col items-center gap-1  text-gray-700' >
          {({ isActive }) => (
            <>
              <p>CONTACT</p>
              {isActive && (
                <hr className="w-2/4 border-none bg-gray-700 h-[1.5px]" />
              )}
            </>
          )}
        </NavLink>
      </ul>
      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon}
          alt="" className='w-5 cursor-pointer hover:-translate-y-1 hover:scale-110' />


        <div className='group relative'>
          <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt=""
            className='w-5 cursor-pointer hover:-translate-y-1 hover:scale-110' />
            {/* Dropdown menu  */}
          {token &&
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded">
                <div className="cursor-pointer hover:text-black">My Profile</div>
                <div onClickCapture={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</div>
                <div onClick={logout} className="cursor-pointer hover:text-black">Logout</div>
              </div>
            </div>}


        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5 hover:-translate-y-1 hover:scale-110 " />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4
           bg-black text-white aspect-square rounded-full text-[8px] ">
            {getCartCount()}
          </p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon}
          alt="" className=" w-5 cursor-pointer  sm:hidden" />
        <div className={`absolute bottom-0 top-0 right-0 overflow-hidden bg-white transition-all
           ${visible ? 'w-full' : 'w-0'} `}>
          <div className="flex flex-col text-gray-600 ">
            <div className="flex items-center gap-4 p-3">
              <img src={assets.dropdown_icon} alt="" className="h-5 rotate-180 ml-3" />
              <p onClick={() => setVisible(false)} className='cursor-pointer'>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} to='/'
              className={({ isActive }) =>
                `py-2 pl-6 border uppercase ${isActive ? 'bg-black text-white' : ''}`
              }>home</NavLink>
            <NavLink onClick={() => setVisible(false)} to='/collection'
              className={({ isActive }) =>
                `py-2 pl-6 border uppercase ${isActive ? 'bg-black text-white' : ''}`
              }>collection</NavLink>
            <NavLink onClick={() => setVisible(false)} to='/about'
              className={({ isActive }) =>
                `py-2 pl-6 border uppercase ${isActive ? 'bg-black text-white' : ''}`
              }>about</NavLink>
            <NavLink onClick={() => setVisible(false)} to='/contact'
              className={({ isActive }) =>
                `py-2 pl-6 border uppercase ${isActive ? 'bg-black text-white' : ''}`
              }>contact</NavLink>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar
