import React, { useState } from 'react';
import { Heart, Star, Users, Wifi, Coffee, Tv, Wind, Car, MapPin, Home, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import './RoomCard.css';

const RoomCard = ({ room, isFavorite, onToggleFavorite, onBook }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReviews, setShowReviews] = useState(false);

  const amenityIcons = {
    wifi: <Wifi size={20} />,
    tv: <Tv size={20} />,
    ac: <Wind size={20} />,
    parking: <Car size={20} />,
    coffee: <Coffee size={20} />
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="room-card">
      {/* Image Gallery */}
      <div className="image-container">
        <img src={room.images[currentImageIndex]} alt={room.name} className="room-image" />
        
        {room.images.length > 1 && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }} 
              className="image-nav image-nav-left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }} 
              className="image-nav image-nav-right"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(room.id);
          }}
          className={`favorite-btn ${isFavorite ? 'favorite-active' : ''}`}
        >
          <Heart fill={isFavorite ? '#ff4757' : 'none'} size={24} />
        </button>

        <div className={`status-badge ${room.available ? 'available' : 'booked'}`}>
          {room.available ? 'Available' : 'Booked'}
        </div>

        {room.images.length > 1 && (
          <div className="image-dots">
            {room.images.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentImageIndex ? 'dot-active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Room Details */}
      <div className="room-content">
        <div className="room-header">
          <div>
            <h3 className="room-name">{room.name}</h3>
            <div className="location-row">
              <MapPin size={16} />
              <span>{room.location}</span>
            </div>
          </div>
          <div className="room-type">{room.type}</div>
        </div>

        <div className="rating-row">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(room.rating) ? '#fbbf24' : 'none'}
                color="#fbbf24"
              />
            ))}
            <span className="rating-text">{room.rating}</span>
          </div>
          <button onClick={() => setShowReviews(!showReviews)} className="reviews-btn">
            ({room.reviews} reviews)
          </button>
        </div>

        <p className="description">{room.description}</p>

        {/* Features */}
        <div className="features">
          {room.features.map((feature, idx) => (
            <span key={idx} className="feature-tag">
              <Check size={14} /> {feature}
            </span>
          ))}
        </div>

        {/* Amenities */}
        <div className="amenities">
          {room.amenities.map((amenity, idx) => (
            <div key={idx} className="amenity" title={amenity}>
              {amenityIcons[amenity]}
            </div>
          ))}
        </div>

        {/* Room Info */}
        <div className="room-info">
          <div className="info-item">
            <Users size={16} />
            <span>Up to {room.capacity} guests</span>
          </div>
          <div className="info-item">
            <Home size={16} />
            <span>{room.size}</span>
          </div>
        </div>

        {/* Reviews Section */}
        {showReviews && (
          <div className="reviews-section">
            <h4>Recent Reviews</h4>
            {room.reviewsList.map((review, idx) => (
              <div key={idx} className="review">
                <div className="review-header">
                  <strong>{review.name}</strong>
                  <span className="review-date">{review.date}</span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="room-footer">
          <div className="price-section">
            <span className="price">₹{room.priceINR || room.price}</span>
            <span className="per-night">/night</span>
          </div>
          <button
            onClick={() => onBook(room)}
            disabled={!room.available}
            className={`book-btn ${!room.available ? 'book-btn-disabled' : ''}`}
          >
            {room.available ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;