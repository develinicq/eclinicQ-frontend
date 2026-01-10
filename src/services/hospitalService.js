import axios from '../lib/axios';

// Create Hospital API
export const createHospital = async (hospitalData) => {
  try {
    const response = await axios.post('/hospitals/create', hospitalData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all hospitals for Super Admin
export const getAllHospitalsBySuperAdmin = async () => {
  try {
    // axios instance already adds baseURL '/api' and Authorization header if token exists
    const res = await axios.get('/hospitals/forSuperAdmin/all-hospitals');
    return res.data; // shape: { success, message, data: { hospitals: [], counts: {} }, ... }
  } catch (error) {
    throw error;
  }
};

// Get hospital details by ID for Super Admin
export const getHospitalByIdBySuperAdmin = async (hospitalId) => {
  console.log("hospitalService: getHospitalByIdBySuperAdmin called with:", hospitalId);
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/forSuperAdmin/${encodeURIComponent(hospitalId)}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get doctors for a specific hospital for Super Admin
export const getDoctorsByHospitalIdForSuperAdmin = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/forSuperAdmin/doctors`, {
      params: { hospitalId }
    });
    return res.data; // { success, message, data: { doctors: [], pagination: {} } }
  } catch (error) {
    throw error;
  }
};
