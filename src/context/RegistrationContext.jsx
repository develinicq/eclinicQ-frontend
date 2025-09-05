import React, { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext();

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

export const RegistrationProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationType, setRegistrationType] = useState(''); // 'doctor' or 'hospital'
  const [formData, setFormData] = useState({
    // Initialize with some default values for hospital registration
    hosStep3SubStep: 1,
    hosStep5SubStep: 1,
    hosTermsAccepted: false,
    hosPrivacyAccepted: false,
    hosSelectedPlan: 'Basic Hospital',
    isDoctor: 'no' // Initialize isDoctor field for conditional navigation - default to 'no'
  });

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const resetRegistration = () => {
    setCurrentStep(1);
    setFormData({
      hosStep3SubStep: 1,
      hosStep5SubStep: 1,
      hosTermsAccepted: false,
      hosPrivacyAccepted: false,
      hosSelectedPlan: 'Basic Hospital',
      isDoctor: 'no'
    });
  };

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const value = {
    currentStep,
    registrationType,
    formData,
    setRegistrationType,
    setCurrentStep,
    nextStep,
    prevStep,
    goToStep,
    resetRegistration,
    updateFormData
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
