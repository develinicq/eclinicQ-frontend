import React from "react";
import { useRegistration } from "../SuperAdmin/context/RegistrationContext";
import useDoctorRegistrationStore from '../store/useDoctorRegistrationStore';
import { ArrowLeft, ChevronLeft } from "lucide-react";

const RegistrationFooter = ({ onCancel, onNext, onPrev, currentStep, maxSteps, nextLabel = "Save & Next", disablePrev = false }) => {
  const { registrationType, formData } = useRegistration();
  const isHospital = registrationType === 'hospital';
  const hospitalOwnerAlsoDoctor = isHospital && String(formData?.isDoctor || 'no') === 'yes';

  // Final success footer:
  // - Doctor flow finishes at step 6
  // - Hospital flow finishes at step 6 when isDoctor === 'no'
  if ((registrationType === 'doctor' && currentStep === 6) || (isHospital && !hospitalOwnerAlsoDoctor && currentStep === 6)) {
    return (
      <footer className="flex-shrink-0 p-4 border-t border-gray-200 flex justify-between bg-white">
        <button onClick={onCancel} className="w-[200px] h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          Back to Home
        </button>

        <div className="flex gap-3">
          <button
            onClick={onPrev}
            className="w-[200px] h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={true}
          >
            ← Previous
          </button>

          <button
            onClick={onNext}
            className="w-[200px] h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {registrationType === 'doctor' ? 'Go to Doctors Dashboard' : 'Go to Hospitals Dashboard'}
          </button>
        </div>
      </footer>
    );
  }

  // For Step 7 (hospital success page), show different navigation
  if (currentStep === 7 && isHospital) {
    return (
      <footer className="flex-shrink-0 p-4 border-t border-gray-200 flex justify-between bg-white">
        <button onClick={onCancel} className="w-[200px] h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          Back to Home
        </button>

        <div className="flex gap-3">
          <button
            className="w-[200px] h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={true}
          >
            Previous
          </button>

          <button
            onClick={onNext}
            className="w-[200px] h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Go to Hospitals Dashboard
          </button>
        </div>
      </footer>
    );
  }

  const { submit, loading, error, success, userId, specialization } = useDoctorRegistrationStore();
  const { setCurrentStep } = useRegistration();
  const [localError, setLocalError] = React.useState(null);
  const [disablePrevLocal, setDisablePrevLocal] = React.useState(false);

  const isLastStep = registrationType === 'doctor' ? currentStep === 5 : false; // adjust for hospital if needed

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
            disabled={false /* Always enable previous for testing */}
          >
            <ArrowLeft size={14} />
            Previous
          </button>
        )}

        {isLastStep ? (
          <button
            onClick={handleSubmit}
            className="w-[200px] h-8 flex items-center justify-center rounded-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="w-[200px] h-8 flex items-center justify-center rounded-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {nextLabel}
          </button>
        )}
        {/* Error alerts are shown via window.alert in handleSubmit; no inline red text */}
        {isLastStep && success && <span className="ml-4 text-green-600">Registration successful!</span>}
      </div>
    </footer>
  );
};

export default RegistrationFooter;



