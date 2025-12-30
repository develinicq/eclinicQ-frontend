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
    const res = await axios.get('/hospitals/getAllHospitalsBySuperAdmin');
    return res.data; // shape: { success, message, data: { active: [], inactive: [] }, ... }
  } catch (error) {
  throw error;
  }
};

// Get hospital details by ID for Super Admin
export const getHospitalByIdBySuperAdmin = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/getHospitalByIdBySuperAdmin/${encodeURIComponent(hospitalId)}`);
    return res.data; // { success, data: { hospital, subscriptionName, specialties, documents } }
  } catch (error) {
  throw error;
  }
};
