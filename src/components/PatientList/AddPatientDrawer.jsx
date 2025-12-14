import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// Local animation keyframes for smooth drawer transitions
const DrawerKeyframes = () => (
  <style>{`
    @keyframes drawerIn { from { transform: translateX(100%); opacity: 0.6; } to { transform: translateX(0%); opacity: 1; } }
    @keyframes drawerOut { from { transform: translateX(0%); opacity: 1; } to { transform: translateX(100%); opacity: 0.6; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: .3; } }
    @keyframes fadeOut { from { opacity: .3; } to { opacity: 0; } }
  `}</style>
)

export default function AddPatientDrawer({ open, onClose, onSave }) {
  const [form, setForm] = useState({ firstName:'', lastName:'', dob:'', gender:'', bloodGroup:'', mobile:'', email:'' })
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && requestClose();
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  const set = (k,v)=> setForm((f)=>({ ...f, [k]: v }))

  const requestClose = () => { setClosing(true); setTimeout(()=>{ setClosing(false); onClose?.() }, 220) }
  if (!open && !closing) return null

  const canSave = form.firstName && form.lastName && form.dob && form.gender && form.bloodGroup && form.mobile

  const drawer = (
  <div className="fixed inset-0 z-[5000]">
      <DrawerKeyframes />
  {/* Backdrop with higher z-index to ensure it sits above any dashboards */}
  <div className={`absolute inset-0 bg-black/40 ${closing ? 'animate-[fadeOut_.2s_ease-in_forwards]' : 'animate-[fadeIn_.25s_ease-out_forwards]'}`} onClick={requestClose} style={{ zIndex: 5001 }} />
  {/* Drawer panel with top-most z-index */}
  <aside className={`absolute top-4 right-4 bottom-4 w-[520px] bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden ${closing ? 'animate-[drawerOut_.22s_ease-in_forwards]' : 'animate-[drawerIn_.25s_ease-out_forwards]'}`} role="dialog" aria-modal="true" style={{ zIndex: 5002 }}>
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="text-sm font-medium text-gray-900">Add New Patient</div>
          <div className="flex items-center gap-2">
            <button disabled={!canSave} onClick={()=> canSave && onSave?.(form)} className={`h-8 px-3 rounded text-sm ${canSave ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>Save</button>
            <button onClick={requestClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-48px)] bg-white">
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[12px] text-gray-700">First Name <span className="text-red-500">*</span></span>
              <input value={form.firstName} onChange={(e)=>set('firstName', e.target.value)} placeholder="Enter First Name" className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-sm outline-none bg-white" />
            </label>
            <label className="block">
              <span className="text-[12px] text-gray-700">Last Name <span className="text-red-500">*</span></span>
              <input value={form.lastName} onChange={(e)=>set('lastName', e.target.value)} placeholder="Enter Last Name" className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-sm outline-none bg-white" />
            </label>
            <label className="block">
              <span className="text-[12px] text-gray-700">Date of Birth <span className="text-red-500">*</span></span>
              <input type="date" value={form.dob} onChange={(e)=>set('dob', e.target.value)} className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-sm outline-none bg-white" />
            </label>
            <label className="block">
              <span className="text-[12px] text-gray-700">Gender <span className="text-red-500">*</span></span>
              <select value={form.gender} onChange={(e)=>set('gender', e.target.value)} className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-sm outline-none bg-white">
                <option value="" disabled>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
            <label className="block">
              <span className="text-[12px] text-gray-700">Blood Group <span className="text-red-500">*</span></span>
              <select value={form.bloodGroup} onChange={(e)=>set('bloodGroup', e.target.value)} className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-sm outline-none bg-white">
                <option value="" disabled>Select Blood Group</option>
                {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(bg => (<option key={bg}>{bg}</option>))}
              </select>
            </label>
            <label className="block">
              <span className="text-[12px] text-gray-700">Mobile Number <span className="text-red-500">*</span></span>
              <input value={form.mobile} onChange={(e)=>set('mobile', e.target.value)} placeholder="Enter Mobile Number" className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-sm outline-none bg-white" />
            </label>
            <label className="block col-span-2">
              <span className="text-[12px] text-gray-700">Email ID</span>
              <input type="email" value={form.email} onChange={(e)=>set('email', e.target.value)} placeholder="Enter Email" className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-sm outline-none bg-white" />
            </label>
          </div>
        </div>
      </aside>
    </div>
  )

  return createPortal(drawer, document.body)
}
