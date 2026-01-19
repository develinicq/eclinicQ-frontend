import React, { useEffect, useRef, useState } from "react";
import useToastStore from "@/store/useToastStore";
import UniversalLoader from "../../components/UniversalLoader";
import {
  Calendar,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  ChevronDown,
} from "lucide-react";
import GeneralDrawer from "../GeneralDrawer/GeneralDrawer";
import RadioButton from "../GeneralDrawer/RadioButton";
import InputWithMeta from "../GeneralDrawer/InputWithMeta";
import Dropdown from "../GeneralDrawer/Dropdown";
import {
  findPatientSlots,
  bookWalkInAppointment,
} from "../../services/authService";
import { classifyISTDayPart, buildISTRangeLabel } from "../../lib/timeUtils";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import calendarWhite from "/Doctor_module/sidebar/calendar_white.png";

// UI-only Book Appointment Drawer using GeneralDrawer and shared inputs
// Integrated Book Appointment Drawer fetching real slots and booking via APIs
export default function BookAppointmentDrawer({
  open,
  onClose,
  onSave,
  doctorId,
  clinicId,
  hospitalId,
  onBookedRefresh,
}) {
  // Wrap public calendar image as an icon component for InputWithMeta
  const CalendarWhiteIcon = () => (
    <img src={calendarWhite} alt="Calendar" className="w-4 h-4" />
  );
  const { addToast } = useToastStore();
  const [isExisting, setIsExisting] = useState(false);
  const [apptType, setApptType] = useState("New Consultation");
  const [reason, setReason] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const dobRef = useRef(null);
  const [apptDate, setApptDate] = useState(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const apptDateRef = useRef(null);
  const [showDobCalendar, setShowDobCalendar] = useState(false);
  const [showApptDateCalendar, setShowApptDateCalendar] = useState(false);
  const suggestions = [
    "New Consultation",
    "Follow-up Consultation",
    "Review Visit",
  ];
  const reasonSuggestions = ["Cough", "Cold", "Headache", "Nausea"];
  const genders = ["Male", "Female", "Other"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  // Dropdown open states
  const [openApptTypeDD, setOpenApptTypeDD] = useState(false);
  const [openGenderDD, setOpenGenderDD] = useState(false);
  const [openBloodDD, setOpenBloodDD] = useState(false);
  const [openReasonDD, setOpenReasonDD] = useState(false);
  const [openBucketDD, setOpenBucketDD] = useState(false);

  const openOnly = (which) => {
    setOpenApptTypeDD(which === "appt");
    setOpenGenderDD(which === "gender");
    setOpenBloodDD(which === "blood");
    setOpenReasonDD(which === "reason");
    setOpenBucketDD(which === "bucket");
  };

  const toggleOpen = (which) => {
    const isAppt = which === "appt";
    const isGender = which === "gender";
    const isBlood = which === "blood";
    const isReason = which === "reason";
    const alreadyOpen =
      (isAppt && openApptTypeDD) ||
      (isGender && openGenderDD) ||
      (isBlood && openBloodDD);
    if (alreadyOpen) {
      // close all
      openOnly("");
    } else {
      openOnly(which);
    }
  };

  // Real slots from API
  const [grouped, setGrouped] = useState({
    morning: [],
    afternoon: [],
    evening: [],
    night: [],
  });
  const [timeBuckets, setTimeBuckets] = useState([]);
  const [bucketKey, setBucketKey] = useState("morning");
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [booking, setBooking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Close calendars on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      const isCalendarClick = target.closest(".shadcn-calendar-dropdown");
      if (!isCalendarClick) {
        setShowDobCalendar(false);
        setShowApptDateCalendar(false);
      }
    };

    if (showDobCalendar || showApptDateCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDobCalendar, showApptDateCalendar]);

  // Load slots when opened or date/ids change
  useEffect(() => {
    let ignore = false;
    const load = async () => {
      if (!open) return;
      if (!doctorId || (!clinicId && !hospitalId)) return;
      setSelectedSlotId(null);
      setGrouped({ morning: [], afternoon: [], evening: [], night: [] });
      setTimeBuckets([]);
      setLoadingSlots(true);
      setSlotsError("");
      try {
        const resp = await findPatientSlots({
          doctorId,
          date: apptDate,
          clinicId,
          hospitalId,
        });
        const arr = Array.isArray(resp)
          ? resp
          : resp?.data || resp?.slots || [];
        if (ignore) return;
        const grp = (arr || []).reduce(
          (acc, s) => {
            const part = classifyISTDayPart(s.startTime);
            if (!acc[part]) acc[part] = [];
            acc[part].push(s);
            return acc;
          },
          { morning: [], afternoon: [], evening: [], night: [] }
        );
        setGrouped(grp);
        const tb = [];
        if (grp.morning.length) {
          const f = grp.morning[0],
            l = grp.morning[grp.morning.length - 1];
          tb.push({
            key: "morning",
            label: "Morning",
            time: buildISTRangeLabel(f.startTime, l.endTime),
            Icon: Sunrise,
          });
        }
        if (grp.afternoon.length) {
          const f = grp.afternoon[0],
            l = grp.afternoon[grp.afternoon.length - 1];
          tb.push({
            key: "afternoon",
            label: "Afternoon",
            time: buildISTRangeLabel(f.startTime, l.endTime),
            Icon: Sun,
          });
        }
        if (grp.evening.length) {
          const f = grp.evening[0],
            l = grp.evening[grp.evening.length - 1];
          tb.push({
            key: "evening",
            label: "Evening",
            time: buildISTRangeLabel(f.startTime, l.endTime),
            Icon: Sunset,
          });
        }
        if (grp.night.length) {
          const f = grp.night[0],
            l = grp.night[grp.night.length - 1];
          tb.push({
            key: "night",
            label: "Night",
            time: buildISTRangeLabel(f.startTime, l.endTime),
            Icon: Moon,
          });
        }
        setTimeBuckets(tb);
        const firstNonEmpty = tb[0]?.key || "morning";
        setBucketKey(firstNonEmpty);
        const firstSlot = (grp[firstNonEmpty] || [])[0] || null;
        setSelectedSlotId(
          firstSlot ? firstSlot.id || firstSlot.slotId || firstSlot._id : null
        );
      } catch (e) {
        if (!ignore)
          setSlotsError(
            e?.response?.data?.message || e.message || "Failed to load slots"
          );
      } finally {
        if (!ignore) setLoadingSlots(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [open, apptDate, doctorId, clinicId, hospitalId]);

  const requestClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose?.();
    }, 220);
  };

  const canSave = () => {
    if (!selectedSlotId) return false;
    if (isExisting) return mobile.trim().length >= 3;
    return firstName && lastName && dob && gender && bloodGroup && mobile;
  };

  const mapBloodGroup = (bg) => {
    if (!bg) return undefined;
    const base = bg.toUpperCase();
    if (base.endsWith("+")) return base.replace("+", "_POSITIVE");
    if (base.endsWith("-")) return base.replace("-", "_NEGATIVE");
    return base;
  };

  const save = async () => {
    if (!canSave() || booking) return;
    setBooking(true);
    setErrorMsg("");
    setFieldErrors({});
    try {
      let payload;
      if (isExisting) {
        payload = {
          method: "EXISTING",
          bookingMode: "WALK_IN",
          patientId: mobile.trim(),
          reason: reason.trim(),
          slotId: selectedSlotId,
          bookingType: apptType?.toLowerCase().includes("follow")
            ? "FOLLOW_UP"
            : "NEW",
          doctorId,
          clinicId,
          hospitalId,
          date: apptDate,
        };
      } else {
        payload = {
          method: "NEW_USER",
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: mobile.trim(),
          emailId: (email || "").trim() || undefined,
          dob: dob.trim(),
          gender: (gender || "").toUpperCase(),
          bloodGroup: mapBloodGroup(bloodGroup),
          reason: reason.trim(),
          slotId: selectedSlotId,
          bookingType: apptType?.toUpperCase().includes("REVIEW")
            ? "FOLLOW_UP"
            : "NEW",
        };
      }
      await bookWalkInAppointment(payload);

      addToast({
        title: "Appointment Booked",
        message: "Walk-in appointment successfully booked.",
        type: "success",
        duration: 3000
      });

      onBookedRefresh?.();
      onClose?.();
      if (onSave) onSave(payload);
    } catch (e) {
      const msg = e?.message || "Booking failed";

      addToast({
        title: "Booking Failed",
        message: msg,
        type: "error",
        duration: 4000
      });

      const errs = e?.validation || e?.response?.data?.errors || null;
      if (errs && typeof errs === "object") setFieldErrors(errs);
      setErrorMsg(String(msg));
    } finally {
      setBooking(false);
    }
  };
  return (
    <GeneralDrawer
      isOpen={open}
      onClose={onClose}
      title="Book Walk-In Appointment"
      primaryActionLabel={booking ? (
        <div className="flex items-center gap-2">
          <UniversalLoader size={16} style={{ width: 'auto', height: 'auto' }} />
          <span>Booking Appointment...</span>
        </div>
      ) : "Book Appointment"}
      onPrimaryAction={save}
      primaryActionDisabled={!canSave() || booking}
      width={600}
    >
      <div className="flex flex-col gap-4">
        {/* Radios */}
        <div className="flex items-center gap-6">
          <RadioButton
            name="pt"
            value="existing"
            checked={isExisting}
            onChange={(v) => setIsExisting(v === "existing")}
            label="Existing Patients"
          />
          <RadioButton
            name="pt"
            value="new"
            checked={!isExisting}
            onChange={(v) => setIsExisting(v === "existing" ? true : false)}
            label="New Patient"
          />
        </div>

        {/* Body */}
        {isExisting ? (
          <div className="">
            <InputWithMeta
              label="Patient"
              requiredDot
              value={mobile}
              onChange={setMobile}
              placeholder="Search Patient by name, Abha id, Patient ID or Contact Number"
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
              <InputWithMeta
                label="First Name"
                requiredDot
                value={firstName}
                onChange={setFirstName}
                placeholder="Enter First Name"
              />
              <InputWithMeta
                label="Last Name"
                requiredDot
                value={lastName}
                onChange={setLastName}
                placeholder="Enter Last Name"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
              <InputWithMeta
                label="Mobile Number"
                requiredDot
                value={mobile}
                onChange={setMobile}
                placeholder="Enter Mobile Number"
              />
              <div className="relative">
                <InputWithMeta
                  label="Date of Birth"
                  requiredDot
                  value={dob}
                  placeholder="Select Date of Birth"
                  RightIcon={CalendarWhiteIcon}
                  onIconClick={() => setShowDobCalendar((v) => !v)}
                  dropdownOpen={showDobCalendar}
                  onRequestClose={() => setShowDobCalendar(false)}
                />
                {showDobCalendar && (
                  <div className="shadcn-calendar-dropdown absolute z-[10000]  bg-white border border-gray-200 rounded-xl shadow-2xl p-2">
                    <ShadcnCalendar
                      mode="single"
                      selected={dob ? new Date(dob) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          const year = date.getFullYear();
                          const month = String(date.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const day = String(date.getDate()).padStart(2, "0");
                          setDob(`${year}-${month}-${day}`);
                        }
                        setShowDobCalendar(false);
                      }}
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      className="rounded-lg p-1"
                      classNames={{
                        day_selected:
                          "bg-blue-primary250 text-white hover:bg-blue-primary250",
                        // keep today subtle default; no blue accents
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
              <div className="relative">
                <InputWithMeta
                  label="Blood Group"
                  requiredDot
                  value={bloodGroup}
                  onChange={setBloodGroup}
                  placeholder="Select Blood Group"
                  RightIcon={ChevronDown}
                  onFieldOpen={() => toggleOpen("blood")}
                  dropdownOpen={openBloodDD}
                />
                <Dropdown
                  open={openBloodDD}
                  onClose={() => setOpenBloodDD(false)}
                  items={bloodGroups.map((bg) => ({ label: bg, value: bg }))}
                  onSelect={(it) => setBloodGroup(it.value)}
                  anchorClassName=""
                  className="w-full"
                  selectedValue={bloodGroup}
                />
              </div>
              <div className="relative">
                <InputWithMeta
                  label="Gender"
                  requiredDot
                  value={gender}
                  onChange={setGender}
                  placeholder="Select Gender"
                  RightIcon={ChevronDown}
                  onFieldOpen={() => toggleOpen("gender")}
                  dropdownOpen={openGenderDD}
                />
                <Dropdown
                  open={openGenderDD}
                  onClose={() => setOpenGenderDD(false)}
                  items={genders.map((g) => ({ label: g, value: g }))}
                  onSelect={(it) => setGender(it.value)}
                  anchorClassName=""
                  className="w-full"
                  selectedValue={gender}
                />
              </div>
            </div>
            <div className="">
              <InputWithMeta
                label="Email ID"
                value={email}
                onChange={setEmail}
                placeholder="Enter Email"
              />
            </div>
          </>
        )}

        <div className="relative">
          <InputWithMeta
            label="Appointment Type"
            requiredDot
            value={apptType}
            onChange={setApptType}
            placeholder="Select or Enter Appointment Type"
            RightIcon={ChevronDown}
            onFieldOpen={() => toggleOpen("appt")}
            dropdownOpen={openApptTypeDD}
          />
          <Dropdown
            open={openApptTypeDD}
            onClose={() => setOpenApptTypeDD(false)}
            items={[
              "New Consultation",
              "Follow-up Consultation",
              "Review Visit",
              "Routine Health Check-up",
              "Emergency OPD (Non-admission)",
              "Second Opinion",
            ].map((t) => ({ label: t, value: t }))}
            onSelect={(it) => setApptType(it.value)}
            className="w-full"
            selectedValue={apptType}
          />
          <div className="flex gap-2 items-center mt-1">
            <div className="text-xs text-blue-primary250">Suggestion:</div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  className="px-1 py-0.5 bg-secondary-grey50 rounded-[4px] min-w-[18px] text-xs text-secondary-grey300 hover:bg-gray-50"
                  type="button"
                  onClick={() => setApptType(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <InputWithMeta
            label="Reason for Visit"
            value={reason}
            onChange={setReason}
            placeholder="Enter Reason for Visit"
          />
          <div className="flex gap-2 items-center mt-1">
            <div className="text-xs text-blue-primary250">Suggestion:</div>
            <div className="flex flex-wrap gap-2">
              {reasonSuggestions.map((s) => (
                <button
                  key={s}
                  className="px-1 py-0.5 bg-secondary-grey50 rounded-[4px] min-w-[18px] text-xs text-secondary-grey300 hover:bg-gray-50"
                  type="button"
                  onClick={() => setReason(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-secondary-grey150 w-0.5px h-[1px] "></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
          <div className="relative">
            <InputWithMeta
              label="Appointment Date"
              requiredDot
              value={apptDate}
              onChange={setApptDate}
              placeholder="YYYY-MM-DD"
              RightIcon={CalendarWhiteIcon}
              onIconClick={() => setShowApptDateCalendar((v) => !v)}
              dropdownOpen={showApptDateCalendar}
              onRequestClose={() => setShowApptDateCalendar(false)}
            />
            {showApptDateCalendar && (
              <div className="shadcn-calendar-dropdown absolute z-[10000] mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl">
                <ShadcnCalendar
                  mode="single"
                  selected={apptDate ? new Date(apptDate) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const day = String(date.getDate()).padStart(2, "0");
                      setApptDate(`${year}-${month}-${day}`);
                    }
                    setShowApptDateCalendar(false);
                  }}
                  captionLayout="dropdown"
                  fromYear={new Date().getFullYear() - 1}
                  toYear={new Date().getFullYear() + 1}
                  className="rounded-lg "
                  classNames={{
                    day_selected: "bg-blue-600 text-white hover:bg-blue-600",
                    // keep other controls neutral; no blue accents
                  }}
                />
              </div>
            )}
          </div>
          {/* Available Slot visible for both Existing/New patients */}
          <div className="flex flex-col gap-2">
            <div className="relative">
              <InputWithMeta
                label="Available Slot"
                requiredDot
                value={(() => {
                  if (loadingSlots) return "Loading…";
                  if (!timeBuckets.length) return "No slots available";
                  const cur =
                    timeBuckets.find((tb) => tb.key === bucketKey) ||
                    timeBuckets[0];
                  const t = cur?.time || "loading…";
                  return `${cur.label} - (${t})`;
                })()}
                rightMeta={(() => {
                  const curSlots = grouped[bucketKey] || [];
                  const curSlot = curSlots[0];
                  if (!curSlot) return null;
                  // Use availableTokens if present, else fallback logic if needed
                  const avail = curSlot.availableTokens !== undefined ? curSlot.availableTokens : (curSlot.maxTokens || 0);
                  return `${avail} Tokens Available`;
                })()}
                onChange={() => { }}
                placeholder="Select"
                RightIcon={ChevronDown}
                onFieldOpen={() => openOnly("bucket")}
                dropdownOpen={openBucketDD}
                onRequestClose={() => setOpenBucketDD(false)}
                dropdown={
                  <Dropdown
                    open={openBucketDD}
                    onClose={() => setOpenBucketDD(false)}
                    items={timeBuckets.map(({ key, label, time }) => ({
                      label: `${label} - (${time || "loading…"})`,
                      value: key,
                    }))}
                    onSelect={(it) => {
                      const key = it.value;
                      setBucketKey(key);
                      const firstSlot = (grouped[key] || [])[0] || null;
                      setSelectedSlotId(
                        firstSlot
                          ? firstSlot.id || firstSlot.slotId || firstSlot._id
                          : null
                      );
                      setOpenBucketDD(false);
                    }}
                    className="w-full"
                    selectedValue={bucketKey}
                  />
                }
              />
            </div>
            {loadingSlots && (
              <div className="text-xs text-gray-500">Loading slots…</div>
            )}
            {slotsError && (
              <div className="text-xs text-red-600">{slotsError}</div>
            )}
          </div>
        </div>
       
      </div>
    </GeneralDrawer>
  );
}
