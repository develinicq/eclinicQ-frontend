import { create } from 'zustand';

const useUIStore = create((set) => ({
    breadcrumbEntityName: '',
    setBreadcrumbEntityName: (name) => set({ breadcrumbEntityName: name }),
    clearBreadcrumbEntityName: () => set({ breadcrumbEntityName: '' }),
}));

export default useUIStore;
