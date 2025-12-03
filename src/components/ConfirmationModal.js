import React from 'react';
import { X, Check, MapPin, Calendar, Users, CreditCard } from 'lucide-react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ bookingData, room, onClose }) => {
  const bookingRef = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn-top">
          <X size={24} />
        </button>

        <div className="confirmation-content">
          <div className="success-icon">
            <Check size={48} />
          </div>
          
          <h2 className="confirmation-title">Booking Confirmed!</h2>
          <p className="confirmation-text">
            Your reservation has been successfully processed
          </p>

          <div className="booking-reference">
            <strong>Booking Reference:</strong>
            <span className="ref-number">{bookingRef}</span>
          </div>

          <div className="confirmation-details">
            <h3>{room.name}</h3>
            <div className="detail-row">
              <MapPin size={18} />
              <span>{room.location}</span>
            </div>
            <div className="detail-row">
              <Calendar size={18} />
              <span>
                {new Date(bookingData.checkIn).toLocaleDateString()} - {new Date(bookingData.checkOut).toLocaleDateString()}
              </span>
            </div>
            <div className="detail-row">
              <Users size={18} />
              <span>{bookingData.guests} Guest{bookingData.guests > 1 ? 's' : ''}</span>
            </div>
            <div className="detail-row">
              <CreditCard size={18} />
              <span>₹{bookingData.total.toFixed(2)} paid</span>
            </div>
          </div>

          <div className="next-steps">
            <h4>What's Next?</h4>
            <ul className="steps-list">
              <li>✓ Confirmation email sent to your inbox</li>
              <li>✓ Digital room key will be available 24 hours before check-in</li>
              <li>✓ Download our mobile app for easy access</li>
            </ul>
          </div>

          <div className="confirmation-actions">
            <button className="primary-btn" onClick={onClose}>
              View My Bookings
            </button>
            <button className="secondary-btn" onClick={onClose}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;