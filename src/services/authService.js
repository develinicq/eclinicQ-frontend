import axiosInstance from "../lib/axios";

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/auth/register", formData);
    return response.data; 
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};
