<<<<<<< HEAD
import React, { useState } from 'react'
import { ChevronDown, Upload, ArrowRight } from 'lucide-react';

const Step3 = () => {
  const [formData, setFormData] = useState({
    clinicName: '',
    clinicContactEmail: '',
    clinicContactNumber: '',
    uploadEstablishmentProof: '',
    uploadFile: '',
    clinicAddress: '',
    mapLocation: '',
    blockNo: '',
    roadAreaStreet: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    uploadHospitalImage: '',
    emailVerification: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Clinical details form submitted!');
  };

  return (
    <div className="rounded-md bg-white p-8 h-full">
      <div className="rounded-xl items-center mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Clinical Details & Document Upload</h1>
          <p className="text-gray-600 text-sm">Enter your clinic information & document</p>
        </div>

        <div className="space-y-6 px-40">
          {/* Clinic Name and Contact Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleInputChange}
                placeholder="Enter Clinic Name"
                required
                className="w-full h-[32px] py-2 px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="clinicContactEmail"
                value={formData.clinicContactEmail}
                onChange={handleInputChange}
                placeholder="Enter Clinic Email"
                required
                className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Contact Number and Upload Establishment Proof Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="clinicContactNumber"
                value={formData.clinicContactNumber}
                onChange={handleInputChange}
                placeholder="Enter Contact Number"
                required
                className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Establishment Proof <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-lg p-2 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer h-[32px] flex items-center justify-center">
                <button type="button" className="text-blue-500 font-medium text-sm hover:text-blue-600 flex items-center">
                  <Upload className="w-4 h-4 mr-1" />
                  Upload File
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Support Size upto 1MB in png, jpg, svg, webp
              </p>
            </div>
          </div>


          {/* Map Location */}
          <div className='flex flex-col gap-2'>
            <h2 className="text-sm font-semibold text-gray-900">
              Medical Registration
            </h2>
            <label className="block text-sm font-medium text-gray-700">
              Map Location <span className="text-red-500">*</span>
            </label>
            <div className="bg-gray-100 border border-gray-300 rounded-lg h-32 flex items-center justify-center">
              <button 
                type="button" 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                Add Location
              </button>
            </div>
          </div>

          {/* Block No and Road/Area/Street Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Block No./Shop no./House no. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="blockNo"
                value={formData.blockNo}
                onChange={handleInputChange}
                required
                className="w-full h-[32px] py-2 px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Road/Area/Street <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="roadAreaStreet"
                value={formData.roadAreaStreet}
                onChange={handleInputChange}
                required
                className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Landmark and Pincode Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Landmark <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                required
                className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* City and State Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white pr-10"
                >
                  <option value="">Select City</option>
                  <option value="Akola">Akola</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 h-[32px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white pr-10"
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Upload Hospital Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Hospital Image <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <button type="button" className="text-blue-500 font-medium text-sm hover:text-blue-600">
                Upload File
              </button>
              <p className="text-xs text-gray-500 mt-1">
                Support size upto 1MB in png, jpg, svg, webp
              </p>
            </div>
          </div>

          {/* Multi-Factor Authentication */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
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
      </div>
    </div>
  );
}

=======
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

const Step3 = () => {
  const [formData, setFormData] = useState({
    clinicName: '',
    clinicContactEmail: '',
    clinicContactNumber: '',
    uploadEstablishmentProof: '',
    uploadFile: '',
    clinicAddress: '',
    mapLocation: '',
    blockNo: '',
    roadAreaStreet: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    uploadHospitalImage: '',
    emailVerification: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Clinical details form submitted!');
  };

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
    <FormContainer onSubmit={handleSubmit}>
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
              <MapLocation heightClass="h-32" />
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
      </FormSection>
    </FormContainer>
  );
}

>>>>>>> dev
export default Step3