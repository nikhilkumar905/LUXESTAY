import React from 'react';
import { Search, Filter, Sparkles, Shield, Clock, Award, MapPin } from 'lucide-react';
import './Hero.css';

const Hero = ({ searchQuery, setSearchQuery, filterVisible, setFilterVisible, selectedCity, setSelectedCity }) => {
  const cities = [
    'All Cities',
    'Mumbai',
    'Goa',
    'Delhi',
    'Jaipur',
    'Bengaluru',
    'Chennai',
    'Hyderabad',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Udaipur',
    'Kochi',
    'Chandigarh',
    'Surat'
  ];

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <Sparkles size={40} className="sparkle" />
          Discover Your Perfect Stay in India
        </h1>
        <p className="hero-subtitle">Experience luxury, comfort, and unforgettable moments across Indian cities</p>
        
        {/* City Selector */}
        <div className="city-selector">
          <MapPin size={20} className="city-icon" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="city-select"
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by room name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button 
            className="filter-button"
            onClick={() => setFilterVisible(!filterVisible)}
          >
            <Filter size={20} />
            Filters
          </button>
        </div>

        {/* Trust Badges */}
        <div className="trust-badges">
          <div className="badge">
            <Shield size={20} />
            <span>Secure Booking</span>
          </div>
          <div className="badge">
            <Clock size={20} />
            <span>24/7 Support</span>
          </div>
          <div className="badge">
            <Award size={20} />
            <span>Best Price Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;