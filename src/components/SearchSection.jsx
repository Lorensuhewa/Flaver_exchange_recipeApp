import React, { useState } from 'react';

const SearchSection = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // functionality  to handle the search 
        console.log('Searching for:', searchQuery);
    };

    return (
        <section className="bg-gray-100 dark:bg-gray-800 py-12 shadow-md dark:shadow-lg">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Find Your Favorite Recipes</h2>
                <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">Search for recipes by ingredients, dish name, or cuisine type.</p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex justify-center items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search for recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400"
                    />
                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400"
                    >
                        Search
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SearchSection;