import axiosInstance from '../lib/axios';

// GET /api/doctors/consultation-details?hospitalId=...
export const getDoctorConsultationDetails = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  const response = await axiosInstance.get('/doctors/consultation-details', {
    params: { hospitalId },
  });
  return response.data; // { success, message, data: { consultationFees, slotTemplates }, ... }
};

export default { getDoctorConsultationDetails };
