import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/DoctorList/Header'
import Table from '../../components/DoctorList/Table'
import { getAllDoctorsBySuperAdmin } from '../../services/doctorService'
import useAuthStore from '../../store/useAuthStore'

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
        setError(e?.message || 'Failed to fetch doctors')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    if (isAuthed) load()
    else {
      setLoading(false)
      setError('Not authenticated')
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
  <Header counts={counts} selected={selected} onChange={setSelected} />

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
