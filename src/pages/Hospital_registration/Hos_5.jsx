import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useRegistration } from '../../context/RegistrationContext';
import { ProgressBar, AgreementBox, ActionButton } from '../../components/FormItems';

const Hos_5 = () => {
  const { currentStep, nextStep, prevStep, updateFormData, formData } = useRegistration();
  
  // Get current sub-step from context, default to 1
  const currentSubStep = formData.hosStep5SubStep || 1;
  
  // Initialize local state from context or default to false
  const [termsAccepted, setTermsAccepted] = useState(formData.hosTermsAccepted || false);
  const [privacyAccepted, setPrivacyAccepted] = useState(formData.hosPrivacyAccepted || false);
  
  // Mock data - would come from backend
  const hospitalData = {
    hospitalName: "Manipal Hospitals Life's On",
    hospitalType: "Private Hospital",
    speciality: "Multi Speciality",
    profileUrl: "manipalhospital@eclinicq.com",
    address: "Manipal Health Enterprise Pvt Ltd. The Annexe, #98/2, Rustom Bagh, Off HAL Airport Road, Bengaluru - 560017",
    hospitalEmail: "support@Manipal.com",
    hospitalContact: "+91 92826 39045",
    rohiniId: "8900080336704",
    website: "manipalhospital.com/bengaluru",
    eClinicId: "HLN-001",
    medicalSpecialties: ["Cardiology", "Orthopedics", "Pediatrics", "Internal Medicine", "Radiology"],
    hospitalServices: ["Emergency Care", "Diagnostics Imaging", "Laboratory Services", "Outpatient Care", "Inpatient Care"],
    hospitalFacilities: ["ICU", "Blood Bank", "24/7 Emergency care"],
    accreditations: ["NABH - National Accreditation Board for Hospitals & Healthcare Providers"],
    operatingHours: {
      "Sunday": "09:00am-06:00pm",
      "Monday": "09:00am-06:00pm", 
      "Tuesday": "09:00am-06:00pm",
      "Wednesday": "09:00am-06:00pm",
      "Thursday": "09:00am-06:00pm",
      "Friday": "09:00am-06:00pm"
    },
    adminDetails: {
      userName: "Ketan Patni",
      userDesignation: "Business Owner",
      userRole: "Super Admin",
      userEmail: "Ketanp@Manipal.com",
      userContact: "+91 91753 67487",
      mfaStatus: "Done"
    },
    documents: {
      gstn: { id: "29AACCC2943F1ZS", file: "GSTIN.pdf", status: "Verified" },
      abha: { id: "29AACCC2943F1ZS", file: "ABHA.pdf", status: "Verified" },
      cin: { id: null, file: null, status: "Not Attached" },
      rohini: { id: "8900080336704", file: "Rohini.pdf", status: "Under Review (24-48hrs)" }
    }
  };

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

  

  const StatusBadge = ({ status, type }) => {
    if (type === 'verified') {
      return <span className="text-green-600 text-sm font-medium">Verified</span>;
    }
    if (type === 'done') {
      return <span className="text-green-600 text-sm font-medium">Done</span>;
    }
    if (type === 'review') {
      return <span className="text-orange-500 text-sm font-medium">Under Review (24-48hrs)</span>;
    }
    if (type === 'not-attached') {
      return <span className="text-gray-500 text-sm font-medium">Not Attached</span>;
    }
    return null;
  };

  const Page1 = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Review Hospital Details</h1>
        <p className="text-gray-600 text-sm">Review your hospital & verification details and submit for Account Activation</p>
      </div>

      <ProgressBar step={1} total={2} />

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-green-800 font-medium text-sm">Ready to Activate</p>
          <p className="text-green-700 text-sm mt-1">Your hospital account is ready to be activated. Some verifications are still in progress but won't delay your access.</p>
        </div>
      </div>

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
                <span className="text-gray-600 text-sm w-24">Hospital Name</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.hospitalName}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">Hospital Type</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.hospitalType}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">Speciality</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.speciality}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">Profile URL</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.profileUrl}</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-600 text-sm w-24 flex-shrink-0">Address</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2 leading-relaxed">{hospitalData.address}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm w-28">Hospital Email</span>
                  <span className="text-gray-600 text-sm">:</span>
                  <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.hospitalEmail}</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm w-28">Hospital Contact</span>
                  <span className="text-gray-600 text-sm">:</span>
                  <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.hospitalContact}</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-28">Rohini ID</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.rohiniId}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-28">Website</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.website}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-28">e-clinic ID</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.eClinicId}</span>
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
              <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.medicalSpecialties.join(', ')}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-600 text-sm w-32 flex-shrink-0">Hospital Services</span>
              <span className="text-gray-600 text-sm">:</span>
              <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.hospitalServices.join(', ')}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-600 text-sm w-32 flex-shrink-0">Hospital Facilities</span>
              <span className="text-gray-600 text-sm">:</span>
              <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.hospitalFacilities.join(', ')}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-600 text-sm w-32 flex-shrink-0">Accreditations</span>
              <span className="text-gray-600 text-sm">:</span>
              <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.accreditations.join(', ')}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-600 text-sm w-32 flex-shrink-0">Operating Hours</span>
              <span className="text-gray-600 text-sm">:</span>
              <div className="text-gray-900 text-sm font-medium ml-2">
                {Object.entries(hospitalData.operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex">
                    <span className="w-20">{day}:</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Admin Account Details */}
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">Primary Admin Account Details</h3>
          <div className="grid grid-cols-2 gap-x-12">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">User Name</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.adminDetails.userName}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">User Designation</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.adminDetails.userDesignation}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">User Role</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.adminDetails.userRole}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm w-28">User Email</span>
                  <span className="text-gray-600 text-sm">:</span>
                  <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.adminDetails.userEmail}</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm w-28">User Contact</span>
                  <span className="text-gray-600 text-sm">:</span>
                  <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.adminDetails.userContact}</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm w-28">MFA Status</span>
                  <span className="text-gray-600 text-sm">:</span>
                  <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.adminDetails.mfaStatus}</span>
                </div>
                <StatusBadge status={hospitalData.adminDetails.mfaStatus} type="done" />
              </div>
            </div>
          </div>
        </div>

        {/* Verified Documents & Status */}
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">Verified Documents & Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">GSTN</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.documents.gstn.id}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-blue-600 text-sm hover:underline">{hospitalData.documents.gstn.file}</button>
                <StatusBadge status={hospitalData.documents.gstn.status} type="verified" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">ABHA Facility ID</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.documents.abha.id}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-blue-600 text-sm hover:underline">{hospitalData.documents.abha.file}</button>
                <StatusBadge status={hospitalData.documents.abha.status} type="verified" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">CIN</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">-</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm">-</span>
                <StatusBadge status={hospitalData.documents.cin.status} type="not-attached" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">Rohini ID</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{hospitalData.documents.rohini.id}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-blue-600 text-sm hover:underline">{hospitalData.documents.rohini.file}</button>
                <StatusBadge status={hospitalData.documents.rohini.status} type="review" />
              </div>
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