import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const NewRecipes = () => {
  const [localRecipes, setLocalRecipes] = useState([]);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('localRecipes')) || [];
    setLocalRecipes(storedRecipes);
  }, []);

  return (
    <div className="p-8 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 mt-20">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100">
        🍳 New Recipes
      </h1>

      {localRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {localRecipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500 dark:text-gray-400 mt-20">
          No recipes Added yet! Start cooking and come back here 🧑‍🍳
        </div>
      )}
    </div>
  );
};

export default NewRecipes;