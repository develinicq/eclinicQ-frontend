import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  bell,
  hospitalIcon,
  stethoscopeBlue,
  collapse_white,
  whiteSubscription,
  whiteOutOfOffice,
  whiteProfileLink,
  whiteLogout,
  searchIcon,
} from "../../../public/index.js";
import useAuthStore from "../../store/useAuthStore";
import useHospitalAuthStore from "@/store/useHospitalAuthStore";
import useSuperAdminAuthStore from "@/store/useSuperAdminAuthStore";
import useUIStore from "@/store/useUIStore";
import AvatarCircle from "../../components/AvatarCircle";
import SearchInput from "../../components/SearchInput";
import { getDoctorMe } from "../../services/authService";
import { getPublicUrl } from "@/services/uploadsService";
import {
  Mail,
  Phone,
  IdCard,
  User,
  LogOut,
  ChevronRight,
  ChevronDown,
  UserPlus,
  Users,
  GitBranch,
  CalendarPlus,
  Link as LinkIcon,
  Wallet,
  CalendarX2,
} from "lucide-react";
import NotificationDrawer from "../../components/NotificationDrawer.jsx";
import InviteStaffDrawer from "../Pages/Settings/Drawers/InviteStaffDrawer.jsx";
import { fetchAllRoles } from "../../services/rbac/roleService";
import { registerStaff } from "../../services/staff/registerStaffService";
import AddPatientDrawer from "../../components/PatientList/AddPatientDrawer.jsx";
import BookAppointmentDrawer from "../../components/Appointment/BookAppointmentDrawer.jsx";
import {
  vertical,
  whiteProfile,
  blueId,
  mapPoint,
  appointementNav,
  arrowRightNav,
  staff,
  vector,
  blueMail,
  blueCall,
} from "../../../public/index.js";

const Partition = () => {
  return (
    <div className="w-[8px] h-[20px] flex gap-[10px] items-center justify-center">
      <div className="w-[1px] h-full bg-secondary-grey100/50"></div>
    </div>
  );
};

const ProfileMenuItem = ({
  icon: Icon,
  label,
  onClick,
  rightIcon = ChevronRight,
  className = "",
}) => {
  const RightIcon = rightIcon;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-2 h-8 hover:bg-gray-50 text-gray-700 ${className}`}
    >
      <span className="flex items-center gap-2 text-[14px]">
        {/* Support both React icon components and image src */}
        {typeof Icon === "string" ? (
          <img src={Icon} alt="" className="w-4 h-4" />
        ) : (
          <Icon className="w-4 h-4 text-gray-500" />
        )}
        {label}
      </span>

      <RightIcon className="w-4 h-4 text-gray-400" />
    </button>
  );
};

const DocNavbar = ({ moduleSwitcher, hospitalAdminData, hospitalAdminPhoto }) => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const {
    doctorDetails,
    doctorLoading,
    doctorError,
    fetchDoctorDetails,
    _doctorFetchPromise,
  } = useAuthStore();
  const { roleNames: hospitalRoles, user: storeHospitalUser } = useHospitalAuthStore();
  const [copied, setCopied] = useState(false);
  const [internalHospitalPhoto, setInternalHospitalPhoto] = useState("");

  const effectiveHospitalData = hospitalAdminData || storeHospitalUser;
  const isDualRole =
    (hospitalRoles?.includes("HOSPITAL_ADMIN") && hospitalRoles?.includes("DOCTOR")) ||
    (effectiveHospitalData?.isDoctor);

  const effectiveHospitalPhoto = hospitalAdminPhoto || internalHospitalPhoto;

  useEffect(() => {
    const fetchHospitalImage = async () => {
      if (effectiveHospitalData?.profilePhoto && !hospitalAdminPhoto) {
        const url = await getPublicUrl(effectiveHospitalData.profilePhoto);
        setInternalHospitalPhoto(url);
      }
    };
    fetchHospitalImage();
  }, [effectiveHospitalData?.profilePhoto, hospitalAdminPhoto]);
  const currentPath = window.location.pathname.toLowerCase();
  const activeModule = currentPath.startsWith('/hospital') ? 'hospital' : 'doctor';

  const switchToHospital = () => { navigate('/hospital'); };
  const switchToDoctor = () => { navigate('/doc'); };

  const internalSwitcher = isDualRole ? (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={switchToHospital}
        className={`flex items-center justify-center h-8 w-8 rounded-[6px] border ${activeModule === 'hospital' ? 'bg-[#2372EC] border-[#2372EC]' : 'bg-white border-[#D6D6D6]'} hover:bg-blue-50 transition-colors`}
        aria-label="Hospital Module"
        title="Hospital"
      >
        <img src={hospitalIcon} alt="Hospital" className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={switchToDoctor}
        className={`flex items-center justify-center h-8 w-8 rounded-[6px] border ${activeModule === 'doctor' ? 'bg-[#2372EC] border-[#2372EC]' : 'bg-white border-[#D6D6D6]'} hover:bg-blue-50 transition-colors`}
        aria-label="Doctor Module"
        title="Doctor"
      >
        <img src={stethoscopeBlue} alt="Doctor" className="w-4 h-4" />
      </button>
    </div>
  ) : null;

  const finalSwitcher = moduleSwitcher || internalSwitcher;

  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const addMenuRef = useRef(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [addPatientOpen, setAddPatientOpen] = useState(false);
  const [bookApptOpen, setBookApptOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  // Focus search when pressing Ctrl+/
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close on outside click / Escape
  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setShowProfile(false);
      if (addMenuRef.current && !addMenuRef.current.contains(e.target))
        setShowAddMenu(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowProfile(false);
        setShowAddMenu(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Ensure doctor details are loaded for dual-role users or pure doctor logins
  useEffect(() => {
    const shouldFetch = (!hospitalAdminData && !doctorDetails) || (isDualRole && !doctorDetails);
    if (shouldFetch && !doctorLoading && !_doctorFetchPromise) {
      fetchDoctorDetails?.(getDoctorMe);
    }
  }, [doctorDetails, doctorLoading, fetchDoctorDetails, _doctorFetchPromise, hospitalAdminData, isDualRole]);

  const handleCopyProfileLink = async () => {
    try {
      const code = doctorDetails?.doctorCode || doctorDetails?.userId;
      const url = code
        ? `${window.location.origin}/doctor/${code}`
        : window.location.origin;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // no-op
    }
  };

  const handleLogout = () => {
    useUIStore.getState().setIsLoggingOut(true);
    useAuthStore.getState().clearAuth();
    useHospitalAuthStore.getState().clearAuth();
    useSuperAdminAuthStore.getState().clearAuth();

    // Redirect based on current active module
    if (activeModule === 'hospital') {
      navigate("/hospital/signin", { replace: true });
    } else {
      navigate("/signin", { replace: true });
    }
  };

  // Derive displayable name: two words max, no 'Dr.' prefix
  const getDoctorDisplayName = (details) => {
    if (!details) return "";
    const nameFromFields = [details?.firstName, details?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    const raw = String(details?.name || nameFromFields || "").trim();
    if (!raw) return "";
    // Remove leading titles like Dr, Dr., Doctor (case-insensitive)
    const cleaned = raw.replace(/^(?:dr\.?|doctor)\s+/i, "").trim();
    // Limit to two words
    const twoWords = cleaned.split(/\s+/).slice(0, 2).join(" ");
    return twoWords || cleaned;
  };
  const displayName = doctorLoading ? "" : getDoctorDisplayName(doctorDetails);

  // For dropdown: ensure a visible title 'Dr.' precedes the full name
  const getDoctorNameWithTitle = (details) => {
    if (!details) return "";
    const nameFromFields = [details?.firstName, details?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    const raw = String(details?.name || nameFromFields || "").trim();
    if (!raw) return "";
    // If already has a leading Dr/Dr./Doctor keep it; else prefix 'Dr.'
    if (/^(?:dr\.?|doctor)\s+/i.test(raw)) return raw;
    return `Dr. ${raw}`;
  };
  const titledName = doctorLoading ? "" : getDoctorNameWithTitle(doctorDetails);

  // Use hospital data if available for dual-role users or if explicitly passed
  const useHospitalProfile = isDualRole || !!hospitalAdminData;

  const finalDisplayName = useHospitalProfile ? getDoctorDisplayName(effectiveHospitalData) : displayName;
  const finalTitledName = useHospitalProfile ? (effectiveHospitalData?.name || "") : titledName;
  const finalAvatar = useHospitalProfile ? effectiveHospitalPhoto : "";
  const finalEmail = useHospitalProfile ? effectiveHospitalData?.emailId : doctorDetails?.emailId;
  const finalPhone = useHospitalProfile ? effectiveHospitalData?.phone : doctorDetails?.contactNumber;
  const finalCode = useHospitalProfile ? effectiveHospitalData?.adminCode : (doctorDetails?.doctorCode || doctorDetails?.userId);
  const finalDesignation = useHospitalProfile ? (effectiveHospitalData?.isDoctor ? "Hospital Admin (Doctor)" : "Hospital Admin") : (doctorDetails?.designation || doctorDetails?.specializations?.[0]);
  const finalLoading = useHospitalProfile ? !effectiveHospitalData : doctorLoading;

  return (
    <div className="w-full h-12 border-b-[0.5px] border-secondary-grey100/50 flex items-center py-2 px-4 gap-3">
      {/* Left: Title */}
      <div className="flex items-center gap-4 ">
        <img src={collapse_white} alt="Collapse" className="w-4 h-4" />
        <img src={vertical} alt="" className="h-5" />
        <span className="text-2xl font-medium text-secondary-grey400">
          Dashboard
        </span>
      </div>

      {/* Center: Search (right-aligned, fixed width) */}
      <div className="ml-auto">
        <SearchInput ref={searchRef} placeholder="Search Patients" showCtrlK />
      </div>
      <Partition />

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Module Switcher (Hospital Admin <-> Doctor) */}
        {finalSwitcher && (
          <>
            {finalSwitcher}
            <Partition />
          </>
        )}
        {/* Add New dropdown */}
        <div className="relative" ref={addMenuRef}>
          <button
            type="button"
            onClick={() => setShowAddMenu((v) => !v)}
            className="inline-flex items-center bg-[#2372EC] text-white px-3 h-8 rounded-[6px] gap-2 hover:bg-[#1f62c9] transition-colors shadow-sm"
            aria-haspopup="true"
            aria-expanded={showAddMenu}
          >
            <span className="text-sm font-medium">Add New</span>
            <div className="flex border-l-[0.5px] border-monochrom-white border-opacity-20 pl-1">
              <ChevronDown
                className={`w-4 h-4 text-white transition-transform ${showAddMenu ? "rotate-180" : ""
                  }`}
              />
            </div>
          </button>
          {showAddMenu && (
            <div className="absolute right-0 mt-1 w-48 px-2 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  setAddPatientOpen(true);
                }}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-gray-800 hover:rounded-md  hover:bg-gray-50"
              >
                <span className="flex gap-2">
                  <img src={vector} alt="" className="w-4 h-4 text-[#597DC3]" />
                  <span>Patient</span>
                </span>
                <img
                  src={arrowRightNav}
                  alt=""
                  className="w-1.5 h-1.5 text-gray-900"
                />
              </button>
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  setInviteOpen(true);
                }}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-gray-800 hover:rounded-md hover:bg-gray-50"
              >
                <span className="flex gap-2">
                  <img src={staff} alt="" className="w-4 h-4 text-[#597DC3]" />
                  <span>Staff</span>
                </span>
                <img
                  src={arrowRightNav}
                  alt=""
                  className="w-1.5 h-1.5 text-gray-900"
                />
              </button>
              <button
                onClick={() => {
                  setShowAddMenu(false);
                }}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-gray-800 hover:rounded-md hover:bg-gray-50"
              >
                <span className="flex gap-2">
                  <img
                    src={mapPoint}
                    alt=""
                    className="w-4 h-4 text-[#597DC3]"
                  />
                  <span>Branch</span>
                </span>
                <img
                  src={arrowRightNav}
                  alt=""
                  className="w-1.5 h-1.5 text-gray-900"
                />
              </button>
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  setBookApptOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-800 hover:rounded-md hover:bg-gray-50"
              >
                <span className="flex gap-2">
                  <img
                    src={appointementNav}
                    alt=""
                    className="w-4 h-4 text-[#597DC3]"
                  />
                  <span className="inline-flex items-center gap-2">
                    Appointment
                  </span>
                </span>
                <img
                  src={arrowRightNav}
                  alt=""
                  className="w-1.5 h-1.5 text-gray-900"
                />
              </button>
            </div>
          )}
        </div>

        {/* Walk-In Appointment button removed as requested */}

        <Partition />

        <div className="w-7 h-7 p-1 relative">
          <div className="absolute -top-1 -right-1 flex items-center justify-center rounded-full w-[14px] h-[14px] bg-[#F04248]">
            <span className="font-medium text-[10px] text-white">8</span>
          </div>
          <button
            onClick={() => setShowNotifications(true)}
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <img src={bell} alt="Notifications" className="w-5 h-5" />
          </button>
        </div>

        <Partition />

        <div className="relative flex items-center gap-2" ref={profileRef}>
          <span className="font-semibold text-base text-[#424242]">
            {finalLoading
              ? "Loading…"
              : doctorError && !hospitalAdminData
                ? "Error"
                : finalDisplayName || "—"}
          </span>
          <button
            type="button"
            onClick={() => setShowProfile((v) => !v)}
            className="cursor-pointer"
          >
            {/* User wants ONLY AvatarCircle in outer navbar */}
            <AvatarCircle
              name={
                finalLoading ? "?" : finalDisplayName || (doctorError ? "!" : "?")
              }
              size="s"
              color={doctorError && !hospitalAdminData ? "grey" : "orange"}
            />
          </button>
          {showProfile && (
            <div className="absolute top-9 right-0 w-[326px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
              {/* Header */}
              <div className="p-4 flex flex-col items-start gap-[10px] border-b border-gray-200">
                <div className="flex gap-3">
                  {/* User wants profile image in dropdown if available */}
                  {finalAvatar ? (
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden border border-secondary-grey100/50">
                      <img src={finalAvatar} alt={finalDisplayName} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <AvatarCircle
                      name={
                        finalLoading
                          ? "?"
                          : finalDisplayName || (doctorError ? "!" : "?")
                      }
                      size="f4"
                      color={doctorError && !hospitalAdminData ? "grey" : "orange"}
                    />
                  )}
                  <div className="flex flex-col">
                    <div className="text-[16px] leading-[22px] font-semibold text-secondary-grey400">
                      {finalLoading
                        ? "Loading…"
                        : doctorError && !hospitalAdminData
                          ? "Failed to load"
                          : finalTitledName || "—"}
                    </div>
                    <div className="text-[14px] leading-[18px] text-secondary-grey300">
                      {finalLoading
                        ? "Please wait"
                        : finalDesignation ||
                        "—"}
                    </div>
                    <div className="text-[14px] leading-[19px] text-secondary-grey300">
                      {finalLoading
                        ? ""
                        : hospitalAdminData ? (hospitalAdminData.isDoctor ? "Verified Doctor Admin" : "") : (doctorDetails?.education.join(" - ") || "—")}
                    </div>
                  </div>
                </div>

                {!doctorError && (
                  <div className="flex flex-col gap-1 text-[14px] leading-[22px] border-gray-200">
                    <div className="flex items-center gap-2 text-gray-700">
                      <img src={blueMail} className="w-4" alt="" />
                      <span className="">{finalEmail || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <img src={blueCall} className="w-4" alt="" />
                      <span>{finalPhone || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <img src={blueId} className="w-4" alt="" />
                      <span>
                        {finalCode?.slice(0, 15) + (finalCode?.length > 15 ? "…" : "") ||
                          "—"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact block */}

              {doctorError && !doctorLoading && (
                <div className="px-4 pb-3 text-xs text-red-600 space-y-2 border-b border-gray-200">
                  <div className="font-medium">Profile load failed.</div>
                  <div className="text-red-500">{doctorError}</div>
                  <button
                    onClick={() =>
                      fetchDoctorDetails?.(getDoctorMe, { force: true })
                    }
                    className="h-8 px-3 rounded bg-red-50 border border-red-300 text-red-700 text-xs hover:bg-red-100"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="p-2 gap-1 flex flex-col text-sm">
                <ProfileMenuItem
                  icon={whiteProfile}
                  label="My Profile"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/doc/profile");
                  }}
                />

                <ProfileMenuItem
                  icon={whiteSubscription}
                  label="Subscription"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/doc/subscription");
                  }}
                />

                <ProfileMenuItem
                  icon={whiteOutOfOffice}
                  label="Out Of Office"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/doc/out-of-office");
                  }}
                />

                <ProfileMenuItem
                  icon={whiteProfileLink}
                  label={copied ? "Link Copied" : "Copy Profile Link"}
                  onClick={handleCopyProfileLink}
                />

                <ProfileMenuItem
                  icon={whiteLogout}
                  label="Logout"
                  onClick={handleLogout}
                />
              </div>

              {doctorLoading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center text-xs text-gray-500">
                  Loading…
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <NotificationDrawer
        show={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
      <AddPatientDrawer
        open={addPatientOpen}
        onClose={() => setAddPatientOpen(false)}
        onSave={() => setAddPatientOpen(false)}
      />
      <BookAppointmentDrawer
        open={bookApptOpen}
        onClose={() => setBookApptOpen(false)}
        doctorId={doctorDetails?.userId || doctorDetails?.id}
        clinicId={
          doctorDetails?.associatedWorkplaces?.clinic?.id ||
          doctorDetails?.clinicId
        }
        hospitalId={
          (Array.isArray(doctorDetails?.associatedWorkplaces?.hospitals) &&
            doctorDetails?.associatedWorkplaces?.hospitals[0]?.id) ||
          undefined
        }
        onBookedRefresh={() => {
          // Optional: trigger any queue refresh if present
        }}
      />
      <InviteStaffDrawer open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
};

export default DocNavbar;
