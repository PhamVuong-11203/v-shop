import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {

  const [currenState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const SubmitHandle = async (e) => {
    e.preventDefault()
    try {
      if (currenState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/users/register`, {
          name,
          email,
          password
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Account created successfully, please login.')
          setCurrentState('Login')
        } else {
          toast.error(response.data.message || 'Something went wrong, please try again.')
        }

      } else if (currenState === 'Login') {
        const response = await axios.post(`${backendUrl}/api/users/login`, {
          email,
          password
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Login successful!')
        } else {
          toast.error(response.data.message || 'Invalid credentials, please try again.')
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong, please try again later.')

    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <div>
      <form onSubmit={SubmitHandle} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4
       text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currenState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currenState === 'Login' ? '' :
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name" required />}
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email" required />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password" required />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className=" cursor-pointer">Forgot your password?</p>
          {
            currenState === 'Login'
              ? <p onClick={() => setCurrentState('Sign Up')}
                className=" cursor-pointer">Create account</p>
              : <p onClick={() => setCurrentState('Login')}
                className=" cursor-pointer">Login here</p>
          }
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {currenState}
        </button>
      </form>

    </div>
  )
}

export default Login
