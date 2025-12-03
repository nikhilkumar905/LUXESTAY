import React from 'react';
import { X } from 'lucide-react';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, setFilters, onClose }) => {
  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={onClose} className="close-btn">
          <X size={20} />
        </button>
      </div>
      
      <div className="filter-section">
        <label className="filter-label">Price Range (per night)</label>
        <input
          type="range"
          min="0"
          max="10000"
          value={filters.priceRange[1]}
          onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
          className="range-input"
        />
        <div className="price-display">
          ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">Minimum Rating</label>
        <select 
          value={filters.rating}
          onChange={(e) => setFilters({...filters, rating: parseFloat(e.target.value)})}
          className="select-input"
        >
          <option value="0">All Ratings</option>
          <option value="4.5">4.5+ Stars</option>
          <option value="4.7">4.7+ Stars</option>
          <option value="4.9">4.9+ Stars</option>
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Room Type</label>
        <select 
          value={filters.roomType}
          onChange={(e) => setFilters({...filters, roomType: e.target.value})}
          className="select-input"
        >
          <option value="all">All Types</option>
          <option value="Suite">Suite</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Standard">Standard</option>
          <option value="Presidential">Presidential</option>
          <option value="Studio">Studio</option>
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Bed Type</label>
        <select 
          value={filters.bedType || 'all'}
          onChange={(e) => setFilters({...filters, bedType: e.target.value})}
          className="select-input"
        >
          <option value="all">All Bed Types</option>
          <option value="Single Bed">Single Bed</option>
          <option value="Double Bed">Double Bed</option>
          <option value="King Size">King Size</option>
        </select>
      </div>

      <button 
        className="reset-button"
        onClick={() => setFilters({priceRange: [0, 10000], rating: 0, roomType: 'all', bedType: 'all'})}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;