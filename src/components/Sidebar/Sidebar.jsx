import React from "react";
import { NavLink } from "react-router-dom";
import { Home, User, Hospital, Users, Settings, HelpCircle, ArrowRight } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Doctors", icon: <User size={18} />, path: "/doctor" },
    { name: "Hospitals", icon: <Hospital size={18} />, path: "/hospital" },
    { name: "Patients", icon: <Users size={18} />, path: "/patients" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <div className="sidebar flex flex-col justify-between min-h-screen w-[210px] bg-white border-r border-[#D6D6D6]">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="px-4 py-3">
          <img
            src="/logo.png"
            alt="logo"
            className="w-[128px] h-auto"
          />
        </div>

        {/* Menu Items */}
        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-[6px] py-3 px-4 h-[44px] w-full text-left transition-colors ${
                  isActive
                    ? "bg-[#2372EC] text-white border-l-[3px] border-[#96BFFF] "
                    : "text-gray-800 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              <span className="font-normal text-sm">{item.name}</span>
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

export default Sidebar;
