import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterSidebar from './components/FilterSidebar';
import RoomCard from './components/RoomCard';
import BookingModal from './components/BookingModal';
import PaymentModal from './components/PaymentModal';
import ConfirmationModal from './components/ConfirmationModal';
import UserDashboard from './components/UserDashboard';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import FeaturedMenu from './components/FeaturedMenu';
import Footer from './components/Footer';
import { roomsAPI, usersAPI, bookingsAPI, favoritesAPI } from './services/api';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showFeaturedMenu, setShowFeaturedMenu] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [sortBy, setSortBy] = useState('recommended');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    rating: 0,
    roomType: 'all',
    bedType: 'all'
  });

  // Check for logged-in user on mount and fetch rooms
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Fetch rooms from API
        const roomsData = await roomsAPI.getAll();
        setRooms(roomsData);
        setFilteredRooms(roomsData);
        
        // Check for logged-in user
        const user = localStorage.getItem('currentUser');
        if (user) {
          const parsedUser = JSON.parse(user);
          setCurrentUser(parsedUser);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        toast.error('Failed to load data. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Handle page visibility - refresh when tab becomes active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Check if user is still logged in
        try {
          const user = localStorage.getItem('currentUser');
          if (user && !currentUser) {
            const parsedUser = JSON.parse(user);
            setCurrentUser(parsedUser);
          } else if (!user && currentUser) {
            setCurrentUser(null);
          }
        } catch (error) {
          console.error('Error checking user on visibility change:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUser]);

  // Load user-specific data when user logs in
  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser) {
        try {
          // Fetch bookings from API
          const userBookings = await bookingsAPI.getByUserId(currentUser.id);
          setBookings(userBookings);
          
          // Fetch favorites from API
          const userFavorites = await favoritesAPI.getByUserId(currentUser.id);
          setFavorites(userFavorites.map(fav => fav.roomId));
        } catch (error) {
          console.error('Error loading user data:', error);
          setFavorites([]);
          setBookings([]);
        }
      } else {
        setFavorites([]);
        setBookings([]);
      }
    };

    loadUserData();
  }, [currentUser]);

  useEffect(() => {
    let filtered = rooms.filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           room.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           room.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === 'All Cities' || room.city === selectedCity;
      const roomPrice = room.priceINR || room.price;
      const matchesPrice = roomPrice >= filters.priceRange[0] && roomPrice <= filters.priceRange[1];
      const matchesRating = room.rating >= filters.rating;
      const matchesType = filters.roomType === 'all' || room.type === filters.roomType;
      const matchesBedType = !filters.bedType || filters.bedType === 'all' || room.bedType === filters.bedType;
      
      return matchesSearch && matchesCity && matchesPrice && matchesRating && matchesType && matchesBedType;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.priceINR || a.price) - (b.priceINR || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.priceINR || b.price) - (a.priceINR || a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // recommended - keep original order
        break;
    }

    setFilteredRooms(filtered);
  }, [searchQuery, selectedCity, filters, rooms, sortBy]);

  const toggleFavorite = async (roomId) => {
    if (!currentUser) {
      toast.info('Please login to add favorites');
      return;
    }

    const isCurrentlyFavorite = favorites.includes(roomId);
    
    try {
      if (isCurrentlyFavorite) {
        // Remove from favorites via API
        await favoritesAPI.deleteByUserAndRoom(currentUser.id, roomId);
        setFavorites(favorites.filter(id => id !== roomId));
        toast.info('Removed from favorites');
      } else {
        // Add to favorites via API
        await favoritesAPI.create({
          userId: currentUser.id,
          roomId: roomId
        });
        setFavorites([...favorites, roomId]);
        toast.success('Added to favorites! ❤️');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    }
  };

  const handleBooking = (room) => {
    if (!currentUser) {
      toast.info('Please login to book a room');
      return;
    }
    if (!room.available) {
      toast.error('This room is currently unavailable', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }
    setSelectedRoom(room);
    setShowBookingModal(true);
  };

  const handleProceedToPayment = (data) => {
    setBookingData(data);
    setShowBookingModal(false);
    setShowPaymentModal(true);
    toast.info('Please complete payment to confirm booking', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const handlePaymentConfirm = async () => {
    const newBooking = {
      ...bookingData,
      room: selectedRoom,
      bookingId: `BK${Date.now()}`,
      bookingDate: new Date().toISOString(),
      userId: currentUser.id
    };
    
    try {
      const createdBooking = await bookingsAPI.create(newBooking);
      setBookings(prev => [...prev, createdBooking]);
      
      setShowPaymentModal(false);
      setShowConfirmation(true);
      
      toast.success('🎉 Booking confirmed! Check your dashboard for details.', {
        position: 'top-center',
        autoClose: 5000,
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSelectedRoom(null);
    setBookingData(null);
  };

  const handleRemoveFavorite = async (roomId) => {
    try {
      await favoritesAPI.deleteByUserAndRoom(currentUser.id, roomId);
      setFavorites(favorites.filter(id => id !== roomId));
      toast.info('Removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove favorite');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await bookingsAPI.delete(bookingId);
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      toast.success('Booking cancelled successfully! 🗑️');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    }
  };

  const handleAuthSuccess = async (user) => {
    setCurrentUser(user);
    toast.success(`Welcome back, ${user.name}! 👋`);
  };

  const handleUpdateProfile = async (updatedUser) => {
    try {
      await usersAPI.update(updatedUser.id, updatedUser);
      setCurrentUser(updatedUser);
      toast.success('Profile updated successfully! ✅');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setFavorites([]);
    setBookings([]);
    setShowProfileModal(false);
    setShowDashboard(false);
    toast.info('Logged out successfully');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="app" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  // Show authentication page if no user is logged in
  if (!currentUser) {
    return (
      <div className="app">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? 'dark' : 'light'}
        />
        <AuthModal
          onClose={() => {}}
          onAuthSuccess={handleAuthSuccess}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
    );
  }

  // Main application when user is logged in
  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
      
      <Header 
        favorites={favorites} 
        bookings={bookings}
        currentUser={currentUser}
        onDashboardClick={() => setShowDashboard(true)}
        onProfileClick={() => setShowProfileModal(true)}
        onLoginClick={() => {}}
        onFeaturedClick={() => setShowFeaturedMenu(true)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <Hero 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
      />

      <div className="container">
        {filterVisible && (
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onClose={() => setFilterVisible(false)}
          />
        )}

        <div className="main-content">
          <div className="content-header">
            <div className="results-info">
              <h2>Available Rooms</h2>
              <p>{filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} found</p>
            </div>
            <div className="sort-controls">
              <label htmlFor="sort">Sort by:</label>
              <select 
                id="sort"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>
          </div>

          <div className="rooms-grid">
            {filteredRooms.length === 0 ? (
              <div className="no-results">
                <h3>No rooms found</h3>
                <p>Try adjusting your filters or search query</p>
              </div>
            ) : (
              filteredRooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isFavorite={favorites.includes(room.id)}
                  onToggleFavorite={toggleFavorite}
                  onBook={handleBooking}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          room={selectedRoom}
          currentUser={currentUser}
          onClose={() => setShowBookingModal(false)}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          bookingData={bookingData}
          room={selectedRoom}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handlePaymentConfirm}
        />
      )}

      {showConfirmation && (
        <ConfirmationModal
          bookingData={bookingData}
          room={selectedRoom}
          onClose={handleCloseConfirmation}
        />
      )}

      {showDashboard && currentUser && (
        <UserDashboard
          bookings={bookings}
          favorites={favorites}
          rooms={rooms}
          onClose={() => setShowDashboard(false)}
          onRemoveFavorite={handleRemoveFavorite}
          onCancelBooking={handleCancelBooking}
        />
      )}

      {showProfileModal && currentUser && (
        <ProfileModal
          user={currentUser}
          onClose={() => setShowProfileModal(false)}
          onUpdateProfile={handleUpdateProfile}
          onLogout={handleLogout}
        />
      )}

      {showFeaturedMenu && (
        <FeaturedMenu
          rooms={rooms}
          onCitySelect={setSelectedCity}
          onFilterChange={setFilters}
          onClose={() => setShowFeaturedMenu(false)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;