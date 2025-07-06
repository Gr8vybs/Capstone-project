
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }],
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Watchlist' }],
});

module.exports = mongoose.model('User', userSchema);