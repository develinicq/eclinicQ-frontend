import React, { useEffect, useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { bookWalkInAppointment, checkInAppointment, markNoShowAppointment, startSlotEta, endSlotEta, getSlotEtaStatus, startPatientSessionEta, endPatientSessionEta, findPatientSlots, pauseSlotEta, resumeSlotEta } from '../../../services/authService';
import { Calendar, ChevronDown, Sunrise, Sun, Sunset, Moon, X, Play, ArrowRight, User, BedDouble, CalendarPlus, UserX, RotateCcw, CheckCircle, HeartPulse, BriefcaseMedical, PauseCircle, CheckCheck, CalendarMinus, CalendarX, Bell } from 'lucide-react';
import QueueDatePicker from '../../../components/QueueDatePicker';
import AvatarCircle from '../../../components/AvatarCircle';
import BookAppointmentDrawer from '../../../components/Appointment/BookAppointmentDrawer';
import Badge from '../../../components/Badge';
import Toggle from '../../../components/FormItems/Toggle';
import SampleTable from '../../../pages/SampleTable';
const more = '/superAdmin/Doctors/Threedots.svg'
import useSlotStore from '../../../store/useSlotStore';
import useAuthStore from '../../../store/useAuthStore';
import { getDoctorMe } from '../../../services/authService';
import { classifyISTDayPart, buildISTRangeLabel } from '../../../lib/timeUtils';
import Button from '@/components/Button';
import SessionTimer from '../../../components/SessionTimer';
const search = '/superAdmin/Doctors/SearchIcon.svg';
const pause = '/fd/Pause.svg';
const checkRound = '/fd/Check Round.svg';
const verified = '/verified-tick.svg'
const stopwatch = '/fd/Stopwatch.svg'
const verifiedYellow = '/fd/verified_yellow.svg'

// Dummy Data for UI Demo
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




export default function MiddleQueue({ doctorId: propsDoctorId, dummyMode = false, onPauseQueue, isPaused, pauseDuration, pauseStartTime, onResumeQueue }) {
	// Timer Logic for Pause
	const [remainingTime, setRemainingTime] = useState('00:00');

	useEffect(() => {
		if (!isPaused || !pauseStartTime || !pauseDuration) return;

		const interval = setInterval(() => {
			const start = new Date(pauseStartTime).getTime();
			const now = new Date().getTime();
			const elapsedSec = Math.floor((now - start) / 1000);
			const totalSec = pauseDuration * 60;
			const remaining = Math.max(0, totalSec - elapsedSec);

			const m = Math.floor(remaining / 60);
			const s = remaining % 60;
			setRemainingTime(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);

			if (remaining <= 0) {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [isPaused, pauseStartTime, pauseDuration]);
	// ... (existing states)
	const [slotEnding, setSlotEnding] = useState(false);
	const [activeFilter, setActiveFilter] = useState('In Waiting');
	const [slotOpen, setSlotOpen] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [checkedInTokens, setCheckedInTokens] = useState({});

	const [activeActionMenuToken, setActiveActionMenuToken] = useState(null);
	const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
	const [sessionStatus, setSessionStatus] = useState('idle'); // 'idle' | 'ongoing' | 'completed'

	const slotOptions = [
		{ id: 'morning', label: 'Morning', time: '10:00am-12:00pm', icon: Sunrise },
		{ id: 'afternoon', label: 'Afternoon', time: '2:00pm-4:00pm', icon: Sun },
		{ id: 'evening', label: 'Evening', time: '6:00pm-8:00pm', icon: Sunset },
		{ id: 'night', label: 'Night', time: '8:30pm-10:30pm', icon: Moon },
	];
	const [selectedSlot, setSelectedSlot] = useState(slotOptions[0]);

	useEffect(() => {
		const handleClickOutside = () => setActiveActionMenuToken(null);
		const handleScroll = () => setActiveActionMenuToken(null);
		window.addEventListener('click', handleClickOutside);
		window.addEventListener('scroll', handleScroll, true);
		return () => {
			window.removeEventListener('click', handleClickOutside);
			window.removeEventListener('scroll', handleScroll, true);
		};
	}, []);

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

	// Derived States for Dummy Mode
	// Derived States for Dummy Mode
	const sessionActive = dummyMode; // Controls Green Banner & Active Patient Card
	const activePatient = dummyMode ? DUMMY_ACTIVE_PATIENT : null; // Only show active patient if session started
	const queueData = DUMMY_PATIENTS; 	// Props destructuring

	// Real logic state placeholders (if not dummyMode)

	const [showWalkInDrawer, setShowWalkInDrawer] = useState(false);
	// ...

	const filters = ['In Waiting', 'Checked-In', 'Engaged', 'No show', 'Admitted'];
	const getFilterCount = (f) => {
		if (dummyMode) {
			if (f === 'In Waiting') return 95;
			if (f === 'Checked-In') return 13;
			if (f === 'Engaged') return 1;
			if (f === 'No show') return 2;
			return 0;
		}
		return 0; // real logic fallback
	};

	// ... (Hooks for real logic: loadSlots, etc. - kept but suppressed by dummyMode for rendering)

	return (
		<div className='h-full overflow-hidden bg-gray-50 flex flex-col font-sans'>
			<div className='sticky top-0 z-10 bg-white border-b-[0.5px] border-secondary-grey100 px-4 py-2 shrink-0'>
				<div className='flex items-center justify-between'>
					{/* Slot Dropdown */}
					<div className='relative '>
						<button
							type='button'
							onClick={(e) => handleActionMenuClick(e, 'slot_dropdown')}
							className='flex w-[300px] items-center bg-white gap-1 text-[16px] text-secondary-grey400 hover:w-fit hover:bg-gray-50'
						>
							<span className='mr-1'>{selectedSlot.label} ({selectedSlot.time})</span>
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
				{sessionActive && (
					<div className={`w-full ${isPaused ? 'bg-warning-50 text-warning-400' : 'bg-[#27CA40] text-white'} h-[40px] px-4 flex items-center justify-between relative z-20`}>
						{/* Centered Token Number */}
						<div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 ${isPaused ? 'text-secondary-grey200' : 'text-white'}`}>
							<span className=' text-[20px] mr-3'>Current Token Number</span>
							<span className={`w-4 h-4 rounded-full animate-colorBlink ${isPaused ? 'bg-warning-400' : 'bg-white '} transition-all duration-1000`}
								style={!isPaused ? {
									'--blink-on': '#22c55e',
									'--blink-off': '#ffffff',
								} : {
									'--blink-on': '#EC7600',
									'--blink-off': '#ffffff',
								}}></span>
							<span className={`font-bold text-[20px] ${isPaused ? 'text-warning-400' : 'text-white'}`}>00</span>
							{isPaused && (
								<div className='flex items-center ml-2 border border-warning-400 py-[2px] rounded px-[6px] bg-white gap-1'>
									<img src={stopwatch} alt="" className='w-[14px] h-[14px]' />
									<span className="text-[14px] text-warning-400 ">
										Paused ({remainingTime} Mins)
									</span>
								</div>

							)}
						</div>

						{/* Right Actions */}
						<div className="ml-auto">
							{!isPaused ? (
								<button
									onClick={onPauseQueue}
									className='bg-white text-[#ef4444] h-[24px] py-1 px-[6px] rounded text-[12px] font-medium border border-error-200/50 flex items-center gap-2 hover:bg-error-400 hover:text-white transition-colors '
								>
									<img src={pause} alt="" className='' /> Pause Queue
								</button>
							) : (
								<button
									onClick={onResumeQueue}
									className='bg-blue-primary250 text-white h-[24px] py-1 px-[6px] rounded text-[12px] font-medium flex items-center gap-1.5 hover:bg-blue-primary300 transition-colors '
								>
									<RotateCcw className='w-[14px] h-[14px] -scale-y-100 rotate-180' /> Restart Queue
								</button>
							)}
						</div>
					</div>
				)}

				<div className='p-3 flex flex-col flex-1 min-h-0'>

					{sessionActive && (
						<span className="text-[20px] font-medium text-secondary-grey400 mb-2">Ongoing Consulation</span>
					)}

					{/* Active Patient Card */}
					{sessionActive && activePatient && (
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
											onClick={() => setSessionStatus('completed')}
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
							<button>
								<img src={search} alt="" className='' />
							</button>

							<div className='h-6 bg-secondary-grey100/50 mx-1 w-[1px]'></div>
							<button
								onClick={() => setShowWalkInDrawer(true)}
								className='inline-flex items-center gap-2 h-[32px] min-w-[32px] p-2 rounded-sm border-[1px] text-sm font-medium border-[#BFD6FF] bg-[#F3F8FF] text-[#2372EC] hover:bg-[#2372EC] hover:text-white transition-colors'
							>
								Walk-In Appointment
							</button>
						</div>
					</div>

					{/* Table */}
					<div className='w-full flex flex-col flex-1 min-h-0 overflow-hidden bg-white rounded-lg border border-gray-200 relative'>
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
								data={activeFilter === 'Engaged' ? DUMMY_ENGAGED_DATA : activeFilter === 'No show' ? DUMMY_NO_SHOW_DATA : activeFilter === 'Admitted' ? DUMMY_ADMITTED_DATA : queueData}
								hideSeparators={false}
								stickyLeftWidth={280}
								stickyRightWidth={210}
							/>
						</div>
					</div>
				</div>
			</div>

			<BookAppointmentDrawer
				open={showWalkInDrawer}
				onClose={() => setShowWalkInDrawer(false)}
				doctorId={propsDoctorId}
			/>

			{/* Dropdown Menu Portal */}
			{activeActionMenuToken && createPortal(
				<div
					className="fixed z-[99999] bg-white rounded-lg shadow-xl border border-gray-100 py-1 flex flex-col min-w-[200px] animate-in fade-in zoom-in-95 duration-100"
					style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
					onClick={(e) => e.stopPropagation()}
				>
					{activeActionMenuToken === 'slot_dropdown' ? (
						<div className="py-1">
							{slotOptions.map((option) => (
								<button
									key={option.id}
									onClick={() => {
										setSelectedSlot(option);
										setActiveActionMenuToken(null);
									}}
									className={`flex items-center gap-3 px-4 py-3 text-left w-full transition-colors
										${selectedSlot.id === option.id
											? 'bg-blue-600 text-white'
											: 'text-gray-700 hover:bg-gray-50'
										}`}
								>
									<option.icon className={`h-5 w-5 ${selectedSlot.id === option.id ? 'text-white' : 'text-gray-500'}`} />
									<div>
										<div className={`font-medium ${selectedSlot.id === option.id ? 'text-white' : 'text-gray-900'}`}>
											{option.label}
										</div>
										<div className={`text-xs ${selectedSlot.id === option.id ? 'text-blue-100' : 'text-gray-500'}`}>
											({option.time})
										</div>
									</div>
								</button>
							))}
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
							<button className="flex items-center gap-2 px-4 py-2 text-sm text-[#ef4444] hover:bg-red-50 text-left w-full">
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
									setSessionStatus('admitted');
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
			)}
		</div>
	);
}

// End of component
