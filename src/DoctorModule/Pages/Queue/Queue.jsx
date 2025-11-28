import React, { useEffect, useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ChevronDown, Sunrise, Sun, Sunset, Moon, X, Clock } from 'lucide-react';
import QueueDatePicker from '../../../components/QueueDatePicker';
import AvatarCircle from '../../../components/AvatarCircle';
import Button from '../../../components/Button';
import Badge from '../../../components/Badge';
import OverviewStatCard from '../../../components/OverviewStatCard';
import Toggle from '../../../components/FormItems/Toggle';
import QueueTable from './QueueTable';
import useAuthStore from '../../../store/useAuthStore';
import useSlotStore from '../../../store/useSlotStore';
import { getDoctorMe, startSlotEta, endSlotEta, getSlotEtaStatus, startPatientSessionEta, endPatientSessionEta, pauseSlotEta, resumeSlotEta } from '../../../services/authService';
import { appointement } from '../../../../public/index.js';

// Walk-in Appointment Drawer (simplified retained)
const WalkInAppointmentDrawer = ({ show, onClose, timeSlots, slotValue, setSlotValue, onAppointmentBooked, activeSlotId }) => {
  const [isExisting, setIsExisting] = useState(false);
  const [reason, setReason] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [booking, setBooking] = useState(false);
  const canBook = () => {
    if (booking) return false;
    if (!activeSlotId) return false;
    if (isExisting) return reason.length > 2;
    return firstName && lastName && reason;
  };
  const handleBook = () => {
    if (!canBook()) return;
    setBooking(true);
    setTimeout(() => {
      onAppointmentBooked({ id: Math.random().toString(36).slice(2), name: isExisting ? 'Existing' : `${firstName} ${lastName}`, gender: '—', age: '', date: new Date().toDateString(), time: '', secondary: 'Cancel' });
      setBooking(false);
      onClose();
    }, 600);
  };
  return (
    <>
      <div className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${show? 'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-24 right-0 bottom-24 w-[380px] bg-white border-l border-gray-200 shadow-xl z-50 transition-transform duration-500 ${show? 'translate-x-0':'translate-x-full'}`}>
        <div className='p-4 flex flex-col h-full'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-[16px] font-semibold'>Walk-In Appointment</h2>
            <button onClick={onClose} className='text-gray-500 hover:text-gray-700'><X className='w-4 h-4'/></button>
          </div>
          <div className='flex items-center gap-4 text-sm mb-3'>
            <label className='inline-flex items-center gap-2'><input type='radio' checked={isExisting} onChange={()=> setIsExisting(true)} /> Existing</label>
            <label className='inline-flex items-center gap-2'><input type='radio' checked={!isExisting} onChange={()=> setIsExisting(false)} /> New</label>
          </div>
          <div className='flex-1 overflow-y-auto space-y-3'>
            {!isExisting && (
              <>
                <input value={firstName} onChange={e=> setFirstName(e.target.value)} placeholder='First Name' className='w-full border border-gray-300 rounded px-3 py-2 text-sm'/>
                <input value={lastName} onChange={e=> setLastName(e.target.value)} placeholder='Last Name' className='w-full border border-gray-300 rounded px-3 py-2 text-sm'/>
              </>
            )}
            <input value={reason} onChange={e=> setReason(e.target.value)} placeholder='Reason for visit' className='w-full border border-gray-300 rounded px-3 py-2 text-sm'/>
            {!activeSlotId && <div className='text-xs text-amber-600'>Select a slot above to enable booking.</div>}
          </div>
          <div className='pt-3 mt-2 border-t border-gray-200 flex justify-end gap-3'>
            <button onClick={onClose} className='px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50'>Cancel</button>
            <button disabled={!canBook()} onClick={handleBook} className={`px-3 py-1.5 rounded text-sm ${canBook()? 'bg-blue-600 text-white hover:bg-blue-700':'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>{booking? 'Booking…':'Book'}</button>
          </div>
        </div>
      </div>
    </>
  );
};

const Queue = () => {
  const [activeFilter, setActiveFilter] = useState('Checked In');
  const [currentDate, setCurrentDate] = useState(new Date());
  // Auth
  const { doctorDetails, doctorLoading, fetchDoctorDetails } = useAuthStore();
  useEffect(()=>{ if(!doctorDetails && !doctorLoading && fetchDoctorDetails){ fetchDoctorDetails(getDoctorMe); } },[doctorDetails, doctorLoading, fetchDoctorDetails]);
  const doctorId = doctorDetails?.userId || doctorDetails?.id;
  const clinicId = doctorDetails?.associatedWorkplaces?.clinic?.id || doctorDetails?.clinicId;
  const hospitalId = (Array.isArray(doctorDetails?.associatedWorkplaces?.hospitals) && doctorDetails?.associatedWorkplaces?.hospitals[0]?.id) || undefined;

  // Slot store
  const { slots, slotsLoading, selectedSlotId, selectSlot, loadSlots, loadAppointmentsForSelectedSlot, slotAppointments } = useSlotStore();
  useEffect(()=>{ if(!doctorId || !clinicId) return; const d=currentDate; const dateIso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; loadSlots({ doctorId, date: dateIso, clinicId, hospitalId }); },[doctorId, clinicId, hospitalId, currentDate, loadSlots]);
  useEffect(()=>{ if(selectedSlotId){ loadAppointmentsForSelectedSlot(); } },[selectedSlotId, loadAppointmentsForSelectedSlot]);

  // Queue derived from slotAppointments (declared early, mapped later to avoid TDZ on sessionStarted)
  const [queueData, setQueueData] = useState([]);

  // Session + patient timer
  const [sessionStarted, setSessionStarted] = useState(false);
  const [slotStarting, setSlotStarting] = useState(false);
  const [startError, setStartError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [runStartAt, setRunStartAt] = useState(null);
  const [baseElapsed, setBaseElapsed] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const wasRunningOnPauseRef = useRef(false);
  const [queuePaused, setQueuePaused] = useState(false);
  const [pauseEndsAt, setPauseEndsAt] = useState(null);
  const [pauseRemaining, setPauseRemaining] = useState(0);
  const pauseTickerRef = useRef(null);
  const autoResumeTimerRef = useRef(null);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [pauseMinutes, setPauseMinutes] = useState(null);
  const [pauseSubmitting, setPauseSubmitting] = useState(false);
  const [pauseError, setPauseError] = useState('');
  const [resumeSubmitting, setResumeSubmitting] = useState(false);
  const [resumeError, setResumeError] = useState('');
  // Backend-reported current token to align active selection
  const [backendCurrentToken, setBackendCurrentToken] = useState(null);

  const activePatient = useMemo(()=> queueData[currentIndex] || null, [queueData, currentIndex]);

  // Timer interval
  useEffect(()=>{
    if(!runStartAt || !sessionStarted || queuePaused){ setElapsed(baseElapsed); return; }
    const id = setInterval(()=>{ setElapsed(baseElapsed + Math.max(0, Math.floor((Date.now()-runStartAt)/1000))); },1000);
    setElapsed(baseElapsed + Math.max(0, Math.floor((Date.now()-runStartAt)/1000)));
    return ()=> clearInterval(id);
  },[runStartAt, sessionStarted, queuePaused, baseElapsed]);
  const formatTime = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  // Slot status auto-sync (poll every 45s with in-flight guard) and timer sync from backend
  useEffect(()=>{ let ignore=false; let inFlight=false; const sync= async()=>{ if(!selectedSlotId || inFlight) return; inFlight=true; try { const st = await getSlotEtaStatus(selectedSlotId); if(ignore) return; const msg = st?.message || {}; const started = msg?.slotStatus === 'STARTED' || !!(st?.started || st?.inProgress || st?.active); if(typeof msg?.currentToken === 'number'){ setBackendCurrentToken(msg.currentToken); }
      // Sync timer from backend active patient startedAt if available
      const backendStartedAtIso = msg?.activePatientDetails?.startedAt; if(backendStartedAtIso){ const ts = new Date(backendStartedAtIso).getTime(); if(!isNaN(ts)){ const drift = Math.abs((Date.now()-ts) - (runStartAt? (Date.now()-runStartAt):0)); if(!runStartAt || drift > 1500){ setRunStartAt(ts); const secs=Math.floor((Date.now()-ts)/1000); setBaseElapsed(secs); setElapsed(secs); } } }
  if(started !== sessionStarted){ if(started){ setSessionStarted(true); setQueuePaused(false); try { await loadAppointmentsForSelectedSlot(); } catch {} } else { setSessionStarted(false); setRunStartAt(null); setBaseElapsed(0); setElapsed(0); } } } catch{} finally { inFlight=false; } }; sync(); const id=setInterval(sync,45000); return ()=>{ ignore=true; clearInterval(id); }; },[selectedSlotId, sessionStarted, loadAppointmentsForSelectedSlot, runStartAt]);
  

  // Map appointments to queueData after sessionStarted & backend token state available
  useEffect(()=>{
    const categories = slotAppointments?.appointments;
    if (!categories) { setQueueData([]); return; }
    const engaged = categories.engaged || [];
    const checked = categories.checkedIn || [];
    const admitted = categories.admitted || [];
  const mapAppt = appt => {
      if (!appt) return null;
      const p = appt.patientDetails || appt.patient || {};
      const name = p.name || [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Patient';
      const genderRaw = p.gender || appt.gender || '';
      const gender = genderRaw ? genderRaw[0].toUpperCase() : '—';
      let ageStr = '';
      try {
        if (p.dob) {
          const d = new Date(p.dob);
          const dd = String(d.getDate()).padStart(2, '0');
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const yyyy = d.getFullYear();
          const now = new Date();
          let age = now.getFullYear() - yyyy - (now < new Date(now.getFullYear(), d.getMonth(), d.getDate()) ? 1 : 0);
          ageStr = `${dd}/${mm}/${yyyy} (${age}Y)`;
        }
      } catch {}
      const apptTypeMap = { NEW: 'New Consultation', FOLLOW_UP: 'Follow-up Consultation', REVIEW: 'Review Visit', SECOND_OPINION: 'Second Opinion' };
      const appointmentType = apptTypeMap[appt.appointmentType] || appt.appointmentType || 'Consultation';
      const expectedTime = appt.expectedTime ? new Date(appt.expectedTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '';
      const bookingType = appt.bookingMode === 'ONLINE' ? 'Online' : appt.bookingMode === 'WALK_IN' ? 'Walk-In' : appt.bookingType || '';
      const reason = appt.reason || appt.reasonForVisit || '';
      return {
        id: appt.id || appt.appointmentId,
    token: appt.tokenNo != null ? Number(appt.tokenNo) : (appt.token != null ? Number(appt.token) : undefined),
        patientName: name,
        gender,
        age: ageStr,
        appointmentType,
        expectedTime,
        bookingType,
        reasonForVisit: reason,
        status: appt.status || 'Waiting',
        startedAt: appt.startedAt || null,
      };
    };
    let base;
    if (activeFilter === 'Admitted') {
      base = admitted;
    } else if (sessionStarted) {
      base = engaged.length ? engaged : checked;
    } else {
      base = checked;
    }
    const mapped = base.map(mapAppt).filter(Boolean);
    setQueueData(mapped);
    if (backendCurrentToken != null) {
      const targetToken = Number(backendCurrentToken);
      const idx = mapped.findIndex(item => Number(item?.token) === targetToken);
      if (idx >= 0) {
        setCurrentIndex(idx);
        // clear once applied to avoid stale focus
        setBackendCurrentToken(null);
      }
    }
    // Sync timer with backend startedAt if available
    if (categories && categories.engaged && categories.engaged.length > 0) {
      const active = categories.engaged[0];
      if (active && active.startedAt) {
        const backendStart = new Date(active.startedAt).getTime();
        setRunStartAt(backendStart);
        setBaseElapsed(Math.floor((Date.now() - backendStart) / 1000));
      }
    }
  }, [slotAppointments, sessionStarted, backendCurrentToken, activeFilter]);

  // Listen to cross-view custom event dispatched by FD queue
  useEffect(()=>{
    const handler = (e) => {
      const { slotId, started } = e.detail || {};
      if(!slotId || slotId !== selectedSlotId) return;
      if(started){
        if(!sessionStarted){ setSessionStarted(true); setQueuePaused(false); }
      } else {
        if(sessionStarted){ setSessionStarted(false); setRunStartAt(null); setBaseElapsed(0); setElapsed(0); }
      }
    };
    window.addEventListener('slot-session-status', handler);
    return ()=> window.removeEventListener('slot-session-status', handler);
  },[selectedSlotId, sessionStarted]);

  // Poll appointments every 15s
  useEffect(()=>{ if(!selectedSlotId) return; const id=setInterval(()=>{ loadAppointmentsForSelectedSlot(); },15000); return ()=> clearInterval(id); },[selectedSlotId, loadAppointmentsForSelectedSlot]);

  // Auto-start first patient session when slot session active.
  // Guard conditions ensure: slot session started, timer not already running, there is at least one checked-in patient (queueData.length > 0), and a slot is selected.
  // This prevents triggering when no patients are checked in (doctor should only see checked-in list).
  useEffect(()=>{
    if(sessionStarted && !runStartAt && queueData.length > 0 && selectedSlotId){
      const first = queueData[0];
      if(first?.token != null){
        startPatientSessionEta(selectedSlotId, first.token)
          .then(()=>{ setRunStartAt(Date.now()); })
          .catch(e=> console.error('Auto patient start failed', e?.response?.data || e.message));
      }
    }
  },[sessionStarted, runStartAt, queueData, selectedSlotId]);

  const handleToggleSession = async () => {
    if(sessionStarted){ // end
      try { if(runStartAt && activePatient && selectedSlotId && activePatient.token!=null){ await endPatientSessionEta(selectedSlotId, activePatient.token); } } catch(e){ console.error('End patient ETA failed', e?.response?.data || e.message); }
      try { if(selectedSlotId){ await endSlotEta(selectedSlotId); } } catch(e){ console.error('End slot ETA failed', e?.response?.data || e.message); }
      setSessionStarted(false); setQueuePaused(false); setRunStartAt(null); setBaseElapsed(0); setElapsed(0); wasRunningOnPauseRef.current=false; setCurrentIndex(0); return;
    }
    if(!selectedSlotId){ setStartError('Select a slot first'); return; }
    setSlotStarting(true); setStartError(null); setSessionStarted(true); setQueuePaused(false); setRunStartAt(null); setBaseElapsed(0); setElapsed(0); wasRunningOnPauseRef.current=false; setCurrentIndex(0);
    try { await startSlotEta(selectedSlotId); } catch(e){ console.error('Start slot failed', e?.response?.data || e.message); setStartError('Failed to start'); setSessionStarted(false); } finally { setSlotStarting(false); }
  };

  const completeCurrentPatient = async () => { const active=activePatient; if(!active || !selectedSlotId) return; try { await endPatientSessionEta(selectedSlotId, active.token); } catch(e){ console.error('End patient ETA failed', e?.response?.data || e.message); } try { await loadAppointmentsForSelectedSlot(); } catch{} setRunStartAt(null); setBaseElapsed(0); setElapsed(0); wasRunningOnPauseRef.current=false; setCurrentIndex(0); };

  // Pause handling
  useEffect(()=>{ if(!queuePaused || !pauseEndsAt) return; const tick=()=>{ setPauseRemaining(Math.max(0, Math.floor((pauseEndsAt-Date.now())/1000))); }; tick(); pauseTickerRef.current=setInterval(tick,1000); return ()=>{ if(pauseTickerRef.current){ clearInterval(pauseTickerRef.current); pauseTickerRef.current=null; } }; },[queuePaused, pauseEndsAt]);
  const resumeQueue = async () => { if(!selectedSlotId) return; setResumeError(''); setResumeSubmitting(true); try { await resumeSlotEta(selectedSlotId); if(autoResumeTimerRef.current){ clearTimeout(autoResumeTimerRef.current); autoResumeTimerRef.current=null; } if(pauseTickerRef.current){ clearInterval(pauseTickerRef.current); pauseTickerRef.current=null; } setPauseEndsAt(null); setPauseRemaining(0); if(wasRunningOnPauseRef.current) setRunStartAt(Date.now()); setQueuePaused(false); } catch(e){ setResumeError(e?.response?.data?.message || e.message || 'Failed to resume'); } finally { setResumeSubmitting(false); } };

  const filters = ['Checked In','Engaged','No Show','Admitted','All'];
  const getFilterCount = (filter) => {
    if (filter === 'All') return queueData.length;
    if (filter === 'Checked In') return queueData.filter(appt => appt.status === 'Checked In').length;
    if (filter === 'Engaged') return queueData.filter(appt => appt.status === 'Engaged').length;
    if (filter === 'No Show') return queueData.filter(appt => appt.status === 'No Show').length;
    if (filter === 'Admitted') return queueData.filter(appt => appt.status === 'Admitted').length;
    return 0;
  };

  // Slot dropdown UI from slots
  const [slotOpen, setSlotOpen] = useState(false); const slotAnchorRef=useRef(null); const slotMenuRef=useRef(null); const [slotPos,setSlotPos]=useState({top:0,left:0,width:360});
  useEffect(()=>{ const onClick=e=>{ if(slotAnchorRef.current?.contains(e.target) || slotMenuRef.current?.contains(e.target)) return; setSlotOpen(false); }; const onKey=e=>{ if(e.key==='Escape') setSlotOpen(false); }; window.addEventListener('mousedown',onClick); window.addEventListener('keydown',onKey); return ()=>{ window.removeEventListener('mousedown',onClick); window.removeEventListener('keydown',onKey); }; },[]);

  return (
    <div className='h-screen overflow-hidden bg-gray-50'>
      <div className='sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-2 flex items-center'>
        <div className='relative mr-6' ref={slotAnchorRef}>
          <button type='button' className='flex items-center bg-white rounded-md border border-gray-200 shadow-sm px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50' onClick={e=>{ setSlotOpen(v=>!v); const r=e.currentTarget.getBoundingClientRect(); const width=360; const left=Math.max(8, Math.min(r.left, window.innerWidth-width-8)); const top=Math.min(r.bottom+8, window.innerHeight-8-4); setSlotPos({top,left,width}); }}>
            <span className='font-medium mr-1'>{slots.find(s=> s.id===selectedSlotId)?.slotLabel || 'Select Slot'}</span>
            <span className='text-gray-500'>{slots.find(s=> s.id===selectedSlotId)?.timeRangeLabel || ''}</span>
            <ChevronDown className='ml-2 h-4 w-4 text-gray-500'/>
          </button>
          {slotOpen && createPortal(
            <div ref={slotMenuRef} className='fixed z-[9999]' style={{top:slotPos.top,left:slotPos.left,width:slotPos.width}}>
              <div className='bg-white rounded-xl border border-gray-200 shadow-xl max-h-[60vh] overflow-y-auto'>
                <ul className='py-1'>
                  {slotsLoading && <li className='px-4 py-3 text-sm text-gray-500'>Loading slots…</li>}
                  {!slotsLoading && !slots.length && <li className='px-4 py-3 text-sm text-gray-500'>No slots</li>}
                  {slots.map((s,idx)=>(
                    <li key={s.id}>
                      <button type='button' onClick={()=>{ selectSlot(s.id); setSlotOpen(false); }} className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-blue-50 ${selectedSlotId===s.id?'bg-blue-50':''}`}> 
                        <span className='flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 border border-blue-200 text-blue-600'>
                          {idx%4===0 && <Sunrise className='w-4 h-4'/>}
                          {idx%4===1 && <Sun className='w-4 h-4'/>}
                          {idx%4===2 && <Sunset className='w-4 h-4'/>}
                          {idx%4===3 && <Moon className='w-4 h-4'/>}
                        </span>
                        <span className='flex-1'>
                          <span className='block text-[14px] font-semibold text-gray-900'>{s.slotLabel}</span>
                          <span className='block text-[13px] text-gray-600'>{s.timeRangeLabel || ''}</span>
                        </span>
                        <span className='text-xs text-gray-500'>{s.totalTokenCount ?? ''}</span>
                      </button>
                      {idx < slots.length-1 && <div className='h-px bg-gray-200 mx-4'/>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>, document.body)}
        </div>
        <div className='flex-1 flex justify-center'><QueueDatePicker date={currentDate} onChange={setCurrentDate} /></div>
        <div className='ml-auto'>
          <Badge size='large' type='solid' color='blue' hover className='cursor-pointer select-none' onClick={()=>{}}>
            Walk-in Appointment
          </Badge>
        </div>
      </div>

      <div className='px-0 pt-0 pb-2 h-[calc(100vh-100px)] flex flex-col overflow-hidden'>
        {sessionStarted && (
          <div>
            <div className={`w-full h-[38px] flex items-center relative px-0 rounded-none ${queuePaused? 'bg-[#FFF4E5]':'bg-[#22C55E]'}`}>
              <div className='flex-1 flex items-center justify-center gap-3'>
                <span className={`${queuePaused? 'text-[#92400E]':'text-white'} font-medium text-[16px]`}>Current Token Number</span>
                <span className={`inline-flex items-center gap-2 font-bold text-[18px] ${queuePaused? 'text-[#92400E]':'text-white'}`}>
                  <span className={`inline-block w-3 h-3 rounded-full ${queuePaused? 'bg-[#FDBA74] border border-[#FDBA74]':'bg-[#D1FADF] border border-[#A7F3D0]'}`}></span>
                  {String(activePatient?.token ?? 0).padStart(2,'0')}
                </span>
                {queuePaused && (
                  <span className='inline-flex items-center gap-2 text-[13px] font-medium text-[#92400E] bg-[#FED7AA] px-2 py-0.5 rounded'>
                    <span className='inline-block w-2 h-2 rounded-full bg-[#F97316]' />
                    Paused ({String(Math.floor(pauseRemaining/60)).padStart(2,'0')}:{String(pauseRemaining%60).padStart(2,'0')})
                  </span>
                )}
              </div>
              {!queuePaused ? (
                <button onClick={()=>{ setPauseMinutes(null); setShowPauseModal(true); }} className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 border border-red-200 bg-white text-red-600 text-xs font-semibold px-2 py-1 rounded transition hover:bg-red-50'>Pause Queue</button>
              ) : (
                <div className='absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end'>
                  <button onClick={resumeQueue} disabled={resumeSubmitting} className={`flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded border border-blue-600 hover:bg-blue-700 ${resumeSubmitting? 'opacity-70 cursor-not-allowed':''}`}>{resumeSubmitting? 'Resuming…':'Restart Queue'}</button>
                  {resumeError && <span className='mt-1 text-[11px] text-red-600'>{resumeError}</span>}
                </div>
              )}
            </div>
          </div>
        )}

        <div className='p-2 flex flex-col flex-1 min-h-0'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-[#424242] font-medium'>Overview</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
              <OverviewStatCard title='All Appointments' value={queueData.length} />
              <OverviewStatCard title='Checked In' value={queueData.length} />
              <OverviewStatCard title='Engaged' value={runStartAt? 1:0} />
              <OverviewStatCard title='No Show/Cancelled' value={0} />
            </div>
          </div>

          {sessionStarted && activePatient && (
            <div className='mb-2 p-2'>
              <h3 className='text-gray-800 font-semibold mb-2'>Active Patient</h3>
              <div id='active-patient-card' className='bg-white rounded-lg border border-blue-200 px-4 py-3 flex items-center justify-between text-sm active-card-enter'>
                <div className='flex items-center gap-4 min-w-0'>
                  <AvatarCircle name={activePatient.patientName} size='s' />
                  <div className='flex items-center gap-4 min-w-0'>
                    <div className='min-w-0'>
                      <div className='flex items-center gap-1'>
                        <span className='font-semibold text-gray-900 truncate max-w-[160px]'>{activePatient.patientName}</span>
                        <span className='text-gray-400 text-xs leading-none'>↗</span>
                      </div>
                      <div className='text-[11px] text-gray-500 mt-0.5'>{activePatient.gender} | {activePatient.age}</div>
                    </div>
                    <div className='h-10 w-px bg-gray-200' />
                    <div>
                      <div className='flex items-center gap-2 shrink-0'>
                        <span className='text-gray-500'>Token Number</span>
                        <span className='inline-flex items-center justify-center w-5 h-5 rounded border border-blue-300 bg-blue-50 text-[11px] font-medium text-blue-700'>{activePatient.token}</span>
                      </div>
                      <div className='flex items-center gap-1 text-gray-500'>
                        <span>Reason :</span>
                        <span className='font-xs whitespace-nowrap text-gray-700'>{activePatient.reasonForVisit}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-3 shrink-0 pl-4'>
                  <div className='inline-flex items-center gap-1 rounded-md border border-green-200 bg-green-50 px-2 py-1 text-[12px] font-medium text-green-700'>
                    <span className='inline-block w-2 h-2 rounded-full bg-green-500' />
                    {formatTime(elapsed)}
                  </div>
                  {runStartAt ? (
                    <button onClick={completeCurrentPatient} className='inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'>End Session</button>
                  ) : (
                    <button onClick={()=> setRunStartAt(Date.now())} className='inline-flex items-center rounded-md border border-blue-300 bg-blue-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-blue-700 transition-colors'>Start Session</button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className='flex items-center justify-between px-1 py-3'>
            <div className='flex gap-3'>
              {filters.map(f => (
                <button key={f} onClick={()=> setActiveFilter(f)} className={`px-[6px] py-1 rounded-lg font-medium text-sm transition-colors ${activeFilter===f? 'bg-white text-blue-600 shadow-sm':'text-gray-600 hover:text-gray-800'}`}>{f} <span className='ml-1 text-xs'>{getFilterCount(f)}</span></button>
              ))}
            </div>
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-2'>
                <span className='text-gray-700 text-sm'>Start Session</span>
                <Toggle checked={sessionStarted} disabled={slotStarting} onChange={handleToggleSession} />
                {slotStarting && <span className='text-xs text-blue-600 animate-pulse'>Starting…</span>}
                {startError && !slotStarting && !sessionStarted && <span className='text-xs text-red-600'>{startError}</span>}
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-gray-600 text-sm'>Tokens</span>
                <Badge size='small' type='ghost' color='green' hover>{queueData.length}</Badge>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-col gap-3 flex-1 min-h-0 overflow-hidden'>
            <div className='flex-1 min-w-0 min-h-0 overflow-hidden flex flex-col'>
              {queueData.length ? (
                <QueueTable hideCheckIn={true} prescreeningEnabled={false} allowSampleFallback={false} items={queueData} removingToken={null} incomingToken={null} checkedInToken={null} checkedInTokens={new Set()} onCheckIn={()=>{}} onRevokeCheckIn={()=>{}} onMarkNoShow={()=>{}} />
              ) : (
                <div className='flex-1 flex items-center justify-center p-6'>
                  <div className='text-center'>
                    <div className='text-[15px] font-semibold text-gray-800 mb-1'>No patients checked in yet</div>
                    <div className='text-[12px] text-gray-500'>Once Front Desk checks in patients they will appear here automatically.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPauseModal && createPortal(
        <div className='fixed inset-0 z-[10000] flex items-center justify-center'>
          <div className='absolute inset-0 bg-black/40' onClick={()=> setShowPauseModal(false)} />
            <div className='relative bg-white rounded-xl shadow-2xl border border-gray-200 w-[420px] max-w-[90vw] p-4'>
              <div className='flex items-center justify-center mb-2'>
                <div className='w-10 h-10 rounded-full border-2 border-red-300 flex items-center justify-center text-red-500'>⏸</div>
              </div>
              <h3 className='text-center text-[16px] font-semibold text-gray-900'>Set Pause Duration</h3>
              <p className='text-center text-[12px] text-gray-600 mt-1'>Select duration to pause your queue. It will resume automatically.</p>
              <div className='grid grid-cols-3 gap-2 mt-3'>
                {[5,10,15,20,30,45,60].map(min => (
                  <button key={min} onClick={()=> setPauseMinutes(min)} className={`px-3 py-2 rounded-md text-sm border ${pauseMinutes===min? 'bg-blue-600 text-white border-blue-600':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>{min} min</button>
                ))}
              </div>
              <div className='flex items-center gap-2 mt-4'>
                <button className='flex-1 px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50' onClick={()=> setShowPauseModal(false)}>Cancel</button>
                <button disabled={!pauseMinutes || pauseSubmitting || !selectedSlotId} className={`flex-1 px-3 py-2 rounded-md text-sm ${pauseMinutes && !pauseSubmitting && selectedSlotId? 'bg-gray-900 text-white hover:bg-black':'bg-gray-200 text-gray-500 cursor-not-allowed'}`} onClick={()=>{
                  if(!pauseMinutes || !selectedSlotId) return; setPauseError(''); setPauseSubmitting(true);
                  (async()=>{
                    try {
                      const resp = await pauseSlotEta(selectedSlotId, pauseMinutes);
                      const serverEnds = resp?.data?.pauseEndsAt || resp?.pauseEndsAt || null;
                      const wasRunning = !!runStartAt;
                      if(wasRunning){ const delta=Math.floor((Date.now()-runStartAt)/1000); setBaseElapsed(b=> b+Math.max(0,delta)); setRunStartAt(null); }
                      wasRunningOnPauseRef.current=wasRunning; setQueuePaused(true); setShowPauseModal(false);
                      const ends = serverEnds? new Date(serverEnds).getTime(): Date.now()+pauseMinutes*60*1000;
                      setPauseEndsAt(ends); setPauseRemaining(Math.max(0, Math.floor((ends-Date.now())/1000)));
                      if(autoResumeTimerRef.current) clearTimeout(autoResumeTimerRef.current);
                      autoResumeTimerRef.current=setTimeout(()=>{ if(wasRunningOnPauseRef.current) setRunStartAt(Date.now()); setQueuePaused(false); if(pauseTickerRef.current){ clearInterval(pauseTickerRef.current); pauseTickerRef.current=null; } setPauseEndsAt(null); setPauseRemaining(0); autoResumeTimerRef.current=null; }, pauseMinutes*60*1000);
                    } catch(e){
                      const msg = e?.response?.data?.message || e.message || '';
                      // If backend requires ending current patient first, do it automatically then retry pause
                      if (msg.includes('Cannot pause session while a patient is currently being served')){
                        try {
                          if(selectedSlotId && activePatient?.token != null){ await endPatientSessionEta(selectedSlotId, activePatient.token); await loadAppointmentsForSelectedSlot(); }
                          const resp2 = await pauseSlotEta(selectedSlotId, pauseMinutes);
                          const serverEnds = resp2?.data?.pauseEndsAt || resp2?.pauseEndsAt || null;
                          const wasRunning = !!runStartAt;
                          if(wasRunning){ const delta=Math.floor((Date.now()-runStartAt)/1000); setBaseElapsed(b=> b+Math.max(0,delta)); setRunStartAt(null); }
                          wasRunningOnPauseRef.current=wasRunning; setQueuePaused(true); setShowPauseModal(false);
                          const ends = serverEnds? new Date(serverEnds).getTime(): Date.now()+pauseMinutes*60*1000;
                          setPauseEndsAt(ends); setPauseRemaining(Math.max(0, Math.floor((ends-Date.now())/1000)));
                          if(autoResumeTimerRef.current) clearTimeout(autoResumeTimerRef.current);
                          autoResumeTimerRef.current=setTimeout(()=>{ if(wasRunningOnPauseRef.current) setRunStartAt(Date.now()); setQueuePaused(false); if(pauseTickerRef.current){ clearInterval(pauseTickerRef.current); pauseTickerRef.current=null; } setPauseEndsAt(null); setPauseRemaining(0); autoResumeTimerRef.current=null; }, pauseMinutes*60*1000);
                        } catch(e2){ setPauseError(e2?.response?.data?.message || e2.message || 'Failed to pause'); }
                      } else {
                        setPauseError(msg || 'Failed to pause');
                      }
                    } finally { setPauseSubmitting(false); }
                  })();
                }}>{pauseSubmitting? 'Pausing…':'Confirm'}</button>
              </div>
              <div className='mt-2 text-[11px] text-gray-500 flex items-center'><span className='inline-block w-4 h-4 mr-1 text-gray-400'>ℹ️</span>Queue will automatically resume after selected time.</div>
              {pauseError && <div className='mt-2 text-[12px] text-red-600 text-center'>{pauseError}</div>}
            </div>
        </div>, document.body)}
    </div>
  );
};

export default Queue;

