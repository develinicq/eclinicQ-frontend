import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useImageUploadStore = create((set) => ({
  uploadUrl: null,
  isLoading: false,
  error: null,

  getUploadUrl: async (contentType, file) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"];
    const maxSize = 1 * 1024 * 1024; 
    if (!file || typeof file !== 'object') {
      set({ error: "No file provided", isLoading: false });
      throw new Error("No file provided");
    }
    if (!allowedTypes.includes(file.type)) {
      set({ error: "Unsupported file type. Supported: .png, .jpg, .svg, .webp", isLoading: false });
      throw new Error("Unsupported file type. Supported: .png, .jpg, .svg, .webp");
    }
    if (file.size > maxSize) {
      set({ error: "File size exceeds 1MB limit", isLoading: false });
      throw new Error("File size exceeds 1MB limit");
    }
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/uploads/getUploadUrl", {
        contentType,
      });
      if (response.data && response.data.data && response.data.data.uploadUrl && response.data.data.key) {
        set({ uploadUrl: response.data.data, isLoading: false });
        return response.data.data;
      } else {
        set({ error: "Invalid upload URL response", isLoading: false });
        return null;
      }
    } catch (error) {
      set({ error: error.response?.data || error.message, isLoading: false });
      return null;
    }
  },

  reset: () => set({ uploadUrl: null, isLoading: false, error: null }),
}));

export default useImageUploadStore;
