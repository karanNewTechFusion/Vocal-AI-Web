// services/auth.js
import API from './api';

export const login = (email, password) =>
  API.post('/users/login', { email, password });

export const signup = (name, email, password) =>
  API.post('/users/signup', { name, email, password });
