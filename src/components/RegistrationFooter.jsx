import React from "react";
import { useRegistration } from "../SuperAdmin/context/RegistrationContext";
import useDoctorRegistrationStore from '../store/useDoctorRegistrationStore';

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
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          Back to Home
        </button>

        <div className="flex gap-3">
          <button
            onClick={onPrev}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={true}
          >
            ← Previous
          </button>

          <button
            onClick={onNext}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          Back to Home
        </button>

        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={true}
          >
             Previous
          </button>

          <button
            onClick={onNext}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
    // Guard: ensure userId exists (set after Step1 registers the doctor)
    if (!userId) {
      const msg = 'User ID is missing. Please complete Step 1 (Account Creation) successfully before submitting.';
      setLocalError(msg);
      alert(msg);
      return;
    }
    // Guard: required business fields
  const specOk = specialization && (typeof specialization === 'object' ? specialization.value : specialization);
  if (!specOk) {
      const msg = 'Please enter your Specialization in Step 2 before submitting.';
      setLocalError(msg);
      alert(msg);
      return;
    }
    const ok = await submit();
    if (ok) {
      setCurrentStep(6);
      setDisablePrevLocal(true);
    } else {
      const msg = error || 'Registration failed';
      setLocalError(msg);
      alert(msg);
    }
  };

  return (
    <footer className="flex-shrink-0 p-4 border-t border-gray-200 flex justify-between bg-white">
      <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
        Cancel
      </button>

      <div className="flex gap-3 items-center">
        {currentStep > 1 && (
          <button
            onClick={onPrev}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={disablePrev || disablePrevLocal}
          >
            ← Previous
          </button>
        )}

        {isLastStep ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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



