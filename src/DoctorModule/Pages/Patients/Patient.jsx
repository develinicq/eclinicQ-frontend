import React, { useMemo, useState, useEffect } from 'react';
import PatientHeader from '../../../components/PatientList/Header';
// Replaced the custom PatientTable with the reusable SampleTable component
import SampleTable from '../../../pages/SampleTable.jsx';
import AddPatientDrawer from '../../../components/PatientList/AddPatientDrawer';
import useDoctorPatientListStore from '../../../store/useDoctorPatientListStore';

const demoPatients = [
  { name: 'Rahul Sharma', gender: 'M', dob: '03/14/1990 (33Y)', patientId: 'P654321', contact: '+91 9876543210', email: 'rajesh.kumar@example.com', location: 'Akola, MH', lastVisit: '02/02/2025 | 12:30 PM', reason: 'Routine check-up for overall health assessment.' },
  { name: 'Arjun Singh', gender: 'M', dob: '09/21/1988 (35Y)', patientId: 'P456789', contact: '+91 7654321098', email: 'suresh.patel@mail.com', location: 'Jaipur, RJ', lastVisit: '02/02/2025 | 12:30 PM', reason: 'Follow-up visit for ongoing treatment.' },
  { name: 'Kavya Nair', gender: 'F', dob: '05/16/1987 (36Y)', patientId: 'P789123', contact: '+91 5432109876', email: 'vikram.agarwal@service.com', location: 'Chennai, TN', lastVisit: '02/02/2025 | 12:30 PM', reason: 'Evaluation of recent weight and fatigue.' },
];

export default function Patient() {
  const [selected, setSelected] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const { patients, loading, error, fetchPatients, clearPatientsStore } = useDoctorPatientListStore();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await fetchPatients();
      } catch (e) {
        // If fetch fails, keep using demoPatients as fallback
        if (mounted) {
          // noop - patient table will render demo data below if patients empty
        }
      }
    })();
    return () => {
      mounted = false;
      // keep store clean when unmounting page
      clearPatientsStore();
    };
  }, [fetchPatients, clearPatientsStore]);

  const displayPatients = loading ? [] : (patients && patients.length > 0 ? patients : (error ? demoPatients : []));
  const counts = useMemo(() => ({ all: displayPatients.length, online: 0, walkin: 0 }), [displayPatients]);
  // Simple pagination state
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = displayPatients.length;
  const pageRows = useMemo(() => displayPatients.slice((page - 1) * pageSize, page * pageSize), [displayPatients, page, pageSize]);

  // Define columns for patient table view
  const columns = useMemo(() => [
    {
      key: 'patient',
      header: 'Patient',
      sticky: 'left',
      width: 280,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
            {row.name?.[0] ?? '?'}
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-xs text-gray-500">
              {row.gender} | {row.dob}
            </div>
          </div>
        </div>
      ),
    },
    { key: 'patientId', header: 'Patient ID' ,width :160},
    { key: 'contact', header: 'Contact',width :260 },
    { key: 'email', header: 'Email' },
    {
      key: 'location',
      header: 'Location',
      render: (row) => (
        <span className="rounded bg-gray-100 px-2 py-1 text-xs">{row.location}</span>
      ),
    },
    { key: 'lastVisit', header: 'Last Visit' },
  { key: 'reason', header: 'Reason', cellClass: 'max-w-[360px] whitespace-normal break-words' },
    {
      key: 'actions',
      header: 'Actions',
      sticky: 'right',
      align: 'center',
      width: 140,
      render: (row) => (
        <div className="flex justify-center gap-3 text-gray-600">
          {/* Wire your own action handlers here */}
          <button className="p-1 rounded hover:bg-gray-100" title="Schedule" onClick={() => console.log('Schedule', row.patientId)}>📅</button>
          <button className="p-1 rounded hover:bg-gray-100" title="Favorite" onClick={() => console.log('Favorite', row.patientId)}>❤️</button>
          <button className="p-1 rounded hover:bg-gray-100" title="More" onClick={() => console.log('More', row.patientId)}>⋮</button>
        </div>
      ),
    },
  ], []);

  return (
    <>
    <div className="h-screen w-screen overflow-x-hidden flex flex-col ">
  <PatientHeader counts={counts} selected={selected} onChange={setSelected} addLabel="Add New Patient" addPath={() => setAddOpen(true)} />
    
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            <div className="text-sm text-gray-600">Loading patients...</div>
          </div>
        </div>
      ) : (
        <SampleTable
          columns={columns}
          data={pageRows}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          stickyLeftWidth={280}
          stickyRightWidth={140}
        />
      )}
      <AddPatientDrawer open={addOpen} onClose={() => setAddOpen(false)} onSave={(data)=>{ /* TODO: hook API */ setAddOpen(false); }} />
      
    </div>
    </>
  );
}
