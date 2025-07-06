import React, { useState, useEffect, useRef } from 'react';
import { searchMovies } from '../services/movie';
import { FiSearch as SearchIcon, FiX as ClearIcon } from 'react-icons/fi';
import '../styles/SearchBar.css';

function SearchBar({ setMovies, placeholder = "Search movies..." }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query && query.length >= 2) {
        performSearch();
        updateRecentSearches(query);
      } else {
        setMovies([]);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [query]);

  const updateRecentSearches = (searchTerm) => {
    const updatedSearches = [
      searchTerm,
      ...recentSearches.filter(item => item !== searchTerm)
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const performSearch = async () => {
    setIsSearching(true);
    try {
      const data = await searchMovies(query);
      setMovies(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setMovies([]);
    searchRef.current.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <SearchIcon className="search-icon" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          aria-label="Search movies"
          className="search-input"
        />
        {query && (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <ClearIcon aria-hidden="true" />
          </button>
        )}
        {isSearching && <div className="search-spinner"></div>}
      </div>

      {showSuggestions && recentSearches.length > 0 && query.length < 2 && (
        <div className="search-suggestions">
          <div className="suggestions-header">Recent searches</div>
          <ul>
            {recentSearches.map((search, index) => (
              <li 
                key={index} 
                onClick={() => handleSuggestionClick(search)}
                onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(search)}
                tabIndex="0"
              >
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default React.memo(SearchBar);