import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token from localStorage on every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: log out and redirect on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Workout API
export const getWorkouts = (params) => api.get('/workouts', { params });
export const getWorkoutById = (id) => api.get(`/workouts/${id}`);
export const getRecommendedWorkouts = (params) => api.get('/workouts/recommend', { params });

// Subscription API
export const getSubscriptions = () => api.get('/subscriptions');
export const getSubscriptionById = (id) => api.get(`/subscriptions/${id}`);
export const purchaseSubscription = (subscriptionId) =>
  api.post('/subscriptions/purchase', { subscriptionId });
export const getMySubscription = () => api.get('/subscriptions/me');

// Progress API
export const getProgressLogs = (limit) =>
  limit ? api.get(`/progress?limit=${limit}`) : api.get('/progress');
export const getWeightChart = () => api.get('/progress/chart');
export const addProgressLog = (data) => api.post('/progress', data);
export const updateProgressLog = (id, data) => api.put(`/progress/${id}`, data);
export const deleteProgressLog = (id) => api.delete(`/progress/${id}`);

// User API
export const updateUserPreferences = (data) => api.put('/users/preferences', data);

// Gym Owner / Admin API
export const getAdminStats = () => api.get('/admin/stats');
export const getAdminUsers = () => api.get('/admin/users');
export const updateAdminUserStatus = (id, isActive) =>
  api.put(`/admin/users/${id}/status`, { isActive });
export const deleteAdminUser = (id) => api.delete(`/admin/users/${id}`);

export default api;