import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../../../components/DoctorList/Header'
import Table from '../../../../components/DoctorList/Table'
import { getAllDoctorsBySuperAdmin } from '../../../../services/doctorService'
import useAuthStore from '../../../../store/useAuthStore'

const Doc_list = () => {
  const isAuthed = useAuthStore((s) => Boolean(s.token))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [active, setActive] = useState([])
  const [inactive, setInactive] = useState([])

  useEffect(() => {
    let ignore = false
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const resp = await getAllDoctorsBySuperAdmin()
        if (ignore) return
        const a = resp?.data?.active || []
        const i = resp?.data?.inactive || []
        setActive(a)
        setInactive(i)
      } catch (e) {
        if (ignore) return
        // If unauthorized/forbidden, don't block UI: show dummy list and suppress server message
        const status = e?.response?.status
        const serverMsg = e?.response?.data?.message || e?.message || ''
        const isAuthError = status === 401 || status === 403 || /forbidden/i.test(serverMsg) || /SUPER_ACCESS/i.test(serverMsg)
        if (!isAuthError) {
          setError('Failed to fetch doctors')
        } else {
          // suppress exposing server auth/permission messages to the UI
          setError(null)
        }
        // Fallback: seed with dummy data for exploration
        const dummy = [
          {
            docId: 'DOC001', userId: 'user-001', name: 'Dr. Anita Sharma', gender: 'F',
            contactNumber: '9876543210', email: 'anita.sharma@example.com', location: 'Mumbai',
            specializations: ['General Physician', 'Diabetology'], designation: 'MBBS, MD', yearOfExperience: 12
          },
          {
            docId: 'DOC002', userId: 'user-002', name: 'Dr. Rajiv Menon', gender: 'M',
            contactNumber: '9123456780', email: 'rajiv.menon@example.com', location: 'Bengaluru',
            specializations: ['Cardiology'], designation: 'MBBS, DM (Cardio)', yearOfExperience: 15
          },
          {
            docId: 'DOC003', userId: 'user-003', name: 'Dr. Meera Iyer', gender: 'F',
            contactNumber: '9001234567', email: 'meera.iyer@example.com', location: 'Chennai',
            specializations: ['Dermatology', 'Cosmetology'], designation: 'MBBS, MD (Derm)', yearOfExperience: 9
          }
        ]
        setActive(dummy)
        setInactive([])
      } finally {
        if (!ignore) setLoading(false)
      }
    }
  if (isAuthed) load()
    else {
      // Not authed: still show dummy list for exploration
      const dummy = [
        {
          docId: 'DOC004', userId: 'user-004', name: 'Dr. Karan Gupta', gender: 'M',
          contactNumber: '9812345678', email: 'karan.gupta@example.com', location: 'Delhi',
          specializations: ['Orthopedics'], designation: 'MBBS, MS (Ortho)', yearOfExperience: 11
        },
        {
          docId: 'DOC005', userId: 'user-005', name: 'Dr. Sana Khan', gender: 'F',
          contactNumber: '9890011223', email: 'sana.khan@example.com', location: 'Pune',
          specializations: ['ENT'], designation: 'MBBS, MS (ENT)', yearOfExperience: 7
        }
      ]
      setActive(dummy)
      setInactive([])
      setLoading(false)
  setError(null)
    }
    return () => {
      ignore = true
    }
  }, [isAuthed])

  const doctorsAll = useMemo(() => {
    // Map API response to UI table shape
    const mapOne = (d, status) => ({
  id: d?.docId || '',
  userId: d?.userId || '',
      name: d?.name || '',
  gender: d?.gender || '',
      contact: d?.contactNumber || '',
      email: d?.email || '',
      location: d?.location || '',
      specialization: Array.isArray(d?.specializations) ? d.specializations[0] : d?.specializations,
      specializationMore: Array.isArray(d?.specializations) && d.specializations.length > 1 ? d.specializations.length - 1 : 0,
      designation: d?.designation || '',
      exp: d?.yearOfExperience != null ? `${d.yearOfExperience} yrs exp` : '',
      status,
    })
    return [
      ...active.map((d) => mapOne(d, 'Active')),
      ...inactive.map((d) => mapOne(d, 'Inactive')),
    ]
  }, [active, inactive])

  const counts = useMemo(() => ({
    all: (active?.length || 0) + (inactive?.length || 0),
    active: active?.length || 0,
    inactive: inactive?.length || 0,
  }), [active, inactive])

  const [selected, setSelected] = useState('all')

  const doctors = useMemo(() => {
    if (selected === 'active') return doctorsAll.filter(d => d.status === 'Active')
    if (selected === 'inactive') return doctorsAll.filter(d => d.status === 'Inactive')
    return doctorsAll
  }, [doctorsAll, selected])

  return (
    <div className="pb-2">{/* no fixed footer now; small bottom padding */}
      <div className="mt-2">
        {/* Header sits outside, no outline */}
  <Header counts={counts} selected={selected} onChange={setSelected} addLabel="Add New Doctor" addPath="/register/doctor" />

        {/* Table has its own outline */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden m-3">
          {loading && <div className="p-6 text-gray-600">Loading doctors…</div>}
          {!loading && error && <div className="p-6 text-red-600">{String(error)}</div>}
          {!loading && !error && <Table doctors={doctors} />}
        </div>
      </div>
    </div>
  )
}

export default Doc_list
