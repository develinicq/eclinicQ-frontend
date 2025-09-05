import React from "react";
import { Check, FileText, User, Building2, ClipboardList, CreditCard, Stethoscope, CheckCircle, Package, ChevronRight } from "lucide-react";
import { useRegistration } from "../../context/RegistrationContext"; 

const doctorSteps = [
  { 
    id: 1, 
    title: "Account Creation", 
    icon: (isCompleted, isCurrent) => (
      <img 
        src="/icons/Sidebar/Registration_Steps/Account/account_blue.png" 
        className={`w-6 ${!isCompleted && !isCurrent ? 'grayscale opacity-50' : ''}`} 
        alt="Account" 
      />
    )
  },
  { 
    id: 2, 
    title: "Professional Details", 
    icon: (isCompleted, isCurrent) => (
      <img 
        src="/icons/Sidebar/Registration_Steps/Doctor/sthesoscope_blue.png" 
        className={`w-6 ${!isCompleted && !isCurrent ? 'grayscale opacity-50' : ''}`} 
        alt="Stethoscope" 
      />
    )
  },
  { 
    id: 3, 
    title: "Documents Verification", 
    icon: (isCompleted, isCurrent) => (
      <img 
        src="/icons/Sidebar/Registration_Steps/Document/document_blue.png" 
        className={`w-6 ${!isCompleted && !isCurrent ? 'grayscale opacity-50' : ''}`} 
        alt="Document" 
      />
    )
  },
  { 
    id: 4, 
    title: "Review & Create", 
    icon: (isCompleted, isCurrent) => (
      <img 
        src="/icons/Sidebar/Registration_Steps/Review/review_blue.png" 
        className={`w-6 ${!isCompleted && !isCurrent ? 'grayscale opacity-50' : ''}`} 
        alt="Review" 
      />
    )
  },
  { 
    id: 5, 
    title: "Package & Payment", 
    icon: (isCompleted, isCurrent) => (
      <img 
        src="/icons/Sidebar/Registration_Steps/Package/package_blue.png" 
        className={`w-6 ${!isCompleted && !isCurrent ? 'grayscale opacity-50' : ''}`} 
        alt="Package" 
      />
    )
  },
  { id: 6, title: "Registration Complete", icon: <CheckCircle size={20} /> },
];

const hospitalSteps = [
  { 
    id: 1, 
    title: "Account Creation", 
    icon: (isCompleted, isCurrent) => (
      <img 
        src="/icons/Sidebar/Registration_Steps/Account/account_blue.png" 
        className={`w-6 ${!isCompleted && !isCurrent ? 'grayscale opacity-50' : ''}`} 
        alt="Account" 
      />
    )
  },
  { 
    id: 2, 
    title: "Doctor Registration", 
    icon: (isCompleted, isCurrent) => (
      <img 
        src="/icons/Sidebar/Registration_Steps/Doctor/sthesoscope_blue.png" 
        className={`w-6 ${!isCompleted && !isCurrent ? 'grayscale opacity-50' : ''}`} 
        alt="Stethoscope" 
      />
    )
  },
  { 
    id: 3, 
    title: "Hospital Details", 
    icon: (isCompleted, isCurrent) => (
      <img 
        src="/icons/Sidebar/Registration_Steps/Hospital/hospital.png" 
        className={`w-6 ${!isCompleted && !isCurrent ? 'grayscale opacity-50' : ''}`} 
        alt="Document" 
      />
    )
  },
  { 
    id: 4, 
    title: "Documents Verification", 
    icon: (isCompleted, isCurrent) => (
      <img 
        src="/icons/Sidebar/Registration_Steps/Document/document_blue.png" 
        className={`w-6 ${!isCompleted && !isCurrent ? 'grayscale opacity-50' : ''}`} 
        alt="Document" 
      />
    )
  },
  { 
    id: 5, 
    title: "Review & Create", 
    icon: (isCompleted, isCurrent) => (
      <img 
        src="/icons/Sidebar/Registration_Steps/Review/review_blue.png" 
        className={`w-6 ${!isCompleted && !isCurrent ? 'grayscale opacity-50' : ''}`} 
        alt="Review" 
      />
    )
  },
  { 
    id: 6, 
    title: "Package & Payment", 
    icon: (isCompleted, isCurrent) => (
      <img 
        src="/icons/Sidebar/Registration_Steps/Package/package_blue.png" 
        className={`w-6 ${!isCompleted && !isCurrent ? 'grayscale opacity-50' : ''}`} 
        alt="Package" 
      />
    )
  },
  { id: 7, title: "Registration Complete", icon: <CheckCircle size={20} /> },
];

export default function SidebarSteps({ currentStep }) {
  const { registrationType, formData } = useRegistration();

  // For hospital registration, conditionally show steps based on isDoctor selection
  let steps;
  if (registrationType === 'doctor') {
    steps = doctorSteps;
  } else if (registrationType === 'hospital') {
    // If user is not a doctor, hide the Doctor Registration step (step 2)
    if (formData.isDoctor === 'no') {
      steps = hospitalSteps.filter(step => step.id !== 2);
    } else {
      steps = hospitalSteps;
    }
  } else {
    steps = hospitalSteps;
  }
  
  const title = registrationType === 'doctor' ? 'Doctor Registration Form' : 'Hospital Registration Form';

  // Helper function to render icon
  const renderIcon = (step, isCompleted, isCurrent) => {
    if (typeof step.icon === 'function') {
      return step.icon(isCompleted, isCurrent);
    }
    return step.icon;
  };

  return (
    <div className="h-full px-6 pb-9 pt-6 gap-6 bg-white w-[307px] flex flex-col">
      {/* Header */}
      <div className="">
        <h2 className="text-sm font-semibold text-[#8E8E8E]">
          {title}
        </h2>
      </div>

      {/* Steps */}
      <div className="w-[259px] flex flex-col relative">
        {/* Vertical connecting line */}
        <div className="absolute left-[26px] top-[26px] bottom-[26px] w-[1px] bg-[#E8E8E8]"></div>
        
        <div className="space-y-7">
          {steps.map((step, index) => {
            // For hospital registration when step 2 is hidden, adjust step numbers
            let adjustedStepNumber = step.id;
            if (registrationType === 'hospital' && formData.isDoctor === 'no' && step.id > 2) {
              adjustedStepNumber = step.id - 1;
            }
            
            const isCompleted = adjustedStepNumber < currentStep;
            const isCurrent = adjustedStepNumber === currentStep;
            const isUpcoming = adjustedStepNumber > currentStep;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-center group cursor-pointer">
                {/* Icon Circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className={`w-[52px] h-[52px] rounded-full flex items-center justify-center border-[0.5px]  transition-all duration-200
                    ${isCompleted ? "bg-[#F2FFF3] border-[#6DDB724D]" : ""}
                    ${isCurrent ? "bg-[#F8FAFF] border-[#E4EFFF]" : ""}
                    ${isUpcoming ? "border-[#D6D6D680] bg-[#F9F9F9]" : ""}
                  `}
                  >

                    {isCompleted ? (
                      <div className="w-6 h-6 border-[1.5px] border-[#2E7D32] bg-[#6DDB72] rounded-full flex items-center justify-center">
                        <Check size={14} className="text-[#2E7D32]" />
                        
                      </div>
                    ) : (
                      <div
                        className={`
                        ${isCurrent ? "text-blue-500 " : ""}
                        ${isUpcoming ? "text-gray-400" : ""}
                      `}
                      >
                        {renderIcon(step, isCompleted, isCurrent)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="ml-[9px] flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-normal text-[#626060] ">
                        Step {adjustedStepNumber}
                      </p>
                      <p
                        className={`text-sm font-medium
                        ${isCompleted ? "text-[#424242]" : ""}
                        ${isCurrent ? "text-[#0D47A1]" : ""}
                        ${isUpcoming ? "text-[#424242]" : ""}
                      `}
                      >
                        {step.title}
                      </p>
                      {isCompleted && (
                        <p className="text-xs text-[#3EAF3F]">
                          Completed
                        </p>
                      )}
                      {isCurrent && (
                        <div className="mt-1">
                          <div className="w-8 h-1.5 border-[0.5px] border-[#8E8E8E] rounded-full">
                            <div className="w-1/2 h-full bg-[#6DDB72] rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Arrow for current step */}
                    {isCurrent && (
                      <ChevronRight size={20} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
