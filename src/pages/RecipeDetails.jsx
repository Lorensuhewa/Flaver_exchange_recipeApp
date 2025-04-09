import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

const RecipeDetails = () => {
    const location = useLocation();
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timerActive, setTimerActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const timerRef = useRef(null); // store the timer

    // Get cookingTime from state passed by the RecipeCard component
    const { cookingTime: initialCookingTime } = location.state || {};

    useEffect(() => {
        if (!id) {
            setError("Recipe ID is missing.");
            setLoading(false);
            return;
        }

        // Check for local recipe first
        const fetchLocalRecipe = () => {
            const localRecipes = JSON.parse(localStorage.getItem('localRecipes')) || [];
            const localRecipe = localRecipes.find(r => r.id === id);

            if (localRecipe) {
                setRecipe(localRecipe);
                setLoading(false);
                return true;
            }

            return false;
        };


        if (fetchLocalRecipe()) return;

        // Fetch recipe from the API if not a local recipe
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.meals && data.meals.length > 0) {
                    setRecipe(data.meals[0]);
                } else {
                    setError("Recipe not found.");
                }
            })
            .catch((err) => {
                setError("Error fetching recipe data.");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (recipe && initialCookingTime) {
            setTimeLeft(initialCookingTime * 60); // Initialize the timer with the cooking time
        }
    }, [recipe, initialCookingTime]);

    const toggleFavorite = () => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (isFavorite) {
            const updated = storedFavorites.filter((item) => item.idMeal !== recipe.idMeal);
            localStorage.setItem("favorites", JSON.stringify(updated));
            setIsFavorite(false);
        } else {
            localStorage.setItem("favorites", JSON.stringify([...storedFavorites, recipe]));
            setIsFavorite(true);
        }
    };

    const startTimer = () => {
        setTimerActive(true);
        let remainingTime = timeLeft;

        const timer = setInterval(() => {
            remainingTime -= 1;
            setTimeLeft(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(timer);
                setTimerActive(false);
            }
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setTimerActive(false);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${minutes}:${sec < 10 ? `0${sec}` : sec}`;
    };

    if (loading) return <div className="text-center p-6 text-gray-700 dark:text-gray-200">Loading...</div>;
    if (error) return <div className="text-center p-6 text-red-500 dark:text-red-400">{error}</div>;

    return (
        <div className="bg-gray-100 mt-20 dark:bg-gray-950 min-h-screen ">
            <div className="p-6 max-w-5xl mx-auto text-gray-800 dark:text-gray-100">
                <div className="mb-6 flex justify-between items-center">
                    <Link
                        to="/home"
                        className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                    >
                        ← Back to Home
                    </Link>
                    <button
                        onClick={toggleFavorite}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${isFavorite
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                    >
                        {isFavorite ? '💖 Added to Favorites' : '🤍 Add to Favorites'}
                    </button>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
                        {recipe?.title || recipe?.strMeal}
                    </h1>
                    <img
                        src={recipe?.image || recipe?.strMealThumb}
                        alt={recipe?.title || recipe?.strMeal}
                        className="rounded-xl mx-auto shadow-xl mb-4 w-3/4 md:w-1/2"
                    />
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {recipe?.strCategory} | {recipe?.strArea}
                    </p>
                </div>

                {/* Timer and other sections */}
                <section className="mb-10 text-center">
                    <h2 className="text-2xl font-semibold mb-4 bg-gray-200 dark:bg-gray-700 p-3 rounded-xl w-fit mx-auto">
                        ⏲️ Cooking Timer
                    </h2>
                    <p className="text-lg">
                        Time Left: {timeLeft !== null ? formatTime(timeLeft) : initialCookingTime + " min"}
                    </p>
                    {!timerActive ? (
                        <button
                            onClick={startTimer}
                            className="bg-green-600 text-white px-4 py-2 mt-3 rounded-xl hover:bg-green-700"
                        >
                            Start Timer
                        </button>
                    ) : (
                        <button
                            onClick={stopTimer}
                            className="bg-red-600 text-white px-4 py-2 mt-3 rounded-xl hover:bg-red-700"
                        >
                            Stop Timer
                        </button>
                    )}
                </section>

                {/* Ingredients and Instructions */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-center bg-gray-200 dark:bg-gray-700 p-3 rounded-xl w-fit mx-auto">
                        🥕 Ingredients
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                        {Array.from({ length: 20 }, (_, i) => {
                            const ingredient = recipe[`strIngredient${i + 1}`];
                            const measure = recipe[`strMeasure${i + 1}`];
                            return ingredient && ingredient.trim() !== '' ? (
                                <li key={i} className="text-gray-800 dark:text-gray-200">
                                     {ingredient} - {measure?.trim()}
                                </li>
                            ) : null;
                        })}
                    </ul>
                </section>



                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 text-center bg-gray-200 dark:bg-gray-700 p-3 rounded-xl w-fit mx-auto">
                        👨‍🍳 Instructions
                    </h2>
                    <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl whitespace-pre-line leading-relaxed shadow-md">
                        {recipe?.instructions || recipe?.strInstructions}
                    </div>
                </section>

                {/* This part is only working when the youtube link or video is avalable */}
                {recipe?.strYoutube && (
                    <section className="mb-10 flex flex-col items-center">
                        <h2 className="text-2xl font-semibold mb-4 bg-gray-200 dark:bg-gray-700 p-3 rounded-xl w-fit mx-auto">
                            🎥 Watch the Video
                        </h2>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
                            title={recipe.strMeal}
                            allowFullScreen
                            className="rounded-xl shadow-lg"
                        ></iframe>
                    </section>
                )}
            </div>
        </div>
    );
};

export default RecipeDetails;