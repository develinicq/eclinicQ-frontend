import React, { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Pencil, Phone, Mail, MapPin, Upload, FileText, Trash2, ChevronDown, UserPlus, Eye, ShieldPlus, ClipboardList, Crown } from 'lucide-react'
import AvatarCircle from '../../../components/AvatarCircle'
import Badge from '../../../components/Badge'
import { hospital } from '../../../../public/index.js'
import Input from '../../../components/FormItems/Input'
import Toggle from '../../../components/FormItems/Toggle'
import TimeInput from '../../../components/FormItems/TimeInput'
import MapLocation from '../../../components/FormItems/MapLocation'

import useProfileStore from '../../../store/settings/useProfileStore.js';
import usePracticeStore from "../../../store/settings/usePracticeStore.js";
import useEducationStore from "../../../store/settings/useEducationStore.js";
import useExperienceStore from "../../../store/settings/useExperienceStore.js";
import useAwardsPublicationsStore from "../../../store/settings/useAwardsPublicationsStore.js";




// Global drawer animation keyframes (used by all drawers in this page)
const DrawerKeyframes = () => (
  <style>{`
    @keyframes drawerIn { from { transform: translateX(100%); opacity: 0.6; } to { transform: translateX(0%); opacity: 1; } }
    @keyframes drawerOut { from { transform: translateX(0%); opacity: 1; } to { transform: translateX(100%); opacity: 0.6; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: .3; } }
    @keyframes fadeOut { from { opacity: .3; } to { opacity: 0; } }
  `}</style>
)

// A light-weight field renderer
const InfoField = ({ label, value, right }) => (
  <div className="grid grid-cols-12 gap-2 text-[13px] leading-5">
    <div className="col-span-4 text-gray-500">{label}</div>
    <div className="col-span-8 text-gray-900 flex items-center gap-2">
      <span className="truncate">{value || '-'}</span>
      {right}
    </div>
  </div>
)

const SectionCard = ({ title, subtitle, action, children }) => (
  <div className="bg-white rounded-lg border border-gray-200">
    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
      <div className="text-sm">
        <div className="font-medium text-gray-900">{title}</div>
        {subtitle ? (
          <div className="text-[12px] text-gray-500">{subtitle}</div>
        ) : null}
      </div>
      {action}
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
)

// ======== Drawer: Edit Basic Info ========
const BasicInfoDrawer = ({ open, onClose, initial, onSave }) => {
  const [form, setForm] = useState(() => ({
    firstName: initial?.firstName || '',
    lastName: initial?.lastName || '',
    phone: initial?.phone || '',
    email: initial?.email || '',
    gender: initial?.gender || 'Male',
    city: initial?.city || '',
    website: initial?.website || '',
    headline: initial?.headline || '',
    about: initial?.about || '',
    languages: initial?.languages || [],
  }))
  const [headlineCount, setHeadlineCount] = useState(initial?.headline?.length || 0)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    setForm({
      firstName: initial?.firstName || '',
      lastName: initial?.lastName || '',
      phone: initial?.phone || '',
      email: initial?.email || '',
      gender: initial?.gender || 'Male',
      city: initial?.city || '',
      website: initial?.website || '',
      headline: initial?.headline || '',
      about: initial?.about || '',
      languages: initial?.languages || [],
    })
    setHeadlineCount(initial?.headline?.length || 0)
  }, [initial, open])

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [onClose])

  if (!open && !closing) return null

  const requestClose = () => {
    // Play exit animation before unmounting
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose?.()
    }, 220)
  }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const toggleLang = (lang) => {
    setForm((f) => {
      const has = f.languages?.includes(lang)
      const next = has ? f.languages.filter((l) => l !== lang) : [...(f.languages||[]), lang]
      return { ...f, languages: next }
    })
  }
  const canSave = form.firstName && form.lastName && form.phone && form.email

  return (
    <div className="fixed inset-0 z-50">
      <div className={`absolute inset-0 bg-black/30 ${closing ? 'animate-[fadeOut_.2s_ease-in_forwards]' : 'animate-[fadeIn_.25s_ease-out_forwards]'}`} onClick={requestClose} />
      <aside className={`absolute top-16 right-5 bottom-5 w-[600px] bg-white shadow-2xl border border-[#E6E6E6] rounded-xl overflow-hidden ${closing ? 'animate-[drawerOut_.22s_ease-in_forwards]' : 'animate-[drawerIn_.25s_ease-out_forwards]'}`} role="dialog" aria-modal="true">
        {/* Header */}
        <div className="px-3 py-2 border-b border-[#EFEFEF] flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-[#424242]">Edit Basic Info</h3>
          <div className="flex items-center gap-3">
            <button disabled={!canSave} onClick={() => canSave && onSave(form)} className={'text-xs md:text-sm h-8 px-3 rounded-md transition ' + (!canSave ? 'bg-[#F2F2F2] text-[#9AA1A9] cursor-not-allowed' : 'bg-[#2F66F6] text-white hover:bg-[#1e4cd8]')}>Update</button>
            <button onClick={requestClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button>
          </div>
        </div>

        {/* Body */}
        <div className="p-3 overflow-y-auto h-[calc(100%-48px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* First/Last */}
            <label className="block">
              <span className="text-[12px] text-[#424242] font-medium">First Name <span className="text-red-500">*</span></span>
              <input value={form.firstName||''} onChange={(e)=>set('firstName', e.target.value)} placeholder="Milind" className="mt-1 h-8 w-full rounded-md border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF]" />
            </label>
            <label className="block">
              <span className="text-[12px] text-[#424242] font-medium">Last Name <span className="text-red-500">*</span></span>
              <input value={form.lastName||''} onChange={(e)=>set('lastName', e.target.value)} placeholder="Chauhan" className="mt-1 h-8 w-full rounded-md border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF]" />
            </label>

            {/* Phone */}
            <label className="block">
              <span className="text-[12px] text-[#424242] font-medium">Mobile Number <span className="text-red-500">*</span></span>
              <div className="mt-1 h-8 w-full rounded-md border border-[#E6E6E6] flex items-center px-2 focus-within:border-[#BFD3FF] focus-within:ring-2 focus-within:ring-[#EAF2FF]">
                <input value={form.phone||''} onChange={(e)=>set('phone', e.target.value)} placeholder="91753 67487" className="flex-1 outline-none text-sm px-1" />
                <span className="ml-1 inline-flex items-center text-green-600 text-[12px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </span>
              </div>
              <div className="text-[12px] text-[#6B7280] mt-1">To change your Mobile & Email please <a className="text-[#2F66F6]" href="#" onClick={(e)=>e.preventDefault()}>Call Us</a></div>
            </label>

            {/* Email */}
            <label className="block">
              <span className="text-[12px] text-[#424242] font-medium">Email <span className="text-red-500">*</span></span>
              <div className="mt-1 h-8 w-full rounded-md border border-[#E6E6E6] flex items-center px-2 focus-within:border-[#BFD3FF] focus-within:ring-2 focus-within:ring-[#EAF2FF]">
                <input type="email" value={form.email||''} onChange={(e)=>set('email', e.target.value)} placeholder="milind@example.com" className="flex-1 outline-none text-sm px-1" />
                <span className="ml-1 inline-flex items-center text-green-600 text-[12px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </span>
              </div>
            </label>

            {/* Gender */}
            <div className="col-span-1 md:col-span-2">
              <div className="text-[12px] text-[#424242] font-medium">Gender <span className="text-red-500">*</span></div>
              <div className="mt-1 flex items-center gap-6 text-[13px] text-[#424242]">
                {['Male','Female','Other'].map((g)=> (
                  <label key={g} className="inline-flex items-center gap-2"><input type="radio" name="gender" checked={form.gender===g} onChange={()=>set('gender', g)} />{g}</label>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="col-span-1 md:col-span-2">
              <div className="text-[12px] text-[#424242] font-medium">Language</div>
              <div className="mt-1 flex flex-wrap gap-3 text-[13px] text-[#424242]">
                {['English','Hindi','Marathi','Gujarati','Kannada'].map((l) => (
                  <label key={l} className="inline-flex items-center gap-2 border rounded-md px-2 py-1 text-[12px]">
                    <input type="checkbox" checked={!!form.languages?.includes(l)} onChange={()=>toggleLang(l)} /> {l}
                  </label>
                ))}
              </div>
            </div>

            {/* City */}
            <label className="block">
              <span className="text-[12px] text-[#424242] font-medium">City <span className="text-red-500">*</span></span>
              <div className="relative mt-1">
                <select value={form.city||''} onChange={(e)=>set('city', e.target.value)} className="h-8 w-full rounded-md border border-[#E6E6E6] px-3 text-sm outline-none appearance-none focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF]">
                  <option>Akola, Maharashtra</option>
                  <option>Mumbai, Maharashtra</option>
                  <option>Pune, Maharashtra</option>
                  <option>Ahmedabad, Gujarat</option>
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
              </div>
            </label>

            {/* Website */}
            <label className="block">
              <span className="text-[12px] text-[#424242] font-medium">Website</span>
              <input value={form.website||''} onChange={(e)=>set('website', e.target.value)} placeholder="Paste Website Link" className="mt-1 h-8 w-full rounded-md border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF]" />
            </label>
          </div>

          {/* Headline */}
          <div className="mt-3">
            <div className="text-[12px] text-[#424242] font-medium">Profile Headline</div>
            <div className="mt-1">
              <textarea value={form.headline||''} onChange={(e)=>{ set('headline', e.target.value); setHeadlineCount(e.target.value.length) }} rows={2} className="w-full rounded-md border border-[#E6E6E6] px-3 py-2 text-sm outline-none focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF]" />
              <div className="text-[12px] text-[#6B7280] text-right">{headlineCount}/220</div>
            </div>
          </div>

          {/* About */}
          <div className="mt-3">
            <div className="text-[12px] text-[#424242] font-medium mb-1">About Us</div>
            <div className="border border-gray-200 rounded-md">
              <div className="px-2 py-1 border-b border-gray-200 text-gray-600 text-sm flex items-center gap-2">
                <button className="hover:text-gray-900">✎</button>
                <button className="hover:text-gray-900 font-bold">B</button>
                <button className="hover:text-gray-900 italic">I</button>
                <button className="hover:text-gray-900 underline">U</button>
                <button className="hover:text-gray-900">•</button>
              </div>
              <textarea value={form.about||''} onChange={(e)=>set('about', e.target.value)} className="w-full min-h-[160px] p-3 text-sm outline-none" />
              <div className="px-3 pb-2 text-[12px] text-gray-500 text-right">{(form.about||'').length}/1600</div>
            </div>
          </div>

        </div>
  </aside>
    </div>
  )
}

// Reusable small inputs used by other drawers
const FieldLabel = ({ children, required }) => (
  <span className="text-[12px] text-[#424242] font-medium">{children} {required && <span className="text-red-500">*</span>}</span>
)

const TextInput = (props) => (
  <input {...props} className={`mt-1 h-8 w-full rounded-md border border-[#E6E6E6] px-3 text-sm outline-none focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF] ${props.className||''}`} />
)

const SelectInput = ({ children, ...props }) => (
  <div className="relative">
    <select {...props} className="mt-1 h-9 w-full rounded-md border border-[#E6E6E6] px-3 text-sm outline-none appearance-none focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF]">
      {children}
    </select>
    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
  </div>
)

// Drawer: Education (Add/Edit)
const EducationDrawer = ({ open, onClose, initial, onSave, mode = 'add' }) => {
  const [closing, setClosing] = useState(false)
  const [data, setData] = useState({ school: '', gradType: '', degree: '', field: '', start: '', end: '', proof: '' })

  useEffect(() => {
    if (open) {
      if (initial && mode === 'edit') {
        // initial is already mapped from the onClick handler
        setData({
          school: initial.school || '',
          gradType: initial.gradType || '',
          degree: initial.degree || '',
          field: initial.field || '',
          start: initial.start || '',
          end: initial.end || '',
          proof: initial.proof || ''
        });
      } else {
        setData({ school: '', gradType: '', degree: '', field: '', start: '', end: '', proof: '' });
      }
    }
  }, [initial, open, mode])
  
  useEffect(() => { const onEsc = (e)=> e.key==='Escape' && requestClose(); window.addEventListener('keydown', onEsc); return ()=>window.removeEventListener('keydown', onEsc) }, [])
  if (!open && !closing) return null
  const requestClose = () => { setClosing(true); setTimeout(()=>{ setClosing(false); onClose?.() }, 220) }
  const set = (k,v)=> setData((d)=>({ ...d, [k]: v }))
  const canSave = data.school && data.gradType && data.degree && data.start && data.end

  return (
    <div className="fixed inset-0 z-50">
      <div className={`absolute inset-0 bg-black/30 ${closing ? 'animate-[fadeOut_.2s_ease-in_forwards]' : 'animate-[fadeIn_.25s_ease-out_forwards]'}`} onClick={requestClose} />
      <aside className={`absolute top-16 right-5 bottom-5 w-[600px] bg-white shadow-2xl border border-[#E6E6E6] rounded-xl overflow-hidden ${closing ? 'animate-[drawerOut_.22s_ease-in_forwards]' : 'animate-[drawerIn_.25s_ease-out_forwards]'}`} role="dialog" aria-modal="true">
        <div className="px-3 py-2 border-b border-[#EFEFEF] flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-[#424242]">{mode==='edit' ? 'Edit Education' : 'Add Education'}</h3>
          <div className="flex items-center gap-3">
            <button disabled={!canSave} onClick={()=> canSave && onSave?.(data)} className={'text-xs md:text-sm h-8 px-3 rounded-md transition ' + (!canSave ? 'bg-[#F2F2F2] text-[#9AA1A9] cursor-not-allowed' : 'bg-[#2F66F6] text-white hover:bg-[#1e4cd8]')}>{mode==='edit' ? 'Save' : 'Save'}</button>
            <button onClick={requestClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button>
          </div>
        </div>
        <div className="p-3 overflow-y-auto grid grid-cols-1 gap-2">
          <label className="block">
            <FieldLabel required>School/College/ University</FieldLabel>
            <TextInput placeholder="Select or Enter Institute Name" value={data.school} onChange={(e)=>set('school', e.target.value)} />
          </label>
          <label className="block">
            <FieldLabel required>Graduation Type</FieldLabel>
            <SelectInput value={data.gradType} onChange={(e)=>set('gradType', e.target.value)}>
              <option value="" disabled>Select Type</option>
              <option value="UG">Graduation</option>
              <option value="PG">Post-Graduation</option>
              <option value="Fellowship">Fellowship</option>
            </SelectInput>
          </label>
          <label className="block">
            <FieldLabel required>Degree</FieldLabel>
            <TextInput placeholder="Select or Enter Degree" value={data.degree} onChange={(e)=>set('degree', e.target.value)} />
          </label>
          <label className="block">
            <FieldLabel>Field Of Study</FieldLabel>
            <TextInput placeholder="Select or Enter your Field of Study" value={data.field} onChange={(e)=>set('field', e.target.value)} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><FieldLabel required>Start Year</FieldLabel><TextInput placeholder="2025" value={data.start} onChange={(e)=>set('start', e.target.value)} /></label>
            <label className="block"><FieldLabel required>Year of Completion</FieldLabel><TextInput placeholder="2025" value={data.end} onChange={(e)=>set('end', e.target.value)} /></label>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <FieldLabel>Upload Proof</FieldLabel>
              <span className="text-[#9AA1A9]" title="Optional"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></span>
            </div>
            {/* Dropzone */}
            <label className="mt-1 border border-dashed border-[#CFE0FF] rounded-md h-24 grid place-items-center text-center">
              <input type="file" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if(f){ set('proof', f.name) } }} />
              <div className="flex flex-col items-center gap-1">
                <span className="text-[#2F66F6]">↥</span>
                <span className="text-[13px] text-[#2F66F6]">Upload File</span>
                {data.proof ? <span className="text-[11px] text-gray-600">{data.proof}</span> : null}
              </div>
            </label>
            <div className="text-[11px] text-gray-500 mt-1">Support Size upto 1MB in .png, .jpg, .svg, .webp</div>
          </div>
        </div>
      </aside>
    </div>
  )
}

// Drawer: Experience
const ExperienceDrawer = ({ open, onClose, onSave, initial, mode = 'add' }) => {
  const [closing, setClosing] = useState(false)
  const [data, setData] = useState({ role: '', type: '', org: '', start: '', end: '', current: false, desc: '' })
  
  useEffect(() => {
    if (open) {
      if (initial && mode === 'edit') {
        setData({
          role: initial.jobTitle || '',
          type: initial.employmentType || '',
          org: initial.hospitalOrClinicName || '',
          start: initial.startDate ? initial.startDate.split('T')[0] : '',
          end: initial.endDate ? initial.endDate.split('T')[0] : '',
          current: initial.isCurrentlyWorking || false,
          desc: initial.description || ''
        });
      } else {
        setData({ role: '', type: '', org: '', start: '', end: '', current: false, desc: '' });
      }
    }
  }, [initial, open, mode]);
  
  if (!open && !closing) return null
  const requestClose = ()=>{ setClosing(true); setTimeout(()=>{ setClosing(false); onClose?.() }, 220) }
  const set = (k,v)=> setData((d)=>({ ...d, [k]: v }))
  const canSave = data.role && data.type && data.org && (data.current || (data.start && data.end))
  return (
    <div className="fixed inset-0 z-50">
      <div className={`absolute inset-0 bg-black/30 ${closing ? 'animate-[fadeOut_.2s_ease-in_forwards]' : 'animate-[fadeIn_.25s_ease-out_forwards]'}`} onClick={requestClose} />
      <aside className={`absolute top-16 right-5 bottom-5 w-[600px] bg-white shadow-2xl border border-[#E6E6E6] rounded-xl overflow-hidden ${closing ? 'animate-[drawerOut_.22s_ease-in_forwards]' : 'animate-[drawerIn_.25s_ease-out_forwards]'}`} role="dialog" aria-modal="true">
        <div className="px-3 py-2 border-b border-[#EFEFEF] flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-[#424242]">{mode === 'edit' ? 'Edit Experience' : 'Add Experience'}</h3>
          <div className="flex items-center gap-3">
            <button disabled={!canSave} onClick={()=> canSave && onSave?.(data)} className={'text-xs md:text-sm h-8 px-3 rounded-md transition ' + (!canSave ? 'bg-[#F2F2F2] text-[#9AA1A9] cursor-not-allowed' : 'bg-[#2F66F6] text-white hover:bg-[#1e4cd8]')}>Save</button>
            <button onClick={requestClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button>
          </div>
        </div>
  <div className="p-3 overflow-y-auto  grid grid-cols-1 gap-2">
          <label className="block"><FieldLabel required>Job Title</FieldLabel><TextInput placeholder="General Physician - CEO" value={data.role} onChange={(e)=>set('role', e.target.value)} /></label>
          <label className="block"><FieldLabel required>Employment Type</FieldLabel><SelectInput value={data.type} onChange={(e)=>set('type', e.target.value)}><option value="" disabled>Select</option><option>Full-Time</option><option>Part-Time</option><option>Contract</option></SelectInput></label>
          <label className="block"><FieldLabel required>Hospital or Clinic Name</FieldLabel><TextInput placeholder="Chauhan Clinic, Akola" value={data.org} onChange={(e)=>set('org', e.target.value)} /></label>
          <div className="grid grid-cols-2 gap-3 items-end">
            <label className="block"><FieldLabel required>Start Date</FieldLabel><TextInput type="date" value={data.start} onChange={(e)=>set('start', e.target.value)} /></label>
            <label className="block"><FieldLabel required>End Date</FieldLabel><TextInput type="date" value={data.end} onChange={(e)=>set('end', e.target.value)} disabled={data.current} /></label>
          </div>
          <label className="inline-flex items-center gap-2 text-[13px] text-[#424242]"><input type="checkbox" checked={data.current} onChange={(e)=>set('current', e.target.checked)} /> I am currently working in this role</label>
          <div>
            <FieldLabel>Description</FieldLabel>
            <div className="border border-gray-200 rounded-md">
              <div className="px-2 py-1 border-b border-gray-200 text-gray-600 text-sm flex items-center gap-2"><button className="hover:text-gray-900">✎</button><button className="hover:text-gray-900 font-bold">B</button><button className="hover:text-gray-900 italic">I</button><button className="hover:text-gray-900 underline">U</button><button className="hover:text-gray-900">•</button></div>
              <textarea className="w-full min-h-[120px] p-3 text-sm outline-none" value={data.desc} onChange={(e)=>set('desc', e.target.value)} />
              <div className="px-3 pb-2 text-[12px] text-gray-500 text-right">{data.desc.length}/800</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

// Drawer: Award
const AwardDrawer = ({ open, onClose, onSave, initial, mode = 'add' }) => {
  const [closing, setClosing] = useState(false)
  const [data, setData] = useState({ title: '', issuer: '', with: '', date: '', url: '', desc: '' })
  
  useEffect(() => {
    if (open) {
      if (initial && mode === 'edit') {
        setData({
          title: initial.awardName || '',
          issuer: initial.issuerName || '',
          with: initial.associatedWith || '',
          date: initial.issueDate ? initial.issueDate.split('T')[0] : '',
          url: initial.awardUrl || '',
          desc: initial.description || ''
        });
      } else {
        setData({ title: '', issuer: '', with: '', date: '', url: '', desc: '' });
      }
    }
  }, [initial, open, mode]);
  
  if(!open && !closing) return null
  const requestClose = ()=>{ setClosing(true); setTimeout(()=>{ setClosing(false); onClose?.() }, 220) }
  const set = (k,v)=> setData((d)=>({ ...d, [k]: v }))
  const canSave = data.title && data.issuer && data.date
  return (
    <div className="fixed inset-0 z-50">
      <div className={`absolute inset-0 bg-black/30 ${closing ? 'animate-[fadeOut_.2s_ease-in_forwards]' : 'animate-[fadeIn_.25s_ease-out_forwards]'}`} onClick={requestClose} />
      <aside className={`absolute top-16 right-5 bottom-5 w-[600px] bg-white shadow-2xl border border-[#E6E6E6] rounded-xl overflow-hidden ${closing ? 'animate-[drawerOut_.22s_ease-in_forwards]' : 'animate-[drawerIn_.25s_ease-out_forwards]'}`} role="dialog" aria-modal="true">
        <div className="px-3 py-2 border-b border-[#EFEFEF] flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-[#424242]">{mode === 'edit' ? 'Edit Award' : 'Add Award'}</h3>
          <div className="flex items-center gap-3"><button disabled={!canSave} onClick={()=>canSave && onSave?.(data)} className={'text-xs md:text-sm h-8 px-3 rounded-md transition ' + (!canSave ? 'bg-[#F2F2F2] text-[#9AA1A9] cursor-not-allowed' : 'bg-[#2F66F6] text-white hover:bg-[#1e4cd8]')}>Save</button><button onClick={requestClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button></div>
        </div>
  <div className="p-3 overflow-y-auto  grid grid-cols-1 gap-2">
          <label className="block"><FieldLabel required>Award Name</FieldLabel><TextInput placeholder="Best Resident" value={data.title} onChange={(e)=>set('title', e.target.value)} /></label>
          <label className="block"><FieldLabel required>Issuer Name</FieldLabel><TextInput placeholder="Manipal Hospital" value={data.issuer} onChange={(e)=>set('issuer', e.target.value)} /></label>
          <label className="block"><FieldLabel>Associated With</FieldLabel><TextInput placeholder="Association/Group/Department" value={data.with} onChange={(e)=>set('with', e.target.value)} /></label>
          <label className="block"><FieldLabel required>Issue Date</FieldLabel><TextInput type="date" value={data.date} onChange={(e)=>set('date', e.target.value)} /></label>
          <label className="block"><FieldLabel>Award URL</FieldLabel><TextInput placeholder="https://..." value={data.url} onChange={(e)=>set('url', e.target.value)} /></label>
          <div>
            <FieldLabel>Description</FieldLabel>
            <div className="border border-gray-200 rounded-md">
              <div className="px-2 py-1 border-b border-gray-200 text-gray-600 text-sm flex items-center gap-2"><button className="hover:text-gray-900">✎</button><button className="hover:text-gray-900 font-bold">B</button><button className="hover:text-gray-900 italic">I</button><button className="hover:text-gray-900 underline">U</button><button className="hover:text-gray-900">•</button></div>
              <textarea className="w-full min-h-[100px] p-3 text-sm outline-none" value={data.desc} onChange={(e)=>set('desc', e.target.value)} />
              <div className="px-3 pb-2 text-[12px] text-gray-500 text-right">{data.desc.length}/500</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

// Drawer: Publication
const PublicationDrawer = ({ open, onClose, onSave, initial, mode = 'add' }) => {
  const [closing, setClosing] = useState(false)
  const [data, setData] = useState({ title: '', publisher: '', date: '', url: '', desc: '' })
  
  useEffect(() => {
    if (open) {
      if (initial && mode === 'edit') {
        setData({
          title: initial.title || '',
          publisher: initial.publisher || '',
          date: initial.publicationDate?.split('T')[0] || '',
          url: initial.publicationUrl || '',
          desc: initial.description || ''
        });
      } else {
        setData({ title: '', publisher: '', date: '', url: '', desc: '' });
      }
    }
  }, [initial, open, mode]);
  
  if(!open && !closing) return null
  const requestClose = ()=>{ setClosing(true); setTimeout(()=>{ setClosing(false); onClose?.() }, 220) }
  const set = (k,v)=> setData((d)=>({ ...d, [k]: v }))
  const canSave = data.title && data.publisher && data.date
  return (
    <div className="fixed inset-0 z-50">
      <div className={`absolute inset-0 bg-black/30 ${closing ? 'animate-[fadeOut_.2s_ease-in_forwards]' : 'animate-[fadeIn_.25s_ease-out_forwards]'}`} onClick={requestClose} />
      <aside className={`absolute top-16 right-5 bottom-5 w-[600px] bg-white shadow-2xl border border-[#E6E6E6] rounded-xl overflow-hidden ${closing ? 'animate-[drawerOut_.22s_ease-in_forwards]' : 'animate-[drawerIn_.25s_ease-out_forwards]'}`} role="dialog" aria-modal="true">
        <div className="px-3 py-2 border-b border-[#EFEFEF] flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-[#424242]">{mode === 'edit' ? 'Edit Publication' : 'Add Publication'}</h3>
          <div className="flex items-center gap-3"><button disabled={!canSave} onClick={()=>canSave && onSave?.(data)} className={'text-xs md:text-sm h-8 px-3 rounded-md transition ' + (!canSave ? 'bg-[#F2F2F2] text-[#9AA1A9] cursor-not-allowed' : 'bg-[#2F66F6] text-white hover:bg-[#1e4cd8]')}>Save</button><button onClick={requestClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button></div>
        </div>
  <div className="p-3 overflow-y-auto  grid grid-cols-1 gap-2">
          <label className="block"><FieldLabel required>Title</FieldLabel><TextInput placeholder="Title" value={data.title} onChange={(e)=>set('title', e.target.value)} /></label>
          <label className="block"><FieldLabel required>Publication / Publisher</FieldLabel><TextInput placeholder="Publisher" value={data.publisher} onChange={(e)=>set('publisher', e.target.value)} /></label>
          <label className="block"><FieldLabel required>Publication Date</FieldLabel><TextInput type="date" value={data.date} onChange={(e)=>set('date', e.target.value)} /></label>
          <label className="block"><FieldLabel>Publication URL</FieldLabel><TextInput placeholder="https://..." value={data.url} onChange={(e)=>set('url', e.target.value)} /></label>
          <div>
            <FieldLabel>Description</FieldLabel>
            <div className="border border-gray-200 rounded-md">
              <div className="px-2 py-1 border-b border-gray-200 text-gray-600 text-sm flex items-center gap-2"><button className="hover:text-gray-900">✎</button><button className="hover:text-gray-900 font-bold">B</button><button className="hover:text-gray-900 italic">I</button><button className="hover:text-gray-900 underline">U</button><button className="hover:text-gray-900">•</button></div>
              <textarea className="w-full min-h-[100px] p-3 text-sm outline-none" value={data.desc} onChange={(e)=>set('desc', e.target.value)} />
              <div className="px-3 pb-2 text-[12px] text-gray-500 text-right">{data.desc.length}/500</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

// Drawer: Professional Details (Registration)
const ProfessionalDrawer = ({ open, onClose, initial, onSave }) => {
  const [closing, setClosing] = useState(false)
  const [form, setForm] = useState(initial || { mrn: '', year: '', council: '', proof: '' })
  useEffect(()=>{ setForm(initial || { mrn: '', year: '', council: '', proof: '' }) }, [initial, open])
  if(!open && !closing) return null
  const requestClose = ()=>{ setClosing(true); setTimeout(()=>{ setClosing(false); onClose?.() }, 220) }
  const set = (k,v)=> setForm((f)=>({ ...f, [k]: v }))
  const canSave = form.mrn && form.year && form.council
  return (
    <div className="fixed inset-0 z-50">
      <div className={`absolute inset-0 bg-black/30 ${closing ? 'animate-[fadeOut_.2s_ease-in_forwards]' : 'animate-[fadeIn_.25s_ease-out_forwards]'}`} onClick={requestClose} />
      <aside className={`absolute top-16 right-5 bottom-5 w-[600px] bg-white shadow-2xl border border-[#E6E6E6] rounded-xl overflow-hidden ${closing ? 'animate-[drawerOut_.22s_ease-in_forwards]' : 'animate-[drawerIn_.25s_ease-out_forwards]'}`} role="dialog" aria-modal="true">
        <div className="px-3 py-2 border-b border-[#EFEFEF] flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-[#424242]">Edit Professional Details</h3>
          <div className="flex items-center gap-3"><button disabled={!canSave} onClick={()=>canSave && onSave?.(form)} className={'text-xs md:text-sm h-8 px-3 rounded-md transition ' + (!canSave ? 'bg-[#F2F2F2] text-[#9AA1A9] cursor-not-allowed' : 'bg-[#2F66F6] text-white hover:bg-[#1e4cd8]')}>Save</button><button onClick={requestClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button></div>
        </div>
  <div className="p-3 overflow-y-auto grid grid-cols-1 gap-2">
          <label className="block"><FieldLabel required>Medical Council Registration Number</FieldLabel><TextInput value={form.mrn} onChange={(e)=>set('mrn', e.target.value)} /></label>
          <label className="block"><FieldLabel required>Registration Year</FieldLabel><TextInput value={form.year} onChange={(e)=>set('year', e.target.value)} placeholder="2015" /></label>
          <label className="block"><FieldLabel required>Registration Council</FieldLabel><TextInput value={form.council} onChange={(e)=>set('council', e.target.value)} placeholder="Maharashtra Medical Council" /></label>
          <div>
            <FieldLabel>Upload Proof</FieldLabel>
            <div className="mt-1 h-[32px] border border-gray-300 rounded-lg flex items-center justify-between px-2 text-sm">
              <div className="text-gray-600">{form.proof || 'Upload File'}</div>
              <button className="text-blue-600 text-xs" onClick={(e)=>{e.preventDefault(); set('proof','MRN Proof.pdf')}}>Upload</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

// Drawer: Practice Details
const PracticeDrawer = ({ open, onClose, initial, onSave }) => {
  const [closing, setClosing] = useState(false)
  const [form, setForm] = useState({
    workExperience: initial?.workExperience || '',
    medicalPracticeType: initial?.medicalPracticeType || '',
    practiceArea: initial?.practiceArea || [],
    specialties: initial?.specialties || []
  })
  
  useEffect(() => {
    setForm({
      workExperience: initial?.workExperience || '',
      medicalPracticeType: initial?.medicalPracticeType || '',
      practiceArea: initial?.practiceArea || [],
      specialties: initial?.specialties || []
    })
  }, [initial, open])
  
  if(!open && !closing) return null
  const requestClose = ()=>{ setClosing(true); setTimeout(()=>{ setClosing(false); onClose?.() }, 220) }
  const set = (k,v)=> setForm((f)=>({ ...f, [k]: v }))
  const toggleArea = (a)=> setForm((f)=> ({ ...f, practiceArea: f.practiceArea.includes(a) ? f.practiceArea.filter(x=>x!==a) : [...f.practiceArea, a] }))
  const canSave = form.workExperience && form.medicalPracticeType
  const areaOptions = ['Cough','Cold','Headache','Nausea','Dizziness','Muscle Pain','Sore Throat']
  
  return (
    <div className="fixed inset-0 z-50">
      <div className={`absolute inset-0 bg-black/30 ${closing ? 'animate-[fadeOut_.2s_ease-in_forwards]' : 'animate-[fadeIn_.25s_ease-out_forwards]'}`} onClick={requestClose} />
      <aside className={`absolute top-16 right-5 bottom-5 w-[600px] bg-white shadow-2xl border border-[#E6E6E6] rounded-xl overflow-hidden ${closing ? 'animate-[drawerOut_.22s_ease-in_forwards]' : 'animate-[drawerIn_.25s_ease-out_forwards]'}`} role="dialog" aria-modal="true">
        <div className="px-4 py-3 border-b border-[#EFEFEF] flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-[#424242]">Edit Practice Details</h3>
          <div className="flex items-center gap-3"><button disabled={!canSave} onClick={()=>canSave && onSave?.(form)} className={'text-xs md:text-sm h-8 px-3 rounded-md transition ' + (!canSave ? 'bg-[#F2F2F2] text-[#9AA1A9] cursor-not-allowed' : 'bg-[#2F66F6] text-white hover:bg-[#1e4cd8]')}>Save</button><button onClick={requestClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button></div>
        </div>
        <div className="p-4 overflow-y-auto grid grid-cols-1 gap-3">
          <label className="block"><FieldLabel required>Work Experience</FieldLabel><div className="flex items-center gap-2"><TextInput placeholder="15" value={form.workExperience} onChange={(e)=>set('workExperience', e.target.value)} className="!mt-0" /><span className="text-xs text-gray-500">Years</span></div></label>
          <label className="block"><FieldLabel required>Medical Practice Type</FieldLabel><SelectInput value={form.medicalPracticeType} onChange={(e)=>set('medicalPracticeType', e.target.value)}><option value="" disabled>Select</option><option>Homeopathy</option><option>Allopathy</option><option>Ayurveda</option></SelectInput></label>
          <div>
            <FieldLabel>Practice Area</FieldLabel>
            <div className="mt-2 flex flex-wrap gap-2">
              {areaOptions.map((a)=> (
                <button key={a} type="button" onClick={()=>toggleArea(a)} className={`px-2 h-7 rounded-md border text-[12px] ${form.practiceArea.includes(a) ? 'bg-[#EAF2FF] border-[#BFD3FF] text-[#2F66F6]' : 'bg-white border-[#E6E6E6] text-[#424242] hover:bg-gray-50'}`}>{a}</button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

// ======== Staff Permissions (copied inline; not linked) ========
const StaffTab = () => {
  const TabBtn = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={
        `px-3 py-1 text-[12px] md:text-sm rounded-md border bg-white transition-colors ` +
        (active
          ? 'text-[#2F66F6] border-[#BFD3FF] shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
          : 'text-[#626060] border-[#E6E6E6] hover:bg-[#F9FAFB] hover:text-[#424242]')
      }
      aria-selected={active}
      role="tab"
    >
      {label}
    </button>
  )

  const InfoBanner = () => (
    <div className="flex items-start gap-2 border rounded-md px-3 py-2 bg-[#F6FAFF] border-[#D8E7FF] text-[#3A6EEA]">
      <img src="/i-icon.png" alt="info" className="w-4 h-4 mt-0.5" />
      <p className="text-[12px] leading-5">
        Staff will receive an email invitation to create their account and set up Secure Account
      </p>
    </div>
  )

  const Field = ({ label, required, children }) => (
    <label className="block">
      <span className="text-[12px] text-[#424242] font-medium">{label} {required && <span className="text-red-500">*</span>}</span>
      <div className="mt-1">{children}</div>
    </label>
  )

  const TextInput = (props) => (
    <input
      {...props}
      className={
        'w-full h-9 px-3 rounded-md border outline-none text-sm placeholder:text-[#9AA1A9] ' +
        'border-[#E6E6E6] focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF]'
      }
    />
  )

  const Select = ({ children, ...props }) => (
    <div className="relative">
      <select
        {...props}
        className={
          'w-full h-9 pr-8 pl-3 rounded-md border outline-none text-sm appearance-none ' +
          'border-[#E6E6E6] focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF]'
        }
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
    </div>
  )

  const CardSVG = ({ color = '#FDE68A' }) => (
    <svg viewBox="0 0 60 74" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" rx="8" ry="8" width="60" height="74" fill="#F7FAFF" stroke="#D7DDF8" />
      <circle cx="30" cy="22" r="10" fill={color} />
      <rect x="18" y="38" width="24" height="4" rx="2" fill="#9DB8FF" />
      <rect x="14" y="46" width="32" height="4" rx="2" fill="#C7D2FE" />
      <rect x="14" y="54" width="32" height="4" rx="2" fill="#E0E7FF" />
    </svg>
  )

  const AvatarCarousel = () => {
    const [active, setActive] = useState(0)
    useEffect(() => {
      const id = setInterval(() => setActive((a) => (a + 1) % 3), 2600)
      return () => clearInterval(id)
    }, [])
    const colors = ['#FECACA', '#FDE68A', '#BFDBFE']
    const positions = (i) => {
      const rel = (i - active + 3) % 3
      if (rel === 0) return { pos: 'center' }
      if (rel === 1) return { pos: 'right' }
      return { pos: 'left' }
    }
    const styleFor = (pos) => {
      switch (pos) {
        case 'center':
          return { left: '50%', transform: 'translate(-50%, -50%) scale(1)', zIndex: 30 }
        case 'left':
          return { left: '30%', transform: 'translate(-50%, -50%) scale(0.88)', zIndex: 20 }
        case 'right':
          return { left: '70%', transform: 'translate(-50%, -50%) scale(0.88)', zIndex: 20 }
        default:
          return {}
      }
    }
    return (
      <div className="relative w-[520px] max-w-[90vw] h-[180px]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-36 bg-[#EAF2FF] rounded-full" />
        {[0,1,2].map((i) => {
          const { pos } = positions(i)
          const center = pos === 'center'
          return (
            <div
              key={i}
              className={'absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out drop-shadow-sm rounded-lg bg-white ring-1 ' + (center ? 'ring-[#BFD3FF]' : 'ring-[#E6ECFF]')}
              style={{ width: center ? 140 : 108, height: center ? 172 : 134, ...styleFor(pos) }}
            >
              <CardSVG color={colors[i]} />
            </div>
          )
        })}
      </div>
    )
  }

  const StaffRow = ({ data }) => (
    <div className='border border-[#E2E2E2] rounded-lg bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]' style={{borderWidth: '0.5px', width: '280px', minHeight: '228px'}}>
      <div className='flex items-start gap-2'>
        <div className='w-12 h-12 rounded-full grid place-items-center text-[#2F66F6] bg-white border border-[#DDE6FF]'>
          <span className='font-semibold'>{data.name?.[0]?.toUpperCase() || 'U'}</span>
        </div>
        <div className='flex-1'>
          <div className='text-[14px] font-semibold text-[#2A2A2A]'>{data.name}</div>
          <div className='text-[12px] text-[#7A7A7A]'>{data.position}</div>
        </div>
      </div>
      <div className='mt-2 text-[13px] text-[#4C4C4C]'>
        <div className='flex justify-between py-1'><span>Role:</span><span className='text-right font-medium text-[#2B2B2B]'>{data.role}</span></div>
        <div className='flex justify-between py-1'><span>Contact Number:</span><span className='text-right font-medium text-[#2B2B2B]'>{data.phone || '-'}</span></div>
        <div className='flex justify-between py-1'><span>Last Active:</span><span className='text-right text-[#505050]'>-</span></div>
        <div className='flex justify-between py-1'><span>Joined:</span><span className='text-right text-[#505050]'>-</span></div>
      </div>
      <div className='mt-2 flex items-center gap-2'>
        <button className='h-8 px-3 rounded-md border text-[12px] text-[#424242] hover:bg-gray-50 inline-flex items-center gap-1'>
          <Eye size={14} /> View
        </button>
        <button className='h-8 px-3 rounded-md border text-[12px] text-[#424242] hover:bg-gray-50 inline-flex items-center gap-1'>
          <Pencil size={14} /> Edit
        </button>
        <div className='ml-auto flex'>
          <button className='h-8 px-3 rounded-l-md text-[12px] bg-[#FFF4CC] border border-[#F5E2A4] text-[#6B5E2F]'>Inactive</button>
          <button className='h-8 px-2 rounded-r-md border border-l-0 border-[#F5E2A4] bg-[#FFF4CC] text-[#6B5E2F] grid place-items-center'>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  )

  const RoleCard = ({ role }) => {
    const Icon = role.icon === 'crown' ? Crown : ClipboardList
    return (
      <div className='border border-[#E2E2E2] rounded-lg bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]' style={{borderWidth: '0.5px', width: '280px', minHeight: '180px'}}>
        <div className='flex items-start gap-2'>
          <div className='w-9 h-9 rounded-full grid place-items-center text-[#2F66F6] bg-white border border-[#DDE6FF]'>
            <Icon size={16} />
          </div>
          <div className='flex-1'>
            <div className='text-[13px] font-semibold text-[#2A2A2A]'>{role.name}</div>
            <div className='text-[11px] text-[#7A7A7A]'>{role.subtitle}</div>
          </div>
        </div>
        <div className='mt-2 text-[12px] text-[#4C4C4C]'>
          <div className='flex justify-between py-1'><span>Staff Member:</span><span className='font-medium text-[#424242]'>{role.staffCount}</span></div>
          <div className='flex justify-between py-1'><span>Total Permissions:</span><span className='font-medium text-[#424242]'>{role.permissions}</span></div>
          <div className='flex justify-between py-1 border-b pb-2'><span>Creation Date:</span><span className='font-medium text-[#424242]'>{role.created}</span></div>
        </div>
        <div className='mt-2 grid grid-cols-2 gap-2'>
          <button className='h-7 rounded-md border text-[12px] text-[#424242] hover:bg-gray-50 inline-flex items-center justify-center gap-1'><Eye size={14} /> View</button>
          <button className='h-7 rounded-md border text-[12px] text-[#424242] hover:bg-gray-50 inline-flex items-center justify-center gap-1'><Pencil size={14} /> Edit</button>
        </div>
      </div>
    )
  }

  const InviteStaffDrawer = ({ open, onClose, onSend }) => {
    const [mode, setMode] = useState('individual')
    const [rows, setRows] = useState([{ id: 0, fullName: '', email: '', phone: '', position: '', role: '' }])
    const [closing, setClosing] = useState(false)
    useEffect(() => {
      const onEsc = (e) => e.key === 'Escape' && requestClose()
      window.addEventListener('keydown', onEsc)
      return () => window.removeEventListener('keydown', onEsc)
    }, [])
    if (!open && !closing) return null
    const requestClose = () => { setClosing(true); setTimeout(()=>{ setClosing(false); onClose?.() }, 220) }
    const removeRow = (id) => setRows((r) => (r.length > 1 ? r.filter((x) => x.id !== id) : r))
    const addRow = () => setRows((r) => [...r, { id: (r[r.length - 1]?.id ?? 0) + 1, fullName: '', email: '', phone: '', position: '', role: '' }])
    const onChangeRow = (id, field, value) => setRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
    const emailOk = (e) => /.+@.+\..+/.test(e)
    const allValid = rows.every((x) => x.fullName && emailOk(x.email) && x.phone && x.position && x.role)
    return (
      <div className="fixed inset-0 z-50">
        <div className={`absolute inset-0 bg-black/30 ${closing ? 'animate-[fadeOut_.2s_ease-in_forwards]' : 'animate-[fadeIn_.25s_ease-out_forwards]'}`} onClick={requestClose} />
        <aside className={`absolute top-16 right-5 bottom-5 w-[600px] bg-white shadow-2xl border border-[#E6E6E6] rounded-xl overflow-hidden ${closing ? 'animate-[drawerOut_.22s_ease-in_forwards]' : 'animate-[drawerIn_.25s_ease-out_forwards]'}`} role="dialog" aria-modal="true">
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#EFEFEF]">
            <h3 className="text-[16px] font-semibold text-[#424242]">Invite Staff</h3>
            <div className="flex items-center gap-3">
              <button disabled={!allValid} className={'text-xs md:text-sm h-8 px-3 rounded-md transition ' + (!allValid ? 'bg-[#F2F2F2] text-[#9AA1A9] cursor-not-allowed' : 'bg-[#2F66F6] text-white hover:bg-[#1e4cd8]')} onClick={() => allValid && onSend(rows)}>Send Invite</button>
              <button onClick={requestClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button>
            </div>
          </div>
          <div className="p-3 flex flex-col gap-3 overflow-y-auto h-[calc(100%-48px)]">
            <InfoBanner />
            <div className="flex items-center gap-6 text-[13px] text-[#424242]">
              <label className="inline-flex items-center gap-2"><input type="radio" name="invite-mode" checked={mode==='individual'} onChange={() => setMode('individual')} />Individual Invite</label>
              <label className="inline-flex items-center gap-2"><input type="radio" name="invite-mode" checked={mode==='bulk'} onChange={() => setMode('bulk')} />Bulk Invite</label>
            </div>
            <div className="border rounded-lg border-[#E6E6E6] p-3">
              <div className="text-[13px] font-semibold text-[#424242]">New Staff Members</div>
              <div className="mt-2 flex flex-col gap-3">
                {rows.map((row) => (
                  <div key={row.id} className="relative grid grid-cols-1 gap-3">
                    <button onClick={() => removeRow(row.id)} className="absolute right-0 -top-1 text-gray-400 hover:text-gray-600" title="Remove" aria-label="Remove row"><Trash2 size={16} strokeWidth={1.75} /></button>
                    <Field label="Full Name" required><TextInput placeholder="Enter staff full name" value={row.fullName} onChange={(e) => onChangeRow(row.id, 'fullName', e.target.value)} /></Field>
                    <Field label="Email Address" required><TextInput type="email" placeholder="staff@clinic.com" value={row.email} onChange={(e) => onChangeRow(row.id, 'email', e.target.value)} /></Field>
                    <Field label="Phone Number" required><TextInput placeholder="Enter phone number" value={row.phone} onChange={(e) => onChangeRow(row.id, 'phone', e.target.value)} /></Field>
                    <Field label="Position" required><TextInput placeholder="Enter User Job Role" value={row.position} onChange={(e) => onChangeRow(row.id, 'position', e.target.value)} /></Field>
                    <Field label="Assign Roles" required>
                      <Select value={row.role} onChange={(e) => onChangeRow(row.id, 'role', e.target.value)}>
                        <option value="" disabled>Select role</option>
                        <option>Receptionist</option>
                        <option>Nurse</option>
                        <option>Assistant</option>
                        <option>Billing</option>
                      </Select>
                    </Field>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <button onClick={addRow} className="text-[13px] font-medium text-[#2F66F6] hover:text-[#1e4cd8]">Add More Staff Members</button>
            </div>
          </div>
  </aside>
      </div>
    )
  }

  const RoleDrawer = ({ open, onClose, onCreate }) => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [checked, setChecked] = useState({})
    const [closing, setClosing] = useState(false)
    const groups = [
      { key: 'patient', title: 'Patient Management', items: [
        { k: 'read_patient', label: 'Read Patient Record' },
        { k: 'view_patient_list', label: 'View Patient List' },
        { k: 'create_patient', label: 'Create Patient' },
        { k: 'edit_patient', label: 'Edit Patient' },
        { k: 'delete_patient', label: 'Delete Patient' },
        { k: 'add_patient_data', label: 'Add Data' },
      ]},
      { key: 'queue', title: 'Queue Management', items: [
        { k: 'queue_read', label: 'Read Only' },
        { k: 'queue_full', label: 'Full Access' },
        { k: 'queue_create', label: 'Create Appointments' },
        { k: 'queue_manage', label: 'Manage Appts' },
      ]},
      { key: 'consult', title: 'Consultation Management', items: [
        { k: 'consult_read', label: 'Read Only' },
        { k: 'consult_token', label: 'Edit Consultation Token Availability' },
        { k: 'consult_timing', label: 'Edit Consultation Timing' },
      ]},
      { key: 'rx', title: 'Rx Template Management', items: [
        { k: 'rx_read', label: 'Read Only' },
        { k: 'rx_edit', label: 'Edit Template' },
      ]},
      { key: 'staff', title: 'Staff Management', items: [
        { k: 'staff_view', label: 'View Staff' },
        { k: 'staff_edit', label: 'Edit Staff' },
        { k: 'staff_add', label: 'Add Staff' },
        { k: 'staff_manage', label: 'Manage Staff' },
      ]},
    ]
  if (!open && !closing) return null
  const requestClose = () => { setClosing(true); setTimeout(()=>{ setClosing(false); onClose?.() }, 220) }
    const toggle = (k) => setChecked((c) => ({ ...c, [k]: !c[k] }))
    const groupAll = (gKey, value) => {
      const up = { ...checked }
      const g = groups.find((g) => g.key === gKey)
      g.items.forEach((it) => (up[it.k] = value))
      setChecked(up)
    }
    const selectedCount = Object.values(checked).filter(Boolean).length
    const canCreate = name.trim().length > 0 && selectedCount > 0
    return (
      <div className="fixed inset-0 z-50">
        <div className={`absolute inset-0 bg-black/30 ${closing ? 'animate-[fadeOut_.2s_ease-in_forwards]' : 'animate-[fadeIn_.25s_ease-out_forwards]'}`} onClick={requestClose} />
        <aside className={`absolute top-16 right-5 bottom-5 w-[600px] bg-white shadow-2xl border border-[#E6E6E6] rounded-xl overflow-hidden ${closing ? 'animate-[drawerOut_.22s_ease-in_forwards]' : 'animate-[drawerIn_.25s_ease-out_forwards]'}`} role="dialog" aria-modal="true">
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#EFEFEF]">
            <h3 className="text-[16px] font-semibold text-[#424242]">Create User Role</h3>
            <div className="flex items-center gap-3">
              <button disabled={!canCreate} className={'text-xs md:text-sm h-8 px-3 rounded-md transition ' + (!canCreate ? 'bg-[#F2F2F2] text-[#9AA1A9] cursor-not-allowed' : 'bg-[#2F66F6] text-white hover:bg-[#1e4cd8]')} onClick={() => canCreate && onCreate({ name, subtitle: 'Limited System Access', staffCount: 0, permissions: selectedCount, created: new Date().toLocaleDateString('en-GB'), icon: 'clipboard', description: desc })}>Create</button>
              <button onClick={requestClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button>
            </div>
          </div>
          <div className="px-3 py-2 flex flex-col gap-2 overflow-y-auto h-[calc(100%-48px)]">
            <label className="block"><span className="text-[12px] text-[#424242] font-medium">Role Name <span className="text-red-500">*</span></span><input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter staff full name" className="w-full h-9 px-3 mt-1 rounded-md border border-[#E6E6E6] focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF] outline-none text-sm" /></label>
            <label className="block"><span className="text-[12px] text-[#424242] font-medium">Description</span><textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Describe the role" rows={3} className="w-full px-3 py-2 mt-1 rounded-md border border-[#E6E6E6] focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF] outline-none text-sm" /></label>
            <div><div className="text-[12px] text-[#424242] font-medium">Permissions <span className="text-red-500">*</span></div>
              <div className="mt-2 flex flex-col gap-3">
                {groups.map((g) => {
                  const allChecked = g.items.every((it) => checked[it.k])
                  return (
                    <div key={g.key} className="border rounded-md border-[#E6E6E6]">
                      <div className="flex items-center justify-between px-3 py-2 bg-[#F9FBFF] text-[12px] text-[#424242] rounded-t-md">
                        <span className="font-semibold">{g.title}</span>
                        <label className="inline-flex items-center gap-2 text-[#626060]"><input type="checkbox" checked={allChecked} onChange={(e)=>groupAll(g.key, e.target.checked)} /> Select All</label>
                      </div>
                      <div className="grid grid-cols-2 gap-3 p-3">
                        {g.items.map((it)=> (
                          <label key={it.k} className="flex items-start gap-2 text-[12px] text-[#424242]"><input type="checkbox" checked={!!checked[it.k]} onChange={()=>toggle(it.k)} className="mt-0.5" /><span>{it.label}</span></label>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
  </aside>
      </div>
    )
  }

  const [tab, setTab] = useState('staff')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)
  const [staff, setStaff] = useState([])
  const [roles, setRoles] = useState([
    { name: 'Super User', subtitle: 'Full System Access', staffCount: 0, permissions: 26, created: '20/01/2024', icon: 'crown' },
    { name: 'Front Desk', subtitle: 'Limited System Access', staffCount: 1, permissions: 13, created: '20/01/2024', icon: 'clipboard' },
  ])

  return (
    <div className=' py-2 flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <TabBtn label='Staff' active={tab==='staff'} onClick={() => setTab('staff')} />
          <TabBtn label='Roles & Permission' active={tab==='roles'} onClick={() => setTab('roles')} />
        </div>
        {tab === 'staff' ? (
          <button onClick={() => setInviteOpen(true)} className='text-[13px] md:text-sm font-medium text-[#2F66F6] hover:text-[#1e4cd8]'>
            + Invite Staff
          </button>
        ) : (
          <button onClick={() => setRoleOpen(true)} className='text-[13px] md:text-sm font-medium text-[#2F66F6] hover:text-[#1e4cd8]'>
            + New Role
          </button>
        )}
      </div>

      {tab === 'staff' ? (
        staff.length === 0 ? (
          <div className='border border-[#E6E6E6] rounded-md bg-white min-h-[220px] flex items-center justify-center'>
            <div className='flex flex-col items-center text-center gap-3 py-8 px-4'>
              <AvatarCarousel />
              <p className='max-w-[560px] text-xs md:text-sm text-[#626060]'>
                Staff will receive an email invitation to create their account and set up Secure Account
              </p>
              <button onClick={() => setInviteOpen(true)} className='text-[13px] md:text-sm font-medium text-[#2F66F6] hover:text-[#1e4cd8]'>
                + Invite Staff
              </button>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,280px))] justify-start gap-4 pt-1'>
            {staff.map((m, idx) => (
              <StaffRow key={idx} data={m} />
            ))}
            <button onClick={() => setInviteOpen(true)} className='rounded-lg w-[280px] min-h-[228px] flex items-center justify-center flex-col gap-2 text-[#2F66F6] border-2 border-dashed border-[#CFE0FF] hover:bg-[#F8FBFF] p-3'>
              <span className='w-10 h-10 rounded-full grid place-items-center border border-[#BFD3FF] text-[#2F66F6]'>
                <UserPlus size={18} />
              </span>
              <span className='text-[13px]'>Invite More Users</span>
            </button>
          </div>
        )
      ) : (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,280px))] justify-start gap-4 pt-1'>
          {roles.map((role, i) => (
            <RoleCard key={i} role={role} />
          ))}
          <button onClick={() => setRoleOpen(true)} className='rounded-lg w-[280px] min-h-[180px] flex items-center justify-center flex-col gap-2 text-[#2F66F6] border-2 border-dashed border-[#CFE0FF] hover:bg-[#F8FBFF] p-3'>
            <span className='w-10 h-10 rounded-full grid place-items-center border border-[#BFD3FF] text-[#2F66F6]'>
              <ShieldPlus size={18} />
            </span>
            <span className='text-[13px] text-[#3A6EEA]'>Create New Role</span>
          </button>
        </div>
      )}

      <InviteStaffDrawer
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onSend={(rows) => {
          const mapped = rows.map((r) => ({ name: r.fullName, email: r.email, phone: r.phone, position: r.position, role: r.role, status: 'Inactive' }))
          setStaff((s) => [...mapped, ...s])
          setInviteOpen(false)
        }}
      />
      <RoleDrawer
        open={roleOpen}
        onClose={() => setRoleOpen(false)}
        onCreate={(role) => { setRoles((r) => [role, ...r]); setRoleOpen(false) }}
      />
    </div>
  )
}

import { useLocation, useNavigate } from 'react-router-dom'

const Doc_settings = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Grab global profile + actions from Zustand
  const {
      profile,
      fetchBasicInfo,
      updateBasicInfo,
    } = useProfileStore();

  // Education store
  const {
    education,
    fetchEducation,
    addEducation,
    updateEducation,
    deleteEducation,
  } = useEducationStore();

  // Experience store
  const {
    experiences,
    fetchExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
  } = useExperienceStore();

  // Awards & Publications store
  const {
    awards,
    publications,
    fetchAwardsAndPublications,
    addAward,
    updateAward,
    deleteAward,
    addPublication,
    updatePublication,
    deletePublication,
  } = useAwardsPublicationsStore();

  // Practice store (professional details)
  const {
    medicalRegistration,
    practiceDetails,
    fetchProfessionalDetails,
    updateMedicalRegistration,
    updatePracticeDetails,
  } = usePracticeStore();
    
  // Tabs under Settings (as per screenshot)
  const tabs = [
    { key: 'personal', label: 'Personal Info' },
    { key: 'consultation', label: 'Consultation Details' },
    { key: 'clinical', label: 'Clinical Details' },
    { key: 'staff', label: 'Staff Permissions' },
    { key: 'security', label: 'Security Settings' },
  ]

  const pathTab = useMemo(() => {
    const p = location.pathname
    if (p.endsWith('/settings/account')) return 'personal'
    if (p.endsWith('/settings/consultation')) return 'consultation'
    if (p.endsWith('/settings/clinics')) return 'clinical'
    if (p.endsWith('/settings/staff-permissions')) return 'staff'
    if (p.endsWith('/settings/security')) return 'security'
    if (p.endsWith('/settings/rx-template')) return 'rx'
    return 'personal'
  }, [location.pathname])

  const [activeTab, setActiveTab] = useState(pathTab)
  useEffect(() => { setActiveTab(pathTab) }, [pathTab])

  const tabToPath = (key) => {
    const seg1 = (location.pathname.split('/')[1] || 'doc')
    const base = seg1 === 'hospital' ? '/hospital' : '/doc'
    switch (key) {
      case 'personal': return `${base}/settings/account`
      case 'consultation': return `${base}/settings/consultation`
      case 'clinical': return `${base}/settings/clinics`
      case 'staff': return `${base}/settings/staff-permissions`
      case 'security': return `${base}/settings/security`
      case 'rx': return `${base}/settings/rx-template`
      default: return `${base}/settings/account`
    }
  }

  const [basicOpen, setBasicOpen] = useState(false)
  const [eduOpen, setEduOpen] = useState(false)
  const [eduEditMode, setEduEditMode] = useState('add') // 'add' or 'edit'
  const [eduEditData, setEduEditData] = useState(null) // holds education entry being edited
  const [expOpen, setExpOpen] = useState(false)
  const [expEditMode, setExpEditMode] = useState('add') // 'add' or 'edit'
  const [expEditData, setExpEditData] = useState(null) // holds experience being edited
  const [awardOpen, setAwardOpen] = useState(false)
  const [awardEditMode, setAwardEditMode] = useState('add') // 'add' or 'edit'
  const [awardEditData, setAwardEditData] = useState(null) // holds award being edited
  const [pubOpen, setPubOpen] = useState(false)
  const [pubEditMode, setPubEditMode] = useState('add') // 'add' or 'edit'
  const [pubEditData, setPubEditData] = useState(null) // holds publication being edited
  const [profOpen, setProfOpen] = useState(false)
  const [practiceOpen, setPracticeOpen] = useState(false)

   useEffect(() => {
    // Fetch all settings data on component mount
    fetchBasicInfo().catch(() => {
      console.log("Error in fetch basic info");
    });
    
    fetchEducation().catch(() => {
      console.log("Error in fetch education");
    });

    fetchExperiences().catch(() => {
      console.log("Error in fetch experiences");
    });

    fetchAwardsAndPublications().catch(() => {
      console.log("Error in fetch awards and publications");
    });

    fetchProfessionalDetails().catch(() => {
      console.log("Error in fetch professional details");
    });
  }, [fetchBasicInfo, fetchEducation, fetchExperiences, fetchAwardsAndPublications, fetchProfessionalDetails]);

  if (!profile) {
  return (
    <div className="px-6 py-10 text-sm text-gray-600">
      Loading profile...
    </div>
  );
}

  return (
    <div className="px-6 pb-10">
      <DrawerKeyframes />
      {/* Top banner + centered avatar + tabs (as in screenshot) */}
      <div className="-mx-6">
        <div className="relative">
          <img src={hospital} alt="cover" className="w-full h-40 object-cover" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="rounded-full ring-4 ring-white shadow-md">
              <AvatarCircle name={profile.basic?.name} size="l" color="blue" className="w-24 h-24 text-3xl" />
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 pt-10">
            <nav className="flex items-center gap-6 overflow-x-auto text-sm">
              {tabs.map((t) => {
                const active = activeTab === t.key
                return (
                  <button
                    key={t.key}
                    onClick={() => {
                      const next = t.key
                      setActiveTab(next)
                      const dest = tabToPath(next)
                      if (location.pathname !== dest) navigate(dest)
                    }}
                    className={`whitespace-nowrap pb-3 border-b-2 transition-colors ${
                      active
                        ? 'border-blue-600 text-gray-900'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

  {/* Content */}
  {activeTab === 'personal' ? (
        <div className="mt-4 grid grid-cols-12 gap-4">
          {/* Left column */}
          <div className="col-span-12 xl:col-span-6 space-y-4">
            <SectionCard
              title="Basic Info"
              subtitle="Visible to Patient"
              action={<button onClick={()=>setBasicOpen(true)} className="text-blue-600 text-sm inline-flex items-center gap-1"><Pencil size={14}/> Edit</button>}
            >
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <InfoField label="First Name" value={profile.basic?.firstName} />
                  <InfoField label="Last Name" value={profile.basic?.lastName} />
                  <InfoField label="Mobile Number" value={profile.basic?.phone} right={<span className="inline-flex items-center text-green-600 text-[12px]"><CheckCircle2 size={14} className="mr-1"/>Verified</span>} />
                  <InfoField label="Email" value={profile.basic?.email} right={<span className="inline-flex items-center text-green-600 text-[12px]"><CheckCircle2 size={14} className="mr-1"/>Verified</span>} />
                  <InfoField label="Gender" value={profile.basic?.gender?.charAt(0).toUpperCase() + profile.basic?.gender?.slice(1).toLowerCase()} />
                  <InfoField label="Language" value={profile.basic?.languages?.join(', ')} />
                  <InfoField label="City" value={profile.basic?.city} />
                  <InfoField label="Website" value={profile.basic?.website} />
                </div>

                <div className="mt-1">
                  <div className="text-gray-500 text-[13px]">Profile Headline</div>
                  <div className="text-[13px] text-gray-900 mt-1">{profile.basic?.headline}</div>
                </div>

                <div className="mt-1">
                  <div className="text-gray-500 text-[13px]">About</div>
                  <div className="text-[13px] text-gray-900 mt-1">{profile.basic?.about}</div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Educational Details"
              subtitle="Visible to Patient"
              action={<div className="flex items-center gap-2">
                <button onClick={() => {
                  setEduEditData(null);
                  setEduEditMode('add');
                  setEduOpen(true);
                }} className="text-blue-600 text-sm inline-flex items-center gap-1"><Upload size={14}/> Add</button>
              </div>}
            >
              <div className="space-y-3">
                {Array.isArray(education) && education.length > 0 ? (
                  education.map((ed, idx) => (
                    <div key={ed.id || idx} className="flex items-start gap-3 p-3 border border-gray-200 rounded-md">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">🎓</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 font-medium flex items-center gap-2">
                          {ed.degree}{ed.fieldOfStudy && ` in ${ed.fieldOfStudy}`}
                          <span className="text-[11px] text-gray-600 border border-gray-300 bg-gray-50 rounded px-1.5 py-0.5">{ed.graduationType}</span>
                        </div>
                        <div className="text-[12px] text-gray-600">{ed.instituteName}</div>
                        <div className="text-[12px] text-gray-600">{ed.startYear} - {ed.completionYear}</div>
                        {ed.proofDocumentUrl && (
                          <a className="text-[12px] text-blue-600 inline-flex items-center gap-1 mt-1" href={ed.proofDocumentUrl} target="_blank" rel="noreferrer" onClick={(e)=>e.preventDefault()}>
                            <FileText size={14}/> Document
                          </a>
                        )}
                        {ed.isVerified && (
                          <span className="inline-flex items-center text-green-600 text-[11px] ml-2">
                            <CheckCircle2 size={12} className="mr-1"/>Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            // Map API fields to drawer fields
                            const mappedData = {
                              id: ed.id,
                              school: ed.instituteName,
                              gradType: ed.graduationType,
                              degree: ed.degree,
                              field: ed.fieldOfStudy || '',
                              start: ed.startYear?.toString() || '',
                              end: ed.completionYear?.toString() || '',
                              proof: ed.proofDocumentUrl || ''
                            };
                            setEduEditData(mappedData);
                            setEduEditMode('edit');
                            setEduOpen(true);
                          }}
                          className="text-gray-400 hover:text-blue-600 transition"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={async () => {
                            if (window.confirm('Delete this education entry?')) {
                              await deleteEducation(ed.id);
                            }
                          }}
                          className="text-gray-400 hover:text-red-600 transition"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 text-center py-4">No education entries yet. Click Add to create one.</div>
                )}
              </div>
            </SectionCard>

            <SectionCard title="Awards & Publications" subtitle="Visible to Patient" action={<div className="flex items-center gap-2"><button onClick={()=>setAwardOpen(true)} className="text-blue-600 text-sm inline-flex items-center gap-1"><Upload size={14}/> Add Award</button><button onClick={()=>setPubOpen(true)} className="text-blue-600 text-sm inline-flex items-center gap-1"><Upload size={14}/> Add Publication</button></div>}>
              <div className="space-y-3">
                {Array.isArray(awards) && awards.map((aw) => (
                  <div key={aw.id} className="p-3 border border-gray-200 rounded-md flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900 font-medium">{aw.awardName}</div>
                      <div className="text-[12px] text-gray-600">{aw.issuerName}</div>
                      <div className="text-[12px] text-gray-600">{new Date(aw.issueDate).toLocaleDateString()}</div>
                      {aw.awardUrl && <a className="text-[12px] text-blue-600" href={aw.awardUrl} target="_blank" rel="noreferrer">View Certificate ↗</a>}
                      {aw.description && <div className="text-[12px] text-gray-700 mt-1">{aw.description}</div>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setAwardEditData(aw);
                          setAwardEditMode('edit');
                          setAwardOpen(true);
                        }}
                        className="text-gray-400 hover:text-blue-600 transition"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={async () => {
                          if (window.confirm('Delete this award?')) {
                            await deleteAward(aw.id);
                          }
                        }}
                        className="text-gray-400 hover:text-red-600 transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {Array.isArray(publications) && publications?.length > 0 ? (
                  <div className="pt-1">
                    <div className="text-[12px] text-gray-500 mb-1">Publications</div>
                    <div className="space-y-2">
                      {publications.map((p)=>(
                        <div key={p.id} className="p-3 border border-gray-200 rounded-md flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-900 font-medium">{p.title}</div>
                            <div className="text-[12px] text-gray-600">{p.publisher}</div>
                            <div className="text-[12px] text-gray-600">{new Date(p.publicationDate).toLocaleDateString()}</div>
                            {p.publicationUrl && <a className="text-[12px] text-blue-600" href={p.publicationUrl} target="_blank" rel="noreferrer">Link ↗</a>}
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setPubEditData(p);
                                setPubEditMode('edit');
                                setPubOpen(true);
                              }}
                              className="text-gray-400 hover:text-blue-600 transition"
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </button>
                            <button 
                              onClick={async () => {
                                if (window.confirm('Delete this publication?')) {
                                  await deletePublication(p.id);
                                }
                              }}
                              className="text-gray-400 hover:text-red-600 transition"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </SectionCard>
          </div>

          {/* Right column */}
          <div className="col-span-12 xl:col-span-6 space-y-4">
            <SectionCard
              title="Professional Details"
              subtitle="Visible to Patient"
            >
              <div className="grid grid-cols-12 gap-2 text-[13px]">
                <div className="col-span-12 text-[12px] text-gray-500">Medical Registration Details</div>
                <div className="col-span-12 -mt-1 text-[12px] text-[#6B7280]">To change your MRN proof please <a className="text-[#2F66F6]" href="#" onClick={(e)=>e.preventDefault()}>Call Us</a></div>
                <div className="col-span-12 md:col-span-6 space-y-3">
                  <InfoField label="Medical Council Registration Number" value={medicalRegistration?.medicalCouncilRegistrationNumber || '-'} />
                  <InfoField label="Registration Year" value={medicalRegistration?.registrationYear || '-'} />
                </div>
                <div className="col-span-12 md:col-span-6 space-y-3">
                  <InfoField label="Registration Council" value={medicalRegistration?.registrationCouncil || '-'} />
                  {medicalRegistration?.proofDocumentUrl && <InfoField label="" value={
                    <a href={medicalRegistration.proofDocumentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-600"><FileText size={14}/> View Document</a>
                  } />}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Practice Details" action={<button onClick={()=>setPracticeOpen(true)} className="text-blue-600 text-sm inline-flex items-center gap-1"><Pencil size={14}/> Edit</button>}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InfoField label="Work Experience" value={practiceDetails?.workExperience ? `${practiceDetails.workExperience} years` : '-'} />
                <InfoField label="Medical Practice Type" value={practiceDetails?.medicalPracticeType || '-'} />
                <div className="md:col-span-2">
                  <div className="text-[13px] text-gray-500">Specialization</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {Array.isArray(practiceDetails?.specialties) && practiceDetails.specialties.map((spec) => (
                      <Badge key={spec.id} color="blue" size="s">{spec.specialtyName} ({spec.expYears}y)</Badge>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-[13px] text-gray-500">Practice Area</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {Array.isArray(practiceDetails?.practiceArea) && practiceDetails.practiceArea.map((a) => (
                      <Badge key={a} color="gray" size="s">{a}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Experience Details" subtitle="Visible to Patient" action={<button onClick={()=>setExpOpen(true)} className="text-blue-600 text-sm inline-flex items-center gap-1"><Upload size={14}/> Add</button>}>
              <div className="space-y-3">
                {Array.isArray(experiences) && experiences.map((ex) => (
                  <div key={ex.id} className="p-3 border border-gray-200 rounded-md flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        {ex.jobTitle}
                        <span className="text-[11px] text-gray-600 border border-gray-300 bg-gray-50 rounded px-1.5 py-0.5">{ex.employmentType}</span>
                        {ex.isCurrentlyWorking && <span className="text-[11px] text-green-600 border border-green-300 bg-green-50 rounded px-1.5 py-0.5">Current</span>}
                      </div>
                      <div className="text-[12px] text-gray-600">{ex.hospitalOrClinicName}</div>
                      <div className="text-[12px] text-gray-600">
                        {new Date(ex.startDate).toLocaleDateString()} - {ex.isCurrentlyWorking ? 'Present' : new Date(ex.endDate).toLocaleDateString()}
                      </div>
                      {ex.description && <div className="text-[13px] text-gray-800 mt-1">{ex.description}</div>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setExpEditData(ex);
                          setExpEditMode('edit');
                          setExpOpen(true);
                        }}
                        className="text-gray-400 hover:text-blue-600 transition"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={async () => {
                          if (window.confirm('Delete this experience?')) {
                            await deleteExperience(ex.id);
                          }
                        }}
                        className="text-gray-400 hover:text-red-600 transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
  ) : activeTab === 'consultation' ? (
        <div className="mt-4 space-y-4">
          {/* In-Clinic Consultation Fees */}
          <SectionCard title="In-Clinic Consultations Fees" subtitle="Visible to Patient">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-8">
                  <Input label="First Time Consultation Fees:" placeholder="Value" icon={<span className='text-xs text-gray-500'>Rupees</span>} />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-8">
                  <Input label="Follow-up Consultation Fees:" placeholder="Value" icon={<span className='text-xs text-gray-500'>Rupees</span>} />
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2 text-sm">
              <input id="autoApprove" type="checkbox" className="h-4 w-4" />
              <label htmlFor="autoApprove" className="text-gray-700">Auto Approve Requested Appointment</label>
            </div>
          </SectionCard>

          {/* Consultation Hours */}
          <SectionCard
            title={<div className="flex items-center gap-3">
              <span>Set Your Consultation Hours</span>
              <span className="text-[12px] text-gray-600">Total Monthly Tokens Available: <span className='text-green-600 font-medium'>775 / 800</span></span>
            </div>}
          >
            <div className="grid grid-cols-12 gap-3 items-end">
              <div className="col-span-6 md:col-span-4 lg:col-span-3">
                <Input label="Average Consultation Min per Patient :" placeholder="Value" icon={<span className='text-xs text-gray-500'>Mins</span>} />
              </div>
            </div>

            {/* Days grid */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day, idx) => (
                <div key={day} className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{day}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Available</span>
                      <Toggle checked={idx===0} onChange={()=>{}} />
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Session 1:</span>
                      <TimeInput value={idx===0? '09:00' : ''} onChange={()=>{}} />
                      <span className="text-xs text-gray-400">-</span>
                      <TimeInput value={idx===0? '13:00' : ''} onChange={()=>{}} />
                      <span className="ml-2 text-xs text-gray-600 whitespace-nowrap">Token Available:</span>
                      <div className="w-24">
                        <input className="h-8 w-full text-xs border border-gray-300 rounded px-2" placeholder={idx===0? '25' : 'Value'} defaultValue={idx===0? '25' : ''} />
                      </div>
                    </div>
                    <button className="text-xs text-blue-600">+ Add More</button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Footer consent + Save */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="px-2 sm:px-4 md:px-6 py-3 flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-[12px] text-gray-600">
                <input type="checkbox" defaultChecked className="h-4 w-4" />
                In order to use the platform to its full potential and continue using your benefits, kindly accept our <a href="#" className="text-blue-600">Terms and conditions</a> and <a href="#" className="text-blue-600">Privacy policy</a>.
              </label>
              <button className="px-4 h-9 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      ) : activeTab === 'clinical' ? (
        <div className="mt-4 grid grid-cols-12 gap-4">
          {/* Clinic Info (Left) */}
          <div className="col-span-12 xl:col-span-6">
            <SectionCard title="Clinic Info" subtitle="Visible to Patient">
              <div className="space-y-3">
                <Input label="Clinic Name" compulsory placeholder="Clinic Name" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Mobile */}
                  <div>
                    <Input label="Mobile Number" placeholder="91753 67487" />
                    <div className="mt-1 text-[12px] text-green-600 inline-flex items-center gap-1">
                      <CheckCircle2 size={14}/> Verified
                    </div>
                  </div>
                  {/* Email */}
                  <div>
                    <Input label="Email" compulsory placeholder="email@example.com" />
                    <div className="mt-1 text-[12px] text-green-600 inline-flex items-center gap-1">
                      <CheckCircle2 size={14}/> Verified
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input label="Establishment Date" compulsory type="date" />
                  <div>
                    <label className="text-sm text-gray-700">Establishment Proof</label>
                    <div className="mt-1 h-[32px] border border-gray-300 rounded-lg flex items-center justify-between px-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-gray-100">📄</span>
                        Establishment.pdf
                      </div>
                      <button className="text-blue-600 text-xs">Change</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                  <div>
                    <label className="text-sm text-gray-700">Number of Beds</label>
                    <div className="mt-1 flex items-center gap-2">
                      <input className="h-8 w-full border border-gray-300 rounded-lg px-2 text-sm" placeholder="Enter Number of Beds" />
                      <span className="text-xs text-gray-500">Beds</span>
                    </div>
                  </div>
                </div>

                {/* About Clinic */}
                <div>
                  <div className="text-sm text-gray-700 mb-1">About Clinic</div>
                  <div className="border border-gray-200 rounded-md">
                    <div className="px-2 py-1 border-b border-gray-200 text-gray-600 text-sm flex items-center gap-2">
                      {/* Simple toolbar mimic */}
                      <button className="hover:text-gray-900">✎</button>
                      <button className="hover:text-gray-900 font-bold">B</button>
                      <button className="hover:text-gray-900 italic">I</button>
                      <button className="hover:text-gray-900 underline">U</button>
                      <button className="hover:text-gray-900">•</button>
                    </div>
                    <textarea className="w-full min-h-[140px] p-3 text-sm outline-none" defaultValue={profile.about} />
                    <div className="px-3 pb-2 text-[12px] text-gray-500 text-right">250/1600</div>
                  </div>
                </div>

                {/* Clinic Photos */}
                <div>
                  <div className="text-sm text-gray-700 mb-2">Clinic Photos</div>
                  <div className="flex flex-wrap gap-3 items-center">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-28 h-20 bg-gray-100 rounded-md border border-gray-200" />
                    ))}
                    <label className="w-40 h-20 border border-dashed border-gray-300 rounded-md grid place-items-center text-blue-600 text-sm cursor-pointer">
                      <input type="file" className="hidden" />
                      Upload File
                    </label>
                  </div>
                  <div className="text-[12px] text-gray-500 mt-1">Support Size upto 2MB in .png, .jpg, .svg, .webp</div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Clinic Address (Right) */}
          <div className="col-span-12 xl:col-span-6">
            <SectionCard title="Clinic Address" subtitle="Visible to Patient">
              <div className="space-y-3">
                <label className="text-sm text-gray-700">Map Location</label>
                <div className="h-[220px]">
                  <MapLocation heightClass="h-full" addButtonLabel="Add Location" />
                </div>

                {/* Address fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input label="Block no./Shop no./House no." compulsory placeholder="Shop No 2" />
                  <Input label="Road/Area/Street" compulsory placeholder="Jawahar Nagar, Gokul Colony" />
                  <Input label="Landmark" compulsory placeholder="Near Chowk" />
                  <Input label="Pincode" compulsory placeholder="444001" />
                  <Input label="City" compulsory placeholder="Akola" />
                  <div>
                    <label className="text-sm text-gray-700">State</label>
                    <select className="mt-1 h-8 w-full border border-gray-300 rounded-lg px-2 text-sm">
                      <option>Maharashtra</option>
                      <option>Karnataka</option>
                      <option>Gujarat</option>
                    </select>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Right column action bar to mirror screenshot spacing */}
            <div className="flex justify-end mt-4">
              <button className="px-4 h-9 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      ) : activeTab === 'staff' ? (
        <StaffTab />
      ) : (
        <div className="mt-6 text-sm text-gray-600">This section is under construction.</div>
      )}

      {/* Drawer: Edit Basic Info */}
      <BasicInfoDrawer
        open={basicOpen}
        onClose={()=>setBasicOpen(false)}
        initial={profile.basic}
        // onSave={(data) => { setProfile((p) => ({ ...p, ...data, name: `Dr. ${data.firstName} ${data.lastName}` })); setBasicOpen(false) }}
       
        onSave={async (data) => {
          try {
            // Only include fields that have values (partial update)
            const payload = {};
            
            if (data.firstName) payload.firstName = data.firstName;
            if (data.lastName) payload.lastName = data.lastName;
            if (data.gender) payload.gender = data.gender.toLowerCase();
            if (data.city) payload.city = data.city;
            // Only include website if it's a valid URL (not empty, not just '-' or placeholder)
            if (data.website && data.website.trim() !== '' && data.website.trim() !== '-' && (data.website.startsWith('http://') || data.website.startsWith('https://'))) {
              payload.website = data.website;
            }
            if (data.headline) payload.headline = data.headline;
            if (data.about) payload.about = data.about;
            if (data.languages && data.languages.length > 0) payload.languages = data.languages;

            const result = await updateBasicInfo(payload);
            
            if (result) {
              await fetchBasicInfo();
              setBasicOpen(false);
            } else {
              console.error('Update failed: no result returned');
              alert('Failed to update basic info. Please check the console for details.');
            }
          } catch (err) {
            console.error('Error updating basic info:', err);
            alert(`Failed to update: ${err.message || 'Unknown error'}`);
          }
        }}

      />

      {/* Drawer: Education */}
      <EducationDrawer
        open={eduOpen}
        onClose={() => {
          setEduOpen(false);
          setEduEditData(null);
          setEduEditMode('add');
        }}
        initial={eduEditData}
        mode={eduEditMode}
        onSave={async (ed) => {
          try {
            // Map drawer fields to API fields
            const payload = {
              instituteName: ed.school,
              graduationType: ed.gradType,
              degree: ed.degree,
              fieldOfStudy: ed.field || null,
              startYear: parseInt(ed.start) || null,
              completionYear: parseInt(ed.end) || null,
              proofDocumentUrl: ed.proof || null
            };

            if (eduEditMode === 'edit' && eduEditData?.id) {
              console.log('Updating education with ID:', eduEditData.id, 'Payload:', payload);
              await updateEducation(eduEditData.id, payload);
            } else {
              console.log('Adding new education. Payload:', payload);
              await addEducation(payload);
            }
            await fetchEducation(); // Refresh data
            setEduOpen(false);
            setEduEditData(null);
            setEduEditMode('add');
          } catch (err) {
            console.error('Failed to save education:', err);
          }
        }}
      />

      {/* Drawer: Experience */}
      <ExperienceDrawer
        open={expOpen}
        onClose={() => {
          setExpOpen(false);
          setExpEditData(null);
          setExpEditMode('add');
        }}
        initial={expEditData}
        mode={expEditMode}
        onSave={async (ex) => {
          try {
            const payload = {
              jobTitle: ex.role,
              employmentType: ex.type,
              hospitalOrClinicName: ex.org,
              startDate: ex.start,
              endDate: ex.current ? null : ex.end,
              isCurrentlyWorking: ex.current,
              description: ex.desc || null
            };

            if (expEditMode === 'edit' && expEditData?.id) {
              await updateExperience({ id: expEditData.id, ...payload });
            } else {
              await addExperience(payload);
            }
            await fetchExperiences(); // Refresh data
            setExpOpen(false);
            setExpEditData(null);
            setExpEditMode('add');
          } catch (err) {
            console.error('Failed to save experience:', err);
          }
        }}
      />

      {/* Drawer: Award */}
      <AwardDrawer
        open={awardOpen}
        onClose={() => {
          setAwardOpen(false);
          setAwardEditData(null);
          setAwardEditMode('add');
        }}
        initial={awardEditData}
        mode={awardEditMode}
        onSave={async (aw) => {
          try {
            const payload = {
              awardName: aw.title,
              issuerName: aw.issuer,
              associatedWith: aw.with || null,
              issueDate: aw.date,
              awardUrl: aw.url || null,
              description: aw.desc || null
            };

            if (awardEditMode === 'edit' && awardEditData?.id) {
              await updateAward({ id: awardEditData.id, ...payload });
            } else {
              await addAward(payload);
            }
            await fetchAwardsAndPublications(); // Refresh data
            setAwardOpen(false);
            setAwardEditData(null);
            setAwardEditMode('add');
          } catch (err) {
            console.error('Failed to save award:', err);
          }
        }}
      />

      {/* Drawer: Publication */}
      <PublicationDrawer
        open={pubOpen}
        onClose={() => {
          setPubOpen(false);
          setPubEditData(null);
          setPubEditMode('add');
        }}
        initial={pubEditData}
        mode={pubEditMode}
        onSave={async (pub) => {
          try {
            const payload = {
              title: pub.title,
              publisher: pub.publisher,
              publicationDate: pub.date,
              publicationUrl: pub.url || null,
              description: pub.desc || null
            };

            if (pubEditMode === 'edit' && pubEditData?.id) {
              await updatePublication({ id: pubEditData.id, ...payload });
            } else {
              await addPublication(payload);
            }
            await fetchAwardsAndPublications(); // Refresh data
            setPubOpen(false);
            setPubEditData(null);
            setPubEditMode('add');
          } catch (err) {
            console.error('Failed to save publication:', err);
          }
        }}
      />

      {/* Drawer: Professional Details */}
      <ProfessionalDrawer
        open={profOpen}
        onClose={()=>setProfOpen(false)}
        initial={profile.registration}
        onSave={async (reg) => {
  try {
    await usePracticeStore.getState().updateProfessionalDetails(reg);
    await fetchProfessionalDetails(); // Refresh data
    setProfOpen(false);
  } catch (err) { console.error(err); }
}}

      />

      {/* Drawer: Practice Details */}
      <PracticeDrawer
        open={practiceOpen}
        onClose={()=>setPracticeOpen(false)}
        initial={practiceDetails}
        onSave={async (data) => {
          try {
            const payload = {};
            if (data.workExperience) payload.workExperience = parseInt(data.workExperience);
            if (data.medicalPracticeType) payload.medicalPracticeType = data.medicalPracticeType;
            if (data.practiceArea && data.practiceArea.length > 0) payload.practiceArea = data.practiceArea;
            
            await updatePracticeDetails(payload);
            await fetchProfessionalDetails(); // Refresh data
            setPracticeOpen(false);
          } catch (err) {
            console.error('Error updating practice details:', err);
            alert('Failed to update practice details');
          }
        }}
      />

    </div>
  )
}

export default Doc_settings
