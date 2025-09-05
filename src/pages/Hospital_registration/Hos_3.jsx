<<<<<<< HEAD
import React from "react";
import { Info } from "lucide-react";

const Hos_3 = () => {
  return (
    <div className="w-full bg-white rounded-xl">
    <div className=" max-w-5xl mx-auto bg-white p-6 ">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-center mb-2">
        Documents Verification
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Provide your Document Numbers and Upload Supporting Document for
        verification
      </p>

      {/* Warning Banner */}
      <div className="bg-orange-50 border border-orange-200 text-orange-700 p-4 rounded-lg mb-6 flex items-start gap-2">
        <Info className="w-5 h-5 mt-0.5" />
        <p className="text-sm">
          <span className="font-semibold">Automated Verification ID</span>
          <br />
          We’ll instantly verify the following IDs through their respective
          APIs. At least one verified ID is required to proceed.
        </p>
      </div>

      {/* GSTIN & ABHA Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* GSTIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GSTIN <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter 15-digit GSTIN"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-gray-100 border rounded-lg text-sm font-medium hover:bg-gray-200">
              Verify
            </button>
          </div>
          <div className="mt-3 border rounded-lg p-3 text-sm text-gray-600 bg-gray-50">
            <p className="font-medium mb-1">Fetched Details from GSTIN</p>
            <p>Legal Business Name :</p>
            <p>Registered Address :</p>
            <p>Status :</p>
          </div>
          <button className="mt-3 w-full text-left text-blue-600 text-sm font-medium border border-dashed border-blue-400 rounded-lg px-4 py-2 hover:bg-blue-50">
            Upload File
          </button>
        </div>

        {/* ABHA */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ABHA Facility ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Abha ID"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-gray-100 border rounded-lg text-sm font-medium hover:bg-gray-200">
              Verify
            </button>
          </div>
          <div className="mt-3 border rounded-lg p-3 text-sm text-gray-600 bg-gray-50">
            <p className="font-medium mb-1">Fetched Details from ABHA</p>
            <p>Legal Business Name :</p>
            <p>Registered Address :</p>
            <p>Status :</p>
          </div>
          <button className="mt-3 w-full text-left text-blue-600 text-sm font-medium border border-dashed border-blue-400 rounded-lg px-4 py-2 hover:bg-blue-50">
            Upload File
          </button>
        </div>
      </div>

      {/* CIN Question */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Do you have CIN (Corporate Hospital Registration Number)?
        </p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="cin" className="accent-blue-500" />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="cin" className="accent-blue-500" />
            <span>No</span>
          </label>
        </div>
      </div>

      <hr className="mb-8" />

      {/* Other Documents */}
      <div className="space-y-6">
        {[
          {
            label: "State Health Registration Number",
            required: true,
            placeholder: "Enter State Registration Number",
          },
          {
            label: "PAN Card of Hospital",
            required: true,
            placeholder: "Enter State Registration Number",
          },
          {
            label: "Rohini ID",
            placeholder: "Enter 13-digit Rohini ID",
          },
          {
            label: "NABH Accreditation",
            placeholder: "Enter NABH Accreditation ID",
          },
        ].map((field, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                placeholder={field.placeholder}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload Supporting Document of Size 4MB in .pdf format
              </p>
            </div>
            <div className="flex items-center ">
              <button className="w-full text-left text-blue-600 text-sm font-medium border border-dashed border-blue-400 rounded-lg px-4 py-2 hover:bg-blue-50">
                Upload File
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
=======
import React, { useState, useEffect } from "react";
import { useRegistration } from "../../context/RegistrationContext";
import { Info } from "lucide-react";
import { 
  Input,
  Dropdown,
  Upload,
  Toggle,
  TimeInput,
  DayCard,
  FormContainer,
  FormSection,
  FormFieldRow,
  MapLocation,
  ProgressBar
} from "../../components/FormItems";

const Hos_3 = () => {
  const { formData, updateFormData } = useRegistration();

  // current substep (1 = Hospital Details, 2 = Services & Facilities)
  const currentSubStep = formData.hosStep3SubStep || 1;

  // Local state merged with context
  const [hospitalData, setHospitalData] = useState({
    hospitalName: formData.hospitalName || "",
    hospitalType: formData.hospitalType || "",
    hospitalEmail: formData.hospitalEmail || "",
    hospitalContact: formData.hospitalContact || "",
    establishedYear: formData.establishedYear || "",
    website: formData.website || "",
    numberOfBeds: formData.numberOfBeds || "",
    blockNumber: formData.blockNumber || "",
    roadAreaStreet: formData.roadAreaStreet || "",
    landmark: formData.landmark || "",
    pincode: formData.pincode || "",
    city: formData.city || "",
    state: formData.state || "",
    hospitalUrl: formData.hospitalUrl || "",
    // Keep existing fields for Page2
    hospitalAddress: formData.hospitalAddress || "",
    operatingHours: formData.operatingHours || ["Sunday"],
    // Time fields for each day
    sundayStartTime: formData.sundayStartTime || "09:00",
    sundayEndTime: formData.sundayEndTime || "18:00",
    sunday24Hours: formData.sunday24Hours || false,
    mondayStartTime: formData.mondayStartTime || "09:00",
    mondayEndTime: formData.mondayEndTime || "18:00",
    monday24Hours: formData.monday24Hours || false,
    tuesdayStartTime: formData.tuesdayStartTime || "09:00",
    tuesdayEndTime: formData.tuesdayEndTime || "18:00",
    tuesday24Hours: formData.tuesday24Hours || false,
    wednesdayStartTime: formData.wednesdayStartTime || "09:00",
    wednesdayEndTime: formData.wednesdayEndTime || "18:00",
    wednesday24Hours: formData.wednesday24Hours || false,
    thursdayStartTime: formData.thursdayStartTime || "09:00",
    thursdayEndTime: formData.thursdayEndTime || "18:00",
    thursday24Hours: formData.thursday24Hours || false,
    fridayStartTime: formData.fridayStartTime || "09:00",
    fridayEndTime: formData.fridayEndTime || "18:00",
    friday24Hours: formData.friday24Hours || false,
    saturdayStartTime: formData.saturdayStartTime || "09:00",
    saturdayEndTime: formData.saturdayEndTime || "18:00",
    saturday24Hours: formData.saturday24Hours || false,
    medicalSpecialties: formData.medicalSpecialties || [],
    hospitalServices: formData.hospitalServices || [],
    accreditations: formData.accreditations || [],
  });

  // Update global context whenever local state changes
  useEffect(() => {
    updateFormData({ ...hospitalData, hosStep3SubStep: currentSubStep });
  }, [hospitalData, currentSubStep]);

  // Handle inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHospitalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (section, value) => {
    setHospitalData((prev) => {
      const updated = prev[section].includes(value)
        ? prev[section].filter((item) => item !== value)
        : [...prev[section], value];
      return { ...prev, [section]: updated };
    });
  };

  // Substep Navigation
  const nextSubStep = () => updateFormData({ hosStep3SubStep: currentSubStep + 1 });
  const prevSubStep = () => updateFormData({ hosStep3SubStep: currentSubStep - 1 });


  // Page 1 → Hospital Details (Redesigned to match the image)
  const Page1 = () => (
    <div className="rounded-md bg-white p-8 min-h-full">
      <div className="rounded-xl items-center mx-auto">
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Hospital Details</h1>
          <p className="text-gray-600 text-sm">Provide your hospital details</p>
         
      </div>
      <ProgressBar step={1} total={2} />
      

        <div className="space-y-6 px-40">
          {/* Hospital Info Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Hospital Info</h2>
            
            {/* First 4 fields in 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hospital Name */}
              <div>
                <Input
                  label="Hospital Name"
                  name="hospitalName"
                  placeholder="Hospital Name"
                  value={hospitalData.hospitalName}
                  onChange={handleInputChange}
                  compulsory={true}
                  required={true}
                />
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>

              {/* Hospital Type */}
              <div>
                <Dropdown
                  label="Hospital Type"
                  name="hospitalType"
                  value={hospitalData.hospitalType}
                  onChange={handleInputChange}
                  compulsory={true}
                  required={true}
                  options={[
                    { value: "General Hospital", label: "General Hospital" },
                    { value: "Specialty Hospital", label: "Specialty Hospital" },
                    { value: "Multi-Specialty Hospital", label: "Multi-Specialty Hospital" },
                    { value: "Super Specialty Hospital", label: "Super Specialty Hospital" },
                    { value: "Medical Center", label: "Medical Center" },
                    { value: "Clinic", label: "Clinic" }
                  ]}
                  placeholder="Select Hospital Type"
                />
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>

              {/* Hospital Contact Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  Hospital Contact Email <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    name="hospitalEmail"
                    placeholder="Enter Work Email"
                    value={hospitalData.hospitalEmail}
                    onChange={handleInputChange}
                    className="flex-1 h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      hospitalData.hospitalEmail.trim() 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!hospitalData.hospitalEmail.trim()}
                  >
                    Send OTP
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>

              {/* Hospital Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  Hospital Contact Number <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    name="hospitalContact"
                    placeholder="Enter Contact Number"
                    value={hospitalData.hospitalContact}
                    onChange={handleInputChange}
                    className="flex-1 h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      hospitalData.hospitalContact.trim() 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!hospitalData.hospitalContact.trim()}
                  >
                    Send OTP
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>
            </div>

            {/* Last 3 fields in 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Established Year */}
              <div>
                <Dropdown
                  label="Established Year"
                  name="establishedYear"
                  value={hospitalData.establishedYear}
                  onChange={handleInputChange}
                  options={Array.from({ length: 50 }, (_, i) => 2024 - i).map(year => ({
                    value: year.toString(),
                    label: year.toString()
                  }))}
                  placeholder="Select Year"
                />
              </div>

              {/* Number of Beds */}
              <div>
                <Input
                  label="Number of Beds"
                  name="numberOfBeds"
                  type="number"
                  placeholder="Enter Beds Count"
                  value={hospitalData.numberOfBeds}
                  onChange={handleInputChange}
                />
              </div>

              {/* Website */}
              <div>
                <Input
                  label="Website"
                  name="website"
                  type="url"
                  placeholder="Paste Website Link"
                  value={hospitalData.website}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
          </div>

          <div className="border border-b mt-1"></div>

          {/* Clinic Address Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Clinic Address</h2>
            
            {/* Map Location */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-700">Map Location</span>
                <Info size={16} className="text-gray-400" />
              </div>
              <MapLocation captionText="Siddaiah Rd" />
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Block no./Shop no./House no. */}
              <div>
                <Input
                  label="Block no./Shop no./House no."
                  name="blockNumber"
                  placeholder="Enter Block Number/ Shop Number/ House Nu..."
                  value={hospitalData.blockNumber}
                  onChange={handleInputChange}
                  compulsory={true}
                  required={true}
                />
              </div>

              {/* Road/Area/Street */}
              <div>
                <Input
                  label="Road/Area/Street"
                  name="roadAreaStreet"
                  placeholder="Enter Road/Area/Street"
                  value={hospitalData.roadAreaStreet}
                  onChange={handleInputChange}
                  compulsory={true}
                  required={true}
                />
              </div>

              {/* Landmark */}
              <div>
                <Input
                  label="Landmark"
                  name="landmark"
                  placeholder="Enter landmark"
                  value={hospitalData.landmark}
                  onChange={handleInputChange}
                  compulsory={true}
                  required={true}
                />
              </div>

              {/* Pincode */}
              <div>
                <Input
                  label="Pincode"
                  name="pincode"
                  placeholder="Enter Pincode"
                  value={hospitalData.pincode}
                  onChange={handleInputChange}
                  compulsory={true}
                  required={true}
                />
              </div>

              {/* City */}
              <div>
                <Input
                  label="City"
                  name="city"
                  placeholder="Enter City"
                  value={hospitalData.city}
                  onChange={handleInputChange}
                  compulsory={true}
                  required={true}
                />
              </div>

              {/* State */}
              <div>
                <Dropdown
                  label="State"
                  name="state"
                  value={hospitalData.state}
                  onChange={handleInputChange}
                  compulsory={true}
                  required={true}
                  options={[
                    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
                    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
                    { value: "Assam", label: "Assam" },
                    { value: "Bihar", label: "Bihar" },
                    { value: "Chhattisgarh", label: "Chhattisgarh" },
                    { value: "Goa", label: "Goa" },
                    { value: "Gujarat", label: "Gujarat" },
                    { value: "Haryana", label: "Haryana" },
                    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
                    { value: "Jharkhand", label: "Jharkhand" },
                    { value: "Karnataka", label: "Karnataka" },
                    { value: "Kerala", label: "Kerala" },
                    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
                    { value: "Maharashtra", label: "Maharashtra" },
                    { value: "Manipur", label: "Manipur" },
                    { value: "Meghalaya", label: "Meghalaya" },
                    { value: "Mizoram", label: "Mizoram" },
                    { value: "Nagaland", label: "Nagaland" },
                    { value: "Odisha", label: "Odisha" },
                    { value: "Punjab", label: "Punjab" },
                    { value: "Rajasthan", label: "Rajasthan" },
                    { value: "Sikkim", label: "Sikkim" },
                    { value: "Tamil Nadu", label: "Tamil Nadu" },
                    { value: "Telangana", label: "Telangana" },
                    { value: "Tripura", label: "Tripura" },
                    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
                    { value: "Uttarakhand", label: "Uttarakhand" },
                    { value: "West Bengal", label: "West Bengal" }
                  ]}
                  placeholder="Select State"
                />
              </div>
            </div>
          </div>

          {/* Social Presence Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Social Presence</h2>
            
            {/* First row: Hospital URL and Upload Company Logo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hospital URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  Hospital URL <img src="/i-icon.png" alt="" className='w-3 h-3' />
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="hospitalUrl"
                    placeholder="Enter Hospital User Name"
                    value={hospitalData.hospitalUrl || ""}
                    onChange={handleInputChange}
                    className="flex-1 h-[32px] px-2 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <div className="h-[32px] px-3 py-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r-lg flex items-center text-sm text-gray-600">
                    .eclinicq.com
                  </div>
                </div>
              </div>

              {/* Upload Company Logo */}
              <div>
                <Upload 
                  label="Upload Company Logo" 
                  compulsory={false}
                />
              </div>
            </div>

            {/* Second row: Upload Hospital Image */}
            <div className="">
              <Upload 
                label="Upload Hospital Image" 
                compulsory={true}
              />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );

  // Page 2 → Services & Facilities
  const Page2 = () => (
    <div className="rounded-md bg-white p-8 min-h-full">
      <div className="rounded-xl items-center mx-auto">
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Services & Facilities</h1>
          <p className="text-gray-600 text-sm">Medical services and hospital facilities</p>
        </div>

        <ProgressBar step={2} total={2} />

        <div className="space-y-6 px-40">
          {/* Medical Specialties Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Medical Specialties <span className="text-red-500">*</span></h2>
              <p className="text-gray-500 text-sm">Select the medical specialties available at your hospital</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div className="space-y-3">
                  {["Cardiology", "Orthopedics", "Emergency Medicine", "Radiology", "Dermatology"].map((spec) => (
                    <label key={spec} className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={hospitalData.medicalSpecialties.includes(spec)}
                        onChange={() => handleCheckboxChange("medicalSpecialties", spec)}
                        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
                
                {/* Column 2 */}
                <div className="space-y-3">
                  {["Neurology", "Internal Medicine", "Anesthesiology", "Oncology"].map((spec) => (
                    <label key={spec} className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={hospitalData.medicalSpecialties.includes(spec)}
                        onChange={() => handleCheckboxChange("medicalSpecialties", spec)}
                        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
                
                {/* Column 3 */}
                <div className="space-y-3">
                  {["Pediatrics", "Obstetrics & Gynecology", "Surgery", "Psychiatry", "Endocrinology"].map((spec) => (
                    <label key={spec} className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={hospitalData.medicalSpecialties.includes(spec)}
                        onChange={() => handleCheckboxChange("medicalSpecialties", spec)}
                        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hospital Services & Facilities Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Hospital Services & Facilities <span className="text-red-500">*</span></h2>
              <p className="text-gray-500 text-sm">Select the services provided by your hospital</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div className="space-y-3">
                  {["Emergency Care", "Laboratory Services", "Rehabilitation Services", "Pediatric Care", "24/7 Emergency Services", "Emergency Department", "Laboratory"].map((service) => (
                    <label key={service} className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={hospitalData.hospitalServices.includes(service)}
                        onChange={() => handleCheckboxChange("hospitalServices", service)}
                        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
                
                {/* Column 2 */}
                <div className="space-y-3">
                  {["Surgery", "Outpatient Care", "Mental Health Services", "Pharmacy", "Ambulance Services", "Blood Bank", "Radiology"].map((service) => (
                    <label key={service} className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={hospitalData.hospitalServices.includes(service)}
                        onChange={() => handleCheckboxChange("hospitalServices", service)}
                        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
                
                {/* Column 3 */}
                <div className="space-y-3">
                  {["Diagnostics Imaging", "Inpatient Care", "Maternity Care", "Blood Bank", "ICU", "Pharmacy", "Patient Rooms"].map((service) => (
                    <label key={service} className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={hospitalData.hospitalServices.includes(service)}
                        onChange={() => handleCheckboxChange("hospitalServices", service)}
                        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Accreditations Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Accreditations</h2>
              <p className="text-gray-500 text-sm">Select accreditations held by your hospital</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                {[
                  "NABH - National Accreditation Board for Hospitals & Healthcare Providers",
                  "ISO Certifications", 
                  "JCI - Joint Commission International",
                  "NABL - National Accreditation Board for Testing and Calibration Laboratories"
                ].map((acc) => (
                  <label key={acc} className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={hospitalData.accreditations.includes(acc)}
                      onChange={() => handleCheckboxChange("accreditations", acc)}
                      className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{acc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

                    {/* Operating Hours Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Operating Hours</h2>
              <p className="text-gray-500 text-sm">Select the days and times your hospital is open</p>
            </div>
            
            <div className="space-y-3">
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                <DayCard
                  key={day}
                  day={day}
                  isAvailable={hospitalData.operatingHours.includes(day)}
                  onToggleChange={() => {
                    const updated = hospitalData.operatingHours.includes(day)
                      ? hospitalData.operatingHours.filter(d => d !== day)
                      : [...hospitalData.operatingHours, day];
                    setHospitalData(prev => ({ ...prev, operatingHours: updated }));
                  }}
                  startTime={hospitalData[`${day.toLowerCase()}StartTime`] || "09:00"}
                  endTime={hospitalData[`${day.toLowerCase()}EndTime`] || "18:00"}
                  onStartTimeChange={(e) => {
                    setHospitalData(prev => ({
                      ...prev,
                      [`${day.toLowerCase()}StartTime`]: e.target.value
                    }));
                  }}
                  onEndTimeChange={(e) => {
                    setHospitalData(prev => ({
                      ...prev,
                      [`${day.toLowerCase()}EndTime`]: e.target.value
                    }));
                  }}
                  is24Hours={hospitalData[`${day.toLowerCase()}24Hours`] || false}
                  on24HoursChange={(e) => {
                    setHospitalData(prev => ({
                      ...prev,
                      [`${day.toLowerCase()}24Hours`]: e.target.checked
                    }));
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {currentSubStep === 1 ? <Page1 /> : <Page2 />}
>>>>>>> dev
    </div>
  );
};

export default Hos_3;
