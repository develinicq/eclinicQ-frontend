import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useRegistration } from '../../../context/RegistrationContext';
import { ProgressBar, AgreementBox, ActionButton } from '../../../../components/FormItems';
import useHospitalRegistrationStore from '../../../../store/useHospitalRegistrationStore';

const Hos_5 = () => {
  const { currentStep, nextStep, prevStep, updateFormData, formData } = useRegistration();
  // Pull review data from the hospital store
  const name = useHospitalRegistrationStore((s) => s.name);
  const type = useHospitalRegistrationStore((s) => s.type);
  const emailId = useHospitalRegistrationStore((s) => s.emailId);
  const phone = useHospitalRegistrationStore((s) => s.phone);
  const address = useHospitalRegistrationStore((s) => s.address);
  const city = useHospitalRegistrationStore((s) => s.city);
  const state = useHospitalRegistrationStore((s) => s.state);
  const pincode = useHospitalRegistrationStore((s) => s.pincode);
  const url = useHospitalRegistrationStore((s) => s.url);
  const establishmentYear = useHospitalRegistrationStore((s) => s.establishmentYear);
  const noOfBeds = useHospitalRegistrationStore((s) => s.noOfBeds);
  const medicalSpecialties = useHospitalRegistrationStore((s) => s.medicalSpecialties);
  const hospitalServices = useHospitalRegistrationStore((s) => s.hospitalServices);
  const accreditation = useHospitalRegistrationStore((s) => s.accreditation);
  const operatingHours = useHospitalRegistrationStore((s) => s.operatingHours);
  const documents = useHospitalRegistrationStore((s) => s.documents);
  const currentSubStep = formData.hosStep5SubStep || 1;
  const [termsAccepted, setTermsAccepted] = useState(formData.hosTermsAccepted || false);
  const [privacyAccepted, setPrivacyAccepted] = useState(formData.hosPrivacyAccepted || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Helper to get document number by type from store
  const getDocNo = (typeLabel) => {
    const t = String(typeLabel || '').toLowerCase();
    const match = (documents || []).find(
      (d) => String(d?.type || '').toLowerCase() === t
    );
    return match?.no || '';
  };

  // No submit logic here; submission is handled in Hos_6

  // Update form data when terms change - only when they actually change
  useEffect(() => {
    if (formData.hosTermsAccepted !== termsAccepted || formData.hosPrivacyAccepted !== privacyAccepted) {
      updateFormData({
        hosTermsAccepted: termsAccepted,
        hosPrivacyAccepted: privacyAccepted
      });
    }
  }, [termsAccepted, privacyAccepted, formData.hosTermsAccepted, formData.hosPrivacyAccepted, updateFormData]);

  // Handle checkbox changes with immediate state update
  const handleTermsChange = () => {
    const newValue = !termsAccepted;
    setTermsAccepted(newValue);
    // Also update context immediately
    updateFormData({ hosTermsAccepted: newValue });
  };

  const handlePrivacyChange = () => {
    const newValue = !privacyAccepted;
    setPrivacyAccepted(newValue);
    // Also update context immediately
    updateFormData({ hosPrivacyAccepted: newValue });
  };

  

  // Simple badge for document status
  const StatusBadge = ({ status }) => {
    if (!status) return null;
    if (status === 'Verified') return <span className="text-green-600 text-sm font-medium">Verified</span>;
    if (status === 'Done') return <span className="text-green-600 text-sm font-medium">Done</span>;
    if (status === 'Under Review (24-48hrs)') return <span className="text-orange-500 text-sm font-medium">Under Review (24-48hrs)</span>;
    if (status === 'Not Attached') return <span className="text-gray-500 text-sm font-medium">Not Attached</span>;
    return <span className="text-gray-500 text-sm font-medium">{status}</span>;
  };

  const Page1 = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Review Hospital Details</h1>
        <p className="text-gray-600 text-sm">Review your hospital & verification details and submit for Account Activation</p>
      </div>

      <ProgressBar step={1} total={2} />

      {/* Image Banner */}
      <div className='relative' >
          <img className='h-[140px] w-full object-cover rounded-xl ' src="/images/hospital.png" alt="" />
          <div className='absolute  w-12 h-12 right-1/2 bottom-5 border-[2px] border-[#2372EC] rounded-md'>
            <img src="/images/hospital_logo.png" className='w-full rounded-md h-full object-cover' alt="" />
          </div>
          <div className='bg-white h-10'></div>
      </div>

      <div className="space-y-6">
        {/* Hospital Information */}
  <div className="bg-white border border-gray-300 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">Hospital Information</h3>
          <div className="grid grid-cols-2 gap-x-12">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Hospital Name</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Hospital Type</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{type}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Contact Email</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{emailId}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Contact Number</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{phone}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Established Year</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{establishmentYear}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Number of Beds</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{noOfBeds}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Website</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{url}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Block/Shop/House No.</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{address?.blockNo}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Road/Area/Street</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{address?.street}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Landmark</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{address?.landmark}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Pincode</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{pincode}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">City</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{city}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">State</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{state}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-32">Hospital URL</span>
                <span className="text-gray-600 text-sm">:</span>
    <span className="text-gray-900 text-sm font-medium ml-2">{url}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services & Facilities */}
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">Services & Facilities</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-gray-600 text-sm w-32 flex-shrink-0">Medical Specialties</span>
              <span className="text-gray-600 text-sm">:</span>
              <span className="text-gray-900 text-sm font-medium ml-2">{(medicalSpecialties || []).join(', ')}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-600 text-sm w-32 flex-shrink-0">Hospital Services</span>
              <span className="text-gray-600 text-sm">:</span>
              <span className="text-gray-900 text-sm font-medium ml-2">{(hospitalServices || []).join(', ')}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-600 text-sm w-32 flex-shrink-0">Accreditations</span>
              <span className="text-gray-600 text-sm">:</span>
              <span className="text-gray-900 text-sm font-medium ml-2">{(accreditation || []).join(', ')}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-600 text-sm w-32 flex-shrink-0">Operating Hours</span>
              <span className="text-gray-600 text-sm">:</span>
              <div className="text-gray-900 text-sm font-medium ml-2">
                {(operatingHours || []).map(day => (
                  <div key={day}>{day}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Document Verification (from Hos_4) */}
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">Document Verification</h3>
      <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">GSTIN</span>
              <span className="text-gray-600 text-sm">:</span>
        <span className="text-gray-900 text-sm font-medium ml-2">{getDocNo('GST')}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">ABHA Facility ID</span>
              <span className="text-gray-600 text-sm">:</span>
        <span className="text-gray-900 text-sm font-medium ml-2">{getDocNo('ABHA')}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">CIN Number</span>
              <span className="text-gray-600 text-sm">:</span>
        <span className="text-gray-900 text-sm font-medium ml-2">{getDocNo('CIN')}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">State Health Reg. No</span>
              <span className="text-gray-600 text-sm">:</span>
        <span className="text-gray-900 text-sm font-medium ml-2">{getDocNo('State Health Reg No')}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">PAN Card</span>
              <span className="text-gray-600 text-sm">:</span>
        <span className="text-gray-900 text-sm font-medium ml-2">{getDocNo('Pan Card')}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">Rohini ID</span>
              <span className="text-gray-600 text-sm">:</span>
        <span className="text-gray-900 text-sm font-medium ml-2">{getDocNo('Rohini ID')}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">NABH Accreditation</span>
              <span className="text-gray-600 text-sm">:</span>
        <span className="text-gray-900 text-sm font-medium ml-2">{getDocNo('NABH')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Page2 = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Terms & Agreement</h1>
        <p className="text-gray-600 text-sm">Review and accept the terms and conditions to continue</p>
      </div>

      <ProgressBar step={2} total={2} />

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-green-800 font-medium text-sm">Ready to Activate</p>
          <p className="text-green-700 text-sm mt-1">Your hospital account is ready to be activated. Some verifications are still in progress but won't delay your access.</p>
        </div>
      </div>

      <div className="space-y-6">
        <AgreementBox
          title="Terms & Conditions"
          description="By using this Healthcare Management System, you agree to comply with and be bound by the following terms and conditions:"
          bullets={[
            { title: 'Data Privacy', text: 'You agree to handle all patient data in accordance with HIPAA, NDHM, and other applicable regulations.' },
            { title: 'Security Measures', text: 'You will implement appropriate security measures to protect patient data.' },
            { title: 'Accuracy of Information', text: 'You confirm that all information provided during registration is accurate and complete.' },
            { title: 'User Access', text: 'You will manage user access appropriately and ensure that only authorized personnel have access to sensitive information.' },
            { title: 'Compliance', text: 'You will comply with all applicable laws and regulations related to healthcare data management.' }
          ]}
          accepted={termsAccepted}
          onToggle={handleTermsChange}
          confirmText="I accept the Terms & Conditions and Data Privacy Agreement"
        />

        <AgreementBox
          title="Data Privacy Agreement"
          description="This Data Privacy Agreement outlines how patient data should be handled in compliance with HIPAA, NDHM, and other applicable regulations:"
          bullets={[
            { title: 'Data Collection', text: 'Only collect patient data that is necessary for providing healthcare services.' },
            { title: 'Data Storage', text: 'Store patient data securely with appropriate encryption and access controls.' },
            { title: 'Data Sharing', text: 'Only share patient data with authorized personnel and third parties as required for healthcare services.' },
            { title: 'Patient Rights', text: 'Respect patient rights regarding their data, including the right to access, correct, and delete their information.' },
            { title: 'Breach Notification', text: 'Promptly notify affected patients and authorities in case of a data breach.' }
          ]}
          accepted={privacyAccepted}
          onToggle={handlePrivacyChange}
          confirmText="I understand and will comply with the Data Privacy Agreement"
        />

        <div className="flex justify-between items-center">
          <div className="flex  flex-col">
            <div className='flex gap-1 items-center'>
              <h3 className="text-sm font-semibold text-gray-900">Digital Signature</h3>
              <div className='w-1 h-1 bg-red-500 rounded-full'></div>
            </div>
            <p className="text-gray-600 text-sm mb-4">Sign digitally using Aadhar eSign and Upload Pan card</p>
          </div>
          <div className="flex gap-4 items-center">
            <ActionButton variant="pancard" className='h-10'>Use Aadhar eSign</ActionButton>
            <ActionButton variant="pancard" className='h-10'>Upload Pancard</ActionButton>
          </div>
        </div>

  {/* Navigation handled by RegistrationFooter */}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {currentSubStep === 1 ? <Page1 /> : <Page2 />}
    </div>
  );
};

export default Hos_5;