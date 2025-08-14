import api from './api.js';
export const report = async (payload) => (await api.post('/report', payload)).data;
