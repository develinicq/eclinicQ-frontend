import React, { useEffect, useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
// Front Desk Queue: full API-integrated version copied from original before doctor static simplification
import { ChevronDown, Sunrise, Sun, Sunset, Moon, X, RotateCcw, CalendarMinus, CalendarX, User, BedDouble, CheckCheck, Bell, CalendarPlus, UserX, Calendar, Clock, ArrowRight, Play, PauseCircle } from 'lucide-react';
import QueueDatePicker from '../../../components/QueueDatePicker';
import AvatarCircle from '../../../components/AvatarCircle';
import Button from '../../../components/Button';
import { appointement } from '../../../../public/index.js';
import SampleTable from '../../../pages/SampleTable';
import PauseQueueModal from '../../../components/PauseQueueModal';
import SessionTimer from '../../../components/SessionTimer';
import Toggle from '../../../components/FormItems/Toggle';
import BookAppointmentDrawer from '../../../components/Appointment/BookAppointmentDrawer';
import useAuthStore from '../../../store/useAuthStore';
import useFrontDeskAuthStore from '../../../store/useFrontDeskAuthStore';



const formatTime = (seconds) => {
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const more = '/superAdmin/Doctors/Threedots.svg'
const search = '/superAdmin/Doctors/SearchIcon.svg';
const pause = '/fd/Pause.svg';
const checkRound = '/fd/Check Round.svg';
const verified = '/verified-tick.svg'
const stopwatch = '/fd/Stopwatch.svg'
const verifiedYellow = '/fd/verified_yellow.svg'
const toggle_open = '/fd/toggle_open.svg'
const active = '/fd/active.svg'
const appt = '/fd/appt.svg'
const CalendarMinimalistic = '/fd/Calendar Minimalistic.svg'
const ClockCircle = '/fd/Clock Circle.svg'

// PreScreening drawer (same UI)
const DUMMY_REQUESTS = [
	{ id: 101, name: 'Alok Verma', gender: 'M', age: '39Y', dob: '12/05/1985', date: 'Mon, 12 June 2024', time: 'Morning, 10:00 am - 12:30 pm', secondary: 'Ask to Reschedule', doctorName: 'Dr. Arvind Mehta', doctorSpecialty: 'General Physician' },
	{ id: 102, name: 'Bhavna Mehta', gender: 'F', age: '44Y', dob: '08/09/1980', date: 'Tuesday, 13 June 2024', time: 'Afternoon, 1:00 pm - 3:30 pm', secondary: 'Ask to Reschedule', doctorName: 'Dr. Sneha Deshmukh', doctorSpecialty: 'Pediatrician' },
	{ id: 103, name: 'Chirag Modi', gender: 'M', age: '33Y', dob: '23/11/1990', date: 'Wednesday, 14 June 2024', time: 'Evening, 5:00 pm - 6:30 pm', secondary: 'Ask to Reschedule', doctorName: 'Dr. Arvind Mehta', doctorSpecialty: 'General Physician' },
	{ id: 104, name: 'Deepa Malhotra', gender: 'F', age: '48Y', dob: '14/07/1976', date: 'Thursday, 15 June 2024', time: 'Morning, 9:00 am - 11:00 am', secondary: 'Ask to Reschedule', doctorName: 'Dr. Sneha Deshmukh', doctorSpecialty: 'Pediatrician' },
	{ id: 105, name: 'Eshan Mehra', gender: 'M', age: '36Y', dob: '05/02/1988', date: 'Friday, 16 June 2024', time: 'Morning, 10:00 am - 12:30 pm', secondary: 'Ask to Reschedule', doctorName: 'Dr. Arvind Mehta', doctorSpecialty: 'General Physician' }
];

const DUMMY_ACTIVE_PATIENT = {
	patientName: 'Priya Mehta',
	token: 2,
	gender: 'F',
	age: '08/09/1992 (31Y)',
	reasonForVisit: 'Annual Checkup'
};

const DUMMY_PATIENTS = [
	{ token: 1, patientName: 'Rahul Sharma', gender: 'M', dob: '12/05/1985', age: '39Y', appointmentType: 'Review Visit', expectedTime: '10:30 AM', bookingType: 'Online', reason: 'Fever & Weakness', status: 'Checked-In' },
	{ token: 2, patientName: 'Priya Mehta', gender: 'F', dob: '08/09/1992', age: '31Y', appointmentType: 'Follow-up Consultation', expectedTime: '11:00 AM', bookingType: 'Online', reason: 'Annual Checkup', status: 'Checked-In' },
	{ token: 3, patientName: 'Arjun Verma', gender: 'M', dob: '23/11/1987', age: '36Y', appointmentType: 'New Consultation', expectedTime: '11:45 AM', bookingType: 'Online', reason: 'Back Pain', status: 'Waiting' },
	{ token: 4, patientName: 'Sneha Deshpande', gender: 'F', dob: '14/07/1998', age: '25Y', appointmentType: 'New Consultation', expectedTime: '12:30 PM', bookingType: 'Walk-In', reason: 'Skin Allergy', status: 'Waiting' },
	{ token: 5, patientName: 'Kunal Joshi', gender: 'M', dob: '05/02/1990', age: '34Y', appointmentType: 'Second Opinion', expectedTime: '1:30 PM', bookingType: 'Walk-In', reason: 'High BP', status: 'Waiting' },
	{ token: 6, patientName: 'Neha Iyer', gender: 'F', dob: '30/10/1995', age: '28Y', appointmentType: 'New Consultation', expectedTime: '2:00 PM', bookingType: 'Online', reason: 'Migraine', status: 'Waiting' },
	{ token: 7, patientName: 'Vikas Gupta', gender: 'M', dob: '19/04/1983', age: '41Y', appointmentType: 'Second Opinion', expectedTime: '2:30 PM', bookingType: 'Walk-In', reason: 'Diabetes Checkup', status: 'Waiting' },
	{ token: 8, patientName: 'Radhika Nair', gender: 'F', dob: '06/01/1991', age: '33Y', appointmentType: 'Review Visit', expectedTime: '3:15 PM', bookingType: 'Online', reason: 'Pregnancy Consultation', status: 'Waiting' },
	{ token: 9, patientName: 'Ankit Saxena', gender: 'M', dob: '11/06/1989', age: '35Y', appointmentType: 'Review Visit', expectedTime: '4:15 PM', bookingType: 'Online', reason: 'Heartburn & Acidity', status: 'Waiting' },
	{ token: 10, patientName: 'Pooja Kulkarni', gender: 'F', dob: '15/08/1993', age: '30Y', appointmentType: 'Second Opinion', expectedTime: '4:45 PM', bookingType: 'Online', reason: 'Thyroid Checkup', status: 'Waiting' },
	{ token: 11, patientName: 'Manish Choudhary', gender: 'M', dob: '02/12/1986', age: '37Y', appointmentType: 'Follow-up Consultation', expectedTime: '5:45 PM', bookingType: 'Walk-In', reason: 'Anxiety & Stress', status: 'Waiting' },
	{ token: 12, patientName: 'Kavita Rao', gender: 'F', dob: '20/03/1980', age: '44Y', appointmentType: 'New Consultation', expectedTime: '6:15 PM', bookingType: 'Walk-In', reason: 'Menopause Symptoms', status: 'Waiting' },
	{ token: 13, patientName: 'Rohan Agarwal', gender: 'M', dob: '07/05/1994', age: '30Y', appointmentType: 'Follow-up Consultation', expectedTime: '10:15 AM', bookingType: 'Online', reason: 'Asthma', status: 'Waiting' },
	{ token: 14, patientName: 'Deepika Singh', gender: 'F', dob: '09/11/1997', age: '26Y', appointmentType: 'Review Visit', expectedTime: '11:00 AM', bookingType: 'Walk-In', reason: 'PCOD Treatment', status: 'Waiting' },
	{ token: 15, patientName: 'Anirudh Patel', gender: 'M', dob: '16/07/1982', age: '42Y', appointmentType: 'Review Visit', expectedTime: '12:15 PM', bookingType: 'Online', reason: 'Knee Pain', status: 'Waiting' },
	{ token: 16, patientName: 'Swati Mishra', gender: 'F', dob: '03/09/1990', age: '33Y', appointmentType: 'Second Opinion', expectedTime: '12:45 PM', bookingType: 'Online', reason: 'Eye Checkup', status: 'Waiting' },
	{ token: 17, patientName: 'Vikram Singh', gender: 'M', dob: '22/01/1988', age: '36Y', appointmentType: 'New Consultation', expectedTime: '1:00 PM', bookingType: 'Walk-In', reason: 'Stomach Ache', status: 'Waiting' },
	{ token: 18, patientName: 'Priti Kapoor', gender: 'F', dob: '14/11/1995', age: '28Y', appointmentType: 'Review Visit', expectedTime: '1:45 PM', bookingType: 'Online', reason: 'Skin Rash', status: 'Waiting' },
	{ token: 19, patientName: 'Amit Shah', gender: 'M', dob: '05/06/1984', age: '40Y', appointmentType: 'Follow-up Consultation', expectedTime: '2:15 PM', bookingType: 'Walk-In', reason: 'Fever', status: 'Waiting' },
	{ token: 20, patientName: 'Nisha Gupta', gender: 'F', dob: '19/08/1991', age: '32Y', appointmentType: 'New Consultation', expectedTime: '2:45 PM', bookingType: 'Online', reason: 'Headache', status: 'Waiting' },
	{ token: 21, patientName: 'Suresh Kumar', gender: 'M', dob: '11/02/1979', age: '45Y', appointmentType: 'Second Opinion', expectedTime: '3:30 PM', bookingType: 'Walk-In', reason: 'Joint Pain', status: 'Waiting' },
	{ token: 22, patientName: 'Meera Reddy', gender: 'F', dob: '25/12/1993', age: '30Y', appointmentType: 'Review Visit', expectedTime: '4:00 PM', bookingType: 'Online', reason: 'Cough & Cold', status: 'Waiting' },
	{ token: 23, patientName: 'Rajesh Malhotra', gender: 'M', dob: '08/04/1981', age: '43Y', appointmentType: 'Follow-up Consultation', expectedTime: '4:30 PM', bookingType: 'Walk-In', reason: 'Diabetes Follow-up', status: 'Waiting' },
	{ token: 24, patientName: 'Simran Kaur', gender: 'F', dob: '17/09/1996', age: '27Y', appointmentType: 'New Consultation', expectedTime: '5:00 PM', bookingType: 'Online', reason: 'Allergy', status: 'Waiting' },
	{ token: 25, patientName: 'Varun Dhawan', gender: 'M', dob: '30/03/1992', age: '32Y', appointmentType: 'Review Visit', expectedTime: '5:30 PM', bookingType: 'Walk-In', reason: 'Injury', status: 'Waiting' },
	{ token: 26, patientName: 'Pooja Hegde', gender: 'F', dob: '12/10/1994', age: '29Y', appointmentType: 'Second Opinion', expectedTime: '6:00 PM', bookingType: 'Online', reason: 'Throat Pain', status: 'Waiting' },
	{ token: 27, patientName: 'Aditya Roy', gender: 'M', dob: '01/01/1986', age: '38Y', appointmentType: 'Follow-up Consultation', expectedTime: '6:30 PM', bookingType: 'Walk-In', reason: 'Back Pain', status: 'Waiting' },
	{ token: 28, patientName: 'Kiara Advani', gender: 'F', dob: '31/07/1992', age: '31Y', appointmentType: 'New Consultation', expectedTime: '7:00 PM', bookingType: 'Online', reason: 'Vitamin Deficiency', status: 'Waiting' },
	{ token: 29, patientName: 'Sidharth Malhotra', gender: 'M', dob: '16/01/1985', age: '39Y', appointmentType: 'Review Visit', expectedTime: '7:30 PM', bookingType: 'Walk-In', reason: 'Fitness Checkup', status: 'Waiting' },
	{ token: 30, patientName: 'Alia Bhatt', gender: 'F', dob: '15/03/1993', age: '31Y', appointmentType: 'Follow-up Consultation', expectedTime: '8:00 PM', bookingType: 'Online', reason: 'Routine Checkup', status: 'Waiting' }
];

const DUMMY_ENGAGED_DATA = [
	{ token: 1, patientName: 'Rahul Sharma', gender: 'M', dob: '12/05/1985', age: '39Y', appointmentType: 'New', startTime: '11:00 AM', endTime: '11:08 AM', bookingType: 'Online', reason: 'Annual Checkup' }
];

const DUMMY_NO_SHOW_DATA = [
	{ isHeader: true, label: "Within Grace Period" },
	{ token: 11, patientName: 'Manish Choudhary', gender: 'M', dob: '02/12/1986', age: '37Y', appointmentType: 'Follow-up Consultation', expectedTime: '5:45 PM', bookingType: 'Online', reason: 'Anxiety & Stress', isGrace: true },
	{ isHeader: true, label: "Outside Grace Period" },
	{ token: 5, patientName: 'Kunal Joshi', gender: 'M', dob: '05/02/1990', age: '34Y', appointmentType: 'Follow-up Consultation', expectedTime: '1:30 PM', bookingType: 'Online', reason: 'Anxiety & Stress', isGrace: false },
];

const DUMMY_ADMITTED_DATA = [
	{ token: 1, patientName: 'Rahul Sharma', gender: 'M', dob: '12/05/1985', age: '39Y', appointmentType: 'New', startTime: '11:00 AM', endTime: '11:08 AM', bookingType: 'Online', reason: 'Annual Checkup' }
];


const filters = ['In Waiting', 'Engaged', 'Checked-In', 'No show', 'Admitted'];



export default function FDQueue() {
	const { user } = useAuthStore();
	const doctorId = user?.id;
	const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 }); // Fix: Define dropdownPosition

	// Fetch FD profile on mount
	useEffect(() => {
		useFrontDeskAuthStore.getState().fetchMe();
	}, []);

	// Dummy Stubs to prevent crash
	const pauseSlotEta = async () => ({});

	const [activeFilter, setActiveFilter] = useState('In Waiting');
	const [slotOpen, setSlotOpen] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [checkedInTokens, setCheckedInTokens] = useState({});
	const [sessionStarted, setSessionStarted] = useState(true);
	const [queuePaused, setQueuePaused] = useState(false);

	const isToggleOn = sessionStarted && !queuePaused;

	const handleToggleChange = () => {
		if (isToggleOn) {
			// Turning OFF -> Pause
			setPauseMinutes(null);
			setShowPauseModal(true);
		} else {
			// Turning ON -> Start or Resume
			setSessionStarted(true);
			setQueuePaused(false);
		}
	};
	// Paused state UI: countdown to auto-resume
	const [pauseEndsAt, setPauseEndsAt] = useState(null); // ms timestamp
	const [pauseRemaining, setPauseRemaining] = useState(0); // seconds
	const pauseTickerRef = useRef(null);
	// Pause modal and auto-resume state
	const [showPauseModal, setShowPauseModal] = useState(false);
	const [pauseMinutes, setPauseMinutes] = useState(null); // in minutes
	const [pauseSubmitting, setPauseSubmitting] = useState(false);
	const [pauseError, setPauseError] = useState('');
	const autoResumeTimerRef = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [sessionStatus, setSessionStatus] = useState('idle'); // 'idle' | 'ongoing' | 'completed'
	const [removingToken, setRemovingToken] = useState(null);
	const [incomingToken, setIncomingToken] = useState(null);
	// Current token reported by backend status, used to focus the engaged patient
	const [backendCurrentToken, setBackendCurrentToken] = useState(null);
	// Holds list currently shown in table (derived from active filter)
	const [queueData, setQueueData] = useState([]);
	const [appointmentRequests, setAppointmentRequests] = useState([]);
	const [apptLoading, setApptLoading] = useState(false);
	const [apptError, setApptError] = useState('');
	const [approvingId, setApprovingId] = useState(null);
	const [rejectingId, setRejectingId] = useState(null);
	// Pull doctor context from auth store; fetch if missing
	// Simplified Dummy Logic: No Backend Sync
	// Removed backend Start/End/Pause API calls
	// Removed syncing effects with getSlotEtaStatus

	// Dummy Time Slots
	const timeSlots = [
		{ key: 'morning', label: 'Morning', time: '10:00am-12:00pm', Icon: Sunrise, slotId: 'dummy-slot-1' },
		{ key: 'afternoon', label: 'Afternoon', time: '2:00pm-4:00pm', Icon: Sun, slotId: 'dummy-slot-2' },
		{ key: 'evening', label: 'Evening', time: '6:00pm-8:00pm', Icon: Sunset, slotId: 'dummy-slot-3' },
		{ key: 'night', label: 'Night', time: '8:30pm-10:30pm', Icon: Moon, slotId: 'dummy-slot-4' }
	];

	const [slotValue, setSlotValue] = useState('morning');
	const [selectedSlotId, setSelectedSlotId] = useState('dummy-slot-1');

	// Auto-select first slot
	useEffect(() => {
		if (!slotValue) {
			setSlotValue('morning');
			setSelectedSlotId('dummy-slot-1');
		}
	}, []);

	// Map Dummy Data directly to Queue Data based on activeFilter
	useEffect(() => {
		if (sessionStarted) {
			// If session started, Active Patient + Engaged List
			// For this dummy implementation, 'Engaged' tab shows DUMMY_ENGAGED_DATA
			if (activeFilter === 'Engaged') setQueueData(DUMMY_ENGAGED_DATA);
			else if (activeFilter === 'Checked-In') setQueueData(DUMMY_PATIENTS.filter(p => p.status === 'Checked-In'));
			else if (activeFilter === 'No show') setQueueData(DUMMY_NO_SHOW_DATA);
			else if (activeFilter === 'Admitted') setQueueData(DUMMY_ADMITTED_DATA);
			else setQueueData(DUMMY_PATIENTS);
		} else {
			// Session not started
			if (activeFilter === 'Checking In') setQueueData([]);
			else if (activeFilter === 'No show') setQueueData(DUMMY_NO_SHOW_DATA);
			else setQueueData(DUMMY_PATIENTS);
		}
	}, [sessionStarted, activeFilter]);


	// Dummy Counts
	const getFilterCount = f => {
		if (f === 'In Waiting') return DUMMY_PATIENTS.length;
		if (f === 'Engaged' && sessionStarted) return DUMMY_ENGAGED_DATA.length;
		if (f === 'No show') return DUMMY_NO_SHOW_DATA.length - 2; // minus headers
		if (f === 'Admitted') return DUMMY_ADMITTED_DATA.length;
		if (activeFilter === f) return queueData.length;
		return 0;
	};
	// Priority: DUMMY_ACTIVE_PATIENT if session started (to match user request for Priya Mehta), else queue list
	const activePatient = useMemo(() => {
		if (sessionStarted) return DUMMY_ACTIVE_PATIENT;
		return queueData[currentIndex] || null;
	}, [sessionStarted, queueData, currentIndex]);


	// Simplified Dummy Logic: Complete Patient
	const completeCurrentPatient = async () => {
		const ANIM_MS = 300;
		const active = activePatient;
		if (!active) return;

		setRemovingToken(active.token);
		// Simulate completion delay
		setTimeout(() => {
			setRemovingToken(null);
			// Simple navigation to next patient for demo
			setCurrentIndex(prev => prev + 1);
		}, ANIM_MS);
	};

	// Dummy Actions for Table
	const [activeActionMenuToken, setActiveActionMenuToken] = useState(null);
	const handleActionMenuClick = (e, token) => {
		e.stopPropagation();
		const rect = e.currentTarget.getBoundingClientRect();
		// Align right edge of menu to right edge of button (approx width 200px)
		const menuWidth = 200;
		setDropdownPosition({
			top: rect.bottom + window.scrollY + 4,
			left: rect.left + window.scrollX - menuWidth + rect.width,
		});
		setActiveActionMenuToken(activeActionMenuToken === token ? null : token);
	};

	const [showWalkIn, setShowWalkIn] = useState(false);
	// New: On check-in, call API and refresh; do not open pre-screening


	// While paused, tick remaining time every second
	useEffect(() => {
		if (!queuePaused || !pauseEndsAt) return;
		const tick = () => { setPauseRemaining(Math.max(0, Math.floor((pauseEndsAt - Date.now()) / 1000))); };
		tick();
		pauseTickerRef.current = setInterval(tick, 1000);
		return () => { if (pauseTickerRef.current) { clearInterval(pauseTickerRef.current); pauseTickerRef.current = null; } };
	}, [queuePaused, pauseEndsAt]);
	return (
		<div className='flex h-full w-full bg-gray-50 overflow-hidden'>
			{/* Middle Column: Queue Content (Table + Header) */}
			<div className="flex-1 flex flex-col min-w-0 bg-secondary-grey50 border-r border-gray-200">
				<div className='sticky top-0 z-10 bg-white border-b-[0.5px] border-secondary-grey100 px-4 py-2 shrink-0'>
					<div className='flex items-center justify-between'>
						{/* Slot Dropdown */}
						<div className='relative '>
							<button
								type='button'
								onClick={(e) => handleActionMenuClick(e, 'slot_dropdown')}
								className='flex w-[300px] items-center bg-white gap-1 text-[16px] text-secondary-grey400 hover:w-fit hover:bg-gray-50'
							>
								<span className='mr-1'>{timeSlots.find(t => t.key === slotValue)?.label || 'Morning'} ({timeSlots.find(t => t.key === slotValue)?.time || '10:00am-12:00pm'})</span>
								<ChevronDown className='pl-1 h-4 border-l-[0.5px] border-secondary-grey100/50 text-gray-500' />
							</button>
						</div>
						{/* Date Picker */}
						<div className='flex-1 flex justify-center'>
							<QueueDatePicker date={currentDate} onChange={setCurrentDate} />
						</div>
						{/* Walk-in */}
						<div className='flex items-center gap-[10px]'>
							<div className="flex items-center gap-1 text-sm text-secondary-grey300">
								<span>Tokens Available</span>
								<span className="bg-success-100 px-2 text-success-300 rounded-sm h-[22px] text-sm  border border-transparent hover:border-success-300/50 transition-colors cursor-pointer">5 Out of 100</span>
							</div>

							<div className='bg-secondary-grey100/50 h-5 w-[1px]' ></div>


							<div className='flex items-center gap-2'>
								<Toggle
									checked={isToggleOn}
									onChange={handleToggleChange}
								/>
								<span className={`text-sm font-medium ${isToggleOn ? 'text-gray-700' : 'text-secondary-grey300'}`}>Start Session</span>
							</div>

							<div className='bg-secondary-grey100/50 h-5 w-[1px]' ></div>

							<button
								onClick={(e) => handleActionMenuClick(e, 'queue_actions_dropdown')}
								className='hover:bg-secondary-grey50 rounded-sm'
							>
								<img src={more} alt="" />
							</button>
						</div>
					</div>
				</div>

				{/* Queue Content */}
				<div className='px-0 pt-0 pb-2 flex-1 flex flex-col overflow-hidden'>

					{/* Session Bar - GREEN if session active */}
					{/* Session Bar - GREEN if session active */}
					{sessionStarted && (
						<div className={`w-full ${queuePaused ? 'bg-warning-50 text-warning-400' : 'bg-[#27CA40] text-white'} h-[40px] px-4 flex items-center justify-between relative z-20`}>
							{/* Centered Token Number */}
							<div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 ${queuePaused ? 'text-secondary-grey200' : 'text-white'}`}>
								<span className=' text-[20px] mr-3'>Current Token Number</span>
								<span className={`w-4 h-4 rounded-full animate-colorBlink ${queuePaused ? 'bg-warning-400' : 'bg-white '} transition-all duration-1000`}
									style={!queuePaused ? {
										'--blink-on': '#22c55e',
										'--blink-off': '#ffffff',
									} : {
										'--blink-on': '#EC7600',
										'--blink-off': '#ffffff',
									}}></span>
								<span className={`font-bold text-[20px] ${queuePaused ? 'text-warning-400' : 'text-white'}`}>10</span>
								{queuePaused && (
									<div className='flex items-center ml-2 border border-warning-400 py-[2px] rounded px-[6px] bg-white gap-1'>
										<img src={stopwatch} alt="" className='w-[14px] h-[14px]' />
										<span className="text-[14px] text-warning-400 ">
											Paused ({formatTime(pauseRemaining)} Mins)
										</span>
									</div>
								)}
							</div>
							{/* Right Actions */}
							<div className="ml-auto">
								{!queuePaused ? (
									<button
										onClick={() => { setPauseMinutes(null); setShowPauseModal(true); }}
										className='bg-white text-[#ef4444] h-[24px] py-1 px-[6px] rounded text-[12px] font-medium border border-error-200/50 flex items-center gap-2 hover:bg-error-400 hover:text-white transition-colors '
									>
										<img src={pause} alt="" className='' /> Pause Queue
									</button>
								) : (
									<button
										onClick={() => setQueuePaused(false)}
										className='bg-blue-primary250 text-white h-[24px] py-1 px-[6px] rounded text-[12px] font-medium flex items-center gap-1.5 hover:bg-blue-primary300 transition-colors '
									>
										<RotateCcw className='w-[14px] h-[14px] -scale-y-100 rotate-180' /> Restart Queue
									</button>
								)}
							</div>
						</div>
					)}

					<div className='p-2 flex flex-col flex-1 min-h-0'>
						{/* Overview section removed for Front Desk queue per request */}
						{sessionStarted && activePatient && (
							<>
								<span className="text-[20px] font-medium text-secondary-grey400 mb-2">Ongoing Consulation</span>
								<div
									className={`
                              flex items-center justify-between
                              rounded-xl
                              px-4 py-3
                              mb-4
                              bg-white
                              ${sessionStatus === 'completed'
											? 'border border-success-200 bg-[linear-gradient(90deg,rgba(39,202,64,0.08)_0%,rgba(39,202,64,0)_25%,rgba(39,202,64,0)_75%,rgba(39,202,64,0.08)_100%)]'
											: sessionStatus === 'admitted'
												? 'border border-[#D4AF37] bg-[linear-gradient(90deg,rgba(212,175,55,0.15)_0%,rgba(212,175,55,0.05)_25%,rgba(212,175,55,0.05)_75%,rgba(212,175,55,0.15)_100%)]'
												: 'border border-blue-primary250 bg-[linear-gradient(90deg,rgba(35,114,236,0.08)_0%,rgba(35,114,236,0)_25%,rgba(35,114,236,0)_75%,rgba(35,114,236,0.08)_100%)]'
										}
                            `}
								>
									<div className='flex items-center gap-3'>
										<AvatarCircle name={activePatient.patientName} size="lg" className="h-12 w-12 text-lg" />
										<div className="flex gap-6 items-center">
											<div>
												<div className='flex items-center gap-2'>
													<span className="font-semibold text-secondary-grey400 text-[16px]">{activePatient.patientName}</span>
													<ArrowRight className="h-4 w-4 text-gray-400 -rotate-45" />
												</div>
												<div className='text-xs text-secondary-grey300'>{activePatient.gender} | {activePatient.age}</div>
											</div>
											<div className="h-10 w-px bg-secondary-grey100/50"></div>
											<div className="flex flex-col gap-1 text-sm text-secondary-grey200">
												<div className="flex items-center gap-2">
													<span className="">Token Number</span>
													<span className="bg-blue-primary50 text-blue-primary250 h-[22px] px-[6px] py-[2px] rounded-sm border border-blue-primary250/50 text-center flex items-center justify-center ">{activePatient.token}</span>
												</div>
												<div className="">Reason for Visit : <span className="text-secondary-grey400">{activePatient.reasonForVisit}</span></div>
											</div>
										</div>
									</div>
									<div className='flex gap-2 items-center'>
										{sessionStatus === 'idle' && (
											<Button
												variant="primary"
												size="small"
												onClick={() => setSessionStatus('ongoing')}
												className=" text-white flex items-center gap-2 px-4 py-2 font-medium"
											>
												<Play className="w-3.5 h-3.5 " />
												Start Session
											</Button>
										)}
										{sessionStatus === 'ongoing' && (
											<div className="flex items-center gap-3">
												<SessionTimer />
												<button
													onClick={() => { setSessionStatus('completed'); completeCurrentPatient(); }}
													className="flex items-center gap-2 bg-white border border-secondary-grey200/50 px-4 py-2 rounded-md text-sm font-medium text-secondary-grey400 hover:bg-gray-50 transition-colors"
												>
													<img src={checkRound} alt="" />
													<span>End Session</span>
												</button>
											</div>
										)}
										{sessionStatus === 'admitted' && (
											<div className="flex items-center gap-2 text-[#D4AF37] font-medium text-sm mr-6">
												<img src={verifiedYellow} alt="" className='w-5 h-5' />
												<span>Patient Admitted</span>
											</div>
										)}
										{sessionStatus === 'completed' && (
											<div className="flex items-center gap-2 text-success-300 font-medium text-sm mr-6">
												<img src={verified} alt="" className="w-5 h-5" />
												<span>Visit Completed</span>
											</div>
										)}
										{sessionStatus !== 'completed' && sessionStatus !== 'admitted' && (
											<button
												onClick={(e) => handleActionMenuClick(e, 'active_patient_card')}
												className={`px-2 rounded-full transition-colors ${activeActionMenuToken === 'active_patient_card' ? 'bg-gray-100' : ''}`}
											>
												<img src={more} alt="" />
											</button>
										)}
									</div>
								</div>
							</>
						)}

						{/* Filters & Actions */}
						<div className='flex items-center justify-between pb-2 '>
							<div className='flex gap-3 items-center'>
								{filters.map(f => (
									<button key={f} onClick={() => setActiveFilter(f)} className={`px-[6px] flex items-center gap-2  border h-[28px] rounded-md text-sm font-medium transition-colors ${activeFilter === f ? 'border-blue-primary150 bg-blue-primary50 text-blue-primary250' : 'text-gray-500 hover:border-secondary-grey150 border-secondary-grey50'}`}>
										{f} <span className={`min-w-[16px] text-[10px] h-[16px] rounded-sm px-1 border  flex ${activeFilter === f ? 'border-blue-primary150 bg-blue-primary50 text-blue-primary250' : 'text-gray-500 bg-white border-secondary-grey100'}  items-center justify-center`}>{getFilterCount(f)}</span>
									</button>
								))}
							</div>

							<div className='flex items-center gap-2'>
								<button
									onClick={() => setShowWalkIn(true)}
									className='inline-flex items-center gap-2 h-[32px] min-w-[32px] p-2 rounded-sm border-[1px] text-sm font-medium border-[#BFD6FF] bg-[#F3F8FF] text-[#2372EC] hover:bg-[#2372EC] hover:text-white transition-colors'
								>
									Walk-In Appointment
								</button>
							</div>
						</div>

						{/* Table Section (No longer wrapped with sidebar here) */}
						{/* Table and Sidebar Container */}
						<div className='flex-1 min-h-0 flex flex-row gap-4 relative'>
							{/* Table Section */}
							<div className='flex-1 min-h-0 bg-white rounded-lg border border-gray-200 relative'>
								<div className='absolute inset-0 overflow-auto'>
									<SampleTable
										columns={activeFilter === 'Engaged' ? [
											{
												key: "token",
												header: 'T.no',
												icon: true,
												width: 80,
												render: (row) => (
													<span className="text-secondary-grey400 items-center flex justify-center font-medium text-[14px] ">{String(row.token).padStart(2, '0')}</span>
												)
											},
											{
												key: "patient",
												header: "Patient",
												icon: true,
												width: 250,
												render: (row) => (
													<div className="flex items-center gap-2 ">
														<AvatarCircle name={row.patientName} size="md" className="shrink-0 bg-blue-50 text-blue-600" />
														<div>
															<div className="text-secondary-grey400 font-semibold text-sm">{row.patientName}</div>
															<div className="text-secondary-grey300 text-xs">{row.gender} | {row.dob} ({row.age})</div>
														</div>
													</div>
												)
											},
											{ key: "appointmentType", header: "Appt. Type", icon: true, width: 156 },
											{ key: "startTime", header: "Start Time", icon: true, width: 120 },
											{ key: "endTime", header: "End Time", icon: true, width: 120 },
											{ key: "bookingType", header: "Booking Type", icon: true, width: 156 },
											{ key: "reason", header: "Reason For Visit", icon: false, width: 200 },
											{
												key: "actions",
												header: "Actions",
												icon: false,
												sticky: "right",
												width: 180,
												render: (row) => (
													<div className="flex items-center justify-between">
														<button className="bg-[#2372EC] w-full text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
															Mark as Paid
														</button>
														<button
															onClick={(e) => handleActionMenuClick(e, row.token)}
															className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
														>
															<img src={more} alt="" className='w-8 h-8' />
														</button>
													</div>
												)
											}
										] : activeFilter === 'No show' ? [
											{
												key: "token",
												header: <div className="w-full text-center text-secondary-grey400 font-medium">Token</div>,
												icon: false,
												width: 80,
												render: (row) => (
													<span className="text-blue-primary250 items-center flex justify-center font-medium text-[20px] ">{String(row.token).padStart(2, '0')}</span>
												)
											},
											{
												key: "patient",
												header: "Patient",
												icon: true,
												width: 205,
												render: (row) => (
													<div className="flex items-center gap-2 ">
														<AvatarCircle name={row.patientName} size="md" color={!row.isGrace ? "grey" : "blue"} className="shrink-0" />
														<div>
															<div className="text-secondary-grey400 font-medium text-sm">{row.patientName}</div>
															<div className="text-secondary-grey300 text-xs">{row.gender} | {row.dob} ({row.age})</div>
														</div>
													</div>
												)
											},
											{ key: "appointmentType", header: "Appt. Type", icon: true, width: 156 },
											{ key: "expectedTime", header: "Expt. Time", icon: true, width: 140 },
											{ key: "bookingType", header: "Booking Type", icon: true, width: 156 },
											{ key: "reason", header: "Reason For Visit", icon: true, width: 200 },
											{
												key: "actions",
												header: "Actions",
												icon: false,
												sticky: "right",
												width: 190,
												render: (row) => {
													const isCheckedIn = checkedInTokens[row.token];
													return (
														<div className="flex items-center jusitfy-between">
															{!isCheckedIn ? (
																row.isGrace ? (
																	<button
																		onClick={() => setCheckedInTokens(prev => ({ ...prev, [row.token]: true }))}
																		className="w-full px-3 py-1 border border-gray-300 rounded text-sm text-secondary-grey400 hover:bg-gray-50 bg-white"
																	>
																		Check-In
																	</button>
																) : (
																	<button
																		onClick={() => setCheckedInTokens(prev => ({ ...prev, [row.token]: true }))}
																		className='w-full px-3 py-1 border border-gray-300 rounded text-sm text-secondary-grey400 hover:bg-gray-50 bg-white'
																	>
																		Reschedule
																	</button>
																)
															) : (
																<button className='w-full inline-flex justify-center items-center gap-2 h-[32px] min-w-[32px] p-2 rounded-sm border-[1px] text-sm font-medium border-[#BFD6FF] bg-[#F3F8FF] text-[#2372EC] hover:bg-[#2372EC] hover:text-white transition-colors'>
																	Add Pre-screening
																</button>
															)}
															<button
																onClick={(e) => handleActionMenuClick(e, row.token)}
																className="text-gray-400 ml-2 hover:text-gray-600 rounded-full  transition-colors"
															>
																<img src={more} alt="" />
															</button>
														</div>
													);
												}
											}
										] : activeFilter === 'Admitted' ? [

											{
												key: "patient",
												header: "Patient",
												icon: true,
												width: 205,
												render: (row) => (
													<div className="flex items-center gap-2 ">
														<AvatarCircle name={row.patientName} size="md" className="shrink-0 bg-blue-50 text-blue-600" />
														<div>
															<div className="text-secondary-grey400 font-medium text-sm">{row.patientName}</div>
															<div className="text-secondary-grey300 text-xs">{row.gender} | {row.dob} ({row.age})</div>
														</div>
													</div>
												)
											},
											{ key: "appointmentType", header: "Appt. Type", icon: true, width: 156 },
											{ key: "startTime", header: "Start Time", icon: true, width: 120 },
											{ key: "endTime", header: "End Time", icon: true, width: 120 },
											{ key: "bookingType", header: "Booking Type", icon: true, width: 156 },
											{ key: "reason", header: "Reason For Visit", icon: false, width: 200 },
											{
												key: "actions",
												header: "Actions",
												icon: false,
												sticky: "right",
												width: 180,
												render: (row) => (
													<div className="flex items-center justify-between">
														<button className="bg-[#2372EC] w-full text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
															Discharge
														</button>
														<button
															onClick={(e) => handleActionMenuClick(e, row.token)}
															className="text-gray-400 ml-2 hover:text-gray-600 rounded-full  transition-colors"
														>
															<img src={more} alt="" className='w-8 h-8' />
														</button>
													</div>
												)
											}
										] : [
											{
												key: "token",
												header: <div className="w-full text-center text-secondary-grey400 font-medium">Token</div>,
												icon: false,
												width: 80,
												render: (row) => (
													<span className="text-blue-primary250 items-center flex justify-center font-medium text-[20px] pl-2">{row.token}</span>
												)
											},
											{
												key: "patient",
												header: "Patient",
												icon: true,
												width: 280,
												render: (row) => (
													<div className="flex items-center gap-2 ">
														<AvatarCircle name={row.patientName} size="md" className="shrink-0 bg-blue-50 text-blue-600" />
														<div>
															<div className="text-secondary-grey400 font-semibold text-sm">{row.patientName}</div>
															<div className="text-secondary-grey300 text-xs">{row.gender} | {row.dob} ({row.age})</div>
														</div>
													</div>
												)
											},
											{ key: "appointmentType", header: "Appt. Type", icon: true, width: 150 },
											{ key: "expectedTime", header: "Expt. Time", icon: true, width: 120 },
											{ key: "bookingType", header: "Booking Type", icon: true, width: 130 },
											{ key: "reason", header: "Reason For Visit", icon: true, width: 200 },
											{
												key: "actions",
												header: "Actions",
												icon: false,
												sticky: "right",
												width: 190,
												render: (row) => {
													const isCheckedIn = checkedInTokens[row.token];
													return (
														<div className="flex items-center justify-between">
															{!isCheckedIn ? (
																<button
																	onClick={() => setCheckedInTokens(prev => ({ ...prev, [row.token]: true }))}
																	className="w-full px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 bg-white"
																>
																	Check-In
																</button>
															) : (
																<button className='w-full inline-flex justify-center items-center gap-2 h-[32px] min-w-[32px] p-2 rounded-sm border-[1px] text-sm font-medium border-[#BFD6FF] bg-[#F3F8FF] text-[#2372EC] hover:bg-[#2372EC] hover:text-white transition-colors'>
																	Add Pre-screening
																</button>
															)}
															<button
																onClick={(e) => handleActionMenuClick(e, row.token)}
																className={`text-gray-400 ml-2 hover:text-gray-600 rounded-full p-1 transition-colors ${activeActionMenuToken === row.token ? 'bg-gray-100 text-gray-600' : ''}`}
															>
																<img src={more} alt="" className='w-8 h-8' />
															</button>
														</div>
													);
												}
											}
										]}
										data={activeFilter === 'Engaged' ? DUMMY_ENGAGED_DATA : activeFilter === 'No show' ? DUMMY_NO_SHOW_DATA : activeFilter === 'Admitted' ? DUMMY_ADMITTED_DATA : DUMMY_PATIENTS}
										hideSeparators={false}
										stickyLeftWidth={280}
										stickyRightWidth={210}
									/>
								</div>
							</div>

							{/* Sidebar Section */}
							<div className='shrink-0 w-[400px] h-full flex flex-col bg-white rounded-lg border border-gray-200'>
								<div className='h-10 flex items-center px-4 border-b border-gray-200'>
									<div className='h-full flex items-center gap-2 border-b-2 border-blue-600 text-blue-600 px-1'>
										<img src={appt} alt='Appointment' className='w-4 h-4' />
										<h2 className='text-[14px] font-medium'>Appointment Request</h2>
									</div>
								</div>
								<div className='flex-1 overflow-y-auto  flex flex-col gap-3 no-scrollbar'>
									{DUMMY_REQUESTS.map((request, index) => (
										<div key={request.id || index} className="border-b border-gray-100 flex flex-col gap-3 last:border-0 p-3 bg-white  transition-colors">

											{/* Patient Header */}
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<AvatarCircle name={request.name} size="l" />
													<div className="flex flex-col">
														<div className="flex items-center gap-1">
															<span className="text-[16px] font-semibold text-secondary-grey400">{request.name}</span>
															<ArrowRight className="h-3 w-3 text-gray-400 -rotate-45" />
														</div>
														<div className="text-[12px] text-secondary-grey300">{request.gender} | {request.dob} ({request.age})</div>
													</div>
												</div>
												<button className="text-gray-400 hover:bg-secondary-grey50">
													<img src={more} alt="" />
												</button>
											</div>

											{/* Date & Time */}
											<div className="flex flex-col gap-1">
												<div className='flex flex-col gap-1 text-sm text-secondary-grey400'>
													<div className="flex items-center gap-2">
														<img src={CalendarMinimalistic} alt="" />
														<span>{request.date}</span>
													</div>
													{request.time && (
														<div className="flex items-center gap-2 ">
															<img src={ClockCircle} alt="" />
															<span>{request.time}</span>
														</div>
													)}
												</div>



											</div>



											{/* Buttons */}
											<div className="flex gap-3">
												<Button size='small' variant='primary' className='flex-1 h-9 text-xs font-medium' onClick={async () => {
													try {
														if (!request?.id) return; // Fix: use request.id from dummy
														setApprovingId(request.id);
														// await approveAppointment(request.id); // Dummy: simulate async
														await new Promise(r => setTimeout(r, 1000));
														setAppointmentRequests(prev => prev.filter(r => r.id !== request.id));
														// if (selectedSlotId) { await loadAppointmentsForSelectedSlot(); }
													} catch (e) {
														console.error('Approve failed', e);
													} finally {
														setApprovingId(null);
													}
												}} disabled={approvingId === request.id}>
													{approvingId === request.id ? 'Accepting...' : 'Accept'}
												</Button>
												<button className='flex-1 h-9 text-xs font-medium border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap px-1'>
													Ask to Reschedule
												</button>
											</div>
										</div>
									))}
								</div>

							</div>
						</div>
					</div></div></div>
			{/* PreScreeningDrawer disabled for now per requirement */}
			{/* Walk-in Drawer: Fix undefined props */}
			<BookAppointmentDrawer
				open={showWalkIn}
				onClose={() => setShowWalkIn(false)}
				doctorId={doctorId}
			/>


			{/* Pause Queue Modal */}
			{/* Pause Queue Modal */}

			<PauseQueueModal
				show={showPauseModal}
				onClose={() => {
					setShowPauseModal(false);
					setPauseMinutes(null);
				}}
				pauseMinutes={pauseMinutes}
				setPauseMinutes={setPauseMinutes}
				pauseSubmitting={pauseSubmitting}
				pauseError={pauseError}
				onConfirm={async () => {
					setPauseSubmitting(true);
					setPauseError('');
					try {
						await new Promise(r => setTimeout(r, 500));
						setQueuePaused(true);
						setShowPauseModal(false);

						// Setup countdown and auto-resume
						const ends = Date.now() + (pauseMinutes || 0) * 60 * 1000;
						setPauseEndsAt(ends);
						const initialRemaining = Math.max(0, Math.floor((ends - Date.now()) / 1000));
						setPauseRemaining(initialRemaining);

						if (autoResumeTimerRef.current) { clearTimeout(autoResumeTimerRef.current); }
						autoResumeTimerRef.current = setTimeout(() => {
							setQueuePaused(false);
							if (pauseTickerRef.current) { clearInterval(pauseTickerRef.current); pauseTickerRef.current = null; }
							setPauseEndsAt(null); setPauseRemaining(0);
							autoResumeTimerRef.current = null;
						}, (pauseMinutes || 0) * 60 * 1000);

					} catch (err) {
						setPauseError(err.message || 'Failed to pause');
					} finally {
						setPauseSubmitting(false);
					}
				}}
			/>


			{/* Dropdown Menu Portal */}
			{
				activeActionMenuToken && createPortal(
					<div
						className="fixed z-[99999] bg-white rounded-lg shadow-xl border border-gray-100 py-1 flex flex-col min-w-[200px] animate-in fade-in zoom-in-95 duration-100"
						style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
						onClick={(e) => e.stopPropagation()}
					>
						{activeActionMenuToken === 'slot_dropdown' ? (
							<div className="py-1">
								{/* Slot dropdown logic here if needed separate from top-left */}
							</div>
						) : activeActionMenuToken === 'queue_actions_dropdown' ? (
							<>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full">
									<RotateCcw className="h-4 w-4" /> Refresh Queue
								</button>

								<button className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full">
									<CalendarMinus className="h-4 w-4" /> Set Doctor Out of Office
								</button>
								<div className="my-1 border-t border-gray-100"></div>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-[#ef4444] hover:bg-red-50 text-left w-full">
									<CalendarX className="h-4 w-4" /> Terminate Queue
								</button>
							</>
						) : activeActionMenuToken === 'active_patient_card' ? (
							<>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full">
									<User className="h-4 w-4" /> View Profile
								</button>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full">
									<Calendar className="h-4 w-4" /> Reschedule
								</button>
								<button
									onClick={() => {
										setSessionStatus('admitted');
										setActiveActionMenuToken(null);
									}}
									className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full"
								>
									<BedDouble className="h-4 w-4" /> Mark as Admitted
								</button>
								<button
									onClick={() => {
										setSessionStatus('completed');
										completeCurrentPatient();
										setActiveActionMenuToken(null);
									}}
									className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full"
								>
									<CheckCheck className="h-4 w-4" /> End Visit
								</button>
							</>
						) : activeFilter === 'No show' ? (
							<>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full">
									<User className="h-4 w-4" /> View Profile
								</button>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full">
									<Bell className="h-4 w-4" /> Send Reminder
								</button>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full">
									<Calendar className="h-4 w-4" /> Reschedule
								</button>
								<div className="my-1 border-t border-gray-100"></div>
								<button
									onClick={() => {
										if (activeActionMenuToken) {
											setCancelledTokens(prev => new Set(prev).add(activeActionMenuToken));
											setActiveActionMenuToken(null);
										}
									}}
									className="flex items-center gap-2 px-4 py-2 text-sm text-[#ef4444] hover:bg-red-50 text-left w-full"
								>
									<CalendarX className="h-4 w-4" /> Cancel Appointment
								</button>
							</>
						) : activeFilter === 'Engaged' ? (
							<>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full">
									<CalendarPlus className="h-4 w-4" /> Schedule Follow-up
								</button>
								<button
									onClick={() => {
										setSessionStatus('admitted');
										setActiveActionMenuToken(null);
									}}
									className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full"
								>
									<BedDouble className="h-4 w-4" /> Mark as Admitted
								</button>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full">
									<User className="h-4 w-4" /> View Profile
								</button>
							</>
						) : (
							<>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full">
									<User className="h-4 w-4" /> View Profile
								</button>
								<button
									onClick={() => {
										setActiveActionMenuToken(null);
									}}
									className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full"
								>
									<BedDouble className="h-4 w-4" /> Mark as Admitted
								</button>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-grey400 hover:bg-gray-50 text-left w-full">
									<CalendarPlus className="h-4 w-4" /> Schedule Follow-up
								</button>
								<div className="my-1 border-t border-gray-100"></div>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-[#ef4444] hover:bg-red-50 text-left w-full">
									<UserX className="h-4 w-4" /> Mark as No-Show
								</button>
								<button className="flex items-center gap-2 px-4 py-2 text-sm text-[#ef4444] hover:bg-red-50 text-left w-full">
									<RotateCcw className="h-4 w-4" /> Revoke Check-In
								</button>
							</>
						)}
					</div>,
					document.body
				)
			}
		</div >
	);
}

