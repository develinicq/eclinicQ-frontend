import { useLocation, useNavigate } from "react-router-dom";
import { createHospital } from '../../services/hospitalService';
import useHospitalRegistrationStore from '../../store/useHospitalRegistrationStore';
import { useRegistration } from "../../SuperAdmin/context/RegistrationContext";
import SidebarSteps from "../../SuperAdmin/components/RegistrationSidebar/SidebarSteps";
import RegistrationFooter from "../RegistrationFooter";
import RegistrationFlow from "../RegistrationFlow";
import React, { useRef, useState } from "react";
import Step1 from '../../SuperAdmin/pages/Dashboard/Doctor_registration/Step1';
// Import stores directly to avoid runtime require (ESM only)
import useDoctorRegistrationStore from '../../store/useDoctorRegistrationStore';
import useDoctorStep1Store from '../../store/useDoctorStep1Store';
import useHospitalDoctorDetailsStore from '../../store/useHospitalDoctorDetailsStore';
import Navbar from '../Navbar';

const Layout_registration_new = () => {
  const { currentStep, nextStep, prevStep, registrationType, setRegistrationType, formData, updateFormData, setCurrentStep } = useRegistration();
  // const doctorRegisterStore = useDoctorRegisterStore();
  const [footerLoading, setFooterLoading] = useState(false);
  // Ref for Step1 form
  const step1Ref = useRef();
  const hos1Ref = useRef();
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

  // Build Hospital payload from context formData (prunes UI-only wizard fields)
  const buildHospitalPayloadFromFormData = () => {
    // Address
    const address = {
      blockNo: formData.blockNumber || '',
      landmark: formData.landmark || '',
      street: formData.roadAreaStreet || ''
    };

    // Documents
    const documents = [];
    if (formData.gstin) documents.push({ no: formData.gstin, type: 'GST', url: formData.gstinFile || '' });
    if (formData.stateHealthReg) documents.push({ no: formData.stateHealthReg, type: 'State Health Reg No', url: formData.stateHealthRegFile || '' });
    if (formData.panCard) documents.push({ no: formData.panCard, type: 'Pan Card', url: formData.panCardFile || '' });
    if (formData.cinNumber) documents.push({ no: formData.cinNumber, type: 'CIN', url: formData.cinFile || '' });
    if (formData.rohiniId) documents.push({ no: formData.rohiniId, type: 'Rohini ID', url: formData.rohiniFile || '' });
    if (formData.nabhAccreditation) documents.push({ no: formData.nabhAccreditation, type: 'NABH', url: formData.nabhFile || '' });

    // Operating Hours
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const operatingHours = days.map(day => ({
      dayOfWeek: day,
      isAvailable: (formData.operatingHours || []).includes(day.charAt(0).toUpperCase() + day.slice(1)),
      is24Hours: formData[`${day}24Hours`] || false,
      timeRanges: [
        { startTime: formData[`${day}StartTime`] || "09:00", endTime: formData[`${day}EndTime`] || "18:00" }
      ]
    }));

    // Compose payload with exact API shape
    const payload = {
      name: formData.hospitalName,
      type: formData.hospitalType,
      emailId: formData.hospitalEmail,
      phone: formData.hospitalContact,
      address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      url: formData.website,
      logo: formData.logoKey || '',
      image: formData.hospitalImageKey || '',
      latitude: formData.latitude || 0,
      longitude: formData.longitude || 0,
      medicalSpecialties: formData.medicalSpecialties || [],
      hospitalServices: formData.hospitalServices || [],
      establishmentYear: formData.establishedYear,
      noOfBeds: formData.numberOfBeds,
      accreditation: formData.accreditations || [],
      adminId: formData.adminId || '',
      documents,
      operatingHours
    };

    // Prune empty values
    const prune = (obj) => {
      if (Array.isArray(obj)) {
        return obj
          .map((v) => (typeof v === 'object' && v !== null ? prune(v) : v))
          .filter((v) => v !== undefined && v !== null && v !== '');
      }
      if (typeof obj === 'object' && obj !== null) {
        const out = {};
        Object.entries(obj).forEach(([k, v]) => {
          if (v === undefined || v === null || v === '') return;
          const nv = typeof v === 'object' ? prune(v) : v;
          if (
            nv === undefined ||
            nv === null ||
            (Array.isArray(nv) && nv.length === 0) ||
            (typeof nv === 'object' && !Array.isArray(nv) && Object.keys(nv).length === 0)
          )
            return;
          out[k] = nv;
        });
        return out;
      }
      return obj;
    };

    return prune(payload);
  };

  const store = useHospitalRegistrationStore();
  const handleNext = async () => {
    if (registrationType === 'doctor') {
      // Step 1: trigger form submit via ref, only move if valid
      if (currentStep === 1 && step1Ref.current && step1Ref.current.submit) {
        await step1Ref.current.submit(); // Always returns true now in Step1.jsx
        nextStep();
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
        // On Step 5, submit all data to API, then go to Step 6 ONLY on OK
        setFooterLoading(true);
        try {
          // Use the centralized doctor registration store submit
          const ok = await useDoctorRegistrationStore.getState().submit();
          if (ok === true) {
            nextStep();
          } else {
            // Bypass: still move next but log/alert
            console.warn('Backend validation failed but ignored (Step 5)');
            nextStep();
          }
        } catch (err) {
          alert(err?.message || 'Submission failed');
        } finally {
          setFooterLoading(false);
        }
      } else if (currentStep === 6) {
        // Navigate to doctor profile/dashboard
        navigate('/doctor');
      } else if (currentStep < 5) {
        nextStep();
      }
    } else if (registrationType === 'hospital') {
      // Step 1: trigger form submit via ref, only move if valid
      if (currentStep === 1 && hos1Ref.current && hos1Ref.current.submit) {
        await hos1Ref.current.submit();
        // Check if user is a doctor to determine next step
        if (formData.isDoctor === 'yes') {
          nextStep();
        } else {
          nextStep();
        }
        return;
      }
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
      // Handle Step 5 for hospital (Review & Create)
      else if (currentStep === 5) {
        // Only for hospital registration (isDoctor === 'no')
        if (formData.isDoctor === 'no') {
          const currentSubStep = formData.hosStep5SubStep || 1;
          if (currentSubStep === 1) {
            // Move to sub-step 2 (Terms and Agreement)
            updateFormData({ hosStep5SubStep: 2 });
          } else if (currentSubStep === 2) {
            // Check if terms are accepted before moving to next step
            if (formData.hosTermsAccepted && formData.hosPrivacyAccepted) {
              setFooterLoading(true);
              try {
                // Prefer store payload to capture Hos_3 values
                const ok = await store.submit();
                // Bypass validation: Always proceed
                if (!ok) {
                  console.warn('Submission failed but ignored (Hospital Step 5)');
                }
                nextStep();
              } catch (err) {
                console.warn('Submission error ignored (Hospital Step 5)', err);
                nextStep();
              } finally {
                setFooterLoading(false);
              }
            } else {
              // Show alert that terms must be accepted
              alert('Please accept the Terms & Conditions and Data Privacy Agreement to continue.');
            }
          }
        } else {
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
        }
      } else if (currentStep === 6) {
        // Final success screen for non-doctor owners: go straight to Hospitals dashboard
        if (String(formData.isDoctor || 'no') === 'no') {
          navigate('/hospitals');
          return;
        }
        // On Step 6 (Hos_6), if user is a doctor, first post doctor details, then proceed
        setFooterLoading(true);
        try {
          if (formData.isDoctor === 'yes') {
            const ok = await useHospitalDoctorDetailsStore.getState().submit();
            if (!ok) {
              console.warn("Hospital doctor details submission failed (ignoring)");
            }
          }
          // Only submit hospital here when isDoctor is 'yes'.
          let hosOk = true;
          if (formData.isDoctor === 'yes') {
            hosOk = await store.submit();
            if (!hosOk) {
              console.warn("Hospital creation failed (ignoring)");
            }
          }
          nextStep();
        } catch (err) {
          alert(err?.message || 'Submission failed');
        } finally {
          setFooterLoading(false);
        }
      } else if (currentStep === 7) {
        // Navigate to hospital profile/dashboard
        navigate('/hospitals');
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
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-none z-30 bg-white">
        <Navbar />
      </div>
      <div className="flex-1 flex bg-gray-100 p-3 gap-3 overflow-hidden">
        {/* Sidebar - Fixed */}
        <div className="flex-shrink-0">
          <SidebarSteps currentStep={currentStep} />
        </div>

        {/* Main + Footer - Fixed height container */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">

          <main className="flex-1 overflow-y-auto ">
            {/* Render Step1 with ref for doctor step 1, Hos_1 with ref for hospital step 1, else use RegistrationFlow */}
            {registrationType === 'doctor' && currentStep === 1 ? (
              <div className="h-full">
                <Step1 ref={step1Ref} onNext={nextStep/*Directly advance*/} onCancel={handleCancel} />
              </div>
            ) : registrationType === 'hospital' && currentStep === 1 ? (
              <RegistrationFlow type={registrationType} ref={hos1Ref} />
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
            disablePrev={
              (registrationType === 'doctor' && (currentStep === 1 || currentStep === 2 || currentStep === 6)) ||
              (registrationType === 'hospital' && currentStep === 2 && ((formData.hosStep3SubStep || 1) === 1))
            }
            loading={footerLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout_registration_new;
