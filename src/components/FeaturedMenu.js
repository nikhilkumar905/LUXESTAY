import React, { useState, useEffect } from 'react';
import { 
  MapPin, Tag, Clock, Sparkles, Star, Map, Grid, Users, 
  TrendingUp, Calendar, Home, X, ChevronRight 
} from 'lucide-react';
import './FeaturedMenu.css';

const FeaturedMenu = ({ rooms, onCitySelect, onFilterChange, onClose }) => {
  const [activeTab, setActiveTab] = useState('cities');
  const [trendingSearches, setTrendingSearches] = useState([]);

  // Popular cities data
  const popularCities = [
    { name: 'Mumbai', icon: '🏙️', count: rooms.filter(r => r.city === 'Mumbai').length },
    { name: 'Goa', icon: '🏖️', count: rooms.filter(r => r.city === 'Goa').length },
    { name: 'Delhi', icon: '🕌', count: rooms.filter(r => r.city === 'Delhi').length },
    { name: 'Bengaluru', icon: '🌳', count: rooms.filter(r => r.city === 'Bengaluru').length },
    { name: 'Jaipur', icon: '🏰', count: rooms.filter(r => r.city === 'Jaipur').length },
    { name: 'Chennai', icon: '🌊', count: rooms.filter(r => r.city === 'Chennai').length },
    { name: 'Hyderabad', icon: '💎', count: rooms.filter(r => r.city === 'Hyderabad').length },
    { name: 'Kolkata', icon: '🎭', count: rooms.filter(r => r.city === 'Kolkata').length }
  ];

  // Load trending searches from localStorage
  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem('trendingSearches') || '[]');
    setTrendingSearches(searches.slice(0, 5));
  }, []);

  // Top deals - rooms under ₹3000 or with high ratings
  const topDeals = rooms
    .filter(r => r.priceINR <= 3000 && r.rating >= 4.3)
    .sort((a, b) => a.priceINR - b.priceINR)
    .slice(0, 6);

  // Last minute - available within next 3 days
  const lastMinuteRooms = rooms
    .filter(r => r.available)
    .slice(0, 6);

  // Top rated rooms
  const topRated = [...rooms]
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviews - a.reviews;
    })
    .slice(0, 6);

  // New listings (simulate with first 6 rooms)
  const newListings = rooms.slice(0, 6);

  // Curated collections
  const collections = [
    {
      name: 'Beach Stays',
      icon: '🏖️',
      description: 'Coastal escapes near the beach',
      tag: 'beach',
      cities: ['Goa', 'Chennai'],
      count: rooms.filter(r => ['Goa', 'Chennai'].includes(r.city)).length
    },
    {
      name: 'Budget Stays',
      icon: '💰',
      description: 'Quality rooms under ₹2500',
      priceMax: 2500,
      count: rooms.filter(r => r.priceINR <= 2500).length
    },
    {
      name: 'Business Friendly',
      icon: '💼',
      description: 'Perfect for work travelers',
      amenities: ['wifi', 'desk'],
      cities: ['Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad'],
      count: rooms.filter(r => ['Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad'].includes(r.city)).length
    },
    {
      name: 'Luxury Experience',
      icon: '👑',
      description: 'Premium stays for special occasions',
      type: 'Suite',
      count: rooms.filter(r => r.type === 'Suite' || r.priceINR >= 5000).length
    },
    {
      name: 'Heritage Properties',
      icon: '🏛️',
      description: 'Historic charm meets modern comfort',
      cities: ['Jaipur', 'Delhi'],
      count: rooms.filter(r => ['Jaipur', 'Delhi'].includes(r.city)).length
    },
    {
      name: 'Family Friendly',
      icon: '👨‍👩‍👧‍👦',
      description: 'Spacious rooms for families',
      minCapacity: 3,
      count: rooms.filter(r => r.capacity >= 3).length
    }
  ];

  // Seasonal picks
  const seasonalPicks = [
    {
      name: 'Diwali Getaways',
      icon: '🪔',
      description: 'Celebrate the festival of lights',
      cities: ['Jaipur', 'Delhi', 'Mumbai'],
      color: '#ff9933'
    },
    {
      name: 'Monsoon Escapes',
      icon: '🌧️',
      description: 'Enjoy the rainy season',
      cities: ['Goa', 'Mumbai', 'Chennai'],
      color: '#4CAF50'
    },
    {
      name: 'Winter Retreats',
      icon: '❄️',
      description: 'Cozy stays for cold weather',
      cities: ['Jaipur', 'Delhi', 'Pune'],
      color: '#2196F3'
    }
  ];

  const handleCityClick = (cityName) => {
    onCitySelect(cityName);
    addToTrendingSearches(cityName);
    onClose();
  };

  const handleCollectionClick = (collection) => {
    if (collection.cities) {
      // For now, select the first city in the collection
      onCitySelect(collection.cities[0]);
    } else if (collection.priceMax) {
      onFilterChange({ priceRange: [0, collection.priceMax] });
    }
    onClose();
  };

  const addToTrendingSearches = (searchTerm) => {
    const searches = JSON.parse(localStorage.getItem('trendingSearches') || '[]');
    const updated = [searchTerm, ...searches.filter(s => s !== searchTerm)].slice(0, 10);
    localStorage.setItem('trendingSearches', JSON.stringify(updated));
  };

  const tabs = [
    { id: 'cities', label: 'Popular Cities', icon: MapPin },
    { id: 'deals', label: 'Top Deals', icon: Tag },
    { id: 'lastminute', label: 'Last Minute', icon: Clock },
    { id: 'toprated', label: 'Top Rated', icon: Star },
    { id: 'new', label: 'New Listings', icon: Sparkles },
    { id: 'collections', label: 'Collections', icon: Grid },
    { id: 'seasonal', label: 'Seasonal', icon: Calendar }
  ];

  return (
    <div className="featured-menu-overlay" onClick={onClose}>
      <div className="featured-menu-content" onClick={(e) => e.stopPropagation()}>
        <div className="featured-menu-header">
          <div className="featured-menu-title">
            <Home size={24} />
            <h2>Featured & Trending</h2>
          </div>
          <button className="featured-menu-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="featured-menu-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`featured-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="featured-menu-body">
          {/* Popular Cities */}
          {activeTab === 'cities' && (
            <div className="featured-section">
              <div className="section-header">
                <h3>Popular Cities</h3>
                <p>Discover rooms in India's top destinations</p>
              </div>
              <div className="cities-grid">
                {popularCities.map(city => (
                  <div
                    key={city.name}
                    className="city-card"
                    onClick={() => handleCityClick(city.name)}
                  >
                    <div className="city-icon">{city.icon}</div>
                    <div className="city-info">
                      <h4>{city.name}</h4>
                      <p>{city.count} properties</p>
                    </div>
                    <ChevronRight size={20} className="city-arrow" />
                  </div>
                ))}
              </div>

              {trendingSearches.length > 0 && (
                <div className="trending-searches">
                  <div className="section-subheader">
                    <TrendingUp size={18} />
                    <h4>Trending Searches</h4>
                  </div>
                  <div className="trending-chips">
                    {trendingSearches.map((search, idx) => (
                      <span
                        key={idx}
                        className="trending-chip"
                        onClick={() => handleCityClick(search)}
                      >
                        {search}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Top Deals */}
          {activeTab === 'deals' && (
            <div className="featured-section">
              <div className="section-header">
                <h3>Top Deals</h3>
                <p>Best value rooms with great ratings</p>
              </div>
              <div className="deals-grid">
                {topDeals.map(room => (
                  <div key={room.id} className="deal-card">
                    <img src={room.images[0]} alt={room.name} />
                    <div className="deal-badge">Great Deal</div>
                    <div className="deal-info">
                      <h4>{room.name}</h4>
                      <p className="deal-location">
                        <MapPin size={14} /> {room.city}
                      </p>
                      <div className="deal-footer">
                        <div className="deal-rating">
                          <Star size={14} fill="#FFC107" color="#FFC107" />
                          {room.rating}
                        </div>
                        <div className="deal-price">₹{room.priceINR}/night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last Minute */}
          {activeTab === 'lastminute' && (
            <div className="featured-section">
              <div className="section-header">
                <h3>Last Minute Availability</h3>
                <p>Book now for immediate stays</p>
              </div>
              <div className="deals-grid">
                {lastMinuteRooms.map(room => (
                  <div key={room.id} className="deal-card">
                    <img src={room.images[0]} alt={room.name} />
                    <div className="deal-badge urgent">Available Now</div>
                    <div className="deal-info">
                      <h4>{room.name}</h4>
                      <p className="deal-location">
                        <MapPin size={14} /> {room.city}
                      </p>
                      <div className="deal-footer">
                        <div className="deal-rating">
                          <Star size={14} fill="#FFC107" color="#FFC107" />
                          {room.rating}
                        </div>
                        <div className="deal-price">₹{room.priceINR}/night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Rated */}
          {activeTab === 'toprated' && (
            <div className="featured-section">
              <div className="section-header">
                <h3>Top Rated Rooms</h3>
                <p>Highest-rated properties loved by guests</p>
              </div>
              <div className="deals-grid">
                {topRated.map(room => (
                  <div key={room.id} className="deal-card">
                    <img src={room.images[0]} alt={room.name} />
                    <div className="deal-badge premium">Top Rated</div>
                    <div className="deal-info">
                      <h4>{room.name}</h4>
                      <p className="deal-location">
                        <MapPin size={14} /> {room.city}
                      </p>
                      <div className="deal-footer">
                        <div className="deal-rating">
                          <Star size={14} fill="#FFC107" color="#FFC107" />
                          {room.rating} ({room.reviews})
                        </div>
                        <div className="deal-price">₹{room.priceINR}/night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Listings */}
          {activeTab === 'new' && (
            <div className="featured-section">
              <div className="section-header">
                <h3>New Listings</h3>
                <p>Fresh properties just added</p>
              </div>
              <div className="deals-grid">
                {newListings.map(room => (
                  <div key={room.id} className="deal-card">
                    <img src={room.images[0]} alt={room.name} />
                    <div className="deal-badge new">New</div>
                    <div className="deal-info">
                      <h4>{room.name}</h4>
                      <p className="deal-location">
                        <MapPin size={14} /> {room.city}
                      </p>
                      <div className="deal-footer">
                        <div className="deal-rating">
                          <Star size={14} fill="#FFC107" color="#FFC107" />
                          {room.rating}
                        </div>
                        <div className="deal-price">₹{room.priceINR}/night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Collections */}
          {activeTab === 'collections' && (
            <div className="featured-section">
              <div className="section-header">
                <h3>Curated Collections</h3>
                <p>Handpicked themes for every traveler</p>
              </div>
              <div className="collections-grid">
                {collections.map((collection, idx) => (
                  <div
                    key={idx}
                    className="collection-card"
                    onClick={() => handleCollectionClick(collection)}
                  >
                    <div className="collection-icon">{collection.icon}</div>
                    <div className="collection-info">
                      <h4>{collection.name}</h4>
                      <p>{collection.description}</p>
                      <span className="collection-count">{collection.count} properties</span>
                    </div>
                    <ChevronRight size={20} className="collection-arrow" />
                  </div>
                ))}
              </div>

              <div className="host-cta">
                <Users size={32} />
                <div className="host-cta-content">
                  <h3>Host With Us</h3>
                  <p>List your property and reach millions of travelers</p>
                  <button className="host-cta-btn">Get Started</button>
                </div>
              </div>
            </div>
          )}

          {/* Seasonal Picks */}
          {activeTab === 'seasonal' && (
            <div className="featured-section">
              <div className="section-header">
                <h3>Seasonal Picks</h3>
                <p>Timely recommendations for the perfect getaway</p>
              </div>
              <div className="seasonal-grid">
                {seasonalPicks.map((pick, idx) => (
                  <div
                    key={idx}
                    className="seasonal-card"
                    style={{ '--season-color': pick.color }}
                  >
                    <div className="seasonal-icon">{pick.icon}</div>
                    <h4>{pick.name}</h4>
                    <p>{pick.description}</p>
                    <div className="seasonal-cities">
                      {pick.cities.map(city => (
                        <span
                          key={city}
                          className="seasonal-city-chip"
                          onClick={() => handleCityClick(city)}
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="map-view-cta">
                <Map size={48} />
                <div className="map-cta-content">
                  <h3>Explore Map View</h3>
                  <p>Browse properties geographically and find the perfect location</p>
                  <button className="map-cta-btn">View Map</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedMenu;
