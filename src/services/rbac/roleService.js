import axios from '../../lib/axios'

// Fetch all roles for a given clinic
export const fetchAllRoles = async (clinicId) => {
  if (!clinicId) throw new Error('clinicId is required to fetch roles')
  const res = await axios.get('/rbac/all-roles', { params: { clinicId } })
  return res?.data
}

export const createRole = async ({ name, description, permissions, clinicId }) => {
  const payload = { name, description, permissions, clinicId }
  const res = await axios.post('/rbac/create-role', payload)
  return res.data
}
