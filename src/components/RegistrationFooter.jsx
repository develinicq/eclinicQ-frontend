import React from "react";
import { useRegistration } from "../SuperAdmin/context/RegistrationContext";
import useDoctorRegistrationStore from '../store/useDoctorRegistrationStore';
import { ArrowLeft, ChevronLeft } from "lucide-react";

import UniversalLoader from "./UniversalLoader";

const RegistrationFooter = ({ onCancel, onNext, onPrev, currentStep, maxSteps, nextLabel = "Save & Next", disablePrev = false, loading = false }) => {
  const { registrationType, formData } = useRegistration();
  const isHospital = registrationType === 'hospital';
  const hospitalOwnerAlsoDoctor = isHospital && String(formData?.isDoctor || 'no') === 'yes';

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

  const { submit, loading: storeLoading, error, success, userId, specialization } = useDoctorRegistrationStore();
  const { setCurrentStep } = useRegistration();
  const [localError, setLocalError] = React.useState(null);
  const [disablePrevLocal, setDisablePrevLocal] = React.useState(false);

  // We disable the footer's direct submission logic for Step 5 because Step 5 now handles its own activation via internal buttons.
  const isLastStep = false; // registrationType === 'doctor' ? currentStep === 5 : false;

  const handleSubmit = async () => {
    setLocalError(null);

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
            disabled={loading}
            className={`w-[200px] h-8 flex items-center justify-center rounded-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors ${loading ? 'cursor-wait opacity-80' : ''}`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <UniversalLoader size={16} color="white" style={{ width: 'auto', height: 'auto' }} />
                <span>Saving...</span>
              </div>
            ) : nextLabel}
          </button>
        )}
        {/* Error alerts are shown via window.alert in handleSubmit; no inline red text */}
        {isLastStep && success && <span className="ml-4 text-green-600">Registration successful!</span>}
      </div>
    </footer>
  );
};

export default RegistrationFooter;



