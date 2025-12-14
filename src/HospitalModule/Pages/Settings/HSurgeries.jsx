import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AvatarCircle from '../../../components/AvatarCircle'
import { hospital as coverImg } from '../../../../public/index.js'
import { Pencil, Trash2, ChevronsUpDown } from 'lucide-react'

const SectionCard = ({ title, action, children }) => (
  <div className="bg-white rounded-lg border border-gray-200">
    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
      <div className="text-sm font-medium text-gray-900">{title}</div>
      {action}
    </div>
    <div className="p-4">{children}</div>
  </div>
)

export default function HSurgeries(){
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
    return 'surgeries'
  }, [location.pathname])

  const [activeTab, setActiveTab] = useState(activeKey)
  useEffect(() => setActiveTab(activeKey), [activeKey])

  const profile = useMemo(() => ({ name: 'Manipal Hospital - Baner', status: 'Active', location: 'Baner, Pune' }), [])

  // Local UI-only state for surgeries list
  const [surgeries, setSurgeries] = useState([
    { id: 1, name: 'Appendectomy', description: 'Surgical removal of the appendix, usually performed to treat appendicitis.' },
    { id: 2, name: 'Hernia Repair Surgery', description: 'Correction of hernias in the abdomen or groin using open or laparoscopic techniques.' },
    { id: 3, name: 'Cholecystectomy', description: 'Surgical removal of the gallbladder, commonly performed to treat gallstones.' },
    { id: 4, name: 'Knee Arthroscopy', description: 'Minimally invasive surgery on the knee joint using an arthroscope to diagnose or treat issues.' },
    { id: 5, name: 'Coronary Bypass Surgery', description: 'Surgical procedure to restore normal blood flow to an obstructed coronary artery.' },
    { id: 6, name: 'Cataract Surgery', description: 'Procedure to remove the cloudy lens of the eye and replace it with an artificial one.' },
    { id: 7, name: 'Hip Replacement Surgery', description: 'Surgical procedure to replace a damaged hip joint with a prosthetic implant.' },
    { id: 8, name: 'Rhinoplasty', description: 'Surgical procedure to reshape the nose for aesthetic or functional improvement.' },
  ])
  const [selected, setSelected] = useState(() => new Set())
  const allSelected = surgeries.length > 0 && selected.size === surgeries.length
  const toggleAll = () => {
    setSelected((sel) => (sel.size === surgeries.length ? new Set() : new Set(surgeries.map((s) => s.id))))
  }
  const toggleOne = (id) => setSelected((sel) => { const n = new Set(sel); n.has(id) ? n.delete(id) : n.add(id); return n })
  const onDelete = (id) => setSurgeries((list) => list.filter((x) => x.id !== id))

  return (
    <div className="px-6 pb-10">
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

      {/* Surgeries content */}
      {activeTab === 'surgeries' && (
        <div className="mt-4">
          {/* Card-like table container without separate title header */}
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Header bar with action link to avoid overlap */}
            <div className="flex items-center justify-end px-4 py-2 border-b">
              <button type="button" className="text-blue-600 text-sm hover:underline">+ New Surgery</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed text-sm text-left text-gray-700">
                <colgroup>
                  <col className="w-[44px]" />
                  <col className="w-[320px]" />
                  <col />
                  <col className="w-[120px]" />
                </colgroup>
                <thead className="bg-white text-[12px] uppercase font-medium text-gray-500 border-b">
                  <tr className="h-9">
                    <th className="pl-3 pr-2 py-0 h-9">
                      <input type="checkbox" className="accent-blue-600" checked={allSelected} onChange={toggleAll} aria-label="Select all" />
                    </th>
                    <th className="pr-4 py-0 h-9 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 whitespace-nowrap">Surgery Name <ChevronsUpDown className="h-3.5 w-3.5" /></span>
                    </th>
                    <th className="px-4 py-0 h-9 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 whitespace-nowrap">Surgery Description <ChevronsUpDown className="h-3.5 w-3.5" /></span>
                    </th>
                    <th className="px-4 py-0 h-9 whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {surgeries.map((s) => (
                    <tr key={s.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="pl-3 pr-2 py-2 align-top">
                        <input type="checkbox" className="accent-blue-600" checked={selected.has(s.id)} onChange={() => toggleOne(s.id)} aria-label={`Select ${s.name}`} />
                      </td>
                      <td className="pr-4 py-2 font-medium text-gray-900 align-top">{s.name}</td>
                      <td className="px-4 py-2 text-gray-700 align-top">{s.description}</td>
                      <td className="px-2 py-2 align-top">
                        <div className="flex items-center justify-end gap-1 text-gray-600">
                          <button className="p-1.5 rounded hover:bg-gray-100" aria-label="Edit" title="Edit">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <span className="mx-1 h-4 w-px bg-gray-200" aria-hidden="true" />
                          <button className="p-1.5 rounded hover:bg-red-50 text-red-600" aria-label="Delete" title="Delete" onClick={() => onDelete(s.id)}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {surgeries.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-sm text-gray-500">No surgeries added yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
