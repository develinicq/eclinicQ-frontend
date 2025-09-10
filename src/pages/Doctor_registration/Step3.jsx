import React, { useState } from 'react'
import { 
  Input, 
  Dropdown, 
  Upload, 
  FormContainer, 
  FormSection, 
  FormFieldRow,
  MapLocation
} from '../../components/FormItems';


const Step3 = ({ onSubmit, initialData, onBack }) => {
  const [formData, setFormData] = useState(initialData || {
    clinicName: '',
    clinicContactEmail: '',
    clinicContactNumber: '',
    uploadEstablishmentProof: '',
    uploadFile: '',
    clinicAddress: '',
    mapLocation: '',
    latitude: '',
    longitude: '',
    blockNo: '',
    roadAreaStreet: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    uploadHospitalImage: '',
    emailVerification: false,
    smsVerification: false
  });


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  // No submit handler, parent handles navigation and submission

  // Common form field props
  const commonFieldProps = {
    compulsory: true,
    required: true
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
    <FormContainer>
      <FormSection
        title="Clinical Details & Document Upload"
        subtitle="Enter your clinic information & document"
      >
        <div className="space-y-6">
          {/* Clinic Info Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Clinic Info</h2>
            {/* Clinic Name and Contact Email Row */}
            <FormFieldRow>
              <Input
                label="Clinic Name"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleInputChange}
                placeholder="Enter Clinic Name"
                {...commonFieldProps}
              />
              <Input
                label="Clinic Contact Email"
                name="clinicContactEmail"
                type="email"
                value={formData.clinicContactEmail}
                onChange={handleInputChange}
                placeholder="Enter Clinic Email"
                {...commonFieldProps}
              />
            </FormFieldRow>

            {/* Contact Number and Upload Establishment Proof Row */}
            <FormFieldRow>
              <Input
                label="Clinic Contact Number"
                name="clinicContactNumber"
                type="tel"
                value={formData.clinicContactNumber}
                onChange={handleInputChange}
                placeholder="Enter Contact Number"
                {...commonFieldProps}
              />
              <Upload
                label="Upload Establishment Proof"
                compulsory={true}
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
                  setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
                }}
              />
            </div>

            {/* Block No and Road/Area/Street Row */}
            <FormFieldRow>
              <Input
                label="Block No./Shop no./House no."
                name="blockNo"
                value={formData.blockNo}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Input
                label="Road/Area/Street"
                name="roadAreaStreet"
                value={formData.roadAreaStreet}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
            </FormFieldRow>

            {/* Landmark and Pincode Row */}
            <FormFieldRow>
              <Input
                label="Landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
              <Input
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                {...commonFieldProps}
              />
            </FormFieldRow>

            {/* City and State Row */}
            <FormFieldRow>
              <Dropdown
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                options={cityOptions}
                placeholder="Select City"
                {...commonFieldProps}
              />
              <Dropdown
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                options={stateOptions}
                placeholder="Select State"
                {...commonFieldProps}
              />
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
              />
            </div>
          </div>

          {/* Multi-Factor Authentication */}
          <div className="border border-blue-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Multi-Factor Authentication (MFA) <span className="text-red-500">*</span>
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              For enhanced security, we require setting up MFA for all admin accounts
            </p>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="emailVerification"
                  checked={formData.emailVerification}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Email Verification</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="smsVerification"
                  checked={formData.smsVerification}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">SMS Verification</span>
              </label>
            </div>
          </div>
        </div>
  {/* Navigation handled by parent, no submit button here */}
      </FormSection>
    </FormContainer>
  );
}


export default Step3