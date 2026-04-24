import axios from 'axios';

// In dev, Vite proxies /api to :5000 so relative URLs Just Work.
// In prod, set VITE_API_URL to your backend base URL at build time.
const baseURL = import.meta.env.VITE_API_URL || '';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
});

/**
 * POST /api/requests — create a new service/consultation request.
 * Payload field names match the database columns exactly.
 */
export function createRequest(payload) {
  return api.post('/api/requests', payload).then((res) => res.data);
}
