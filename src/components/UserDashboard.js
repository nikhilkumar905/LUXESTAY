import React, { useState } from 'react';
import { User, Calendar, Heart, MapPin, DollarSign, Clock, X } from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = ({ bookings = [], favorites = [], rooms, onClose, onRemoveFavorite, onCancelBooking }) => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancelClick = (booking, status) => {
    if (status === 'upcoming') {
      if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
        onCancelBooking(booking.id);
      }
    } else if (status === 'completed') {
      if (window.confirm('Remove this booking from your history?')) {
        onCancelBooking(booking.id);
      }
    }
  };

  const getFavoriteRooms = () => {
    return rooms.filter(room => favorites.includes(room.id));
  };

  const getBookingStatus = (booking) => {
    const checkInDate = new Date(booking.checkIn);
    const today = new Date();
    
    if (checkInDate > today) return 'upcoming';
    if (checkInDate <= today && new Date(booking.checkOut) >= today) return 'active';
    return 'completed';
  };

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { class: 'status-upcoming', text: 'Upcoming' },
      active: { class: 'status-active', text: 'Active' },
      completed: { class: 'status-completed', text: 'Completed' }
    };
    const badge = badges[status];
    return <span className={`status-badge ${badge.class}`}>{badge.text}</span>;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dashboard-header">
          <div className="user-profile">
            <div className="user-avatar">
              <User size={32} />
            </div>
            <div>
              <h2>My Dashboard</h2>
              <p>Manage your bookings and favorites</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={20} />
            My Bookings ({bookings.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <Heart size={20} />
            Favorites ({favorites.length})
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'bookings' && (
            <div className="bookings-section">
              {bookings.length === 0 ? (
                <div className="empty-state">
                  <Calendar size={64} />
                  <h3>No Bookings Yet</h3>
                  <p>Start booking your dream rooms today!</p>
                </div>
              ) : (
                <div className="bookings-list">
                  {bookings.map((booking, index) => {
                    const status = getBookingStatus(booking);
                    return (
                      <div key={index} className="booking-card">
                        <div className="booking-image">
                          <img src={booking.room.images[0]} alt={booking.room.name} />
                          {getStatusBadge(status)}
                        </div>
                        <div className="booking-details">
                          <h3>{booking.room.name}</h3>
                          <div className="booking-info">
                            <div className="info-item">
                              <MapPin size={16} />
                              <span>{booking.room.location}</span>
                            </div>
                            <div className="info-item">
                              <Calendar size={16} />
                              <span>{new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</span>
                            </div>
                            <div className="info-item">
                              <Clock size={16} />
                              <span>{booking.nights} night{booking.nights > 1 ? 's' : ''}</span>
                            </div>
                            <div className="info-item">
                              <DollarSign size={16} />
                              <span className="booking-price">₹{booking.total.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="booking-actions">
                            <button 
                              className="view-booking-btn"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              View Details
                            </button>
                            {status === 'upcoming' && (
                              <button 
                                className="cancel-booking-btn"
                                onClick={() => handleCancelClick(booking, status)}
                              >
                                Cancel Booking
                              </button>
                            )}
                            {status === 'completed' && (
                              <button 
                                className="remove-booking-btn"
                                onClick={() => handleCancelClick(booking, status)}
                                title="Remove from history"
                              >
                                <X size={18} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="favorites-section">
              {favorites.length === 0 ? (
                <div className="empty-state">
                  <Heart size={64} />
                  <h3>No Favorites Yet</h3>
                  <p>Save your favorite rooms for quick access!</p>
                </div>
              ) : (
                <div className="favorites-grid">
                  {getFavoriteRooms().map(room => (
                    <div key={room.id} className="favorite-card">
                      <div className="favorite-image">
                        <img src={room.images[0]} alt={room.name} />
                        <button 
                          className="remove-favorite-btn"
                          onClick={() => onRemoveFavorite(room.id)}
                          title="Remove from favorites"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="favorite-details">
                        <h4>{room.name}</h4>
                        <p className="favorite-location">
                          <MapPin size={14} />
                          {room.location}
                        </p>
                        <div className="favorite-footer">
                          <span className="favorite-rating">
                            ⭐ {room.rating}
                          </span>
                          <span className="favorite-price">₹{room.priceINR || room.price}/night</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="booking-details-overlay" onClick={() => setSelectedBooking(null)}>
            <div className="booking-details-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedBooking(null)}>
                <X size={24} />
              </button>
              
              <h2>Booking Details</h2>
              
              <div className="detail-section">
                <img 
                  src={selectedBooking.room.images[0]} 
                  alt={selectedBooking.room.name} 
                  className="detail-room-image"
                />
              </div>

              <div className="detail-section">
                <h3>{selectedBooking.room.name}</h3>
                <p className="detail-location">
                  <MapPin size={16} />
                  {selectedBooking.room.location}
                </p>
              </div>

              <div className="detail-section">
                <h4>Guest Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Full Name:</span>
                  <span className="detail-value">{selectedBooking.fullName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedBooking.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedBooking.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Guests:</span>
                  <span className="detail-value">{selectedBooking.guests} guest{selectedBooking.guests > 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Booking Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Check-in:</span>
                  <span className="detail-value">{new Date(selectedBooking.checkIn).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Check-out:</span>
                  <span className="detail-value">{new Date(selectedBooking.checkOut).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{selectedBooking.nights} night{selectedBooking.nights > 1 ? 's' : ''}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{getStatusBadge(getBookingStatus(selectedBooking))}</span>
                </div>
              </div>

              {selectedBooking.specialRequests && (
                <div className="detail-section">
                  <h4>Special Requests</h4>
                  <p className="special-requests-text">{selectedBooking.specialRequests}</p>
                </div>
              )}

              <div className="detail-section payment-summary">
                <h4>Payment Summary</h4>
                <div className="detail-row">
                  <span className="detail-label">Room Rate (₹{selectedBooking.room.priceINR || selectedBooking.room.price} × {selectedBooking.nights} nights):</span>
                  <span className="detail-value">₹{(selectedBooking.room.priceINR || selectedBooking.room.price) * selectedBooking.nights}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Taxes & Fees:</span>
                  <span className="detail-value">₹{(selectedBooking.total - ((selectedBooking.room.priceINR || selectedBooking.room.price) * selectedBooking.nights)).toFixed(2)}</span>
                </div>
                <div className="detail-row total-row">
                  <span className="detail-label">Total Amount:</span>
                  <span className="detail-value total-amount">₹{selectedBooking.total.toFixed(2)}</span>
                </div>
                {selectedBooking.bookingId && (
                  <div className="detail-row">
                    <span className="detail-label">Booking ID:</span>
                    <span className="detail-value booking-id">{selectedBooking.bookingId}</span>
                  </div>
                )}
                {selectedBooking.bookingDate && (
                  <div className="detail-row">
                    <span className="detail-label">Booked On:</span>
                    <span className="detail-value">{new Date(selectedBooking.bookingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
