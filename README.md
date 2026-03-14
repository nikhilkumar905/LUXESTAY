# 🏨 Room Booking App - React + JSON Server

A full-stack room booking application built with React.js frontend and JSON Server backend, featuring Indian cities, INR pricing, dark/light mode, and complete CRUD operations.

## 📹 Demo Videos

- **Live Website**: [Open Deployed App](https://luxestay-sigma.vercel.app/)
- **Live Demo**: [Watch Application Demo](https://drive.google.com/file/d/1Lm7FOm6irmy9nP4bpGIJ6M3S9CFpnNTj/view?usp=drivesdk)
- **Code Walkthrough**: [Watch Code Explanation](https://drive.google.com/file/d/1h5ZHzRD_yNE4HJYswApEcE2hDwSG5yc7/view?usp=drivesdk)

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - Signup/Login with email validation
- 🏙️ **City-Based Search** - Filter rooms by 9 major Indian cities
- 💰 **INR Pricing** - All prices displayed in Indian Rupees (₹)
- 🌓 **Dark/Light Mode** - Toggle between themes with persistence
- ⭐ **Favorites System** - Save favorite rooms for later
- 📅 **Booking Management** - Create, view, and cancel bookings
- 👤 **User Dashboard** - Manage profile, bookings, and favorites
- 🔍 **Advanced Filters** - Filter by price, rating, room type, bed type
- 🎯 **Featured Menu** - Popular cities, top deals, collections, and more

### Technical Features
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete via API
- 🔄 **JSON Server Backend** - RESTful API with persistent data storage
- 📡 **Axios Integration** - HTTP requests for all API communications
- 🎨 **Responsive Design** - Mobile-friendly UI with smooth animations
- 🛡️ **Error Handling** - Error boundaries and graceful error recovery
- 💾 **Data Persistence** - All data stored in `db.json` file

## 🏗️ Project Structure

```
room-booking-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── AuthModal.js           # Login/Signup modal
│   │   ├── BookingModal.js        # Room booking modal
│   │   ├── ConfirmationModal.js   # Booking confirmation
│   │   ├── ErrorBoundary.js       # Error handling component
│   │   ├── FilterSidebar.js       # Search filters sidebar
│   │   ├── Footer.js              # Footer component
│   │   ├── Header.js              # Navigation header
│   │   ├── Hero.js                # Hero section with city selector
│   │   ├── ImageGallery.js        # Image gallery modal
│   │   ├── PaymentModal.js        # Payment processing modal
│   │   ├── ProfileModal.js        # User profile editor
│   │   ├── ReviewSection.js       # Room reviews display
│   │   ├── RoomCard.js            # Individual room card
│   │   └── UserDashboard.js       # User dashboard
│   ├── data/
│   │   └── roomsData.js           # Original static room data
│   ├── services/
│   │   └── api.js                 # API service layer (Axios)
│   ├── App.js                     # Root component
│   ├── App.css                    # Global styles
│   └── index.js                   # React entry point
├── db.json                        # JSON Server database
├── populateDb.js                  # Script to populate db.json
├── package.json                   # Dependencies & scripts
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher) - [Download Here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning) - [Download Here](https://git-scm.com/)

### Installation

1. **Clone or Download the Repository**
   ```bash
   git clone <your-repository-url>
   cd room-booking-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

   This will install all required packages including:
   - React 19.2.0
   - Axios 1.13.2
   - JSON Server 1.0.0-beta.3
   - React Toastify
   - Lucide React Icons
   - Date-fns
   - Concurrently

### Running the Application

#### Option 1: Start Both Servers Together (Recommended)

```bash
npm start
```

This command will:
- Start **JSON Server** on `http://localhost:5000`
- Start **React App** on `http://localhost:3000`
- Automatically open the app in your default browser

#### Option 2: Start Servers Separately

**Terminal 1 - JSON Server Backend:**
```bash
npm run server
```

**Terminal 2 - React Frontend:**
```bash
npm run client
```

### Accessing the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Endpoints**:
  - Rooms: `http://localhost:5000/rooms`
  - Users: `http://localhost:5000/users`
  - Bookings: `http://localhost:5000/bookings`
  - Favorites: `http://localhost:5000/favorites`

## 📊 Database Structure

The `db.json` file contains all application data:

```json
{
  "rooms": [36 rooms with complete details],
  "users": [registered users with authentication],
  "bookings": [user bookings with status],
  "favorites": [user favorites]
}
```

### Room Object Structure
```json
{
  "id": "mumbai-001",
  "city": "Mumbai",
  "name": "Sea-Facing Deluxe Room",
  "type": "Deluxe",
  "description": "Luxurious sea-facing room...",
  "priceINR": 4500,
  "rating": 4.8,
  "reviews": 245,
  "bedType": "King Size",
  "capacity": 2,
  "available": true,
  "images": [...],
  "amenities": [...],
  "address": "Marine Drive, Mumbai"
}
```

## 🔧 API Endpoints & CRUD Operations

### Rooms API
- `GET /rooms` - Get all rooms
- `GET /rooms/:id` - Get room by ID
- `POST /rooms` - Create new room
- `PUT /rooms/:id` - Update room
- `DELETE /rooms/:id` - Delete room

### Users API
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `GET /users?email={email}` - Find user by email
- `POST /users` - Create new user (Signup)
- `PUT /users/:id` - Update user profile
- `DELETE /users/:id` - Delete user

### Bookings API
- `GET /bookings` - Get all bookings
- `GET /bookings?userId={userId}` - Get user's bookings
- `POST /bookings` - Create new booking
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Cancel booking

### Favorites API
- `GET /favorites` - Get all favorites
- `GET /favorites?userId={userId}` - Get user's favorites
- `POST /favorites` - Add to favorites
- `DELETE /favorites/:id` - Remove from favorites

## 🎨 Features Walkthrough

### 1. Authentication
- **Signup**: Create new account with email validation
- **Login**: Secure login with password verification
- **Session**: User data persisted in localStorage

### 2. Room Search & Filters
- **City Filter**: Select from 9 Indian cities or view all
- **Price Range**: Filter by budget (₹0 - ₹10,000)
- **Rating Filter**: Minimum rating selection
- **Room Type**: Single, Double, Suite
- **Bed Type**: Single, Double, King Size
- **Search**: Text search by room name or location

### 3. Booking Process
1. Browse and filter rooms
2. Click "Book Now" on desired room
3. Select check-in/check-out dates and guests
4. Review booking details and price breakdown
5. Proceed to payment
6. Receive booking confirmation

### 4. User Dashboard
- **My Bookings**: View all bookings (Upcoming, Active, Completed)
- **My Favorites**: Quick access to saved rooms
- **Profile Management**: Update personal information
- **Cancel Bookings**: Remove upcoming reservations

### 5. Dark/Light Mode
- Toggle theme using moon/sun icon in header
- Preference saved in localStorage
- Smooth transitions throughout the app

## 🛠️ Technologies Used

### Frontend
- **React** 19.2.0 - UI library
- **Axios** 1.13.2 - HTTP client
- **Lucide React** - Icon library
- **React Toastify** 11.0.5 - Toast notifications
- **Date-fns** 4.1.0 - Date manipulation
- **React Router DOM** 7.9.6 - Routing

### Backend
- **JSON Server** 1.0.0-beta.3 - REST API backend

### Development Tools
- **Concurrently** 9.2.1 - Run multiple scripts
- **React Scripts** 5.0.1 - Build tools

## 📝 Scripts

```json
{
  "start": "concurrently \"npm run server\" \"npm run client\"",
  "server": "json-server --watch db.json --port 5000",
  "client": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test"
}
```

## 🏙️ Available Cities

- Mumbai
- Goa
- Delhi
- Jaipur
- Bengaluru
- Chennai
- Hyderabad
- Kolkata
- Pune

Each city has 4 unique room listings with authentic Indian locations and pricing.

## 💡 Usage Examples

### Creating a New User (Signup)
```javascript
// Handled by AuthModal.js using Axios
const newUser = {
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  phone: "9876543210"
};
await usersAPI.create(newUser);
// POST to http://localhost:5000/users
```

### Making a Booking
```javascript
// Handled by App.js using Axios
const booking = {
  userId: "user-id",
  room: roomObject,
  checkIn: "2025-12-10",
  checkOut: "2025-12-15",
  guests: 2,
  total: 22500
};
await bookingsAPI.create(booking);
// POST to http://localhost:5000/bookings
```

### Adding to Favorites
```javascript
// Handled by App.js using Axios
const favorite = {
  userId: "user-id",
  roomId: "goa-002"
};
await favoritesAPI.create(favorite);
// POST to http://localhost:5000/favorites
```

## 🔒 Security Notes

**Important**: This is a development/demonstration project. For production use:

1. **Password Security**: Currently stores plain text passwords. Implement:
   - Password hashing (bcrypt)
   - JWT authentication
   - Secure session management

2. **API Security**: Add:
   - Authentication middleware
   - Rate limiting
   - CORS configuration
   - Input validation

3. **Data Validation**: Implement:
   - Server-side validation
   - Sanitization of user inputs
   - XSS protection

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows PowerShell
Stop-Process -Name node -Force

# Or kill specific ports
npx kill-port 3000
npx kill-port 5000
```

### Application Not Loading
1. Check both servers are running (`npm start`)
2. Verify `db.json` exists and is valid JSON
3. Clear browser cache and localStorage
4. Check browser console for errors

### Database Not Populating
```bash
# Run the population script
node populateDb.js
```

### Authentication Issues
- Ensure JSON Server is running on port 5000
- Check `db.json` users array
- Verify email format is correct
- Password must be at least 6 characters

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

To serve the production build:
```bash
npm install -g serve
serve -s build
```

## 🔄 Data Flow Architecture

```
User Action
    ↓
React Component
    ↓
API Service (src/services/api.js)
    ↓
Axios HTTP Request
    ↓
JSON Server (localhost:5000)
    ↓
db.json (Data Storage)
```

## 📋 Requirements Fulfilled

✅ React frontend application  
✅ JSON Server backend  
✅ Full CRUD operations (Create, Read, Update, Delete)  
✅ Axios for API requests  
✅ React Router DOM for navigation  
✅ Responsive UI design  
✅ Data persistence in db.json  
✅ User authentication system  
✅ Real-time data updates  

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Nikhil Sah**  
📧 Email: nikhilkumar_sah@srmap.edu.in

## 🙏 Acknowledgments

- React team for the amazing framework
- JSON Server for the simple backend solution
- All contributors and testers

## 📞 Support

For issues, questions, or suggestions:
- Watch the [Code Explanation Video](https://drive.google.com/file/d/1h5ZHzRD_yNE4HJYswApEcE2hDwSG5yc7/view?usp=drivesdk)
- Check the [Live Demo](https://drive.google.com/file/d/1Lm7FOm6irmy9nP4bpGIJ6M3S9CFpnNTj/view?usp=drivesdk)
- Open an issue on GitHub

---

⭐ **Star this repository if you find it helpful!**

**Made with ❤️ using React and JSON Server**
