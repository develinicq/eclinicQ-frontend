import React, { useState } from "react";
import {
  Input,
  Dropdown,
  Upload,
  Radio,
  FormContainer,
  FormSection,
  FormFieldRow
} from '../../components/FormItems';


const Step2 = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    councilNumber: "",
    councilName: "",
    regYear: "",
    graduation: "",
    graduationCollege: "",
    graduationYear: "",
    hasPG: "", 
    pgDegree: "",
    pgCollege: "",
    pgYear: "",
    specialization: "",
    experience: "",
  });
  const handleNext = () => {
    if (onNext) onNext(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Common form field props
  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  // Council options
  const councilOptions = [
    { value: "Maharashtra Medical Council", label: "Maharashtra Medical Council" },
    { value: "Delhi Medical Council", label: "Delhi Medical Council" }
  ];

  // Post graduate degree options
  const pgDegreeOptions = [
    { value: "MD", label: "MD" },
    { value: "MS", label: "MS" },
    { value: "DM", label: "DM" },
    { value: "MCh", label: "MCh" },
    { value: "DNB", label: "DNB" }
  ];

  return (
    <FormContainer>
      <FormSection
        title="Professional Details"
        subtitle="Provide your Professional details and Document for verification"
      >
        <div className="space-y-6">
          {/* Medical Registration */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Medical Registration
            </h2>
            <FormFieldRow>
              <Input
                label="Medical Council Registration Number"
                name="councilNumber"
                value={formData.councilNumber}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Dropdown
                label="Registration Council"
                name="councilName"
                value={formData.councilName}
                onChange={handleInputChange}
                options={councilOptions}
                placeholder="Select Council"
                {...commonFieldProps}
              />
            </FormFieldRow>

            <FormFieldRow>
              <div>
                <Input
                  label="Registration Year"
                  name="regYear"
                  value={formData.regYear}
                  onChange={handleInputChange}
                  {...commonFieldProps}
                />
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>
              <Upload
                label="Upload MRN Proof"
                compulsory={true}
              />
            </FormFieldRow>
          </div>

          {/* Qualifications */}
          <div className="space-y-4 mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Qualifications</h2>

            {/* Graduation */}
            <FormFieldRow>
              <Input
                label="Graduation"
                name="graduation"
                value={formData.graduation}
                onChange={handleInputChange}
                placeholder="e.g. MBBS"
                {...commonFieldProps}
              />
              <Input
                label="College/ University"
                name="graduationCollege"
                value={formData.graduationCollege}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
            </FormFieldRow>

            <FormFieldRow>
              <Input
                label="Year of Completion"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Upload
                label="Upload Degree Proof"
                compulsory={true}
              />
            </FormFieldRow>

            {/* Post Graduation Radio */}
            <div className="space-y-4">
              <Radio
                label="Have Post Graduate Degree?"
                name="hasPG"
                value={formData.hasPG}
                onChange={handleInputChange}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" }
                ]}
              />

              {/* Conditional Post Graduation Fields */}
              {formData.hasPG === "yes" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Dropdown
                      label="Post Graduate Degree"
                      name="pgDegree"
                      value={formData.pgDegree}
                      onChange={handleInputChange}
                      options={pgDegreeOptions}
                      placeholder="Select Degree"
                    />
                    <Input
                      label="Year of Completion"
                      name="pgYear"
                      value={formData.pgYear}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-4">
                    <Input
                      label="College/ University"
                      name="pgCollege"
                      value={formData.pgCollege}
                      onChange={handleInputChange}
                      placeholder="Search or Enter College"
                    />
                    <Upload
                      label="Upload Degree Proof"
                      compulsory={false}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='border mb'></div>

          {/* Practice Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Practice Details
            </h2>
            <FormFieldRow>
              <Input
                label="Specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="Select Degree Type"
              />
              <Input
                label="Year of Experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Enter Year"
              />
            </FormFieldRow>
          </div>
        </div>
  {/* Navigation handled by parent, no submit button here */}
      </FormSection>
    </FormContainer>
  );
};

export default Step2;
