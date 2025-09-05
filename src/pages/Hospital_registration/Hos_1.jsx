<<<<<<< HEAD
import React, { useState } from 'react'
import { ChevronDown, Upload, ArrowRight } from 'lucide-react';

const Hos_1 = () => {
    const [formData, setFormData] = useState({
    firstName: 'Milind',
    lastName: 'Chauhan',
    workEmail: 'milind.chauhan@gmail.com',
    contactNumber: '91753 67487',
    gender: 'Male',
    city: 'Akola, Maharashtra',
    emailVerification: true,
    smsVerification: true
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
    alert('Account creation form submitted!');
  };

  return (
    <div className="rounded-md bg-white p-8 min-h-full">
      <div className="rounded-xl items-center mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Owner Account Creation</h1>
          <p className="text-gray-600 text-sm">Set up the primary administrator account for your hospital</p>
        </div>

        <div className="space-y-6 px-40">
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full h-[32px] py-2 px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Email and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleInputChange}
                required
                className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                className="w-full h-[32px] px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Gender and City Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full h-[32px] px-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white pr-10"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
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
                  className="w-full px-2 h-[32px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white pr-10"
                >
                  <option value="Akola, Maharashtra">Akola, Maharashtra</option>
                  <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                  <option value="Delhi, Delhi">Delhi, Delhi</option>
                  <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
                  <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Upload Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Profile Picture <span className="text-gray-400">0</span> <span className="text-red-500">*</span>
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

          {/* Add some bottom padding to ensure content doesn't get cut off by footer */}
          <div className="pb-8"></div>
        </div>
      </div>
    </div>
  );
}

export default Hos_1
=======
import React from 'react'
import { useRegistration } from '../../context/RegistrationContext';
import { 
  Input, 
  Upload, 
  MFA, 
  Dropdown, 
  FormContainer, 
  FormSection, 
  FormFieldRow, 
  Radio
} from '../../components/FormItems';

const Hos_1 = () => {
  const { formData, updateFormData } = useRegistration();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormData({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Account creation form submitted!');
  };

  // Common form field props
  const commonFieldProps = {
    compulsory: true,
    required: true
  };

  // Gender options
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'Prefer not to say', label: 'Prefer not to say' }
  ];

  // City options
  const cityOptions = [
    { value: 'Akola, Maharashtra', label: 'Akola, Maharashtra' },
    { value: 'Mumbai, Maharashtra', label: 'Mumbai, Maharashtra' },
    { value: 'Delhi, Delhi', label: 'Delhi, Delhi' },
    { value: 'Bangalore, Karnataka', label: 'Bangalore, Karnataka' },
    { value: 'Chennai, Tamil Nadu', label: 'Chennai, Tamil Nadu' }
  ];

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormSection
        title="Owner Account Creation"
        subtitle="Set up the primary administrator account for your hospital"
      >
        <div className="space-y-6">
          {/* Name Row */}
          <FormFieldRow>
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
          </FormFieldRow>

          {/* Email and Phone Row */}
          <FormFieldRow>
            <Input
              label="Work Email"
              name="workEmail"
              type="email"
              value={formData.workEmail || ''}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
            <Input
              label="Contact Number"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber || ''}
              onChange={handleInputChange}
              {...commonFieldProps}
            />
          </FormFieldRow>

          {/* Gender and City Row */}
          <FormFieldRow>
            <Dropdown
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={genderOptions}
              {...commonFieldProps}
            />
            <Dropdown
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              options={cityOptions}
              {...commonFieldProps}
            />
          </FormFieldRow>

          {/* Upload Profile Picture */}
          <div>
            <Upload label="Upload Profile Picture" compulsory={true} />
          </div>

          <Radio label="Are you a doctor?" name="isDoctor" compulsory={true} value={formData.isDoctor} onChange={handleInputChange} options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ]} />

          <MFA formData={formData} handleInputChange={handleInputChange} />

          {/* Add some bottom padding to ensure content doesn't get cut off by footer */}
          <div className="pb-8"></div>
        </div>
      </FormSection>
    </FormContainer>
  );
}

export default Hos_1
>>>>>>> dev
