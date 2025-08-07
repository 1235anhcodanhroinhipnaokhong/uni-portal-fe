import { createContext, useContext, useEffect, useState } from 'react';
import axios from '@/lib/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      // Fetch user info nếu cần hoặc lấy từ localStorage
      const userInfo = JSON.parse(localStorage.getItem('user'));
      if (userInfo) {
        setUser(userInfo);
      }
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return { success: true };
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      return {
        success: false,
        error: err.response?.data?.message || 'Đăng nhập thất bại',
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (err) {
      console.warn(
        'Logout error (ignore if backend not implemented):',
        err.message
      );
    }
    setUser(null);
    setToken('');
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const register = async (email, password, role) => {
    try {
      const res = await axios.post('/auth/register', {
        email,
        password,
        role,
      });
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return { success: true };
    } catch (err) {
      console.error('Register failed:', err.response?.data || err.message);
      return {
        success: false,
        error: err.response?.data?.message || 'Đăng ký thất bại',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
