import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import BannerHome from '../assets/BannerHome.png';
import LoginBG from '../assets/login.png';

const Home = () => {
    // State to store all recipes and filtered recipes based on search query
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // For search query input

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    // API URLs to fetch recipes
    const mealSearchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const mockApiUrl = 'https://67f261cbec56ec1a36d2f2f3.mockapi.io/recipes';

    useEffect(() => {
        // Fetch data from the APIs
        const fetchData = async () => {
            try {
                // Fetch from the first API (meal database)
                const mealRes = await fetch(mealSearchUrl);
                const mealData = await mealRes.json();

                // Fetch from the second API (mock data)
                const mockRes = await fetch(mockApiUrl);
                const mockData = await mockRes.json();

                let apiCombined = []; // To combine both APIs' data

                // If mealData has meals, combine them with mock data
                if (mealData.meals) {
                    apiCombined = mealData.meals.map((meal, index) => {
                        const mock = mockData[index] || {};
                        return {
                            id: meal.idMeal,
                            title: meal.strMeal,
                            image: meal.strMealThumb,
                            category: meal.strCategory,
                            area: meal.strArea,
                            cookingTime: mock?.Cooking_Time || 'N/A',
                            rating: mock?.Rate || 'N/A',
                            ingredients: Object.keys(meal)
                                .filter(key => key.startsWith('strIngredient') && meal[key])
                                .map(key => meal[key].toLowerCase()),
                            isLocal: false,
                        };
                    });
                }

                // Combine local recipes with fetched API data
                const localRecipes = JSON.parse(localStorage.getItem('localRecipes') || '[]');
                const allRecipes = [...localRecipes, ...apiCombined];

                // Set all recipes and filtered recipes
                setRecipes(allRecipes);
                setFilteredRecipes(allRecipes);
            } catch (err) {
                console.error('API fetch error:', err); // Handle errors if fetch fails
            }
        };

        fetchData(); // Call the fetchData function
    }, [searchQuery]); // Run this effect when searchQuery changes

    useEffect(() => {
        // Filter recipes based on the search query
        const query = searchQuery.toLowerCase();
        const results = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query) ||
            recipe.ingredients?.some(ingredient => ingredient.includes(query))
        );
        setFilteredRecipes(results); // Update filtered recipes
    }, [searchQuery, recipes]); // Trigger when searchQuery or recipes change

    const handleDeleteRecipe = (id) => {
        // Delete recipe by ID
        const updated = recipes.filter(r => r.id !== id);
        setRecipes(updated); // Update state with remaining recipes
        setFilteredRecipes(updated); // Update filtered recipes as well
    };

    return (
        <>
            {/* Banner Section */}
            <section id="home" className="bg-white text-center dark:bg-gray-900 mt-10">
                {/* Banner background with image */}
                <div
                    className="relative w-full h-[50vh] bg-cover bg-center z-0 pt-10"
                    style={{ backgroundImage: `url(${BannerHome})` }}
                >
                    <div className="flex justify-center items-center text-white bg-gradient-to-tr from-black to-transparent opacity-100 w-full h-full dark:bg-black dark:opacity-90">
                        {/* Welcome message for the user */}
                        <div className="text-center w-screen mx-10">
                            <div className='flex h-[50vh] gap-20'>
                                <img src={LoginBG} alt="chefBG" className='h-auto' />
                                <div className='flex flex-col items-center w-7xl text-black'>
                                    <h1 className="text-7xl font-extrabold mt-10 dark:text-gray-400">
                                        Hello {user?.username || ""} {/* Show user's name */}
                                    </h1>
                                    <div className='flex items-start justify-center mr-40 pt-10'>
                                        <h1 className="text-6xl font-bold dark:text-gray-400">Welcome to</h1>
                                        <p className="flex flex-col text-outline">
                                            <span className="text-8xl text-purple-800 font-extrabold dark:text-purple-900">Flavor</span>
                                            <span className="text-8xl text-green-800 font-extrabold dark:text-green-900">Exchange</span>
                                        </p>
                                    </div>
                                    <div className='flex items-center text-white font-bold justify-center dark:text-gray-400'>
                                        <h1 className="text-3xl font-serif pt-10 pr-5">Recipe Sharing Platform</h1>
                                        <h2 className="text-3xl font-serif pt-10">Discover, Share, and Enjoy Recipes</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recipes Section */}
            <div className="dark:bg-gray-950 bg-gradient-to-b bg-pink-300 to-white sm:px-6 lg:px-12 py-10">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                            🍽️ Explore Delicious Recipes
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Discover dishes from around the world and find your next favorite meal.
                        </p>
                    </div>

                    {/* Search bar */}
                    <input
                        type="text"
                        placeholder="Search for recipes or ingredients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query as user types
                        className="w-full sm:w-2/3 lg:w-1/2 mx-auto block p-3 mb-8 rounded-xl border border-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />

                    {/* Display filtered recipes */}
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe) => (
                                <RecipeCard key={recipe.idMeal || recipe.id} recipe={recipe} onDelete={handleDeleteRecipe} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
                                No recipes found or wait untill fetching data 🍳
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
