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

// Get Super Admin view: doctor's personalInfo educationalDetails
export const getDoctorEducationalDetailsForSuperAdmin = async (doctorId) => {
  if (!doctorId) throw new Error("doctorId is required");
  try {
    const res = await axios.get(`/doctors/forSuperAdmin/doctorDetails/personalInfo/educationalDetails/${encodeURIComponent(doctorId)}`);
    return res.data; // { success, data: { education: [ ... ] } }
  } catch (error) {
    throw error;
  }
};

// Create a new educational detail for Super Admin
export const addDoctorEducationForSuperAdmin = async (doctorId, payload) => {
  if (!doctorId) throw new Error("doctorId is required");
  try {
    const res = await axios.post(`/doctors/forSuperAdmin/doctorDetails/personalInfo/educationalDetails/${encodeURIComponent(doctorId)}`, payload);
    return res.data; // { success, message, data: { id, ... } }
  } catch (error) {
    throw error;
  }
};

// Update an educational detail (edit) for Super Admin
export const updateDoctorEducationForSuperAdmin = async (doctorId, payload) => {
  if (!doctorId) throw new Error("doctorId is required");
  if (!payload?.id) throw new Error("education id is required");
  try {
    const res = await axios.put(`/doctors/forSuperAdmin/doctorDetails/personalInfo/educationalDetails/${encodeURIComponent(doctorId)}`, payload);
    return res.data; // { success, message, data: { ... } }
  } catch (error) {
    throw error;
  }
};

// Get Super Admin view: awards and publications
export const getDoctorAwardsAndPublicationsForSuperAdmin = async (doctorId) => {
  if (!doctorId) throw new Error("doctorId is required");
  try {
    const res = await axios.get(`/doctors/forSuperAdmin/doctorDetails/personalInfo/awardsandpublications/${encodeURIComponent(doctorId)}`);
    return res.data; // { success, data: { awards: [...], publications: [...] } }
  } catch (error) {
    throw error;
  }
};

// Create a new award for Super Admin
export const addDoctorAwardForSuperAdmin = async (doctorId, payload) => {
  if (!doctorId) throw new Error("doctorId is required");
  try {
    const res = await axios.post(`/doctors/forSuperAdmin/doctorDetails/personalInfo/awards/${encodeURIComponent(doctorId)}`, payload);
    return res.data; // { success, message, data: { id, ... } }
  } catch (error) {
    throw error;
  }
};

// Create a new publication for Super Admin
export const addDoctorPublicationForSuperAdmin = async (doctorId, payload) => {
  if (!doctorId) throw new Error("doctorId is required");
  try {
    const res = await axios.post(`/doctors/forSuperAdmin/doctorDetails/personalInfo/publications/${encodeURIComponent(doctorId)}`, payload);
    return res.data; // { success, message, data: { id, ... } }
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

// Update a publication (partial payload) for Super Admin
export const updateDoctorPublicationForSuperAdmin = async (doctorId, payload) => {
  if (!doctorId) throw new Error("doctorId is required");
  if (!payload?.id) throw new Error("publication id is required");
  try {
    const res = await axios.put(`/doctors/forSuperAdmin/doctorDetails/personalInfo/publications/${encodeURIComponent(doctorId)}`, payload);
    return res.data; // { success, message, data: { ... } }
  } catch (error) {
    throw error;
  }
};

// Update an award (partial payload) for Super Admin
export const updateDoctorAwardForSuperAdmin = async (doctorId, payload) => {
  if (!doctorId) throw new Error("doctorId is required");
  if (!payload?.id) throw new Error("award id is required");
  try {
    const res = await axios.put(`/doctors/forSuperAdmin/doctorDetails/personalInfo/awards/${encodeURIComponent(doctorId)}`, payload);
    return res.data; // { success, message, data: { ... } }
  } catch (error) {
    throw error;
  }
};

// Get Super Admin view: experience details
export const getDoctorExperienceDetailsForSuperAdmin = async (doctorId) => {
  if (!doctorId) throw new Error("doctorId is required");
  try {
    const res = await axios.get(`/doctors/forSuperAdmin/doctorDetails/personalInfo/expDetails/${encodeURIComponent(doctorId)}`);
    return res.data; // { success, data: { experiences: [ ... ] } }
  } catch (error) {
    throw error;
  }
};

// Create a new experience for Super Admin
export const addDoctorExperienceForSuperAdmin = async (doctorId, payload) => {
  if (!doctorId) throw new Error("doctorId is required");
  try {
    const res = await axios.post(`/doctors/forSuperAdmin/doctorDetails/personalInfo/expDetails/${encodeURIComponent(doctorId)}`, payload);
    return res.data; // { success, message, data: { id, ... } }
  } catch (error) {
    throw error;
  }
};

// Update an experience (partial payload) for Super Admin
export const updateDoctorExperienceForSuperAdmin = async (doctorId, payload) => {
  if (!doctorId) throw new Error("doctorId is required");
  if (!payload?.id) throw new Error("experience id is required");
  try {
    const res = await axios.put(`/doctors/forSuperAdmin/doctorDetails/personalInfo/expDetails/${encodeURIComponent(doctorId)}`, payload);
    return res.data; // { success, message, data: { ... } }
  } catch (error) {
    throw error;
  }
};

// Get Super Admin consultation details for a doctor (requires clinicId)
export const getDoctorConsultationDetailsForSuperAdmin = async (doctorId, clinicId) => {
  if (!doctorId) throw new Error("doctorId is required");
  if (!clinicId) throw new Error("clinicId is required");
  try {
    const res = await axios.get(`/doctors/forSuperAdmin/doctorDetails/consultationDetails/${encodeURIComponent(doctorId)}`, {
      params: { clinicId },
    });
    return res.data; // { success, data: { consultationFees: { ... }, scheduleDetails: { ... } } }
  } catch (error) {
    throw error;
  }
};

// Get Super Admin view: clinical details (hasClinic + clinic object)
export const getDoctorClinicalDetailsForSuperAdmin = async (doctorId) => {
  if (!doctorId) throw new Error("doctorId is required");
  try {
    const res = await axios.get(`/doctors/forSuperAdmin/doctorDetails/clinicalDetails/${encodeURIComponent(doctorId)}`);
    return res.data; // { success, message, data: { hasClinic, clinic: { ... } } }
  } catch (error) {
    throw error;
  }
};

// Get Super Admin view: professional details
export const getDoctorProfessionalDetailsForSuperAdmin = async (doctorId) => {
  if (!doctorId) throw new Error("doctorId is required");
  try {
    const res = await axios.get(`/doctors/forSuperAdmin/doctorDetails/personalInfo/professionalDetails/${encodeURIComponent(doctorId)}`);
    return res.data; // { success, message, data: { medicalRegistrationDetails: { ... }, practiceDetails: { ... } } }
  } catch (error) {
    throw error;
  }
};

// Update Super Admin view: professional details (send only changed fields)
export const updateDoctorProfessionalDetailsForSuperAdmin = async (doctorId, payload) => {
  if (!doctorId) throw new Error("doctorId is required");
  if (!payload || typeof payload !== 'object') throw new Error("payload is required");
  try {
    const res = await axios.put(`/doctors/forSuperAdmin/doctorDetails/personalInfo/professionalDetails/${encodeURIComponent(doctorId)}`, payload);
    return res.data; // { success, message, data: { ... } }
  } catch (error) {
    throw error;
  }
};
