// src/api/score.api.js
import axios from '@/lib/axios';

export const getAllScores = () => axios.get('/scores');
export const getScoreById = (id) => axios.get(`/scores/${id}`);
export const createScore = (data) => axios.post('/scores', data);
export const updateScore = (id, data) => axios.put(`/scores/${id}`, data);
export const deleteScore = (id) => axios.delete(`/scores/${id}`);
