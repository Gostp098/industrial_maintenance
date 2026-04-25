import axios from 'axios';
import { API_URL } from './environment';

const baseURL = API_URL;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Your other API functions here...
export const createRequest = (config) => {
  return api(config);
};