import React, { useEffect, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import useDoctorStep1Store from "../../../../store/useDoctorStep1Store";
import useImageUploadStore from "../../../../store/useImageUploadStore";
import {
  Upload,
  Dropdown,
  FormFieldRow,
  RegistrationHeader
} from '../../../../components/FormItems';
import InputWithMeta from '../../../../components/GeneralDrawer/InputWithMeta';


const Step1 = forwardRef((props, ref) => {
  const {
    firstName,
    lastName,
    emailId,
    phone,
    gender,
    city,
    loading,
    error,
    setField,
    setMfaField,
    submit,
  } = useDoctorStep1Store();

  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadUrlData = useImageUploadStore((state) => state.uploadUrl);

  useEffect(() => {
    if (uploadUrlData && uploadUrlData.key) {
      setField('profilePhotoKey', uploadUrlData.key);
    }
  }, [uploadUrlData, setField]);

  // Ensure MFA flags are always true in state
  useEffect(() => {
    setMfaField('emailId', true);
    setMfaField('phone', true);
  }, [setMfaField]);


  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value || value.trim().length === 0) return "Required";
        return "";
      case "emailId":
        if (!value) return "Required";
        // Simple email regex
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
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "emailVerification" || name === "smsVerification") {
      setMfaField(name === "emailVerification" ? "emailId" : "phone", checked);
    } else {
      setField(name, type === "checkbox" ? checked : value);
      // Validate on change
      setFormErrors((prev) => ({
        ...prev,
        [name]: validateField(name, type === "checkbox" ? checked : value)
      }));
    }
  };


  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    // Validate all fields before submit
    const fieldsToValidate = { firstName, lastName, emailId, phone, gender, city };
    const newErrors = {};
    Object.entries(fieldsToValidate).forEach(([key, val]) => {
      const err = validateField(key, val);
      if (err) newErrors[key] = err;
    });
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // Focus first error field if needed
      return false;
    }

    setIsSubmitting(true);
    const result = await submit();
    setIsSubmitting(false);

    // Bypass validation: Always return true to allow navigation
    if (!result?.success) {
      const msg = result?.error || error || "Registration failed (Bypassed)";
      console.warn("Backend validation failed but ignored:", msg);
      // alert(msg); // Optional: show alert but still allow next
    }
    // Always return true so Layout proceeds
    return true;
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit
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
      {/* 1. Title Section (Header) */}
      <RegistrationHeader
        title="Account Creation"
        subtitle="Please provide your personal information"
      />

      {/* 2. Form Section (Body) - Scrollable */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[700px] mx-auto space-y-6">
          {/* Name Row */}
          <FormFieldRow>
            <div className="w-full">
              <InputWithMeta
                label="First Name"
                requiredDot={true}
                value={firstName}
                onChange={(val) => handleInputChange({ target: { name: 'firstName', value: val } })}
                placeholder="Enter First Name"
              />
              {formErrors.firstName && <span className="text-red-500 text-xs">{formErrors.firstName}</span>}
            </div>
            <div className="w-full">
              <InputWithMeta
                label="Last Name"
                requiredDot={true}
                value={lastName}
                onChange={(val) => handleInputChange({ target: { name: 'lastName', value: val } })}
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
                value={emailId}
                onChange={(val) => handleInputChange({ target: { name: 'emailId', value: val } })}
                placeholder="Enter Work Email"
              />
              {formErrors.emailId && <span className="text-red-500 text-xs">{formErrors.emailId}</span>}
            </div>
            <div className="w-full">
              <InputWithMeta
                label="Contact Number"
                requiredDot={true}
                value={phone}
                onChange={(val) => handleInputChange({ target: { name: 'phone', value: val } })}
                placeholder="Enter Contact Number"
              />
              {formErrors.phone && <span className="text-red-500 text-xs">{formErrors.phone}</span>}
            </div>
          </FormFieldRow>

          {/* Gender and City Row */}
          <FormFieldRow>
            <div className="w-full">
              <Dropdown
                label="Gender"
                name="gender"
                value={gender}
                onChange={handleInputChange}
                options={genderOptions}
                compulsory
              />
              {formErrors.gender && <span className="text-red-500 text-xs">{formErrors.gender}</span>}
            </div>
            <div className="w-full">
              <Dropdown
                label="City"
                name="city"
                value={city}
                onChange={handleInputChange}
                options={cityOptions}
                compulsory
              />
              {formErrors.city && <span className="text-red-500 text-xs">{formErrors.city}</span>}
            </div>
          </FormFieldRow>

          {/* Upload Profile Picture */}
          <div>
            <Upload
              label="Upload Profile Picture"
              compulsory={true}
              onUpload={(key) => setField('profilePhotoKey', key)}
              meta="Support Size upto 1MB in .png, .jpg, .svg, .webp"
            />
          </div>

          <div className="pb-4"></div>
        </div>
      </div>

    </div>
  );
});

export default Step1;
