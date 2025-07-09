// services/api.js
import axios from 'axios';

// Base API instance
const API = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
});

// 🔐 Request Interceptor to attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
