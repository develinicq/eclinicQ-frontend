import React, { useMemo, useState, useEffect } from 'react'
import { CheckCircle2, Upload, FileText } from 'lucide-react'
import AvatarCircle from '../../../components/AvatarCircle'
import { hospital as coverImg,
  add,
  pencil,
  verifiedTick,
  publication,
  award
 } from '../../../../public/index.js'

import { useLocation, useNavigate } from 'react-router-dom'
import Input from "../../../components/FormItems/Input";
import Toggle from "../../../components/FormItems/Toggle";
import TimeInput from "../../../components/FormItems/TimeInput";
import MapLocation from "../../../components/FormItems/MapLocation";
import usePracticeStore from "../../../store/settings/usePracticeStore";
import useAwardsPublicationsStore from "../../../store/settings/useAwardsPublicationsStore";
import {
   
  Eye,
} from "lucide-react";

const InfoField = ({
  label,
  value,
  right,
  className: Class = "",
  noBorder = false,
}) => (
  <div
    className={`
      ${Class}
      flex flex-col gap-1 text-[14px] pb-2
      ${noBorder ? "" : "border-b-[0.5px] border-secondary-grey100"}
    `}
  >
    <div className="text-secondary-grey200">{label}</div>

    <div className="text-secondary-grey400 flex items-center justify-between">
      <span className="truncate">{value || "-"}</span>
      {right}
    </div>
  </div>
);



  

const SectionCard = ({
  title,
  subtitle,
  subo,
  Icon,
  onIconClick,
  headerRight,
  children,
}) => (
  <div className="px-4 py-3 flex flex-col gap-3 bg-white rounded-lg">
    <div className="flex items-start justify-between">
      {/* LEFT */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-sm">
          <div className="font-medium text-[14px] text-gray-900">
            {title}
          </div>

          {subtitle && (
            <div className="px-1 py-[2px] bg-secondary-grey50 rounded-md text-[12px] text-gray-500">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        {/* subo on top right */}
        {subo && (
          <div className="flex gap-1 text-[12px] text-secondary-grey200">
            <span>{subo}</span>
            <span className="text-blue-primary250 cursor-pointer">
              Call Us
            </span>
          </div>
        )}

        <div className="flex items-center gap-3">
          {headerRight}

          {Icon && (
            <button
              onClick={onIconClick}
              className="p-1 text-gray-500 hover:bg-gray-50"
            >
              {typeof Icon === "string" ? (
                <img src={Icon} alt="icon" className="w-7 h-7" />
              ) : (
                <Icon className="w-7 h-7" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>

    <div>{children}</div>
  </div>
);





export default function HAccount(){
  const location = useLocation()
  const navigate = useNavigate()
  const [hospitalDrawerOpen, setHospitalDrawerOpen] = useState(false);
  const [hospital, setHospital] = useState(null);
    const [awardOpen, setAwardOpen] = useState(false);
  const [awardEditMode, setAwardEditMode] = useState("add"); // 'add' or 'edit'
  
  const [pubOpen, setPubOpen] = useState(false);
  const [pubEditMode, setPubEditMode] = useState("add");
  const [pubEditData, setPubEditData] = useState(null);

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

  const tabs = [
    { key: 'account', label: 'Account Detail', path: '/hospital/settings/account' },
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
      number: '27AAECA1234F1Z5', company: 'Manipal Hospital Pvt. Ltd.', type: 'Private Limited',proof: 'GST Proof.pdf',
      incorporation: '02/05/2015', address: '101, FC Road, Pune',email:'info@manipalhospital.com' ,stateCode: 'PN (Maharashtra)', director: 'Dr. R. Mehta', code: '012345'
    },
     shr: { number: '27AAECA1234F1Z5', proof: 'SHR Proof.pdf' },
    pan: { number: '27AAECA1234F1Z5', proof: 'SHR Proof.pdf' },
    rohini: { number: '27AAECA1234F1Z5', proof: 'Rohini Proof.pdf' },
    nabh: { number: '27AAECA1234F1Z5', proof: 'NABH Proof.pdf' },
    est:{proof:'Establishment Proof.pdf'},
    about: `Dr. Milind Chauhan practices Gynaecologist and Obstetrician in Andheri East, Mumbai and has 13 years of experience in this field. He has completed his DNB - Obstetric and Gynecology and MBBS. Dr. Milind Chauhan has gained the confidence of patients and is a popular Gynaecologist and Obstetrician expert in Mumbai who performs treatment and procedures for various health issues related to Gynaecologist and Obstetrician.`,
    photos: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400',
      'https://images.unsplash.com/photo-1584985592394-8c40a30e2531?w=400',
      'https://images.unsplash.com/photo-1504439904031-93ded9f93b28?w=400',
      'https://images.unsplash.com/photo-1579154206451-2bdb0fd2d375?w=400',
    ],
  }), [])
    const [showAddMenu, setShowAddMenu] = useState(false);
      const {
    hospitalDate,

  } = usePracticeStore();

  return (
    <div className="px-4 pb-10 bg-secondary-grey50">
      {/* Top banner + centered avatar + tabs */}
      <div className="-mx-4">
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
        <div className="mt-4 grid grid-cols-12 gap-4 ">
          {/* Two-column layout: left 7, right 5 */}
          <div className="col-span-12 xl:col-span-6 space-y-6">
            <SectionCard
              title="Hospital Info"
              subtitle="Visible to Patient"
              Icon={pencil}
              onIconClick={() => setBasicOpen(true)}
            >
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-[14px] mb-4">
                  <InfoField
                    label="Hospital Name"
                    value={profile.basic?.hospitalName}
                  />
                  <InfoField
                    label="Hospital Type"
                    value={profile.basic?.hospitalType}
                  />
                  <InfoField
                    label="Mobile Number"
                    value={profile.basic?.phone}
                    right={
                      <span className="inline-flex items-center text-green-600 border border-green-400 py-0.5 px-1 rounded-md text-[12px]">
                        <img
                          src={verifiedTick}
                          alt="Verified"
                          className="w-3.5 h-3.5 mr-1"
                        />
                        Verified
                      </span>
                    }
                  />
                  <InfoField
                    label="Email"
                    value={profile.basic?.email}
                    right={
                      <span className="inline-flex items-center text-green-600 border border-green-400 py-0.5 px-1 rounded-md text-[12px]">
                        <img
                          src={verifiedTick}
                          alt="Verified"
                          className="w-3.5 h-3.5 mr-1"
                        />
                        Verified
                      </span>
                    }
                  />
                  
                     <InfoField
                    label="Establishment Date"
                    value={
                      hospital?.establishmentDate
                        ? new Date(hospital.establishmentDate).toLocaleDateString()
                        : "-"
                    }
                    />

                      <div>
                  <div className="text-[12px] text-gray-500 mb-2">Establishment Proof</div>
                  <div className="mt-1 flex items-center justify-between gap-2 w-full max-w-xs  border-[0.5px] border-dashed border-secondary-grey200 rounded px-2 py-1 text-[12px] bg-gray-50">
                    <span className="inline-flex items-center gap-1 text-gray-700"><FileText size={14}/> {profile.est.proof}</span>
                    <button
                              type="button"
                              title="View"
                              className="hover:text-secondary-grey400 p-2"
                              onClick={() => onFileView?.(fileName)}
                            >
                              {/* simple eye */}
                              <img src="/Doctor_module/settings/eye.png" alt="" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                    
                  
                  <InfoField label="Website" value={profile.basic?.website} />
                   <InfoField
                    label="Emergency Contact Detail"
                    value={profile.basic?.emergencyPhone}
                  />
                   <InfoField
                    label="Number of Beds"
                    value={profile.basic?.numberOfBeds}
                  />
                  
                   <InfoField
                    label="Number of ICU Beds"
                    value={profile.basic?.icuBeds}
                  />
                   <InfoField
                    label="Number of Ambulances"
                    value={profile.basic?.ambulance}
                  />

                    <InfoField
                    label="Ambulance Contact Number"
                    value={profile.basic?.ambulancePhone}
                  />
                   <InfoField
                    label="Do you have Blood Bank"
                    value={profile.basic?.bloodBank ? "No" : "Yes"}
                  />
                  <InfoField
                    label="Blood Bank Contact Number"
                    value={profile.basic?.bloodBankPhone}
                  />
                </div>


                <div className="flex flex-col gap-5">
                 
                 <InfoField
                    label="About"
                    value={
                      <p className="text-[13px] leading-6 text-gray-800 whitespace-pre-line">
                        {profile.about}
                      </p>
                    }
                    noBorder
                  />

                </div>
                 
                        <div className="text-[13px] text-gray-500 mb-2">
                    Hospital Photos
                  </div>
                 {/* <SectionCard variant="subtle" title="Hospital Photos"> */}
              <div className="flex items-center gap-3 overflow-x-auto">
               
                {profile.photos.map((src, i) => (
                  <img key={i} src={src} alt="hospital" className="w-36 h-24 rounded-md object-cover border" />
                ))}
              </div>
              
            {/* </SectionCard> */}
              </div>
            </SectionCard>
            {/* About */}
            {/* <div className="bg-white border border-gray-200 rounded-lg p-4">

             
            </div> */}

            {/* Photos */}
            
 
            {/* Medical Specialties */}
            <SectionCard
              variant="subtle"
              title="Medical Specialties"
              subtitle="Visible to Patient"
              // action={<button className="text-blue-600 text-sm inline-flex items-center gap-1" title="Edit">✎</button>}
              Icon={pencil}
              onIconClick={() => setShowEditSpecialties(true)}
            >
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((s,i)=>(<span key={i} className="text-xs px-2 py-1 hover:border-blue-primary250 hover:text-blue-primary250 rounded border bg-gray-50 text-gray-700">{s}</span>))}
              </div>
            </SectionCard>

            {/* Services & Facilities */}
            <SectionCard
              variant="subtle"
              title="Hospital Services & Facilities"
              subtitle="Visible to Patient"
            // action={<button className="text-blue-600 text-sm inline-flex item  s-center gap-1" title="Edit">✎</button>}
              Icon={pencil}
              onIconClick={() => setShowEditServices(true)}
            >
              <div className="flex flex-wrap gap-2">
                {profile.services.map((s,i)=>(<span key={i} className="text-xs  hover:border-blue-primary250 hover:text-blue-primary250 px-2 py-1 rounded border bg-gray-50 text-gray-700">{s}</span>))}
              </div>
            </SectionCard>

            {/* Awards */}
             <SectionCard
              title="Awards & Accreditions"
              subtitle="Visible to Patient"
              Icon={add}
              onIconClick={() => setShowAddMenu((v) => !v)}
            >
              <div className="relative">
                {showAddMenu && (
                  <div className="absolute right-0 -top-2 mt-0.5 bg-white border border-gray-200 shadow-2xl rounded-md p-1 text-[13px] z-20">
                    <button
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 w-full text-left"
                      onClick={() => { setShowAddMenu(false); setAwardEditMode("add"); setAwardEditData(null); setAwardOpen(true); }}
                    >
                      <img src={award} alt="" className="w-4 h-4" /> Add Awards
                    </button>
                    <button
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 w-full text-left"

                      onClick={() => {
                        setShowAddMenu(false);
                        setPubEditMode("add");
                        setPubEditData(null);
                        setPubOpen(true);
                      }}
                    >
                      <img src={publication} alt="" className="w-4 h-4" /> Add Accreditions
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {Array.isArray(awards) &&
                  awards.map((aw) => (
                    <ProfileItemCard
                      key={aw.id}
                      icon={award}
                      title={aw.awardName}
                      subtitle={aw.issuerName}
                      date={formatMonthYear(aw.issueDate)}
                      linkLabel="Certificate ↗"
                      linkUrl={aw.awardUrl}
                      showEditEducation={true}
                      editEducationIcon={pencil}
                      onEditEducationClick={() => {
                        setAwardEditData(aw);
                        setAwardEditMode("edit");
                        setAwardOpen(true);
                      }}

                    />
                  ))}

                {Array.isArray(publications) &&
                  publications.map((pub) => (
                    <ProfileItemCard
                      key={pub.id}
                      icon={publication}
                      title={pub.title}
                      subtitle={pub.publisher || pub.associatedWith}
                      date={pub.publicationDate ? formatMonthYear(pub.publicationDate) : undefined}
                      linkLabel="Publication ↗"
                      linkUrl={pub.publicationUrl}
                      description={pub.description}
                      rightActions={
                        <button
                          onClick={() => {
                            setPubEditData(pub);
                            setPubEditMode("edit");
                            setPubOpen(true);
                          }}
                          className="text-gray-400 hover:text-blue-600 transition"
                          title="Edit"
                        >
                          <img src={pencil} alt="edit" className="w-4 h-4" />
                        </button>
                      }
                    />
                  ))}
              </div>
            </SectionCard>
          </div>

          <div className="col-span-12 xl:col-span-6 space-y-6">

            <SectionCard
              title="hospital Address"
              subtitle="Visible to Patient"
              Icon={pencil}
              onIconClick={() => setHospitalDrawerOpen(true)}
            >
              <div className="mb-3">
                <div className="flex items-center gap-1 text-[13px] text-gray-500 mb-1">
                <span>Map Location</span>

                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M12 7V13M12 15.5V16M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                      stroke="#424242"
                      strokeLinecap="round"
                    />
                  </svg>
              </div>

          <div className="h-[120px] rounded overflow-hidden border">
            <MapLocation
              heightClass="h-full"
                    initialPosition={[
                      parseFloat(hospital?.latitude) || 19.07,
                      parseFloat(hospital?.longitude) || 72.87,
                    ]}
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm"  >
                <InfoField
                  label="Block no./Shop no./House no."
                  value={hospital?.blockNo}
                />
                <InfoField
                  label="Road/Area/Street"
                  value={hospital?.areaStreet}
                />
                <InfoField label="Landmark" value={hospital?.landmark} />
                <InfoField label="Pincode" value={hospital?.pincode} />
                <InfoField label="City" value={hospital?.city} />
                <InfoField label="State" value={hospital?.state} />
              </div>
            
            </SectionCard>
          


          <div className="col-span-12 xl:col-span-5 xl:col-start-8 space-y-4">

            {/* Basic Info on right */}
            <SectionCard variant="subtle" title="Primary Admin Account detail" subo="To Change Admin Details ">
              
              <div className="grid grid-cols-2 gap-3 text-[13px]">
               <InfoField
                    label="First Name"
                    value={profile.basic?.firstName}
                  />
                  <InfoField
                    label="Last Name"
                    value={profile.basic?.lastName}
                  />
                  <InfoField
                    label="Mobile Number"
                    value={profile.basic?.phone}
                    right={
                      <span className="inline-flex items-center text-green-600 border border-green-400 py-0.5 px-1 rounded-md text-[12px]">
                        <img
                          src={verifiedTick}
                          alt="Verified"
                          className="w-3.5 h-3.5 mr-1"
                        />
                        Verified
                      </span>
                    }
                  /> 
                  <InfoField
                    label="Email"
                    value={profile.basic?.email}
                    right={
                      <span className="inline-flex items-center text-green-600 border border-green-400 py-0.5 px-1 rounded-md text-[12px]">
                        <img
                          src={verifiedTick}
                          alt="Verified"
                          className="w-3.5 h-3.5 mr-1"
                        />
                        Verified
                      </span>
                    }
                  />
                  <InfoField
                    label="Gender"
                    value={
                      profile.basic?.gender?.charAt(0).toUpperCase() +
                      profile.basic?.gender?.slice(1).toLowerCase()
                    }
                  />
                  <InfoField label="City" value={profile.basic?.city} />
                  <InfoField label="Designation" value={profile.basic?.designation} />
                  <InfoField label="Role" value={profile.basic?.role} />
              </div>
            </SectionCard>

            {/* Verification Documents */}
            <SectionCard title="Verification Documents" subtitle="Visible to Patient" subo="To Change your Medical Proof Documents">
              
                    <div className="mt-2">
                <div className="relative font-medium text-[14px] text-gray-900  mb-2">GST Details
                    <span className="absolute left-0 bottom-0 h-[0.5px] w-[50px] bg-blue-primary250" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <InfoField label="GST Number" value={profile.gst.number} />
                 
                 <div>
                  <div className="text-[14px] text-secondary-grey200 mb-2">Proof of GST Registration</div>
                  <div className="mt-1 flex items-center justify-between gap-2 w-full  max-w-xs border-[0.5px] border-dashed border-secondary-grey200 rounded px-2 py-1 text-[12px] bg-gray-50">
                    <span className="inline-flex items-center gap-1 text-gray-700"><FileText size={14}/> {profile.gst.proof}</span>
                    <button
                              type="button"
                              title="View"
                              className="hover:text-secondary-grey400 p-2"
                              onClick={() => onFileView?.(fileName)}
                            >
                              {/* simple eye */}
                              <img src="/Doctor_module/settings/eye.png" alt="" className="w-4 h-4" />
                    </button>
                  </div>
                </div> 
                </div>
              </div>
              {/* <div className="my-3 h-px bg-gray-200" /> */}

              <div className="mt-2">
                <div className="relative font-medium text-[14px] text-gray-900  mb-2">CIN Details
                    <span className="absolute left-0 bottom-0 h-[0.5px] w-[50px] bg-blue-primary250" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <InfoField label="CIN Number" value={profile.cin.number} />
                  <InfoField label="Registered Company Name" value={profile.cin.company} />
                  <InfoField label="Company Type" value={profile.cin.type} />
                  <InfoField label="Date of Incorporation" value={profile.cin.incorporation} />
                  <InfoField label="Registered Office Address" value={profile.cin.address} />
                  <InfoField label="State and ROC Code" value={profile.cin.stateCode} />
                  <InfoField label="Registration Number" value={profile.cin.code} />
                  <InfoField label="Authorized Director" value={profile.cin.director} />
                  <InfoField label="Authorized Email (From MCA)" value={profile.cin.email}  />
                 <div>
                  <div className="text-[14px] text-secondary-grey200 mb-2">Proof of CIN Registration</div>
                  <div className="mt-1 flex items-center justify-between gap-2 w-full max-w-xs  border-[0.5px] border-dashed border-secondary-grey200 rounded px-2 py-1 text-[12px] bg-gray-50">
                    <span className="inline-flex items-center gap-1 text-gray-700"><FileText size={14}/> {profile.cin.proof}</span>
                    <button
                              type="button"
                              title="View"
                              className="hover:text-secondary-grey400 p-2"
                              onClick={() => onFileView?.(fileName)}
                            >
                              {/* simple eye */}
                              <img src="/Doctor_module/settings/eye.png" alt="" className="w-4 h-4" />
                    </button>
                  </div>
                </div> 
                </div>
              </div>
               {/* <div className="my-3 h-px bg-gray-200" /> */}
                   <div className="mt-2">
                <div className="relative font-medium text-[14px] text-gray-900  mb-2">State Health Registration Details
                    <span className="absolute left-0 bottom-0 h-[0.5px] w-[50px] bg-blue-primary250" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <InfoField label="State Health Registration Number" value={profile.shr.number} />
                 
                 <div>
                  <div className="text-[14px] text-secondary-grey200 mb-2">Proof of State Health Registration</div>
                  <div className="mt-1 flex items-center justify-between gap-2 w-full max-w-xs  border-[0.5px] border-dashed border-secondary-grey200 rounded px-2 py-1 text-[12px] bg-gray-50">
                    <span className="inline-flex items-center gap-1 text-gray-700"><FileText size={14}/> {profile.shr.proof}</span>
                    <button
                              type="button"
                              title="View"
                              className="hover:text-secondary-grey400 p-2"
                              onClick={() => onFileView?.(fileName)}
                            >
                              {/* simple eye */}
                              <img src="/Doctor_module/settings/eye.png" alt="" className="w-4 h-4" />
                    </button>
                  </div>
                </div> 
                </div>
              </div>

              {/* <div className="my-3 h-px bg-gray-200" /> */}
                        <div className="mt-2">
                <div className="relative font-medium text-[14px] text-gray-900  mb-2">PAN CARD Details
                    <span className="absolute left-0 bottom-0 h-[0.5px] w-[50px] bg-blue-primary250" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <InfoField label="PAN CARD Number" value={profile.pan.number} />

                 <div>
                  <div className="text-[14px] text-secondary-grey200 mb-2">Proof of Pan Card</div>
                  <div className="mt-1 flex items-center justify-between gap-2 w-full max-w-xs  border-[0.5px] border-dashed border-secondary-grey200 rounded px-2 py-1 text-[12px] bg-gray-50">
                    <span className="inline-flex items-center gap-1 text-gray-700"><FileText size={14}/> {profile.pan.proof}</span>
                    <button
                              type="button"
                              title="View"
                              className="hover:text-secondary-grey400 p-2"
                              onClick={() => onFileView?.(fileName)}
                            >
                              {/* simple eye */}
                              <img src="/Doctor_module/settings/eye.png" alt="" className="w-4 h-4" />
                    </button>
                  </div>
                </div> 
                </div>
              </div>
              
                
             
                 <div className="mt-2">
                <div className="relative font-medium text-[14px] text-gray-900  mb-2">Rohini Details
                    <span className="absolute left-0 bottom-0 h-[0.5px] w-[50px] bg-blue-primary250" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <InfoField label="Rohini ID" value={profile.rohini.number} />
                 
                 <div>
                  <div className="text-[14px] text-secondary-grey200 mb-2">Proof of Rohini</div>
                  <div className="mt-1 flex items-center justify-between gap-2 w-full max-w-xs  border-[0.5px] border-dashed border-secondary-grey200  rounded px-2 py-1 text-[12px] bg-gray-50">
                    <span className="inline-flex items-center gap-1 text-gray-700"><FileText size={14}/> {profile.rohini.proof}</span>
                    <button
                              type="button"
                              title="View"
                              className="hover:text-secondary-grey400 p-2"
                              onClick={() => onFileView?.(fileName)}
                            >
                              {/* simple eye */}
                              <img src="/Doctor_module/settings/eye.png" alt="" className="w-4 h-4" />
                    </button>
                  </div>
                </div> 
                </div>
              </div>

                  <div className="mt-2">
                <div className="relative font-medium text-[14px] text-gray-900  mb-2">NABH Acceditation Details
                    <span className="absolute left-0 bottom-0 h-[0.5px] w-[50px] bg-blue-primary250" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <InfoField label="NABH Number" value={profile.nabh.number} />

                 <div>
                  <div className=" text-[14px] text-secondary-grey200 mb-2">Proof of NABH</div>
                  <div className="mt-1 flex items-center justify-between gap-2 w-full max-w-xs  border-[0.5px] border-dashed border-secondary-grey200 rounded px-2 py-1 text-[12px] bg-gray-50">
                    <span className="inline-flex items-center gap-1 text-gray-700"><FileText size={14}/> {profile.nabh.proof}</span>
                    <button
                              type="button"
                              title="View"
                              className="hover:text-secondary-grey400 p-2"
                              onClick={() => onFileView?.(fileName)}
                            >
                              {/* simple eye */}
                              <img src="/Doctor_module/settings/eye.png" alt="" className="w-4 h-4" />
                    </button>
                  </div>
                </div> 
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
