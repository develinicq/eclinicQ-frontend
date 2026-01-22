import { create } from "zustand";
import {
  getClinicInfo,
  updateClinicInfo,
  getStaffClinicInfo,
  updateStaffClinicInfo,
} from "../../services/settings/clinicalService";

const useClinicStore = create((set, get) => ({
  hasClinic: false,
  clinic: null,
  loading: false,
  error: null,

  // Fetch clinic info
  fetchClinicInfo: async (params) => {
    set({ loading: true, error: null });
    try {
      const hasDoctorId = !!params?.doctorId;
      const response = hasDoctorId
        ? await getStaffClinicInfo(params)
        : await getClinicInfo();

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
  updateClinicInfo: async (payload, params) => {
    set({ loading: true, error: null });
    try {
      const hasDoctorId = !!params?.doctorId;
      const response = hasDoctorId
        ? await updateStaffClinicInfo(payload, params)
        : await updateClinicInfo(payload);

      if (response.success) {
        // Refetch to get updated data
        await get().fetchClinicInfo(params);
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
