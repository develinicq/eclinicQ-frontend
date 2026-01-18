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

// Get hospital details (banner data) by ID for Super Admin
export const getHospitalByIdBySuperAdmin = async (hospitalId) => {
  console.log("hospitalService: getHospitalByIdBySuperAdmin called with:", hospitalId);
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/forSuperAdmin/hospital-banner`, {
      params: { hospitalId }
    });
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
// Get hospital review details for Super Admin (onboarding)
export const getHospitalReviewDetails = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/onboarding/review/${encodeURIComponent(hospitalId)}`);
    return res.data; // { success, message, data: { ... } }
  } catch (error) {
    throw error;
  }
};
// Activate hospital (final step)
export const activateHospital = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.post(`/hospitals/onboarding/activate/${encodeURIComponent(hospitalId)}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get general timings for a hospital (Super Admin)
export const getHospitalGeneralTimingsForSuperAdmin = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/forSuperAdmin/general-timings`, {
      params: { hospitalId }
    });
    // Expected shape: { success, message, data: { schedule: [...] }, ... }
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get hospital info and address for Super Admin Details tab
export const getHospitalInfoAndAddressForSuperAdmin = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/forSuperAdmin/hospitalInfo&address`, {
      params: { hospitalId }
    });
    // Expected shape: { success, message, data: { hospitalInfo: {...}, hospitalAddress: {...} }, ... }
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get primary admin account details for Super Admin Details tab
export const getHospitalAdminDetailsForSuperAdmin = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/forSuperAdmin/adminDetails`, {
      params: { hospitalId }
    });
    // Expected shape: { success, message, data: { firstName, lastName, ... }, ... }
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get verification documents for a hospital (Super Admin)
export const getHospitalDocumentsForSuperAdmin = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/forSuperAdmin/documents`, {
      params: { hospitalId }
    });
    // Expected shape: { success, message, data: [ { id, docNo, docType, docUrl, ... } ] }
    return res.data;
  } catch (error) {
    throw error;
  }
};
// Get awards and accreditations for a hospital (Super Admin)
export const getHospitalAwardsAndAccreditationsForSuperAdmin = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/forSuperAdmin/awards-accreditations`, {
      params: { hospitalId }
    });
    // Expected shape: { success, message, data: { awards: [], accreditations: [] }, ... }
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Surgeries for SuperAdmin
export const getHospitalSurgeriesForSuperAdmin = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get('/hospitals/forSuperAdmin/surgeries', {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addHospitalSurgeryForSuperAdmin = async (hospitalId, data) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.post('/hospitals/forSuperAdmin/surgeries', data, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateHospitalSurgeryForSuperAdmin = async (hospitalId, surgeryId, data) => {
  if (!hospitalId || !surgeryId) throw new Error('hospitalId and surgeryId are required');
  try {
    const res = await axios.put(`/hospitals/forSuperAdmin/surgeries/${encodeURIComponent(surgeryId)}`, data, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteHospitalSurgeryForSuperAdmin = async (hospitalId, surgeryId) => {
  if (!hospitalId || !surgeryId) throw new Error('hospitalId and surgeryId are required');
  try {
    const res = await axios.delete(`/hospitals/forSuperAdmin/surgeries/${encodeURIComponent(surgeryId)}`, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateHospitalInfoAndAddressForSuperAdmin = async (hospitalId, data) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.put('/hospitals/forSuperAdmin/hospitalInfo&address', data, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateHospitalAdminDetailsForSuperAdmin = async (hospitalId, data) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.put('/hospitals/forSuperAdmin/adminDetails', data, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addHospitalAwardForSuperAdmin = async (hospitalId, data) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.post('/hospitals/forSuperAdmin/awards', data, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addHospitalAccreditationForSuperAdmin = async (hospitalId, data) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.post('/hospitals/forSuperAdmin/accreditations', data, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const addHospitalPublicationForSuperAdmin = async (hospitalId, data) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.post('/hospitals/forSuperAdmin/publications', data, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateHospitalAwardForSuperAdmin = async (hospitalId, awardId, data) => {
  if (!hospitalId || !awardId) throw new Error('hospitalId and awardId are required');
  try {
    const res = await axios.put(`/hospitals/forSuperAdmin/awards/${encodeURIComponent(awardId)}`, data, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateHospitalAccreditationForSuperAdmin = async (hospitalId, accreditationId, data) => {
  if (!hospitalId || !accreditationId) throw new Error('hospitalId and accreditationId are required');
  try {
    const res = await axios.put(`/hospitals/forSuperAdmin/accreditations/${encodeURIComponent(accreditationId)}`, data, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get timings for Hospital Admin (Settings)
export const getHospitalTimingsForAdmin = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/for-admin/timings-schedule`, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get account details for Hospital Admin
export const getHospitalAccountSettings = async (hospitalId) => {
  if (!hospitalId) throw new Error('hospitalId is required');
  try {
    const res = await axios.get(`/hospitals/for-admin/account-details`, {
      params: { hospitalId }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
