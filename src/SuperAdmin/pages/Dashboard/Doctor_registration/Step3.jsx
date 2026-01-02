import React from 'react'
import {
  Dropdown,
  Upload,
  MFA,
  FormFieldRow,
  MapLocation,
  RegistrationHeader
} from '../../../../components/FormItems';
import InputWithMeta from '../../../../components/GeneralDrawer/InputWithMeta';
import useDoctorRegistrationStore from '../../../../store/useDoctorRegistrationStore';


const Step3 = () => {
  const {
    clinicData,
    setClinicField,
    setField
  } = useDoctorRegistrationStore();

  const [formErrors, setFormErrors] = React.useState({});

  // Common form field props
  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Required";
        return "";
      case "email":
        if (!value) return "Required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format";
        return "";
      case "phone":
        if (!value) return "Required";
        if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
        return "";
      case "blockNo":
      case "areaStreet":
      case "landmark":
      case "city":
      case "state":
        if (!value) return "Required";
        return "";
      case "pincode":
        if (!value) return "Required";
        if (!/^\d{6}$/.test(value)) return "Pincode must be 6 digits";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClinicField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  // City options
  const cityOptions = [
    { value: "Akola", label: "Akola" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Chennai", label: "Chennai" }
  ];

  // State options
  const stateOptions = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Delhi", label: "Delhi" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Gujarat", label: "Gujarat" }
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow-sm overflow-hidden">
      <RegistrationHeader
        title="Clinical Details & Document Upload"
        subtitle="Enter your clinic information & document"
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[700px] mx-auto space-y-6">
          {/* Clinic Info Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Clinic Info</h2>
            {/* Clinic Name and Contact Email Row */}
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="Clinic Name"
                  value={clinicData.name}
                  onChange={(val) => handleInputChange({ target: { name: 'name', value: val } })}
                  placeholder="Enter Clinic Name"
                  {...commonFieldProps}
                  meta="Visible to Patient"
                />
                {formErrors.name && <span className="text-red-500 text-xs">{formErrors.name}</span>}
              </div>
              <div className="w-full">
                <InputWithMeta
                  label="Clinic Contact Email"
                  type="email"
                  value={clinicData.email}
                  onChange={(val) => handleInputChange({ target: { name: 'email', value: val } })}
                  placeholder="Enter Clinic Email"
                  {...commonFieldProps}
                  meta="Visible to Patient"
                />
                {formErrors.email && <span className="text-red-500 text-xs">{formErrors.email}</span>}
              </div>
            </FormFieldRow>

            {/* Contact Number and Upload Establishment Proof Row */}
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="Clinic Contact Number"
                  type="tel"
                  value={clinicData.phone}
                  onChange={(val) => handleInputChange({ target: { name: 'phone', value: val } })}
                  placeholder="Enter Contact Number"
                  {...commonFieldProps}
                  meta="Visible to Patient"
                />
                {formErrors.phone && <span className="text-red-500 text-xs">{formErrors.phone}</span>}
              </div>
              <Upload
                label="Upload Establishment Proof"
                compulsory={true}
                onUpload={key => setClinicField('proof', key)}
                meta="Support Size upto 1MB in .png, .jpg, .svg, .webp"
              />
            </FormFieldRow>
          </div>

          <div className="border border-b mt-1"></div>

          {/* Clinic Address Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Clinic Address</h2>
            {/* Map Location */}
            <div className='flex flex-col gap-2'>
              <label className="block text-sm font-medium text-gray-700">
                Map Location <span className="text-red-500">*</span>
              </label>
              <MapLocation
                heightClass="h-32"
                onChange={({ lat, lng }) => {
                  setClinicField('latitude', lat);
                  setClinicField('longitude', lng);
                }}
              />
            </div>

            {/* Block No and Road/Area/Street Row */}
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="Block No./Shop no./House no."
                  value={clinicData.blockNo}
                  onChange={(val) => handleInputChange({ target: { name: 'blockNo', value: val } })}
                  {...commonFieldProps}
                />
                {formErrors.blockNo && <span className="text-red-500 text-xs">{formErrors.blockNo}</span>}
              </div>
              <div className="w-full">
                <InputWithMeta
                  label="Road/Area/Street"
                  value={clinicData.areaStreet}
                  onChange={(val) => handleInputChange({ target: { name: 'areaStreet', value: val } })}
                  {...commonFieldProps}
                />
                {formErrors.areaStreet && <span className="text-red-500 text-xs">{formErrors.areaStreet}</span>}
              </div>
            </FormFieldRow>

            {/* Landmark and Pincode Row */}
            <FormFieldRow>
              <div className="w-full">
                <InputWithMeta
                  label="Landmark"
                  value={clinicData.landmark}
                  onChange={(val) => handleInputChange({ target: { name: 'landmark', value: val } })}
                  {...commonFieldProps}
                />
                {formErrors.landmark && <span className="text-red-500 text-xs">{formErrors.landmark}</span>}
              </div>
              <div className="w-full">
                <InputWithMeta
                  label="Pincode"
                  value={clinicData.pincode}
                  onChange={(val) => handleInputChange({ target: { name: 'pincode', value: val } })}
                  {...commonFieldProps}
                />
                {formErrors.pincode && <span className="text-red-500 text-xs">{formErrors.pincode}</span>}
              </div>
            </FormFieldRow>

            {/* City and State Row */}
            <FormFieldRow>
              <div className="w-full">
                <Dropdown
                  label="City"
                  name="city"
                  value={clinicData.city}
                  onChange={handleInputChange}
                  options={cityOptions}
                  placeholder="Select City"
                  {...commonFieldProps}
                />
                {formErrors.city && <span className="text-red-500 text-xs">{formErrors.city}</span>}
              </div>
              <div className="w-full">
                <Dropdown
                  label="State"
                  name="state"
                  value={clinicData.state}
                  onChange={handleInputChange}
                  options={stateOptions}
                  placeholder="Select State"
                  {...commonFieldProps}
                />
                {formErrors.state && <span className="text-red-500 text-xs">{formErrors.state}</span>}
              </div>
            </FormFieldRow>
          </div>

          <div className="border border-b mt-1"></div>

          {/* Document Upload Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Document Upload</h2>
            {/* Upload Hospital Image */}
            <div>
              <Upload
                label="Upload Hospital Image"
                compulsory={true}
                onUpload={key => setClinicField('image', key)}
                meta="Support Size upto 2MB in .png, .jpg, .webp"
              />
            </div>
          </div>

          {/* Multi-Factor Authentication (always checked & disabled) */}
          <MFA
            formData={{
              emailVerification: true,
              smsVerification: true
            }}
            disabled={true}
          />
        </div>
      </div>
    </div >
  );
}


export default Step3