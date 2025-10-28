import React from "react";
import useHospitalRegistrationStore from '../../../../store/useHospitalRegistrationStore';
import { useRegistration } from '../../../context/RegistrationContext';
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
} from "../../../../components/FormItems";


const Hos_3 = () => {
  // Use global registration context for substep navigation
  const { formData, updateFormData } = useRegistration();
  const hosStep3SubStep = formData.hosStep3SubStep || 1;
  const currentSubStep = hosStep3SubStep;

  // Use Zustand store for field values only
  const {
    name,
    type,
    emailId,
    phone,
    address,
    city,
    state,
    pincode,
    url,
    logo,
    image,
    latitude,
    longitude,
    medicalSpecialties,
    hospitalServices,
    establishmentYear,
    noOfBeds,
    accreditation,
    adminId,
    documents,
    operatingHours,
    setField,
    setAddressField,
    setDocument,
    setDocuments,
    setOperatingHours
  } = useHospitalRegistrationStore();

  const storeAll = useHospitalRegistrationStore();
  // Update global context whenever local state changes


  // Handle inputs

  const [formErrors, setFormErrors] = React.useState({});

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) return 'Required';
        return '';
      case 'type':
        if (!value) return 'Required';
        return '';
      case 'emailId':
        if (!value) return 'Required';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email format';
        return '';
      case 'phone':
        if (!value) return 'Required';
        if (!/^\d{10}$/.test(value)) return 'Phone must be 10 digits';
        return '';
      case 'blockNo':
      case 'street':
      case 'landmark':
      case 'city':
      case 'state':
        if (!value) return 'Required';
        return '';
      case 'pincode':
        if (!value) return 'Required';
        if (!/^\d{6}$/.test(value)) return 'Pincode must be 6 digits';
        return '';
      default:
        return '';
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

  // Single handler for address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  // Validate all fields before next/submit
  const validateAll = () => {
    const fieldsToValidate = {
      name,
      type,
      emailId,
      phone,
      blockNo: address?.blockNo,
      street: address?.street,
      landmark: address?.landmark,
      city,
      state,
      pincode
    };
    const newErrors = {};
    Object.entries(fieldsToValidate).forEach(([key, val]) => {
      const err = validateField(key, val);
      if (err) newErrors[key] = err;
    });
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleCheckboxChange = (section, value) => {
    const currentArr = section === "medicalSpecialties"
      ? medicalSpecialties
      : section === "hospitalServices"
      ? hospitalServices
      : section === "accreditation"
      ? accreditation
      : [];

    const updated = Array.isArray(currentArr) && currentArr.includes(value)
      ? currentArr.filter((item) => item !== value)
      : [...(currentArr || []), value];

    setField(section, updated);
  };

  // Substep Navigation
  const nextSubStep = () => {
    // Validate all fields before moving to next substep
    const isValid = validateAll();
    if (!isValid) return;
    updateFormData({ hosStep3SubStep: currentSubStep + 1 });
  };
  const prevSubStep = () => updateFormData({ hosStep3SubStep: currentSubStep - 1 });


  // Page 1 → Hospital Details (Redesigned to match the image)
  const renderPage1 = () => (
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
                  name="name"
                  placeholder="Hospital Name"
                  value={name}
                  onChange={handleInputChange}
                  compulsory={true}
                  required={true}
                />
                {formErrors.name && <span className="text-red-500 text-xs">{formErrors.name}</span>}
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>

              {/* Hospital Type */}
              <div>
                <Dropdown
                  label="Hospital Type"
                  name="type"
                  value={type}
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
                {formErrors.type && <span className="text-red-500 text-xs">{formErrors.type}</span>}
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>

              {/* Hospital Contact Email */}
              <div>
                <label className="flex text-sm font-medium text-gray-700 mb-2 items-center gap-1">
                  Hospital Contact Email <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    name="emailId"
                    placeholder="Enter Work Email"
                    value={emailId || ""}
                    onChange={handleInputChange}
                    className="flex-1 h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      (emailId || "").trim()
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!((emailId || "").trim())}
                  >
                    Send OTP
                  </button>
                </div>
                {formErrors.emailId && <span className="text-red-500 text-xs">{formErrors.emailId}</span>}
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>

              {/* Hospital Contact Number */}
              <div>
                <label className="flex text-sm font-medium text-gray-700 mb-2 items-center gap-1">
                  Hospital Contact Number <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Contact Number"
                    value={phone || ""}
                    onChange={handleInputChange}
                    className="flex-1 h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      (phone || "").trim()
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!((phone || "").trim())}
                  >
                    Send OTP
                  </button>
                </div>
                {formErrors.phone && <span className="text-red-500 text-xs">{formErrors.phone}</span>}
                <p className="text-xs text-gray-400 mt-1">Visible to Patient</p>
              </div>
            </div>

            {/* Last 3 fields in 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Established Year */}
              <div>
                <Dropdown
                  label="Established Year"
                  name="establishmentYear"
                  value={establishmentYear}
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
                  name="noOfBeds"
                  type="number"
                  placeholder="Enter Beds Count"
                  value={noOfBeds}
                  onChange={handleInputChange}
                />
              </div>

              {/* Website */}
              <div>
                <Input
                  label="Website"
                  name="url"
                  type="url"
                  placeholder="Paste Website Link"
                  value={url || ""}
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
              <MapLocation 
                captionText="Siddaiah Rd"
                onChange={(pos) => {
                  setField('latitude', pos.lat);
                  setField('longitude', pos.lng);
                }}
              />
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Block no./Shop no./House no. */}
              <div>
                <Input
                  label="Block no./Shop no./House no."
                  name="blockNo"
                  placeholder="Enter Block Number/ Shop Number/ House Nu..."
                  value={address?.blockNo || ""}
                  onChange={handleAddressChange}
                  compulsory={true}
                  required={true}
                />
                {formErrors.blockNo && <span className="text-red-500 text-xs">{formErrors.blockNo}</span>}
              </div>

              {/* Road/Area/Street */}
              <div>
                <Input
                  label="Road/Area/Street"
                  name="street"
                  placeholder="Enter Road/Area/Street"
                  value={address?.street || ""}
                  onChange={handleAddressChange}
                  compulsory={true}
                  required={true}
                />
                {formErrors.street && <span className="text-red-500 text-xs">{formErrors.street}</span>}
              </div>

              {/* Landmark */}
              <div>
                <Input
                  label="Landmark"
                  name="landmark"
                  placeholder="Enter landmark"
                  value={address?.landmark || ""}
                  onChange={handleAddressChange}
                  compulsory={true}
                  required={true}
                />
                {formErrors.landmark && <span className="text-red-500 text-xs">{formErrors.landmark}</span>}
              </div>

              {/* Pincode */}
              <div>
                <Input
                  label="Pincode"
                  name="pincode"
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={handleInputChange}
                  compulsory={true}
                  required={true}
                />
                {formErrors.pincode && <span className="text-red-500 text-xs">{formErrors.pincode}</span>}
              </div>

              {/* City */}
              <div>
                <Input
                  label="City"
                  name="city"
                  placeholder="Enter City"
                  value={city}
                  onChange={handleInputChange}
                  compulsory={true}
                  required={true}
                />
                {formErrors.city && <span className="text-red-500 text-xs">{formErrors.city}</span>}
              </div>

              {/* State */}
              <div>
                <Dropdown
                  label="State"
                  name="state"
                  value={state}
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
                {formErrors.state && <span className="text-red-500 text-xs">{formErrors.state}</span>}
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
                <label className="flex text-sm font-medium text-gray-700 mb-2 items-center gap-1">
                  Hospital URL <img src="/i-icon.png" alt="" className='w-3 h-3' />
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="url"
                    placeholder="Enter Hospital User Name"
                    value={url || ""}
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
                  onUpload={(key) => setField('logo', key)}
                />
              </div>
            </div>

            {/* Second row: Upload Hospital Image */}
            <div className="">
              <Upload 
                label="Upload Hospital Image" 
                compulsory={true}
                onUpload={(key) => setField('image', key)}
              />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );

  // Page 2 → Services & Facilities
  const renderPage2 = () => (
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
                        checked={Array.isArray(medicalSpecialties) && medicalSpecialties.includes(spec)}
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
                        checked={Array.isArray(medicalSpecialties) && medicalSpecialties.includes(spec)}
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
                        checked={Array.isArray(medicalSpecialties) && medicalSpecialties.includes(spec)}
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
                        checked={Array.isArray(hospitalServices) && hospitalServices.includes(service)}
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
                        checked={Array.isArray(hospitalServices) && hospitalServices.includes(service)}
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
                        checked={Array.isArray(hospitalServices) && hospitalServices.includes(service)}
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
                      checked={Array.isArray(accreditation) && accreditation.includes(acc)}
                      onChange={() => handleCheckboxChange("accreditation", acc)}
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
                  isAvailable={Array.isArray(operatingHours) && operatingHours.includes(day)}
                  onToggleChange={() => {
                    const updated = Array.isArray(operatingHours) && operatingHours.includes(day)
                      ? operatingHours.filter(d => d !== day)
                      : [...(operatingHours || []), day];
                    setOperatingHours(updated);
                  }}
                  startTime={storeAll[`${day.toLowerCase()}StartTime`] || "09:00"}
                  endTime={storeAll[`${day.toLowerCase()}EndTime`] || "18:00"}
                  onStartTimeChange={(e) => setField(`${day.toLowerCase()}StartTime`, e.target.value)}
                  onEndTimeChange={(e) => setField(`${day.toLowerCase()}EndTime`, e.target.value)}
                  is24Hours={!!storeAll[`${day.toLowerCase()}24Hours`]}
                  on24HoursChange={(e) => setField(`${day.toLowerCase()}24Hours`, e.target.checked)}
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
      {currentSubStep === 1 ? renderPage1() : renderPage2()}
    </div>
  );
};

export default Hos_3;
