import React from "react";
import { NavLink } from "react-router-dom";
import { HelpCircle, ArrowRight } from "lucide-react";
// Use icons from public/index.js (MainSidebar icons)
import {
  logo,
  dashboardSelected,
  dashboardUnselect,
  doctorSelect,
  doctorUnselect,
  hospitalSelected,
  hospitalUnselect,
  patientUnselect,
  settingUnselect,
} from "../../../public/index.js";

const DocSidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      iconSelected: dashboardSelected,
      iconUnselected: dashboardUnselect,
      path: "/doc",
      alt: "Dashboard",
    },
    {
      name: "Queue",
      iconSelected: patientUnselect, // Using patient icon for queue (will need to find a better selected version)
      iconUnselected: patientUnselect,
      path: "/doc/queue",
      alt: "Queue",
    },
    {
      name: "Patients",
      iconSelected: doctorSelect, // Swapping to use doctor icons for patients
      iconUnselected: doctorUnselect,
      path: "/doc/patients",
      alt: "Patients",
    },
    {
      name: "Calendar",
      iconSelected: hospitalSelected,
      iconUnselected: hospitalUnselect,
      path: "/doc/calendar",
      alt: "Calendar",
    },
    {
      name: "Settings",
      iconSelected: settingUnselect,
      iconUnselected: settingUnselect,
      path: "/doc/settings",
      alt: "Settings",
    },
  ];

  return (
    <div className="sidebar flex flex-col justify-between min-h-screen w-[210px] bg-white border-r border-[#D6D6D6]">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="px-4 py-3">
          <img src={logo} alt="logo" className="w-[128px] h-auto" />
        </div>

        {/* Menu Items */}
        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/doc"}
              className={({ isActive }) =>
                `flex items-center gap-[6px] py-3 px-4 h-[44px] w-full text-left transition-colors ${
                  isActive
                    ? "bg-[#2372EC] text-white border-l-[3px] border-[#96BFFF] "
                    : "text-gray-800 hover:bg-gray-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? item.iconSelected : item.iconUnselected}
                    alt={item.alt}
                    className="w-5 h-5"
                  />
                  <span className="font-normal text-sm">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      
      </div>

    

      {/* Bottom Section */}
      <div className="px-4 py-3 border-t border-[#D6D6D6] flex justify-between items-center text-[#626060]">
        <div
          className={`flex items-center gap-[6px] w-full text-left `}
        >
          <HelpCircle size={18} /> Help & Support
        </div>

        <div>
            <ArrowRight size={18}/>
        </div>
      </div>
    </div>
  );
};

export default DocSidebar;
