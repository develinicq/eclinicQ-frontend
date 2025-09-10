import React from "react";
import { useRegistration } from "../context/RegistrationContext";

const RegistrationFooter = ({ onCancel, onNext, onPrev, currentStep, maxSteps, nextLabel = "Save & Next →", disablePrev = false }) => {
  const { registrationType } = useRegistration();

  // For Step 6 (success page), show the button in footer but with different label
  if (currentStep === 6) {
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
  if (currentStep === 7 && registrationType === 'hospital') {
    return (
      <footer className="flex-shrink-0 p-4 border-t border-gray-200 flex justify-between bg-white">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          Back to Home
        </button>

        <div className="flex gap-3">
          <button
            onClick={onPrev}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            ← Previous
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

  return (
    <footer className="flex-shrink-0 p-4 border-t border-gray-200 flex justify-between bg-white">
      <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
        Cancel
      </button>

      <div className="flex gap-3">
        {currentStep > 1 && (
          <button
            onClick={onPrev}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={disablePrev}
          >
            ← Previous
          </button>
        )}

        <button
          onClick={onNext}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          {nextLabel}
        </button>
      </div>
    </footer>
  );
};

export default RegistrationFooter;



