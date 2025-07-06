
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Favorite', favoriteSchema);