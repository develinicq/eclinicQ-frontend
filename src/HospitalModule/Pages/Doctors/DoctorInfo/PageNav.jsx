import React, { useState } from "react";
import Info from "./Sections/Info";
import Consultation from "./Sections/Consultation";

const PageNav = ({ doctor }) => {
    const [activeTab, setActiveTab] = useState("personal");

    const tabs = [
        { key: "personal", label: "Personal Info" },
        { key: "consultation", label: "Consultation Details" },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "personal":
                return <Info doctor={doctor} />;
            case "consultation":
                return <Consultation doctor={doctor} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full bg-secondary-grey50 ">
            {/* Tabs */}
            <div className="px-2 border-b border-secondary-grey100">
                <nav className="px-2 flex items-center gap-2 overflow-x-auto text-sm">
                    {tabs.map((t) => {
                        const active = activeTab === t.key;
                        return (
                            <button
                                key={t.key}
                                onClick={() => setActiveTab(t.key)}
                                className={`whitespace-nowrap px-[6px] py-1 pb-2 border-b-2 transition-colors ${active
                                    ? "border-blue-primary250 text-blue-primary250"
                                    : "border-transparent text-secondary-grey300 hover:text-gray-900"
                                    }`}
                            >
                                {t.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Content */}
            <div className=" bg-secondary-grey50">{renderContent()}</div>
        </div>
    );
};

export default PageNav;
