import React, { useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import useDoctorStep1Store from "../../store/useDoctorStep1Store";
import useImageUploadStore from "../../store/useImageUploadStore";
import { 
  Input, 
  Upload, 
  Dropdown, 
  FormContainer, 
  FormSection, 
  FormFieldRow, 
  MFA
} from '../../components/FormItems';

const Step1 = forwardRef((props, ref) => {
  const {
    firstName,
    lastName,
    emailId,
    phone,
    gender,
    city,
    password,
    mfa,
    profilePhotoKey,
    loading,
    error,
    success,
    setField,
    setMfaField,
    submit,
    reset
  } = useDoctorStep1Store();

  const uploadUrlData = useImageUploadStore((state) => state.uploadUrl);

  useEffect(() => {
    if (uploadUrlData && uploadUrlData.key) {
      setField('profilePhotoKey', uploadUrlData.key);
    }
  }, [uploadUrlData, setField]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "emailVerification" || name === "smsVerification") {
      setMfaField(name === "emailVerification" ? "emailId" : "phone", checked);
    } else {
      setField(name, type === "checkbox" ? checked : value);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const result = await submit();
    if (result) {
      alert("Account created successfully!");
      reset();
      return true;
    } else if (error) {
      alert(error || "Registration failed");
      return false;
    }
    return false;
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
    { value: "Mumbai, Maharashtra", label: "Mumbai, Maharashtra" },
    { value: "Delhi, Delhi", label: "Delhi, Delhi" },
    { value: "Bangalore, Karnataka", label: "Bangalore, Karnataka" },
    { value: "Chennai, Tamil Nadu", label: "Chennai, Tamil Nadu" },
  ];

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormSection
        title="Account Creation"
        subtitle="Please provide your personal information"
      >
        <div className="space-y-6">
          {/* Name Row */}
          <FormFieldRow>
            <Input
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
              compulsory
            />
            <Input
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
              compulsory
            />
          </FormFieldRow>

          {/* Email and Phone Row */}
          <FormFieldRow>
            <Input
              label="Work Email"
              name="emailId"
              type="email"
              value={emailId}
              onChange={handleInputChange}
              compulsory
            />
            <Input
              label="Contact Number"
              name="phone"
              type="tel"
              value={phone}
              onChange={handleInputChange}
              compulsory
            />
          </FormFieldRow>

          {/* Gender and City Row */}
          <FormFieldRow>
            <Dropdown
              label="Gender"
              name="gender"
              value={gender}
              onChange={handleInputChange}
              options={genderOptions}
              compulsory
            />
            <Dropdown
              label="City"
              name="city"
              value={city}
              onChange={handleInputChange}
              options={cityOptions}
              compulsory
            />
          </FormFieldRow>

          {/* Upload Profile Picture */}
          <div>
            <Upload 
              label="Upload Profile Picture" 
              compulsory={true} 
              onUpload={(key) => setField('profilePhotoKey', key)}
            />
          </div>

          {/* Multi-Factor Authentication (always checked & disabled) */}
          <MFA 
            formData={{
              emailVerification: true,
              smsVerification: true
            }} 
            handleInputChange={handleInputChange} 
            disabled={true}   // <-- pass down a disabled flag
          />

          <div className="pb-8"></div>
        </div>
      </FormSection>

  {/* No submit button here; handled by footer */}
    </FormContainer>
  );
});

export default Step1;
