import React from 'react';
import { Home, TrendingUp, Award, User, UserCircle, LogIn, Moon, Sun } from 'lucide-react';
import './Header.css';

const Header = ({ favorites, bookings, onDashboardClick, currentUser, onProfileClick, onLoginClick, onFeaturedClick, darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Home size={32} className="logo-icon" />
          <span className="logo-text">LuxeStay</span>
        </div>
        <nav className="nav">
          <a href="#popular" className="nav-link">
            <TrendingUp size={18} /> Popular
          </a>
          <button onClick={onFeaturedClick} className="nav-link nav-button">
            <Award size={18} /> Featured
          </button>
          {currentUser && (
            <button onClick={onDashboardClick} className="nav-link nav-button">
              <User size={18} /> Dashboard
              {(bookings.length > 0 || favorites.length > 0) && (
                <span className="badge">{bookings.length + favorites.length}</span>
              )}
            </button>
          )}
          <button onClick={toggleDarkMode} className="nav-link nav-button theme-toggle" title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {currentUser ? (
            <button onClick={onProfileClick} className="nav-link nav-button profile-btn">
              <UserCircle size={18} />
              <span className="user-name">{currentUser.name}</span>
            </button>
          ) : (
            <button onClick={onLoginClick} className="nav-link nav-button login-btn">
              <LogIn size={18} /> Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;