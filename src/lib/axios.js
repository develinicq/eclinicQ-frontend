import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import useSuperAdminAuthStore from "../store/useSuperAdminAuthStore";

// Normalize base URL to always include '/api' segment
const raw = (import.meta.env.VITE_API_BASE_URL || '').trim();
let baseURL;
if (!raw) {
  baseURL = '/api';
} else {
  const noTrail = raw.replace(/\/$/, '');
  // If already ends with /api or contains /api at the end, don't duplicate
  baseURL = /\/api\/?$/.test(noTrail) ? noTrail : `${noTrail}/api`;
}

const axiosInstance = axios.create({
  baseURL,
  headers: { Accept: 'application/json' }
});

// Attach token to every request if available
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      // Prefer Super Admin token, fallback to general auth store, then localStorage
      const saToken = (() => {
        try { return useSuperAdminAuthStore.getState().token; } catch { return null; }
      })();
      const genericToken = (() => {
        try { return useAuthStore.getState().token; } catch { return null; }
      })();
      const lsToken = (() => {
        try { return localStorage.getItem('superAdminToken'); } catch { return null; }
      })();

      const token = saToken || genericToken || lsToken;
      if (token) {
        config.headers = config.headers || {};
        const raw = String(token).trim();
        const hasBearer = /^Bearer\s+/i.test(raw);
        config.headers.Authorization = hasBearer ? raw : `Bearer ${raw}`;
      }
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: auto-logout or cleanup on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      try {
        useAuthStore.getState().clearAuth();
      } catch (e) {
        // ignore
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;