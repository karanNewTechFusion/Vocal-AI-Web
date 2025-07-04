// services/api.js
import axios from 'axios';

// Base API instance
const API = axios.create({
  baseURL: 'http://localhost:8000/api', // adjust if deploying
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
