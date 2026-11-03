import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./components/ProtectedLayout";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import WorkoutDetail from "./pages/WorkoutDetail";
import Schedule from "./pages/Schedule";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-xl text-gray-600 mt-2">Page not found</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
          <Route path="/workouts" element={<ProtectedLayout><Workouts /></ProtectedLayout>} />
          <Route path="/workouts/:id" element={<ProtectedLayout><WorkoutDetail /></ProtectedLayout>} />
          <Route path="/schedule" element={<ProtectedLayout><Schedule /></ProtectedLayout>} />
          <Route path="/progress" element={<ProtectedLayout><Progress /></ProtectedLayout>} />
          <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
          <Route path="/admin" element={<ProtectedLayout><AdminDashboard /></ProtectedLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;