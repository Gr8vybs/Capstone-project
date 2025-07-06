import React, { useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getProfile, updateUserPreferences } from '../services/movie';
import '../styles/MovieCard.css';
import PropTypes from 'prop-types';

function MovieCard({ movie }) {
  const { userData, setUserData } = useContext(UserContext);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const defaultPoster = 'https://via.placeholder.com/500x750?text=No+Poster';

  useEffect(() => {
    if (userData) {
      setIsInWatchlist(userData.watchlist?.some(item => item.movieId === movie.id));
      setIsFavorite(userData.favorites?.some(item => item.movieId === movie.id));
    }
  }, [userData, movie.id]);

  const handlePreferenceToggle = useCallback(async (preferenceType) => {
    setIsLoading(true);
    try {
      await updateUserPreferences(movie.id, preferenceType);
      const updatedProfile = await getProfile();
      setUserData(updatedProfile);
    } catch (error) {
      console.error('Error updating preferences:', error);
    } finally {
      setIsLoading(false);
    }
  }, [movie.id, setUserData]);

  const handleImageError = (e) => {
    e.target.src = defaultPoster;
  };

  return (
    <div 
      className={`movie-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Movie card for ${movie.title}`}
    >
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="movie-poster-container">
        <img 
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultPoster}
          alt={movie.title}
          loading="lazy"
          onError={handleImageError}
          className="movie-poster"
        />
        {isHovered && (
          <div className="quick-actions">
            <button
              className={`action-btn ${isInWatchlist ? 'active' : ''}`}
              onClick={() => handlePreferenceToggle('watchlist')}
              disabled={isLoading}
              aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              {isInWatchlist ? '✓ Watchlist' : '+ Watchlist'}
            </button>
            <button
              className={`action-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => handlePreferenceToggle('favorite')}
              disabled={isLoading}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              ♥
            </button>
          </div>
        )}
      </div>
      <div className="movie-details">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="release-year">
            {movie.release_date?.split('-')[0] || 'N/A'}
          </span>
          <span className="rating">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number
  }).isRequired
};

export default MovieCard;