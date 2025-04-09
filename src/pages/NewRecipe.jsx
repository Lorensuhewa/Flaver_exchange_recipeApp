import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const NewRecipes = () => {
  // State to hold the list of recipes
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Get stored recipes from localStorage and set them to state
    const stored = JSON.parse(localStorage.getItem('localRecipes')) || [];
    setRecipes(stored);
  }, []); // Empty array means this runs once when the component is mounted

  const handleDelete = (id) => {
    // Remove the recipe with the given id from the state and localStorage
    const updated = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updated);
    localStorage.setItem('localRecipes', JSON.stringify(updated));
  };

  return (
    <div className="p-8 min-h-screen bg-white dark:bg-gray-950 mt-20">
      <h1 className="text-4xl font-bold mb-10 text-center">🍳 New Recipes</h1>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id}>
               <RecipeCard recipe={recipe} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500 mt-20">
          No recipes added yet! Start cooking and come back here 🧑‍🍳
        </div>
      )}
    </div>
  );
};

export default NewRecipes;
