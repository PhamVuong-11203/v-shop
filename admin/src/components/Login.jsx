import React, { useState } from 'react'
import { backendUrl } from '../assets/assets.js'
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = ({setToken}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/users/admin', {
                email,
                password
            })
            if (response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message || "Login failed. Please try again.");
            }
            
        } catch (error) {
            console.error("Login failed:", error);
            // Handle login failure (e.g., show an error message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
                        <input className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            type="email" placeholder="your@email.com" required="" autoComplete="current-email"
                            onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                        <input className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            type="password" placeholder="Enter your password" required="" autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
                        type="submit"> Login </button>
                </form>
            </div>
        </div>
    )
}

export default Login
