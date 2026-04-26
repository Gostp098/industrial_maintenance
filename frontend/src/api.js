import axios from 'axios';
import { API_URL } from './environment';

export const api = axios.create({
  baseURL: API_URL,  // '/api'
  headers: {
    'Content-Type': 'application/json',
  },
});

// POST /api/requests
export const createRequest = (data) => {
  return api.post('/requests', data);
};