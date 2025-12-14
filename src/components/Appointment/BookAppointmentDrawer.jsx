import React, { useEffect, useRef, useState } from 'react'
import { Calendar, X, Sunrise, Sun, Sunset, Moon } from 'lucide-react'
import { createPortal } from 'react-dom'

// UI-only Book Appointment Drawer (no API calls). Derived from Doctor Queue drawer UI.
export default function BookAppointmentDrawer({ open, onClose, onSave }) {
  const [isExisting, setIsExisting] = useState(false)
  const [apptType, setApptType] = useState('New Consultation')
  const [reason, setReason] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const dobRef = useRef(null)
  const [apptDate, setApptDate] = useState(() => new Date().toISOString().slice(0, 10))
  const apptDateRef = useRef(null)
  const suggestions = ['New Consultation', 'Follow-up Consultation', 'Review Visit']
  const reasonSuggestions = ['Cough', 'Cold', 'Headache', 'Nausea']
  const genders = ['Male', 'Female', 'Other']
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  // UI-only time buckets; in real integration, fill from slots API
  const [timeBuckets, setTimeBuckets] = useState([
    { key: 'morning', label: 'Morning', time: '8:00 AM - 11:30 AM', Icon: Sunrise },
    { key: 'afternoon', label: 'Afternoon', time: '12:00 PM - 3:30 PM', Icon: Sun },
    { key: 'evening', label: 'Evening', time: '4:00 PM - 7:00 PM', Icon: Sunset },
    { key: 'night', label: 'Night', time: '7:30 PM - 9:00 PM', Icon: Moon },
  ])
  const [bucketKey, setBucketKey] = useState('morning')
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && requestClose()
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  const requestClose = () => { setClosing(true); setTimeout(() => { setClosing(false); onClose?.() }, 220) }
  if (!open && !closing) return null

  const canSave = () => {
    if (isExisting) return mobile.trim().length >= 3
    return firstName && lastName && dob && gender && bloodGroup && mobile
  }

  const save = () => {
    const payload = isExisting
      ? { method: 'EXISTING', mobile, apptType, reason, apptDate, slotBucket: bucketKey }
      : { method: 'NEW', firstName, lastName, dob, gender, bloodGroup, mobile, email, apptType, reason, apptDate, slotBucket: bucketKey }
    onSave ? onSave(payload) : onClose?.()
  }

  const drawer = (
    <div className="fixed inset-0 z-[5000]">
      <style>{`
        @keyframes drawerIn { from { transform: translateX(100%); opacity: 0.6; } to { transform: translateX(0%); opacity: 1; } }
        @keyframes drawerOut { from { transform: translateX(0%); opacity: 1; } to { transform: translateX(100%); opacity: 0.6; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: .3; } }
        @keyframes fadeOut { from { opacity: .3; } to { opacity: 0; } }
      `}</style>
      <div className={`absolute inset-0 bg-black/40 ${closing ? 'animate-[fadeOut_.2s_ease-in_forwards]' : 'animate-[fadeIn_.25s_ease-out_forwards]'}`} onClick={requestClose} style={{ zIndex: 5001 }} />
      <aside className={`absolute top-4 right-4 bottom-4 w-[520px] bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden ${closing ? 'animate-[drawerOut_.22s_ease-in_forwards]' : 'animate-[drawerIn_.25s_ease-out_forwards]'}`} role="dialog" aria-modal="true" style={{ zIndex: 5002 }}>
        <div className="p-4 flex flex-col h-full bg-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[18px] font-semibold">Book Appointment</h2>
            <div className="flex items-center gap-2">
              <button onClick={save} disabled={!canSave()} className={`text-sm font-medium rounded px-3 py-1.5 border ${canSave() ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'}`}>Book</button>
              <button className="text-gray-500 hover:text-gray-700" onClick={requestClose}><X className="w-5 h-5"/></button>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-2 mb-4">
            <label className="inline-flex items-center gap-2 text-sm"><input type="radio" name="pt" checked={isExisting} onChange={()=>setIsExisting(true)} /> Existing Patients</label>
            <label className="inline-flex items-center gap-2 text-sm"><input type="radio" name="pt" checked={!isExisting} onChange={()=>setIsExisting(false)} /> New Patient</label>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto pr-1">
            {isExisting ? (
              <div className='mb-3'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Patient <span className='text-red-500'>*</span></label>
                <input type='text' value={mobile} onChange={e=>setMobile(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Search Patient by name, Abha id, Patient ID or Contact Number' />
              </div>
            ) : (
              <>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>First Name <span className='text-red-500'>*</span></label>
                    <input value={firstName} onChange={e=>setFirstName(e.target.value)} type='text' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Enter First Name' />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name <span className='text-red-500'>*</span></label>
                    <input value={lastName} onChange={e=>setLastName(e.target.value)} type='text' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Enter Last Name' />
                  </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Date of Birth <span className='text-red-500'>*</span></label>
                    <div className='relative'>
                      <input ref={dobRef} value={dob} onChange={e=>setDob(e.target.value)} type='date' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm pr-8 focus:outline-none focus:border-blue-500' />
                      <button type='button' onClick={()=> (dobRef.current?.showPicker ? dobRef.current.showPicker() : dobRef.current?.focus())} className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500'><Calendar className='w-4 h-4'/></button>
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Gender <span className='text-red-500'>*</span></label>
                    <select value={gender} onChange={e=>setGender(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500'>
                      <option value='' disabled>Select Gender</option>
                      {genders.map(g=> <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Blood Group <span className='text-red-500'>*</span></label>
                    <select value={bloodGroup} onChange={e=>setBloodGroup(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500'>
                      <option value='' disabled>Select Blood Group</option>
                      {bloodGroups.map(bg=> <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Mobile Number <span className='text-red-500'>*</span></label>
                    <input value={mobile} onChange={e=>setMobile(e.target.value)} type='tel' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Enter Mobile Number' />
                  </div>
                </div>
                <div className='mt-3'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Email ID</label>
                  <input value={email} onChange={e=>setEmail(e.target.value)} type='email' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Enter Email' />
                </div>
              </>
            )}

            <div className='mb-3 mt-3'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Appointment Type <span className='text-red-500'>*</span></label>
              <select value={apptType} onChange={e=>setApptType(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500'>
                {suggestions.map(s=> <option key={s} value={s}>{s}</option>)}
              </select>
              <div className='mt-2 flex flex-wrap gap-2 text-xs'>{suggestions.map(s=> <button key={s} type='button' className='px-2 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50' onClick={()=> setApptType(s)}>{s}</button>)}</div>
            </div>
            <div className='mb-3'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Reason for Visit <span className='text-red-500'>*</span></label>
              <input value={reason} onChange={e=>setReason(e.target.value)} type='text' className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' placeholder='Enter Reason for Visit' />
              <div className='mt-2 flex flex-wrap gap-2 text-xs'>{reasonSuggestions.map(s=> <button key={s} type='button' className='px-2 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50' onClick={()=> setReason(s)}>{s}</button>)}</div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Appointment Date <span className='text-red-500'>*</span></label>
                <div className='relative'>
                  <input ref={apptDateRef} type='date' value={apptDate} onChange={e=>setApptDate(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm pr-8 focus:outline-none focus:border-blue-500' />
                  <button type='button' onClick={()=> (apptDateRef.current?.showPicker ? apptDateRef.current.showPicker() : apptDateRef.current?.focus())} className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500'><Calendar className='w-4 h-4'/></button>
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Available Slot <span className='text-red-500'>*</span></label>
                <select className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500' value={bucketKey} onChange={e=> setBucketKey(e.target.value)}>
                  {timeBuckets.map(t=> <option key={t.key} value={t.key}>{t.label} ({t.time})</option>)}
                </select>
                <div className='mt-1 text-xs text-gray-500'>Tokens info will appear here in the integrated version.</div>
              </div>
            </div>
          </div>

          <div className='pt-3 mt-2 border-t border-gray-200 bg-white'>
            <div className='flex justify-end gap-3'>
              <button className='px-4 py-2 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50' onClick={requestClose}>Cancel</button>
              <button disabled={!canSave()} onClick={save} className={`px-4 py-2 rounded text-sm ${canSave()? 'bg-blue-600 text-white hover:bg-blue-700':'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>Book Appointment</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )

  return createPortal(drawer, document.body)
}
