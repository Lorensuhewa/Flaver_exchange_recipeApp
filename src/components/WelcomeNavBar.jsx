import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import DarkModeToggle from './DarkModeToggle';

const WelcomeNavBar = () => {
    // State to manage scroll effect on the navbar background
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Function to handle scroll option
        const handleScroll = () => {
            // true when the page is scrolled down 
            setIsScrolled(window.scrollY > 0);
        };

        // Add scroll event listener to update the navbar style
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed items-center top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out shadow-md h-20 
                ${isScrolled ? 'bg-transparent text-black  dark:text-black' : 'bg-gray-900 text-white dark:bg-gray-900 dark:text-black'}`}
        >
            <div className="mx-10 flex justify-between items-center h-full">
                {/* Logo: Displays the logo image and applies a smooth transition for responsiveness */}
                <div className="flex items-center">
                    <img src={Logo} alt="logo" className="h-32 sm:h-18 md:h-32 transition-all duration-300 " />
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-8 text-lg  tracking-wide font-extrabold dark:bg-amber-100 dark:rounded-2xl dark:shadow-lg dark:shadow-gray-700  p-1">
                    {/* Dark mode toggle component */}
                    <DarkModeToggle />

                    {/* Home link: Navigates to the home section */}
                    <a
                        href="/#home"
                        className=" hover:text-pink-400 transition-colors  py-2 px-4 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        Home
                    </a>

                    {/* Most Recipes link: Navigates to the most recipes section */}
                    <a
                        href="/#recipe"
                        className=" hover:text-pink-400 transition-colors py-2 px-4 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        Most Recipes
                    </a>

                    {/* About Us link: Navigates to the about section */}
                    <a
                        href="/#about"
                        className=" hover:text-pink-400 transition-colors  py-2 px-4 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        About Us
                    </a>

                    {/* Login link: Navigates to the login page */}
                    <Link
                        to="/login"
                        className=" hover:text-pink-400 transition-colors  py-2 px-4 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default WelcomeNavBar;
