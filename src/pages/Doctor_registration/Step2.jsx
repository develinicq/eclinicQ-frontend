<<<<<<< HEAD
import React, { useState } from "react";
import { ChevronDown, Upload } from "lucide-react";

const Step2 = () => {
  const [formData, setFormData] = useState({
    councilNumber: "",
    councilName: "",
    regYear: "",
    graduation: "",
    graduationCollege: "",
    graduationYear: "",
    hasPG: "", // radio value
    pgDegree: "",
    pgCollege: "",
    pgYear: "",
    specialization: "",
    experience: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="rounded-md bg-white p-8 h-full">
      <div className="rounded-xl items-center mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Professional Details
          </h1>
          <p className="text-gray-600 text-sm">
            Provide your Professional details and Document for verification
          </p>
        </div>

        <div className="space-y-10 px-40">
          {/* Medical Registration */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Medical Registration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Council Registration Number{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="councilNumber"
                  value={formData.councilNumber}
                  onChange={handleInputChange}
                  className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Council <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="councilName"
                    value={formData.councilName}
                    onChange={handleInputChange}
                    className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none pr-10"
                  >
                    <option value="">Select Council</option>
                    <option value="Maharashtra Medical Council">
                      Maharashtra Medical Council
                    </option>
                    <option value="Delhi Medical Council">
                      Delhi Medical Council
                    </option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="regYear"
                  value={formData.regYear}
                  onChange={handleInputChange}
                  className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload MRN Proof <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                  <button className="text-blue-500 text-sm font-medium">
                    Upload File
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    Support Size upto 1MB in .png, .jpg, .svg, .webp
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Qualifications</h2>

            {/* Graduation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="graduation"
                  value={formData.graduation}
                  onChange={handleInputChange}
                  className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. MBBS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College/ University <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="graduationCollege"
                  value={formData.graduationCollege}
                  onChange={handleInputChange}
                  className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Completion <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Degree Proof <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                  <button className="text-blue-500 text-sm font-medium">
                    Upload File
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    Support Size upto 1MB in .png, .jpg, .svg, .webp
                  </p>
                </div>
              </div>
            </div>

            {/* Post Graduation Radio */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Have Post Graduate Degree?
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasPG"
                    value="yes"
                    checked={formData.hasPG === "yes"}
                    onChange={handleInputChange}
                    className="accent-blue-500"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasPG"
                    value="no"
                    checked={formData.hasPG === "no"}
                    onChange={handleInputChange}
                    className="accent-blue-500"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Conditional Post Graduation Fields */}
            {formData.hasPG === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Graduate Degree
                  </label>
                  <input
                    type="text"
                    name="pgDegree"
                    value={formData.pgDegree}
                    onChange={handleInputChange}
                    className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Select Degree"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College/ University
                  </label>
                  <input
                    type="text"
                    name="pgCollege"
                    value={formData.pgCollege}
                    onChange={handleInputChange}
                    className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year of Completion
                  </label>
                  <input
                    type="text"
                    name="pgYear"
                    value={formData.pgYear}
                    onChange={handleInputChange}
                    className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Degree Proof
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <button className="text-blue-500 text-sm font-medium">
                      Upload File
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      Support Size upto 1MB in .png, .jpg, .svg, .webp
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Practice Details */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Practice Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Select Degree Type"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter Year"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
=======
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

const Step2 = () => {
  const [formData, setFormData] = useState({
    councilNumber: "",
    councilName: "",
    regYear: "",
    graduation: "",
    graduationCollege: "",
    graduationYear: "",
    hasPG: "", // radio value
    pgDegree: "",
    pgCollege: "",
    pgYear: "",
    specialization: "",
    experience: "",
  });

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
      </FormSection>
    </FormContainer>
  );
};

export default Step2;
>>>>>>> dev
