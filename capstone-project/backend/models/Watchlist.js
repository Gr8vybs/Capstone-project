
const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Watchlist', watchlistSchema);