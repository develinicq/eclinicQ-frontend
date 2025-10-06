import React, { useMemo, useState } from 'react'
import Header from '../../../../components/DoctorList/Header'
import Table from '../../../../components/DoctorList/Table'

const Doctor = ({ hospital }) => {
  const [selected, setSelected] = useState('active');
  // Derive simple counts until backend endpoint is wired for per-hospital doctors
  const counts = useMemo(() => ({
    active: Number(hospital?.userCount ?? 0),
    inactive: 0,
    invited: 0,
  }), [hospital]);
  return (
    <div className="pb-2">
      <div className="mt-2">
        {/* Header adjusted for hospital's Doctors tab: Active / Inactive / Invited and + New Doctor */}
        <Header
          tabs={[
            { key: 'active', label: 'Active' },
            { key: 'inactive', label: 'Inactive' },
            { key: 'invited', label: 'Invited' },
          ]}
          selected={selected}
          onChange={setSelected}
          addLabel={'+ New Doctor'}
          showCounts={true}
          counts={counts}
        />

        {/* Table container styled same as sidebar Doctors page */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden m-3">
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Doctor
