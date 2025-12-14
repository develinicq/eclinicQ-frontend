import { Search } from 'lucide-react'
import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bell, hospitalIcon, stethoscopeBlue } from '../../../public/index.js'
import useAuthStore from '../../store/useAuthStore'
import AvatarCircle from '../../components/AvatarCircle'
import { getDoctorMe } from '../../services/authService'
import { Mail, Phone, IdCard, User, Edit, HelpCircle, LogOut, ChevronRight, ChevronDown, UserPlus, Users, GitBranch, CalendarPlus } from 'lucide-react'
import NotificationDrawer from '../../components/NotificationDrawer.jsx'
import AddPatientDrawer from '../../components/PatientList/AddPatientDrawer.jsx'
import BookAppointmentDrawer from '../../components/Appointment/BookAppointmentDrawer.jsx'

const Partition = () => {
  return (
    <div className='w-[8.5px] h-[20px] flex gap-[10px] items-center justify-center'>
        <div className='w-[0.5px] h-full bg-[#B8B8B8]'>
        </div>
    </div>
  )
}

const DocNavbar = ({ moduleSwitcher }) => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  // default switcher state if none provided
  const [activeModule, setActiveModule] = useState('doctor');
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('hospital')) setActiveModule('hospital');
    else setActiveModule('doctor');
  }, []);

  const switchToHospital = () => { setActiveModule('hospital'); navigate('/hospital'); };
  const switchToDoctor = () => { setActiveModule('doctor'); navigate('/doc'); };
  const { doctorDetails, doctorLoading, doctorError, fetchDoctorDetails, _doctorFetchPromise } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const addMenuRef = useRef(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [addPatientOpen, setAddPatientOpen] = useState(false);
  const [bookApptOpen, setBookApptOpen] = useState(false);

  // Focus search when pressing Ctrl+/
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close on outside click / Escape
  useEffect(()=>{
    const onClick = (e)=>{
      if(profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
      if(addMenuRef.current && !addMenuRef.current.contains(e.target)) setShowAddMenu(false);
    };
    const onKey = (e)=>{ if(e.key==='Escape') { setShowProfile(false); setShowAddMenu(false); } };
    document.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return ()=>{ document.removeEventListener('mousedown', onClick); window.removeEventListener('keydown', onKey); };
  },[]);

  // Ensure doctor details are loaded even if user hit /doc directly (bypassing SignIn component fetch)
  useEffect(()=>{
    if(!doctorDetails && !doctorLoading && !_doctorFetchPromise){
      fetchDoctorDetails?.(getDoctorMe);
    }
  },[doctorDetails, doctorLoading, fetchDoctorDetails, _doctorFetchPromise]);

  return (
    <div className='w-full h-12 border-b-[0.5px] border-[#D6D6D6] flex items-center px-4 gap-3'>
      {/* Left: Title */}
      <div className='shrink-0'>
        <span className='text-sm text-[#424242]'>Dashboard</span>
      </div>

      {/* Center: Search (right-aligned, fixed width) */}
      <div className='ml-auto'>
        <div className='relative w-[360px] max-w-[60vw]'>
          <Search className='absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#959595]' />
          <input
            ref={searchRef}
            type='text'
            placeholder='Search Patients'
            className='w-full h-8 rounded border border-[#E3E3E3] bg-[#F9F9F9] pl-8 pr-16 text-sm text-[#424242] placeholder:text-[#959595] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2372EC]'
          />
          <div className='absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-[#6B7280] border border-[#E5E7EB] rounded px-1 py-0.5 bg-white'>
            Ctrl+/
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className='flex items-center gap-2'>
        {/* Optional Hospital/Doctor module switcher injected by Hospital header */}
        {(moduleSwitcher || true) && (
          <>
            {moduleSwitcher ? (
              moduleSwitcher
            ) : (
              <div className='flex items-center gap-1'>
                <button
                  type='button'
                  onClick={switchToHospital}
                  className={`flex items-center justify-center h-8 w-8 rounded-[6px] border ${activeModule==='hospital' ? 'bg-[#2372EC] border-[#2372EC]' : 'bg-white border-[#D6D6D6]'} hover:bg-blue-50 transition-colors`}
                  aria-label='Hospital Module'
                  title='Hospital'
                >
                  <img src={hospitalIcon} alt='Hospital' className='w-4 h-4' />
                </button>
                <button
                  type='button'
                  onClick={switchToDoctor}
                  className={`flex items-center justify-center h-8 w-8 rounded-[6px] border ${activeModule==='doctor' ? 'bg-[#2372EC] border-[#2372EC]' : 'bg-white border-[#D6D6D6]'} hover:bg-blue-50 transition-colors`}
                  aria-label='Doctor Module'
                  title='Doctor'
                >
                  <img src={stethoscopeBlue} alt='Doctor' className='w-4 h-4' />
                </button>
              </div>
            )}
            <Partition />
          </>
        )}
        {/* Add New dropdown */}
        <div className='relative' ref={addMenuRef}>
          <button
            type='button'
            onClick={() => setShowAddMenu(v=>!v)}
            className='inline-flex items-center bg-[#2372EC] text-white px-3 h-8 rounded-[6px] gap-2 hover:bg-[#1f62c9] transition-colors shadow-sm'
            aria-haspopup='true'
            aria-expanded={showAddMenu}
          >
            <span className='text-sm font-medium'>Add New</span>
            <ChevronDown className={`w-4 h-4 text-white transition-transform ${showAddMenu ? 'rotate-180' : ''}`} />
          </button>
          {showAddMenu && (
            <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50'>
              <button
                onClick={() => { setShowAddMenu(false); setAddPatientOpen(true); }}
                className='w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50'
              >
                <UserPlus className='w-4 h-4 text-[#597DC3]' />
                <span>Patient</span>
              </button>
              <button
                onClick={() => { setShowAddMenu(false); }}
                className='w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50'
              >
                <Users className='w-4 h-4 text-[#597DC3]' />
                <span>Staff</span>
              </button>
              <button
                onClick={() => { setShowAddMenu(false); }}
                className='w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50'
              >
                <GitBranch className='w-4 h-4 text-[#597DC3]' />
                <span>Branch</span>
              </button>
              <button
                onClick={() => { setShowAddMenu(false); setBookApptOpen(true); }}
                className='w-full flex items-center justify-between px-3 py-2 text-sm text-gray-800 hover:bg-gray-50'
              >
                <span className='inline-flex items-center gap-2'>
                  <CalendarPlus className='w-4 h-4 text-[#597DC3]' />
                  Appointment
                </span>
                <ChevronRight className='w-4 h-4 text-gray-400' />
              </button>
            </div>
          )}
        </div>

  {/* Walk-In Appointment button removed as requested */}

        <Partition />

        <div className='w-7 h-7 p-1 relative'>
          <div className='absolute -top-1 -right-1 flex items-center justify-center rounded-full w-[14px] h-[14px] bg-[#F04248]'>
            <span className='font-medium text-[10px] text-white'>8</span>
          </div>
          <button onClick={()=>setShowNotifications(true)} style={{background:'none',border:'none',padding:0}}>
            <img src={bell} alt='Notifications' className='w-5 h-5' />
          </button>
        </div>

        <Partition />

        <div className='relative flex items-center gap-2' ref={profileRef}>
          <span className='font-semibold text-base text-[#424242]'>
            { doctorLoading ? 'Loading…' : doctorError ? 'Error' : (doctorDetails?.name?.split(' ')?.[0] || '—') }
          </span>
          <button type='button' onClick={()=>setShowProfile(v=>!v)} className='cursor-pointer'>
            <AvatarCircle name={doctorLoading ? '?' : (doctorDetails?.name || (doctorError ? '!' : '?'))} size='s' color={doctorError ? 'grey' : 'orange'} />
          </button>
          {showProfile && (
            <div className='absolute top-10 right-0 w-72 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50'>
              <div className='p-4 flex items-start gap-3'>
                <AvatarCircle name={doctorLoading ? '?' : (doctorDetails?.name || (doctorError ? '!' : '?'))} size='md' color={doctorError ? 'grey' : 'orange'} />
                <div className='flex flex-col'>
                  <div className='text-sm font-semibold text-gray-900'>
                    { doctorLoading ? 'Loading…' : doctorError ? 'Failed to load profile' : (doctorDetails?.name || '—') }
                  </div>
                  <div className='text-xs text-gray-600'>
                    { doctorLoading ? 'Please wait' : doctorError ? (doctorError || 'Error fetching doctor') : (doctorDetails?.specializations?.[0] || 'Specialist') }
                  </div>
                </div>
              </div>
              {!doctorError && (
              <div className='px-4 pb-3 space-y-2 text-xs'>
                <div className='flex items-center gap-2 text-gray-700'>
                  <Mail className='w-4 h-4 text-[#597DC3]' />
                  <span className='truncate'>{doctorDetails?.emailId || '—'}</span>
                </div>
                <div className='flex items-center gap-2 text-gray-700'>
                  <Phone className='w-4 h-4 text-[#597DC3]' />
                  <span>{doctorDetails?.contactNumber || '—'}</span>
                </div>
                <div className='flex items-center gap-2 text-gray-700'>
                  <IdCard className='w-4 h-4 text-[#597DC3]' />
                  <span>{doctorDetails?.doctorCode || doctorDetails?.userId?.slice(0,8)+'…' || '—'}</span>
                </div>
                <div className='flex items-center gap-2 text-gray-700'>
                  <User className='w-4 h-4 text-[#597DC3]' />
                  <span>{doctorDetails?.associatedWorkplaces?.clinic?.name || doctorDetails?.associatedWorkplaces?.hospitals?.[0]?.name || '—'}</span>
                </div>
              </div>
              )}
              {doctorError && !doctorLoading && (
                <div className='px-4 pb-3 text-xs text-red-600 space-y-2'>
                  <div className='font-medium'>Profile load failed.</div>
                  <div className='text-red-500'>{doctorError}</div>
                  <button
                    onClick={()=>fetchDoctorDetails?.(getDoctorMe,{ force: true })}
                    className='h-8 px-3 rounded bg-red-50 border border-red-300 text-red-700 text-xs hover:bg-red-100'
                  >Retry</button>
                </div>
              )}
              <div className='border-t border-gray-200 divide-y text-sm'>
                <button className='w-full flex items-center justify-between px-4 h-10 hover:bg-gray-50 text-gray-700'>
                  <span className='flex items-center gap-2 text-[13px]'><Edit className='w-4 h-4 text-gray-500' /> Edit Profile</span>
                  <ChevronRight className='w-4 h-4 text-gray-400' />
                </button>
                <button className='w-full flex items-center justify-between px-4 h-10 hover:bg-gray-50 text-gray-700'>
                  <span className='flex items-center gap-2 text-[13px]'><HelpCircle className='w-4 h-4 text-gray-500' /> Help Center</span>
                  <ChevronRight className='w-4 h-4 text-gray-400' />
                </button>
                <button className='w-full flex items-center justify-between px-4 h-10 hover:bg-gray-50 text-gray-700'>
                  <span className='flex items-center gap-2 text-[13px]'><LogOut className='w-4 h-4 text-gray-500' /> Logout</span>
                  <ChevronRight className='w-4 h-4 text-gray-400' />
                </button>
              </div>
              {doctorLoading && <div className='absolute inset-0 bg-white/60 flex items-center justify-center text-xs text-gray-500'>Loading…</div>}
            </div>
          )}
        </div>
  </div>
  <NotificationDrawer show={showNotifications} onClose={()=>setShowNotifications(false)} />
  <AddPatientDrawer open={addPatientOpen} onClose={()=>setAddPatientOpen(false)} onSave={()=>setAddPatientOpen(false)} />
  <BookAppointmentDrawer open={bookApptOpen} onClose={()=>setBookApptOpen(false)} />
  </div>
  )
}

export default DocNavbar
