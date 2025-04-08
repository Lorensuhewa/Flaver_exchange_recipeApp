import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupImg from '../assets/signup.png';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
        // Check if the user already exists in localStorage
        const existingUser = JSON.parse(localStorage.getItem('user'));

        if (existingUser) {
            setError('User already exists');
            return;
        }

        // Store new user data in localStorage
        const newUser = { username, password, savedRecipes: [] };
        localStorage.setItem('registeredUser', JSON.stringify(newUser));
        console.log("user added");
        navigate('/login');
    };

    return (
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 mt-20">

            <div className="justify-center items-center lg:flex">
                <img src={SignupImg} alt="Signup" className="size-1/2 object-cover" />
            </div>

            <div className="flex flex-col flex-1/2 items-center justify-center p-8 mt-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg space-y-6 max-w-lg mb-10">
                <h2 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">Sign Up</h2>

                <div className="w-full mb-6">
                    <label htmlFor="username" className="block font-semibold text-gray-700 dark:text-gray-300 text-lg mb-2">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg dark:bg-gray-700 dark:text-white" />
                </div>

                <div className="w-full mb-6">
                    <label htmlFor="password" className="block font-semibold text-gray-700 dark:text-gray-300 text-lg mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg dark:bg-gray-700 dark:text-white" />
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <button
                    onClick={handleSignup}
                    className="w-full p-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg font-semibold transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Sign Up
                </button>

                <p className="mt-4 text-center text-gray-800 dark:text-gray-300">
                    Already have an account?
                    <a href="/login" className="text-blue-500 dark:text-blue-400"> Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;