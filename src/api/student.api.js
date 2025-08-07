// src/api/student.api.js
import axios from '@/lib/axios';

export const getAllStudents = () => axios.get('/students');
export const getStudentById = (id) => axios.get(`/students/${id}`);
export const createStudent = (data) => axios.post('/students', data);
export const updateStudent = (id, data) => axios.put(`/students/${id}`, data);
export const deleteStudent = (id) => axios.delete(`/students/${id}`);
export const getStudentsBySection = (sectionId) => {
  return axios.get(`/students/section/${sectionId}`);
};
