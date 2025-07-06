
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Verify this matches your backend port

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found in localStorage, request may be unauthenticated');
  }
  return {
    headers: { Authorization: token ? `Bearer ${token}` : undefined }
  };
};

// Movie Discovery
export const discoverMovies = async (page = 1, filters = {}) => {
  const response = await axios.get(`${API_URL}/movies/discover`, {
    params: { page, ...filters },
    ...getAuthHeaders()
  });
  return response.data;
};

// Movie Search
export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(`${API_URL}/movies/search`, {
    params: { query, page },
    ...getAuthHeaders()
  });
  return response.data;
};

// User Profile
export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/user/profile`, getAuthHeaders());
  return response.data;
};

// Favorites
export const addFavorite = async (movieId) => {
  const response = await axios.post(
    `${API_URL}/user/favorites`,
    { movieId },
    getAuthHeaders()
  );
  return response.data;
};

export const toggleFavorite = async (movieId) => {
  const response = await axios.post(
    `${API_URL}/user/favorites/toggle`,
    { movieId },
    getAuthHeaders()
  );
  return response.data;
};

// Watchlist
export const addToWatchlist = async (movieId) => {
  const response = await axios.post(
    `${API_URL}/user/watchlist`,
    { movieId },
    getAuthHeaders()
  );
  return response.data;
};

export const removeFromWatchList = async (movieId) => {
  const url = `${API_URL}/user/watchlist/${movieId}`;
  console.log('Removing movieId from watchlist, URL:', url, 'Token:', localStorage.getItem('token'));
  if (typeof movieId !== 'number' || isNaN(movieId)) {
    console.error('Invalid movieId:', movieId);
    throw new Error(`Invalid movieId: ${movieId} (must be a number)`);
  }
  try {
    const response = await axios.delete(url, getAuthHeaders());
    console.log('Removal successful, response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Axios error details:', error.message, 'Status:', error.response?.status, 'URL:', error.response?.config.url, 'Token:', localStorage.getItem('token'));
    throw error;
  }
};

// Combined preferences update (for enhanced MovieCard)
export const updateUserPreferences = async (movieId, action) => {
  const endpoint = action === 'favorite' ? 'favorites' : 'watchlist';
  const response = await axios.post(
    `${API_URL}/user/${endpoint}/toggle`,
    { movieId },
    getAuthHeaders()
  );
  return response.data;
};

// Reviews
export const addReview = async ({ movieId, rating, comment }) => {
  const response = await axios.post(
    `${API_URL}/user/reviews`,
    { movieId, rating, comment },
    getAuthHeaders()
  );
  return response.data;
};

// Movie Details (with caching)
const movieCache = new Map();

export const getDetails = async (id) => {
  if (movieCache.has(id)) return movieCache.get(id);
  const response = await axios.get(`${API_URL}/movies/details/${id}`);
  movieCache.set(id, response.data);
  return response.data;
};