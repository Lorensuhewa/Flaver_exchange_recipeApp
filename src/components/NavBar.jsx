import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import DarkModeToggle from './DarkModeToggle';

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change the state when the page is scrolled down (i.e., `window.scrollY > 0`)
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    navigate('/');
  };

  return (
    <nav className={`fixed items-center top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out shadow-md h-20 
      ${isScrolled ? 'bg-transparent text-black  dark:text-black dark:bg-' : 'bg-gray-900 text-white dark:bg-gray-900 dark:text-black'}`}
    >
      <div className="mx-10 flex justify-between items-center h-full">
        <div className="items-center h-full mt-5 ">
          <img src={Logo} alt="logo" className="h-40 relative -top-11 p-2" />
        </div>
        <div className="flex items-center gap-5 text-xl  tracking-wide font-extrabold dark:bg-amber-100 dark:rounded-2xl dark:shadow-lg dark:shadow-gray-700 ">
          <DarkModeToggle />
          <Link to="/home" className="hover:text-pink-400 transition font-medium">Home</Link>
          <Link to="/favorites" className="hover:text-pink-400 transition font-medium">Favorites</Link>
          <Link to="/add" className="hover:text-pink-400 transition font-medium">Add Recipe</Link>
          <Link to="/new-recipes" className="hover:text-pink-400 transition font-medium">New Recipes</Link>
          <button onClick={handleLogout} className="hover:text-pink-400 transition font-medium pr-2">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;