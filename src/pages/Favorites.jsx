import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const handleRemove = (idMeal) => {
    const updated = favorites.filter(recipe => recipe.idMeal !== idMeal);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="dark:bg-gray-950 bg-gray-100 mt-20">
      <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-950 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 dark:text-gray-100">
          💖 My Favorite Recipes
        </h1>

        {favorites.length === 0 ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400 mt-20">
            No favorites yet. Start exploring and add some! 🌟
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal || recipe.id}
                recipe={recipe}
                isFavoritePage={true}  
                onDelete={handleRemove}  
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;