import axios from 'axios';

// Prefer VITE_API_BASE_URL; fallbacks allow targeting specific services
const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_PUBLIC_BFF_URL ||
  import.meta.env.VITE_CATALOG_API_URL ||
  'http://localhost:5101/api/v1';

export const api = axios.create({
  baseURL,
  timeout: 15000,
});

// Optionally attach interceptors (auth, errors)
api.interceptors.response.use(
  (r) => r,
  (err) => Promise.reject(err)
);

export default api;