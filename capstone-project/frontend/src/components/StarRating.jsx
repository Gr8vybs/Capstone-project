import React from 'react';
import './styles/StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= rating ? 'filled' : ''}`}
          onClick={() => onRatingChange(star)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onRatingChange(star)}
          aria-label={`Rate ${star} out of 5`}
        >
          ★
        </button>
      ))}
      <span className="rating-text">
        {rating ? `${rating} out of 5` : 'Select rating'}
      </span>
    </div>
  );
};

export default StarRating;