// src/api/courseSection.api.js
import axios from '@/lib/axios';

export const getAllSections = () => axios.get('/course-sections');
export const getSectionById = (id) => axios.get(`/course-sections/${id}`);
export const createSection = (data) => axios.post('/course-sections', data);
export const updateSection = (id, data) =>
  axios.put(`/course-sections/${id}`, data);
export const deleteSection = (id) => axios.delete(`/course-sections/${id}`);
