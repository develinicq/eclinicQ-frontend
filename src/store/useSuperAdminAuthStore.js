import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Centralized auth store to keep and persist JWT/access token for SuperAdmin
const useSuperAdminAuthStore = create(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            // Set or update the access token
            setToken: (token) => {
                set({ token });
            },
            // Optionally keep minimal user info if available from login
            setUser: (user) => set({ user }),
            // Clear all auth data (e.g., on logout or 401)
            clearAuth: () => set({ token: null, user: null }),
            // Fetch profile data from API
            fetchProfile: async () => {
                const { token } = get();
                if (!token) return;
                try {
                    const axiosInstance = (await import('../lib/axios')).default;
                    const res = await axiosInstance.get('/superAdmin/me');
                    if (res.data?.success && res.data?.data) {
                        set({ user: res.data.data });
                    }
                } catch (error) {
                    console.error('Failed to fetch superAdmin profile:', error);
                }
            },
            // Helpers
            isAuthenticated: () => Boolean(get().token),
            getAuthHeader: () => {
                const t = get().token;
                return t ? { Authorization: `Bearer ${t}` } : {};
            },
        }),
        {
            name: 'superadmin-auth-store', // Unique localStorage key for SuperAdmin
            version: 1,
            partialize: (state) => ({ token: state.token, user: state.user }),
        }
    )
);

export default useSuperAdminAuthStore;
