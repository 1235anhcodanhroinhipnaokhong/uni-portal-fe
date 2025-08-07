import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 👉 Thêm interceptor để tự động đính kèm token nếu có
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // hoặc lấy từ context nếu thích
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
