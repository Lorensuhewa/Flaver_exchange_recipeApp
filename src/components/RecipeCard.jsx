import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFacebook, BsPinterest, BsTwitterX, BsWhatsapp } from "react-icons/bs";

const RecipeCard = ({ recipe, onDelete }) => {
  const recipeId = recipe.id || recipe.idMeal;

  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for any change to the 'favorites' list in localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const found = storedFavorites.some(item => item.id === recipeId);
    setIsFavorite(found);
  }, [recipeId]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updated = storedFavorites.filter(item => item.id !== recipeId);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      const updatedFavorites = [...storedFavorites, recipe];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  const handleDelete = () => {
    const storedRecipes = JSON.parse(localStorage.getItem('localRecipes')) || [];
    const updated = storedRecipes.filter(r => r.id !== recipeId);
    localStorage.setItem('localRecipes', JSON.stringify(updated));
    onDelete(recipeId);
  };

  const handleShare = (platform) => {
    const shareUrl = window.location.href;
    let shareLink = "";

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'pinterest':
        shareLink = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        break;
    }

    window.open(shareLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-gray-700 overflow-hidden transition-transform transform hover:scale-105">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
          {recipe.title}
        </h3>

        <ul className="list-disc list-inside mb-3 text-sm text-gray-600 dark:text-gray-300">
          <li>Cooking Time: <b>{recipe.cookingTime} mins</b></li>
          <li>{recipe.category || recipe.strCategory} - {recipe.area || recipe.strArea}</li>
          <li>Rating: <b>{recipe.rating} %</b> ⭐</li>
        </ul>

        <Link
          to={`/recipe/${recipeId}`}
          state={{ cookingTime: recipe.cookingTime }}
          className="text-purple-600 dark:text-purple-400 text-sm mb-3 hover:underline text-center"
        >
          🔍 View more Details
        </Link>

        <div className="flex justify-center items-center mb-4">
          <button
            onClick={toggleFavorite}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isFavorite
              ? 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-700'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            {isFavorite ? '💖 Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>

        {recipe.isLocal && (
          <div className="flex justify-between items-center mt-4 gap-3">
            <button
              className="bg-yellow-400 text-gray-950 px-3 py-1 rounded hover:bg-yellow-500 text-sm transition dark:bg-yellow-800"
              onClick={() => navigate(`/edit/${recipe.id}`)}
            >
              ✏️ Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition dark:bg-red-800"
              onClick={handleDelete}
            >
              🗑️ Delete
            </button>
          </div>
        )}

        <div>
          <h1 className="text-center font-bold text-xl text-blue-800 dark:text-white mt-4">Share this Recipe</h1>
          <p className="text-start text-gray-600 dark:text-gray-300">Share this recipe with your friends!</p>
        </div>

        <div className="flex justify-center mt-4 gap-4">
          <button onClick={() => handleShare('facebook')} className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 dark:bg-blue-200 dark:text-black">
            <BsFacebook className='text-xl' />
          </button>
          <button onClick={() => handleShare('twitter')} className="bg-blue-400 p-3 rounded-full text-white hover:bg-blue-500 dark:bg-blue-200 dark:text-black">
            <BsTwitterX className='text-xl' />
          </button>
          <button onClick={() => handleShare('pinterest')} className="bg-red-600 p-3 rounded-full text-white hover:bg-red-700 dark:bg-blue-200 dark:text-black">
            <BsPinterest className='text-xl' />
          </button>
          <button onClick={() => handleShare('whatsapp')} className="bg-green-500 p-3 rounded-full text-white hover:bg-green-600 dark:bg-blue-200 dark:text-black">
            <BsWhatsapp className='text-xl' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;



// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { BsFacebook, BsPinterest, BsTwitterX, BsWhatsapp } from "react-icons/bs";

// const RecipeCard = ({ recipe, onDelete }) => {
//   const recipeId = recipe.id || recipe.idMeal;

//   const [isFavorite, setIsFavorite] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem('localRecipe')) || [];
//     const found = storedFavorites.some(item => item.id === recipeId);
//     setIsFavorite(found);
//   }, [recipeId]);

//   const toggleFavorite = () => {
//     const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
//     if (isFavorite) {
//       const updated = storedFavorites.filter(item => item.id !== recipeId);
//       localStorage.setItem('favorites', JSON.stringify(updated));
//       setIsFavorite(false);
//     } else {
//       const updatedFavorites = [...storedFavorites, recipe];
//       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//       setIsFavorite(true);
//     }
//   };
  

//   const handleDelete = () => {
//     const storedRecipes = JSON.parse(localStorage.getItem('localRecipes')) || [];
//     const updated = storedRecipes.filter(r => r.id !== recipeId);
//     localStorage.setItem('localRecipes', JSON.stringify(updated));
//     onDelete(recipeId);
//   };

//   const handleShare = (platform) => {
//     const shareUrl = window.location.href;
//     let shareLink = "";

//     switch (platform) {
//       case 'facebook':
//         shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
//         break;
//       case 'twitter':
//         shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
//         break;
//       case 'pinterest':
//         shareLink = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}`;
//         break;
//       case 'whatsapp':
//         shareLink = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
//         break;
//       default:
//         break;
//     }

//     window.open(shareLink, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-gray-700 overflow-hidden transition-transform transform hover:scale-105">
//       <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
//       <div className="flex flex-col p-4">
//         <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
//           {recipe.title}
//         </h3>

//         <ul className="list-disc list-inside mb-3 text-sm text-gray-600 dark:text-gray-300">
//           <li>Cooking Time: <b>{recipe.cookingTime} mins</b></li>
//           <li>{recipe.category || recipe.strCategory} - {recipe.area || recipe.strArea}</li>
//           <li>Rating: <b>{recipe.rating} %</b> ⭐</li>
//         </ul>

//         <Link
//           to={`/recipe/${recipeId}`}
//           state={{ cookingTime: recipe.cookingTime }}
//           className="text-purple-600 dark:text-purple-400 text-sm mb-3 hover:underline text-center"
//         >
//           🔍 View more Details
//         </Link>

//         <div className="flex justify-center items-center mb-4">
//           <button
//             onClick={toggleFavorite}
//             className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isFavorite
//               ? 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-700'
//               : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
//               }`}
//           >
//             {isFavorite ? '💖 Remove from Favorites' : '🤍 Add to Favorites'}
//           </button>
//         </div>

//         {recipe.isLocal && (
//           <div className="flex justify-between items-center mt-4 gap-3">
//             <button
//               className="bg-yellow-400 text-gray-950 px-3 py-1 rounded hover:bg-yellow-500 text-sm transition dark:bg-yellow-800"
//               onClick={() => navigate(`/edit/${recipe.id}`)}
//             >
//               ✏️ Edit
//             </button>
//             <button
//               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition dark:bg-red-800"
//               onClick={handleDelete}
//             >
//               🗑️ Delete
//             </button>
//           </div>
//         )}

//         <div>
//           <h1 className="text-center font-bold text-xl text-blue-800 dark:text-white mt-4">Share this Recipe</h1>
//           <p className="text-start text-gray-600 dark:text-gray-300">Share this recipe with your friends!</p>
//         </div>

//         <div className="flex justify-center mt-4 gap-4">
//           <button onClick={() => handleShare('facebook')} className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 dark:bg-blue-200 dark:text-black">
//             <BsFacebook className='text-xl' />
//           </button>
//           <button onClick={() => handleShare('twitter')} className="bg-blue-400 p-3 rounded-full text-white hover:bg-blue-500 dark:bg-blue-200 dark:text-black">
//             <BsTwitterX className='text-xl' />
//           </button>
//           <button onClick={() => handleShare('pinterest')} className="bg-red-600 p-3 rounded-full text-white hover:bg-red-700 dark:bg-blue-200 dark:text-black">
//             <BsPinterest className='text-xl' />
//           </button>
//           <button onClick={() => handleShare('whatsapp')} className="bg-green-500 p-3 rounded-full text-white hover:bg-green-600 dark:bg-blue-200 dark:text-black">
//             <BsWhatsapp className='text-xl' />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeCard;
