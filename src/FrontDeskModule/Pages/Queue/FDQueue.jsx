// Front Desk Queue: full API-integrated version copied from original before doctor static simplification
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getPendingAppointmentsForClinic, bookWalkInAppointment } from '../../../services/authService';
import { Clock, Calendar, ChevronDown, Sunrise, Sun, Sunset, Moon, X } from 'lucide-react';
import QueueDatePicker from '../../../components/QueueDatePicker';
import AvatarCircle from '../../../components/AvatarCircle';
import Button from '../../../components/Button';
import Badge from '../../../components/Badge';
import OverviewStatCard from '../../../components/OverviewStatCard';
import Toggle from '../../../components/FormItems/Toggle';
import QueueTable from '../../../DoctorModule/Pages/Queue/QueueTable';
import useSlotStore from '../../../store/useSlotStore';
import useAuthStore from '../../../store/useAuthStore';
import { getDoctorMe } from '../../../services/authService';
import { classifyISTDayPart, buildISTRangeLabel, formatISTTime } from '../../../lib/timeUtils';
import { appointement } from '../../../../public/index.js';

// PreScreening drawer (same UI)
const PreScreeningDrawer = ({ show, patient, onClose, onSave, initialVitals }) => {
	const name = patient?.patientName || patient?.name || '';
	const genderShort = patient?.gender || '';
	const gender = genderShort === 'M' ? 'Male' : genderShort === 'F' ? 'Female' : genderShort || '';
	const ageStr = patient?.age || '';
	const dob = ageStr.split(' (')[0] || '';
	const ageYears = (ageStr.match(/\((\d+)Y\)/) || [])[1] || '';
	const token = patient?.token ?? '';
	const [vitals, setVitals] = useState({ bpSys:'', bpDia:'', spo2:'', pulse:'', respRate:'', tempC:'', heightFt:'', heightIn:'', weightKg:'', waistCm:'', bmi:'', pain:'' });
	useEffect(()=>{ if(show && initialVitals && token){ setVitals(s=>({...s,...initialVitals})); } },[show, token, initialVitals]);
	useEffect(()=>{ const hFt=parseFloat(vitals.heightFt)||0; const hIn=parseFloat(vitals.heightIn)||0; const totalIn=hFt*12+hIn; const m= totalIn>0 ? totalIn*0.0254:0; const kg=parseFloat(vitals.weightKg)||0; const bmi=m>0?kg/(m*m):0; const val=bmi?bmi.toFixed(1):''; if(val!==vitals.bmi) setVitals(s=>({...s,bmi:val})); },[vitals.heightFt,vitals.heightIn,vitals.weightKg]);
	const set = f => e => setVitals(s=>({...s,[f]:e.target.value}));
	const Label = ({children}) => <div className='text-[12px] text-gray-700 mb-1 font-medium'>{children}</div>;
	const Box = ({children}) => <div className='bg-white border border-gray-200 rounded-md px-2 py-1.5 flex items-center gap-2'>{children}</div>;
	const Unit = ({children}) => <span className='text-[11px] text-gray-500 ml-auto'>{children}</span>;
	const handleSave=()=>{ onSave?.({ token, vitals }); onClose?.(); };
	return (<>
		<div className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${show?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'}`} onClick={onClose} />
		<div className={`fixed z-50 transition-transform duration-500 ${show?'translate-x-0':'translate-x-full'}`} style={{top:32,right:show?32:0,bottom:32,width:640,maxWidth:'100vw',background:'white',borderTopLeftRadius:16,borderBottomLeftRadius:16,boxShadow:'0 8px 32px 0 rgba(0,0,0,0.18)',display:'flex',flexDirection:'column'}}>
			<div className='p-6 flex flex-col h-full'>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-[18px] font-semibold'>Add Pre-Screening</h2>
					<div className='flex items-center gap-3'>
						<button className='text-blue-600 text-sm font-medium border border-blue-200 rounded px-2 py-1 bg-blue-50'>Print Rx</button>
						<button className='text-gray-400 hover:text-gray-600' onClick={onClose}>✕</button>
					</div>
				</div>
				<div className='bg-[#F8FAFC] rounded-lg p-4 flex items-center justify-between mb-4'>
					<div className='flex items-center gap-3'>
						<AvatarCircle name={name} size='l' />
						<div>
							<div className='font-bold text-[16px]'>{name}</div>
							<div className='text-[11px] text-gray-600'>{gender} | {dob} {ageYears && `( ${ageYears}Y )`}</div>
							<div className='text-[11px] text-blue-600 mt-1'>MRN: P654321 | ABHA ID: ABHA-98765-XYZ</div>
						</div>
					</div>
					<div className='text-right'>
						<div className='text-[11px] text-gray-500'>Token Number</div>
						<div className='text-[22px] font-bold text-blue-600'>{String(token||0).padStart(2,'0')}</div>
					</div>
				</div>
				<div className='mb-4'>
					<div className='flex items-center justify-between'><div className='font-semibold text-[14px] mb-2'>Vitals & Biometrics</div></div>
					<div className='grid grid-cols-2 gap-3 text-sm'>
						<div><Label>Blood Pressure</Label><div className='flex gap-2'><Box><input value={vitals.bpSys} onChange={set('bpSys')} className='w-16 outline-none text-sm' placeholder='Sys' inputMode='numeric' /></Box><Box><input value={vitals.bpDia} onChange={set('bpDia')} className='w-16 outline-none text-sm' placeholder='Dia' inputMode='numeric' /><Unit>mmHg</Unit></Box></div></div>
						<div><Label>Oxygen Saturation</Label><Box><input value={vitals.spo2} onChange={set('spo2')} className='w-20 outline-none text-sm' placeholder='Value' inputMode='numeric' /><Unit>%</Unit></Box></div>
						<div><Label>Pulse Rate</Label><Box><input value={vitals.pulse} onChange={set('pulse')} className='w-20 outline-none text-sm' placeholder='Value' inputMode='numeric' /><Unit>bpm</Unit></Box></div>
						<div><Label>Respiratory Rate</Label><Box><input value={vitals.respRate} onChange={set('respRate')} className='w-20 outline-none text-sm' placeholder='Value' inputMode='numeric' /><Unit>rpm</Unit></Box></div>
						<div><Label>Body Temperature</Label><Box><input value={vitals.tempC} onChange={set('tempC')} className='w-20 outline-none text-sm' placeholder='Value' inputMode='numeric' /><Unit>°C</Unit></Box></div>
						<div><Label>Height</Label><div className='flex gap-2'><Box><input value={vitals.heightFt} onChange={set('heightFt')} className='w-16 outline-none text-sm' placeholder='ft' inputMode='numeric' /><Unit>ft</Unit></Box><Box><input value={vitals.heightIn} onChange={set('heightIn')} className='w-16 outline-none text-sm' placeholder='in' inputMode='numeric' /><Unit>in</Unit></Box></div></div>
						<div><Label>Weight</Label><Box><input value={vitals.weightKg} onChange={set('weightKg')} className='w-20 outline-none text-sm' placeholder='Value' inputMode='numeric' /><Unit>kg</Unit></Box></div>
						<div><Label>Waist Circumference</Label><Box><input value={vitals.waistCm} onChange={set('waistCm')} className='w-20 outline-none text-sm' placeholder='Value' inputMode='numeric' /><Unit>cm</Unit></Box></div>
						<div><Label>BMI</Label><Box><input value={vitals.bmi} readOnly className='w-20 outline-none text-sm bg-transparent' placeholder='' /></Box></div>
						<div><Label>Pain Scale</Label><Box><input value={vitals.pain} onChange={set('pain')} className='w-20 outline-none text-sm' placeholder='Value' inputMode='numeric' /></Box></div>
					</div>
				</div>
				<div className='mb-4'>
					<div className='font-semibold text-[14px] mb-2'>Medical History</div>
					<div className='flex gap-2 mb-2 text-xs'>
						<span className='text-blue-600 border border-blue-200 rounded px-2 py-1 cursor-pointer'>Problems</span>
						<span className='text-gray-500 border border-gray-200 rounded px-2 py-1 cursor-pointer'>Allergies</span>
						<span className='text-gray-500 border border-gray-200 rounded px-2 py-1 cursor-pointer'>Immunizations</span>
						<span className='text-gray-500 border border-gray-200 rounded px-2 py-1 cursor-pointer'>Social</span>
						<span className='text-gray-500 border border-gray-200 rounded px-2 py-1 cursor-pointer'>Family History</span>
					</div>
					<div className='text-xs text-blue-600 cursor-pointer'>+ Add Problems & Conditions</div>
				</div>
				<div className='flex justify-end mt-auto'>
					<button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700' onClick={handleSave}>Save & Continue</button>
				</div>
			</div>
		</div>
	</>);
};

const WalkInAppointmentDrawer = ({ show, onClose, timeSlots, slotValue, setSlotValue, onAppointmentBooked, activeSlotId, onBookedRefresh }) => {
	const [isExisting, setIsExisting] = useState(false);
	const [apptType, setApptType] = useState('New Consultation');
	const [reason, setReason] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dob, setDob] = useState('');
	const [gender, setGender] = useState('');
	const [bloodGroup, setBloodGroup] = useState('');
	const [mobile, setMobile] = useState('');
	const [email, setEmail] = useState('');
	const dobRef = useRef(null);
	const [apptDate, setApptDate] = useState(()=> new Date().toISOString().slice(0,10));
	const apptDateRef = useRef(null);
	const suggestions = ['New Consultation','Follow-up Consultation','Review Visit'];
	const reasonSuggestions = ['Cough','Cold','Headache','Nausea','Dizziness','Muscle Pain','Sore Throat'];
	const genders = ['Male','Female','Other'];
	const bloodGroups = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
	const [booking,setBooking] = useState(false);
	const [errorMsg,setErrorMsg] = useState('');
	const canBook = () => {
		if (booking) return false;
		if (!reason || !activeSlotId) return false;
		if (isExisting) return mobile.trim().length > 3;
		return firstName && lastName && dob && gender && bloodGroup && mobile;
	};
	const handleBook = async () => {
		if (!canBook()) return;
		setBooking(true); setErrorMsg('');
		try {
			let payload;
			if (isExisting) {
				payload = { method:'EXISTING', patientId: mobile.trim(), reason: reason.trim(), slotId: activeSlotId, bookingType: apptType?.toLowerCase().includes('follow')?'FOLLOW_UP':'NEW' };
			} else {
				payload = { method:'NEW_USER', firstName:firstName.trim(), lastName:lastName.trim(), phone:mobile.trim(), emailId: email.trim()||undefined, dob:dob.trim(), gender:gender.toLowerCase(), bloodGroup, reason:reason.trim(), slotId:activeSlotId, bookingType: apptType?.toUpperCase().includes('REVIEW')?'FOLLOW_UP':'NEW' };
			}
			// Call real API
			const resp = await bookWalkInAppointment(payload);
			const apptData = resp?.data || resp || {};
			const requestItem = { id: apptData.id || Math.random().toString(36).slice(2), name: isExisting ? (mobile.trim().slice(0,8)+'…') : (firstName+' '+lastName), gender: isExisting?'—': gender.charAt(0).toUpperCase(), age:'', date:new Date().toDateString(), time:'', secondary:'Cancel', raw: apptData };
			onAppointmentBooked(requestItem);
			onBookedRefresh?.();
			onClose();
		} catch (e) { setErrorMsg('Booking failed'); } finally { setBooking(false); }
	};
	return (<>
		<div className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${show?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'}`} onClick={onClose} />
		<div className={`fixed z-50 transition-transform duration-500 ${show?'translate-x-0':'translate-x-full'}`} style={{top:24,right:show?24:0,bottom:24,width:520,maxWidth:'100vw',background:'white',borderTopLeftRadius:14,borderBottomLeftRadius:14,boxShadow:'0 8px 32px 0 rgba(0,0,0,0.18)',display:'flex',flexDirection:'column'}}>
			<div className='p-4 flex flex-col h-full'>
				<div className='flex items-center justify-between mb-2'>
					<h2 className='text-[18px] font-semibold'>Book Walk-In Appointment</h2>
					<div className='flex items-center gap-2'>
						<button onClick={handleBook} disabled={!canBook()} className={`text-sm font-medium rounded px-3 py-1.5 border ${canBook() ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'}`}>{booking?'Booking...':'Book Appointment'}</button>
						<button className='text-gray-500 hover:text-gray-700' onClick={onClose}><X className='w-5 h-5' /></button>
					</div>
				</div>
				<div className='flex items-center gap-6 mt-2 mb-4'>
					<label className='inline-flex items-center gap-2 text-sm'><input type='radio' name='pt' checked={isExisting} onChange={()=>setIsExisting(true)} /> Existing Patients</label>
					<label className='inline-flex items-center gap-2 text-sm'><input type='radio' name='pt' checked={!isExisting} onChange={()=>setIsExisting(false)} /> New Patient</label>
				</div>
				<div className='flex-1 min-h-0 overflow-y-auto pr-1'>
					{isExisting ? (
						<div className='mb-3'><label className='block text-sm font-medium text-gray-700 mb-1'>Patient <span className='text-red-500'>*</span></label><input type='text' value={mobile} onChange={e=>setMobile(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Search Patient by name, Abha id, Patient ID or Contact Number' /></div>
					) : (<>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
							<div><label className='block text-sm font-medium text-gray-700 mb-1'>First Name <span className='text-red-500'>*</span></label><input value={firstName} onChange={e=>setFirstName(e.target.value)} type='text' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Enter First Name' /></div>
							<div><label className='block text-sm font-medium text-gray-700 mb-1'>Last Name <span className='text-red-500'>*</span></label><input value={lastName} onChange={e=>setLastName(e.target.value)} type='text' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Enter Last Name' /></div>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
							<div><label className='block text-sm font-medium text-gray-700 mb-1'>Date of Birth <span className='text-red-500'>*</span></label><div className='relative'><input ref={dobRef} value={dob} onChange={e=>setDob(e.target.value)} type='date' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm pr-8 focus:outline-none focus:border-blue-500' /><button type='button' onClick={()=> (dobRef.current?.showPicker ? dobRef.current.showPicker() : dobRef.current?.focus())} className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500'><Calendar className='w-4 h-4' /></button></div></div>
							<div><label className='block text-sm font-medium text-gray-700 mb-1'>Gender <span className='text-red-500'>*</span></label><select value={gender} onChange={e=>setGender(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500'><option value='' disabled>Select Gender</option>{genders.map(g=> <option key={g} value={g}>{g}</option>)}</select></div>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
							<div><label className='block text-sm font-medium text-gray-700 mb-1'>Blood Group <span className='text-red-500'>*</span></label><select value={bloodGroup} onChange={e=>setBloodGroup(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500'><option value='' disabled>Select Blood Group</option>{bloodGroups.map(bg=> <option key={bg} value={bg}>{bg}</option>)}</select></div>
							<div><label className='block text-sm font-medium text-gray-700 mb-1'>Mobile Number <span className='text-red-500'>*</span></label><input value={mobile} onChange={e=>setMobile(e.target.value)} type='tel' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Enter Mobile Number' /></div>
						</div>
						<div className='mt-3'><label className='block text-sm font-medium text-gray-700 mb-1'>Email ID</label><input value={email} onChange={e=>setEmail(e.target.value)} type='email' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Enter Email' /></div>
					</>)}
					<div className='mb-3 mt-3'>
						<label className='block text-sm font-medium text-gray-700 mb-1'>Appointment Type <span className='text-red-500'>*</span></label>
						<select value={apptType} onChange={e=>setApptType(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500'>{suggestions.map(s=> <option key={s} value={s}>{s}</option>)}</select>
						<div className='mt-2 flex flex-wrap gap-2 text-xs'>{suggestions.map(s=> <button key={s} type='button' className='px-2 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50' onClick={()=> setApptType(s)}>{s}</button>)}</div>
					</div>
					<div className='mb-3'>
						<label className='block text-sm font-medium text-gray-700 mb-1'>Reason for Visit <span className='text-red-500'>*</span></label>
						<input value={reason} onChange={e=>setReason(e.target.value)} type='text' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Enter Reason for Visit' />
						<div className='mt-2 flex flex-wrap gap-2 text-xs'>{reasonSuggestions.map(s=> <button key={s} type='button' className='px-2 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50' onClick={()=> setReason(s)}>{s}</button>)}</div>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div><label className='block text-sm font-medium text-gray-700 mb-1'>Appointment Date <span className='text-red-500'>*</span></label><div className='relative'><input ref={apptDateRef} type='date' value={apptDate} onChange={e=>setApptDate(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm pr-8 focus:outline-none focus:border-blue-500' /><button type='button' onClick={()=> (apptDateRef.current?.showPicker ? apptDateRef.current.showPicker() : apptDateRef.current?.focus())} className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500'><Calendar className='w-4 h-4' /></button></div></div>
						<div>
							<div className='flex items-center justify-between'><label className='block text-sm font-medium text-gray-700 mb-1'>Available Slot <span className='text-red-500'>*</span></label><span className='text-xs text-green-600'>5 Tokens available</span></div>
							<select className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm' value={slotValue} onChange={e=> setSlotValue(e.target.value)}>{timeSlots.map(t=> <option key={t.key} value={t.key}>{t.label} ({t.time})</option>)}</select>
							{!activeSlotId && <div className='mt-2 text-xs text-amber-600'>Select a slot from the page header to enable booking.</div>}
						</div>
					</div>
				</div>
				<div className='pt-3 mt-2 border-t border-gray-200'>
					<div className='flex justify-end gap-3'>
						<button className='px-4 py-2 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50' onClick={onClose}>Cancel</button>
						{errorMsg && <div className='mr-auto text-xs text-red-600 px-2 py-1'>{errorMsg}</div>}
						<button disabled={!canBook()} onClick={handleBook} className={`px-4 py-2 rounded text-sm ${canBook() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>{booking?'Booking...':'Book Appointment'}</button>
					</div>
				</div>
			</div>
		</div>
	</>);
};

export default function FDQueue() {
	const [activeFilter, setActiveFilter] = useState('In Waiting');
	const [selectedTimeSlot] = useState('Morning (10:00 am - 12:30 pm)');
	const [slotValue, setSlotValue] = useState('morning');
	const [slotOpen, setSlotOpen] = useState(false);
	const slotAnchorRef = useRef(null);
	const slotMenuRef = useRef(null);
	const [slotPos, setSlotPos] = useState({ top:0,left:0,width:320 });
	const [currentDate, setCurrentDate] = useState(new Date());
	const [sessionStarted, setSessionStarted] = useState(false);
	const [queuePaused, setQueuePaused] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [patientStartedAt, setPatientStartedAt] = useState(null);
	const [elapsed, setElapsed] = useState(0);
	const [removingToken, setRemovingToken] = useState(null);
	const [incomingToken, setIncomingToken] = useState(null);
	// Holds list currently shown in table (derived from active filter)
	const [queueData, setQueueData] = useState([]);
	const [appointmentRequests, setAppointmentRequests] = useState([]);
	const [apptLoading, setApptLoading] = useState(false);
	const [apptError, setApptError] = useState('');
	// Pull doctor context from auth store; fetch if missing
	const { doctorDetails, doctorLoading, fetchDoctorDetails } = useAuthStore();
	useEffect(()=>{ if(!doctorDetails && !doctorLoading){ fetchDoctorDetails?.(getDoctorMe); } },[doctorDetails, doctorLoading, fetchDoctorDetails]);

	// Derive IDs from doctor details
	const clinicId = doctorDetails?.associatedWorkplaces?.clinic?.id || doctorDetails?.clinicId || doctorDetails?.primaryClinicId || null;
	const doctorId = doctorDetails?.userId || doctorDetails?.id || null;
	const hospitalId = (Array.isArray(doctorDetails?.associatedWorkplaces?.hospitals) && doctorDetails?.associatedWorkplaces?.hospitals?.[0]?.id) || undefined;

	// Helpers for formatting pending appointment data
	const fmtDOB = dobIso => { if(!dobIso) return ''; try { const d=new Date(dobIso); const day=String(d.getDate()).padStart(2,'0'); const mo=String(d.getMonth()+1).padStart(2,'0'); const yr=d.getFullYear(); return `${day}/${mo}/${yr}`; } catch { return ''; } };
	const calcAgeYears = dobIso => { if(!dobIso) return ''; try { const d=new Date(dobIso); const diff=Date.now()-d.getTime(); const ageDate=new Date(diff); return Math.abs(ageDate.getUTCFullYear()-1970); } catch { return ''; } };
	const fmtApptDate = dateIso => { if(!dateIso) return ''; try { const d=new Date(dateIso); const day=String(d.getDate()).padStart(2,'0'); const mo=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]; const yr=d.getFullYear(); return `${mo} ${day}, ${yr}`; } catch { return ''; } };
	const fmtTimeRangeIST = (startIso,endIso) => { if(!startIso||!endIso) return ''; try { const toIST = iso => { const d=new Date(iso); return d; }; const s=toIST(startIso); const e=toIST(endIso); const pad=n=> String(n).padStart(2,'0'); const to12 = d=> { let h=d.getHours(); const m=pad(d.getMinutes()); const ampm = h>=12?'PM':'AM'; h = h%12; if(h===0) h=12; return `${h}:${m} ${ampm}`; }; return `${to12(s)} - ${to12(e)}`; } catch { return ''; } };
	useEffect(()=>{ let ignore=false; const load= async()=>{ if(!clinicId) return; setApptLoading(true); setApptError(''); try { const resp= await getPendingAppointmentsForClinic({ clinicId }); const arr = resp?.data || resp?.appointments || []; if(!ignore){ const mapped = arr.map(item=> { const p=item.patientDetails||{}; const sched=item.schedule||{}; const fullName=[p.firstName,p.lastName].filter(Boolean).join(' ') || 'Patient'; const ageYears=calcAgeYears(p.dob); const ageStr = p.dob ? `${fmtDOB(p.dob)} (${ageYears}Y)` : ''; const apptDate = fmtApptDate(sched.date || item.createdAt); const timeRange = fmtTimeRangeIST(sched.startTime, sched.endTime); const bookingType = item.type==='ONLINE'?'Online':'Walk-In'; return { id:item.id, name:fullName, gender:(p.gender||'').slice(0,1).toUpperCase(), age:ageStr, date:apptDate, time:timeRange, reason:item.reason||'', bookingType, secondary:'Reschedule', raw:item }; }); setAppointmentRequests(mapped); } } catch(e){ if(!ignore){ const status = e?.response?.status; if(status===404){ /* ignore 404 silently */ } else { setApptError(e?.response?.data?.message||e.message||'Failed to load'); } } } finally { if(!ignore) setApptLoading(false); } }; load(); return ()=>{ ignore=true; }; },[clinicId]);
	// Filters aligned with API categories; UI label -> response key
	const FILTER_KEY_MAP = { 'In Waiting':'inWaiting', 'Engaged':'engaged', 'Checked In':'checkedIn', 'No Show':'noShow', 'Admitted':'admitted', 'All':'all' };
	const filters = Object.keys(FILTER_KEY_MAP);
	const { slots, slotsLoading, slotsError, selectedSlotId, selectSlot, loadSlots, loadAppointmentsForSelectedSlot, slotAppointments, slotAppointmentsLoading } = useSlotStore();
	// Load today's slots once IDs are available
	useEffect(()=>{
		if(!doctorId || !clinicId) return;
		const today = new Date();
		const dateIso = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
		loadSlots({ doctorId, date: dateIso, clinicId, hospitalId });
	},[doctorId, clinicId, hospitalId, loadSlots]);
	useEffect(()=>{ if(selectedSlotId){ loadAppointmentsForSelectedSlot(); } },[selectedSlotId]);

	// Map API appointment object to table row shape
	const mapAppointment = (appt, idx) => {
		if (!appt) return null;
		const p = appt.patientDetails || appt.patient || {};
		const fullName = p.name || [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Patient';
		const genderRaw = p.gender || appt.gender || ''; const gender = genderRaw ? genderRaw.charAt(0).toUpperCase() : '—';
		// DOB formatting dd/mm/yyyy
		let dobStr = ''; let ageStr = '';
		try { if (p.dob) { const d=new Date(p.dob); const dd=String(d.getDate()).padStart(2,'0'); const mm=String(d.getMonth()+1).padStart(2,'0'); const yyyy=d.getFullYear(); dobStr = `${dd}/${mm}/${yyyy}`; const ageYears = typeof p.age==='number'? p.age : Math.max(0, new Date().getFullYear()-d.getFullYear() - (new Date() < new Date(d.setFullYear(new Date().getFullYear())) ? 1:0)); ageStr = `${dobStr} (${ageYears}Y)`; } } catch { /* ignore */ }
		const APPT_TYPE_MAP = { NEW:'New Consultation', FOLLOW_UP:'Follow-up Consultation', REVIEW:'Review Visit', SECOND_OPINION:'Second Opinion' };
		const appointmentType = APPT_TYPE_MAP[appt.appointmentType] || appt.appointmentType || 'Consultation';
		const formatExpectedTime = iso => { if(!iso) return ''; try { const d=new Date(iso); return d.toLocaleTimeString([], { hour:'numeric', minute:'2-digit' }); } catch { return ''; } };
		const expectedTime = formatExpectedTime(appt.expectedTime) || appt.expectedTimeLabel || '';
		const bookingType = appt.bookingMode === 'ONLINE' ? 'Online' : appt.bookingMode === 'WALK_IN' ? 'Walk-In' : (appt.bookingType || '');
		const reasonForVisit = appt.reason || appt.reasonForVisit || '';
		return { token: appt.tokenNo || appt.token || (idx+1), patientName: fullName, gender, age: ageStr, appointmentType, expectedTime, bookingType, reasonForVisit, status: appt.status || 'Waiting' };
	};

	// When appointments for slot or filter change: derive queueData from categorized response
	useEffect(()=>{
		// Store holds slotAppointments = response.data
		// Shape: { counts: {...}, appointments: { checkedIn:[], inWaiting:[], engaged:[], noShow:[], admitted:[], all:[] } }
		const categories = slotAppointments?.appointments;
		if (!categories) return;
		const key = FILTER_KEY_MAP[activeFilter] || 'all';
		const rawList = categories[key] || categories.all || [];
		const mapped = rawList.map(mapAppointment).filter(Boolean);
		setQueueData(mapped);
	}, [slotAppointments, activeFilter]);

	// On date change: reload slots for that date
	const handleDateChange = (d) => {
		setCurrentDate(d);
	// Build yyyy-mm-dd to avoid timezone shifts
	const dateIso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
		if(!doctorId || !clinicId) return;
		loadSlots({ doctorId, date: dateIso, clinicId, hospitalId });
	};

	// Group API slots into IST-based day parts and build dropdown items dynamically
	const groupedSlots = useMemo(()=>{
		const sorted = [...slots].sort((a,b)=> new Date(a.startTime) - new Date(b.startTime));
		return sorted.reduce((acc, s)=>{
			const part = classifyISTDayPart(s.startTime);
			if (!acc[part]) acc[part] = [];
			acc[part].push(s);
			return acc;
		}, { morning:[], afternoon:[], evening:[], night:[] });
	}, [slots]);

	const timeSlots = useMemo(()=>{
		const arr = [];
		if (groupedSlots.morning.length) {
			const first = groupedSlots.morning[0]; const last = groupedSlots.morning[groupedSlots.morning.length-1];
			arr.push({ key:'morning', label:'Morning', time: buildISTRangeLabel(first.startTime, last.endTime), Icon:Sunrise });
		}
		if (groupedSlots.afternoon.length) {
			const first = groupedSlots.afternoon[0]; const last = groupedSlots.afternoon[groupedSlots.afternoon.length-1];
			arr.push({ key:'afternoon', label:'Afternoon', time: buildISTRangeLabel(first.startTime, last.endTime), Icon:Sun });
		}
		if (groupedSlots.evening.length) {
			const first = groupedSlots.evening[0]; const last = groupedSlots.evening[groupedSlots.evening.length-1];
			arr.push({ key:'evening', label:'Evening', time: buildISTRangeLabel(first.startTime, last.endTime), Icon:Sunset });
		}
		if (groupedSlots.night.length) {
			const first = groupedSlots.night[0]; const last = groupedSlots.night[groupedSlots.night.length-1];
			arr.push({ key:'night', label:'Night', time: buildISTRangeLabel(first.startTime, last.endTime), Icon:Moon });
		}
		return arr;
	}, [groupedSlots]);
	useEffect(()=>{ const onClick=e=>{ const a=slotAnchorRef.current; const m=slotMenuRef.current; if(a&&a.contains(e.target)) return; if(m&&m.contains(e.target)) return; setSlotOpen(false); }; const onKey=e=>{ if(e.key==='Escape') setSlotOpen(false); }; window.addEventListener('mousedown',onClick); window.addEventListener('keydown',onKey); return ()=>{ window.removeEventListener('mousedown',onClick); window.removeEventListener('keydown',onKey); }; },[]);
	// Counts direct from API (fallback to derived lengths)
	const counts = slotAppointments?.counts || {};
	const getFilterCount = f => {
		const key = FILTER_KEY_MAP[f];
		if (!key) return 0;
		if (typeof counts[key] === 'number') return counts[key];
		if (key === 'all') return queueData.length;
		return queueData.length;
	};
	const activePatient = useMemo(()=> queueData[currentIndex] || null,[queueData,currentIndex]);
	useEffect(()=>{ if(!sessionStarted || queuePaused || !patientStartedAt) return; const id=setInterval(()=>{ const now=Date.now(); setElapsed(Math.max(0,Math.floor((now-patientStartedAt)/1000))); },1000); return ()=> clearInterval(id); },[sessionStarted,queuePaused,patientStartedAt]);
	const formatTime = s => { const mm=String(Math.floor(s/60)).padStart(2,'0'); const ss=String(s%60).padStart(2,'0'); return `${mm}:${ss}`; };
	const handleToggleSession = () => { if(sessionStarted){ setSessionStarted(false); setQueuePaused(false); setPatientStartedAt(null); setElapsed(0);} else { const firstIdx=Math.max(0, queueData.findIndex(p=>p.status==='Waiting')); setCurrentIndex(firstIdx===-1?0:firstIdx); setSessionStarted(true); setQueuePaused(false); setPatientStartedAt(Date.now()); setElapsed(0);} };
	const completeCurrentPatient = () => { const ANIM_MS=300; const active=activePatient; if(!active) return; setRemovingToken(active.token); const activeCard=document.querySelector('#active-patient-card'); if(activeCard){ activeCard.classList.remove('active-card-enter'); activeCard.classList.add('active-card-exit'); } setTimeout(()=>{ setQueueData(prev=>{ const newArr= prev.filter((_,i)=> i!==currentIndex); const nextIdx=newArr.length===0?0: Math.min(currentIndex, newArr.length-1); setCurrentIndex(nextIdx); if(newArr.length>0){ const nextToken=newArr[nextIdx]?.token; setIncomingToken(nextToken); setPatientStartedAt(Date.now()); setElapsed(0);} else { setPatientStartedAt(null); setElapsed(0);} return newArr; }); setRemovingToken(null); setTimeout(()=>{ const card=document.querySelector('#active-patient-card'); if(card){ card.classList.remove('active-card-exit'); card.classList.add('active-card-enter'); } setIncomingToken(null); },30); }, ANIM_MS); };
	const [checkedInTokens, setCheckedInTokens] = useState(new Set());
	const [checkedInToken, setCheckedInToken] = useState(null);
	const [showPreScreen, setShowPreScreen] = useState(false);
	const [rightDivPatient, setRightDivPatient] = useState(null);
	const [preScreenData, setPreScreenData] = useState({});
	const [showWalkIn, setShowWalkIn] = useState(false);
	const handleCheckIn = row => { setCheckedInTokens(prev=> new Set(prev).add(row.token)); setCheckedInToken(row.token); setShowPreScreen(true); };
	const handlePreScreenClose = () => { setShowPreScreen(false); const patient= queueData.find(p=> p.token===checkedInToken) || {}; setRightDivPatient(patient); };
	return (
		<div className='h-screen overflow-hidden bg-gray-50'>
			<div className='sticky top-0 z-10 bg-white border-b-[0.5px] border-gray-200 px-4 py-2'>
				<div className='flex items-center'>
					{/* Slot dropdown left */}
					<div className='relative mr-6' ref={slotAnchorRef}>
							<button type='button' className='flex items-center bg-white rounded-md border border-gray-200 shadow-sm px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50' onClick={e=>{ setSlotOpen(v=>!v); const rect=e.currentTarget.getBoundingClientRect(); const width=360; const left=Math.max(8,Math.min(rect.left, window.innerWidth-width-8)); const top=Math.min(rect.bottom+8, window.innerHeight-8-4); setSlotPos({ top,left,width }); }}>
								<span className='font-medium mr-1'>{timeSlots.find(t=> t.key===slotValue)?.label || 'Morning'}</span>
								<span className='text-gray-500'>({timeSlots.find(t=> t.key===slotValue)?.time || '10:00am-12:00pm'})</span>
								<ChevronDown className='ml-2 h-4 w-4 text-gray-500' />
							</button>
							{slotOpen && createPortal(<div ref={slotMenuRef} className='fixed z-[9999]' style={{ top:slotPos.top, left:slotPos.left, width:slotPos.width }}>
								<div className='bg-white rounded-xl border border-gray-200 shadow-xl'>
									<ul className='py-1'>
										{timeSlots.map(({ key,label,time,Icon }, idx)=>(
											<li key={key}>
												<button type='button' onClick={()=>{ setSlotValue(key); const group = groupedSlots[key] || []; if (group.length) { const first = group[0]; const slotIdentifier = first.id || first.slotId || first._id || null; if (slotIdentifier) selectSlot(slotIdentifier); } setSlotOpen(false); }} className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-blue-50 ${slotValue===key?'bg-blue-50':''}`}>
													<span className='flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 border border-blue-200 text-blue-600'><Icon className='w-4 h-4' /></span>
													<span className='flex-1'>
														<span className='block text-[14px] font-semibold text-gray-900'>{label}</span>
														<span className='block text-[13px] text-gray-600'>({time})</span>
													</span>
												</button>
												{idx < timeSlots.length-1 && <div className='h-px bg-gray-200 mx-4' />}
											</li>
										))}
									</ul>
								</div>
							</div>, document.body)}
					</div>
					{/* Center area for date picker */}
					<div className='flex-1 flex justify-center'>
						<QueueDatePicker date={currentDate} onChange={handleDateChange} />
					</div>
					{/* Walk-in badge right (slot select removed, integrated in dropdown) */}
					<div className='ml-auto flex items-center gap-6'>
						{slotsLoading && <span className='text-xs text-gray-500'>Loading slots…</span>}
						{slotsError && !slotsLoading && <span className='text-xs text-red-600'>{slotsError}</span>}
						<Badge size='large' type='solid' color='blue' hover className='cursor-pointer select-none' onClick={()=> setShowWalkIn(true)}>Walk-in Appointment</Badge>
					</div>
				</div>
							</div>
			{/* Overview + content */}
			<div className='px-0 pt-0 pb-2 h-[calc(100vh-100px)] flex flex-col overflow-hidden'>
				{sessionStarted && (<div className=''><div className='w-full bg-[#22C55E] h-[38px] flex items-center relative px-0 rounded-none'><div className='flex-1 flex items-center justify-center gap-3'><span className='text-white font-medium text-[16px]'>Current Token Number</span><span className='inline-flex items-center gap-2 font-bold text-white text-[18px]'><span className='inline-block w-3 h-3 rounded-full bg-[#D1FADF] border border-[#A7F3D0]'></span>{String(activePatient?.token ?? 0).padStart(2,'0')}</span></div><button className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 border border-red-200 bg-white text-red-600 text-xs font-semibold px-2 py-1 rounded transition hover:bg-red-50' onClick={()=> setQueuePaused(!queuePaused)}>{queuePaused?'Resume Queue':'Pause Queue'}</button></div></div>)}
				<div className='p-2 flex flex-col flex-1 min-h-0'>
					<div className='flex flex-col gap-2'><h3 className='text-[#424242] font-medium'>Overview</h3><div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
						<OverviewStatCard title='All Appointments' value={counts.all ?? queueData.length} />
						<OverviewStatCard title='Checked In' value={counts.checkedIn ?? counts['checkedIn'] ?? 0} />
						<OverviewStatCard title='Engaged' value={counts.engaged ?? counts['engaged'] ?? 0} />
						<OverviewStatCard title='No Show/Cancelled' value={(counts.noShow ?? counts['noShow'] ?? 0) + (counts.cancelled ?? 0)} />
					</div></div>
					{sessionStarted && activePatient && (<div className='mb-2 p-2'><h3 className='text-gray-800 font-semibold mb-2'>Active Patient</h3><div id='active-patient-card' className='bg-white rounded-lg border border-blue-200 px-4 py-3 flex items-center justify-between text-sm active-card-enter'><div className='flex items-center gap-4 min-w-0'><AvatarCircle name={activePatient.patientName} size='s' /><div className='flex items-center gap-4 min-w-0'><div className='min-w-0'><div className='flex items-center gap-1'><span className='font-semibold text-gray-900 truncate max-w-[160px]'>{activePatient.patientName}</span><span className='text-gray-400 text-xs leading-none'>↗</span></div><div className='text-[11px] text-gray-500 mt-0.5'>{activePatient.gender} | {activePatient.age}</div></div><div className='h-10 w-px bg-gray-200' /><div><div className='flex items-center gap-2 shrink-0'><span className='text-gray-500'>Token Number</span><span className='inline-flex items-center justify-center w-5 h-5 rounded border border-blue-300 bg-blue-50 text-[11px] font-medium text-blue-700'>{activePatient.token}</span></div><div className='flex items-center gap-1 text-gray-500'><span className=''>Reason for Visit :</span><span className='font-xs whitespace-nowrap text-gray-700'>{activePatient.reasonForVisit}</span></div></div></div></div><div className='flex items-center gap-3 shrink-0 pl-4'><div className='inline-flex items-center gap-1 rounded-md border border-green-200 bg-green-50 px-2 py-1 text-[12px] font-medium text-green-700'><span className='inline-block w-2 h-2 rounded-full bg-green-500' />{formatTime(elapsed)}</div><button onClick={completeCurrentPatient} className='inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'>End Session</button><button className='text-gray-500 hover:text-gray-700 px-2 py-1'>⋯</button></div></div></div>)}
					<div className='flex items-center justify-between px-1 py-3'>
						<div className='flex gap-3'>{filters.map(f=> <button key={f} onClick={()=> setActiveFilter(f)} className={` px-[6px] py-1 rounded-lg font-medium text-sm transition-colors ${activeFilter===f? 'bg-white text-blue-600 shadow-sm':'text-gray-600 hover:text-gray-800'}`}>{f} <span className='ml-1 text-xs'>{getFilterCount(f)}</span></button>)}</div>
						<div className='flex items-center gap-6'><div className='flex items-center gap-2'><span className='text-gray-700 text-sm'>Start Session</span><Toggle checked={sessionStarted} onChange={handleToggleSession} /></div><div className='flex items-center space-x-2'><span className='text-gray-600 text-sm'>Tokens Available</span><Badge size='small' type='ghost' color='green' hover>5 Out of 100</Badge></div></div>
					</div>
					<div className='w-full flex flex-col lg:flex-row gap-3 flex-1 min-h-0 overflow-hidden'>
						<div className='flex-1 min-w-0 min-h-0 overflow-hidden flex flex-col'>
							<QueueTable allowSampleFallback={false} onCheckIn={handleCheckIn} checkedInToken={checkedInToken} checkedInTokens={checkedInTokens} items={queueData} removingToken={removingToken} incomingToken={incomingToken} onRevokeCheckIn={token=>{ setCheckedInTokens(prev=>{ const n=new Set(prev); n.delete(token); return n; }); if(checkedInToken===token) setCheckedInToken(null); }} onMarkNoShow={token=> setQueueData(prev=> prev.filter(p=> p.token!== token))} />
						</div>
						<div className='shrink-0 w-[400px] bg-white rounded-[12px] border-[0.5px] border-[#D6D6D6] h-full overflow-y-auto'>
							<div className=''>
								<div className='p-3 flex items-center gap-2 bg-[#D6D6D6] bg-opacity-10 border-b-[0.5px] border-gray-400'><img src={appointement} alt='Appointment' className='w-5 h-5 mr-2' /><h2 className='text-[14px] font-medium text-[#1F2937]'>Appointment Request</h2></div>
								<div className='divide-y divide-gray-200'>
									{slotAppointmentsLoading && <div className='p-3 text-xs text-gray-500'>Loading slot appointments…</div>}
									{apptLoading && <div className='p-3 text-xs text-gray-500'>Loading pending appointments…</div>}
									{/* Suppress temporary error display (e.g., 404) as per request */}
									{false && apptError && !apptLoading && <div className='p-3 text-xs text-red-600'>{apptError}</div>}
									{!apptLoading && !apptError && appointmentRequests.map((request, index)=> (
										<div key={index} className=''>
											<div className='flex items-start gap-4 p-3'>
												<div className='flex flex-col w-full gap-2'>
													<div className='flex items-start justify-between'>
														<div className='flex gap-2'>
															<AvatarCircle name={request.name} size='l' />
															<div className='flex flex-col'>
																<div className='text-[16px] leading-6 font-semibold text-gray-900'>{request.name}</div>
																<div className='text-xs text-gray-500'>{request.gender} | {request.age}</div>
															</div>
														</div>
														<button className='text-gray-500 hover:text-gray-700 px-1'>⋯</button>
													</div>
													<div className='flex flex-col gap-1 text-[14px] text-gray-700'>
														<div className='flex items-center'><Calendar className='h-4 w-4 mr-2 text-gray-500' /><span>{request.date}</span></div>
														{request.time && (<div className='flex items-center'><Clock className='h-4 w-4 mr-2 text-gray-500' /><span>{request.time}</span></div>)}
													</div>
													<div className='flex justify-between gap-3'>
														<Button size='large' variant='primary' className='w-full'>Accept</Button>
														<Button size='large' variant='secondary' className='w-full'>{request.secondary || 'Reschedule'}</Button>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
								<div className='pt-4'><button className='text-sm font-medium text-blue-600 hover:text-blue-700'>View All Requests</button></div>
							</div>
						</div>
					</div>
					<PreScreeningDrawer show={showPreScreen} patient={queueData.find(p=> p.token===checkedInToken)} onClose={handlePreScreenClose} onSave={({ token, vitals })=> setPreScreenData(s=> ({...s,[token]:vitals}))} initialVitals={checkedInToken? preScreenData[checkedInToken]: undefined} />
					<WalkInAppointmentDrawer show={showWalkIn} onClose={()=> setShowWalkIn(false)} timeSlots={timeSlots} slotValue={slotValue} setSlotValue={setSlotValue} activeSlotId={selectedSlotId} onAppointmentBooked={item=> setAppointmentRequests(prev=> [item, ...prev])} onBookedRefresh={()=> { if(selectedSlotId){ loadAppointmentsForSelectedSlot(); } }} />
				</div>
			</div>
		</div>
	);
}

