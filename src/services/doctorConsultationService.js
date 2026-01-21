import axiosInstance from '../lib/axios';

// GET /api/doctors/consultation-details?hospitalId=... or ?clinicId=...
export const getDoctorConsultationDetails = async (params) => {
  if (!params || (!params.hospitalId && !params.clinicId)) {
    throw new Error('Either hospitalId or clinicId is required');
  }
  const response = await axiosInstance.get('/doctors/consultation-details', {
    params,
  });
  return response.data;
};

// PUT /api/doctors/consultation-details
export const putDoctorConsultationDetails = async (payload) => {
  const response = await axiosInstance.put('/doctors/consultation-details', payload);
  return response.data;
};

export default { getDoctorConsultationDetails, putDoctorConsultationDetails };
