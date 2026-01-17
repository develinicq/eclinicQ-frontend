import axios from "../lib/axios";

// Get all patients for Super Admin
export const getPatientsForSuperAdmin = async () => {
    try {
        const res = await axios.get("/patients/for-super-admin/patients");
        return res.data;
    } catch (error) {
        throw error;
    }
};

// Get patient details for Super Admin
export const getPatientDetailsForSuperAdmin = async (patientId) => {
    try {
        const res = await axios.get(`/patients/for-super-admin/patients/${patientId}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// Get all patients for Hospital Admin
export const getPatientsForHospital = async (hospitalId) => {
    try {
        const res = await axios.get(`/patients/for-hospital-admin/${hospitalId}/patients-list`);
        return res.data;
    } catch (error) {
        throw error;
    }
};
