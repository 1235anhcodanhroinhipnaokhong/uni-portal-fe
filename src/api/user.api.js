// src/api/user.api.js
import axios from '@/lib/axios';

export const getAllUsers = () => axios.get('/users');
export const getUserById = (id) => axios.get(`/users/${id}`);
export const createUser = (data) => axios.post('/users', data);
export const updateUser = (id, data) => axios.put(`/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`/users/${id}`);
