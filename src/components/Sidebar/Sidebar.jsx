import React from "react";
import { Link, useLocation } from "react-router-dom";
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

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      iconSelected: dashboardSelected,
      iconUnselected: dashboardUnselect,
      path: "/dashboard",
      alt: "Dashboard",
    },
    {
      name: "Doctors",
  iconSelected: doctorSelect,
  iconUnselected: doctorUnselect,
      path: "/doctor",
      alt: "Doctors",
    },
    {
      name: "Hospitals",
  iconSelected: hospitalSelected,
  iconUnselected: hospitalUnselect,
      path: "/hospital",
      alt: "Hospitals",
    },
    {
      name: "Patients",
      iconSelected: patientUnselect,
      iconUnselected: patientUnselect,
      path: "/patients",
      alt: "Patients",
    },
    {
      name: "Settings",
      iconSelected: settingUnselect,
      iconUnselected: settingUnselect,
      path: "/settings",
      alt: "Settings",
    },
  ];

  const isItemActive = (itemPath) => {
    const pathname = location.pathname || "";
    // Treat registration routes as part of Dashboard
    const dashboardLike = pathname.startsWith("/register/doctor") || pathname.startsWith("/register/hospital");

    if (itemPath === "/dashboard") {
      return pathname.startsWith("/dashboard") || dashboardLike;
    }
    return pathname === itemPath || pathname.startsWith(itemPath + "/");
  };

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
          {menuItems.map((item) => {
            const active = isItemActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-[6px] py-3 px-4 h-[44px] w-full text-left transition-colors ${
                  active
                    ? "bg-[#2372EC] text-white border-l-[3px] border-[#96BFFF] "
                    : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                <img
                  src={active ? item.iconSelected : item.iconUnselected}
                  alt={item.alt}
                  className="w-5 h-5"
                />
                <span className="font-normal text-sm">{item.name}</span>
              </Link>
            );
          })}
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

export default Sidebar;
