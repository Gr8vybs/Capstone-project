const express = require('express');
const router = express.Router();
const { 
  discoverMovies,
  searchMovies, 
  getMovieDetails 
} = require('../controllers/movieController.js');
const { auth } = require('../middlewares/auth.js');

// Public routes
router.get('/discover', discoverMovies); // For Movies.jsx infinite scroll
router.get('/search', searchMovies); // For search functionality

// Protected routes (require authentication)
router.get('/details/:id', auth, getMovieDetails); // Movie details with auth

module.exports = router;