import axios from "../lib/axios";

// Get all doctors for Super Admin
export const getAllDoctorsBySuperAdmin = async () => {
  try {
    // axios instance adds baseURL '/api' and Authorization header
    const res = await axios.get("/doctors/getAllDoctorsBySuperAdmin");
    return res.data; // { success, message, data: { active: [], inactive: [] }, ... }
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get doctor details by userId for Super Admin
export const getDoctorDetailsByIdBySuperAdmin = async (userId) => {
  if (!userId) throw new Error("userId is required");
  try {
    const res = await axios.get(`/doctors/getDoctorDetailsByIdBySuperAdmin/${encodeURIComponent(userId)}`);
    return res.data; // { success, data: { ...doctorDetails } }
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get patient overview and demographics for a doctor view
export const getPatientOverviewForDoctor = async (patientId) => {
  if (!patientId) throw new Error('patientId is required');
  try {
    const res = await axios.get(`/patients/for-doctor/patient-details/overview-and-demographics/${encodeURIComponent(patientId)}`);
    return res.data; // { success, data: { patientId, overview: { ... } } }
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get vitals and biometrics history for a patient (doctor view)
export const getPatientVitalsForDoctor = async (patientId) => {
  if (!patientId) throw new Error('patientId is required');
  try {
    const res = await axios.get(`/patients/for-doctor/patient-details/vitals-and-biometrics/${encodeURIComponent(patientId)}`);
    return res.data; // { success, data: { vitals: [...] } }
  } catch (error) {
    throw error.response?.data || error;
  }
};
