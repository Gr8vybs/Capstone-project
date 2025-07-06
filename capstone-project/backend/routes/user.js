const express = require('express');
const router = express.Router();
const { getProfile, addFavorite, addToWatchlist, addReview, removeFromWatchlist } = require('../controllers/userController.js');
const { auth } = require('../middlewares/auth.js');

console.log('Loaded controllers:', { getProfile, addFavorite, addToWatchlist, addReview, removeFromWatchlist }); // Debug import

router.get('/profile', auth, getProfile);
router.post('/favorites', auth, addFavorite);
router.post('/watchlist', auth, addToWatchlist);
router.delete('/watchlist/:movieId', auth, removeFromWatchlist); // Ensure this line is correct
router.post('/reviews', auth, addReview);

module.exports = router;