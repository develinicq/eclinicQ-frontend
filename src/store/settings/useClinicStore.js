import { create } from "zustand";
import { getClinicInfo, updateClinicInfo } from "../../services/settings/clinicalService";

const useClinicStore = create((set, get) => ({
  hasClinic: false,
  clinic: null,
  loading: false,
  error: null,

  // Fetch clinic info
  fetchClinicInfo: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getClinicInfo();
      
      if (response.success && response.data) {
        set({
          hasClinic: response.data.hasClinic || false,
          clinic: response.data.clinic || null,
          loading: false,
        });
        return response.data;
      }
    } catch (error) {
      set({
        error: error.message || "Failed to fetch clinic info",
        loading: false,
      });
      throw error;
    }
  },

  // Update clinic info
  updateClinicInfo: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await updateClinicInfo(payload);
      
      if (response.success) {
        // Refetch to get updated data
        await get().fetchClinicInfo();
        return response;
      }
    } catch (error) {
      set({
        error: error.message || "Failed to update clinic info",
        loading: false,
      });
      throw error;
    }
  },

  // Reset store
  reset: () =>
    set({
      hasClinic: false,
      clinic: null,
      loading: false,
      error: null,
    }),
}));

export default useClinicStore;
