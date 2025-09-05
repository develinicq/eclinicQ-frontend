<<<<<<< HEAD
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Hos_2 = () => {
      const [step, setStep] = useState(1);

  // Step navigation
        const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
        const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  return (
    <div className="rounded-md bg-white p-8 h-full">
      {/* Header with Progress Bar */}
      <div className="flex flex-col items-center justify-center text-center mb-6">
  <h1 className="text-2xl font-bold text-gray-900 mb-1">
    {step === 1 ? "Owner Account Creation" : "Hospital Details"}
  </h1>
  <p className="text-gray-600 text-sm">
    {step === 1
      ? "Set up the primary administrator account for your hospital"
      : "Provide your hospital details"}
  </p>

  {/* ✅ Centered Progress Bar */}
  <div className="w-64 bg-gray-200 h-2 rounded-full mt-4">
    <div
      className="h-2 bg-blue-500 rounded-full transition-all duration-500"
      style={{ width: step === 1 ? "50%" : "100%" }}
    ></div>
  </div>

  <p className="text-xs text-gray-500 mt-1">{step} of 2</p>
</div>


      <div className="space-y-10 px-20">
        {/* ---------------- Hospital Info ---------------- */}
        {step === 1 && (
  <div className="space-y-8">
    {/* ---------------- Hospital Info ---------------- */}
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Hospital Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Hospital Name"
          />
          <p className="text-xs text-gray-500 mt-1">Visible to Patient</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select className="w-full h-[32px] px-2 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-blue-500 outline-none appearance-none pr-8">
              <option>Select Type</option>
              <option>Private</option>
              <option>Government</option>
              <option>Trust</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                    w-5 h-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Visible to Patient</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter Work Email"
            className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Visible to Patient</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Work Number"
            className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Visible to Patient</p>
        </div>
      </div>

      {/* Year, Website, Beds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Established Year
          </label>
          <select className="w-full h-[32px] px-2 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 outline-none">
            <option>Select Year</option>
            <option>1990</option>
            <option>2000</option>
            <option>2010</option>
            <option>2020</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="text"
            placeholder="Paste Website Link"
            className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Beds</label>
          <input
            type="number"
            placeholder="Enter Beds Count"
            className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
    </div>

    {/* ---------------- Clinic Address ---------------- */}
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Clinic Address</h2>
      {/* Map */}
      <div className="w-full h-48 bg-gray-100 border rounded-lg flex items-center justify-center">
        <p className="text-gray-500">[ Map Location Placeholder ]</p>
      </div>

      {/* Address Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          placeholder="Block no./Shop no./House no."
          className="w-full h-[32px] px-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Road/Area/Street"
          className="w-full h-[32px] px-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Landmark"
          className="w-full h-[32px] px-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Pincode"
          className="w-full h-[32px] px-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="City"
          className="w-full h-[32px] px-2 border border-gray-300 rounded-lg"
        />
        <select className="w-full h-[32px] px-2 border border-gray-300 rounded-lg">
          <option>Select State</option>
          <option>Maharashtra</option>
          <option>Karnataka</option>
          <option>Delhi</option>
        </select>
      </div>
    </div>
    <div className="flex justify-end">
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
  </div>
)}

            {/* ---------------- Services & Facilities ---------------- */}
        {step === 2 && (

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Services & Facilities</h2>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">
              Medical Specialties <span className="text-red-500">*</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {[
                "Cardiology","Neurology","Pediatrics","Orthopedics","Internal Medicine","Obstetrics & Gynecology","Emergency Medicine","Surgery","Radiology","Psychiatry","Dermatology","Oncology"
              ].map((item, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">
              Hospital Services & Facilities <span className="text-red-500">*</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {[
                "Emergency Care","Surgery","Diagnostics Imaging","Laboratory Services","Outpatient Care","Inpatient Care","Rehabilitation","Maternity Care","Pharmacy","ICU","Ambulance Services","Patient Rooms"
              ].map((item, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Accreditations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[
                "NABH – National Accreditation Board",
                "ISO Certifications",
                "JCI – Joint Commission International",
                "NABL – National Accreditation Board"
              ].map((item, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Operating Hours</h3>
            <input
              type="text"
              placeholder="Select the days and times"
              className="w-full h-[32px] px-2 border border-gray-300 rounded-lg"
            />
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={() => alert("Form submitted!")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>

        
        )}
        
      </div>
    </div>
=======
import React, { useState } from 'react';
import { 
  Input,
  Dropdown,
  Upload,
  Radio,
  FormContainer,
  FormSection,
  FormFieldRow
} from '../../components/FormItems';

const Hos_2 = () => {
  // Doctor registration form data
  const [doctorFormData, setDoctorFormData] = useState({
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
    setDoctorFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Common form field props
  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  return (
    <FormContainer>
      <FormSection
        title="Register as Doctor"
        subtitle="Complete the following information to register as a doctor in the system"
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
                value={doctorFormData.councilNumber}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Dropdown
                label="Registration Council"
                name="councilName"
                value={doctorFormData.councilName}
                onChange={handleInputChange}
                options={[
                  { value: "Maharashtra Medical Council", label: "Maharashtra Medical Council" },
                  { value: "Delhi Medical Council", label: "Delhi Medical Council" }
                ]}
                placeholder="Select Council"
                {...commonFieldProps}
              />
            </FormFieldRow>
            <FormFieldRow>
              <div>
                <Input
                  label="Registration Year"
                  name="regYear"
                  value={doctorFormData.regYear}
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

          {/* Education Details */}
          <div className="space-y-4 mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Education Details
            </h2>
            <FormFieldRow>
              <Input
                label="Graduation Degree"
                name="graduation"
                value={doctorFormData.graduation}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Input
                label="Graduation College"
                name="graduationCollege"
                value={doctorFormData.graduationCollege}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
            </FormFieldRow>
            <FormFieldRow>
              <Input
                label="Graduation Year"
                name="graduationYear"
                value={doctorFormData.graduationYear}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Upload label="Upload Degree Proof" compulsory={true} />
            </FormFieldRow>
          </div>

          {/* Post Graduation */}
          <div className="space-y-4">
            <Radio
              label="Do you have Post Graduation Degree?"
              name="hasPG"
              value={doctorFormData.hasPG}
              onChange={handleInputChange}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ]}
            />
            {doctorFormData.hasPG === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Dropdown
                    label="Post Graduate Degree"
                    name="pgDegree"
                    value={doctorFormData.pgDegree}
                    onChange={handleInputChange}
                    options={[
                      { value: "MD", label: "MD" },
                      { value: "MS", label: "MS" },
                      { value: "DM", label: "DM" },
                      { value: "MCh", label: "MCh" },
                      { value: "DNB", label: "DNB" }
                    ]}
                    placeholder="Select Degree"
                    {...commonFieldProps}
                  />
                  <Input
                    label="Year of Completion"
                    name="pgYear"
                    value={doctorFormData.pgYear}
                    onChange={handleInputChange}
                    {...commonFieldProps}
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    label="College/ University"
                    name="pgCollege"
                    value={doctorFormData.pgCollege}
                    onChange={handleInputChange}
                    placeholder="Search or Enter College"
                    {...commonFieldProps}
                  />
                  <Upload 
                    label="Upload Degree Proof" 
                    compulsory={false}
                  />
                </div>
              </div>
            )}
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
                value={doctorFormData.specialization}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Input
                label="Years of Experience"
                name="experience"
                value={doctorFormData.experience}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
            </FormFieldRow>
          </div>
        </div>
      </FormSection>
    </FormContainer>
>>>>>>> dev
  );
};

export default Hos_2;
