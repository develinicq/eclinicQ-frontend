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
  async (config) => {
    try {
      // Token Priority: SuperAdmin → Hospital → Doctor → Legacy
      const saToken = (() => {
        try { return useSuperAdminAuthStore.getState().token; } catch { return null; }
      })();

      let hToken = null;
      try {
        // Dynamic import to avoid circular dependency if store imports axios
        const store = (await import('../store/useHospitalAuthStore')).default;
        hToken = store.getState().token;
      } catch (e) { /* ignore */ }

      let dToken = null;
      try {
        // Dynamic import for doctor auth store
        const store = (await import('../store/useDoctorAuthStore')).default;
        dToken = store.getState().token;
      } catch (e) { /* ignore */ }

      const genericToken = (() => {
        try { return useAuthStore.getState().token; } catch { return null; }
      })();
      const lsToken = (() => {
        try { return localStorage.getItem('superAdminToken'); } catch { return null; }
      })();

      // Priority logic based on current route/path to support multi-role users
      const path = typeof window !== 'undefined' ? window.location.pathname : '';
      let token = null;

      if (path.startsWith('/doc')) {
        token = dToken || saToken || hToken || genericToken || lsToken;
      } else if (path.startsWith('/hospital')) {
        token = hToken || saToken || dToken || genericToken || lsToken;
      } else if (path.startsWith('/hfd')) {
        token = hToken || saToken || dToken || genericToken || lsToken;
      } else if (path.startsWith('/fd')) {
        token = genericToken || saToken || hToken || dToken || lsToken;
      } else {
        // Default priority for SuperAdmin or other paths
        token = saToken || hToken || dToken || genericToken || lsToken;
      }

      if (token) {
        config.headers = config.headers || {};
        const rawToken = String(token).trim();
        const hasBearer = /^Bearer\s+/i.test(rawToken);
        config.headers.Authorization = hasBearer ? rawToken : `Bearer ${rawToken}`;
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
        useSuperAdminAuthStore.getState().clearAuth();
        localStorage.removeItem('superAdminToken');

        // Dynamic import for hospital auth store to clear it too
        import('../store/useHospitalAuthStore').then(m => m.default.getState().clearAuth()).catch(() => { });

        // Dynamic import for doctor auth store to clear it too
        import('../store/useDoctorAuthStore').then(m => m.default.getState().clearAuth()).catch(() => { });

        // Note: useToastStore might need to be imported or accessed similarly
        // For now, keeping the 401 logic minimal to avoid breaking more things
      } catch (e) {
        // ignore
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;