<<<<<<< HEAD
import React, { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const Step4 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  
  // Mock data - would come from backend
  const doctorData = {
    doctorName: "Milind Chachun",
    gender: "Male",
    userRole: "Super Admin/Doctor",
    personalEmail: "MilindChachun@gmail.com",
    personalContact: "+91 91753 67487",
    mfaStatus: "Done",
    mrnNumber: "29AACCC2943F1ZS",
    registrationCouncil: "Maharashtra State Council",
    registrationYear: "2008",
    graduationDegree: "MBBS (Completed : 2008)",
    medicalInstitute: "Government Medical College, Nagpur",
    postGraduation: "MD in General Medicine (Completed : 2011)",
    specialization: "General Medicine (Exp : 17 years)",
    clinicName: "Manipal Clinic Life's On",
    hospitalType: "Private Hospital",
    clinicEmail: "support@Manipal.com",
    clinicContact: "+91 99828 39045",
    eClinicId: "HLN-001",
    address: "Manipal Health Enterprise Pvt Ltd. The Annexe, #88/2, Rustom Bagh, Off HAL Airport Road, Bengaluru - 560017"
  };

  const ProgressBar = ({ step, total }) => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center">
        <span className="text-sm text-gray-500 mr-4">{step} of {total}</span>
        <div className="w-64 bg-gray-200 rounded-full h-1">
          <div 
            className="bg-blue-500 h-1 rounded-full transition-all duration-300" 
            style={{ width: `${(step / total) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

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
    return null;
  };

  const Page1 = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Review and Sign Agreement</h1>
        <p className="text-gray-600 text-sm">Review your & verification details and submit for Account Activation</p>
      </div>

      <ProgressBar step={1} total={2} />

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-green-800 font-medium text-sm">Ready to Activate</p>
          <p className="text-green-700 text-sm mt-1">Your hospital account is ready to be activated. Some verifications are still in progress but won't delay your access.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Doctor Details */}
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">Doctor Details</h3>
          <div className="grid grid-cols-2 gap-x-12">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">Doctor Name</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.doctorName}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">Gender</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.gender}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">User Role</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.userRole}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm w-28">Personal Email</span>
                  <span className="text-gray-600 text-sm">:</span>
                  <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.personalEmail}</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm w-28">Personal Contact</span>
                  <span className="text-gray-600 text-sm">:</span>
                  <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.personalContact}</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm w-28">MFA Status</span>
                  <span className="text-gray-600 text-sm">:</span>
                  <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.mfaStatus}</span>
                </div>
                <StatusBadge status="Done" type="done" />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">Professional Details</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="flex items-center flex-1">
                <span className="text-gray-600 text-sm w-32">MRN Number</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.mrnNumber}</span>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <button className="text-blue-600 text-sm hover:underline">MRN Proof.pdf</button>
                <StatusBadge status="Verified" type="verified" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">Registration Council</span>
              <span className="text-gray-600 text-sm">:</span>
              <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.registrationCouncil}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">Registration Year</span>
              <span className="text-gray-600 text-sm">:</span>
              <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.registrationYear}</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center flex-1">
                <span className="text-gray-600 text-sm w-32">Graduation Degree</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.graduationDegree}</span>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <button className="text-blue-600 text-sm hover:underline">Grad Degree.pdf</button>
                <StatusBadge status="Under Review (24-48hrs)" type="review" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">Medical Institute</span>
              <span className="text-gray-600 text-sm">:</span>
              <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.medicalInstitute}</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center flex-1">
                <span className="text-gray-600 text-sm w-32">Post Graduation</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.postGraduation}</span>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <button className="text-blue-600 text-sm hover:underline">Grad Deg...</button>
                <StatusBadge status="Under Review (24-48hrs)" type="review" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">Medical Institute</span>
              <span className="text-gray-600 text-sm">:</span>
              <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.medicalInstitute}</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-gray-600 text-sm w-32">Specialization</span>
              <span className="text-gray-600 text-sm">:</span>
              <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.specialization}</span>
            </div>
          </div>
        </div>

        {/* Clinical Information */}
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">Clinical Information</h3>
          <div className="grid grid-cols-2 gap-x-12">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">Clinic Name</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.clinicName}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">Hospital Type</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.hospitalType}</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-600 text-sm w-24 flex-shrink-0">Address</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2 leading-relaxed">{doctorData.address}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm w-24">Clinic Email</span>
                  <span className="text-gray-600 text-sm">:</span>
                  <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.clinicEmail}</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm w-24">Clinic Contact</span>
                  <span className="text-gray-600 text-sm">:</span>
                  <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.clinicContact}</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm w-24">e-clinic ID</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2">{doctorData.eClinicId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={() => setCurrentPage(2)}
          className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );

  const Page2 = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Review and Sign Agreement</h1>
        <p className="text-gray-600 text-sm">Review your & verification details and submit for Account Activation</p>
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
        {/* Terms & Conditions */}
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-3">Terms & Conditions</h3>
          <p className="text-gray-600 text-sm mb-4">
            By using this Healthcare Management System, you agree to comply with and be bound by the following terms and conditions:
          </p>
          <div className="space-y-2 text-sm text-gray-700 mb-4">
            <div><span className="font-semibold">1. Data Privacy:</span> You agree to handle all patient data in accordance with HIPAA, NDHM, and other applicable regulations.</div>
            <div><span className="font-semibold">2. Security Measures:</span> You will implement appropriate security measures to protect patient data.</div>
            <div><span className="font-semibold">3. Accuracy of Information:</span> You confirm that all information provided during registration is accurate and complete.</div>
            <div><span className="font-semibold">4. User Access:</span> You will manage user access appropriately and ensure that only authorized personnel have access to sensitive information.</div>
            <div><span className="font-semibold">5. Compliance:</span> You will comply with all applicable laws and regulations related to healthcare data management.</div>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={() => setTermsAccepted(!termsAccepted)}
              className="mr-3"
            >
              {termsAccepted ? <CheckCircle className="w-4 h-4 text-blue-600" /> : <Circle className="w-4 h-4 text-gray-400" />}
            </button>
            <span className="text-sm text-gray-700">I accept the Terms & Conditions and Data Privacy Agreement</span>
          </div>
        </div>

        {/* Data Privacy Agreement */}
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <h3 className="text-base font-medium text-gray-900 mb-3">Data Privacy Agreement</h3>
          <p className="text-gray-600 text-sm mb-4">
            This Data Privacy Agreement outlines how patient data should be handled in compliance with HIPAA, NDHM, and other applicable regulations:
          </p>
          <div className="space-y-2 text-sm text-gray-700 mb-4">
            <div><span className="font-semibold">1. Data Collection:</span> Only collect patient data that is necessary for providing healthcare services.</div>
            <div><span className="font-semibold">2. Data Storage:</span> Store patient data securely with appropriate encryption and access controls.</div>
            <div><span className="font-semibold">3. Data Sharing:</span> Only share patient data with authorized personnel and third parties as required for healthcare services.</div>
            <div><span className="font-semibold">4. Patient Rights:</span> Respect patient rights regarding their data, including the right to access, correct, and delete their information.</div>
            <div><span className="font-semibold">5. Breach Notification:</span> Promptly notify affected patients and authorities in case of a data breach.</div>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={() => setPrivacyAccepted(!privacyAccepted)}
              className="mr-3"
            >
              {privacyAccepted ? <CheckCircle className="w-4 h-4 text-blue-600" /> : <Circle className="w-4 h-4 text-gray-400" />}
            </button>
            <span className="text-sm text-gray-700">I understand and will comply with the Data Privacy Agreement</span>
          </div>
        </div>

        {/* Digital Signature */}
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-gray-900">Digital Signature *</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Sign digitally using Aadhar eSign and Upload Pan card</p>
          
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              Use Aadhar eSign
            </button>
            <button className="bg-gray-100 text-gray-700 border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium">
              Upload Pancard
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button 
          onClick={() => setCurrentPage(1)}
          className="bg-gray-100 text-gray-700 border border-gray-300 px-8 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Back
        </button>
        <button 
          disabled={!termsAccepted || !privacyAccepted}
          className={`px-8 py-2 rounded-md transition-colors text-sm font-medium ${
            termsAccepted && privacyAccepted 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit for Activation
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {currentPage === 1 ? <Page1 /> : <Page2 />}
    </div>
  );
};

=======
import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useRegistration } from '../../context/RegistrationContext';
import { ProgressBar, SectionHeader, ReviewBanner, ReviewCard, AgreementBox, ActionButton } from '../../components/FormItems';

const Step4 = () => {
  const { currentStep, nextStep, prevStep, updateFormData, formData } = useRegistration();
  
  const currentSubStep = formData.step4SubStep || 1;
  
  const [termsAccepted, setTermsAccepted] = useState(formData.termsAccepted || false);
  const [privacyAccepted, setPrivacyAccepted] = useState(formData.privacyAccepted || false);
  
  const doctorData = {
    doctorName: "Milind Chachun",
    gender: "Male",
    userRole: "Super Admin/Doctor",
    personalEmail: "MilindChachun@gmail.com",
    personalContact: "+91 91753 67487",
    mfaStatus: "Done",
    mrnNumber: "29AACCC2943F1ZS",
    registrationCouncil: "Maharashtra State Council",
    registrationYear: "2008",
    graduationDegree: "MBBS (Completed : 2008)",
    medicalInstitute: "Government Medical College, Nagpur",
    postGraduation: "MD in General Medicine (Completed : 2011)",
    specialization: "General Medicine (Exp : 17 years)",
    clinicName: "Manipal Clinic Life's On",
    hospitalType: "Private Hospital",
    clinicEmail: "support@Manipal.com",
    clinicContact: "+91 99828 39045",
    eClinicId: "HLN-001",
    address: "Manipal Health Enterprise Pvt Ltd. The Annexe, #88/2, Rustom Bagh, Off HAL Airport Road, Bengaluru - 560017"
  };

  useEffect(() => {
    if (formData.termsAccepted !== termsAccepted || formData.privacyAccepted !== privacyAccepted) {
      updateFormData({
        termsAccepted,
        privacyAccepted
      });
    }
  }, [termsAccepted, privacyAccepted]);

  const handleTermsChange = () => {
    const newValue = !termsAccepted;
    setTermsAccepted(newValue);
    updateFormData({ termsAccepted: newValue });
  };

  const handlePrivacyChange = () => {
    const newValue = !privacyAccepted;
    setPrivacyAccepted(newValue);
    updateFormData({ privacyAccepted: newValue });
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
    return null;
  };

  const Pipe = () => <span className="mx-2 text-gray-300">|</span>;

  const Row = ({ children }) => (
    <div className="flex items-center justify-between py-1">
      {children}
    </div>
  );

  const LabelValue = ({ label, value, labelWidth = 'w-[170px]' }) => (
    <div className="flex items-center">
      <span className={`text-gray-600 text-sm ${labelWidth}`}>{label}</span>
      <span className="text-gray-600 text-sm mr-2">:</span>
      <span className="text-gray-900 text-sm font-medium ml-2">{value}</span>
    </div>
  );

  const Page1 = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <SectionHeader title="Review and Sign Agreement" subtitle="Review your & verification details and submit for Account Activation" />

      <ProgressBar step={1} total={2} />

      <ReviewBanner 
        icon={<CheckCircle className="w-5 h-5 text-green-500" />} 
        title="Ready to Activate"
        message="Your hospital account is ready to be activated. Some verifications are still in progress but won't delay your access."
        className="mb-6"
      />

      <div className="space-y-6">
        {/* Doctor Details */}
        <ReviewCard title="Doctor Details">
          <div className="grid grid-cols-2 gap-x-12">
            <div className="space-y-2">
              <LabelValue label="Doctor Name" value={doctorData.doctorName} labelWidth="w-24" />
              <LabelValue label="Gender" value={doctorData.gender} labelWidth="w-24" />
              <LabelValue label="User Role" value={doctorData.userRole} labelWidth="w-24" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <LabelValue label="Personal Email" value={doctorData.personalEmail} labelWidth="w-28" />
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <LabelValue label="Personal Contact" value={doctorData.personalContact} labelWidth="w-29" />
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <LabelValue label="MFA Status" value={doctorData.mfaStatus} labelWidth="w-28" />
                <StatusBadge type="done" />
              </div>
            </div>
          </div>
        </ReviewCard>

        {/* Professional Details */}
        <ReviewCard title="Professional Details">
          <div className="space-y-0">
            <Row>
              <div className="flex items-center flex-1">
                <LabelValue label="MRN Number" value={doctorData.mrnNumber} />
                <Pipe />
                <button className="text-blue-600 text-sm hover:underline">MRN Proof.pdf</button>
              </div>
              <StatusBadge type="verified" />
            </Row>
            <Row>
              <LabelValue label="Registration Council" value={doctorData.registrationCouncil} />
            </Row>
            <Row>
              <LabelValue label="Registration Year" value={doctorData.registrationYear} />
            </Row>
            <Row>
              <div className="flex items-center flex-1">
                <LabelValue label="Graduation Degree" value={doctorData.graduationDegree} />
                <Pipe />
                <button className="text-blue-600 text-sm hover:underline">Grad Degree .pdf</button>
              </div>
              <StatusBadge type="review" />
            </Row>
            <Row>
              <LabelValue label="Medical Institute" value={doctorData.medicalInstitute} />
            </Row>
            <Row>
              <div className="flex items-center flex-1">
                <LabelValue label="Post Graduation" value={doctorData.postGraduation} />
                <Pipe />
                <button className="text-blue-600 text-sm hover:underline">Grad Deg...</button>
              </div>
              <StatusBadge type="review" />
            </Row>
            <Row>
              <LabelValue label="Medical Institute" value={doctorData.medicalInstitute} />
            </Row>
            <div className="pt-1">
              <LabelValue label="Specialization" value={doctorData.specialization} />
            </div>
          </div>
        </ReviewCard>

        {/* Clinical Information */}
        <ReviewCard title="Clinical Information">
          <div className="grid grid-cols-2 gap-x-12">
            <div className="space-y-2">
              <LabelValue label="Clinic Name" value={doctorData.clinicName} labelWidth="w-24" />
              <LabelValue label="Hospital Type" value={doctorData.hospitalType} labelWidth="w-24" />
              <div className="flex items-start">
                <span className="text-gray-600 text-sm w-24 flex-shrink-0">Address</span>
                <span className="text-gray-600 text-sm">:</span>
                <span className="text-gray-900 text-sm font-medium ml-2 leading-relaxed">{doctorData.address}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <LabelValue label="Clinic Email" value={doctorData.clinicEmail} labelWidth="w-24" />
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <LabelValue label="Clinic Contact" value={doctorData.clinicContact} labelWidth="w-24" />
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <LabelValue label="e-clinic ID" value={doctorData.eClinicId} labelWidth="w-24" />
            </div>
          </div>
        </ReviewCard>
      </div>
    </div>
  );

  const Page2 = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <SectionHeader title="Review and Sign Agreement" subtitle="Review your & verification details and submit for Account Activation" />

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

>>>>>>> dev
export default Step4;