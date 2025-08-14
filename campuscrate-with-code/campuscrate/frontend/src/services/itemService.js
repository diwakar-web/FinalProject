import api from './api.js';

export const getItems = async (params) => {
  const { data } = await api.get('/items', { params });
  return data;
};

export const getItem = async (id) => {
  const { data } = await api.get(`/items/${id}`);
  return data;
};

export const createItem = async (payload) => {
  const form = new FormData();
  Object.entries(payload).forEach(([k,v])=>{
    if (Array.isArray(v)) v.forEach(val=>form.append(k, val));
    else form.append(k, v);
  });
  const { data } = await api.post('/items', form);
  return data;
};

export const updateItemStatus = async (id, status) => {
  const { data } = await api.patch(`/items/${id}/status`, { status });
  return data;
};
