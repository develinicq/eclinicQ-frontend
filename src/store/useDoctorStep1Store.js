import { create } from 'zustand';
import axios from '../lib/axios';

const initialState = {
  firstName: '',
  lastName: '',
  emailId: '',
  phone: '',
  gender: '',
  city: '',
  mfa: {
    emailId: false,
    phone: false,
  },
  profilePhotoKey: '',
  role: 'doctor',
  loading: false,
  error: null,
  success: false,
};

const useDoctorStep1Store = create((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({
    ...state,
    [field]: value,
  })),
  setMfaField: (field, value) => set((state) => ({
    ...state,
    mfa: {
      ...state.mfa,
      [field]: value,
    },
  })),
  reset: () => set(initialState),
  submit: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const {
        firstName,
        lastName,
        emailId,
        phone,
        gender,
        city,
        mfa,
        profilePhotoKey,
        role,
      } = useDoctorStep1Store.getState();
      const body = {
        firstName,
        lastName,
        emailId,
        phone,
        gender,
        city,
        mfa,
        profilePhotoKey,
        role,
      };
      await axios.post('/auth/register', body);
      set({ success: true });
      setTimeout(() => set({ success: false }), 100);
      return true;
    } catch (error) {
      set({ error: error?.response?.data?.message || error.message });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDoctorStep1Store;
