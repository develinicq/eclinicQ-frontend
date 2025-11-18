import axios from "../../lib/axios";

// GET Clinic Info
export const getClinicInfo = async () => {
  try {
    const res = await axios.get(
      "/doctors/my-account/clinical-details/clinic-info"
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// UPDATE Clinic Info
export const updateClinicInfo = async (payload) => {
  try {
    const res = await axios.put(
      "/doctors/my-account/clinical-details/clinic-info",
      payload
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
