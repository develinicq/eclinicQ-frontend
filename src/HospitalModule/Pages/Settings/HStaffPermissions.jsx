import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'
import AvatarCircle from '../../../components/AvatarCircle'
import { Eye, Pencil, ChevronDown, Trash2, UserPlus, ShieldPlus, ClipboardList, Crown } from 'lucide-react'
import { hospital as coverImg } from '../../../../public/index.js'

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-lg border border-gray-200">
    <div className="px-4 py-3 border-b border-gray-200">
      <div className="text-sm font-medium text-gray-900">{title}</div>
    </div>
    <div className="p-4">{children}</div>
  </div>
)

export default function HStaffPermissions(){
  const location = useLocation()
  const navigate = useNavigate()

  const tabs = [
    { key: 'account', label: 'Account Details', path: '/hospital/settings/account' },
    { key: 'timing', label: 'Timing and Schedule', path: '/hospital/settings/timing' },
    { key: 'surgeries', label: 'Surgeries', path: '/hospital/settings/surgeries' },
    { key: 'branches', label: 'Branches', path: '/hospital/settings/branches' },
    { key: 'staff', label: 'Staff Permissions', path: '/hospital/settings/staff-permissions' },
    { key: 'security', label: 'Security Settings', path: '/hospital/settings/security' },
  ]

  const activeKey = useMemo(() => {
    const p = location.pathname
    if (p.endsWith('/settings/account')) return 'account'
    if (p.endsWith('/settings/timing')) return 'timing'
    if (p.endsWith('/settings/surgeries')) return 'surgeries'
    if (p.endsWith('/settings/branches')) return 'branches'
    if (p.endsWith('/settings/staff-permissions')) return 'staff'
    if (p.endsWith('/settings/security')) return 'security'
    return 'staff'
  }, [location.pathname])

  const [activeTab, setActiveTab] = useState(activeKey)
  useEffect(() => setActiveTab(activeKey), [activeKey])

  const profile = useMemo(() => ({ name: 'Manipal Hospital - Baner', status: 'Active', location: 'Baner, Pune' }), [])

  return (
    <div className="px-6 pb-10">
      <div className="-mx-6">
        <div className="relative">
          <img src={coverImg} alt="cover" className="w-full h-40 object-cover" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="rounded-full ring-4 ring-white shadow-md">
              <AvatarCircle name={profile.name} size="l" color="blue" className="w-24 h-24 text-3xl" />
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 pt-10">
            <div className="flex items-center justify-between">
              <div className="text-center mx-auto">
                <div className="text-lg font-medium text-gray-900">{profile.name}</div>
                <div className="text-green-600 text-sm">{profile.status}</div>
              </div>
              <div className="text-sm text-gray-600">{profile.location}</div>
            </div>
            <nav className="mt-3 flex items-center gap-6 overflow-x-auto text-sm">
              {tabs.map((t) => (
                <button key={t.key} onClick={() => navigate(t.path)} className={`whitespace-nowrap pb-3 border-b-2 transition-colors ${activeTab===t.key? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* Full Staff Permissions UI copied (not linked) */}
      <div className="mt-6">
        <StaffUI />
      </div>
    </div>
  )
}

// --- Copied Staff Permissions UI (self-contained) ---
const StaffUI = () => {
  const TabBtn = ({ label, active, onClick }) => (
    <button onClick={onClick} className={`px-3 py-1 text-[12px] md:text-sm rounded-md border bg-white transition-colors ${active ? 'text-[#2F66F6] border-[#BFD3FF] shadow-[0_1px_2px_rgba(0,0,0,0.02)]' : 'text-[#626060] border-[#E6E6E6] hover:bg-[#F9FAFB] hover:text-[#424242]'}`} aria-selected={active} role="tab">{label}</button>
  )

  const InfoBanner = () => (
    <div className="flex items-start gap-2 border rounded-md px-3 py-2 bg-[#F6FAFF] border-[#D8E7FF] text-[#3A6EEA]">
      <img src="/i-icon.png" alt="info" className="w-4 h-4 mt-0.5" />
      <p className="text-[12px] leading-5">Staff will receive an email invitation to create their account and set up Secure Account</p>
    </div>
  )

  const Field = ({ label, required, children }) => (
    <label className="block"><span className="text-[12px] text-[#424242] font-medium">{label} {required && <span className="text-red-500">*</span>}</span><div className="mt-1">{children}</div></label>
  )
  const TextInput = (props) => (<input {...props} className={'w-full h-9 px-3 rounded-md border outline-none text-sm placeholder:text-[#9AA1A9] border-[#E6E6E6] focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF]'} />)
  const Select = ({ children, ...props }) => (
    <div className="relative">
      <select {...props} className={'w-full h-9 pr-8 pl-3 rounded-md border outline-none text-sm appearance-none border-[#E6E6E6] focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF]'}>{children}</select>
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
    useEffect(() => { const id = setInterval(() => setActive((a) => (a + 1) % 3), 2600); return () => clearInterval(id) }, [])
    const colors = ['#FECACA', '#FDE68A', '#BFDBFE']
    const positions = (i) => { const rel = (i - active + 3) % 3; if (rel === 0) return { pos: 'center' }; if (rel === 1) return { pos: 'right' }; return { pos: 'left' } }
    const styleFor = (pos) => pos==='center'?{ left:'50%', transform:'translate(-50%, -50%) scale(1)', zIndex:30 }: (pos==='left'?{ left:'30%', transform:'translate(-50%, -50%) scale(0.88)', zIndex:20 }:{ left:'70%', transform:'translate(-50%, -50%) scale(0.88)', zIndex:20 })
    return (
      <div className="relative w-[520px] max-w-[90vw] h-[180px]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-36 bg-[#EAF2FF] rounded-full" />
        {[0,1,2].map((i) => { const { pos } = positions(i); const center = pos==='center'; return (
          <div key={i} className={'absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out drop-shadow-sm rounded-lg bg-white ring-1 ' + (center ? 'ring-[#BFD3FF]' : 'ring-[#E6ECFF]')} style={{ width: center ? 140 : 108, height: center ? 172 : 134, ...styleFor(pos) }}><CardSVG color={colors[i]} /></div>
        )})}
      </div>
    )
  }

  const StaffRow = ({ data }) => (
    <div className='border border-[#E2E2E2] rounded-lg bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]' style={{borderWidth: '0.5px', width: '280px', minHeight: '228px'}}>
      <div className='flex items-start gap-2'>
        <div className='w-12 h-12 rounded-full grid place-items-center text-[#2F66F6] bg-white border border-[#DDE6FF]'><span className='font-semibold'>{data.name?.[0]?.toUpperCase() || 'U'}</span></div>
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
        <button className='h-8 px-3 rounded-md border text-[12px] text-[#424242] hover:bg-gray-50 inline-flex items-center gap-1'><Eye size={14} /> View</button>
        <button className='h-8 px-3 rounded-md border text-[12px] text-[#424242] hover:bg-gray-50 inline-flex items-center gap-1'><Pencil size={14} /> Edit</button>
        <div className='ml-auto flex'>
          <button className='h-8 px-3 rounded-l-md text-[12px] bg-[#FFF4CC] border border-[#F5E2A4] text-[#6B5E2F]'>Inactive</button>
          <button className='h-8 px-2 rounded-r-md border border-l-0 border-[#F5E2A4] bg-[#FFF4CC] text-[#6B5E2F] grid place-items-center'><ChevronDown size={16} /></button>
        </div>
      </div>
    </div>
  )

  const RoleCard = ({ role }) => { const Icon = role.icon === 'crown' ? Crown : ClipboardList; return (
    <div className='border border-[#E2E2E2] rounded-lg bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]' style={{borderWidth: '0.5px', width: '280px', minHeight: '180px'}}>
      <div className='flex items-start gap-2'>
        <div className='w-9 h-9 rounded-full grid place-items-center text-[#2F66F6] bg-white border border-[#DDE6FF]'><Icon size={16} /></div>
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
  )}

  const InviteStaffDrawer = ({ open, onClose, onSend }) => {
    const [mode, setMode] = useState('individual')
    const [rows, setRows] = useState([{ id: 0, fullName: '', email: '', phone: '', position: '', role: '' }])
    useEffect(() => { const onEsc = (e) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', onEsc); return () => window.removeEventListener('keydown', onEsc) }, [onClose])
    if (!open) return null
    const removeRow = (id) => setRows((r) => (r.length > 1 ? r.filter((x) => x.id !== id) : r))
    const addRow = () => setRows((r) => [...r, { id: (r[r.length - 1]?.id ?? 0) + 1, fullName: '', email: '', phone: '', position: '', role: '' }])
    const onChangeRow = (id, field, value) => setRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
    const emailOk = (e) => /.+@.+\..+/.test(e)
    const allValid = rows.every((x) => x.fullName && emailOk(x.email) && x.phone && x.position && x.role)
    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />
        <aside className="absolute top-16 right-5 bottom-5 w-full max-w-[600px] bg-white shadow-2xl border border-[#E6E6E6] rounded-xl overflow-hidden animate-[slideIn_.3s_ease-out_forwards]" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#EFEFEF]">
            <h3 className="text-[16px] font-semibold text-[#424242]">Invite Staff</h3>
            <div className="flex items-center gap-3">
              <button disabled={!allValid} className={'text-xs md:text-sm h-8 px-3 rounded-md transition ' + (!allValid ? 'bg-[#F2F2F2] text-[#9AA1A9] cursor-not-allowed' : 'bg-[#2F66F6] text-white hover:bg-[#1e4cd8]')} onClick={() => allValid && onSend(rows)}>Send Invite</button>
              <button onClick={onClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-3 overflow-y-auto h-[calc(100%-56px)]">
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
            <div className="text-center"><button onClick={addRow} className="text-[13px] font-medium text-[#2F66F6] hover:text-[#1e4cd8]">Add More Staff Members</button></div>
          </div>
        </aside>
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0%); } }`}</style>
      </div>
    )
  }

  const RoleDrawer = ({ open, onClose, onCreate }) => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [checked, setChecked] = useState({})
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
        { k: 'queue_manage', label: 'Manage Apppts' },
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
    if (!open) return null
    const toggle = (k) => setChecked((c) => ({ ...c, [k]: !c[k] }))
    const groupAll = (gKey, value) => { const up = { ...checked }; const g = groups.find((g) => g.key === gKey); g.items.forEach((it) => (up[it.k] = value)); setChecked(up) }
    const selectedCount = Object.values(checked).filter(Boolean).length
    const canCreate = name.trim().length > 0 && selectedCount > 0
    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />
        <aside className="absolute top-16 right-5 bottom-5 w-full max-w-[600px] bg-white shadow-2xl border border-[#E6E6E6] rounded-xl overflow-hidden animate-[slideIn_.3s_ease-out_forwards]" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#EFEFEF]">
            <h3 className="text-[16px] font-semibold text-[#424242]">Create User Role</h3>
            <div className="flex items-center gap-3">
              <button disabled={!canCreate} className={'text-xs md:text-sm h-8 px-3 rounded-md transition ' + (!canCreate ? 'bg-[#F2F2F2] text-[#9AA1A9] cursor-not-allowed' : 'bg-[#2F66F6] text-white hover:bg-[#1e4cd8]')} onClick={() => canCreate && onCreate({ name, subtitle: 'Limited System Access', staffCount: 0, permissions: selectedCount, created: new Date().toLocaleDateString('en-GB'), icon: 'clipboard', description: desc })}>Create</button>
              <button onClick={onClose} className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100" aria-label="Close">✕</button>
            </div>
          </div>
          <div className="px-3 py-2 flex flex-col gap-2 overflow-y-auto h-[calc(100%-56px)]">
            <label className="block"><span className="text-[12px] text-[#424242] font-medium">Role Name <span className="text-red-500">*</span></span><input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter staff full name" className="w-full h-9 px-3 mt-1 rounded-md border border-[#E6E6E6] focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF] outline-none text-sm" /></label>
            <label className="block"><span className="text-[12px] text-[#424242] font-medium">Description</span><textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Describe the role" rows={3} className="w-full px-3 py-2 mt-1 rounded-md border border-[#E6E6E6] focus:border-[#BFD3FF] focus:ring-2 focus:ring-[#EAF2FF] outline-none text-sm" /></label>
            <div><div className="text-[12px] text-[#424242] font-medium">Permissions <span className="text-red-500">*</span></div>
              <div className="mt-2 flex flex-col gap-3">
                {groups.map((g) => { const allChecked = g.items.every((it) => checked[it.k]); return (
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
                )})}
              </div>
            </div>
          </div>
        </aside>
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0%); } }`}</style>
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
          <button onClick={() => setInviteOpen(true)} className='text-[13px] md:text-sm font-medium text-[#2F66F6] hover:text-[#1e4cd8]'>+ Invite Staff</button>
        ) : (
          <button onClick={() => setRoleOpen(true)} className='text-[13px] md:text-sm font-medium text-[#2F66F6] hover:text-[#1e4cd8]'>+ New Role</button>
        )}
      </div>

      {tab === 'staff' ? (
        staff.length === 0 ? (
          <div className='border border-[#E6E6E6] rounded-md bg-white min-h-[220px] flex items-center justify-center'>
            <div className='flex flex-col items-center text-center gap-3 py-8 px-4'>
              <AvatarCarousel />
              <p className='max-w-[560px] text-xs md:text-sm text-[#626060]'>Staff will receive an email invitation to create their account and set up Secure Account</p>
              <button onClick={() => setInviteOpen(true)} className='text-[13px] md:text-sm font-medium text-[#2F66F6] hover:text-[#1e4cd8]'>+ Invite Staff</button>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,280px))] justify-start gap-4 pt-1'>
            {staff.map((m, idx) => (<StaffRow key={idx} data={m} />))}
            <button onClick={() => setInviteOpen(true)} className='rounded-lg w-[280px] min-h-[228px] flex items-center justify-center flex-col gap-2 text-[#2F66F6] border-2 border-dashed border-[#CFE0FF] hover:bg-[#F8FBFF] p-3'>
              <span className='w-10 h-10 rounded-full grid place-items-center border border-[#BFD3FF] text-[#2F66F6]'><UserPlus size={18} /></span>
              <span className='text-[13px]'>Invite More Users</span>
            </button>
          </div>
        )
      ) : (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,280px))] justify-start gap-4 pt-1'>
          {roles.map((role, i) => (<RoleCard key={i} role={role} />))}
          <button onClick={() => setRoleOpen(true)} className='rounded-lg w-[280px] min-h-[180px] flex items-center justify-center flex-col gap-2 text-[#2F66F6] border-2 border-dashed border-[#CFE0FF] hover:bg-[#F8FBFF] p-3'>
            <span className='w-10 h-10 rounded-full grid place-items-center border border-[#BFD3FF] text-[#2F66F6]'><ShieldPlus size={18} /></span>
            <span className='text-[13px] text-[#3A6EEA]'>Create New Role</span>
          </button>
        </div>
      )}

      <InviteStaffDrawer open={inviteOpen} onClose={() => setInviteOpen(false)} onSend={(rows) => { const mapped = rows.map((r) => ({ name: r.fullName, email: r.email, phone: r.phone, position: r.position, role: r.role, status: 'Inactive' })); setStaff((s) => [...mapped, ...s]); setInviteOpen(false) }} />
      <RoleDrawer open={roleOpen} onClose={() => setRoleOpen(false)} onCreate={(role) => { setRoles((r) => [role, ...r]); setRoleOpen(false) }} />
    </div>
  )
}
