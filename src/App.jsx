import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./pages/Welcome";
import WelcomeNavBar from "./components/WelcomeNavBar";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import NewRecipes from "./pages/NewRecipe";
import EditRecipe from "./pages/EditRecipe";

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
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/add-recipe" element={<AddRecipe />}/>
          <Route path="/new-recipes" element={<NewRecipes />}/>
          <Route path="/edit/:id" element={<EditRecipe/>}/>

          {/* Add a fallback route for unknown paths */}
          <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
