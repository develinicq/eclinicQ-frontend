import React, { useEffect, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Clock, Calendar, ChevronLeft, ChevronRight, ChevronDown, Bell, Sunrise, Sun, Sunset, Moon, X } from "lucide-react";
import AvatarCircle from '../../../components/AvatarCircle';
import Button from '../../../components/Button';
import Badge from '../../../components/Badge';
import OverviewStatCard from '../../../components/OverviewStatCard';
import Toggle from '../../../components/FormItems/Toggle';
import QueueTable from './QueueTable';

// PreScreening Drawer redesigned to match the screenshot with dynamic values
const PreScreeningDrawer = ({ show, patient, onClose, onSave, initialVitals }) => {
  // Normalize patient coming from queue row
  const name = patient?.patientName || patient?.name || "";
  const genderShort = patient?.gender || ""; // 'M' / 'F'
  const gender = genderShort === 'M' ? 'Male' : genderShort === 'F' ? 'Female' : genderShort || '';
  // From age like "12/05/1985 (39Y)" derive dob and age
  const ageStr = patient?.age || "";
  const dob = ageStr.split(" (")[0] || "";
  const ageYears = (ageStr.match(/\((\d+)Y\)/) || [])[1] || "";
  const token = patient?.token ?? "";

  const [vitals, setVitals] = useState({
    bpSys: "",
    bpDia: "",
    spo2: "",
    pulse: "",
    respRate: "",
    tempC: "",
    heightFt: "",
    heightIn: "",
    weightKg: "",
    waistCm: "",
    bmi: "",
    pain: "",
  });

  // Load existing vitals for this token (if any)
  useEffect(() => {
    if (!show) return;
    if (initialVitals && token) {
      setVitals((s) => ({ ...s, ...initialVitals }));
    }
  }, [show, token, initialVitals]);

  // Auto-calc BMI when height/weight changes
  useEffect(() => {
    const hFt = parseFloat(vitals.heightFt) || 0;
    const hIn = parseFloat(vitals.heightIn) || 0;
    const totalIn = hFt * 12 + hIn;
    const meters = totalIn > 0 ? totalIn * 0.0254 : 0;
    const kg = parseFloat(vitals.weightKg) || 0;
    const bmi = meters > 0 ? kg / (meters * meters) : 0;
    const val = bmi ? bmi.toFixed(1) : "";
    if (val !== vitals.bmi) setVitals((s) => ({ ...s, bmi: val }));
  }, [vitals.heightFt, vitals.heightIn, vitals.weightKg]);

  const set = (field) => (e) => setVitals((s) => ({ ...s, [field]: e.target.value }));

  const Label = ({ children }) => (
    <div className="text-[12px] text-gray-700 mb-1 font-medium">{children}</div>
  );
  const Box = ({ children }) => (
    <div className="bg-white border border-gray-200 rounded-md px-2 py-1.5 flex items-center gap-2">{children}</div>
  );
  const Unit = ({ children }) => (
    <span className="text-[11px] text-gray-500 ml-auto">{children}</span>
  );

  const handleSave = () => {
    onSave?.({ token, vitals });
    onClose?.();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`fixed z-50 transition-transform duration-500 ${show ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          top: 32,
          right: show ? 32 : 0,
          bottom: 32,
          width: 640,
          maxWidth: '100vw',
          background: 'white',
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold">Add Pre-Screening</h2>
            <div className="flex items-center gap-3">
              <button className="text-blue-600 text-sm font-medium border border-blue-200 rounded px-2 py-1 bg-blue-50">Print Rx</button>
              <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>✕</button>
            </div>
          </div>
          {/* Patient Details */}
          <div className="bg-[#F8FAFC] rounded-lg p-4 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <AvatarCircle name={name} size="l" />
              <div>
                <div className="font-bold text-[16px]">{name}</div>
                <div className="text-[11px] text-gray-600">{gender} | {dob} {ageYears && `( ${ageYears}Y )`}</div>
                <div className="text-[11px] text-blue-600 mt-1">MRN: P654321 | ABHA ID: ABHA-98765-XYZ</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-gray-500">Token Number</div>
              <div className="text-[22px] font-bold text-blue-600">{String(token || 0).padStart(2,'0')}</div>
            </div>
          </div>

          {/* Vitals & Biometrics */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-[14px] mb-2">Vitals & Biometrics</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {/* BP */}
              <div>
                <Label>Blood Pressure</Label>
                <div className="flex gap-2">
                  <Box>
                    <input value={vitals.bpSys} onChange={set('bpSys')} className="w-16 outline-none text-sm" placeholder="Sys" inputMode="numeric" />
                  </Box>
                  <Box>
                    <input value={vitals.bpDia} onChange={set('bpDia')} className="w-16 outline-none text-sm" placeholder="Dia" inputMode="numeric" />
                    <Unit>mmHg</Unit>
                  </Box>
                </div>
              </div>

              {/* SpO2 */}
              <div>
                <Label>Oxygen Saturation</Label>
                <Box>
                  <input value={vitals.spo2} onChange={set('spo2')} className="w-20 outline-none text-sm" placeholder="Value" inputMode="numeric" />
                  <Unit>%</Unit>
                </Box>
              </div>

              {/* Pulse */}
              <div>
                <Label>Pulse Rate</Label>
                <Box>
                  <input value={vitals.pulse} onChange={set('pulse')} className="w-20 outline-none text-sm" placeholder="Value" inputMode="numeric" />
                  <Unit>bpm</Unit>
                </Box>
              </div>

              {/* RR */}
              <div>
                <Label>Respiratory Rate</Label>
                <Box>
                  <input value={vitals.respRate} onChange={set('respRate')} className="w-20 outline-none text-sm" placeholder="Value" inputMode="numeric" />
                  <Unit>rpm</Unit>
                </Box>
              </div>

              {/* Temp */}
              <div>
                <Label>Body Temperature</Label>
                <Box>
                  <input value={vitals.tempC} onChange={set('tempC')} className="w-20 outline-none text-sm" placeholder="Value" inputMode="numeric" />
                  <Unit>°C</Unit>
                </Box>
              </div>

              {/* Height */}
              <div>
                <Label>Height</Label>
                <div className="flex gap-2">
                  <Box>
                    <input value={vitals.heightFt} onChange={set('heightFt')} className="w-16 outline-none text-sm" placeholder="ft" inputMode="numeric" />
                    <Unit>ft</Unit>
                  </Box>
                  <Box>
                    <input value={vitals.heightIn} onChange={set('heightIn')} className="w-16 outline-none text-sm" placeholder="in" inputMode="numeric" />
                    <Unit>in</Unit>
                  </Box>
                </div>
              </div>

              {/* Weight */}
              <div>
                <Label>Weight</Label>
                <Box>
                  <input value={vitals.weightKg} onChange={set('weightKg')} className="w-20 outline-none text-sm" placeholder="Value" inputMode="numeric" />
                  <Unit>kg</Unit>
                </Box>
              </div>

              {/* Waist */}
              <div>
                <Label>Waist Circumference</Label>
                <Box>
                  <input value={vitals.waistCm} onChange={set('waistCm')} className="w-20 outline-none text-sm" placeholder="Value" inputMode="numeric" />
                  <Unit>cm</Unit>
                </Box>
              </div>

              {/* BMI */}
              <div>
                <Label>BMI</Label>
                <Box>
                  <input value={vitals.bmi} readOnly className="w-20 outline-none text-sm bg-transparent" placeholder="" />
                </Box>
              </div>

              {/* Pain */}
              <div>
                <Label>Pain Scale</Label>
                <Box>
                  <input value={vitals.pain} onChange={set('pain')} className="w-20 outline-none text-sm" placeholder="Value" inputMode="numeric" />
                </Box>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="mb-4">
            <div className="font-semibold text-[14px] mb-2">Medical History</div>
            <div className="flex gap-2 mb-2 text-xs">
              <span className="text-blue-600 border border-blue-200 rounded px-2 py-1 cursor-pointer">Problems</span>
              <span className="text-gray-500 border border-gray-200 rounded px-2 py-1 cursor-pointer">Allergies</span>
              <span className="text-gray-500 border border-gray-200 rounded px-2 py-1 cursor-pointer">Immunizations</span>
              <span className="text-gray-500 border border-gray-200 rounded px-2 py-1 cursor-pointer">Social</span>
              <span className="text-gray-500 border border-gray-200 rounded px-2 py-1 cursor-pointer">Family History</span>
            </div>
            <div className="text-xs text-blue-600 cursor-pointer">+ Add Problems & Conditions</div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-auto">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSave}>Save & Continue</button>
          </div>
        </div>
      </div>
    </>
  );
};

// Walk-in Appointment Drawer (UI from screenshot)
const WalkInAppointmentDrawer = ({ show, onClose, timeSlots, slotValue, setSlotValue }) => {
  const [isExisting, setIsExisting] = useState(false); // default to New Patient
  const [apptType, setApptType] = useState("New Consultation");
  const [reason, setReason] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const suggestions = [
    'New Consultation', 'Follow-up Consultation', 'Review Visit'
  ];
  const reasonSuggestions = ['Cough','Cold','Headache','Nausea','Dizziness','Muscle Pain','Sore Throat'];
  const genders = ['Male','Female','Other'];
  const bloodGroups = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`fixed z-50 transition-transform duration-500 ${show ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          top: 24,
          right: show ? 24 : 0,
          bottom: 24,
          width: 520,
          maxWidth: '100vw',
          background: 'white',
          borderTopLeftRadius: 14,
          borderBottomLeftRadius: 14,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[18px] font-semibold">Book Walk-In Appointment</h2>
            <div className="flex items-center gap-2">
              <button disabled className="text-gray-400 bg-gray-100 border border-gray-200 text-sm font-medium rounded px-3 py-1.5 cursor-not-allowed">Book Appointment</button>
              <button className="text-gray-500 hover:text-gray-700" onClick={onClose} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Patient Toggle */}
          <div className="flex items-center gap-6 mt-2 mb-4">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="radio" name="pt" checked={isExisting} onChange={() => setIsExisting(true)} />
              Existing Patients
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="radio" name="pt" checked={!isExisting} onChange={() => setIsExisting(false)} />
              New Patient
            </label>
          </div>

          {/* Form content (scrollable) */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-1">
            {/* Existing patient search OR New patient details */}
            {isExisting ? (
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Search Patient by name, Abha id, Patient ID or Contact Number"
                />
              </div>
            ) : (
              <>
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                    <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="Enter First Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="Enter Last Name" />
                  </div>
                </div>
                {/* DOB / Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input value={dob} onChange={(e)=>setDob(e.target.value)} type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm pr-8 focus:outline-none focus:border-blue-500" placeholder="Select Date Of Birth" />
                      <Calendar className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
                    <select value={gender} onChange={(e)=>setGender(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                      <option value="" disabled>Select Gender</option>
                      {genders.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                {/* Blood group / Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group <span className="text-red-500">*</span></label>
                    <select value={bloodGroup} onChange={(e)=>setBloodGroup(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                      <option value="" disabled>Select Blood Group</option>
                      {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                    <input value={mobile} onChange={(e)=>setMobile(e.target.value)} type="tel" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="Enter Mobile Number" />
                  </div>
                </div>
                {/* Email */}
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="Enter Email" />
                </div>
              </>
            )}

            {/* Appointment Type */}
            <div className="mb-3 mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type <span className="text-red-500">*</span></label>
              <select
                value={apptType}
                onChange={(e) => setApptType(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                {suggestions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {suggestions.map((s) => (
                  <button key={s} type="button" className="px-2 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50" onClick={() => setApptType(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason for Visit */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
              <div className="relative">
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter Reason for Visit"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {reasonSuggestions.map((s) => (
                  <button key={s} type="button" className="px-2 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50" onClick={() => setReason(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Row: Date and Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm pr-8" defaultValue="Today, 03/04/2025" />
                  <Calendar className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Slot <span className="text-red-500">*</span></label>
                  <span className="text-xs text-green-600">5 Tokens available</span>
                </div>
                <div className="relative">
                  <select
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={slotValue}
                    onChange={(e) => setSlotValue(e.target.value)}
                  >
                    {timeSlots.map((t) => (
                      <option key={t.key} value={t.key}>{t.label} ({t.time})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 mt-2 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50" onClick={onClose}>Cancel</button>
              <button className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">Book Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { appointement } from "../../../../public/index.js";
const Queue = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTimeSlot] = useState("Morning (10:00 am - 12:30 pm)");
  const [slotValue, setSlotValue] = useState("morning");
  const [slotOpen, setSlotOpen] = useState(false);
  const slotAnchorRef = useRef(null);
  const slotMenuRef = useRef(null);
  const [slotPos, setSlotPos] = useState({ top: 0, left: 0, width: 320 });
  const [currentDate] = useState("Mon, 03/04/2025");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [queuePaused, setQueuePaused] = useState(false);
  // removed: startCheckups toggle; only one toggle remains (Start Session)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [patientStartedAt, setPatientStartedAt] = useState(null); // ms timestamp
  const [elapsed, setElapsed] = useState(0); // seconds for active patient
  const [removingToken, setRemovingToken] = useState(null);
  const [incomingToken, setIncomingToken] = useState(null);

  // Sample queue data matching the design
  const [queueData, setQueueData] = useState([
    // Updated DOB to match screenshot (age 39Y with DOB 12/05/1985)
    { token: 1,  patientName: "Rahul Sharma",       gender: "M", age: "12/05/1985 (39Y)", appointmentType: "Review Visit",          expectedTime: "10:30 AM", bookingType: "Online", reasonForVisit: "Fever & Weakness",      status: "Check-In" },
    { token: 2,  patientName: "Priya Mehta",        gender: "F", age: "08/09/1962 (61Y)", appointmentType: "Follow-up Consultation", expectedTime: "11:00 AM", bookingType: "Online", reasonForVisit: "Annual Checkup",        status: "Check-In" },
    { token: 3,  patientName: "Arjun Verma",        gender: "M", age: "23/11/1987 (36Y)", appointmentType: "New Consultation",       expectedTime: "11:45 AM", bookingType: "Online", reasonForVisit: "Back Pain",             status: "Check-In" },
    { token: 4,  patientName: "Sneha Deshpande",    gender: "F", age: "14/07/1998 (26Y)", appointmentType: "New Consultation",       expectedTime: "12:30 PM", bookingType: "Walk-In", reasonForVisit: "Skin Allergy",          status: "Check-In" },
    { token: 5,  patientName: "Kunal Joshi",        gender: "M", age: "05/02/1976 (48Y)", appointmentType: "Second Opinion",         expectedTime: "1:30 PM",  bookingType: "Walk-In", reasonForVisit: "High BP",                status: "Check-In" },
    { token: 6,  patientName: "Neha Iyer",          gender: "F", age: "30/10/1995 (28Y)", appointmentType: "New Consultation",       expectedTime: "2:00 PM",  bookingType: "Online", reasonForVisit: "Migraine",               status: "Check-In" },
    { token: 7,  patientName: "Vikas Gupta",        gender: "M", age: "19/04/1983 (41Y)", appointmentType: "Second Opinion",         expectedTime: "2:30 PM",  bookingType: "Walk-In", reasonForVisit: "Diabetes Check",        status: "Check-In" },
    { token: 8,  patientName: "Radhika Nair",       gender: "F", age: "06/01/1991 (33Y)", appointmentType: "Review Visit",          expectedTime: "3:15 PM",  bookingType: "Online", reasonForVisit: "Pregnancy Consultation", status: "Check-In" },
    { token: 9,  patientName: "Ankit Saxena",       gender: "M", age: "11/06/1989 (35Y)", appointmentType: "Review Visit",          expectedTime: "4:15 PM",  bookingType: "Online", reasonForVisit: "Heartburn & Acidity",   status: "Check-In" },
    { token: 10, patientName: "Pooja Kulkarni",     gender: "F", age: "15/08/1993 (30Y)", appointmentType: "Second Opinion",         expectedTime: "4:45 PM",  bookingType: "Online", reasonForVisit: "Thyroid Checkup",        status: "Check-In" },
    { token: 11, patientName: "Manish Choudhary",   gender: "M", age: "12/12/1986 (37Y)", appointmentType: "Follow-up Consultation", expectedTime: "5:45 PM",  bookingType: "Walk-In", reasonForVisit: "Anxiety & Stress",      status: "Check-In" },
    { token: 12, patientName: "Kavita Rao",         gender: "F", age: "20/03/1980 (44Y)", appointmentType: "New Consultation",       expectedTime: "6:15 PM",  bookingType: "Walk-In", reasonForVisit: "Menopause Symptoms",    status: "Check-In" },
    { token: 13, patientName: "Rohan Agarwal",      gender: "M", age: "07/05/1994 (30Y)", appointmentType: "Follow-up Consultation", expectedTime: "10:15 AM", bookingType: "Online", reasonForVisit: "Asthma",                 status: "Check-In" },
    { token: 14, patientName: "Deepika Singh",      gender: "F", age: "09/11/1987 (36Y)", appointmentType: "Review Visit",          expectedTime: "11:00 AM", bookingType: "Walk-In", reasonForVisit: "PCOD Treatment",         status: "Check-In" },
    { token: 15, patientName: "Anirudh Patel",      gender: "M", age: "15/07/1982 (42Y)", appointmentType: "Review Visit",          expectedTime: "12:15 PM", bookingType: "Online", reasonForVisit: "Knee Pain",              status: "Check-In" },
    { token: 16, patientName: "Swati Mishra",       gender: "F", age: "03/09/1990 (33Y)", appointmentType: "Second Opinion",         expectedTime: "12:45 PM", bookingType: "Online", reasonForVisit: "Eye Checkup",             status: "Check-In" },
  ]);

  // Appointment requests data for sidebar
  const appointmentRequests = [
    { name: "Alok Verma",      gender: "M", age: "12/05/1985 (39Y)", date: "Mon, 12 June 2024",     time: "Morning, 10:00 am - 12:30 pm", secondary: "Reschedule" },
    { name: "Bhavna Mehta",    gender: "F", age: "03/15/1980 (44Y)", date: "Tuesday, 13 June 2024", time: "Afternoon, 1:00 pm - 3:30 pm", secondary: "Reschedule" },
    { name: "Chirag Modi",     gender: "M", age: "08/07/1990 (33Y)", date: "Wednesday, 14 June 2024", time: "Evening, 5:00 pm - 6:30 pm", secondary: "Reschedule" },
    { name: "Deepa Malhotra",  gender: "F", age: "11/25/1975 (48Y)", date: "Thursday, 15 June 2024",  time: "Morning, 9:00 am - 11:00 am", secondary: "Cancel" },
    { name: "Eshan Mehra",     gender: "M", age: "05/30/1988 (36Y)", date: "Friday, 16 June 2024",   time: "", secondary: "Reschedule" },
  ];

  const filters = ["In Waiting", "Engaged", "No show", "Admitted", "All"];

  // Time slot options
  const timeSlots = [
    { key: 'morning', label: 'Morning', time: '10:00am-12:00pm', Icon: Sunrise },
    { key: 'afternoon', label: 'Afternoon', time: '2:00pm-4:00pm', Icon: Sun },
    { key: 'evening', label: 'Evening', time: '6:00pm-8:00pm', Icon: Sunset },
    { key: 'night', label: 'Night', time: '8:30pm-10:30pm', Icon: Moon },
  ];

  // Close dropdown on outside click or Esc
  useEffect(() => {
    const onClick = (e) => {
      const a = slotAnchorRef.current;
      const m = slotMenuRef.current;
      if (a && a.contains(e.target)) return; // click on button/anchor
      if (m && m.contains(e.target)) return; // click inside menu
      setSlotOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setSlotOpen(false); };
    window.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const getFilterCount = (filter) => {
    if (filter === "All") return queueData.length;
    if (filter === "In Waiting") return queueData.filter((p) => p.status === "Check-In").length;
    if (filter === "Engaged") return 0;
    if (filter === "No show") return 0;
    if (filter === "Admitted") return 0;
    return 0;
  };

  // Derive the active patient from currentIndex
  const activePatient = useMemo(() => queueData[currentIndex] || null, [queueData, currentIndex]);

  // Start/stop timer for active patient
  useEffect(() => {
    if (!sessionStarted || queuePaused || !patientStartedAt) return;
    const id = setInterval(() => {
      const now = Date.now();
      setElapsed(Math.max(0, Math.floor((now - patientStartedAt) / 1000)));
    }, 1000);
    return () => clearInterval(id);
  }, [sessionStarted, queuePaused, patientStartedAt]);

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const handleToggleSession = () => {
    if (sessionStarted) {
      // end session
      setSessionStarted(false);
      setQueuePaused(false);
  // nothing else to reset
      setPatientStartedAt(null);
      setElapsed(0);
    } else {
      // start session at first check-in patient
      const firstIdx = Math.max(0, queueData.findIndex((p) => p.status === 'Check-In'));
      setCurrentIndex(firstIdx === -1 ? 0 : firstIdx);
      setSessionStarted(true);
      setQueuePaused(false);
      setPatientStartedAt(Date.now());
      setElapsed(0);
    }
  };

  const gotoNextPatient = () => {
    const next = currentIndex + 1;
    if (next < queueData.length) {
      setCurrentIndex(next);
      setPatientStartedAt(Date.now());
      setElapsed(0);
    }
  };

  const completeCurrentPatient = () => {
    const ANIM_MS = 300;
    if (!activePatient) return;
    // start slide-out animation for active row
    setRemovingToken(activePatient.token);
    // animate active card exit
    const activeCard = document.querySelector('#active-patient-card');
    if (activeCard) {
      activeCard.classList.remove('active-card-enter');
      activeCard.classList.add('active-card-exit');
    }
    setTimeout(() => {
      setQueueData((prev) => {
        const newArr = prev.filter((_, i) => i !== currentIndex);
        // decide new index (stay at same index to naturally advance to next row)
        const nextIdx = newArr.length === 0 ? 0 : Math.min(currentIndex, newArr.length - 1);
        setCurrentIndex(nextIdx);
        if (newArr.length > 0) {
          const nextToken = newArr[nextIdx]?.token;
          setIncomingToken(nextToken);
          setPatientStartedAt(Date.now());
          setElapsed(0);
        } else {
          setPatientStartedAt(null);
          setElapsed(0);
        }
        return newArr;
      });
      setRemovingToken(null);
      // animate new active card enter shortly after DOM updates
      setTimeout(() => {
        const card = document.querySelector('#active-patient-card');
        if (card) {
          card.classList.remove('active-card-exit');
          card.classList.add('active-card-enter');
        }
        setIncomingToken(null);
      }, 30);
    }, ANIM_MS);
  };

  const gotoPrevPatient = () => {
    const prev = currentIndex - 1;
    if (prev >= 0) {
      setCurrentIndex(prev);
      setPatientStartedAt(Date.now());
      setElapsed(0);
    }
  };

  // State for check-in UI
  const [checkedInTokens, setCheckedInTokens] = useState(new Set()); // tokens that are checked-in
  const [checkedInToken, setCheckedInToken] = useState(null); // active token for drawer
  const [showPreScreen, setShowPreScreen] = useState(false);
  const [showRightDiv, setShowRightDiv] = useState(false);
  const [rightDivPatient, setRightDivPatient] = useState(null);
  const [preScreenData, setPreScreenData] = useState({}); // token -> vitals
  const [showWalkIn, setShowWalkIn] = useState(false);


  // Handler for Check-In button
  const handleCheckIn = (row) => {
    // Add token to checked-in set and open drawer for that token
    setCheckedInTokens((prev) => new Set(prev).add(row.token));
    setCheckedInToken(row.token);
    setShowPreScreen(true);
  };

  // Handler for closing pre-screening and showing right div
  const handlePreScreenClose = () => {
    setShowPreScreen(false);
    // Find patient by token
    const patient = queueData.find((p) => p.token === checkedInToken) || {};
    setRightDivPatient(patient);
    setTimeout(() => setShowRightDiv(true), 1000); // 1s delay
  };

  // Handler to close right div
  const handleRightDivClose = () => {
    setShowRightDiv(false);
    setCheckedInToken(null);
    setRightDivPatient(null);
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Fixed Header Section */}
      <div className="sticky top-0 z-10 bg-white border-b-[0.5px] border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Time Selector */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={slotAnchorRef}>
              <button
                type="button"
                className="flex items-center bg-white rounded-md border border-gray-200 shadow-sm px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                onClick={(e) => {
                  setSlotOpen((v) => !v);
                  const rect = e.currentTarget.getBoundingClientRect();
                  const width = 320;
                  const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
                  const top = Math.min(rect.bottom + 8, window.innerHeight - 8 - 4); // ensure within viewport vertically
                  setSlotPos({ top, left, width });
                }}
              >
                <span className="font-medium mr-1">
                  {timeSlots.find((t) => t.key === slotValue)?.label || 'Morning'}
                </span>
                <span className="text-gray-500">
                  ({timeSlots.find((t) => t.key === slotValue)?.time || '10:00am-12:00pm'})
                </span>
                <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
              </button>

              {slotOpen && createPortal(
                <div
                  ref={slotMenuRef}
                  className="fixed z-[9999]"
                  style={{ top: slotPos.top, left: slotPos.left, width: slotPos.width }}
                >
                  <div className="bg-white rounded-xl border border-gray-200 shadow-xl">
                    <ul className="py-1">
                      {timeSlots.map(({ key, label, time, Icon }, idx) => (
                        <li key={key}>
                          <button
                            type="button"
                            onClick={() => { setSlotValue(key); setSlotOpen(false); }}
                            className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-blue-50 ${slotValue === key ? 'bg-blue-50' : ''}`}
                          >
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 border border-blue-200 text-blue-600">
                              <Icon className="w-4 h-4" />
                            </span>
                            <span className="flex-1">
                              <span className="block text-[14px] font-semibold text-gray-900">{label}</span>
                              <span className="block text-[13px] text-gray-600">({time})</span>
                            </span>
                          </button>
                          {idx < timeSlots.length - 1 && <div className="h-px bg-gray-200 mx-4" />}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>,
                document.body
              )}
            </div>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center space-x-4">
            <ChevronLeft className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-medium">Today</span>
              <span className="text-gray-700 font-medium">{currentDate}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>

          {/* Walk-in Appointment Badge */}
          <Badge size="large" type="solid" color="blue" hover className="cursor-pointer select-none" onClick={() => setShowWalkIn(true)}>
            Walk-in Appointment
          </Badge>
        </div>
      </div>

  {/* Main Content Area: Overview full-width, then columns */}
  <div className="px-0 pt-0 pb-2 h-[calc(100vh-100px)] flex flex-col overflow-hidden">
        {/* Current Token Banner (session mode) */}
        {sessionStarted && (
          <div className="">
            <div className="w-full bg-[#22C55E] h-[38px] flex items-center relative px-0 rounded-none">
              <div className="flex-1 flex items-center justify-center gap-3">
                <span className="text-white font-medium text-[16px]">Current Token Number</span>
                <span className="inline-flex items-center gap-2 font-bold text-white text-[18px]">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#D1FADF] border border-[#A7F3D0]"></span>
                  {String(activePatient?.token ?? 0).padStart(2, '0')}
                </span>
              </div>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 border border-red-200 bg-white text-red-600 text-xs font-semibold px-2 py-1 rounded transition hover:bg-red-50"
                onClick={() => setQueuePaused(!queuePaused)}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="text-red-500"><rect x="4" y="4" width="2" height="8" rx="1" fill="#EF4444"/><rect x="10" y="4" width="2" height="8" rx="1" fill="#EF4444"/></svg>
                {queuePaused ? 'Resume Queue' : 'Pause Queue'}
              </button>
            </div>
          </div>
        )}
        {/* Overview Section (full width) */}
  {/* Make this container flex so the columns section can take remaining height and scroll inside */}
  <div className="p-2 flex flex-col flex-1 min-h-0">
        <div className=" flex flex-col gap-2">
          <h3 className="text-[#424242] font-medium">Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <OverviewStatCard title="All Appointments" value={queueData.length} />
            <OverviewStatCard title="Checked In" value={queueData.filter((q) => q.status === 'Check-In').length} />
            <OverviewStatCard title="Engaged" value={0} />
            <OverviewStatCard title="No Show/Cancelled" value={0} />
          </div>
        </div>

        {/* Active Patient - only when session is ON */}
        {sessionStarted && activePatient && (
          <div className="mb-2 p-2">
            <h3 className="text-gray-800 font-semibold mb-2">Active Patient</h3>
            <div id="active-patient-card" className="bg-white rounded-lg border border-blue-200 px-4 py-3 flex items-center justify-between text-sm active-card-enter">
              {/* Left composite info */}
              <div className="flex items-center gap-4 min-w-0">
                <AvatarCircle name={activePatient.patientName} size="s" />
                <div className="flex items-center gap-4 min-w-0">
                  {/* Patient core info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-gray-900 truncate max-w-[160px]">{activePatient.patientName}</span>
                      <span className="text-gray-400 text-xs leading-none">↗</span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{activePatient.gender} | {activePatient.age}</div>
                  </div>
                  {/* Divider */}
                    <div className="h-10 w-px bg-gray-200" />
                    {/* Token number */}
                    <div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-gray-500">Token Number</span>
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded border border-blue-300 bg-blue-50 text-[11px] font-medium text-blue-700">
                        {activePatient.token}
                      </span>
                    </div>
                    {/* Reason */}
                    <div className="flex items-center gap-1 text-gray-500">
                      <span className="">Reason for Visit :</span>
                      <span className="font-xs whitespace-nowrap text-gray-700">{activePatient.reasonForVisit}</span>
                    </div>
                  </div>

                </div>
              </div>
              {/* Right controls */}
              <div className="flex items-center gap-3 shrink-0 pl-4">
                <div className="inline-flex items-center gap-1 rounded-md border border-green-200 bg-green-50 px-2 py-1 text-[12px] font-medium text-green-700">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  {formatTime(elapsed)}
                </div>
                <button onClick={completeCurrentPatient} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  End Session
                </button>
                <button className="text-gray-500 hover:text-gray-700 px-2 py-1">⋯</button>
              </div>
            </div>
          </div>
        )}

        {/* Filter + right controls under Active Patient (always visible) */}
        <div className="flex items-center justify-between px-1 py-3">
          {/* Filter Tabs */}
          <div className="flex gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={` px-[6px] py-1 rounded-lg font-medium text-sm transition-colors ${
                  activeFilter === filter ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {filter} <span className="ml-1 text-xs">{getFilterCount(filter)}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {/* Start Session toggle */}
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm">Start Session</span>
              <Toggle checked={sessionStarted} onChange={handleToggleSession} />
            </div>

            {/* Start Check-ups toggle removed as per requirement */}
      <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Tokens Available</span>
              <Badge size="small" type="ghost" color="green" hover>
        5 Out of 100
              </Badge>
            </div>
          </div>

        </div>

        {/* Columns area: left table + right requests (stack on small screens) */}
        <div className="w-full flex flex-col lg:flex-row gap-3 flex-1 min-h-0 overflow-hidden">
          {/* Left Side - Patient Queue Table (using reusable component) */}
          <div className="flex-1 min-w-0 min-h-0 overflow-hidden flex flex-col">
            <QueueTable
              onCheckIn={handleCheckIn}
              checkedInToken={checkedInToken}
              checkedInTokens={checkedInTokens}
              items={queueData}
              removingToken={removingToken}
              incomingToken={incomingToken}
              onRevokeCheckIn={(token) => {
                setCheckedInTokens((prev) => {
                  const n = new Set(prev);
                  n.delete(token);
                  return n;
                });
                if (checkedInToken === token) setCheckedInToken(null);
              }}
              onMarkNoShow={(token) => {
                setQueueData((prev) => prev.filter((p) => p.token !== token));
              }}
            />
          </div>

          {/* Right Side - Appointment Requests (fixed width, scrollable items) */}
          <div className="shrink-0 w-[400px] bg-white rounded-[12px] border-[0.5px] border-[#D6D6D6] h-full overflow-y-auto">
            <div className="">
              <div className="p-3 flex items-center gap-2 bg-[#D6D6D6] bg-opacity-10 border-b-[0.5px] border-gray-400">
                <img src={appointement} alt="Appointment" className="w-5 h-5 mr-2" />
                <h2 className="text-[14px] font-medium text-[#1F2937]">Appointment Request</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {appointmentRequests.map((request, index) => (
                  <div key={index} className="">
                    <div className="flex items-start gap-4 p-3">
                      
                      <div className="flex flex-col w-full gap-2">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-2">
                            <AvatarCircle name={request.name} size="l" />
                            <div className="flex flex-col">
                              <div className="text-[16px] leading-6 font-semibold text-gray-900">{request.name}</div>
                              <div className="text-xs text-gray-500">{request.gender} | {request.age}</div>
                            </div>
                          </div>
                          <button className="text-gray-500 hover:text-gray-700 px-1">⋯</button>
                        </div>

                        <div className="flex flex-col gap-1 text-[14px] text-gray-700">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{request.date}</span>
                          </div>
                          {request.time ? (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{request.time}</span>
                            </div>
                          ) : null}
                        </div>

                        <div className="flex justify-between gap-3">
                            <Button size="large" variant="primary" className="w-full">Accept</Button>
                            <Button size="large" variant="secondary" className="w-full">{request.secondary || 'Reschedule'}</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All Requests</button>
              </div>
            </div>
          </div>
        </div>
        {/* PreScreening Drawer ONLY */}
        <PreScreeningDrawer
          show={showPreScreen}
          patient={queueData.find((p) => p.token === checkedInToken)}
          onClose={handlePreScreenClose}
          onSave={({ token, vitals }) => setPreScreenData((s) => ({ ...s, [token]: vitals }))}
          initialVitals={checkedInToken ? preScreenData[checkedInToken] : undefined}
        />
        {/* Walk-in Appointment Drawer */}
        <WalkInAppointmentDrawer
          show={showWalkIn}
          onClose={() => setShowWalkIn(false)}
          timeSlots={[
            { key: 'morning', label: 'Morning', time: '10:00am-12:00pm' },
            { key: 'afternoon', label: 'Afternoon', time: '2:00pm-4:00pm' },
            { key: 'evening', label: 'Evening', time: '6:00pm-8:00pm' },
            { key: 'night', label: 'Night', time: '8:30pm-10:30pm' },
          ]}
          slotValue={slotValue}
          setSlotValue={setSlotValue}
        />
        </div>
        
      </div>
    </div>
  );
};

export default Queue;

