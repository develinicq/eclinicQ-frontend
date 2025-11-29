import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HelpCircle, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
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
import AvatarCircle from "../../components/AvatarCircle";

const DocSidebar = () => {
  const location = useLocation();
  const isSettingsRoute = location.pathname.startsWith("/doc/settings");
  const [openSettings, setOpenSettings] = useState(isSettingsRoute);

  useEffect(() => {
    // Auto open when user navigates to a settings page
    if (isSettingsRoute) setOpenSettings(true);
  }, [isSettingsRoute]);

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

  const settingsSubItems = [
    { label: "My Account", to: "/doc/settings/account" },
    { label: "Consultation Details", to: "/doc/settings/consultation" },
    { label: "Clinics Details", to: "/doc/settings/clinics" },
    { label: "Staff Permissions", to: "/doc/settings/staff-permissions" },
    { label: "Security Settings", to: "/doc/settings/security" },
  ];

  return (
    <div className="sidebar flex flex-col justify-between min-h-screen w-[210px] bg-white border-r border-[#D6D6D6]">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="px-4 py-3">
          <img src={logo} alt="logo" className="w-[128px] h-auto" />
        </div>

        {/* Hospital selector card (below logo) */}
        <div className="px-3 pb-2 mb-3 mt-2">
          <div className="w-full border-[0.5px] border-[#B8B8B8] rounded-md px-2 py-2 bg-white flex items-center gap-2">
            <AvatarCircle name="Manipal Hospital" size="s" color="orange" className="shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-gray-900 truncate">Manipal Hospit...</div>
              <div className="text-[11px] text-gray-500 leading-tight">Hospital</div>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>

        {/* Menu Items */}
        <nav>
          {menuItems.map((item) => {
            if (item.name !== "Settings") {
              return (
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
              );
            }

            // Settings group (collapsible)
            return (
              <div key="Settings" className="">
                <button
                  type="button"
                  onClick={() => setOpenSettings((v) => !v)}
                  className={`w-full flex items-center justify-between py-3 px-4 h-[44px] transition-colors ${
                    isSettingsRoute
                      ? "bg-[#2372EC] text-white border-l-[3px] border-[#96BFFF]"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <span className="inline-flex items-center gap-[6px]">
                    <img src={settingUnselect} alt="Settings" className="w-5 h-5" />
                    <span className="font-normal text-sm">Settings</span>
                  </span>
                  {openSettings ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {openSettings && (
                  <div className="ml-5 pl-3 border-l border-gray-200">
                    {settingsSubItems.map((s) => (
                      s.subItems ? (
                        <div key={s.to}>
                          <NavLink
                            to={s.to}
                            className={({ isActive }) =>
                              `block text-sm px-3 py-2 my-[2px] rounded-sm ${
                                isActive ? "bg-blue-50 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                              }`
                            }
                          >
                            {s.label}
                          </NavLink>
                          <div className="ml-4">
                            {s.subItems.map((sub) => (
                              <NavLink
                                key={sub.to}
                                to={sub.to}
                                className={({ isActive }) =>
                                  `block text-xs px-3 py-1 my-[2px] rounded-sm ${
                                    isActive ? "bg-blue-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                                  }`
                                }
                              >
                                {sub.label}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <NavLink
                          key={s.to}
                          to={s.to}
                          className={({ isActive }) =>
                            `block text-sm px-3 py-2 my-[2px] rounded-sm ${
                              isActive ? "bg-blue-50 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                            }`
                          }
                        >
                          {s.label}
                        </NavLink>
                      )
                    ))}
                  </div>
                )}
              </div>
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

export default DocSidebar;
