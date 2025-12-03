import React, { useState } from 'react';
import { X, Calendar, Users, Shield } from 'lucide-react';
import './BookingModal.css';

const BookingModal = ({ room, onClose, onProceedToPayment, currentUser }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const price = room.priceINR || room.price;
    const subtotal = nights * price;
    const tax = subtotal * 0.1;
    const serviceFee = 150;
    return {
      nights,
      subtotal,
      tax,
      serviceFee,
      total: subtotal + tax + serviceFee
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totals = calculateTotal();
    onProceedToPayment({
      fullName: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      address: currentUser.address || '',
      city: currentUser.city || '',
      state: currentUser.state || '',
      pincode: currentUser.pincode || '',
      country: currentUser.country || '',
      checkIn,
      checkOut,
      guests,
      specialRequests,
      ...totals
    });
  };

  const totals = calculateTotal();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Book {room.name}</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="user-info-display">
            <h3>Booking for:</h3>
            <div className="user-info-item">
              <strong>Name:</strong> {currentUser.name}
            </div>
            <div className="user-info-item">
              <strong>Email:</strong> {currentUser.email}
            </div>
            <div className="user-info-item">
              <strong>Phone:</strong> {currentUser.phone}
            </div>
            {currentUser.address && (
              <div className="user-info-item">
                <strong>Address:</strong> {currentUser.address}
                {currentUser.city && `, ${currentUser.city}`}
                {currentUser.state && `, ${currentUser.state}`}
                {currentUser.pincode && ` - ${currentUser.pincode}`}
              </div>
            )}
          </div>

          <div className="form-section-title">Booking Details</div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <Calendar size={18} /> Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Calendar size={18} /> Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Users size={18} /> Number of Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="form-input"
            >
              {[...Array(room.capacity)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} Guest{i > 0 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Special Requests (Optional)</label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requirements or preferences..."
              className="form-textarea"
            />
          </div>

          {/* Price Breakdown */}
          {totals.nights > 0 && (
            <div className="price-breakdown">
              <h3 className="breakdown-title">Price Details</h3>
              <div className="breakdown-row">
                <span>₹{room.priceINR || room.price} × {totals.nights} night{totals.nights > 1 ? 's' : ''}</span>
                <span>₹{totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="breakdown-row">
                <span>Service Fee</span>
                <span>₹{totals.serviceFee.toFixed(2)}</span>
              </div>
              <div className="breakdown-row">
                <span>Taxes & GST (10%)</span>
                <span>₹{totals.tax.toFixed(2)}</span>
              </div>
              <div className="breakdown-row total-row">
                <strong>Total</strong>
                <strong>₹{totals.total.toFixed(2)}</strong>
              </div>
            </div>
          )}

          <div className="cancellation-policy">
            <Shield size={18} />
            <span>{room.cancellation}</span>
          </div>

          <button type="submit" className="submit-btn" disabled={totals.nights === 0}>
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;