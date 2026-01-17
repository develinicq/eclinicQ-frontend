import React, { useMemo, useState, useEffect } from "react";
import PatientHeader from "../../../components/PatientList/Header";
// Replaced the custom PatientTable with the reusable SampleTable component
import SampleTable from "../../../pages/SampleTable.jsx";
import AddPatientDrawer from "../../../components/PatientList/AddPatientDrawer";
import useDoctorPatientListStore from "../../../store/useDoctorPatientListStore";
import {
  action_calendar,
  action_dot,
  action_heart,
  vertical,
} from "../../../../public/index.js";
import AvatarCircle from "../../../components/AvatarCircle.jsx";
import UniversalLoader from "../../../components/UniversalLoader";
import { getPatientColumns } from "./columns";


const demoPatients = Array.from({ length: 300 }).map((_, i) => ({
  name: `Patient ${i + 1}`,
  gender: i % 2 === 0 ? "M" : "F",
  dob: `01/${(i % 28) + 1}/1990 (35Y)`,
  patientId: `P${100000 + i}`,
  contact: `+91 98765${(i % 10).toString().repeat(4)}`,
  email: `patient${i + 1}@example.com`,
  location: [
    "Delhi, DL",
    "Mumbai, MH",
    "Bangalore, KA",
    "Chennai, TN",
    "Kolkata, WB",
  ][i % 5],
  lastVisit: `03/${(i % 28) + 1}/2025 | ${(i % 12) + 1}:00 PM`,
  reason: [
    "Routine check-up",
    "Follow-up visit",
    "Consultation for headache",
    "Diabetes management",
    "General health check-up",
  ][i % 5],
  status: i % 3 === 0 ? 'Inactive' : 'Active'
}));

export default function Patient() {
  const [selected, setSelected] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const { patients, loading, error, fetchPatients, clearPatientsStore } =
    useDoctorPatientListStore();

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

  const displayPatients = loading
    ? []
    : patients && patients.length > 0
      ? patients
      : [];

  const counts = useMemo(
    () => ({ all: displayPatients.length, online: 0, walkin: 0 }),
    [displayPatients]
  );
  // Simple pagination state
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const total = displayPatients.length;
  const pageRows = useMemo(
    () => displayPatients.slice((page - 1) * pageSize, page * pageSize),
    [displayPatients, page, pageSize]
  );

  // Define columns for patient table view
  const columns = useMemo(
    () => getPatientColumns(
      (row) => console.log('Open Log', row),
      (row) => console.log('Schedule', row)
    ),
    []
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary-grey50">
        <UniversalLoader size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-secondary-grey50 p-6">
        <div className="text-red-600 font-medium mb-2">Failed to load patients</div>
        <div className="text-sm text-red-500 mb-4">{error}</div>
        <button
          onClick={() => fetchPatients()}
          className="px-6 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors shadow-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="px-3">
        <div className="pt-2 pb-1">
          <PatientHeader
            counts={counts}
            selected={selected}
            onChange={setSelected}
            addLabel="Add New Patient"
            addPath={() => setAddOpen(true)}
          />
        </div>

        <div className="h-[calc(100vh-140px)] overflow-hidden border border-gray-200 rounded-lg shadow-sm bg-white">
          <SampleTable
            columns={columns}
            data={pageRows}
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            stickyLeftWidth={260}
            stickyRightWidth={160}
          />
        </div>

        <AddPatientDrawer
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onSave={(data) => {
            setAddOpen(false);
          }}
        />
      </div>
    </>
  );
}
