
const User = require('../models/Users.js');
const Favorite = require('../models/Favorite.js');
const Watchlist = require('../models/Watchlist.js');
const Review = require('../models/Review.js');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites watchlist');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ email: user.email, favorites: user.favorites, watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addFavorite = async (req, res) => {
  const { movieId } = req.body;
  try {
    const favorite = await Favorite.create({ movieId, userId: req.user.id });
    await User.findByIdAndUpdate(req.user.id, { $push: { favorites: favorite._id } });
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: 'Error adding favorite' });
  }
};

exports.addToWatchlist = async (req, res) => {
  const { movieId } = req.body;
  try {
    const watchlistItem = await Watchlist.create({ movieId, userId: req.user.id });
    await User.findByIdAndUpdate(req.user.id, { $push: { watchlist: watchlistItem._id } });
    res.status(201).json(watchlistItem);
  } catch (err) {
    res.status(500).json({ message: 'Error adding to watchlist' });
  }
};

exports.addReview = async (req, res) => {
  const { movieId, rating, comment } = req.body;
  try {
    const review = await Review.create({ movieId, userId: req.user.id, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error adding review' });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.id;

    const watchlistItem = await Watchlist.findOneAndDelete({ movieId, userId });
    if (!watchlistItem) {
      return res.status(404).json({ message: 'Watchlist item not found' });
    }

    await User.findByIdAndUpdate(userId, { $pull: { watchlist: watchlistItem._id } });

    res.status(200).json({ message: 'Removed from watchlist', watchlistItemId: watchlistItem._id });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};