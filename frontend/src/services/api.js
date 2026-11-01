import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Set up axios with interceptor for token
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Workout API
export const getWorkouts = (params) => axios.get(`${API_URL}/workouts`, { params });
export const getWorkoutById = (id) => axios.get(`${API_URL}/workouts/${id}`);
export const getRecommendedWorkouts = (params) => 
  axios.get(`${API_URL}/workouts/recommend`, { params });

// Subscription API
export const getSubscriptions = () => axios.get(`${API_URL}/subscriptions`);
export const getSubscriptionById = (id) => axios.get(`${API_URL}/subscriptions/${id}`);
export const purchaseSubscription = (subscriptionId) => 
  axios.post(`${API_URL}/subscriptions/purchase`, { subscriptionId });
export const getMySubscription = () => axios.get(`${API_URL}/subscriptions/me`);

// Progress API
export const getProgressLogs = (limit) => 
  limit ? axios.get(`${API_URL}/progress?limit=${limit}`) : axios.get(`${API_URL}/progress`);
export const getWeightChart = () => axios.get(`${API_URL}/progress/chart`);
export const addProgressLog = (data) => axios.post(`${API_URL}/progress`, data);
export const updateProgressLog = (id, data) => axios.put(`${API_URL}/progress/${id}`, data);
export const deleteProgressLog = (id) => axios.delete(`${API_URL}/progress/${id}`);

// User API
export const updateUserPreferences = (data) => 
  axios.put(`${API_URL}/users/preferences`, data);

// Gym Owner / Admin API
export const getAdminStats = () => axios.get(`${API_URL}/admin/stats`);
export const getAdminUsers = () => axios.get(`${API_URL}/admin/users`);
export const updateAdminUserStatus = (id, isActive) => 
  axios.put(`${API_URL}/admin/users/${id}/status`, { isActive });
export const deleteAdminUser = (id) => 
  axios.delete(`${API_URL}/admin/users/${id}`);