import React from "react";
import { useRegistration } from "../SuperAdmin/context/RegistrationContext";
import useDoctorRegistrationStore from '../store/useDoctorRegistrationStore';
import useDoctorStep1Store from '../store/useDoctorStep1Store';
import { ArrowLeft } from "lucide-react";

import UniversalLoader from "./UniversalLoader";

const RegistrationFooter = ({ onCancel, onNext, onPrev, currentStep, maxSteps, nextLabel = "Save & Next", disablePrev = false, loading = false }) => {
  const { registrationType, formData, setCurrentStep } = useRegistration();
  const isHospital = registrationType === 'hospital';
  const hospitalOwnerAlsoDoctor = isHospital && String(formData?.isDoctor || 'no') === 'yes';

  // State from stores for validation
  const step1State = useDoctorStep1Store();
  const regState = useDoctorRegistrationStore();
  const { submit, loading: storeLoading, error, success } = regState;

  const [localError, setLocalError] = React.useState(null);
  const [disablePrevLocal, setDisablePrevLocal] = React.useState(false);

  // Final success footer:
  // - Doctor flow finishes at step 6
  // - Hospital flow finishes at step 6 when isDoctor === 'no'
  if ((registrationType === 'doctor' && currentStep === 6) || (isHospital && !hospitalOwnerAlsoDoctor && currentStep === 6)) {
    return (
      <footer className="flex-shrink-0 px-6 py-6 border-t border-gray-200 flex justify-between bg-white text-sm">
        <button onClick={onCancel} className="ml-6 w-[200px] h-8 flex items-center justify-center rounded-sm border border-secondary-grey200 hover:bg-secondary-grey50 transition-colors text-secondary-grey400">
          Close
        </button>

        <div className="flex gap-5 items-center px-6">
          <button
            onClick={onNext}
            className="w-[200px] h-8 flex items-center justify-center rounded-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Go to Profile →
          </button>
        </div>
      </footer>
    );
  }

  // For Step 7 (hospital success page), show different navigation
  if (currentStep === 7 && isHospital) {
    return (
      <footer className="flex-shrink-0 px-6 py-6 border-t border-gray-200 flex justify-between bg-white text-sm">
        <button onClick={onCancel} className="ml-6 w-[200px] h-8 flex items-center justify-center rounded-sm border border-secondary-grey200 hover:bg-secondary-grey50 transition-colors text-secondary-grey400">
          Close
        </button>

        <div className="flex gap-5 items-center px-6">
          <button
            onClick={onNext}
            className="w-[200px] h-8 flex items-center justify-center rounded-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Go to Profile →
          </button>
        </div>
      </footer>
    );
  }

  const validateStep1 = () => {
    const { firstName, lastName, emailId, phone, gender, city, profilePhotoKey } = step1State;
    if (!firstName?.trim() || !lastName?.trim() || !emailId?.trim() || !phone?.trim() || !gender || !city || !profilePhotoKey) return false;
    if (!/^\S+@\S+\.\S+$/.test(emailId)) return false;
    if (!/^\d{10}$/.test(phone)) return false;
    return true;
  };

  const validateStep2 = () => {
    const {
      medicalCouncilRegNo,
      medicalCouncilName,
      medicalCouncilRegYear,
      medicalDegreeType,
      medicalDegreeUniversityName,
      medicalDegreeYearOfCompletion,
      specialization,
      experienceYears,
      documents,
      pgMedicalDegreeType,
      pgMedicalDegreeUniversityName,
      pgMedicalDegreeYearOfCompletion
    } = regState;

    // Required fields
    if (!medicalCouncilRegNo?.trim() || !medicalCouncilName || !medicalCouncilRegYear) return false;
    if (!medicalDegreeType || !medicalDegreeUniversityName || !medicalDegreeYearOfCompletion) return false;

    // Specialization
    const specName = typeof specialization === 'object' ? (specialization?.value || specialization?.name) : specialization;
    if (!specName || !experienceYears) return false;

    // Year formats
    if (!/^\d{4}$/.test(medicalCouncilRegYear)) return false;
    if (!/^\d{4}$/.test(medicalDegreeYearOfCompletion)) return false;

    // Experience
    if (!/^\d+$/.test(experienceYears)) return false;

    // Proofs
    const hasProof = (no) => documents?.find(d => d.no === no)?.url;
    if (!hasProof(1) || !hasProof(2)) return false;

    // PG validation if selected
    if (pgMedicalDegreeType !== null) {
      if (!pgMedicalDegreeType || !pgMedicalDegreeUniversityName || !pgMedicalDegreeYearOfCompletion) return false;
      if (!/^\d{4}$/.test(pgMedicalDegreeYearOfCompletion)) return false;
    }

    // Additional Practices validation
    const addPractices = regState.additionalPractices || [];
    for (const p of addPractices) {
      const pSpec = typeof p.specialization === 'object' ? (p.specialization?.value || p.specialization?.name) : p.specialization;
      if (!pSpec || !p.experienceYears?.toString().trim()) return false;
      if (!/^\d+$/.test(p.experienceYears)) return false;
    }

    return true;
  };

  const validateStep3 = () => {
    const { hasClinic, clinicData } = regState;
    if (!hasClinic) return true; // Skipped

    const {
      name, email, phone,
      blockNo, areaStreet, landmark, city, state, pincode,
      proof, latitude, longitude
    } = clinicData;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) return false;
    if (!blockNo?.trim() || !areaStreet?.trim() || !landmark?.trim()) return false;
    if (!city || !state || !pincode?.trim()) return false;
    if (!proof) return false;
    if (!Number(latitude) || !Number(longitude)) return false;

    // RegEx checks
    if (!/^\S+@\S+\.\S+$/.test(email)) return false;
    if (!/^\d{10}$/.test(phone)) return false;
    if (!/^\d{6}$/.test(pincode)) return false;

    if (!/^\d{6}$/.test(pincode)) return false;

    return true;
  };

  const validateStep4 = () => {
    // Check if we are in Doctor Step 4, Substep 2
    // Doctor Step 4 has 2 substeps. Agreement is on SubStep 2.
    // Substep state is in formData.step4SubStep
    if (registrationType === 'doctor' && (formData.step4SubStep === 2)) {
      if (!formData.termsAccepted || !formData.privacyAccepted) return false;
    }
    return true;
  };

  let isNextDisabled = false;
  if (registrationType === 'doctor') {
    if (currentStep === 1) isNextDisabled = !validateStep1();
    else if (currentStep === 2) isNextDisabled = !validateStep2();
    else if (currentStep === 3) isNextDisabled = !validateStep3();
    else if (currentStep === 4) isNextDisabled = !validateStep4();
  }

  const isLastStep = false; // Set to true if this is the final submission step

  const handleSubmit = async () => {
    setLocalError(null);
    if (isNextDisabled) return;

    const ok = await submit();
    // Bypass validation: Always proceed
    if (!ok) {
      console.warn('Final submission failed but ignored (Bypassed)');
    }
    setCurrentStep(6);
    setDisablePrevLocal(true);
  };

  return (
    <footer className="flex-shrink-0 px-6 py-6 border-t border-gray-200 flex justify-between bg-white text-sm">
      <button onClick={onCancel} className="ml-6 w-[200px] h-8 flex items-center justify-center rounded-sm border border-secondary-grey200 hover:bg-secondary-grey50 transition-colors text-secondary-grey400">
        Cancel
      </button>

      <div className="flex gap-5 items-center px-6">
        {currentStep > 1 && (
          <button
            onClick={onPrev}
            className=" h-8 flex gap-1 items-center justify-center rounded-sm text-secondary-grey400 hover:text-gray-900 transition-colors disabled:opacity-50"
            disabled={disablePrev || disablePrevLocal}
          >
            <ArrowLeft size={14} />
            Previous
          </button>
        )}

        {isLastStep ? (
          <button
            onClick={handleSubmit}
            className="w-[200px] h-8 flex items-center justify-center rounded-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-60"
            disabled={storeLoading || loading}
          >
            {(storeLoading || loading) ? (
              <div className="flex items-center gap-2">
                <UniversalLoader size={16} />
                <span>Submitting...</span>
              </div>
            ) : 'Preview Purchase ->'}
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={loading || isNextDisabled}
            className={`w-[200px] h-8 flex items-center justify-center rounded-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors ${loading || isNextDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <UniversalLoader size={16} color="white" style={{ width: 'auto', height: 'auto' }} />
                <span>Saving...</span>
              </div>
            ) : nextLabel}
          </button>
        )}
        {isLastStep && success && <span className="ml-4 text-green-600">Registration successful!</span>}
      </div>
    </footer>
  );
};

export default RegistrationFooter;
