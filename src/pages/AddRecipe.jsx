import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const navigate = useNavigate();
  
  // State to manage form data
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

  // Handles form input change
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare recipe object with data from form
    const recipe = {
      id: 'local-' + Date.now(), // Unique ID for local recipes
      title: formData.title,
      ingredients: formData.ingredients.split(',').map(i => i.trim()), // Split ingredients into an array
      instructions: formData.instructions,
      image: formData.image,
      cookingTime: formData.cookingTime,
      rating: formData.rating,
      strCategory: formData.strCategory,
      strArea: formData.strArea,
      isLocal: true // Mark as a local recipe
    };

    // Get existing local recipes, or start with an empty array
    const existing = JSON.parse(localStorage.getItem('localRecipes')) || [];

    // Save the new recipe to localStorage
    localStorage.setItem('localRecipes', JSON.stringify([...existing, recipe]));

    
    navigate('/home');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-950 p-10 mt-20 ">
      <div className="max-w-3xl mx-auto p-8 bg-gray-200 dark:bg-[#1f2937] shadow-2xl rounded-2xl transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">📝 Add a New Recipe</h2>
        
        {/* Form for adding a new recipe */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Title *</label>
            <input name="title" type="text" required onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter recipe title" />
          </div>

          {/* Ingredients field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Ingredients *</label>
            <input name="ingredients" type="text" required onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Chicken, Garlic, Salt" />
          </div>

          {/* Instructions field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Instructions *</label>
            <textarea name="instructions" required onChange={handleChange}
              className="w-full p-3 h-32 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Describe how to prepare the dish..." />
          </div>

          {/* Image URL field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Image URL *</label>
            <input name="image" type="text" required onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Paste image URL" />
          </div>

          {/* Cooking time field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Cooking Time (mins)</label>
            <input name="cookingTime" type="number" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 30" />
          </div>

          {/* Rating field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Rating (%)</label>
            <input name="rating" type="number" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 85" />
          </div>

          {/* Category field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Category</label>
            <input name="strCategory" type="text" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Dessert, Main Course" />
          </div>

          {/* Region field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Country / Region</label>
            <input name="strArea" type="text" onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Italian, Indian" />
          </div>

          {/* Submit button */}
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
