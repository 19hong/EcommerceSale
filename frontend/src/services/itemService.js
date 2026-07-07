import api from './api';

export const getItems = async (params = {}) => {
  const { data } = await api.get('/items', { params });
  return data.data;
};

export const getItem = async (id) => {
  const { data } = await api.get(`/items/${id}`);
  return data.data;
};

export const createItem = async (itemData) => {
  const { data } = await api.post('/items', itemData);
  return data.data;
};

export const updateItem = async (id, itemData) => {
  const { data } = await api.put(`/items/${id}`, itemData);
  return data.data;
};

export const deleteItem = async (id) => {
  const { data } = await api.delete(`/items/${id}`);
  return data;
};

export const getMyItems = async (params = {}) => {
  const { data } = await api.get('/items/mine', { params });
  return data.data;
};
