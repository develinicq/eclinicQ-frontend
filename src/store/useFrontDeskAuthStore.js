import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFrontDeskAuthStore = create(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            roleNames: [],
            loading: false,

            setToken: (token) => set({ token }),
            setUser: (user) => set({ user }),
            setRoleNames: (roleNames) => set({ roleNames }),

            clearAuth: () => set({
                token: null,
                user: null,
                roleNames: []
            }),

            // Front Desk shares the same login endpoint as doctors initially, 
            // but we might want to store it separately here if needed. 
            // Usually, SignIn.jsx handles the API call and just sets the token here.

            // Helper to check auth
            isAuthenticated: () => Boolean(get().token),
            getAuthHeader: () => {
                const t = get().token;
                return t ? { Authorization: `Bearer ${t}` } : {};
            },
        }),
        {
            name: 'front-desk-auth-store',
            version: 1,
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                roleNames: state.roleNames
            }),
        }
    )
);

export default useFrontDeskAuthStore;
