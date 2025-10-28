import React, { useMemo, useState } from 'react'
import { CheckCircle2, Pencil, Phone, Mail, MapPin, Upload, FileText } from 'lucide-react'
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

const Doc_settings = () => {
  // Tabs under Settings (as per screenshot)
  const tabs = [
    { key: 'personal', label: 'Personal Info' },
    { key: 'consultation', label: 'Consultation Details' },
    { key: 'clinical', label: 'Clinical Details' },
    { key: 'staff', label: 'Staff Permissions' },
    { key: 'security', label: 'Security Settings' },
  ]

  const [activeTab, setActiveTab] = useState('personal')

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
                    onClick={() => setActiveTab(t.key)}
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
      ) : (
        <div className="mt-6 text-sm text-gray-600">This section is under construction.</div>
      )}
    </div>
  )
}

export default Doc_settings
