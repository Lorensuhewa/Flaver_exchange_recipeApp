import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('localRecipes')) || [];
    const found = storedRecipes.find(r => r.id === id);
    if (found) {
      setRecipe(found);
    } else {
      alert('Recipe not found');
      navigate('/home');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedRecipes = JSON.parse(localStorage.getItem('localRecipes')) || [];
    const updatedRecipes = storedRecipes.map(r =>
      r.idMeal === recipe.idMeal ? recipe : r
    );
    localStorage.setItem('localRecipes', JSON.stringify(updatedRecipes));
    alert('Recipe updated successfully!');
    navigate('/home');
  };

  if (!recipe) return <div className="text-center text-xl p-10 text-gray-800 dark:text-gray-100">Loading...</div>;

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen p-10 mt-20">
      <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-[#1f2937] shadow-2xl rounded-2xl transition-colors duration-300">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">✏️ Edit Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-6 text-gray-800 dark:text-gray-100">

          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-2 font-semibold">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={recipe.title}
              onChange={handleChange}
              placeholder="Recipe Title"
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block mb-2 font-semibold">Image URL *</label>
            <input
              type="text"
              id="image"
              name="image"
              value={recipe.image}
              onChange={handleChange}
              placeholder="Paste image URL"
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="strCategory" className="block mb-2 font-semibold">Category</label>
            <input
              type="text"
              id="strCategory"
              name="strCategory"
              value={recipe.strCategory}
              onChange={handleChange}
              placeholder="e.g. Dessert, Main Course"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Area */}
          <div>
            <label htmlFor="strArea" className="block mb-2 font-semibold">Origin (Area)</label>
            <input
              type="text"
              id="strArea"
              name="strArea"
              value={recipe.strArea}
              onChange={handleChange}
              placeholder="e.g. Italian, Indian"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cooking Time */}
          <div>
            <label htmlFor="cookingTime" className="block mb-2 font-semibold">Cooking Time (minutes)</label>
            <input
              type="text"
              id="cookingTime"
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleChange}
              placeholder="e.g. 30"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rating */}
          <div>
            <label htmlFor="rating" className="block mb-2 font-semibold">Rating (%)</label>
            <input
              type="text"
              id="rating"
              name="rating"
              value={recipe.rating}
              onChange={handleChange}
              placeholder="e.g. 90"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label htmlFor="ingredients" className="block mb-2 font-semibold">Ingredients (comma-separated)</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={recipe.ingredients?.join(', ') || ''}
              onChange={(e) =>
                setRecipe(prev => ({
                  ...prev,
                  ingredients: e.target.value.split(',').map(i => i.trim())
                }))
              }
              rows="3"
              placeholder="e.g. Chicken, Garlic, Salt"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
            >
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;