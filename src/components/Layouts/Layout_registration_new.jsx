import { useLocation, useNavigate } from "react-router-dom";
import { useRegistration } from "../../context/RegistrationContext";
import SidebarSteps from "../Sidebar/SidebarSteps";
import RegistrationFooter from "../RegistrationFooter";
import RegistrationFlow from "../RegistrationFlow";
import React, { useRef, useState } from "react";
// import useDoctorRegisterStore from '../../store/useDoctorRegisterStore';
import Step1 from '../../pages/Doctor_registration/Step1';

const Layout_registration_new = () => {
  const { currentStep, nextStep, prevStep, registrationType, setRegistrationType, formData, updateFormData, setCurrentStep } = useRegistration();
  // const doctorRegisterStore = useDoctorRegisterStore();
  const [footerLoading, setFooterLoading] = useState(false);
  // Ref for Step1 form
  const step1Ref = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine registration type from current route
  React.useEffect(() => {
    if (location.pathname.includes('/doctor')) {
      setRegistrationType('doctor');
      setCurrentStep(1); // Always start at step 1
    } else if (location.pathname.includes('/hospital')) {
      setRegistrationType('hospital');
      setCurrentStep(1); // Always start at step 1
    }
  }, [location.pathname, setRegistrationType, setCurrentStep]);

  // Map formData to API schema for store
  const mapToApiSchema = () => {
    return {
      specialization: formData.specialization,
      experienceYears: formData.experience,
      medicalCouncilName: formData.councilName,
      medicalCouncilRegYear: formData.regYear,
      medicalCouncilRegNo: formData.councilNumber,
      medicalDegreeType: formData.graduation,
      medicalDegreeUniversityName: formData.graduationCollege,
      medicalDegreeYearOfCompletion: formData.graduationYear,
      pgMedicalDegreeType: formData.pgDegree,
      pgMedicalDegreeUniversityName: formData.pgCollege,
      pgMedicalDegreeYearOfCompletion: formData.pgYear,
      hasClinic: !!formData.clinicName,
      clinicData: {
        name: formData.clinicName,
        email: formData.clinicContactEmail,
        phone: formData.clinicContactNumber,
        proof: formData.uploadEstablishmentProof,
        latitude: formData.mapLocation?.lat || '',
        longitude: formData.mapLocation?.lng || '',
        blockNo: formData.blockNo,
        areaStreet: formData.roadAreaStreet,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        image: formData.uploadHospitalImage,
        panCard: formData.panCard || ''
      },
      documents: formData.documents || [],
    };
  };

  const handleNext = async () => {
    if (registrationType === 'doctor') {
      // Step 1: trigger form submit via ref, only move if valid
      if (currentStep === 1 && step1Ref.current && step1Ref.current.submit) {
        const result = await step1Ref.current.submit();
        if (result) {
          nextStep();
        }
        return;
      }
      // Handle Step 4 sub-steps
      if (currentStep === 4) {
        const currentSubStep = formData.step4SubStep || 1;
        
        if (currentSubStep === 1) {
          // Move to sub-step 2
          updateFormData({ step4SubStep: 2 });
        } else if (currentSubStep === 2) {
          // Check if terms are accepted before moving to next step
          if (formData.termsAccepted && formData.privacyAccepted) {
            nextStep();
          } else {
            // Show alert that terms must be accepted
            alert('Please accept the Terms & Conditions and Data Privacy Agreement to continue.');
          }
        }
      } else if (currentStep === 5) {
        // On Step 5, submit all data to API, then go to Step 6
        setFooterLoading(true);
        const apiData = mapToApiSchema();
  // TODO: Add your API call or form submission logic here
  // Example: await api.submit(apiData);
  setFooterLoading(false);
  alert('Registration successful!');
  nextStep();
      } else if (currentStep === 6) {
        // Navigate to doctor profile/dashboard
        navigate('/doctor');
      } else if (currentStep < 5) {
        nextStep();
      }
    } else if (registrationType === 'hospital') {
      // Handle Step 1 for hospital (Account Creation) - conditional navigation
      if (currentStep === 1) {
        // Check if user is a doctor to determine next step
        if (formData.isDoctor === 'yes') {
          // User is a doctor, go to Step 2 (Doctor Registration)
          nextStep();
        } else {
          // User is not a doctor, go to Step 2 (Hospital Details)
          nextStep();
        }
      }
      // Handle Step 2 for hospital (Doctor Registration or Hospital Details)
      else if (currentStep === 2) {
        // Check if user is a doctor to determine if this is Doctor Registration or Hospital Details
        if (formData.isDoctor === 'no') {
          // When user is not a doctor, Step 2 is Hospital Details (Hos_3) with sub-steps
          const currentSubStep = formData.hosStep3SubStep || 1;
          if (currentSubStep === 1) {
            // Move to sub-step 2 (Services & Facilities)
            updateFormData({ hosStep3SubStep: 2 });
          } else if (currentSubStep === 2) {
            // Move to next main step (Step 3)
            nextStep();
          }
        } else {
          // When user is a doctor, Step 2 is Doctor Registration (Hos_2) - no sub-steps, just move to next step
          nextStep();
        }
      }
      // Handle Step 3 for hospital (Hospital Details or Documents Verification)
      else if (currentStep === 3) {
        // Check if user is a doctor to determine if this is Hospital Details or Documents Verification
        if (formData.isDoctor === 'no') {
          // When user is not a doctor, Step 3 is Documents Verification (Hos_4) - no sub-steps
          nextStep();
        } else {
          // When user is a doctor, Step 3 is Hospital Details (Hos_3) with sub-steps
          const currentSubStep = formData.hosStep3SubStep || 1;
          if (currentSubStep === 1) {
            // Move to sub-step 2 (Services & Facilities)
            updateFormData({ hosStep3SubStep: 2 });
          } else if (currentSubStep === 2) {
            // Move to next main step (Step 4)
            nextStep();
          }
        }
      }
      // Handle Step 4 for hospital (Documents Verification - no sub-steps)
      else if (currentStep === 4) {
        // Check if user is a doctor to determine if this is Documents Verification or Review & Create
        if (formData.isDoctor === 'no') {
          // When user is not a doctor, Step 4 is Review & Create (Hos_5) with sub-steps
          const currentSubStep = formData.hosStep5SubStep || 1;
          
          if (currentSubStep === 1) {
            // Move to sub-step 2 (Terms and Agreement)
            updateFormData({ hosStep5SubStep: 2 });
          } else if (currentSubStep === 2) {
            // Check if terms are accepted before moving to next step
            if (formData.hosTermsAccepted && formData.hosPrivacyAccepted) {
              nextStep();
            } else {
              // Show alert that terms must be accepted
              alert('Please accept the Terms & Conditions and Data Privacy Agreement to continue.');
            }
          }
        } else {
          // When user is a doctor, Step 4 is Documents Verification - no sub-steps, just move to next step
          nextStep();
        }
      }
      // Handle Step 5 sub-steps for hospital (Review & Create) - only when user is a doctor
      else if (currentStep === 5) {
        // This only applies when user is a doctor (isDoctor === 'yes')
        const currentSubStep = formData.hosStep5SubStep || 1;
        
        if (currentSubStep === 1) {
          // Move to sub-step 2 (Terms and Agreement)
          updateFormData({ hosStep5SubStep: 2 });
        } else if (currentSubStep === 2) {
          // Check if terms are accepted before moving to next step
          if (formData.hosTermsAccepted && formData.hosPrivacyAccepted) {
            nextStep();
          } else {
            // Show alert that terms must be accepted
            alert('Please accept the Terms & Conditions and Data Privacy Agreement to continue.');
          }
        }
      } else if (currentStep === 6) {
        // Move to Step 7 (success page)
        nextStep();
      } else if (currentStep === 7) {
        // Navigate to hospital profile/dashboard
        navigate('/hospital');
      } else if (currentStep < 7) {
        nextStep();
      }
    }
  };

  const handlePrev = () => {
    if (registrationType === 'doctor') {
      // Handle Step 4 sub-steps
      if (currentStep === 4) {
        const currentSubStep = formData.step4SubStep || 1;
        if (currentSubStep === 2) {
          // Move back to sub-step 1
          updateFormData({ step4SubStep: 1 });
        } else if (currentSubStep === 1 && currentStep > 1) {
          // Move to previous main step
          prevStep();
        }
      } else if (currentStep === 6) {
        // Move back from success page to Step 5
        prevStep();
      } else if (currentStep > 1) {
        prevStep();
      }
    } else if (registrationType === 'hospital') {
      // Handle Step 2 for hospital (Doctor Registration or Hospital Details)
      if (currentStep === 2) {
        // Check if user is a doctor to determine if this is Doctor Registration or Hospital Details
        if (formData.isDoctor === 'no') {
          // When user is not a doctor, Step 2 is Hospital Details (Hos_3) with sub-steps
          const currentSubStep = formData.hosStep3SubStep || 1;
          if (currentSubStep === 2) {
            // Move back to sub-step 1 (Hospital Details)
            updateFormData({ hosStep3SubStep: 1 });
          } else if (currentSubStep === 1 && currentStep > 1) {
            // Move to previous main step
            prevStep();
          }
        } else {
          // When user is a doctor, Step 2 is Doctor Registration (Hos_2) - no sub-steps, just move to previous step
          if (currentStep > 1) {
            prevStep();
          }
        }
      }
      // Handle Step 3 for hospital (Hospital Details or Documents Verification)
      else if (currentStep === 3) {
        // Check if user is a doctor to determine if this is Hospital Details or Documents Verification
        if (formData.isDoctor === 'no') {
          // When user is not a doctor, Step 3 is Documents Verification (Hos_4) - no sub-steps
          if (currentStep > 1) {
            prevStep();
          }
        } else {
          // When user is a doctor, Step 3 is Hospital Details (Hos_3) with sub-steps
          const currentSubStep = formData.hosStep3SubStep || 1;
          if (currentSubStep === 2) {
            // Move back to sub-step 1 (Hospital Details)
            updateFormData({ hosStep3SubStep: 1 });
          } else if (currentSubStep === 1 && currentStep > 1) {
            // Check if user is a doctor to determine previous step
            if (formData.isDoctor === 'yes') {
              // User is a doctor, go back to Step 2 (Doctor Registration)
              setCurrentStep(2);
            } else {
              // User is not a doctor, go back to Step 1 (Account Creation)
              setCurrentStep(1);
            }
          }
        }
      }
      // Handle Step 4 for hospital (Documents Verification - no sub-steps)
      else if (currentStep === 4) {
        // Check if user is a doctor to determine if this is Documents Verification or Review & Create
        if (formData.isDoctor === 'no') {
          // When user is not a doctor, Step 4 is Review & Create (Hos_5) with sub-steps
          const currentSubStep = formData.hosStep5SubStep || 1;
          if (currentSubStep === 2) {
            // Move back to sub-step 1 (Review)
            updateFormData({ hosStep5SubStep: 1 });
          } else if (currentSubStep === 1 && currentStep > 1) {
            // Move to previous main step
            prevStep();
          }
        } else {
          // When user is a doctor, Step 4 is Documents Verification - no sub-steps, just move to previous step
          if (currentStep > 1) {
            prevStep();
          }
        }
      }
      // Handle Step 5 for hospital (Package & Payment or Review & Create)
      else if (currentStep === 5) {
        // Check if user is a doctor to determine if this is Package & Payment or Review & Create
        if (formData.isDoctor === 'no') {
          // When user is not a doctor, Step 5 is Package & Payment (Hos_6) - no sub-steps
          if (currentStep > 1) {
            prevStep();
          }
        } else {
          // When user is a doctor, Step 5 is Review & Create (Hos_5) with sub-steps
          const currentSubStep = formData.hosStep5SubStep || 1;
          if (currentSubStep === 2) {
            // Move back to sub-step 1 (Review)
            updateFormData({ hosStep5SubStep: 1 });
          } else if (currentSubStep === 1 && currentStep > 1) {
            // Move to previous main step
            prevStep();
          }
        }
      } else if (currentStep === 7) {
        // Move back from success page to Step 6
        prevStep();
      } else if (currentStep === 6) {
        // Move back from Step 6 to Step 5
        prevStep();
      } else if (currentStep > 1) {
        prevStep();
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  // Determine button labels for different steps
  const getNextButtonLabel = () => {
    if (registrationType === 'doctor') {
      if (currentStep === 4) {
        const currentSubStep = formData.step4SubStep || 1;
        if (currentSubStep === 1) {
          return "Save & Next →";
        } else if (currentSubStep === 2) {
          // Review & Agreement sub-step 2
          return formData.termsAccepted && formData.privacyAccepted ? "Save & Activate" : "Accept Terms to Continue";
        }
      } else if (currentStep === 5) {
        // Package & Payment step
        return "Send Payment Link";
      } else if (currentStep === 6) {
        // Profile completion page
        return "Go to Profile";
      }
      return "Save & Next →";
    } 
    
    else if (registrationType === 'hospital') {
      if (currentStep === 2) {
        // Check if user is a doctor to determine if this is Doctor Registration or Hospital Details
        if (formData.isDoctor === 'no') {
          // When user is not a doctor, Step 2 is Hospital Details (Hos_3) with sub-steps
          const currentSubStep = formData.hosStep3SubStep || 1;
          if (currentSubStep === 1) {
            return "Save & Next →";
          } else if (currentSubStep === 2) {
            return "Save & Next →";
          }
        } else {
          // When user is a doctor, Step 2 is Doctor Registration (Hos_2) - no sub-steps
          return "Save & Next →";
        }
      } else if (currentStep === 3) {
        // Check if user is a doctor to determine if this is Hospital Details or Documents Verification
        if (formData.isDoctor === 'no') {
          // When user is not a doctor, Step 3 is Documents Verification (Hos_4) - no sub-steps
          return "Save & Next →";
        } else {
          // When user is a doctor, Step 3 is Hospital Details (Hos_3) with sub-steps
          const currentSubStep = formData.hosStep3SubStep || 1;
          if (currentSubStep === 1) {
            return "Save & Next →";
          } else if (currentSubStep === 2) {
            return "Save & Next →";
          }
        }
      } else if (currentStep === 4) {
        // Check if user is a doctor to determine if this is Documents Verification or Review & Create
        if (formData.isDoctor === 'no') {
          // When user is not a doctor, Step 4 is Review & Create (Hos_5) with sub-steps
          const currentSubStep = formData.hosStep5SubStep || 1;
          if (currentSubStep === 1) {
            return "Save & Next →";
          } else if (currentSubStep === 2) {
            // Review & Agreement sub-step 2
            return formData.hosTermsAccepted && formData.hosPrivacyAccepted ? "Save & Activate" : "Accept Terms to Continue";
          }
        } else {
          // When user is a doctor, Step 4 is Documents Verification - no sub-steps
          return "Save & Next →";
        }
      } else if (currentStep === 5) {
        // Check if user is a doctor to determine if this is Package & Payment or Review & Create
        if (formData.isDoctor === 'no') {
          // When user is not a doctor, Step 5 is Package & Payment (Hos_6)
          return "Send Payment Link";
        } else {
          // When user is a doctor, Step 5 is Review & Create (Hos_5) with sub-steps
          const currentSubStep = formData.hosStep5SubStep || 1;
          if (currentSubStep === 1) {
            return "Save & Next →";
          } else if (currentSubStep === 2) {
            // Review & Agreement sub-step 2
            return formData.hosTermsAccepted && formData.hosPrivacyAccepted ? "Save & Activate" : "Accept Terms to Continue";
          }
        }
      } else if (currentStep === 6) {
        // Package & Payment step - only when user is a doctor
        return "Send Payment Link";
      } else if (currentStep === 7) {
        // Profile completion page
        return "Go to Profile";
      }
      return "Save & Next →";
    }
    
    return "Save & Next →";
  };

  const nextLabel = getNextButtonLabel();
  const maxSteps = registrationType === 'doctor' ? 6 : 7;

  return (
    <div className="h-full flex bg-gray-100 p-3 gap-3 overflow-hidden">
      {/* Sidebar - Fixed */}
      <div className="flex-shrink-0">
        <SidebarSteps currentStep={currentStep} />
      </div>

      {/* Main + Footer - Fixed height container */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Content - Scrollable */}

        <main className="flex-1 overflow-y-auto">
          {/* Render Step1 with ref for doctor step 1, else use RegistrationFlow */}
          {registrationType === 'doctor' && currentStep === 1 ? (
            <Step1 ref={step1Ref} />
          ) : (
            <RegistrationFlow type={registrationType} />
          )}
        </main>

        {/* Footer - Fixed */}
        <RegistrationFooter 
          onCancel={handleCancel}
          onNext={handleNext}
          onPrev={handlePrev}
          currentStep={currentStep}
          maxSteps={maxSteps}
          nextLabel={nextLabel}
          disablePrev={registrationType === 'doctor' && (currentStep === 1 || currentStep === 2 || currentStep === 6)}
          loading={footerLoading}
        />
      </div>
    </div>
  );
};

export default Layout_registration_new;
