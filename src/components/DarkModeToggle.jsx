import React from 'react';
import { useDarkMode } from '../context/ThemeContext';
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center gap-2 transition duration-300"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? (
        <>
          <MdOutlineDarkMode className="text-2xl" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <MdDarkMode className="text-2xl" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default DarkModeToggle;
