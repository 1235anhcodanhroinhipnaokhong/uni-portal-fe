// src/api/teacher.api.js
import axios from '@/lib/axios';

export const getAllTeachers = () => axios.get('/teachers');
export const getTeacherById = (id) => axios.get(`/teachers/${id}`);
export const createTeacher = (data) => axios.post('/teachers', data);
export const updateTeacher = (id, data) => axios.put(`/teachers/${id}`, data);
export const deleteTeacher = (id) => axios.delete(`/teachers/${id}`);
