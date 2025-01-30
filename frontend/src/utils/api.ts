import axios from 'axios';
import { Event } from '../Types';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password },{ withCredentials: true });
  return response.data.user;
};

export const register = (email: string, password: string) => {
  return api.post('/auth/register', { email, password });
};

export const createEvent = async (eventData: object) => {
  const response = await api.post('/events/create', eventData);
  return response.data;
};

export const getEvents = async () => {
  const response = await api.get('/events/getEvents');
  return response.data;
};

export const filterEvents = async (filterParams: object) => {
  const response = await api.get('/events/filter', { params: filterParams });
  return response.data;
};

export const updateEvent = async (id: string, eventData: Partial<Event>) => {
  if (!id) {
    throw new Error('ID de evento requerido para actualización');
  }

  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};
