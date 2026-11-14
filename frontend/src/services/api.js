import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Existing exports
export const getProgressLogs = () => api.get('/api/progress');
export const getWeightChart = () => api.get('/api/progress/chart');
export const getMySubscription = () => api.get('/api/users/me/subscription');

export const logMeal = (data) => api.post('/api/nutrition/meals', data);
export const getMeals = (params) => api.get('/api/nutrition/meals', { params });
export const getDailyNutrition = (params) => api.get('/api/nutrition/meals/summary', { params });
export const searchFoods = (q) => api.get('/api/nutrition/foods/search', { params: { q } });

export const addBodyMetric = (data) => api.post('/api/metrics', data);
export const getBodyMetrics = () => api.get('/api/metrics');
export const getMeasurementsChart = () => api.get('/api/metrics/chart');

export const addPR = (data) => api.post('/api/metrics/pr', data);
export const getPRs = () => api.get('/api/metrics/pr');

export const listChallenges = () => api.get('/api/challenges');
export const joinChallenge = (id) => api.post(`/api/challenges/join/${id}`);
export const getUserChallengeProgress = () => api.get('/api/challenges/progress');
export const updateChallengeProgress = (data) => api.post('/api/challenges/progress', data);
export const getLeaderboard = (params) => api.get('/api/challenges/leaderboard', { params });

// Admin exports - aliases for frontend compatibility
export const getAdminStats = () => api.get('/api/admin/stats');
export const getAdminUsers = (params) => api.get('/api/admin/users', { params });
export const updateAdminUserStatus = (id, isActive) => api.put(`/api/admin/users/${id}/status`, { isActive });
export const deleteAdminUser = (id) => api.delete(`/api/admin/users/${id}`);

// User exports
export const updateUserPreferences = (data) => api.put('/api/users/preferences', data);

// Schedule exports - aliases for frontend compatibility
export const getMySchedule = () => api.get('/api/schedule/me');
export const setDayWorkout = (day, data) => api.put(`/api/schedule/day/${day}`, data);
export const removeDayWorkout = (day) => api.delete(`/api/schedule/day/${day}`);

// Workout exports - aliases for frontend compatibility
// Workout exports - aliases for frontend compatibility
export const getWorkouts = (params) => api.get('/api/workouts', { params });
export const getWorkoutById = (id) => api.get(`/api/workouts/${id}`);
export const addProgressLog = (data) => api.post('/api/progress', data);
export const selectPlan = (data) => api.post('/api/schedule/select-plan', data);

export default api;