import React, { useState, useCallback } from 'react';
import Onboarding from './Onboarding';
import Verification from './Verification';
import ActivationSuccess from './ActivationSuccess';

// Simple local-state flow controller that keeps URL stable at /onboarding
export default function OnboardingFlow() {
  // steps: 'create-password' -> 'verify' -> 'activated'
  const [step, setStep] = useState('create-password');

  const handleContinueFromOnboarding = useCallback(() => {
    setStep('verify');
  }, []);

  const handleVerified = useCallback(() => {
    setStep('activated');
  }, []);

  const handleCompleteProfile = useCallback(() => {
    // optional: loop back to first step or keep at activated
    setStep('create-password');
  }, []);

  if (step === 'verify') {
    return <Verification onVerified={handleVerified} />;
  }

  if (step === 'activated') {
    return <ActivationSuccess onCompleteProfile={handleCompleteProfile} />;
  }

  return <Onboarding onContinue={handleContinueFromOnboarding} />;
}
