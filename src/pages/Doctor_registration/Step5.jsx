<<<<<<< HEAD
import React, { useState } from "react";

const plans = [
  {
    title: "Tire 1",
    price: "₹3K",
    period: "per month",
    features: [
      "Minimum 3 Users Can Invited",
      "Daily Queue limit 20",
      "Can Access Complete System",
    ],
    color: "bg-green-500",
  },
  {
    title: "Tire 2",
    price: "₹5K",
    period: "per month",
    features: [
      "Minimum 5 Users Can Invited",
      "Daily Queue limit 20 - 50",
      "Can Access Complete System",
    ],
    color: "bg-blue-500",
  },
  {
    title: "Tire 3",
    price: "₹3K",
    period: "per month",
    features: [
      "Minimum 3 Users Can Invited",
      "Personalized Dashboards",
      "Can Access Complete System",
    ],
    color: "bg-indigo-500",
  },
  {
    title: "Tire 4",
    price: "₹3K",
    period: "per month",
    features: [
      "Minimum 3 Users Can Invited",
      "Personalized Dashboards",
      "Can Access Complete System",
    ],
    color: "bg-purple-500",
  },
];

const Packages = () => {
  // keep track of selected plan
  const [selectedPlan, setSelectedPlan] = useState("Tire 1");

  return (
    <div className="flex flex-col items-center p-8 bg-white h-full">
      <h2 className="text-2xl font-bold mb-2">Package & Payment</h2>
      <p className="text-gray-500 mb-8">
        Select the suitable package and make the payment to activate the account.
      </p>
      <div className="grid grid-cols-2 gap-6">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.title;

          return (
            <div
              key={index}
              className={`w-[330px] transition-colors h-auto border rounded-lg shadow-sm p-4 flex flex-col ${
                isSelected ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {/* Top Row with colored div + Title/Price */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg ${plan.color}`}></div>
                <div>
                  <h3 className="font-semibold">{plan.title}</h3>
                  <p className="text-lg font-bold">
                    {plan.price}{" "}
                    <span className="text-sm">{plan.period}</span>
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mt-4 space-y-2">
                <p className="font-medium">Access To:</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span>✔️</span>
                    <p className="text-sm">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                onClick={() => setSelectedPlan(plan.title)}
                className={`mt-4 py-2 rounded transition-colors ${
                  isSelected
                    ? "bg-white text-blue-600 font-semibold"
                    : " bg-blue-600 text-white"
                }`}
              >
                {isSelected ? "Selected Plan" : "Choose"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Packages;
=======
import React, { useState } from "react";
import { useRegistration } from "../../context/RegistrationContext";

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

const Hos_6 = () => {
  const { updateFormData, formData } = useRegistration();
  
  // keep track of selected plan
  const [selectedPlan, setSelectedPlan] = useState(formData.hosSelectedPlan || "Basic Hospital");

  // Update form data when plan changes
  const handlePlanSelection = (planTitle) => {
    setSelectedPlan(planTitle);
    updateFormData({ hosSelectedPlan: planTitle });
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white h-full">
      <h2 className="text-2xl font-bold mb-2"> Package & Payment</h2>
      <p className="text-gray-500 mb-8">
        Select the suitable package for your hospital size and make the payment to activate the account.
      </p>
      <div className="grid grid-cols-2 gap-6">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.title;

          return (
            <div
              key={index}
              className={`w-[330px] transition-colors h-auto border-[0.5px] rounded-lg shadow-sm p-4 flex gap-3 flex-col ${
                isSelected ? "bg-blue-600 text-white border-[#0E4395]" : "bg-white"
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

              <hr className="mt-1"/>

              {/* Button */}
              <button
                onClick={() => handlePlanSelection(plan.title)}
                className={`py-2 rounded transition-colors ${
                  isSelected
                    ? "bg-white text-blue-600 font-semibold"
                    : " bg-blue-600 text-white"
                }`}
              >
                {isSelected ? "Selected Plan" : "Choose"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hos_6;
>>>>>>> dev
