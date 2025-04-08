import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./pages/Welcome";
import WelcomeNavBar from "./components/WelcomeNavBar";
import NavBar from "./components/NavBar";

function App() {
  const location = useLocation();

  const isWelcomePage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>

      {isWelcomePage ? <WelcomeNavBar /> : <NavBar />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
