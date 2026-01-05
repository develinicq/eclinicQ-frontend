import React, { useEffect, useRef, useState } from "react";
import { X, Calendar, MoreHorizontal, ChevronDown, CheckCircle2, Phone, Mail, MapPin, Globe, Droplet, User, ArrowRight, ArrowUp, Pencil, Plus, AlertTriangle, Heart, Meh, Syringe, Trash2, Users } from "lucide-react";
// Adjusting import assuming src/public/index.js exists
import { drawerCross } from "../../../../public/index.js";
import AvatarCircle from "../../../components/AvatarCircle";
import Badge from "../../../components/Badge.jsx";
import ScheduleAppointmentDrawer from "../../../components/PatientList/ScheduleAppointmentDrawer";

function Row({ label, value }) {
    return (
        <div className="flex items-center text-sm text-secondary-grey300">
            <div className="w-[251px]">{label}</div>
            <div className="font-medium">{value}</div>
        </div>
    );
}

function SectionCard({ title, children, editButtonGroup }) {
    return (
        <div className="">
            <div className="text-sm font-semibold text-secondary-grey400 flex items-center justify-between">
                <div>{title}</div>
                {editButtonGroup ? <div>{editButtonGroup}</div> : null}
            </div>
            {/* horizontal line */}
            <div className="border-b border-secondary-grey100/50 mt-1" />
            <div className="flex flex-col gap-2 mt-2">{children}</div>
        </div>
    );
}

function AppointmentCard({ title, date, type, reason, status, statusColor = "green", duration, hasPrescription }) {
    return (
        <div className="flex flex-col gap-1 bg-white ">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-secondary-grey400">{title}</h3>
                <div className="flex items-center gap-2">
                    {hasPrescription && (
                        <>
                            <button className="text-blue-primary250 flex items-center gap-1 text-xs hover:underline">
                                View Prescription <ArrowRight size={12} />
                            </button>
                            <div className="h-4 w-px mx-1 bg-secondary-grey100"></div>
                        </>
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                        <img
                            src="/icons/Menu Dots.svg"
                            alt="options"
                            width={17}
                            height={17}
                        />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm border-t border-secondary-grey100/50 p-2 text-secondary-grey300 ">
                <div className="flex flex-col gap-1">
                    <div className="">Date:</div>
                    <div className="font-medium">{date}</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="">Type:</div>
                    <div className="font-medium">{type}</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="">Reason:</div>
                    <div className="font-medium">{reason}</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="">Status:</div>
                    <div className={`px-1 py-0.5 rounded w-fit ${statusColor === "green" ? "text-success-300 bg-success-100" : "text-error-400 bg-error-50"
                        }`}>
                        {status} {duration && `(${duration})`}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PatientDetailsDrawer({
    isOpen,
    onClose,
    patient, // The patient data object
}) {
    const panelRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [closing, setClosing] = useState(false);
    const [activeTab, setActiveTab] = useState("Overview");
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
    const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);
    const actionMenuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
                setIsActionMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // Animations from GeneralDrawer
    const requestClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            setMounted(false);
            onClose?.();
        }, 220);
    };

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            setClosing(false);
            return;
        }
        if (mounted) {
            setClosing(true);
            const t = setTimeout(() => {
                setClosing(false);
                setMounted(false);
            }, 220);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") requestClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isOpen]);

    useEffect(() => {
        if (!mounted) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mounted]);

    if (!mounted && !closing) return null;

    // Mock data/fallback if patient is missing some fields
    const name = patient?.name || "Rahul Sharma";
    // Parsing date/age from patient data or using mock
    const dob = patient?.dob || "12/05/1985";
    const age = patient?.age || "39y, 7m";
    const gender = patient?.gender || "Male";
    const contact = patient?.contact || "+91 91753 67487";
    const email = patient?.email || "Rahul.Sharma@gmail.com";
    const location = patient?.location || "Jawahar Nagar, Akola - 444001";

    const tabs = ["Overview", "Demographics", "Past Visits"];

    return (
        <div className="fixed inset-0 z-[5000] font-sans antialiased text-gray-900">
            <style>{`
        @keyframes drawerIn { from { transform: translateX(100%); opacity: 0.6; } to { transform: translateX(0%); opacity: 1; } }
        @keyframes drawerOut { from { transform: translateX(0%); opacity: 1; } to { transform: translateX(100%); opacity: 0.6; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: .3; } }
        @keyframes fadeOut { from { opacity: .3; } to { opacity: 0; } }
      `}</style>

            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/40 ${closing
                    ? "animate-[fadeOut_.2s_ease-in_forwards]"
                    : "animate-[fadeIn_.25s_ease-out_forwards]"
                    }`}
                onClick={requestClose}
                style={{ zIndex: 5001 }}
            />

            {/* Drawer Panel */}
            <aside
                className={`absolute top-2  right-2 bottom-2  bg-blue-primary50 shadow-2xl border border-gray-200 rounded-lg overflow-hidden flex flex-col ${closing
                    ? "animate-[drawerOut_.22s_ease-in_forwards]"
                    : "animate-[drawerIn_.25s_ease-out_forwards]"
                    }`}
                ref={panelRef}
                style={{ zIndex: 5002 }}
            >
                {/* Header Section */}
                <div className="">
                    <div className="flex bg-white p-3 gap-[10px] items-center border-b border-secondary-grey100">
                        <div className="flex gap-3">
                            <AvatarCircle name={name} size="l" color="blue" className="w-14 h-14 text-xl" />
                            <div className="flex flex-col ">
                                <h2 className="text-[20px] font-semibold text-secondary-grey400">{name}</h2>
                                <div className="flex items-center gap-1 text-sm text-secondary-grey300 ">
                                    <span>{dob} ({age})</span>
                                    <span className="h-4 mx-1 w-px bg-gray-300"></span>
                                    <span className="flex items-center gap-1 text-sm text-secondary-grey300"><User size={14} className="text-blue-500" /> {gender}</span>
                                    <span className="h-4 mx-1 w-px bg-gray-300"></span>
                                    <span className="flex items-center gap-1 text-sm text-secondary-grey300"><Droplet size={14} className="text-blue-500 fill-blue-500" /> B+</span>
                                    <span className="h-4 mx-1 w-px bg-gray-300"></span>
                                    <span className="bg-secondary-grey50 px-1 py-0.5 rounded text-xs text-secondary-grey400">MRN: P654321</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="p-2 ml-1 mb-4 hover:bg-gray-100 rounded-lg text-gray-500"
                            onClick={() => setIsScheduleDrawerOpen(true)}
                        >
                            <img src='/reschedule.png' alt="" className="w-[18px]" />
                        </button>
                        <span className="h-4 mb-[14px] mx-[2px] w-px bg-gray-300"></span>
                        <div className="relative" ref={actionMenuRef}>
                            <button
                                className="p-2 py-3 mb-4 hover:bg-gray-100 rounded-lg text-gray-500"
                                onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                            >
                                <img src="/action-icon.svg" alt="" className="w-[17px]" />
                            </button>
                            {isActionMenuOpen && (
                                <div className="absolute right-0 top-[calc(100%-10px)] w-[240px] bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-2">
                                    <div className="px-4 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                                        More Actions
                                    </div>
                                    <div className="flex flex-col">
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3">
                                            <AlertTriangle size={16} strokeWidth={1.5} /> Add Problems
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3">
                                            <Heart size={16} strokeWidth={1.5} /> Add Condition
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3">
                                            <Meh size={16} strokeWidth={1.5} /> Add Allergies
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3">
                                            <Users size={16} strokeWidth={1.5} /> Add Family History
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3">
                                            <Globe size={16} strokeWidth={1.5} /> Add Social History
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3">
                                            <Syringe size={16} strokeWidth={1.5} /> Add Immunization
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3">
                                            <Users size={16} strokeWidth={1.5} /> Add Dependents
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3">
                                            <Pencil size={16} strokeWidth={1.5} /> Edit Profile
                                        </button>
                                    </div>
                                    <div className="my-1 border-t border-gray-100"></div>
                                    <button className="w-full text-left px-4 py-2 text-sm text-error-400 hover:bg-error-50 flex items-center gap-3">
                                        <Trash2 size={16} strokeWidth={1.5} /> Delete Patient
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 px-3">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`h-[40px] px-[6px]  text-sm border-b-2 transition-colors ${activeTab === tab
                                    ? "text-blue-primary250 border-blue-primary250"
                                    : "text-gray-500 border-transparent hover:text-gray-700"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <div className=" overflow-y-auto bg-white  no-scrollbar">

                    {activeTab === "Overview" && (
                        <>
                            {/* Sticky Note */}
                            <div className="bg-warning2-50 p-[10px] border-t border-b border-warning2-400/50 text-sm text-secondary-grey150">
                                Add Sticky Notes of Patient's Quick Updates
                            </div>

                            <div className="flex flex-col gap-4 pt-3 px-3 pb-3">
                                {/* Contact Info */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center   text-sm font-medium text-secondary-grey400">
                                        <span className="flex items-center ">Contact Info</span>
                                    </div>
                                    <div className="border-t border-secondary-grey100/50 pt-2 flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone size={16} className="text-gray-400" />
                                            <span className="text-secondary-grey300">{contact}</span>
                                            <span className="min-w-[18px] px-1 py-0.5 rounded-sm text-xs border border-warning2-50 text-xs text-warning2-400 bg-warning2-50 hover:border-warning2-400/50 cursor-pointer">Primary</span>
                                            <CheckCircle2 size={14} className="ml-auto text-green-500" />
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone size={16} className="text-gray-400" />
                                            <span className="text-secondary-grey300">+91 87654 32109</span>
                                            <span className="min-w-[18px] px-1 py-0.5 rounded-sm border text-xs border-secondary-grey50 bg-secondary-grey50 hover:border-secondary-grey400/50 cursor-pointer text-secondary-grey400">Secondary</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail size={16} className="text-gray-400" />
                                            <span className="text-secondary-grey300">{email}</span>
                                            <CheckCircle2 size={14} className="ml-auto text-green-500" />
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin size={16} className="text-gray-400" />
                                            <span className="text-secondary-grey300">{location}</span>
                                            <CheckCircle2 size={14} className="ml-auto text-green-500" />
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Globe size={16} className="text-gray-400" />
                                            <span className="text-secondary-grey300">English/Hindi/Marathi</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Last Visit */}
                                <div className="flex flex-col gap-1 pb-1">
                                    <h3 className="flex items-center   text-sm font-medium text-secondary-grey400">Last Visit</h3>
                                    <div className="border-t border-secondary-grey100/50 pt-2 flex flex-col gap-2 text-sm text-secondary-grey300">
                                        <div className="flex items-center justify-between">
                                            <div className="">Date:</div>
                                            <div className="col-span-2 font-medium">
                                                {patient.lastVisit || "28 dec 2023 at 2:30 PM"}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-secondary-grey300">Doctor:</div>
                                            <div className="flex items-center gap-2">
                                                <AvatarCircle size='xs' color='orange' name='M' />
                                                <div className="col-span-2 font-medium">
                                                    {patient.lastVisitDoctor || "Dr Milind Chauhan"}
                                                </div>
                                            </div>

                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-secondary-grey300">Type:</div>
                                            <div className="col-span-2 font-medium">
                                                {(patient.raw &&
                                                    patient.raw.overview &&
                                                    patient.raw.overview.lastVisit &&
                                                    patient.raw.overview.lastVisit.type) ||
                                                    "Consultation"}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-secondary-grey300">Reason:</div>
                                            <div className="col-span-2 font-medium">
                                                {patient.lastVisitReason || "Hypertension Evaluation"}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-secondary-grey300">Status:</div>
                                            <div className="col-span-2 text-success-300 bg-success-100 px-1 rounded-sm">
                                                {(patient.raw &&
                                                    patient.raw.overview &&
                                                    patient.raw.overview.lastVisit &&
                                                    patient.raw.overview.lastVisit.status) ||
                                                    "Completed 5:30 PM"}
                                            </div>
                                        </div>
                                        <div className="col-span-3 text-xs text-blue-primary250">
                                            <button className="">View Prescription →</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Vitals */}
                                <div className="flex flex-col gap-1">
                                    <h3 className="flex items-center   text-sm font-medium text-secondary-grey400">Last Recorded Vitals & Biometrics</h3>
                                    {patient.lastRecordedVitals ? (
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">
                                                {(patient.lastRecordedVitals.recordedOn &&
                                                    new Date(
                                                        patient.lastRecordedVitals.recordedOn
                                                    ).toLocaleDateString("en-GB")) ||
                                                    "Recorded on —"}
                                                {patient.lastRecordedVitals.recordedBy
                                                    ? ` by ${patient.lastRecordedVitals.recordedBy.name ||
                                                    patient.lastRecordedVitals.recordedBy
                                                    }`
                                                    : ""}
                                            </div>
                                            <div className="text-sm text-gray-700 space-y-1">
                                                {/** handle a few possible shapes: entries array, measurements object, or flat key-values */}
                                                {Array.isArray(patient.lastRecordedVitals.entries) &&
                                                    patient.lastRecordedVitals.entries.length > 0
                                                    ? patient.lastRecordedVitals.entries.map((e, i) => (
                                                        <div key={i} className="flex justify-between">
                                                            <span>{e.name || e.label || e.key}:</span>{" "}
                                                            <span>
                                                                {e.value}
                                                                {e.unit ? ` ${e.unit}` : ""}
                                                            </span>
                                                        </div>
                                                    ))
                                                    : // iterate over object keys excluding metadata
                                                    Object.keys(patient.lastRecordedVitals)
                                                        .filter(
                                                            (k) =>
                                                                ![
                                                                    "recordedOn",
                                                                    "recordedBy",
                                                                    "entries",
                                                                ].includes(k)
                                                        )
                                                        .map((k) => {
                                                            const v = patient.lastRecordedVitals[k];
                                                            // if nested object has value/unit
                                                            if (
                                                                v &&
                                                                typeof v === "object" &&
                                                                ("value" in v || "unit" in v)
                                                            ) {
                                                                return (
                                                                    <div
                                                                        key={k}
                                                                        className="flex justify-between"
                                                                    >
                                                                        <span>
                                                                            {k.replace(/([A-Z])/g, " $1")}:
                                                                        </span>
                                                                        <span>
                                                                            {v.value}
                                                                            {v.unit ? ` ${v.unit}` : ""}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            }
                                                            // primitive
                                                            if (v !== null && v !== undefined && v !== "") {
                                                                return (
                                                                    <div
                                                                        key={k}
                                                                        className="flex justify-between"
                                                                    >
                                                                        <span>
                                                                            {k.replace(/([A-Z])/g, " $1")}:
                                                                        </span>
                                                                        <span>{String(v)}</span>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="border-t border-secondary-grey100/50 pt-2 flex flex-col gap-[10px] text-sm text-secondary-grey300">
                                            <div className="text-xs text-gray-500  bg-secondary-grey50 px-1 py-1 rounded-sm text-secondary-grey200 font-medium">
                                                Recorded on 06/01/2025 by Dr. Milind Chauhan
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="">Blood Pressure:</span>{" "}
                                                <div className="flex items-center text-error-400 gap-[4px]">
                                                    130/85{" "}
                                                    <img
                                                        className="text-red-500 text-[12px] h-[16px] w-[16px]"
                                                        src="/icons/Arrow Up.svg"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="">
                                                    Oxygen Saturation:
                                                </span>{" "}
                                                <span>98%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="">Temperature:</span>{" "}
                                                <div className="flex items-center text-error-400 gap-[4px]">
                                                    103 F
                                                    <img
                                                        className="text-red-500 text-[12px] h-[16px] w-[16px]"
                                                        src="/icons/Arrow Up.svg"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="">Weight:</span>{" "}
                                                <span>75 Kgs</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Active Problems */}
                                <div className="flex flex-col gap-1 pt-1">
                                    <h3 className="flex items-center   text-sm font-medium text-secondary-grey400">Active Problems</h3>
                                    <div className="border-t border-secondary-grey100/50 pt-2 flex flex-col gap-[10px] text-sm text-secondary-grey300">

                                        <div

                                            className="flex items-center justify-between"
                                        >
                                            <div className="text-gray-600">High Blood Pressure</div>
                                            <div>
                                                <Badge
                                                    type="ghost"
                                                    color=

                                                    "red"


                                                    showText="Height"
                                                >
                                                    Slightly High
                                                </Badge>
                                            </div>
                                        </div>
                                        <div

                                            className="flex items-center justify-between"
                                        >
                                            <div className="text-gray-600">Type 2 Diabetes</div>
                                            <div>
                                                <Badge
                                                    type="ghost"
                                                    color=

                                                    "gray"


                                                    showText="Height"
                                                >
                                                    Under Controlled
                                                </Badge>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </>
                    )}

                    {activeTab === "Demographics" && (
                        <div className="flex flex-col gap-4 pt-3  px-3 pb-3">
                            <SectionCard
                                title="Basic Info"
                                editButtonGroup={
                                    <button
                                        className="font-inter text-xs font-normal leading-[1.2] tracking-normal align-middle
            text-[#2372EC] flex items-center gap-1"
                                    >
                                        <img
                                            src="/icons/Pen.svg"
                                            alt="edit icon"
                                            width={14}
                                            height={14}
                                        />
                                        <div>Edit</div>
                                    </button>
                                }
                            >
                                <Row label="Name:" value="Rahul Sharma" />
                                <Row label="Date Of Birth:" value="02 Feb 1996" />
                                <Row label="Age:" value="29 Years" />
                                <Row label="Gender:" value="Male" />
                                <Row label="Blood Group:" value="B+" />
                                <Row label="Marital Status:" value="Married" />
                            </SectionCard>

                            <SectionCard title="Contact Details">
                                <Row label="Primary Phone:" value="+91 98765 43210" />
                                <Row label="Secondary Phone:" value="+91 87654 32109" />
                                <Row label="Email Address:" value="rahul.sharma@email.com" />
                                <Row label="Emergency Contact:" value="+91 98765 43211 (Wife)" />
                                <Row label="Primary Language:" value="Hindi" />
                                <Row label="Secondary Language:" value="English/Marathi" />
                            </SectionCard>

                            <SectionCard title="Address Details">
                                <div
                                    className=" text-blue-primary300  text-sm leading-[22px] tracking-[0px]"
                                >
                                    Permanent Address
                                </div>
                                <Row label="Address:" value="Jawahar Nagar Gokul Colony" />
                                <Row label="City:" value="Akola" />
                                <Row label="State:" value="Maharashtra" />
                                <Row label="Zip Code:" value="444001" />
                            </SectionCard>

                            <SectionCard
                                title="Dependant"
                                editButtonGroup={
                                    <div className="flex items-center justify-end">
                                        <button
                                            className=" text-[#2372EC] font-inter text-xs font-normal leading-[1.2] tracking-normal align-middle
"
                                        >
                                            + Add New
                                        </button>
                                    </div>
                                }
                            >
                                <div className="flex items-center gap-3 py-1 text-sm text-secondary-grey400">
                                    <AvatarCircle
                                        size='s'
                                        name='R'>

                                    </AvatarCircle>
                                    <div className="flex flex-col ">
                                        <div className="flex items-center gap-1">
                                            Rashmi Sharma{" "}
                                            <span className="text-xs bg-secondary-grey50 px-1 py-0.5 rounded-sm">Dependant</span>
                                        </div>
                                        <div className="text-xs text-secondary-grey300">
                                            Wife | +91 9175367487
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <button className="p-1.5 rounded hover:bg-gray-100">
                                            <img
                                                src="/icons/Menu Dots.svg"
                                                alt="options"
                                                width={16}
                                                height={16}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {activeTab === "Past Visits" && (

                        <div className="">
                            {/* Appointment 3 */}
                            <div className="bg-warning2-50 p-[10px] border-t border-b border-warning2-400/50 text-sm text-secondary-grey150">
                                Add Sticky Notes of Patient's Quick Updates
                            </div>

                            <div className="flex flex-col gap-4 p-3">
                                <AppointmentCard
                                    title="Appointment 3"
                                    date="28 Dec 2023 at 2:30 PM"
                                    type="Consultation"
                                    reason="Hypertension evaluation"
                                    status="Completed"
                                    duration="05:30 Mins"
                                    hasPrescription={true}
                                />

                                <AppointmentCard
                                    title="Appointment 5"
                                    date="14 Jan 2024 at 10:00 AM"
                                    type="Follow-up"
                                    reason="Medication review"
                                    status="No-Show"
                                    statusColor="red"
                                    hasPrescription={false}
                                />

                                <AppointmentCard
                                    title="Appointment 4"
                                    date="05 Jan 2024 at 3:15 PM"
                                    type="Check-up"
                                    reason="Annual physical"
                                    status="Completed"
                                    duration="15 Mins"
                                    hasPrescription={true}
                                />
                            </div>

                        </div>
                    )}

                </div>
            </aside>
            {isScheduleDrawerOpen && (
                <ScheduleAppointmentDrawer
                    open={isScheduleDrawerOpen}
                    onClose={() => setIsScheduleDrawerOpen(false)}
                    patient={patient || { name, dob, age, gender, contact }}
                    zIndex={6000}
                />
            )}
        </div>
    );
}
