import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context to manage theme state
const ThemeContext = createContext('light');

// ThemeProvider component that will wrap entire application
export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' 
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
           
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]); 

    return (
        // Provide the darkMode state and setDarkMode function to all children components
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children} 
        </ThemeContext.Provider>
    );
}

// Custom hook to access the theme context and toggle dark mode
export const useDarkMode = () => useContext(ThemeContext);
