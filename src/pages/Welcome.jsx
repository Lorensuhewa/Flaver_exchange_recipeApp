import React, { useEffect, useState } from 'react';
import Banner from '../assets/MainBanner.png';
import SearchSection from '../components/SearchSection';
import { Link } from 'react-router-dom';

// to disply our recipes not have funtions
const RecipeCard = ({ recipe }) => {
    return (
        <div className="rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{recipe.strMeal}</h3>
                <p className="text-gray-500 dark:text-gray-300">{recipe.strCategory} - {recipe.strArea}</p>
                <p className="text-gray-500 dark:text-gray-300">Rating: {recipe.strRating || 'N/A'}</p>
            </div>
        </div>
    );
};

const Comments = () => {

    return (


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-12">
            {/* User Review 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="mb-4">
                    <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Sarah J.</p>
                <p className="text-gray-600 dark:text-gray-300">
                    "Absolutely love this platform! The recipes are easy to follow, and I've discovered so many new dishes. I love how the community shares tips and tricks."
                </p>
            </div>

            {/* User Review 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="mb-4">
                    <span className="text-yellow-500 text-xl">⭐⭐⭐⭐☆</span>
                </div>
                <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Michael P.</p>
                <p className="text-gray-600 dark:text-gray-300">
                    "Great experience overall. The recipes are amazing, and I especially love the meal suggestions based on ingredients I have. Only wish there were more videos!"
                </p>
            </div>

            {/* User Review 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="mb-4">
                    <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Linda G.</p>
                <p className="text-gray-600 dark:text-gray-300">
                    "As a beginner cook, I found the recipes here to be incredibly helpful. The step-by-step instructions make it so easy. I’ve cooked my first 5-star meal thanks to this site!"
                </p>
            </div>

            {/* User Review 4 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="mb-4">
                    <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">James B.</p>
                <p className="text-gray-600 dark:text-gray-300">
                    "Flavour Exchange has been a game changer for my weekly meal prep. So many delicious and healthy options. I can’t get enough of the variety!"
                </p>
            </div>

            {/* User Review 5 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="mb-4">
                    <span className="text-yellow-500 text-xl">⭐⭐⭐☆☆</span>
                </div>
                <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Emily W.</p>
                <p className="text-gray-600 dark:text-gray-300">
                    "The recipes are great, but I think the website could use some improvement in navigation. Still, the content is worth it!"
                </p>
            </div>
        </div>

    );
};

const Welcome = () => {
    const [featuredRecipes, setFeaturedRecipes] = useState([]);

    const mealSearchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; //this is main API get from "THE MEAL DB" free api

    //when user start the recipi card items fetched from the api i want to show only 6 items in welcome page
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(mealSearchUrl);
                const data = await response.json();

                if (data.meals) {
                    setFeaturedRecipes(data.meals.slice(0, 6));
                }
            } catch (err) {
                console.error('Error fetching featured recipes:', err);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <>
            {/* Main Banner Section */}
            <section id='home' className="text-center ">
                <div className="relative w-full h-screen bg-cover bg-center z-0" style={{ backgroundImage: `url(${Banner})` }}>
                    {/* Text overlay with gradient */}
                    <div className="flex flex-col justify-center items-start text-white bg-gradient-to-tr from-black to-transparent opacity-80 w-full h-full">
                        {/* Main content */}
                        <div className="text-center px-8 py-4 sm:px-20 sm:py-8">
                            <h1 className="flex flex-col text-start text-6xl font-bold leading-tight mb-6 mr-1 text-shadow-black">
                                Welcome to <span className="text-8xl text-red-400 font-extrabold">Flavor Exchange</span>
                            </h1>

                            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 font-serif">Discover, Share, and Enjoy Recipes</h2>
                            <p className="text-lg sm:text-xl max-w-3xl mb-6 font-light">
                                Join our community of food lovers and explore a world of flavors.
                            </p>

                            <Link to="/signup" className="flex justify-center items-center mt-6">
                                <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300">
                                    Sign Up Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search Section make this section seperately in components*/}
            <section id='search'>
                <SearchSection />
            </section>

            <section id='recipe' className="flex flex-col py-16 bg-gradient-to-b from-pink-200 to-white dark:from-gray-950 dark:to-gray-800 text-center px-20">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white mb-8">Most Featured Recipes</h2>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10">
                    Explore our handpicked selection of delicious meals. Each recipe is a delightful experience from across the globe.<br /><br />
                    <b className='text-red-500'>Get more recipes and details by signing up and logging into our site.</b>
                </p>

                {/* recipe card (above mentioned) disply here*/}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-12">
                    {featuredRecipes.length > 0 ? (
                        featuredRecipes.map((recipe) => (
                            <div key={recipe.idMeal} className="rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white dark:bg-gray-800">
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 text-lg mt-10">
                            No featured recipes available.
                        </div>
                    )}
                </div>
            </section>

            <section id='comments' className="py-16 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900 dark:to-gray-900 text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white mb-8">What Our Users Say</h2>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
                    Don’t just take our word for it – hear from our community of food enthusiasts!
                </p>
                    {/* User Comments examples */}
                    <Comments />

            </section>

            <section id='about' className="py-16 bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 text-white dark:from-indigo-800 dark:via-pink-800 dark:to-red-800 text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Join the Flavour Exchange Today!</h2>
                <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8">
                    Be a part of our vibrant community! Discover, share, and enjoy the best recipes from all around the world. Join now and start exploring a world of flavors at your fingertips!
                </p>

                <Link to="/signup">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300">
                        Sign Up Now
                    </button>
                </Link>

                <p className="text-lg mt-6 text-gray-200">
                    Already a member? <Link to="/login" className="font-bold text-pink-300 hover:text-white">Log in here.</Link>
                </p>
            </section>
        </>
    );
};

export default Welcome;