import React, { useState } from "react";
import Details from "../../../pages/HospitalList/HospitalInfo/Sections/Details";
import Doctor from "../../../pages/HospitalList/HospitalInfo/Sections/Doctor";
import HosStaff from "../../../pages/HospitalList/HospitalInfo/Sections/HosStaff";

const HospitalNav = () => {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { key: "details", label: "Hospital Details" },
    { key: "doctor", label: "Doctors" },
    { key: "branch", label: "Branches" },
    { key: "surgery", label: "Surgeries Details" },
    { key: "staff", label: "Staff Access" },
    { key: "settings", label: "Settings" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return <Details/>;
      case "doctor":
        return <Doctor/>;
      case "staff":
        return <HosStaff />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 
              ${activeTab === tab.key ? "text-blue-600" : ""}`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default HospitalNav;
