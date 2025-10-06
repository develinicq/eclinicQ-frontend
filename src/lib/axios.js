import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";
const axiosInstance = axios.create({
  // Prefer env override, else use relative '/api' for proxy/same-origin
  baseURL,
  headers: {
    Accept: 'application/json',
  }
});

// Attach token to every request if available
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      // Read token from store (persisted via localStorage)
      const { token } = useAuthStore.getState();
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