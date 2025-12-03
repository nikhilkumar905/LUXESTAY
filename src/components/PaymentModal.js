import React, { useState } from 'react';
import { X, CreditCard, Calendar, Users, MapPin, Shield, Smartphone, Wallet, Bitcoin } from 'lucide-react';
import './PaymentModal.css';

const PaymentModal = ({ bookingData, room, onClose, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Additional payment method fields
  const [paypalEmail, setPaypalEmail] = useState('');
  const [cryptoWallet, setCryptoWallet] = useState('');

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 4) {
      setExpiry(val.length > 2 ? val.slice(0, 2) + '/' + val.slice(2) : val);
    }
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value.replace(/\D/g, ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onConfirm();
    }, 2000);
  };

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: Wallet },
    { id: 'apple-pay', name: 'Apple Pay', icon: Smartphone },
    { id: 'google-pay', name: 'Google Pay', icon: Smartphone },
    { id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin }
  ];

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'credit-card':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cardholder Name</label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                required
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  maxLength="3"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="saveCard"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="checkbox-input"
              />
              <label htmlFor="saveCard" className="checkbox-label">
                Save card for future bookings
              </label>
            </div>
          </>
        );

      case 'paypal':
        return (
          <div className="form-group">
            <label className="form-label">PayPal Email</label>
            <input
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="form-input"
            />
            <p className="payment-info">You will be redirected to PayPal to complete your payment</p>
          </div>
        );

      case 'apple-pay':
        return (
          <div className="payment-method-info">
            <Smartphone size={64} className="payment-icon" />
            <h3>Apple Pay</h3>
            <p>Click the button below to pay with Apple Pay</p>
            <div className="apple-pay-button">
              <span>Pay with Apple Pay</span>
            </div>
          </div>
        );

      case 'google-pay':
        return (
          <div className="payment-method-info">
            <Smartphone size={64} className="payment-icon" />
            <h3>Google Pay</h3>
            <p>Click the button below to pay with Google Pay</p>
            <div className="google-pay-button">
              <span>Pay with Google Pay</span>
            </div>
          </div>
        );

      case 'crypto':
        return (
          <div className="form-group">
            <label className="form-label">Cryptocurrency</label>
            <select className="form-input" required>
              <option value="">Select Cryptocurrency</option>
              <option value="btc">Bitcoin (BTC)</option>
              <option value="eth">Ethereum (ETH)</option>
              <option value="usdt">Tether (USDT)</option>
              <option value="bnb">Binance Coin (BNB)</option>
            </select>
            <label className="form-label" style={{ marginTop: '15px' }}>Wallet Address</label>
            <input
              type="text"
              value={cryptoWallet}
              onChange={(e) => setCryptoWallet(e.target.value)}
              placeholder="Your wallet address"
              required
              className="form-input"
            />
            <p className="payment-info">You will receive payment instructions after confirmation</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <CreditCard size={24} /> Payment Details
          </h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="payment-summary">
          <h3>{room.name}</h3>
          <div className="summary-row">
            <span><MapPin size={16} /> Location:</span>
            <strong>{room.location}</strong>
          </div>
          <div className="summary-row">
            <span><Calendar size={16} /> Check-in:</span>
            <strong>{new Date(bookingData.checkIn).toLocaleDateString()}</strong>
          </div>
          <div className="summary-row">
            <span><Calendar size={16} /> Check-out:</span>
            <strong>{new Date(bookingData.checkOut).toLocaleDateString()}</strong>
          </div>
          <div className="summary-row">
            <span><Users size={16} /> Guests:</span>
            <strong>{bookingData.guests}</strong>
          </div>
          <div className="summary-row total-amount">
            <strong>Total Amount:</strong>
            <strong className="amount">₹{bookingData.total.toFixed(2)}</strong>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="payment-methods">
          <h3 className="section-title">Select Payment Method</h3>
          <div className="payment-method-grid">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  type="button"
                  className={`payment-method-btn ${paymentMethod === method.id ? 'active' : ''}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <Icon size={24} />
                  <span>{method.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          {renderPaymentForm()}

          <div className="secure-payment">
            <Shield size={20} />
            <span>Your payment information is encrypted and secure</span>
          </div>

          <button type="submit" className="submit-btn" disabled={processing}>
            {processing ? 'Processing...' : `Pay ₹${bookingData.total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;