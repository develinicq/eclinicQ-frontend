import React, { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Pencil, Phone, Mail, MapPin, Upload, FileText, Trash2, ChevronDown, UserPlus, Eye, ShieldPlus, ClipboardList, Crown } from 'lucide-react'
import AvatarCircle from '../../../components/AvatarCircle'
import Badge from '../../../components/Badge'
import { hospital } from '../../../../public/index.js'
import Input from '../../../components/FormItems/Input'
import Toggle from '../../../components/FormItems/Toggle'
import TimeInput from '../../../components/FormItems/TimeInput'
import MapLocation from '../../../components/FormItems/MapLocation'

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
    useEffect(() => {
      const onEsc = (e) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onEsc)
      return () => window.removeEventListener('keydown', onEsc)
    }, [onClose])
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
            <div className="text-center">
              <button onClick={addRow} className="text-[13px] font-medium text-[#2F66F6] hover:text-[#1e4cd8]">Add More Staff Members</button>
            </div>
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
    if (!open) return null
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

  // Mocked data for UI scaffolding (replace with real API later)
  const profile = useMemo(() => ({
    name: 'Dr. Milind Chauhan',
    firstName: 'Milind',
    lastName: 'Chauhan',
    phone: '91753 67487',
    email: 'milindchauhan@gmail.com',
    gender: 'Male',
    languages: ['English', 'Hindi', 'Marathi'],
    city: 'Akola, Maharashtra',
    website: '-',
    headline:
      'Dr. Milind Chauhan practices Gynaecologist and Obstetrician in Andheri East, Mumbai and has 13 years of experience in this field.',
    about:
      'Dr. Milind Chauhan practices Gynaecologist and Obstetrician in Andheri East, Mumbai and has 13 years of experience in this field. He has completed his DNB - Obstetric and Gynecology and MBBS. Dr. Milind Chauhan has gained the confidence of patients and is a popular Gynaecologist and Obstetrician expert in Mumbai who performs treatment and procedures for various health issues related to Gynaecologist and Obstetrician.',
    registration: {
      mrn: 'MCMI789456',
      year: '2015',
      council: 'Maharashtra Medical Council',
      proof: 'MRN Proof.pdf',
    },
    practice: {
      experience: '20 Years',
      type: 'Homeopathy',
      specialization: 'General Medicine (Exp: 19 years)',
      areas: ['Cough', 'Cold', 'Headache', 'Nausea', 'Dizziness', 'Muscle Pain', 'Sore Throat'],
    },
    education: [
      {
        title: 'MBBS in General Medicine',
        tag: 'Graduation',
        college: 'Grant Medical College, Mumbai',
        duration: '2010 - 2014',
        certificate: 'Degree_Certificate.pdf',
      },
      {
        title: 'MD in General Medicine',
        tag: 'Post-Graduation',
        college: 'Grant Medical College, Mumbai',
        duration: '2014 - 2017',
        certificate: 'Degree_Certificate.pdf',
      },
    ],
    experienceList: [
      {
        role: 'General Physician - CEO',
        type: 'Full-Time',
        org: 'Chauhan Clinic, Jawahar Nagar, Akola',
        duration: 'Aug, 2014 – Present  |  4 Yrs',
        location: 'Akola, Maharashtra',
        desc:
          'As a dedicated personal clinic owner, I bring over a decade of experience in the healthcare field, passionately guiding aspiring medical professionals. My training sessions are interactive and focused on real-world challenges.',
      },
      {
        role: 'Trainee General Physician',
        type: 'Part-Time',
        org: 'Manipal Hospital, Baner Pune',
        duration: 'Sept, 2010 – Aug, 2014  |  4 Yrs',
        location: 'Pune, Maharashtra',
        desc:
          'As a part-time trainer, I bring over ten years of expertise in the healthcare sector, dedicated to mentoring future medical professionals. I lead engaging training sessions focused on practical learning.',
      },
    ],
    awards: [
      { title: 'Best Plasticene Award', org: 'Manipal hospital', date: 'May, 2017', link: 'Certificate' },
      { title: 'Best Plasticene Award', org: 'Manipal hospital', date: 'May, 2017', link: 'Certificate' },
    ],
  }), [])

  return (
    <div className="px-6 pb-10">
      {/* Top banner + centered avatar + tabs (as in screenshot) */}
      <div className="-mx-6">
        <div className="relative">
          <img src={hospital} alt="cover" className="w-full h-40 object-cover" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="rounded-full ring-4 ring-white shadow-md">
              <AvatarCircle name={profile.name} size="l" color="blue" className="w-24 h-24 text-3xl" />
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
              action={<button className="text-blue-600 text-sm inline-flex items-center gap-1"><Pencil size={14}/> Edit</button>}
            >
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <InfoField label="First Name" value={profile.firstName} />
                  <InfoField label="Last Name" value={profile.lastName} />
                  <InfoField label="Mobile Number" value={profile.phone} right={<span className="inline-flex items-center text-green-600 text-[12px]"><CheckCircle2 size={14} className="mr-1"/>Verified</span>} />
                  <InfoField label="Email" value={profile.email} right={<span className="inline-flex items-center text-green-600 text-[12px]"><CheckCircle2 size={14} className="mr-1"/>Verified</span>} />
                  <InfoField label="Gender" value={profile.gender} />
                  <InfoField label="Gender" value={profile.languages?.join(' ')} />
                  <InfoField label="City" value={profile.city} />
                  <InfoField label="Website" value={profile.website} />
                </div>

                <div className="mt-1">
                  <div className="text-gray-500 text-[13px]">Profile Headline</div>
                  <div className="text-[13px] text-gray-900 mt-1">{profile.headline}</div>
                </div>

                <div className="mt-1">
                  <div className="text-gray-500 text-[13px]">About</div>
                  <div className="text-[13px] text-gray-900 mt-1">{profile.about}</div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Educational Details"
              subtitle="Visible to Patient"
              action={<button className="text-blue-600 text-sm inline-flex items-center gap-1"><Upload size={14}/> Add</button>}
            >
              <div className="space-y-3">
                {profile.education.map((ed, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 border border-gray-200 rounded-md">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">🎓</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900 font-medium flex items-center gap-2">
                        {ed.title}
                        <span className="text-[11px] text-gray-600 border border-gray-300 bg-gray-50 rounded px-1.5 py-0.5">{ed.tag}</span>
                      </div>
                      <div className="text-[12px] text-gray-600">{ed.college}</div>
                      <div className="text-[12px] text-gray-600">{ed.duration}</div>
                      <a className="text-[12px] text-blue-600 inline-flex items-center gap-1 mt-1" href="#" onClick={(e)=>e.preventDefault()}>
                        <FileText size={14}/> {ed.certificate}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Awards & Publications" subtitle="Visible to Patient" action={<button className="text-blue-600 text-sm inline-flex items-center gap-1"><Upload size={14}/> Add</button>}>
              <div className="space-y-3">
                {profile.awards.map((aw, i) => (
                  <div key={i} className="p-3 border border-gray-200 rounded-md">
                    <div className="text-sm text-gray-900 font-medium">{aw.title}</div>
                    <div className="text-[12px] text-gray-600">{aw.org}</div>
                    <div className="text-[12px] text-gray-600">{aw.date}</div>
                    <a className="text-[12px] text-blue-600" href="#" onClick={(e)=>e.preventDefault()}>{aw.link} ↗</a>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Right column */}
          <div className="col-span-12 xl:col-span-6 space-y-4">
            <SectionCard
              title="Professional Details"
              subtitle="Visible to Patient"
              action={<button className="text-blue-600 text-sm inline-flex items-center gap-1"><Pencil size={14}/> Edit</button>}
            >
              <div className="grid grid-cols-12 gap-2 text-[13px]">
                <div className="col-span-12 text-[12px] text-gray-500">Medical Registration Details</div>
                <div className="col-span-12 md:col-span-6 space-y-3">
                  <InfoField label="Medical Council Registration Number" value={profile.registration.mrn} />
                  <InfoField label="Registration Year" value={profile.registration.year} />
                </div>
                <div className="col-span-12 md:col-span-6 space-y-3">
                  <InfoField label="Registration Council" value={profile.registration.council} />
                  <InfoField label="" value={
                    <span className="inline-flex items-center gap-1 text-blue-600"><FileText size={14}/> {profile.registration.proof}</span>
                  } />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Practice Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InfoField label="Work Experience" value={profile.practice.experience} />
                <InfoField label="Medical Practice Type" value={profile.practice.type} />
                <InfoField label="Specialization" value={profile.practice.specialization} />
                <div className="md:col-span-2">
                  <div className="text-[13px] text-gray-500">Practice Area</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {profile.practice.areas.map((a) => (
                      <Badge key={a} color="gray" size="s">{a}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Experience Details" subtitle="Visible to Patient" action={<button className="text-blue-600 text-sm inline-flex items-center gap-1"><Upload size={14}/> Add</button>}>
              <div className="space-y-3">
                {profile.experienceList.map((ex, idx) => (
                  <div key={idx} className="p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      {ex.role}
                      <span className="text-[11px] text-gray-600 border border-gray-300 bg-gray-50 rounded px-1.5 py-0.5">{ex.type}</span>
                    </div>
                    <div className="text-[12px] text-gray-600">{ex.org}</div>
                    <div className="text-[12px] text-gray-600">{ex.duration}</div>
                    <div className="text-[12px] text-gray-600 flex items-center gap-1"><MapPin size={14}/>{ex.location}</div>
                    <div className="text-[13px] text-gray-800 mt-1">{ex.desc}</div>
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
    </div>
  )
}

export default Doc_settings
