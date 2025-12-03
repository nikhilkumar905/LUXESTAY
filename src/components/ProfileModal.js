import React, { useState } from 'react';
import { X, User, Mail, Phone, Calendar, Edit2, Save, LogOut, MapPin, Home } from 'lucide-react';
import './ProfileModal.css';

const ProfileModal = ({ user, onClose, onUpdateProfile, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    address: user.address || '',
    city: user.city || '',
    state: user.state || '',
    pincode: user.pincode || '',
    country: user.country || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Optional fields validation
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      // Preserve password and merge all fields including optional ones
      users[userIndex] = { 
        ...users[userIndex], 
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || '',
        city: formData.city || '',
        state: formData.state || '',
        pincode: formData.pincode || '',
        country: formData.country || ''
      };
      localStorage.setItem('users', JSON.stringify(users));
    }

    const updatedUser = { 
      ...user, 
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address || '',
      city: formData.city || '',
      state: formData.state || '',
      pincode: formData.pincode || '',
      country: formData.country || ''
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    onUpdateProfile(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      phone: user.phone || '',
      email: user.email || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      pincode: user.pincode || '',
      country: user.country || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="profile-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <h2>{user.name}</h2>
          <p className="profile-member-since">
            <Calendar size={16} />
            Member since {formatDate(user.createdAt)}
          </p>
        </div>

        <div className="profile-body">
          <div className="profile-actions">
            {!isEditing ? (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                <Edit2 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  <Save size={18} />
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="profile-info">
            <div className="info-group">
              <label>
                <User size={18} />
                Full Name
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </>
              ) : (
                <p>{user.name}</p>
              )}
            </div>

            <div className="info-group">
              <label>
                <Mail size={18} />
                Email
              </label>
              {isEditing ? (
                <>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </>
              ) : (
                <p>{user.email}</p>
              )}
            </div>

            <div className="info-group">
              <label>
                <Phone size={18} />
                Phone Number
              </label>
              {isEditing ? (
                <>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </>
              ) : (
                <p>{user.phone || 'Not provided'}</p>
              )}
            </div>

            <div className="info-section-header">
              <h3>Address Details (Optional)</h3>
            </div>

            <div className="info-group">
              <label>
                <Home size={18} />
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                />
              ) : (
                <p>{user.address || 'Not provided'}</p>
              )}
            </div>

            <div className="info-row">
              <div className="info-group">
                <label>
                  <MapPin size={18} />
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                ) : (
                  <p>{user.city || 'Not provided'}</p>
                )}
              </div>

              <div className="info-group">
                <label>
                  <MapPin size={18} />
                  State
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                ) : (
                  <p>{user.state || 'Not provided'}</p>
                )}
              </div>
            </div>

            <div className="info-row">
              <div className="info-group">
                <label>
                  <MapPin size={18} />
                  Pincode
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit pincode"
                      maxLength="6"
                      className={errors.pincode ? 'error' : ''}
                    />
                    {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                  </>
                ) : (
                  <p>{user.pincode || 'Not provided'}</p>
                )}
              </div>

              <div className="info-group">
                <label>
                  <MapPin size={18} />
                  Country
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />
                ) : (
                  <p>{user.country || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>

          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
