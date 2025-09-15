import { create } from 'zustand';
import axiosInstance from '../lib/axios';

const initialState = {
  name: '',
  type: '',
  emailId: '',
  phone: '',
  address: {
    blockNo: '',
    landmark: '',
    street: ''
  },
  city: '',
  state: '',
  pincode: '',
  url: '',
  logo: '',
  image: '',
  latitude: '',
  longitude: '',
  medicalSpecialties: [],
  hospitalServices: [],
  establishmentYear: '',
  noOfBeds: '',
  accreditation: [],
  adminId: '',
  documents: [],
  operatingHours: [], // stores selected day names in Title Case e.g. ["Sunday", "Monday", ...]
  loading: false,
  error: null,
  success: false,
};

const useHospitalRegistrationStore = create((set, get) => ({
  ...initialState,

  setField: (field, value) => set((state) => ({ ...state, [field]: value })),

  setAddressField: (field, value) => set((state) => ({
    ...state,
    address: { ...state.address, [field]: value },
  })),

  // Upsert a document entry by type (more stable than matching by number)
  setDocument: (doc) => set((state) => {
    const others = Array.isArray(state.documents)
      ? state.documents.filter((d) => d.type !== doc.type)
      : [];
    return {
      ...state,
      documents: [...others, doc],
    };
  }),

  setDocuments: (docs) => set({ documents: docs }),

  setOperatingHours: (hours) => set({ operatingHours: hours }),

  reset: () => set(initialState),

  submit: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const state = get();
      // Ensure adminId from step 1 is present
      if (!state.adminId || String(state.adminId).trim() === '') {
        throw new Error('Missing adminId. Please complete Step 1 (Owner Account Creation) first.');
      }
      const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
      const toTitle = (d) => d.charAt(0).toUpperCase() + d.slice(1);

      // Build address object as required by backend
      const addressObj = {
        blockNo: state.address?.blockNo || '',
        street: state.address?.street || '',
        landmark: state.address?.landmark || '',
      };

      // Coerce numeric fields where applicable
      const toNumberOr = (v, fallback) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
      };
      const latitude = state.latitude !== '' && state.latitude !== null && state.latitude !== undefined ? toNumberOr(state.latitude, 0) : 0;
      const longitude = state.longitude !== '' && state.longitude !== null && state.longitude !== undefined ? toNumberOr(state.longitude, 0) : 0;
      const noOfBeds = state.noOfBeds !== '' && state.noOfBeds !== null && state.noOfBeds !== undefined ? toNumberOr(state.noOfBeds, 0) : 0;
      // Backend requires Establishment year as string
      const establishmentYear = state.establishmentYear !== undefined && state.establishmentYear !== null
        ? String(state.establishmentYear)
        : '';

      // Operating hours: include only selected days, uppercase dayOfWeek, allow empty timeRanges when 24h
      const selectedDays = Array.isArray(state.operatingHours) ? state.operatingHours : [];
      const toLower = (s) => String(s || '').toLowerCase();
      const toUpper = (s) => String(s || '').toUpperCase();
      const opHours = selectedDays.map((title) => {
        const dlow = toLower(title);
        const is24Hours = !!state[`${dlow}24Hours`];
        const startTime = state[`${dlow}StartTime`] || '09:00';
        const endTime = state[`${dlow}EndTime`] || '18:00';
        return {
          dayOfWeek: toUpper(title),
          isAvailable: true,
          is24Hours,
          timeRanges: is24Hours ? [] : [{ startTime, endTime }],
        };
      });

      const toStringArray = (arr) => {
        if (!Array.isArray(arr)) return [];
        return arr
          .map((v) => {
            if (v == null) return '';
            if (typeof v === 'string') return v;
            if (typeof v === 'object') return v.name || v.value || '';
            return String(v);
          })
          .map((s) => String(s).trim())
          .filter((s) => s.length > 0);
      };

      const sanitizeDocuments = (docs) => {
        if (!Array.isArray(docs)) return [];
        const out = [];
        for (const d of docs) {
          const url = String((d && d.url) || '').trim();
          const type = String((d && d.type) || '').trim();
          const noVal = (d && d.no) != null ? String(d.no).trim() : '';
          if (!url || !type || !noVal) continue; // essentials required
          const docOut = { type, url, no: noVal };
          const nameRaw = String((d && d.name) || '').trim();
          if (nameRaw) docOut.name = nameRaw;
          out.push(docOut);
        }
        return out;
      };

      const body = {
        name: state.name || '',
        type: state.type || '',
        emailId: String(state.emailId || ''),
        phone: String(state.phone || ''),
        address: addressObj,
        city: state.city || '',
        state: state.state || '',
        pincode: String(state.pincode || ''),
        url: state.url || '',
        logo: state.logo || '',
        image: state.image || '',
        latitude,
        longitude,
        medicalSpecialties: toStringArray(state.medicalSpecialties),
        hospitalServices: toStringArray(state.hospitalServices),
        accreditation: toStringArray(state.accreditation),
        establishmentYear,
        noOfBeds,
        adminId: String(state.adminId || ''),
        documents: sanitizeDocuments(state.documents),
        operatingHours: opHours,
      };

      const res = await axiosInstance.post('/hospitals/create', body);
      const httpOk = !!res && res.status >= 200 && res.status < 300;
      const data = res?.data || {};
      const apiOk = data.ok === true || data.success === true || /created|success/i.test(String(data.message || ''));
      if (!httpOk || !apiOk) throw new Error(data?.message || 'Failed to submit');
      set({ loading: false, success: true });
      return true;
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Failed to submit';
      set({ loading: false, error: msg, success: false });
      return false;
    }
  },
}));

export default useHospitalRegistrationStore;
