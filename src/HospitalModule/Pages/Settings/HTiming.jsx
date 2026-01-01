import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AvatarCircle from '../../../components/AvatarCircle'
import Toggle from '../../../components/FormItems/Toggle'
import TimeInput from '../../../components/FormItems/TimeInput'
import { hospital as coverImg } from '../../../../public/index.js'

const SectionCard = ({ children }) => (
  <div className=" rounded-lg ">
    
    <div className="p-4">{children}</div>
  </div>
)

export default function HTiming(){
  const location = useLocation()
  const navigate = useNavigate()

  const tabs = [
    { key: 'account', label: 'Account Details', path: '/hospital/settings/account' },
    { key: 'timing', label: 'Timing and Schedule', path: '/hospital/settings/timing' },
    { key: 'surgeries', label: 'Surgeries', path: '/hospital/settings/surgeries' },
    { key: 'staff', label: 'Staff Permissions', path: '/hospital/settings/staff-permissions' },
    { key: 'security', label: 'Security Settings', path: '/hospital/settings/security' },
  ]

  const activeKey = useMemo(() => {
    const p = location.pathname
    if (p.endsWith('/settings/account')) return 'account'
    if (p.endsWith('/settings/timing')) return 'timing'
    if (p.endsWith('/settings/surgeries')) return 'surgeries'
    if (p.endsWith('/settings/staff-permissions')) return 'staff'
    if (p.endsWith('/settings/security')) return 'security'
    return 'timing'
  }, [location.pathname])

  const [activeTab, setActiveTab] = useState(activeKey)
  useEffect(() => setActiveTab(activeKey), [activeKey])

  const profile = useMemo(() => ({ name: 'Manipal Hospital - Baner', status: 'Active', location: 'Baner, Pune' }), [])

  const dayList = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  const [availability, setAvailability] = useState(() => dayList.reduce((a,d)=>({ ...a, [d]: true }), {}))
  const [allDay, setAllDay] = useState(() => dayList.reduce((a,d)=>({ ...a, [d]: false }), {}))
  const [sessions, setSessions] = useState(() => dayList.reduce((a,d)=>({ ...a, [d]: 1 }), {}))

  const addSession = (day) => setSessions((s) => ({ ...s, [day]: (s[day]||0) + 1 }))

  return (
    <div className="px-6 pb-10 bg-secondary-grey50">
      {/* Header with banner + avatar + tabs (hospital) */}
      <div className="-mx-6">
        <div className="relative">
          <img src={coverImg} alt="cover" className="w-full h-40 object-cover" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="rounded-full ring-4 ring-white shadow-md">
              <AvatarCircle name={profile.name} size="l" color="blue" className="w-24 h-24 text-3xl" />
            </div>
          </div>
        </div>
        <div className=" border-b border-gray-200">
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

      {/* Timing and Schedule content */}
      {activeTab === 'timing' && (
        <div className="mt-4">
           
          <SectionCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dayList.map((day) => {
                const enabled = availability[day]
                const count = sessions[day] || 0
                return (
                  <div key={day} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-medium secondary:text-gray-400">{day}</span>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Available</span>
                        <div onClick={()=>setAvailability((a)=>({ ...a, [day]: !a[day] }))}>
                          <Toggle checked={enabled} />
                        </div>
                      </div>
                    </div>
                     <div className="my-3 h-px bg-gray-200" />
                    <div className={`mt-2 space-y-2 ${!enabled ? 'opacity-60' : ''}`}>
                      {/* first session row label */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    
                    {/* Label */}
                    <div className="text-sm text-secondary-gray-300 sm:w-[140px]">
                      Availability Time:
                    </div>

                    {/* Time inputs */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                      
                      <TimeInput
                        label=""
                        disabled={!enabled || allDay[day]}
                        defaultValue="09:00 AM"
                      />

                      {/* Dash */}
                      <span className="hidden sm:flex items-center justify-center text-[14px] text-secondary-gray-300">
                        –
                      </span>

                      <TimeInput
                        label=""
                        disabled={!enabled || allDay[day]}
                        defaultValue="06:00 PM"
                      />
                    </div>

                    {/* Add more */}
                    <div className="text-right sm:text-left sm:w-[90px]">
                      <button
                        type="button"
                        disabled={!enabled || allDay[day]}
                        onClick={() => addSession(day)}
                        className={`text-sm text-blue-600 ${
                          !enabled || allDay[day]
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:underline"
                        }`}
                      >
                        + Add More
                      </button>
                    </div>
                  </div>

                      {/* extra sessions */}
                      {Array.from({ length: Math.max(0, count-1) }).map((_, i) => (
                        <div key={i} className="grid grid-cols-12 items-center gap-2">
                          <div className="col-span-12 sm:col-span-3 text-sm text-gray-700">Availability Time:</div>
                          <div className="col-span-6 sm:col-span-3"><TimeInput label="" disabled={!enabled || allDay[day]} defaultValue={'03:00 PM'} /></div>
                          <div className="col-span-6 sm:col-span-3"><TimeInput label="" disabled={!enabled || allDay[day]} defaultValue={'06:00 PM'} /></div>
                        </div>
                      ))}
                      <label className="flex items-center gap-2 text-[13px] text-gray-700">
                        <input type="checkbox" className="h-4 w-4" checked={allDay[day]} onChange={(e)=>setAllDay((a)=>({ ...a, [day]: e.target.checked }))} />
                        <span>Available 24 Hours</span>
                      </label>
                    </div>
                  </div>
                )
              })}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  )
}
