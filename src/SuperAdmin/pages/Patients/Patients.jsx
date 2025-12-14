
import React, { useMemo, useState } from 'react'
import Header from '../../../components/DoctorList/Header'
import PatientTable from '../../../components/PatientList/Table'
import AddPatientDrawer from '../../../components/PatientList/AddPatientDrawer'

const Patients = () => {
  // Placeholder dataset; replace with SuperAdmin API later
  const [patients] = useState([
    { id: 'PT-001', name: 'Rohit Sharma', gender: 'M', age: 'Jan 12, 1985 (40Y)', contact: '9876543210', email: 'rohit@example.com', location: 'Mumbai' },
    { id: 'PT-002', name: 'Anita Desai', gender: 'F', age: 'May 02, 1990 (35Y)', contact: '9876500001', email: 'anita@example.com', location: 'Pune' },
    { id: 'PT-003', name: 'Sameer Khan', gender: 'M', age: 'Aug 23, 1978 (47Y)', contact: '9876500002', email: 'sameer@example.com', location: 'Delhi' },
  ])

  const counts = useMemo(() => ({
    all: patients.length,
    active: Math.max(0, patients.length - 1), // placeholder split
    inactive: 1,
    draft: 0,
  }), [patients])

  const [selected, setSelected] = useState('all')
  const [addOpen, setAddOpen] = useState(false)
  const filtered = useMemo(() => patients, [patients])

  return (
    <div className="flex flex-col h-full">
      <div className="sticky mt-2 top-0 z-10 bg-white ">
        <Header
          counts={counts}
          selected={selected}
          onChange={setSelected}
          tabs={[{ key: 'all', label: 'All' }, { key: 'active', label: 'Active' }, { key: 'inactive', label: 'Inactive' }, { key: 'draft', label: 'Draft' }]}
          showCounts={true}
          addLabel="Add New Patient"
          addPath={() => setAddOpen(true)}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <PatientTable patients={filtered} onRowClick={() => { /* list-only in SuperAdmin for now */ }} />
        </div>
      </div>
    <AddPatientDrawer open={addOpen} onClose={() => setAddOpen(false)} onSave={(data)=>{ /* TODO: hook API */ setAddOpen(false) }} />
    </div>
  )
}

export default Patients

