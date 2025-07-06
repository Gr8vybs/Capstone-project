
// Optional: Centralized key management (can be replaced by .env)
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your_default_secret',
  tmdbApiKey: process.env.TMDB_API_KEY || 'your_tmdb_api_key',
};