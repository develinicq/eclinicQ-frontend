import { create } from 'zustand';
import axios from '../lib/axios';
import useHospitalRegistrationStore from './useHospitalRegistrationStore';
import useAuthStore from './useAuthStore';

const useHospitalStep1Store = create((set, get) => ({
  form: {
    firstName: '',
    lastName: '',
    emailId: '',
    phone: '',
    gender: '',
    city: '',
  // MFA always enabled per requirements
  mfa: { emailId: true, phone: true },
    profilePhotoKey: '',
    isAlsoDoctor: false,
    role: 'admin',
  },
  setField: (field, value) => set(state => ({
    form: { ...state.form, [field]: value }
  })),
  setMfa: (mfaField, value) => set(state => ({
    form: { ...state.form, mfa: { ...state.form.mfa, [mfaField]: value } }
  })),
  setProfilePhotoKey: (key) => set(state => ({
    form: { ...state.form, profilePhotoKey: key }
  })),
  resetForm: () => set({
    form: {
      firstName: '',
      lastName: '',
      emailId: '',
      phone: '',
      gender: '',
      city: '',
      mfa: { emailId: true, phone: true },
      profilePhotoKey: '',
      isAlsoDoctor: false,
      role: 'admin',
    }
  }),
  submit: async () => {
    const { form } = get();
    try {
      // Build base payload expected by backend
      const isDoctor = Boolean(form.isAlsoDoctor);
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        emailId: form.emailId,
        phone: form.phone,
        gender: form.gender,
        mfa: {
          emailId: true,
          phone: true,
        },
        city: form.city,
        isAlsoDoctor: isDoctor,
        role: 'admin',
      };

      // Only require and include profile photo when also a doctor
      if (isDoctor) {
        if (!form.profilePhotoKey) {
          throw new Error('Profile photo is required when the owner is also a doctor.');
        }
        payload.profilePhotoKey = form.profilePhotoKey;
      }

      const res = await axios.post('/auth/register', payload);
      const data = res?.data || {};

      // Extract the created admin/user id (varies by backend)
      const adminId = data?.data?.adminId || data?.adminId || data?.data?.userId || data?.userId || '';
      if (adminId) {
        try {
          const { setField } = useHospitalRegistrationStore.getState();
          setField('adminId', String(adminId));
        } catch (_) {
          // no-op
        }
      }
      // Extract and persist token for authenticated subsequent calls
      try {
        const token = data?.token || data?.accessToken || data?.data?.token || '';
        if (token) {
          const { setToken } = useAuthStore.getState();
          // Store raw token; interceptor will handle Bearer prefix
          setToken(String(token));
        }
      } catch (_) {
        // no-op
      }
      return data;
    } catch (err) {
      throw err;
    }
  },
}));

export default useHospitalStep1Store;
