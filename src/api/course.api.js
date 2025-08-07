// src/api/course.api.js
import axios from '@/lib/axios';

export const getAllCourses = () => axios.get('/courses');
export const getCourseById = (id) => axios.get(`/courses/${id}`);
export const createCourse = (data) => axios.post('/courses', data);
export const updateCourse = (id, data) => axios.put(`/courses/${id}`, data);
export const deleteCourse = (id) => axios.delete(`/courses/${id}`);
