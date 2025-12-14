import React, { useMemo, useState, useEffect } from 'react';
import PatientHeader from '../../../components/PatientList/Header';
import PatientTable from '../../Components/PatientList/Table.jsx';
import AddPatientDrawer from '../../../components/PatientList/AddPatientDrawer';
import PatientDrawer from '../../Components/PatientList/PatientDrawer.jsx';
import useDoctorPatientListStore from '../../../store/useDoctorPatientListStore';

const demoPatients = [
  { name: 'Rahul Sharma', gender: 'M', dob: '03/14/1990 (33Y)', patientId: 'P654321', contact: '+91 9876543210', email: 'rajesh.kumar@example.com', location: 'Akola, MH', lastVisit: '02/02/2025 | 12:30 PM', reason: 'Routine check-up for overall health assessment.' },
  { name: 'Arjun Singh', gender: 'M', dob: '09/21/1988 (35Y)', patientId: 'P456789', contact: '+91 7654321098', email: 'suresh.patel@mail.com', location: 'Jaipur, RJ', lastVisit: '02/02/2025 | 12:30 PM', reason: 'Follow-up visit for ongoing treatment.' },
  { name: 'Kavya Nair', gender: 'F', dob: '05/16/1987 (36Y)', patientId: 'P789123', contact: '+91 5432109876', email: 'vikram.agarwal@service.com', location: 'Chennai, TN', lastVisit: '02/02/2025 | 12:30 PM', reason: 'Evaluation of recent weight and fatigue.' },
];

export default function HPatients() {
  const [selected, setSelected] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { patients, loading, error, fetchPatients, clearPatientsStore } = useDoctorPatientListStore();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await fetchPatients();
      } catch (e) {
        if (mounted) {
          // fallback handled below
        }
      }
    })();
    return () => {
      mounted = false;
      clearPatientsStore();
    };
  }, [fetchPatients, clearPatientsStore]);

  const displayPatients = loading ? [] : (patients && patients.length > 0 ? patients : (error ? demoPatients : []));
  // Match header used by doctor/hospital sections: All/Active/Inactive/Draft
  const counts = useMemo(() => ({ all: displayPatients.length, active: displayPatients.length, inactive: 0, draft: 0 }), [displayPatients]);

  const handleRowClick = (p) => {
    setSelectedPatient(p);
    setDrawerOpen(true);
  };

  return (
    <div className="flex flex-col gap-2">
  <PatientHeader counts={counts} selected={selected} onChange={setSelected} addLabel="Add New Patient" addPath={() => setAddOpen(true)} />
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            <div className="text-sm text-gray-600">Loading patients...</div>
          </div>
        </div>
      ) : (
        <PatientTable patients={displayPatients} onRowClick={handleRowClick} />
      )}
  <PatientDrawer open={drawerOpen} patient={selectedPatient || {}} onClose={() => setDrawerOpen(false)} />
  <AddPatientDrawer open={addOpen} onClose={() => setAddOpen(false)} onSave={(data)=>{ /* TODO: API */ setAddOpen(false); }} />
    </div>
  );
}
