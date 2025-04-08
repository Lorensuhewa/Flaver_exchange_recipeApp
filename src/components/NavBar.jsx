import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import DarkModeToggle from './DarkModeToggle';

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    navigate('/');  
  };

  return (
    <nav className="bg-gray-900 shadow-md h-20 z-10 relative">
      <div className="mx-10 pt-2 flex justify-between items-center h-full">
        <div className="items-center h-full">
          <img src={Logo} alt="logo" className="h-40 relative -top-11 p-2" />
        </div>
        <div className="flex items-center gap-6 text-white">
          <DarkModeToggle />
          <Link to="/home" className="hover:text-pink-400 transition font-medium">Home</Link>
          <Link to="/favorites" className="hover:text-pink-400 transition font-medium">Favorites</Link>
          <Link to="/add" className="hover:text-pink-400 transition font-medium">Add Recipe</Link>
          <Link to="/new-recipes" className="hover:text-pink-400 transition font-medium">New Recipes</Link>
          <button onClick={handleLogout} className="hover:text-pink-400 transition font-medium">Logout</button>
        </div>    
      </div>
    </nav>
  );
};

export default NavBar;