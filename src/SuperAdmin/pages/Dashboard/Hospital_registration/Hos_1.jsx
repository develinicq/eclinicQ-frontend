import React, { useEffect, forwardRef, useImperativeHandle, useState } from 'react'
import useHospitalStep1Store from '../../../../store/useHospitalStep1Store';
import useImageUploadStore from "../../../../store/useImageUploadStore";
import { useRegistration } from '../../../context/RegistrationContext';
import {
  FormFieldRow,
  RegistrationHeader
} from '../../../../components/FormItems';
import InputWithMeta from '../../../../components/GeneralDrawer/InputWithMeta';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronDown } from 'lucide-react';

const upload = '/upload_blue.png';

const Hos_1 = forwardRef((props, ref) => {
  const form = useHospitalStep1Store((state) => state.form);
  const setField = useHospitalStep1Store((state) => state.setField);
  const setMfa = useHospitalStep1Store((state) => state.setMfa);
  const setProfilePhotoKey = useHospitalStep1Store((state) => state.setProfilePhotoKey);
  const submit = useHospitalStep1Store((state) => state.submit);
  const { updateFormData } = useRegistration();

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const uploadUrlData = useImageUploadStore((state) => state.uploadUrl);

  useEffect(() => {
    if (uploadUrlData && uploadUrlData.key) {
      setProfilePhotoKey(uploadUrlData.key);
    }
  }, [uploadUrlData, setProfilePhotoKey]);

  // Ensure MFA flags are always true in state
  useEffect(() => {
    setMfa('emailId', true);
    setMfa('phone', true);
  }, [setMfa]);

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value || value.trim().length === 0) return "Required";
        return "";
      case "emailId":
        if (!value) return "Required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format";
        return "";
      case "phone":
        if (!value) return "Required";
        if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
        return "";
      case "gender":
      case "city":
        if (!value) return "Required";
        return "";
      case 'profilePhotoKey':
        if (form.isAlsoDoctor && !value) return 'Profile photo required';
        return '';
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'isAlsoDoctor') {
      const isDoc = value === 'yes';
      setField('isAlsoDoctor', isDoc);
      updateFormData({ isDoctor: isDoc ? 'yes' : 'no' });
    } else {
      setField(name, type === "checkbox" ? checked : value);
    }

    // For validation, we mock the value for checkbox/radio
    let valForValidation = value;
    if (type === 'checkbox') valForValidation = checked;

    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, valForValidation)
    }));
  };

  // Helper for direct value updates (e.g. from dropdowns)
  const updateField = (name, value) => {
    setField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  }

  // Validate all fields before submit
  const validateAll = () => {
    const fieldsToValidate = {
      firstName: form.firstName,
      lastName: form.lastName,
      emailId: form.emailId,
      phone: form.phone,
      gender: form.gender,
      city: form.city,
      profilePhotoKey: form.profilePhotoKey
    };
    const newErrors = {};
    Object.entries(fieldsToValidate).forEach(([key, val]) => {
      // Skip profile photo validation if not a doctor
      if (key === 'profilePhotoKey' && !form.isAlsoDoctor) return;

      const err = validateField(key, val);
      if (err) newErrors[key] = err;
    });
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    async submit() {
      const isValid = validateAll();
      if (!isValid) {
        setLoading(false);
        return false;
      }
      setLoading(true);
      try {
        // await submit();

        // Mock success logic
        const adminId = 'dummy_admin_id_' + Date.now();

        // Update Hospital Registration Store
        const useHospitalRegistrationStore = (await import('../../../../store/useHospitalRegistrationStore')).default;
        useHospitalRegistrationStore.getState().setField('adminId', adminId);

        // Update Auth Store
        const useAuthStore = (await import('../../../../store/useAuthStore')).default;
        useAuthStore.getState().setToken('dummy_token');

        if (form.isAlsoDoctor) {
          const doctorId = 'dummy_doctor_id_' + Date.now();

          // Update Doctor Registration Store
          const useDoctorRegistrationStore = (await import('../../../../store/useDoctorRegistrationStore')).default;
          useDoctorRegistrationStore.getState().setField('userId', doctorId);

          // Update Hospital Doctor Details Store
          const useHospitalDoctorDetailsStore = (await import('../../../../store/useHospitalDoctorDetailsStore')).default;
          useHospitalDoctorDetailsStore.getState().setField('userId', doctorId);
        }

        setLoading(false);
        return true;
      } catch (err) {
        const msg = err?.response?.data?.message || err.message || 'Submission failed';
        setLoading(false);
        alert(msg);
        return false;
      }
    }
  }));

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "Other", label: "Other" },
    { value: "Prefer not to say", label: "Prefer not to say" },
  ];

  const cityOptions = [
    { value: "Akola, Maharashtra", label: "Akola, Maharashtra" },
    { value: "Aurangabad, Maharashtra", label: "Aurangabad, Maharashtra" },
    { value: "Nagpur, Maharashtra", label: "Nagpur, Maharashtra" },
    { value: "Amravati, Maharashtra", label: "Amravati, Maharashtra" },
    { value: "Akot, Maharashtra", label: "Akot, Maharashtra" }
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow-sm overflow-hidden">
      <RegistrationHeader
        title="Owner Account Creation"
        subtitle="Set up the primary administrator account for your hospital"
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[700px] mx-auto space-y-6">
          {/* Name Row */}
          <FormFieldRow>
            <div className="w-full">
              <InputWithMeta
                label="First Name"
                requiredDot={true}
                value={form.firstName}
                onChange={(val) => updateField('firstName', val)}
                placeholder="Enter First Name"
              />
              {formErrors.firstName && <span className="text-red-500 text-xs">{formErrors.firstName}</span>}
            </div>
            <div className="w-full">
              <InputWithMeta
                label="Last Name"
                requiredDot={true}
                value={form.lastName}
                onChange={(val) => updateField('lastName', val)}
                placeholder="Enter Last Name"
              />
              {formErrors.lastName && <span className="text-red-500 text-xs">{formErrors.lastName}</span>}
            </div>
          </FormFieldRow>

          {/* Email and Phone Row */}
          <FormFieldRow>
            <div className="w-full">
              <InputWithMeta
                label="Work Email"
                requiredDot={true}
                value={form.emailId}
                onChange={(val) => updateField('emailId', val)}
                placeholder="Enter Work Email"
              />
              {formErrors.emailId && <span className="text-red-500 text-xs">{formErrors.emailId}</span>}
            </div>
            <div className="w-full">
              <InputWithMeta
                label="Contact Number"
                requiredDot={true}
                value={form.phone}
                onChange={(val) => updateField('phone', val)}
                placeholder="Enter Contact Number"
              />
              {formErrors.phone && <span className="text-red-500 text-xs">{formErrors.phone}</span>}
            </div>
          </FormFieldRow>

          {/* Gender and City Row */}
          <FormFieldRow>
            <div className="w-full">
              <InputWithMeta
                label="Gender"
                value={form.gender}
                requiredDot
                placeholder="Select Gender"
                RightIcon={ChevronDown}
                readonlyWhenIcon={true}
                onIconClick={() => setGenderOpen(!genderOpen)}
                dropdownOpen={genderOpen}
                onRequestClose={() => setGenderOpen(false)}
                dropdownItems={genderOptions}
                onSelectItem={(item) => {
                  updateField('gender', item.value);
                  setGenderOpen(false);
                }}
                compulsory
              />
              {formErrors.gender && <span className="text-red-500 text-xs">{formErrors.gender}</span>}
            </div>
            <div className="w-full">
              <InputWithMeta
                label="City"
                value={form.city}
                requiredDot
                placeholder="Select City"
                RightIcon={ChevronDown}
                readonlyWhenIcon={true}
                onIconClick={() => setCityOpen(!cityOpen)}
                dropdownOpen={cityOpen}
                onRequestClose={() => setCityOpen(false)}
                dropdownItems={cityOptions}
                onSelectItem={(item) => {
                  updateField('city', item.value);
                  setCityOpen(false);
                }}
                compulsory
              />
              {formErrors.city && <span className="text-red-500 text-xs">{formErrors.city}</span>}
            </div>
          </FormFieldRow>

          {/* Doctor Check & Upload Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-secondary-grey300 flex flex-row items-center gap-1">
                This Hospital Owner is also Practicing Doctor <div className="bg-red-500 w-1 h-1 rounded-full"></div>
              </span>
              <RadioGroup
                className="flex gap-4"
                value={form.isAlsoDoctor ? 'yes' : 'no'}
                onValueChange={(val) => {
                  const isDoc = val === 'yes';
                  setField('isAlsoDoctor', isDoc);
                  updateFormData({ isDoctor: val });
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="r1" />
                  <label htmlFor="r1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary-grey300">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="r2" />
                  <label htmlFor="r2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary-grey300">No</label>
                </div>
              </RadioGroup>
            </div>

            {form.isAlsoDoctor && (
              <div className='flex flex-col'>
                <InputWithMeta
                  label="Upload Profile Picture"
                  showInput={false}
                  infoIcon
                  requiredDot
                />
                <span className="text-xs text-secondary-grey200 mb-1">Support Size upto 1MB in .png, .jpg, .svg, .webp</span>
                <div
                  className='flex gap-1 cursor-pointer items-center justify-center flex-col rounded-sm border-[0.5px] border-dashed border-blue-primary150 w-[130px] h-[130px] bg-secondary-grey50'
                  onClick={() => {
                  }}
                >
                  {form.profilePhotoKey ? (
                    <div className="text-xs text-green-600">Uploaded</div>
                  ) : (
                    <>
                      <img src={upload} alt="" className='w-4 h-4' />
                      <span className='text-blue-primary250 text-sm'>Upload Image</span>
                    </>
                  )}
                </div>
                {formErrors.profilePhotoKey && <span className="text-red-500 text-xs">{formErrors.profilePhotoKey}</span>}
              </div>
            )}

            {/* Filler div to maintain grid structure if upload is hidden but we want to reserve space? 
                 Actually, if it's hidden, the grid just has one child depending on implementation, 
                 but since we want side-by-side when visible, grid-cols-2 works. 
                 If hidden, standard behavior applies. 
             */}
            {!form.isAlsoDoctor && <div className="hidden md:block"></div>}
          </div>

          <div className="pb-4"></div>
        </div>
      </div>
    </div>
  );
});

export default Hos_1;
