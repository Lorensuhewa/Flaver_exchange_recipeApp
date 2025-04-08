import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="flex justify-between bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 items-center">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">About Us</h3>
                        <p className="text-gray-400 text-justify">
                            Flavour Exchange is a global community of food lovers who share, discover, and enjoy delicious recipes from around the world.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                            <li><Link to="/recipes" className="text-gray-400 hover:text-white">Recipes</Link></li>
                            <li><Link to="/signup" className="text-gray-400 hover:text-white">Sign Up</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex flex-col space-x-6 gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-facebook-f">Facebook</i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-twitter">twitter</i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-instagram">Instagram</i>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-linkedin-in">Linkedin</i>
                            </a>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="flex flex-col items-start w-xl">
                        <h3 className="text-xl font-semibold mb-4">Join Our Newsletter</h3>
                        <p className="text-gray-400 mb-4">Stay updated with the latest recipes and food trends!</p>
                        <form action="#" method="POST" className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 w-full rounded-l-lg focus:outline-none bg-amber-50 text-gray-900"
                            />
                            <button
                                type="submit"
                                className="bg-pink-500 hover:bg-pink-600 text-white rounded-r-lg px-4 py-2"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="mt-12 text-center border-t border-gray-700 pt-4">
                    <p className="text-gray-400 text-sm">&copy; 2025 Flavour Exchange. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;