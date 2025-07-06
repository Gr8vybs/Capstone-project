const axios = require('axios');
const { tmdbApiKey } = require('../config/keys.js');

// Discover movies (used in Movies.jsx)
exports.discoverMovies = async (req, res) => {
  const { page = 1, ...filters } = req.query;
  
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: tmdbApiKey,
        page,
        ...filters,
        sort_by: 'popularity.desc' // Default sorting
      }
    });
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages
    });
  } catch (err) {
    console.error('TMDB Error:', err);
    res.status(500).json({ message: 'Error fetching movies from TMDB' });
  }
};

// Search movies (used in movie.jsx service)
exports.searchMovies = async (req, res) => {
  const { query, page = 1 } = req.query;
  
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: tmdbApiKey,
        query,
        page
      }
    });
    res.json({
      results: response.data.results,
      total_pages: response.data.total_pages
    });
  } catch (err) {
    res.status(500).json({ message: 'Error searching movies' });
  }
};

// Get movie details (used in movie.jsx service with caching)
exports.getMovieDetails = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [detailsResponse, creditsResponse] = await Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: { api_key: tmdbApiKey }
      }),
      axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        params: { api_key: tmdbApiKey }
      })
    ]);
    
    res.json({
      ...detailsResponse.data,
      credits: creditsResponse.data
    });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(500).json({ message: 'Error fetching movie details' });
  }
};