import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
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