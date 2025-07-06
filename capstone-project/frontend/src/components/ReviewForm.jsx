import React, { useState } from 'react';
import { addReview } from '../services/movie';
import StarRating from './StarRating';
import './styles/ReviewForm.css';

function ReviewForm({ movieId, onReviewSubmit }) {
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
    title: ''
  });
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_CHARS = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview(prev => ({
      ...prev,
      [name]: name === 'comment' ? value.slice(0, MAX_CHARS) : value
    }));
  };

  const handleRatingChange = (rating) => {
    setReview(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!review.rating) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addReview({ 
        movieId, 
        rating: review.rating, 
        comment: review.comment,
        title: review.title
      });
      setReview({
        rating: 0,
        comment: '',
        title: ''
      });
      setIsSuccess(true);
      if (onReviewSubmit) onReviewSubmit();
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-title">Write a Review</h3>
      
      <div className="form-group">
        <label htmlFor="review-title">Title (optional)</label>
        <input
          id="review-title"
          type="text"
          name="title"
          value={review.title}
          onChange={handleChange}
          placeholder="Add a title to your review"
          maxLength="100"
        />
      </div>

      <div className="form-group">
        <label>Your Rating</label>
        <StarRating 
          rating={review.rating}
          onRatingChange={handleRatingChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="review-comment">Review</label>
        <textarea
          id="review-comment"
          name="comment"
          value={review.comment}
          onChange={handleChange}
          placeholder="Share your thoughts about this movie..."
          maxLength={MAX_CHARS}
          required
          rows="5"
        />
        <div className="char-count">
          {review.comment.length}/{MAX_CHARS} characters
        </div>
      </div>

      {error && <div className="error-message" role="alert">{error}</div>}
      {isSuccess && (
        <div className="success-message" role="status">
          Review submitted successfully!
        </div>
      )}

      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitting || !review.rating}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}

export default ReviewForm;