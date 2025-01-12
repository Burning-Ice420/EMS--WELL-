# Employee Management System

This project is a **MERN (MongoDB, Express, React, Node.js)** based Employee Management System designed for user authentication and employee data management.
*Google calender integration is still in progress*

## 📦 Project Structure

```plaintext
📂 server
├── db
│   └── db.js              # MongoDB connection setup
├── controllers
│   └── authController.js  # Authentication logic
├── routes
│   └── auth.js            # Authentication routes
├── index.js               # Entry point for Node.js server
├── .env                   # Environment variables (PORT, MONGO_URI)
📂 client
├── src
│   ├── components
│   │   └── Login.jsx       # Login form component
│   ├── context
│   │   └── AuthContext.jsx # Context for user authentication
│   └── App.js             # React Router setup
│── package.json           # React dependencies
│── tailwind.config.js     # Tailwind CSS setup
```

## 🚀 Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** React Context API

## 📦 Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Employee-Management-System
```

### 2. Setup Server (Node.js)
```bash
cd server
npm install
```

### 3. Setup Client (React)
```bash
cd client
npm install
```

### 4. Setup Environment Variables
Create a `.env` file in the **server** folder:
```plaintext
PORT=5000
MONGO_URI=mongodb://localhost:27017/employeeDB
JWT_SECRET=your_jwt_secret_key
```

### 5. Run MongoDB (Ensure MongoDB is Running Locally)
```bash
mongod
```

### 6. Start the Server
```bash
cd server
node --env-file=.env index.js
```

### 7. Start the Client
```bash
cd client
npm start
```

---

## 📌 Key Features

### **Backend (Node.js & Express)**
- **User Authentication:** Implemented using JWT (JSON Web Tokens).
- **Database Integration:** MongoDB for storing user credentials and employee data.
- **Error Handling:** Proper error handling using `try...catch` and `process.on()`.

### **Frontend (React)**
- **React Context API:** Used for global state management.
- **React Router:** For navigation between pages (`/login`, `/dashboard`).
- **Tailwind CSS:** For responsive styling.

---

## ✅ API Endpoints

### **Authentication Routes:**
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login with credentials

### **Protected Routes:**
- `GET /api/employees` → Fetch all employees (Requires JWT Token)

---

## 📦 Improvements Made
- **Proper Error Handling:** Handled using `try...catch` blocks.
- **State Management:** React Context API for global state sharing.
- **Environment Management:** `.env` file support added for server configurations.

---

## 📧 Contact
For any issues, feel free to reach out to me via GitHub or email.

