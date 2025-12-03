import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Moon, Sun } from 'lucide-react';
import { usersAPI } from '../services/api';
import './AuthModal.css';

const AuthModal = ({ onClose, onAuthSuccess, darkMode, toggleDarkMode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Phone number must be 10 digits';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        // Login logic
        const users = await usersAPI.findByEmail(formData.email);
        const user = users.length > 0 ? users[0] : null;

        if (user && user.password === formData.password) {
          const { password, ...userWithoutPassword } = user;
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          onAuthSuccess(userWithoutPassword);
          onClose();
        } else {
          setErrors({ submit: 'Invalid email or password' });
        }
      } else {
        // Signup logic
        const existingUsers = await usersAPI.findByEmail(formData.email);
        
        if (existingUsers.length > 0) {
          setErrors({ email: 'Email already exists' });
          return;
        }

        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: '',
          city: '',
          state: '',
          pincode: '',
          country: '',
          createdAt: new Date().toISOString()
        };

        const createdUser = await usersAPI.create(newUser);

        const { password, ...userWithoutPassword } = createdUser;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        onAuthSuccess(userWithoutPassword);
        onClose();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose ? onClose : null}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        {toggleDarkMode && (
          <button className="theme-toggle-auth" onClick={toggleDarkMode} title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
        {onClose && (
          <button className="auth-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        )}

        <div className="auth-modal-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to continue your booking journey' : 'Sign up to start booking amazing rooms'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">
                <User size={18} /> Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={18} /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="phone">
                <Phone size={18} /> Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={18} /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <Lock size={18} /> Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          )}

          {errors.submit && <div className="submit-error">{errors.submit}</div>}

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={toggleMode} className="toggle-btn">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
