// src/api/schedule.api.js
import axios from '@/lib/axios';

export const getAllSchedules = () => axios.get('/schedules');
export const getScheduleById = (id) => axios.get(`/schedules/${id}`);
export const createSchedule = (data) => axios.post('/schedules', data);
export const updateSchedule = (id, data) => axios.put(`/schedules/${id}`, data);
export const deleteSchedule = (id) => axios.delete(`/schedules/${id}`);
export const getScheduleByUserRole = (user) => axios.get('/schedules/me', user);
