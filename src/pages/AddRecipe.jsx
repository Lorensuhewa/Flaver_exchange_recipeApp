import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: '',
    cookingTime: '',
    rating: '',
    strCategory: '',
    strArea: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      id: 'local-' + Date.now(), // Unique ID for local recipes
      title: formData.title,
      ingredients: formData.ingredients.split(',').map(i => i.trim()),
      instructions: formData.instructions,
      image: formData.image,
      cookingTime: formData.cookingTime,
      rating: formData.rating,
      strCategory: formData.strCategory,
      strArea: formData.strArea,
      isLocal: true // Mark it as a local recipe
    };

    const existing = JSON.parse(localStorage.getItem('localRecipes')) || [];
    localStorage.setItem('localRecipes', JSON.stringify([...existing, recipe]));
    navigate('/home'); // Navigate back to home page
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-950 p-10 ">
      <div className="max-w-3xl mx-auto p-8 bg-gray-200 dark:bg-[#1f2937] shadow-2xl rounded-2xl transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">📝 Add a New Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Title *</label>
            <input name="title" type="text" required onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter recipe title" />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Ingredients *</label>
            <input name="ingredients" type="text" required onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Chicken, Garlic, Salt" />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Instructions *</label>
            <textarea name="instructions" required onChange={handleChange}
              className="w-full p-3 h-32 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Describe how to prepare the dish..." />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Image URL *</label>
            <input name="image" type="text" required onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Paste image URL" />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Cooking Time (mins)</label>
            <input name="cookingTime" type="number" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 30" />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Rating (%)</label>
            <input name="rating" type="number" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 85" />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Category</label>
            <input name="strCategory" type="text" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Dessert, Main Course" />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Contry / Region</label>
            <input name="strArea" type="text" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Italian, Indian" />
          </div>

          <div className="text-center">
            <button type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200">
              ➕ Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;