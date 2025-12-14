import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HelpCircle, ArrowRight, ChevronDown, ChevronUp, Building2, Circle, CircleDot, Plus } from "lucide-react";
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
  // Switch account popover state
  const [showSwitch, setShowSwitch] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("chauhan");
  const switchRef = useRef(null);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });

  const accounts = [
    {
      id: "chauhan",
      name: "Chauhan Clinic",
      type: "Clinic",
      location: "Baner, Pune",
      isSelf: true,
      color: "orange",
    },
    {
      id: "manipal",
      name: "Manipal Hospitals Life's On",
      type: "Hospital",
      location: "",
      isSelf: false,
      color: "blue",
    },
  ];

  useEffect(() => {
    // Auto open when user navigates to a settings page
    if (isSettingsRoute) setOpenSettings(true);
  }, [isSettingsRoute]);

  // Close popover on outside click / escape
  useEffect(() => {
    const onClick = (e) => {
      const clickedInsideTrigger = switchRef.current && switchRef.current.contains(e.target);
      const clickedInsidePopover = popoverRef.current && popoverRef.current.contains(e.target);
      if (showSwitch && !clickedInsideTrigger && !clickedInsidePopover) {
        setShowSwitch(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setShowSwitch(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [showSwitch]);

  // Position popover directly under trigger, left-aligned with slight inset
  useEffect(() => {
    if (showSwitch && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const WIDTH = 320;
      const INSET_X = 2; // slight left inset
      const GAP_Y = 4; // small vertical gap
      let left = rect.left + INSET_X;
      let top = rect.bottom + GAP_Y;
      if (left + WIDTH > window.innerWidth - 8) left = window.innerWidth - WIDTH - 8;
      if (left < 8) left = 8;
      const EST_HEIGHT = 300;
      if (top + EST_HEIGHT > window.innerHeight - 8) top = Math.max(8, window.innerHeight - EST_HEIGHT - 8);
      setPopoverPos({ top, left });
    }
  }, [showSwitch]);

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

        {/* Hospital selector card (below logo) + Switch Account popover */}
        <div className="px-3 pb-2 mb-3 mt-2 relative" ref={switchRef}>
          <button
            type="button"
            onClick={() => setShowSwitch((v) => !v)}
            className={`w-full border-[0.5px] border-[#B8B8B8] rounded-md px-2 py-2 bg-white flex items-center gap-2 hover:bg-gray-50 ${showSwitch ? 'ring-1 ring-[#2372EC]/30' : ''}`}
            ref={triggerRef}
            aria-haspopup="true"
            aria-expanded={showSwitch}
          >
            <AvatarCircle name="Manipal Hospital" size="s" color="orange" className="shrink-0" />
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[13px] font-medium text-gray-900 truncate">Manipal Hospit...</div>
              <div className="text-[11px] text-gray-500 leading-tight">Hospital</div>
            </div>
            <ChevronDown size={16} className={`text-gray-500 transition-transform ${showSwitch ? 'rotate-180' : ''}`} />
          </button>

          {showSwitch && (
            <div
              ref={popoverRef}
              className="fixed z-[1000] rounded-md border border-[#D0D7E2] bg-white shadow-lg"
              style={{ top: popoverPos.top, left: popoverPos.left, width: 320 }}
              role="dialog"
              aria-label="Switch Account"
            >
              <div className="absolute -top-2 left-8 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-white" />
              <div className="px-3 pt-3 pb-2">
                <div className="text-[11px] font-semibold tracking-wide text-gray-600">SWITCH ACCOUNT</div>
              </div>
              <div className="px-2 pb-2">
                {accounts.map((acc, i) => (
                  <React.Fragment key={acc.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedAccount(acc.id)}
                      className={`w-full flex items-center gap-2 px-2 py-2 rounded text-left ${selectedAccount === acc.id ? 'bg-[#F7FAFF]' : 'hover:bg-gray-50'}`}
                    >
                      {/* custom radio */}
                      <span className={`shrink-0 w-4 h-4 rounded-full border flex items-center justify-center ${selectedAccount === acc.id ? 'border-[#2372EC] bg-[#2372EC]' : 'border-gray-400 bg-white'}`}>
                        {selectedAccount === acc.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                      <span className="shrink-0 w-5 h-5 rounded-sm bg-[#F3F8FF] border border-[#BFD6FF] flex items-center justify-center">
                        <Building2 size={14} className="text-[#2372EC]" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-gray-900 truncate">{acc.name}</div>
                        <div className="text-[11px] text-gray-500 truncate">{acc.type}{acc.location ? ` | ${acc.location}` : ''}</div>
                      </div>
                      {acc.isSelf && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded border border-green-300 bg-green-50 text-green-700 font-medium">Self</span>
                      )}
                    </button>
                    {i === 0 && (
                      <button
                        type="button"
                        className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-50 text-[#2372EC]"
                      >
                        <Plus size={16} />
                        <span className="text-[13px]">Add Branch</span>
                      </button>
                    )}
                    {i === 0 && <div className="my-1 border-t border-gray-200" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
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
