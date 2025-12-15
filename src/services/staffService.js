import axios from '../lib/axios'

// Fetch staff members by clinicId
export const fetchClinicStaff = async (clinicId) => {
  if (!clinicId) throw new Error('clinicId is required to fetch staff')
  const res = await axios.get(`/staff/clinic/${clinicId}`)
  return res?.data
}
