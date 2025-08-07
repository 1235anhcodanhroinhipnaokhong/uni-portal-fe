// src/lib/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api', // hoặc để anh tự config sau
  // withCredentials: true, // nếu backend dùng cookie auth
});

export default instance;
