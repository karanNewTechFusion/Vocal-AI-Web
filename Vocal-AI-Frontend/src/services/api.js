import axios from 'axios';

const API = axios.create({
  baseURL: 'https://your-api.com/api',
});

export const fetchUsers = () => API.get('/users');
