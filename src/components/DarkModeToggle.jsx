import React from 'react';
import { useDarkMode } from '../context/ThemeContext';

const DarkModeToggle = () => {

    const {darkMode, setDarkMode} = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
    >
      {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;