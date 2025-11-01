import React, { useMemo, useState, useEffect } from 'react'
import { CheckCircle2, Upload, FileText } from 'lucide-react'
import AvatarCircle from '../../../components/AvatarCircle'
import { hospital as coverImg } from '../../../../public/index.js'
import { useLocation, useNavigate } from 'react-router-dom'

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
        {subtitle ? <div className="text-[12px] text-gray-500">{subtitle}</div> : null}
      </div>
      {action}
    </div>
    <div className="p-4">{children}</div>
  </div>
)

export default function HAccount(){
  const location = useLocation()
  const navigate = useNavigate()

  const tabs = [
    { key: 'account', label: 'Account Detail', path: '/hospital/settings/account' },
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
    return 'account'
  }, [location.pathname])

  const [activeTab, setActiveTab] = useState(activeKey)
  useEffect(() => setActiveTab(activeKey), [activeKey])

  const profile = useMemo(() => ({
    name: 'Manipal Hospital - Baner',
    status: 'Active',
    phone: '91753 67487',
    email: 'milindchahun@gmail.com',
    gender: 'Male',
    city: 'Akola, Maharashtra',
    designation: 'Business Owner',
    role: 'Super Admin',
    specialties: ['Anaesthesiology','Cardiology','Dermatology','Orthopedics','Physiotherapy','ENT','Pulmonology','Haematology','Oncology'],
    services: ['MRI Scan','CT Scan','Blood Bank','Parking','Path Lab','X Ray','Pharmacy','Radiology','Private Room','General Ward'],
    gst: { number: '27AAECA1234F1Z5', proof: 'GST Proof.pdf' },
    cin: {
      number: '27AAECA1234F1Z5', company: 'Manipal Hospital Pvt. Ltd.', type: 'Private Limited',
      incorporation: '02/05/2015', address: '101, FC Road, Pune', stateCode: 'PN (Maharashtra)', director: 'Dr. R. Mehta', code: '012345'
    },
    about: `Dr. Milind Chauhan practices Gynaecologist and Obstetrician in Andheri East, Mumbai and has 13 years of experience in this field. He has completed his DNB - Obstetric and Gynecology and MBBS. Dr. Milind Chauhan has gained the confidence of patients and is a popular Gynaecologist and Obstetrician expert in Mumbai who performs treatment and procedures for various health issues related to Gynaecologist and Obstetrician.`,
    photos: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400',
      'https://images.unsplash.com/photo-1584985592394-8c40a30e2531?w=400',
      'https://images.unsplash.com/photo-1504439904031-93ded9f93b28?w=400',
      'https://images.unsplash.com/photo-1579154206451-2bdb0fd2d375?w=400',
    ],
  }), [])

  return (
    <div className="px-6 pb-10">
      {/* Top banner + centered avatar + tabs */}
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
              <div className="text-sm text-gray-600">Baner, Pune</div>
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

      {/* Account Detail content */}
      {activeTab === 'account' && (
        <div className="mt-4 grid grid-cols-12 gap-4">
          {/* About */}
          <div className="col-span-12">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-[13px] leading-6 text-gray-800">{profile.about}</p>
            </div>
          </div>

          {/* Photos */}
          <div className="col-span-12">
            <SectionCard title="Hospital Photos">
              <div className="flex items-center gap-3 overflow-x-auto">
                {profile.photos.map((src, i) => (
                  <img key={i} src={src} alt="hospital" className="w-36 h-24 rounded-md object-cover border" />
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Details grid */}
          <div className="col-span-12 grid grid-cols-12 gap-4">
            <div className="col-span-12 xl:col-span-6 space-y-4">
              <SectionCard title="Basic Info" subtitle="Visible to Patient">
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <InfoField label="Mobile Number" value={profile.phone} right={<span className="inline-flex items-center text-green-600 text-[12px]"><CheckCircle2 size={14} className="mr-1"/>Verified</span>} />
                  <InfoField label="Email" value={profile.email} right={<span className="inline-flex items-center text-green-600 text-[12px]"><CheckCircle2 size={14} className="mr-1"/>Verified</span>} />
                  <InfoField label="Gender" value={profile.gender} />
                  <InfoField label="City" value={profile.city} />
                  <InfoField label="Designation" value={profile.designation} />
                  <InfoField label="Role" value={profile.role} />
                </div>
              </SectionCard>

              <SectionCard title="Medical Specialties" subtitle="Visible to Patient" action={<button className="text-blue-600 text-sm inline-flex items-center gap-1">✎</button>}>
                <div className="flex flex-wrap gap-2">
                  {profile.specialties.map((s,i)=>(<span key={i} className="text-xs px-2 py-1 rounded border bg-gray-50 text-gray-700">{s}</span>))}
                </div>
              </SectionCard>

              <SectionCard title="Hospital Services & Facilities" subtitle="Visible to Patient" action={<button className="text-blue-600 text-sm inline-flex items-center gap-1">✎</button>}>
                <div className="flex flex-wrap gap-2">
                  {profile.services.map((s,i)=>(<span key={i} className="text-xs px-2 py-1 rounded border bg-gray-50 text-gray-700">{s}</span>))}
                </div>
              </SectionCard>
            </div>

            <div className="col-span-12 xl:col-span-6 space-y-4">
              <SectionCard title="Verification Documents" subtitle="Visible to Patient" action={<a href="#" className="text-blue-600 text-sm" onClick={(e)=>e.preventDefault()}>Call Us</a>}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[12px] text-gray-500 mb-2">GST Details</div>
                    <InfoField label="GST Number" value={profile.gst.number} />
                  </div>
                  <div>
                    <div className="text-[12px] text-gray-500 mb-2">Proof of GST Registration</div>
                    <a className="text-[12px] text-blue-600 inline-flex items-center gap-1 mt-1" href="#" onClick={(e)=>e.preventDefault()}>
                      <FileText size={14}/> {profile.gst.proof}
                    </a>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-[12px] text-gray-500 mb-2">CIN Details</div>
                  <div className="grid grid-cols-2 gap-3 text-[13px]">
                    <InfoField label="CIN Number" value={profile.cin.number} />
                    <InfoField label="Registered Company Name" value={profile.cin.company} />
                    <InfoField label="Company Type" value={profile.cin.type} />
                    <InfoField label="Date of Incorporation" value={profile.cin.incorporation} />
                    <InfoField label="Registered Office Address" value={profile.cin.address} />
                    <InfoField label="State and ROC Code" value={profile.cin.stateCode} />
                    <InfoField label="Authorized Director" value={profile.cin.director} />
                    <InfoField label="Director Code" value={profile.cin.code} />
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Awards & Accreditations" subtitle="Visible to Patient" action={<button className="text-blue-600 text-sm inline-flex items-center gap-1"><Upload size={14}/> Add</button>}>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-md">
                    <div className="text-sm text-gray-900 font-medium">Best Plasticene Award</div>
                    <div className="text-[12px] text-gray-600">Manipal hospital</div>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
