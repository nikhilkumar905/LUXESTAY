import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Rooms API
export const roomsAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/rooms/${id}`);
    return response.data;
  },
  
  create: async (roomData) => {
    const response = await axios.post(`${API_URL}/rooms`, roomData);
    return response.data;
  },
  
  update: async (id, roomData) => {
    const response = await axios.put(`${API_URL}/rooms/${id}`, roomData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/rooms/${id}`);
    return response.status === 200;
  }
};

// Users API
export const usersAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  },
  
  create: async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  },
  
  update: async (id, userData) => {
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.status === 200;
  },
  
  findByEmail: async (email) => {
    const response = await axios.get(`${API_URL}/users?email=${email}`);
    return response.data;
  }
};

// Bookings API
export const bookingsAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
  },
  
  getByUserId: async (userId) => {
    const response = await axios.get(`${API_URL}/bookings?userId=${userId}`);
    return response.data;
  },
  
  create: async (bookingData) => {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
  },
  
  update: async (id, bookingData) => {
    const response = await axios.put(`${API_URL}/bookings/${id}`, bookingData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/bookings/${id}`);
    return response.status === 200;
  }
};

// Favorites API
export const favoritesAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/favorites`);
    return response.data;
  },
  
  getByUserId: async (userId) => {
    const response = await axios.get(`${API_URL}/favorites?userId=${userId}`);
    return response.data;
  },
  
  create: async (favoriteData) => {
    const response = await axios.post(`${API_URL}/favorites`, favoriteData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/favorites/${id}`);
    return response.status === 200;
  },
  
  deleteByUserAndRoom: async (userId, roomId) => {
    const response = await axios.get(`${API_URL}/favorites?userId=${userId}&roomId=${roomId}`);
    const favorites = response.data;
    if (favorites.length > 0) {
      const deleteResponse = await axios.delete(`${API_URL}/favorites/${favorites[0].id}`);
      return deleteResponse.status === 200;
    }
    return false;
  }
};
