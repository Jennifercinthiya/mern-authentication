# MERN Authentication System 🔐

A full-stack authentication system built using **MongoDB, Express, React, and Node.js (MERN)**.  
It supports user registration, login, JWT authentication, password reset, and protected routes.

---

## 🚀 Features

- User Registration
- User Login
- JWT Authentication
- Protected Dashboard Route
- Forgot Password / Reset Password
- REST API integration
- MySQL/MongoDB database support (as per project setup)
- Backend API testing (Postman)

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- HTML, CSS, JavaScript
- Axios
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB / MySQL (based on your config)
- JWT (Authentication)
- Bcrypt.js

---

## 📁 Project Structure


mern-authentication/
│
├── frontend/ # React frontend
├── controllers/ # Backend logic
├── routes/ # API routes
├── middleware/ # Auth middleware
├── config/ # Database config
├── screenshots/ # Project screenshots
├── server.js # Backend entry point
├── .env # Environment variables


---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mern-authentication.git
cd mern-authentication
2. Install backend dependencies
npm install
3. Install frontend dependencies
cd frontend
npm install
🔐 Environment Variables

Create a .env file in root folder:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
▶️ Run the Project
Backend
node server.js
Frontend
cd frontend
npm start
📸 Screenshots
Backend API Testing

(Add your screenshots here)

Example:

Login API
Register API
Dashboard API
Forgot Password API
📌 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/dashboard	Protected route
POST	/api/auth/forgot-password	Reset link