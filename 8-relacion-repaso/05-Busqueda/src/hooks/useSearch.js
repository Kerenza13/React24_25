import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Cache implementation
  const searchCache = new Map();

  const saveToHistory = (searchTerm) => {
    if (!searchTerm) return;
    const newHistory = [searchTerm, ...searchHistory.filter(term => term !== searchTerm)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const performSearch = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    // Check cache first
    if (searchCache.has(searchTerm)) {
      setResults(searchCache.get(searchTerm));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      searchCache.set(searchTerm, data);
      setResults(data);
      saveToHistory(searchTerm);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((term) => performSearch(term), 500),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  // Autocomplete suggestions
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(
    debounce(async (term) => {
      if (!term) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(term)}`);
        if (!response.ok) throw new Error('Failed to fetch suggestions');
        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setSuggestions([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(query);
    return () => fetchSuggestions.cancel();
  }, [query, fetchSuggestions]);

  // Save filters as favorites
  const [favoriteFilters, setFavoriteFilters] = useState(() => {
    const saved = localStorage.getItem('favoriteFilters');
    return saved ? JSON.parse(saved) : [];
  });

  const saveFavoriteFilter = (filter) => {
    const newFavorites = [...favoriteFilters, filter];
    setFavoriteFilters(newFavorites);
    localStorage.setItem('favoriteFilters', JSON.stringify(newFavorites));
  };

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    searchHistory,
    suggestions,
    favoriteFilters,
    saveFavoriteFilter
  };
};