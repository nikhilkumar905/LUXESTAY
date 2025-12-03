import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import './ReviewSection.css';

const ReviewSection = ({ reviews, roomRating, totalReviews }) => {
  const [showAll, setShowAll] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    alert('Thank you for your review! It will be posted after verification.');
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < rating ? '#fbbf24' : 'none'}
        color={index < rating ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  return (
    <div className="review-section">
      <div className="review-header">
        <div className="review-summary">
          <h3>Guest Reviews</h3>
          <div className="rating-summary">
            <div className="rating-badge">
              <Star size={24} fill="#fbbf24" color="#fbbf24" />
              <span className="rating-value">{roomRating}</span>
            </div>
            <span className="review-count">({totalReviews} reviews)</span>
          </div>
        </div>
        <button 
          className="write-review-btn"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          <MessageCircle size={18} />
          Write a Review
        </button>
      </div>

      {showReviewForm && (
        <form className="review-form" onSubmit={handleSubmitReview}>
          <h4>Share Your Experience</h4>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <div className="star-rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  fill={star <= newReview.rating ? '#fbbf24' : 'none'}
                  color={star <= newReview.rating ? '#fbbf24' : '#d1d5db'}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Share your thoughts about this room..."
              rows="4"
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => setShowReviewForm(false)} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>
          </div>
        </form>
      )}

      <div className="reviews-list">
        {displayedReviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header-info">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="reviewer-name">{review.name}</h4>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
              <div className="review-rating">
                {renderStars(review.rating || 5)}
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
            <div className="review-actions">
              <button className="helpful-btn">
                <ThumbsUp size={16} />
                Helpful
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button 
          className="show-more-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : `Show All ${reviews.length} Reviews`}
        </button>
      )}
    </div>
  );
};

export default ReviewSection;
