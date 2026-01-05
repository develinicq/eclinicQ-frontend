import React, { useState, useRef, useEffect } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { getDoctorMe } from "../../../services/authService";
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
          className={`px-[6px]  py-1 rounded-[4px] transition-colors ${
            value === t
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
  // Slot store hooks must be used inside component
  const selectedSlotId = useSlotStore((s) => s.selectedSlotId);
  const loadAppointmentsForSelectedSlot = useSlotStore(
    (s) => s.loadAppointmentsForSelectedSlot
  );
  const [period, setPeriod] = useState("Daily");
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
  // Ensure doctor context exists so drawer can load slots
  useEffect(() => {
    if (!doctorDetails && !doctorLoading) {
      try {
        fetchDoctorDetails?.(getDoctorMe);
      } catch {}
    }
  }, [doctorDetails, doctorLoading, fetchDoctorDetails]);
  // Close handlers for month dropdown

  useEffect(() => {
    const onClick = (e) => {
      const inBtn =
        monthBtnRef.current && monthBtnRef.current.contains(e.target);
      const inDrop =
        monthDropRef.current && monthDropRef.current.contains(e.target);
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

  return (
    <div className="p-4 flex flex-col gap-4 no-scrollbar">
      {/* Welcome + Walk-In */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-md text-secondary-grey300">
          Welcome, Dr. Millin Chavan. Here's an overview of your practice.
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
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="text-[16px] font-medium text-secondary-grey400">
              Total Patients
            </div>
            <span className="text-[26px] font-bold text-secondary-grey400">
              12,043
            </span>
          </div>
          {/* right icon badge */}
          <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center">
            <img src={appointementWhite} alt="" className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="text-[16px] font-medium text-secondary-grey400">
              Total Appointments Booked
            </div>
            <span className="text-[26px] font-bold text-secondary-grey400">
              12,043
            </span>
          </div>
          {/* right icon badge */}
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
            className={`inline-flex items-center gap-2 px-3 h-8 rounded-md border border-secondary-grey200 bg-white text-sm text-[#424242] ${
              isMonthOpen ? "ring-1 ring-[#2372EC]/30" : ""
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
              className={`w-3 h-3 transition-transform ${
                isMonthOpen ? "rotate-180" : ""
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
                    className={`w-[108px] h-8 px-2 py-1 rounded text-secondary-grey400 text-left ${
                      selectedMonth === m
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
          value={103}
          percent={12}
          periodText="from last Year"
          variant="profit"
          icon={<img src={appointementWhite} alt="" className="w-5 h-5" />}
        />
        <Overview_cards
          title="Avg. Engage Patient"
          value={80}
          percent={-8}
          periodText="from last Year"
          variant="loss"
          icon={<img src={engageWhite} alt="" className="w-5 h-5" />}
        />
        <Overview_cards
          title="Avg. Patient Admitted"
          value={4}
          percent={12}
          periodText="from last Year"
          variant="profit"
          icon={<img src={admitWhite} alt="" className="w-5 h-5" />}
        />
        <Overview_cards
          title="Avg. No-Show Patients"
          value={5}
          percent={-12}
          periodText="from last Year"
          variant="loss"
          icon={<img src={admitWhite} alt="" className="w-5 h-5" />}
        />
        <Overview_cards
          title="Avg. time Spent/ Patient"
          value={"06:05 min"}
          percent={5}
          periodText="from last Year"
          variant="profit"
          icon={<img src={avgTimeWhite} alt="" className="w-5 h-5" />}
        />
        <Overview_cards
          title="Avg. Token Utilization"
          value={"85 Tokens"}
          percent={12}
          periodText="from last Year"
          variant="profit"
          icon={<img src={tokenWhite} alt="" className="w-5 h-5" />}
        />
        <Overview_cards
          title="Avg. Waiting Time"
          value={"12:30 min / Patient"}
          percent={12}
          periodText="from last year"
          variant="profit"
          icon={<img src={waitingWhite} alt="" className="w-5 h-5" />}
        />
        <Overview_cards
          title="Avg. New Patient Visit"
          value={"12 Patients"}
          percent={12}
          periodText="from last year"
          variant="profit"
          icon={<img src={newPatientWhite} alt="" className="w-5 h-5" />}
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
          if (selectedSlotId) {
            try {
              loadAppointmentsForSelectedSlot();
            } catch {}
          }
        }}
      />
    </div>
  );
};

export default DocDashboard;
