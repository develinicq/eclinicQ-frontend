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

  setDocument: (doc) => set((state) => ({
    ...state,
    documents: [...state.documents.filter(d => d.no !== doc.no), doc],
  })),

  setDocuments: (docs) => set({ documents: docs }),

  setOperatingHours: (hours) => set({ operatingHours: hours }),

  reset: () => set(initialState),

  submit: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const state = get();
      const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
      const toTitle = (d) => d.charAt(0).toUpperCase() + d.slice(1);

      // Always include all fields (empty strings/arrays/0 when not set)
      const body = {
        name: state.name || '',
        type: state.type || '',
        emailId: state.emailId || '',
        phone: state.phone || '',
        address: {
          blockNo: state.address?.blockNo || '',
          landmark: state.address?.landmark || '',
          street: state.address?.street || '',
        },
        city: state.city || '',
        state: state.state || '',
        pincode: state.pincode || '',
        url: state.url || '',
        logo: state.logo || '',
        image: state.image || '',
        latitude: state.latitude !== '' && state.latitude !== null && state.latitude !== undefined ? Number(state.latitude) : 0,
        longitude: state.longitude !== '' && state.longitude !== null && state.longitude !== undefined ? Number(state.longitude) : 0,
        medicalSpecialties: Array.isArray(state.medicalSpecialties) ? state.medicalSpecialties : [],
        hospitalServices: Array.isArray(state.hospitalServices) ? state.hospitalServices : [],
        establishmentYear: state.establishmentYear || '', // string per example
        noOfBeds: state.noOfBeds !== '' && state.noOfBeds !== null && state.noOfBeds !== undefined ? Number(state.noOfBeds) : 0,
        accreditation: Array.isArray(state.accreditation) ? state.accreditation : [],
        adminId: state.adminId || '',
        documents: Array.isArray(state.documents)
          ? state.documents.map((doc) => ({
              no: doc && doc.no !== '' && doc.no !== null && doc.no !== undefined ? Number(doc.no) : 0,
              type: (doc && doc.type) || '',
              url: (doc && doc.url) || '',
            }))
          : [],
        operatingHours: days.map((day) => {
          const isAvailable = Array.isArray(state.operatingHours) ? state.operatingHours.includes(toTitle(day)) : false;
          const is24Hours = !!state[`${day}24Hours`];
          const startTime = state[`${day}StartTime`] || '09:00';
          const endTime = state[`${day}EndTime`] || '18:00';
          return {
            dayOfWeek: day,
            isAvailable,
            is24Hours,
            timeRanges: [
              { startTime, endTime }
            ],
          };
        }),
      };

      const res = await axiosInstance.post('/hospitals/create', body);
      if (!res || res.status !== 200) throw new Error('Failed to submit');
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: error.message, success: false });
    }
  },
}));

export default useHospitalRegistrationStore;
