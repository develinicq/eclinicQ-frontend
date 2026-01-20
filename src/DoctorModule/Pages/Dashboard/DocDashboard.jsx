import React, { useState, useRef, useEffect, useMemo } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { getDoctorMe } from "../../../services/authService";
import { getDoctorDashboardAnalytics } from "../../../services/doctorService";
import useFrontDeskAuthStore from "../../../store/useFrontDeskAuthStore";
import useSlotStore from "../../../store/useSlotStore";
import Overview_cards from "../../../components/Dashboard/Overview_cards";
import BookAppointmentDrawer from "../../../components/Appointment/BookAppointmentDrawer.jsx";
import {
  walkInBlue,
  appointementWhite,
  engageWhite,
  admitWhite,
  avgTimeWhite,
  tokenWhite,
  waitingWhite,
  newPatientWhite,
  angelDown,
  calenderArrowLeft,
  calenderArrowRight,
  downloadIcon,
} from "../../../../public/index.js";

const PeriodTabs = ({ value, onChange }) => {
  const tabs = ["Daily", "Weekly", "Monthly", "Yearly"];
  return (
    <div className="flex rounded-md items-center gap-2 bg-blue-primary50 p-[2px] text-sm ">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-[6px]  py-1 rounded-[4px] transition-colors ${value === t
            ? "bg-[#2372EC] text-white"
            : "bg-transparent text-[#626060] hover:bg-gray-50"
            }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

const SectionCard = ({ title, children, right }) => (
  <div className="bg-white border border-gray-200 rounded-[12px]">
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <h3 className="text-[#424242] text-sm sm:text-base font-medium">
        {title}
      </h3>
      <div className="flex items-center gap-2">
        {right}
        <button className="p-1.5 rounded  hover:bg-gray-50">
          <img src={downloadIcon} alt="Download" className="w-5 h-5" />
        </button>
      </div>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const DocDashboard = () => {
  const { doctorDetails, doctorLoading, fetchDoctorDetails } = useAuthStore();
  const { user: fdUser } = useFrontDeskAuthStore();
  const selectedSlotId = useSlotStore((s) => s.selectedSlotId);
  const loadAppointmentsForSelectedSlot = useSlotStore(
    (s) => s.loadAppointmentsForSelectedSlot
  );
  const [period, setPeriod] = useState("Yearly");
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // Month dropdown state
  const months = [
    "All Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [isMonthOpen, setMonthOpen] = useState(false);
  const monthBtnRef = useRef(null);
  const monthDropRef = useRef(null);
  const [bookOpen, setBookOpen] = useState(false);

  useEffect(() => {
    if (!doctorDetails && !doctorLoading && !fdUser) {
      try {
        fetchDoctorDetails?.(getDoctorMe);
      } catch { }
    }
  }, [doctorDetails, doctorLoading, fetchDoctorDetails, fdUser]);

  const clinicId = doctorDetails?.clinicId || doctorDetails?.associatedWorkplaces?.clinic?.id || fdUser?.clinicId || fdUser?.clinic?.id;
  const doctorId = doctorDetails?.id || doctorDetails?.userId || fdUser?.doctorId;

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await getDoctorDashboardAnalytics({
        clinicId,
        aggregationType: period.toLowerCase()
      });
      if (res.success) {
        setAnalytics(res.data);
      }
    } catch (e) {
      console.error("Failed to fetch analytics:", e);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    if (clinicId) {
      fetchAnalytics();
    }
  }, [clinicId, period]);

  useEffect(() => {
    const onClick = (e) => {
      const inBtn = monthBtnRef.current && monthBtnRef.current.contains(e.target);
      const inDrop = monthDropRef.current && monthDropRef.current.contains(e.target);
      if (isMonthOpen && !inBtn && !inDrop) setMonthOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMonthOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isMonthOpen]);

  const summary = analytics?.summary || {};
  const metrics = analytics?.metrics || {};

  const getMetricData = (key, unit = "") => {
    const m = metrics[key] || {};
    return {
      value: loadingAnalytics ? "00" : `${m.current || 0}${unit}`,
      percent: m.percentageChange || 0,
      variant: loadingAnalytics ? "neutral" : (m.trend === "increase" ? "profit" : "loss")
    };
  };

  return (
    <div className="p-4 flex flex-col gap-4 no-scrollbar bg-white">
      {/* Welcome + Walk-In */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-md text-secondary-grey300">
          Welcome, {doctorDetails?.name || "Dr. Millin Chavan"}. Here's an overview of your practice.
        </p>
        <div className="flex items-center  ">
          <button
            onClick={() => setBookOpen(true)}
            className=" group inline-flex items-center gap-2 h-[32px] min-w-[32px] p-2 rounded-md border text-sm border-[#BFD6FF] bg-[#F3F8FF] text-[#2372EC] hover:bg-[#2372EC] hover:text-white transition-colors"
          >
            <img
              src={walkInBlue}
              alt=""
              className="h-4  group-hover:invert group-hover:brightness-0"
            />
            <span>Walk-In Appointment</span>
          </button>
        </div>
      </div>

      {/* Top metrics: Total Patients + Total Appointments Booked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-1">
            <div className="text-[16px] font-medium text-secondary-grey400">
              Total Patients
            </div>
            <span className="text-[26px] font-bold text-secondary-grey400">
              {loadingAnalytics ? "00" : summary.totalPatients || 0}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center">
            <img src={appointementWhite} alt="" className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-1">
            <div className="text-[16px] font-medium text-secondary-grey400">
              Total Appointments Booked
            </div>
            <span className="text-[26px] font-bold text-secondary-grey400">
              {loadingAnalytics ? "00" : summary.totalAppointments || 0}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center">
            <img src={appointementWhite} alt="" className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Period tabs and selectors */}
      <div className="flex items-center justify-between">
        <PeriodTabs value={period} onChange={setPeriod} />
        <div className="flex items-center gap-3 relative">
          {/* Month dropdown trigger */}
          <button
            ref={monthBtnRef}
            type="button"
            onClick={() => setMonthOpen((v) => !v)}
            className={`inline-flex items-center gap-2 px-3 h-8 rounded-md border border-secondary-grey200 bg-white text-sm text-[#424242] ${isMonthOpen ? "ring-1 ring-[#2372EC]/30" : ""
              }`}
            aria-haspopup="listbox"
            aria-expanded={isMonthOpen}
          >
            <span className="text-secondary-grey400  font-medium">
              {selectedMonth}
            </span>
            <img
              src={angelDown}
              alt="Dropdown"
              className={`w-3 h-3 transition-transform ${isMonthOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          <button
            type="button"
            className={`inline-flex items-center gap-1 px-2 h-8 rounded-md border border-secondary-grey200 bg-white text-sm text-[#424242]`}
          >
            <img src={calenderArrowLeft} alt="Previous" className="w-3 h-3" />
            <span className="text-secondary-grey400  font-medium">2025</span>
            <img src={calenderArrowRight} alt="Next" className="w-3 h-3" />
          </button>

          {/* Month dropdown */}
          {isMonthOpen && (
            <div
              ref={monthDropRef}
              className="absolute z-[1000] left-0 top-10 w-[126px] rounded-lg bg-monochrom-white p-2 overflow-hidden"
              style={{
                borderWidth: "0.5px",
                borderColor: "#D6D6D6",
                boxShadow: "0px 12px 60px -15px rgba(0, 0, 0, 0.06)",
              }}
              role="listbox"
            >
              <div
                className="flex flex-col gap-2 overflow-y-auto no-scrollbar"
                style={{ maxHeight: "236px" }}
              >
                {months.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setSelectedMonth(m);
                      setMonthOpen(false);
                    }}
                    className={`w-[108px] h-8 px-2 py-1 rounded text-secondary-grey400 text-left ${selectedMonth === m
                      ? "bg-blue-primary50 border-[0.5px] border-blue-primary150"
                      : "hover:bg-secondary-grey50"
                      }`}
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "120%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                    }}
                    role="option"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overview cards */}
      <div className="font-semibold text-gray-600">Appointment Overview</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
        <Overview_cards
          title="Avg. Appointment Booked"
          {...getMetricData("avgAppointmentsBooked")}
          periodText={`from last ${period.toLowerCase()}`}
        />
        <Overview_cards
          title="Avg. Engage Patient"
          {...getMetricData("avgEngagedPatients")}
          periodText={`from last ${period.toLowerCase()}`}
        />
        <Overview_cards
          title="Avg. Patient Admitted"
          {...getMetricData("avgPatientAdmitted")}
          periodText={`from last ${period.toLowerCase()}`}
        />
        <Overview_cards
          title="Avg. No-Show Patients"
          {...getMetricData("avgNoShowPatients")}
          periodText={`from last ${period.toLowerCase()}`}
        />
        <Overview_cards
          title="Avg. time Spent/ Patient"
          {...getMetricData("avgTimeSpentPerPatient", "s")}
          periodText={`from last ${period.toLowerCase()}`}
        />
        <Overview_cards
          title="Avg. Token Utilization"
          {...getMetricData("avgTokenUtilization", "%")}
          periodText={`from last ${period.toLowerCase()}`}
        />
        <Overview_cards
          title="Avg. Waiting Time"
          {...getMetricData("avgWaitingTime", "s")}
          periodText={`from last ${period.toLowerCase()}`}
        />
        <Overview_cards
          title="Avg. New Patient Visit"
          {...getMetricData("avgNewPatientVisit")}
          periodText={`from last ${period.toLowerCase()}`}
        />
      </div>

      {/* Analytics Overview section */}
      <div className="mb-2">
        <span className="text-sm sm:text-base font-medium text-[#424242]">
          Analytics Overview
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <SectionCard title="Patients Served">
          <div className="h-[300px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
            Chart placeholder — to be added
          </div>
        </SectionCard>

        <SectionCard title="Appointment Booking Through">
          <div className="h-[300px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
            Chart placeholder — to be added
          </div>
        </SectionCard>
      </div>

      {/* Bottom section */}
      <SectionCard title="Appointment Booking Through">
        <div className="h-[220px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
          Additional charts/table placeholder — to be added
        </div>
      </SectionCard>

      {/* Appointment booking drawer */}
      <BookAppointmentDrawer
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        doctorId={doctorId}
        clinicId={clinicId}
        hospitalId={
          (Array.isArray(doctorDetails?.associatedWorkplaces?.hospitals) &&
            doctorDetails?.associatedWorkplaces?.hospitals[0]?.id) ||
          undefined
        }
        onBookedRefresh={() => {
          if (selectedSlotId) {
            try {
              loadAppointmentsForSelectedSlot();
            } catch { }
          }
        }}
      />
    </div>
  );
};

export default DocDashboard;
