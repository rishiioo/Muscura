# Muscura - Gym Management System

A comprehensive MERN stack (MongoDB, Express, React, Node.js) gym management application with subscription tracking, workout builder, and progress monitoring.

## Features

### 🏋️ Custom Workout Builder
- Create and manage custom workout plans
- Include exercises with sets, reps, rest times
- YouTube tutorial links for each exercise
- Goal-based recommendations (Cut, Bulk, Healthy)

### 🎯 Goal-Based Recommendations
- Personalized workout plans based on:
  - User's goal (Cut, Bulk, Healthy)
  - Fitness level (Beginner, Intermediate, Advanced)
  - Dietary preference (Vegetarian, Non-vegetarian)

### 🔐 Authentication & Authorization
- JWT-based authentication
- User and Admin roles
- Protected routes with role-based access

### 📊 Progress Tracking
- Log workouts and weight measurements
- Interactive charts for visual progress tracking
- Workout history and analytics

### 📅 Schedule & Tutorials
- Day-wise workout schedule
- Integrated YouTube tutorial links
- Weekly plan visualization

### 🔔 Subscription Management
- Multiple subscription plans
- Expiry tracking and automated daily email reminders
- Welcome emails for new registrations

### 🧑‍💼 Admin Panel
- Manage members and subscriptions
- Create/edit/delete workouts
- View statistics and reports

## Tech Stack

- **Frontend**: React, Tailwind CSS, Recharts, Axios, React Router v6
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Database**: MongoDB (Local/Mongo Atlas)

## Project Structure

```
Muscura/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── services/         # Database services
│   └── server.js         # Main server file
├── frontend/
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd D:\Muscura\backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/muscura
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:3000
ENABLE_CRON=true
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd D:\Muscura\frontend
npm install
```

Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Workout Routes
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/recommend` - Get recommended workouts
- `GET /api/workouts/:id` - Get workout by ID
- `POST /api/workouts` - Create workout (Admin)
- `PUT /api/workouts/:id` - Update workout (Admin)
- `DELETE /api/workouts/:id` - Delete workout (Admin)

### Subscription Routes
- `GET /api/subscriptions` - Get all subscriptions
- `POST /api/subscriptions/purchase` - Purchase subscription
- `GET /api/subscriptions/me` - Get user's subscription

### Progress Routes
- `GET /api/progress` - Get user's progress logs
- `POST /api/progress` - Add progress log
- `GET /api/progress/chart` - Get weight chart data

### Admin Routes (Protected)
- `GET /api/admin/stats` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/status` - Update user status
- `DELETE /api/admin/users/:id` - Delete user

## Default Admin Account

Create an admin user by adding this to your database:

```javascript
{
  name: "Admin",
  email: "admin@muscura.com",
  password: "admin123",
  role: "admin"
}
```

## Default Subscription Plans

1. **Basic Plan** - $19/month - Standard workout access
2. **Premium Plan** - $39/month - All workouts + nutrition plans
3. **Elite Plan** - $59/month - Personal trainer + all features

## License

MIT License

## Future Enhancements
- SMS notifications
- Payment integration (Stripe)
- Mobile app (React Native)
- Video workout integration
- Community features
- Nutrition tracking