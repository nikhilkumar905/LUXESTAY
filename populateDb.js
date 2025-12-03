const fs = require('fs');
const roomsData = require('./src/data/roomsData').roomsData;

const initialData = {
  rooms: roomsData.map((room, index) => ({
    ...room,
    id: room.id || `room-${index + 1}`
  })),
  users: [],
  bookings: [],
  favorites: []
};

fs.writeFileSync('./db.json', JSON.stringify(initialData, null, 2));
console.log('db.json populated with initial data!');
