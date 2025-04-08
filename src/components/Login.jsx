import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImg from '../assets/login.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          navigate('/login');
        }
    }, [navigate]);

    const handleLogin = () => {
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

        if (
            registeredUser &&
            registeredUser.username === username &&
            registeredUser.password === password
        ) {
            localStorage.setItem('user', JSON.stringify(registeredUser)); // ✅ Login session
            navigate('/home');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center mt-20 bg-gray-100 dark:bg-gray-700">

            <div className="justify-center items-center hidden lg:flex ">
                <img src={LoginImg} alt="Login" className="size-1/2 object-cover " />
            </div>

            <div className="flex flex-col flex-1/2 items-center justify-center p-8 mt-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg space-y-6 max-w-lg mb-10">
                <h2 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">Login</h2>

                <div className="w-full mb-6">
                    <label htmlFor="username" className="block font-semibold text-gray-700 dark:text-gray-300 text-lg mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div className="w-full mb-6">
                    <label htmlFor="password" className="block font-semibold text-gray-700 dark:text-gray-300 text-lg mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg dark:bg-gray-700 dark:text-white"
                    />
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <button
                    onClick={handleLogin}
                    className="w-full p-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg font-semibold transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Login
                </button>

                <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                    Don't have an account?
                    <a href="/signup" className="text-blue-500 font-semibold dark:text-blue-400"> Sign up here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;