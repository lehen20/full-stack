import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// User API endpoints
export const userApi = {
  // Get all users
  getUsers: (skip = 0, limit = 100) => 
    api.get(`/users/?skip=${skip}&limit=${limit}`),
  
  // Get user by ID
  getUser: (id) => 
    api.get(`/users/${id}`),
  
  // Create new user
  createUser: (userData) => 
    api.post('/users/', userData),
  
  // Update user
  updateUser: (id, userData) => 
    api.put(`/users/${id}`, userData),
  
  // Delete user
  deleteUser: (id) => 
    api.delete(`/users/${id}`),
};

export default api;