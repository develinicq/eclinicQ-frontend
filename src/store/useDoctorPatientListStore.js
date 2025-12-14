import { create } from 'zustand'
import axios from '../lib/axios'

// Separate store for doctor's patient list. Keep it isolated from other stores.
const useDoctorPatientListStore = create((set, get) => ({
  patients: [],
  loading: false,
  error: null,
  // fetch patients for doctor. Accept optional params object for pagination/filtering in future.
  fetchPatients: async (opts = {}) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('/patients/for-doctor/patients-list');
      const data = res?.data?.data || [];
      // Normalize API shape to what PatientTable expects
      const mapped = data.map((p) => {
        const dobRaw = p?.dob || p?.dateOfBirth || null;
        let dob = '';
        try {
          dob = dobRaw ? new Date(dobRaw).toLocaleDateString() : '';
        } catch (e) {
          dob = String(dobRaw || '');
        }
        // Format lastVisit: prefer lastVisitDateTime if provided; try to parse and format with AM/PM
        let lastVisitRaw = p?.lastVisitDateTime || (p?.lastVisitDate && p?.lastVisitTime ? `${p.lastVisitDate} | ${p.lastVisitTime}` : '') || '';
        let lastVisit = lastVisitRaw;
        try {
          // If it's already in 'DD/MM/YYYY | HH:mm' or 'DD/MM/YYYY | H:mm' format, parse manually
          const ddmmyyyyWithPipe = lastVisitRaw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s*\|\s*(\d{1,2}):(\d{2})$/);
          if (ddmmyyyyWithPipe) {
            const [, dd, mm, yyyy, hh, min] = ddmmyyyyWithPipe.map((v) => v);
            // Create a Date in local time
            const dt = new Date(Number(yyyy), Number(mm) - 1, Number(dd), Number(hh), Number(min));
            const date = dt.toLocaleDateString('en-GB');
            const time = dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
            lastVisit = `${date} | ${time}`;
          } else {
            // Try generic parse (ISO etc.)
            const parsed = new Date(lastVisitRaw);
            if (!isNaN(parsed)) {
              const date = parsed.toLocaleDateString('en-GB'); // DD/MM/YYYY
              const time = parsed.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); // h:mm AM/PM
              lastVisit = `${date} | ${time}`;
            }
          }
        } catch (e) {
          // leave as-is
        }
        // derive location from several possible fields
        const locationVal = p?.location || p?.locationText || (p?.address ? [p.address.city, p.address.state].filter(Boolean).join(', ') : '') || '';

        return {
          // Keep the true patient UUID in `patientId` for routing, and expose `patientCode` for human-friendly display.
          patientId: p?.patientId || p?.id || '',
          patientCode: p?.patientCode || p?.patientId || '',
          name: p?.name || p?.displayName || '',
          contact: p?.contactNumber || p?.contact || '',
          email: p?.email || '',
          location: locationVal,
          gender: p?.genderInitial || p?.gender || '',
          dob,
          lastVisit,
          reason: p?.reasonForLastVisit || p?.reason || '',
          profilePhoto: p?.profilePhoto || null,
          raw: p,
        };
      });

      set({ patients: mapped, loading: false });
      return data;
    } catch (e) {
      const err = e?.response?.data?.message || e.message || 'Failed to load patients';
      set({ error: err, loading: false });
      throw e;
    }
  },
  // Clear store state (keeps separation)
  clearPatientsStore: () => set({ patients: [], loading: false, error: null }),
}))

export default useDoctorPatientListStore
