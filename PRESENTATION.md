# 🏨 Room Booking App - Project Presentation

---

## 📌 Slide 1: Title Slide

### **LUXESTAY - Room Booking Application**
**A Full-Stack Hotel Booking Platform**

**Developed By:**  
Nikhil Kumar Sah  
📧 nikhilkumar_sah@srmap.edu.in

**Repository:** github.com/nikhilkumar905/LUXESTAY

---

## 📌 Slide 2: Project Overview

### **What is LUXESTAY?**

A modern, full-stack hotel room booking application that allows users to:
- 🔍 Search and filter rooms across 9 Indian cities
- 💰 View prices in Indian Rupees (₹)
- 📅 Book accommodations for specific dates
- ⭐ Save favorite rooms
- 👤 Manage bookings through user dashboard
- 🌓 Switch between dark and light themes

**Tech Stack:** React.js + JSON Server + Axios

---

## 📌 Slide 3: Key Features

### **User Features**
✅ **Authentication** - Secure login/signup system  
✅ **Room Search** - Browse 36 rooms across 9 cities  
✅ **Smart Filters** - Price, rating, room type, bed type  
✅ **Booking System** - Complete reservation flow with payment  
✅ **User Dashboard** - View and manage bookings & favorites  
✅ **Theme Toggle** - Dark/Light mode with persistence  

### **Technical Features**
✅ **Full CRUD Operations** - Create, Read, Update, Delete  5
✅ **RESTful API** - JSON Server backend  
✅ **Responsive Design** - Mobile-friendly interface  
✅ **Data Persistence** - All data stored in database  

---

## 📌 Slide 4: System Architecture

```
┌─────────────────────────────────────┐
│   USER INTERFACE (Browser)         │
│   React Frontend - Port 3000       │
└──────────────┬──────────────────────┘
               │
               ↓ Axios HTTP Requests
┌─────────────────────────────────────┐
│   API SERVICE LAYER                 │
│   src/services/api.js               │
└──────────────┬──────────────────────┘
               │
               ↓ REST API Calls
┌─────────────────────────────────────┐
│   JSON SERVER (Backend)             │
│   Port 5000 - REST API              │
└──────────────┬──────────────────────┘
               │
               ↓ Read/Write
┌─────────────────────────────────────┐
│   DATABASE (db.json)                │
│   Persistent Data Storage           │
└─────────────────────────────────────┘
```

---

## 📌 Slide 5: Technology Stack

### **Frontend**
- **React** 19.2.0 - UI Framework
- **Axios** 1.13.2 - HTTP Client
- **React Toastify** - Notifications
- **Lucide React** - Icons
- **Date-fns** - Date Handling
- **React Router DOM** - Navigation

### **Backend**
- **JSON Server** 1.0.0 - REST API
- **Concurrently** - Run multiple servers

### **Development**
- **Node.js** - Runtime Environment
- **npm** - Package Manager
- **Git** - Version Control

---

## 📌 Slide 6: Database Structure

### **db.json - 4 Main Resources**

```json
{
  "rooms": [
    // 36 hotel rooms across 9 cities
    // Fields: id, name, city, price, rating, images, amenities
  ],
  
  "users": [
    // User accounts
    // Fields: id, name, email, password, phone, address
  ],
  
  "bookings": [
    // Room reservations
    // Fields: id, userId, roomId, checkIn, checkOut, total
  ],
  
  "favorites": [
    // User's saved rooms
    // Fields: id, userId, roomId, addedAt
  ]
}
```

---

## 📌 Slide 7: API Endpoints

### **4 RESTful APIs - 20 Functions**

| Resource | Endpoints |
|----------|-----------|
| **Rooms** | GET, POST, PUT, DELETE `/rooms` |
| **Users** | GET, POST, PUT, DELETE `/users` |
| **Bookings** | GET, POST, PUT, DELETE `/bookings` |
| **Favorites** | GET, POST, DELETE `/favorites` |

**Example:**
```javascript
// Get all rooms
GET http://localhost:5000/rooms

// Create booking
POST http://localhost:5000/bookings
{
  "userId": "123",
  "roomId": "mumbai-001",
  "checkIn": "2025-12-10",
  "total": 24900
}
```

---

## 📌 Slide 8: Component Architecture

### **14 React Components**

**Layout Components:**
- Header, Hero, FilterSidebar, Footer

**Display Components:**
- RoomCard, ImageGallery, ReviewSection

**Modal Components:**
- AuthModal, BookingModal, PaymentModal, ConfirmationModal, ProfileModal

**Dashboard Components:**
- UserDashboard

**Utility Components:**
- ErrorBoundary

---

## 📌 Slide 9: User Journey Demo

### **Step-by-Step Flow**

1️⃣ **Landing Page**
   - User sees hero section with city selector
   - Browse 36 available rooms

2️⃣ **Authentication**
   - Sign up with email/password
   - Login to existing account

3️⃣ **Search & Filter**
   - Select city (Mumbai, Goa, Delhi, etc.)
   - Apply filters (price ₹0-₹10,000, rating, bed type)

4️⃣ **Book Room**
   - Select check-in/check-out dates
   - View price breakdown (base + tax + service fee)
   - Confirm payment

5️⃣ **Dashboard**
   - View all bookings (upcoming, active, completed)
   - Manage favorites
   - Edit profile

---

## 📌 Slide 10: Key Features Demo

### **1. Smart Filtering**
```
City: Mumbai → Shows 4 Mumbai rooms
Price: ₹2,000 - ₹5,000 → Narrows results
Rating: 4.5+ → Top-rated only
Bed Type: King Size → Specific bed preference
```

### **2. Booking Calculation**
```
Room: ₹4,500/night × 5 nights = ₹22,500
Service Fee                    = ₹150
Taxes (10% GST)                = ₹2,250
──────────────────────────────────────
Total Amount                   = ₹24,900
```

### **3. Theme Toggle**
- Dark mode for night browsing
- Light mode for daytime
- Preference saved in localStorage

---

## 📌 Slide 11: CRUD Operations

### **Complete Data Management**

**CREATE (POST)**
- ✅ User signup → New user account
- ✅ Book room → New booking record
- ✅ Add favorite → New favorite entry

**READ (GET)**
- ✅ Load all rooms → Display catalog
- ✅ Fetch user bookings → Show in dashboard
- ✅ Get user favorites → Quick access

**UPDATE (PUT)**
- ✅ Edit profile → Update user info
- ✅ Modify booking → Change dates/guests

**DELETE**
- ✅ Cancel booking → Remove reservation
- ✅ Remove favorite → Delete from list

---

## 📌 Slide 12: Code Highlights

### **API Service Pattern**
```javascript
// Centralized API layer - api.js
export const roomsAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
  },
  
  create: async (roomData) => {
    const response = await axios.post(`${API_URL}/rooms`, roomData);
    return response.data;
  }
};

// Usage in components
const rooms = await roomsAPI.getAll();
const newRoom = await roomsAPI.create(roomData);
```

### **State Management**
```javascript
// React hooks for state
const [rooms, setRooms] = useState([]);
const [user, setUser] = useState(null);
const [bookings, setBookings] = useState([]);

// Load data on mount
useEffect(() => {
  const loadData = async () => {
    const data = await roomsAPI.getAll();
    setRooms(data);
  };
  loadData();
}, []);
```

---

## 📌 Slide 13: Data Persistence

### **How Data is Saved**

```
User Action (Browser)
    ↓
React Component
    ↓
API Service (Axios)
    ↓
HTTP Request (POST/PUT/DELETE)
    ↓
JSON Server (Port 5000)
    ↓
db.json File (Permanent Storage)
    ↓
Data Persists (Survives Restarts)
```

**Example:**
```javascript
// User books a room
await bookingsAPI.create({
  userId: "123",
  roomId: "mumbai-001",
  checkIn: "2025-12-10",
  total: 24900
});

// Automatically saved to db.json
// Accessible after server restart
```

---

## 📌 Slide 14: Running the Application

### **Start Command**
```bash
npm start
```

**This starts:**
- ✅ JSON Server on port 5000
- ✅ React App on port 3000
- ✅ Automatically opens browser

### **Access Points**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Rooms API:** http://localhost:5000/rooms
- **Users API:** http://localhost:5000/users

---

## 📌 Slide 15: Project Statistics

### **Numbers at a Glance**

📊 **Data**
- 36 Hotel Rooms
- 9 Indian Cities
- 4 Database Resources

💻 **Code**
- 14 React Components
- 20 API Functions
- 4 RESTful APIs
- 2000+ Lines of Code

🎨 **Features**
- Full CRUD Operations
- Dark/Light Mode
- Responsive Design
- Real-time Updates

---

## 📌 Slide 16: Cities Covered

### **9 Major Indian Cities**

🏙️ **Metro Cities:**
- Mumbai (4 rooms)
- Delhi (4 rooms)
- Bengaluru (4 rooms)
- Chennai (4 rooms)
- Hyderabad (4 rooms)
- Kolkata (4 rooms)
- Pune (4 rooms)

🏖️ **Tourist Destinations:**
- Goa (4 rooms)
- Jaipur (4 rooms)

**Total: 36 unique rooms with authentic Indian locations and INR pricing**

---

## 📌 Slide 17: Requirements Fulfilled

### **All Project Requirements Met ✅**

✅ **React Frontend** - Component-based architecture  
✅ **JSON Server Backend** - REST API on port 5000  
✅ **Full CRUD** - All 4 operations implemented  
✅ **Axios Integration** - HTTP client for API calls  
✅ **React Router DOM** - Navigation and routing  
✅ **Data Persistence** - db.json stores all data  
✅ **Responsive UI** - Mobile-friendly design  
✅ **Authentication** - Login/Signup system  
✅ **Both Servers Running** - Concurrent execution  

---

## 📌 Slide 18: Challenges & Solutions

### **Challenges Faced**

🔴 **Challenge 1:** State management across multiple components  
✅ **Solution:** Centralized state in App.js with props drilling

🔴 **Challenge 2:** API data fetching and error handling  
✅ **Solution:** Created api.js service layer with try-catch

🔴 **Challenge 3:** Authentication without backend tokens  
✅ **Solution:** Used localStorage for session management

🔴 **Challenge 4:** Real-time data updates after CRUD operations  
✅ **Solution:** State updates trigger component re-renders

---

## 📌 Slide 19: Future Enhancements

### **Potential Improvements**

🚀 **Backend:**
- Replace JSON Server with Node.js + Express + MongoDB
- Implement JWT authentication
- Add password hashing (bcrypt)
- File upload for room images

🚀 **Frontend:**
- Payment gateway integration (Razorpay/Stripe)
- Google Maps integration for locations
- Email notifications for bookings
- Advanced search with date availability

🚀 **Features:**
- Multi-language support
- Reviews and ratings system
- Admin panel for room management
- Booking calendar view

---

## 📌 Slide 20: Learning Outcomes

### **Skills Developed**

✅ **React.js** - Component lifecycle, hooks, state management  
✅ **REST APIs** - HTTP methods, endpoints, CRUD operations  
✅ **Axios** - Asynchronous API calls, error handling  
✅ **JSON Server** - Quick backend prototyping  
✅ **Git & GitHub** - Version control, collaboration  
✅ **Responsive Design** - CSS, mobile-first approach  
✅ **Project Structure** - Component organization, file management  
✅ **Debugging** - Browser DevTools, console logging  

---

## 📌 Slide 21: Demo Videos

### **Watch the Application in Action**

🎥 **Live Demo**  
[Watch Application Demo](https://drive.google.com/file/d/1Lm7FOm6irmy9nP4bpGIJ6M3S9CFpnNTj/view?usp=drivesdk)

📝 **Code Walkthrough**  
[Watch Code Explanation](https://drive.google.com/file/d/1-dcOq63eypowCeZfgOBu8uCOz98Lvta7/view?usp=drivesdk)

🔗 **GitHub Repository**  
github.com/nikhilkumar905/LUXESTAY

---

## 📌 Slide 22: Conclusion

### **Project Summary**

LUXESTAY is a **production-ready, full-stack room booking application** that demonstrates:

✅ Modern React development practices  
✅ RESTful API architecture  
✅ Complete CRUD operations  
✅ Professional UI/UX design  
✅ Real-world application structure  

**The application successfully fulfills all project requirements and provides a solid foundation for future enhancements.**

---

## 📌 Slide 23: Thank You

### **Questions?**

**Developed By:**  
**Nikhil Kumar Sah**  
📧 nikhilkumar_sah@srmap.edu.in  
🔗 github.com/nikhilkumar905  

**Repository:** LUXESTAY  
**Tech Stack:** React.js + JSON Server + Axios  

⭐ **Star the repository if you find it helpful!**

---

**Made with ❤️ using React and JSON Server**

---

## 📌 Backup Slides: Technical Deep Dive

### **Axios vs Fetch**

**Why Axios?**
```javascript
// Axios - Cleaner syntax
const response = await axios.get('/rooms');
const data = response.data;

// Fetch - More verbose
const response = await fetch('/rooms');
const data = await response.json();
```

**Axios Benefits:**
- Automatic JSON transformation
- Better error handling
- Request/response interceptors
- Timeout support
- Wide browser support

---

### **Component Hierarchy**

```
App
├── ErrorBoundary
├── Header
│   └── ProfileModal
├── Hero
├── FilterSidebar
├── RoomCard (×36)
│   ├── ImageGallery
│   └── ReviewSection
├── AuthModal
├── BookingModal
│   └── PaymentModal
│       └── ConfirmationModal
└── UserDashboard
```

---

### **State Flow Diagram**

```
User Action
    ↓
Event Handler
    ↓
API Call (async)
    ↓
State Update (setState)
    ↓
Component Re-render
    ↓
UI Updates
```

---

### **File Structure**

```
room-booking-app/
├── public/
│   └── index.html
├── src/
│   ├── components/     (14 components)
│   ├── services/       (api.js)
│   ├── data/          (roomsData.js)
│   ├── App.js
│   └── index.js
├── db.json            (Database)
├── package.json       (Dependencies)
└── README.md          (Documentation)
```

---

## 🎯 Presentation Tips

### **For Live Demo:**
1. Start with login/signup
2. Show room filtering
3. Demonstrate booking flow
4. Show dashboard with bookings
5. Toggle dark/light mode
6. Show API endpoints in browser

### **For Code Walkthrough:**
1. Explain folder structure
2. Show api.js service layer
3. Demonstrate one component (e.g., RoomCard)
4. Show db.json structure
5. Explain data flow

### **Q&A Preparation:**
- Why JSON Server instead of real backend?
- How is authentication secured?
- Can it handle multiple users?
- What happens if server restarts?
- How to deploy this application?

---

**END OF PRESENTATION**
