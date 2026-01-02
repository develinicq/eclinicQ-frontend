import React from "react";
import {
  Dropdown,
  Upload,
  Radio,
  FormFieldRow,
  RegistrationHeader
} from '../../../../components/FormItems';
import useDoctorRegistrationStore from '../../../../store/useDoctorRegistrationStore';
import InputWithMeta from '../../../../components/GeneralDrawer/InputWithMeta';


const Step2 = () => {
  const {
    specialization,
    experienceYears,
    medicalCouncilName,
    medicalCouncilRegYear,
    medicalCouncilRegNo,
    medicalDegreeType,
    medicalDegreeUniversityName,
    medicalDegreeYearOfCompletion,
    pgMedicalDegreeType,
    pgMedicalDegreeUniversityName,
    pgMedicalDegreeYearOfCompletion,
    setField,
    documents,
    setDocument,
    additionalPractices,
    addPractice,
    updatePractice,
  } = useDoctorRegistrationStore();

  const [formErrors, setFormErrors] = React.useState({});

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "medicalCouncilRegNo":
        if (!value) return "Required";
        if (!/^\w{4,}$/.test(value)) return "Invalid Reg. No.";
        return "";
      case "medicalCouncilName":
        if (!value) return "Required";
        return "";
      case "medicalCouncilRegYear":
        if (!value) return "Required";
        if (!/^\d{4}$/.test(value)) return "Year must be 4 digits";
        return "";
      case "medicalDegreeType":
      case "medicalDegreeUniversityName":
      case "medicalDegreeYearOfCompletion":
        if (!value) return "Required";
        return "";
      case "experienceYears":
        if (!value) return "Required";
        if (!/^\d+$/.test(value) || Number(value) < 0) return "Invalid years";
        return "";
      case "specialization":
        if (!value || (typeof value === 'object' && !value.value && !value.name)) return "Required";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  // Validate all fields before submit (if submit button is added)
  const validateAll = () => {
    const fieldsToValidate = {
      medicalCouncilRegNo,
      medicalCouncilName,
      medicalCouncilRegYear,
      medicalDegreeType,
      medicalDegreeUniversityName,
      medicalDegreeYearOfCompletion,
      specialization,
      experienceYears
    };
    const newErrors = {};
    Object.entries(fieldsToValidate).forEach(([key, val]) => {
      const err = validateField(key, val);
      if (err) newErrors[key] = err;
    });
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Common form field props
  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  // Council options
  const councilOptions = [
    { value: "Maharashtra Medical Council", label: "Maharashtra Medical Council" },
    { value: "Andhra Pradesh Medical Council", label: "Andhra Pradesh Medical Council" },
    { value: "Arunachal Pradesh Medical Council", label: "Arunachal Pradesh Medical Council" },
    { value: "Assam Medical Council", label: "Assam Medical Council" },
    { value: "Bihar Medical Council", label: "Bihar Medical Council" },
    { value: "Chhattisgarh Medical Council", label: "Chhattisgarh Medical Council" },
    { value: "Delhi Medical Council", label: "Delhi Medical Council" },
    { value: "Goa Medical Council", label: "Goa Medical Council" },
    { value: "Gujarat Medical Council", label: "Gujarat Medical Council" },
    { value: "Haryana Medical Council", label: "Haryana Medical Council" }
  ];

  // Post graduate degree options
  const pgDegreeOptions = [
    { value: "MD (Internal Medicine)", label: "MD (Internal Medicine)" },
    { value: "MS (General Surgery)", label: "MS (General Surgery)" },
    { value: "MD (Pediatrics)", label: "MD (Pediatrics)" },
    { value: "MS (Orthopedics)", label: "MS (Orthopedics)" },
    { value: "MD (Radiology)", label: "MD (Radiology)" },
    { value: "MS (ENT)", label: "MS (ENT)" }
  ];

  // Graduation degree options
  const gradDegreeOptions = [
    { value: "MBBS", label: "MBBS" },
    { value: "BDS", label: "BDS" },
    { value: "BAMS", label: "BAMS" },
    { value: "BHMS", label: "BHMS" },
    { value: "BUMS", label: "BUMS" },
    { value: "BNYS", label: "BNYS" },
    { value: "BSMS", label: "BSMS" }
  ];

  // College/University options (sample, can be expanded)
  const collegeOptions = [
    { value: "AIIMS Delhi", label: "AIIMS Delhi" },
    { value: "Grant Medical College Mumbai", label: "Grant Medical College Mumbai" },
    { value: "KEM Hospital Mumbai", label: "KEM Hospital Mumbai" },
    { value: "Christian Medical College Vellore", label: "Christian Medical College Vellore" },
    { value: "Maulana Azad Medical College Delhi", label: "Maulana Azad Medical College Delhi" },
    { value: "Other", label: "Other" }
  ];

  // Specialization options (from requested list)
  const specializationOptions = [
    { value: "General Medicine (Internal Medicine)", label: "General Medicine (Internal Medicine)" },
    { value: "General Surgery", label: "General Surgery" },
    { value: "Pediatrics", label: "Pediatrics" },
    { value: "Orthopedics", label: "Orthopedics" },
    { value: "Obstetrics & Gynecology", label: "Obstetrics & Gynecology" },
    { value: "Dermatology", label: "Dermatology" },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow-sm overflow-hidden">
      <RegistrationHeader
        title="Professional Details"
        subtitle="Provide your Professional details and Document for verification"
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[700px] mx-auto space-y-6">
          {/* Medical Registration */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Medical Registration
            </h2>
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="Medical Council Registration Number"
                  value={medicalCouncilRegNo}
                  onChange={(val) => handleInputChange({ target: { name: 'medicalCouncilRegNo', value: val } })}
                  {...commonFieldProps}
                />
                {formErrors.medicalCouncilRegNo && <span className="text-red-500 text-xs">{formErrors.medicalCouncilRegNo}</span>}
              </div>
              <div className="w-full">
                <Dropdown
                  label="Registration Council"
                  name="medicalCouncilName"
                  value={medicalCouncilName}
                  onChange={handleInputChange}
                  options={councilOptions}
                  placeholder="Select Council"
                  {...commonFieldProps}
                />
                {formErrors.medicalCouncilName && <span className="text-red-500 text-xs">{formErrors.medicalCouncilName}</span>}
              </div>
            </FormFieldRow>

            <FormFieldRow>
              <div>
                <InputWithMeta
                  label="Registration Year"
                  value={medicalCouncilRegYear}
                  onChange={(val) => handleInputChange({ target: { name: 'medicalCouncilRegYear', value: val } })}
                  {...commonFieldProps}
                  meta="Visible to Patient"
                />
                {formErrors.medicalCouncilRegYear && <span className="text-red-500 text-xs">{formErrors.medicalCouncilRegYear}</span>}
              </div>
              <Upload
                label="Upload MRN Proof"
                compulsory={true}
                onUpload={key => setDocument({ no: 1, type: 'medical_license', url: key })}
                meta="Support Size upto 5MB in .pdf, .jpg, .doc"
              />
            </FormFieldRow>
          </div>

          {/* Qualifications */}
          <div className="space-y-4 mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Qualifications</h2>

            {/* Graduation */}
            <FormFieldRow>
              <div className="w-full">
                <Dropdown
                  label="Graduation Degree"
                  name="medicalDegreeType"
                  value={medicalDegreeType}
                  onChange={handleInputChange}
                  options={gradDegreeOptions}
                  placeholder="Select Degree"
                  {...commonFieldProps}
                />
                {formErrors.medicalDegreeType && <span className="text-red-500 text-xs">{formErrors.medicalDegreeType}</span>}
              </div>
              <div className="w-full">
                <Dropdown
                  label="College/ University"
                  name="medicalDegreeUniversityName"
                  value={medicalDegreeUniversityName}
                  onChange={handleInputChange}
                  options={collegeOptions}
                  placeholder="Select College/University"
                  {...commonFieldProps}
                />
                {formErrors.medicalDegreeUniversityName && <span className="text-red-500 text-xs">{formErrors.medicalDegreeUniversityName}</span>}
              </div>
            </FormFieldRow>

            <FormFieldRow>
              <InputWithMeta
                label="Year of Completion"
                value={medicalDegreeYearOfCompletion}
                onChange={(val) => handleInputChange({ target: { name: 'medicalDegreeYearOfCompletion', value: val } })}
                {...commonFieldProps}
              />
              {formErrors.medicalDegreeYearOfCompletion && <span className="text-red-500 text-xs">{formErrors.medicalDegreeYearOfCompletion}</span>}
              <Upload
                label="Upload Degree Proof"
                compulsory={true}
                onUpload={key => setDocument({ no: 2, type: 'degree_certificate', url: key })}
                meta="Support Size upto 5MB in .pdf, .jpg, .doc"
              />
            </FormFieldRow>

            {/* Post Graduation Radio */}
            <div className="space-y-4">
              <Radio
                label="Have Post Graduate Degree?"
                name="hasPG"
                value={pgMedicalDegreeType !== null ? 'yes' : 'no'}
                onChange={e => {
                  const v = e.target.value;
                  if (v === 'no') {
                    setField('pgMedicalDegreeType', null);
                    setField('pgMedicalDegreeUniversityName', '');
                    setField('pgMedicalDegreeYearOfCompletion', '');
                  } else {
                    // Initialize to empty string to show dependent fields without selecting a degree yet
                    if (pgMedicalDegreeType === null) setField('pgMedicalDegreeType', '');
                  }
                }}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" }
                ]}
              />

              {/* Conditional Post Graduation Fields */}
              {pgMedicalDegreeType !== null && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Dropdown
                      label="Post Graduate Degree"
                      name="pgMedicalDegreeType"
                      value={pgMedicalDegreeType}
                      onChange={e => setField('pgMedicalDegreeType', e.target.value)}
                      options={pgDegreeOptions}
                      placeholder="Select Degree"
                    />
                    <InputWithMeta
                      label="Year of Completion"
                      value={pgMedicalDegreeYearOfCompletion}
                      onChange={(val) => setField('pgMedicalDegreeYearOfCompletion', val)}
                    />
                  </div>
                  <div className="space-y-4">
                    <Dropdown
                      label="College/ University"
                      name="pgMedicalDegreeUniversityName"
                      value={pgMedicalDegreeUniversityName}
                      onChange={e => setField('pgMedicalDegreeUniversityName', e.target.value)}
                      options={collegeOptions}
                      placeholder="Select College/University"
                    />
                    <Upload
                      label="Upload Degree Proof"
                      compulsory={false}
                      onUpload={key => setDocument({ no: 3, type: 'specialization_certificate', url: key })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='border mb'></div>

          {/* Practice Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">Practice Details</h2>
              <button
                type="button"
                onClick={addPractice}
                title="Add specialization"
                className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
                aria-label="Add specialization"
              >
                +
              </button>
            </div>
            <FormFieldRow>
              <div className="w-full">
                <Dropdown
                  label="Specialization"
                  name="specialization"
                  value={typeof specialization === 'object' ? (specialization?.value || specialization?.name || '') : specialization}
                  onChange={handleInputChange}
                  options={specializationOptions}
                  placeholder="Select Specialization"
                  {...commonFieldProps}
                />
                {formErrors.specialization && <span className="text-red-500 text-xs">{formErrors.specialization}</span>}
              </div>
              <div className="w-full">
                <InputWithMeta
                  label="Year of Experience"
                  requiredDot={true}
                  value={experienceYears}
                  onChange={(val) => handleInputChange({ target: { name: 'experienceYears', value: val } })}
                  placeholder="Enter Year"
                />
                {formErrors.experienceYears && <span className="text-red-500 text-xs">{formErrors.experienceYears}</span>}
              </div>
            </FormFieldRow>

            {Array.isArray(additionalPractices) && additionalPractices.length > 0 && (
              <div className="space-y-3">
                {additionalPractices.map((p, idx) => (
                  <FormFieldRow key={idx}>
                    <Dropdown
                      label="Specialization"
                      name={`additional_specialization_${idx}`}
                      value={typeof p.specialization === 'object' ? (p.specialization?.value || p.specialization?.name || '') : (p.specialization || '')}
                      onChange={e => {
                        const val = e.target.value;
                        const opt = specializationOptions.find(o => o.value === val);
                        updatePractice(idx, { specialization: { name: opt?.label || val, value: val } });
                      }}
                      options={specializationOptions}
                      placeholder="Select Specialization"
                      compulsory
                      required
                    />
                    <InputWithMeta
                      label="Year of Experience"
                      value={p.experienceYears}
                      onChange={(val) => updatePractice(idx, { experienceYears: val })}
                      placeholder="Enter Year"
                      compulsory
                      required
                    />
                  </FormFieldRow>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Step2;
