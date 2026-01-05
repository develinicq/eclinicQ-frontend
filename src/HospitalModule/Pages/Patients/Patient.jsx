import React, { useMemo, useState, useCallback } from 'react'
import Header from '../../../components/DoctorList/Header'
import AddPatientDrawer from '../../../components/PatientList/AddPatientDrawer'
import AppointmentLogDrawer from '../../../components/PatientList/AppointmentLogDrawer'
import ScheduleAppointmentDrawer from '../../../components/PatientList/ScheduleAppointmentDrawer'
import SampleTable from '../../../pages/SampleTable'
import { getPatientColumns } from './columns'
import patientData from './data.json'
import PatientDetailsDrawer from './PatientDetailsDrawer'

const Patients = () => {
  const [selected, setSelected] = useState('all')
  const [addOpen, setAddOpen] = useState(false)
  const [page, setPage] = useState(1);
  const [logDrawerOpen, setLogDrawerOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedPatientForSchedule, setSelectedPatientForSchedule] = useState(null);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
  const pageSize = 10;

  // Filter logic (placeholder)
  const patientsFiltered = useMemo(() => {
    // Basic filtering simulation
    if (selected === 'active') return patientData.filter(p => p.status === 'Active');
    if (selected === 'inactive') return patientData.filter(p => p.status === 'Inactive');
    return patientData;
  }, [selected]);

  const pagedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return patientsFiltered.slice(start, start + pageSize);
  }, [patientsFiltered, page, pageSize]);

  const counts = useMemo(() => ({
    all: patientData.length,
    active: patientData.filter(p => p.status === 'Active').length,
    inactive: patientData.filter(p => p.status === 'Inactive').length,
    draft: 0
  }), [])

  const handleOpenLog = useCallback((row) => {
    setLogDrawerOpen(true);
  }, []);

  const handleOpenSchedule = useCallback((row) => {
    setSelectedPatientForSchedule(row);
    setScheduleOpen(true);
  }, []);

  const columns = useMemo(() => getPatientColumns(handleOpenLog, handleOpenSchedule), [handleOpenLog, handleOpenSchedule]);

  return (
    <div className="flex flex-col h-full bg-secondary-grey50 overflow-hidden">
      <div className="shrink-0 mt-2">
        <Header
          counts={counts}
          selected={selected}
          onChange={setSelected}
          tabs={[{ key: 'all', label: 'All' }, { key: 'active', label: 'Active' }, { key: 'inactive', label: 'Inactive' }, { key: 'draft', label: 'Draft' }]}
          showCounts={true}
          addLabel="Add New Patient"
          addPath={() => setAddOpen(true)} // Keep drawer capability if needed, or null
        />
      </div>

      <div className="h-[calc(100vh-140px)] overflow-hidden m-3 border border-gray-200 rounded-lg shadow-sm bg-white">
        <SampleTable
          columns={columns}
          data={pagedData}
          page={page}
          pageSize={pageSize}
          total={patientsFiltered.length}
          onPageChange={setPage}
          stickyLeftWidth={260}
          stickyRightWidth={160}
          onRowClick={(row) => {
            setSelectedPatientDetails(row);
            setDetailsOpen(true);
          }}
          hideSeparators={false} // Show dividers
        />
      </div>

      <AddPatientDrawer open={addOpen} onClose={() => setAddOpen(false)} onSave={() => setAddOpen(false)} />
      <AppointmentLogDrawer open={logDrawerOpen} onClose={() => setLogDrawerOpen(false)} />
      <ScheduleAppointmentDrawer
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        patient={selectedPatientForSchedule}
        onSchedule={() => setScheduleOpen(false)}
      />
      <PatientDetailsDrawer
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        patient={selectedPatientDetails}
      />
    </div>
  )
}

export default Patients
