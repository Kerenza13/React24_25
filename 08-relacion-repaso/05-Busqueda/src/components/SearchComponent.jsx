import React, { useState } from 'react';
import { useSearch } from '../hooks/useSearch';

const SearchComponent = () => {
  const { query, setQuery, results, loading, error, searchHistory } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = ['all', 'electronics', 'clothing', 'books', 'food'];

  const filteredResults = results.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const priceMatch = !maxPrice || item.price <= parseFloat(maxPrice);
    return categoryMatch && priceMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search Input */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Filters */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max price"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Recent searches:</span>
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => setQuery(term)}
                className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResults.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-blue-600 font-medium">${item.price}</p>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {!loading && !error && filteredResults.length === 0 && query && (
          <div className="text-center text-gray-600">
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;