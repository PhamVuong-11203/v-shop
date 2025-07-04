import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Order from './pages/Order.jsx'
import { ToastContainer } from 'react-toastify';


const App = () => {

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
    
  }, [token]); 

  return (
    <div className="bg-gray-100 min-h-screen">
          <ToastContainer />

      {token === "" ? <Login setToken = {setToken} /> : (
        <>
          <Navbar  setToken = {setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add  token = {token}/>} />
                <Route path="/list" element={<List  token = {token}/>} />
                <Route path="/order" element={<Order token = {token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default App
