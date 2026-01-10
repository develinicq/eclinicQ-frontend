import React, { useState, forwardRef, useImperativeHandle } from "react";
import useDoctorRegistrationStore from '../../../../store/useDoctorRegistrationStore';
import { RegistrationHeader } from '../../../../components/FormItems';
import { activateDoctor } from '../../../../services/doctorService';
import useToastStore from '../../../../store/useToastStore';
import { useRegistration } from '../../../context/RegistrationContext';
import { Loader2 } from 'lucide-react';
import useDoctorStep1Store from '../../../../store/useDoctorStep1Store';

const plans = [
  {
    title: "Basic Hospital",
    price: "₹5K",
    period: "per month",
    features: [
      "Up to 10 Doctors",
      "Daily Patient Limit: 50",
      "Basic Analytics Dashboard",
    ],
    image: "/package_page/1.png",
  },
  {
    title: "Standard Hospital",
    price: "₹8K",
    period: "per month",
    features: [
      "Up to 25 Doctors",
      "Daily Patient Limit: 100",
      "Advanced Analytics",
    ],
    image: "/package_page/2.png",
  },
  {
    title: "Premium Hospital",
    price: "₹12K",
    period: "per month",
    features: [
      "Unlimited Doctors",
      "Unlimited Patients",
      "Custom Integrations",
    ],
    image: "/package_page/3.png",
  },
  {
    title: "Enterprise Hospital",
    price: "₹20K",
    period: "per month",
    features: [
      "Multi-Branch Support",
      "Advanced Security",
      "Custom Development",
    ],
    image: "/package_page/4.png",
  },
];

const Step5 = forwardRef((props, ref) => {
  const [selectedPlan, setSelectedPlan] = useState("Basic Hospital");
  const [loading, setLoading] = useState(false);
  const { userId: regUserId } = useDoctorRegistrationStore();
  const { userId: step1UserId } = useDoctorStep1Store();
  const addToast = useToastStore((state) => state.addToast);
  const { nextStep } = useRegistration();

  const userId = regUserId || step1UserId;

  // Expose a dummy submit to prevent parent form from triggering unwanted store actions
  // Expose submit to parent Layout_registration_new
  useImperativeHandle(ref, () => ({
    submit: async () => {
      if (!userId) {
        addToast({ title: 'Error', message: 'User ID is missing. Cannot activate.', type: 'error' });
        return false;
      }

      try {
        setLoading(true);
        console.log("Activating doctor via Footer/Ref with ID:", userId);
        const res = await activateDoctor(userId);

        if (res && res.success) {
          addToast({ title: 'Success', message: 'Account activated successfully!', type: 'success' });
          return true; // Signal success to parent
        } else {
          addToast({ title: 'Error', message: res?.message || 'Activation failed', type: 'error' });
          return false;
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Activation failed';
        addToast({ title: 'Error', message: errorMessage, type: 'error' });
        return false;
      } finally {
        setLoading(false);
      }
    }
  }), [userId]);

  const handlePlanSelection = (planTitle) => {
    setSelectedPlan(planTitle);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-md shadow-sm overflow-hidden">
      <RegistrationHeader
        title="Package & Payment"
        subtitle="Select the suitable package for your hospital size and make the payment to activate the account."
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col items-center max-w-[700px] mx-auto">
          <div className="grid grid-cols-2 gap-6">
            {plans.map((plan, index) => {
              const isSelected = selectedPlan === plan.title;
              return (
                <div
                  key={index}
                  onClick={() => handlePlanSelection(plan.title)}
                  className={`w-[330px] transition-colors h-auto border-[0.5px] rounded-lg shadow-sm p-4 flex gap-3 flex-col cursor-pointer ${isSelected ? "bg-blue-600 text-white border-[#0E4395]" : "bg-white"
                    }`}
                >
                  {/* Top Row with package image + Title/Price */}
                  <div className="flex items-center gap-3">
                    <img src={plan.image} alt={plan.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-normal text-sm">{plan.title}</h3>
                      <p className="text-xl font-semibold flex gap-2">
                        {plan.price}{" "}
                        <span className="text-lg">{plan.period}</span>
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-2 space-y-2">
                    <p className="font-medium">Access to:</p>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <img src="/normal-tick.png" className="w-6 h-6" alt="" />
                        <p className="text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>

                  <hr className="mt-1" />

                  {/* Button */}
                  <button
                    type="button"
                    className={`py-2 rounded transition-colors flex justify-center items-center gap-2 ${isSelected
                      ? "bg-white text-blue-600 font-semibold"
                      : " bg-blue-600 text-white"
                      }`}
                  >
                    {isSelected ? "Selected" : "Choose"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Step5;
