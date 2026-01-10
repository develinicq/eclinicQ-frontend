import axios from "../lib/axios";

// Get all doctors for Super Admin
export const getAllDoctorsBySuperAdmin = async () => {
  try {
    // axios instance adds baseURL '/api' and Authorization header
    const res = await axios.get("/doctors/getAllDoctorsBySuperAdmin");
    return res.data; // { success, message, data: { active: [], inactive: [] }, ... }
  } catch (error) {
    // Throw the original error so callers can read status (e.response.status)
    throw error;
  }
};

// Get doctor details by userId for Super Admin
export const getDoctorDetailsByIdBySuperAdmin = async (userId) => {
  if (!userId) throw new Error("userId is required");
  try {
    const res = await axios.get(`/doctors/forSuperAdmin/doctorDetails/${encodeURIComponent(userId)}`);
    return res.data; // { success, data: { ...doctorDetails } }
  } catch (error) {
    throw error;
  }
};

// Get patient overview and demographics for a doctor view
export const getPatientOverviewForDoctor = async (patientId) => {
  if (!patientId) throw new Error('patientId is required');
  try {
    const res = await axios.get(`/patients/for-doctor/patient-details/overview-and-demographics/${encodeURIComponent(patientId)}`);
    return res.data; // { success, data: { patientId, overview: { ... } } }
  } catch (error) {
    throw error;
  }
};

// Get vitals and biometrics history for a patient (doctor view)
export const getPatientVitalsForDoctor = async (patientId) => {
  if (!patientId) throw new Error('patientId is required');
  try {
    const res = await axios.get(`/patients/for-doctor/patient-details/vitals-and-biometrics/${encodeURIComponent(patientId)}`);
    return res.data; // { success, data: { vitals: [...] } }
  } catch (error) {
    throw error;
  }
};

// Register a new doctor
export const registerDoctor = async (payload) => {
  try {
    const res = await axios.post("/doctors/onboarding/register", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const completeDoctorProfile = async (payload) => {
  try {
    const res = await axios.post("/doctors/onboarding/complete-profile", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const setupClinic = async (payload) => {
  try {
    const res = await axios.post("/doctors/onboarding/setup-clinic", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorReviewDetails = async (doctorId) => {
  try {
    // GET /onboarding/review/:doctorId
    const response = await axios.get(`/doctors/onboarding/review/${doctorId}`);
    return response.data; // Expecting { success: true, data: { ... } }
  } catch (error) {
    console.error("Error fetching doctor review details:", error);
    throw error;
  }
};
// Get Super Admin view: doctor's personalInfo basicInfo
export const getDoctorBasicInfoForSuperAdmin = async (doctorId) => {
  if (!doctorId) throw new Error("doctorId is required");
  try {
    const res = await axios.get(`/doctors/forSuperAdmin/doctorDetails/personalInfo/basicInfo/${encodeURIComponent(doctorId)}`);
    return res.data; // { success, message, data: { firstName, lastName, phone, emailId, gender, city, website, headline, about, languages } }
  } catch (error) {
    throw error;
  }
};
// Update Super Admin view: doctor's personalInfo basicInfo (partial payload)
export const updateDoctorBasicInfoForSuperAdmin = async (doctorId, payload) => {
  if (!doctorId) throw new Error("doctorId is required");
  try {
    const res = await axios.put(`/doctors/forSuperAdmin/doctorDetails/personalInfo/basicInfo/${encodeURIComponent(doctorId)}`, payload);
    return res.data; // { success, message, data: { ...updated } }
  } catch (error) {
    throw error;
  }
};
// Activate doctor account
export const activateDoctor = async (doctorId) => {
  try {
    const response = await axios.post(`/doctors/onboarding/activate/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
