import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useRegistration } from '../../../context/RegistrationContext';
import { ProgressBar, SectionHeader, ReviewBanner, ReviewCard, AgreementBox, ActionButton } from '../../../../components/FormItems';
import useDoctorStep1Store from '../../../../store/useDoctorStep1Store';
import useDoctorRegistrationStore from '../../../../store/useDoctorRegistrationStore';

const Step4 = () => {
  const { currentStep, nextStep, prevStep, updateFormData, formData } = useRegistration();
  // Pull latest values from stores
  const step1 = useDoctorStep1Store();
  const reg = useDoctorRegistrationStore();
  
  const currentSubStep = formData.step4SubStep || 1;
  
  const [termsAccepted, setTermsAccepted] = useState(formData.termsAccepted || false);
  const [privacyAccepted, setPrivacyAccepted] = useState(formData.privacyAccepted || false);
  const [formError, setFormError] = useState("");
  // Helpers to build display strings safely
  const orDash = (v) => (v === 0 ? '0' : (v ? v : '—'));
  const joinNonEmpty = (arr, sep = ', ') => arr.filter(Boolean).join(sep);
  const formatCompleted = (label, year) => {
    if (!label && !year) return '—';
    if (label && year) return `${label} (Completed : ${year})`;
    return label || `Completed : ${year}`;
  };
  const computeMfaStatus = () => {
    const email = step1?.mfa?.emailId;
    const phone = step1?.mfa?.phone;
    if (email && phone) return 'Done';
    if (email || phone) return 'Partial';
    return 'Pending';
  };
  const buildAddress = () => {
    const c = reg?.clinicData || {};
    const line1 = joinNonEmpty([c.blockNo, c.areaStreet, c.landmark], ', ');
    const line2 = joinNonEmpty([c.city, c.state, c.pincode], ', ');
    return orDash(joinNonEmpty([line1, line2], ' '));
  };
  const doctorData = {
    doctorName: orDash(joinNonEmpty([step1?.firstName, step1?.lastName], ' ')),
    gender: orDash(step1?.gender),
    userRole: orDash(step1?.role ? (step1.role === 'doctor' ? 'Doctor' : step1.role) : undefined),
    personalEmail: orDash(step1?.emailId),
    personalContact: orDash(step1?.phone),
    mfaStatus: computeMfaStatus(),
    mrnNumber: orDash(reg?.medicalCouncilRegNo),
    registrationCouncil: orDash(reg?.medicalCouncilName),
    registrationYear: orDash(reg?.medicalCouncilRegYear),
    graduationDegree: formatCompleted(reg?.medicalDegreeType, reg?.medicalDegreeYearOfCompletion),
    medicalInstitute: orDash(reg?.medicalDegreeUniversityName),
    postGraduation: formatCompleted(reg?.pgMedicalDegreeType, reg?.pgMedicalDegreeYearOfCompletion),
    specialization: (() => {
      const specVal = reg?.specialization;
      const specName = typeof specVal === 'object' ? (specVal?.name || specVal?.value) : specVal;
      const exp = reg?.experienceYears;
      if (!specName && !exp) return '—';
      return `${specName || ''}${exp ? ` (Exp : ${exp} years)` : ''}`.trim();
    })(),
    clinicName: orDash(reg?.clinicData?.name),
    hospitalType: orDash(reg?.clinicData?.type), // may be undefined in store
    clinicEmail: orDash(reg?.clinicData?.email),
    clinicContact: orDash(reg?.clinicData?.phone),
    eClinicId: orDash(reg?.eClinicId), // not present yet; placeholder
    address: buildAddress(),
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
    if (formError) setFormError("");
  };

  const handlePrivacyChange = () => {
    const newValue = !privacyAccepted;
    setPrivacyAccepted(newValue);
    updateFormData({ privacyAccepted: newValue });
    if (formError) setFormError("");
  };

  // Validation before proceeding (call this before nextStep)
  const validateAgreements = () => {
    if (!termsAccepted || !privacyAccepted) {
      setFormError("You must accept both Terms & Conditions and Data Privacy Agreement to proceed.");
      return false;
    }
    setFormError("");
    return true;
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
            <div className="pt-1 space-y-1">
              <LabelValue label="Specialization" value={doctorData.specialization} />
              {Array.isArray(reg?.additionalPractices) && reg.additionalPractices.length > 0 && (
                <div className="ml-[170px] space-y-1">
                  {reg.additionalPractices.map((p, i) => {
                    const name = typeof p?.specialization === 'object' ? (p.specialization?.name || p.specialization?.value) : p?.specialization;
                    const exp = p?.experienceYears;
                    const text = `${name || '—'}${exp ? ` (Exp : ${exp} years)` : ''}`;
                    return <div key={i} className="text-sm text-gray-900 font-medium">• {text}</div>
                  })}
                </div>
              )}
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
      {formError && (
        <div className="max-w-2xl mx-auto p-2">
          <span className="text-red-500 text-sm font-semibold">{formError}</span>
        </div>
      )}
      {currentSubStep === 1 ? <Page1 /> : <Page2 />}
    </div>
  );
};

export default Step4;