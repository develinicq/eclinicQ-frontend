// HAccount.jsx
import React, { useState } from 'react'
import {
  Phone,
  Mail,
  Trash2,
  ChevronDown,
  Eye,
  CheckCircle2,
  Upload,
  FileText
} from 'lucide-react'
import AvatarCircle from '../../../components/AvatarCircle'
import Badge from '../../../components/Badge'
import MapLocation from '../../../components/FormItems/MapLocation'
import InputWithMeta from '../../../components/GeneralDrawer/InputWithMeta'
import HospitalInfoDrawer from './Drawers/HospitalInfoDrawer'
import MedicalSpecialtiesDrawer from './Drawers/MedicalSpecialtiesDrawer'
import HospitalServicesDrawer from './Drawers/HospitalServicesDrawer'
import AddAwardDrawer from './Drawers/AddAwardDrawer'
import AccreditationDrawer from './Drawers/AccreditationDrawer'


// Custom Images Import (matching Doc_settings)
import {
  cap,
  add,
  hospital,
  verifiedTick,
  inviteUserIcon,
  pencil,
  pdf_blue,
  experience,
  publication,
  award
} from '../../../../public/index.js'


// --- Components from Doc_settings.jsx (EXACT COPY) ---

const InfoField = ({ label, value, right, className: Class }) => (
  <div
    className={`${Class} flex flex-col gap-1 text-[14px] border-b-[0.5px] pb-[6px] border-secondary-grey100`}
  >
    <div className="col-span-4  text-secondary-grey200">{label}</div>
    <div className="col-span-8 text-secondary-grey400 flex items-center justify-between">
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
  <div className="px-4 py-3 flex flex-col gap-3 bg-white rounded-lg ">
    <div className="flex items-center justify-between">
      {/* LEFT */}

      <div className='flex items-center justify-between w-full'>
        <div className="flex items-center gap-1 text-sm">
          <div className="font-medium text-[14px] text-gray-900">{title}</div>

          {subtitle && (
            <div className="px-1 border border-secondary-grey50 bg-secondary-grey50 rounded-[2px] text-[12px] text-gray-500 hover:border hover:border-blue-primary150 hover:text-blue-primary250 cursor-pointer">
              {subtitle}
            </div>
          )}
        </div>

        {subo && (
          <div className="flex gap-1 text-[12px] text-secondary-grey200">
            <span>{subo}</span>
            <span className="text-blue-primary250">Call Us</span>
          </div>
        )}
      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-3 shrink-0">
        {headerRight}

        {Icon && (
          <button
            onClick={onIconClick}
            className="p-1 text-gray-500 hover:bg-gray-50"
          >
            {typeof Icon === "string" ? (
              <img src={Icon} alt="icon" className="w-6 h-6" />
            ) : (
              <Icon className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
    </div>

    <div>{children}</div>
  </div>
);

const ProfileItemCard = ({
  icon,
  title,
  badge,
  subtitle,
  date,
  location, // new optional line under date
  linkLabel,
  linkUrl,
  description, // new long text with See more toggle when no link
  initiallyExpanded = false,
  rightActions, // JSX slot (optional)
  // Optional inline edit-education control
  showEditEducation = false,
  editEducationIcon, // string URL or React component
  onEditEducationClick, // handler to open drawer
  editEducationAriaLabel = "Edit education",
}) => {
  const [expanded, setExpanded] = useState(!!initiallyExpanded);
  const MAX_CHARS = 220;
  const showSeeMore = !linkUrl && typeof description === 'string' && description.length > MAX_CHARS;
  const visibleText =
    !linkUrl && typeof description === 'string'
      ? expanded
        ? description
        : description.length > MAX_CHARS
          ? description.slice(0, MAX_CHARS).trimEnd() + '…'
          : description
      : '';
  return (
    <div className="flex  py-2.5 pt-1.5 border-b rounded-md bg-white">
      {/* Icon */}
      <div className="w-[64px] mr-4 h-[64px] rounded-full border border-secondary-grey50 bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
        {typeof icon === "string" ? (
          <img src={icon} alt="" className="w-8 h-8 object-contain" />
        ) : (
          icon
        )}
      </div>

      {/* Content */}
      <div className="flex  flex-col gap-[2px] w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-shrink-0  items-center gap-1 text-sm text-secondary-grey400">
            <span className="font-semibold">{title}</span>
            {badge && (
              <span className="text-[12px]   min-w-[18px]  text-secondary-grey400 bg-secondary-grey50 rounded px-1 ">
                {badge}
              </span>
            )}
          </div>
          {showEditEducation && (

            <button
              type="button"
              onClick={onEditEducationClick}
              aria-label={editEducationAriaLabel}
              title={editEducationAriaLabel}
              className=" inline-flex items-center justify-center rounded hover:bg-secondary-grey50 text-secondary-grey300 mr-2"
            >
              {typeof editEducationIcon === "string" && editEducationIcon ? (
                <img src={editEducationIcon} alt="edit" className="w-6" />
              ) : editEducationIcon ? (
                React.createElement(editEducationIcon, { className: "w-6" })
              ) : (
                <img src={pencil} alt="edit" className="w-6" />
              )}
            </button>


          )}


        </div>

        {subtitle && <div className="text-sm text-secondary-grey400 w-4/5">{subtitle}</div>}

        {date && <div className="text-sm text-secondary-grey200">{date}</div>}
        {location && (
          <div className="text-sm text-secondary-grey200">{location}</div>
        )}

        {linkUrl ? (
          <div className="flex items-center gap-1">

            <a
              href={linkUrl}
              className="inline-flex items-center gap-1 text-sm text-blue-primary250"
              target="_blank"
              rel="noreferrer"
            >
              {linkLabel}
            </a>
          </div>
        ) : (
          description ? (
            <div className="mt-2">
              <div className="text-[13px] text-secondary-grey400">{visibleText}</div>
              {showSeeMore && (
                <button
                  type="button"
                  className="mt-1 text-[13px] text-secondary-grey200 inline-flex items-center gap-1 hover:text-secondary-grey300"
                  onClick={() => setExpanded((v) => !v)}
                >
                  {expanded ? 'See Less' : 'See More'}
                  <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          ) : null
        )}
      </div>

      {/* Right actions – render ONLY if provided */}
      {rightActions && (
        <div className="flex items-center gap-2">{rightActions}</div>
      )}
    </div>
  );
};
// --- End Exact Copies ---

export default function HAccount({ profile }) {
  if (!profile) return null

  // State for Add Menu Toggle (matching Doc_settings)
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [hospitalInfoOpen, setHospitalInfoOpen] = useState(false);
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const [awardOpen, setAwardOpen] = useState(false);
  const [awardEditMode, setAwardEditMode] = useState("add");
  const [awardEditData, setAwardEditData] = useState(null);

  const [accreditationOpen, setAccreditationOpen] = useState(false);
  const [accreditationEditMode, setAccreditationEditMode] = useState("add");
  const [accreditationEditData, setAccreditationEditData] = useState(null);

  // Dummy awards data if none provided
  const awards = profile.awards || [
    { id: 1, awardName: "Best Plasticene Award", issuerName: "Manipal hospital", issueDate: "May 2017", awardUrl: "#" },
    { id: 2, awardName: "Best Plasticene Award", issuerName: "Manipal hospital", issueDate: "May 2017", awardUrl: "#" },
    { id: 3, awardName: "NABH - National Accreditation Board", issuerName: "Manipal hospital", issueDate: "May 2017", awardUrl: "#" },
    { id: 4, awardName: "ISO Certifications", issuerName: "Manipal hospital", issueDate: "May 2017", awardUrl: "#" },
    { id: 5, awardName: "JCI - Joint Commission International", issuerName: "Manipal hospital", issueDate: "May 2017", awardUrl: "#" }
  ]

  const publications = profile.publications || [];

  // Helpers
  const formatMonthYear = (dateStr) => {
    // Mock formatting/returning already formatted string for dummy data
    return dateStr;
  }

  // Verified Badge Component
  const VerifiedBadge = () => (
    <span className="inline-flex items-center text-success-300 border bg-success-100 border-success-300 py-0.5 px-1 rounded-md text-[12px]">
      <img src={verifiedTick} alt="Verified" className="w-3.5 h-3.5 mr-1" />
      Verified
    </span>
  )

  return (
    <>
      <div className=" grid grid-cols-12 gap-6 bg-secondary-grey50">

        {/* Left Column (7/12) */}
        <div className="col-span-12 xl:col-span-6 space-y-6">

          {/* Hospital Info */}
          <SectionCard
            title="Hospital Info"
            subtitle="Visible to Patient"
            Icon={pencil} // Custom Icon
            onIconClick={() => setHospitalInfoOpen(true)}
          >
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <InfoField label="Hospital Name" value={profile.hospitalName || "Manipal Hospital"} />
              <InfoField label="Hospital Type" value={profile.type || "Multi-Speciality Hospital"} />
              <InfoField label="Mobile Number" value={profile.phone} right={<VerifiedBadge />} />
              <InfoField label="Email" value={profile.email} right={<VerifiedBadge />} />
              <InfoField label="Establishment Date" value={profile.estDate || "10/09/2005"} />

              {/* Establishment Proof using InputWithMeta */}
              <div>
                <div className="text-[14px] text-secondary-grey200 mb-1">Establishment Proof</div>
                <InputWithMeta
                  imageUpload={true}
                  fileName={"Establishment.pdf"}
                  onFileView={(f) => console.log('view', f)}
                  showInput={false}
                />
              </div>

              <InfoField label="Website" value={profile.website} />
              <InfoField label="Emergency Contact Number" value={profile.emergencyPhone || profile.phone} />
              <InfoField label="Number of Beds" value={profile.beds || "600"} />
              <InfoField label="Number of ICU Beds" value={profile.icuBeds || "126"} />
              <InfoField label="Number of Ambulances" value={profile.ambulances || "5"} />
              <InfoField label="Ambulance Contact Number" value={profile.ambulancePhone || profile.phone} />
              <InfoField label="Do you have Blood Bank" value={profile.bloodBank ? "Yes" : "No"} />
              <InfoField label="Blood Bank Contact Number" value={profile.bloodBankPhone || profile.phone} />
            </div>

            <div className="pt-4 pb-4">
              <div className="text-sm text-secondary-grey200 mb-1">About</div>
              <p className="text-sm leading-relaxed text-secondary-grey400">{profile.about || "Dr. Milind Chauhan practices Gynaecologist and Obstetrician in Andheri East, Mumbai and has 13 years of experience in this field..."}</p>
            </div>

            <InputWithMeta
              label="Hospital Photos"
              showInput={false}

            >
            </InputWithMeta>
            <div className="flex gap-4 overflow-x-auto pb-1">
              {(profile.photos && profile.photos.length > 0 ? profile.photos : ['/placeholder_clinic.jpg', '/placeholder_clinic.jpg']).map((src, i) => (
                <img key={i} src={src} alt="hospital" className="w-[120px] h-[120px] rounded-md object-cover border border-gray-100" />
              ))}
            </div>
          </SectionCard>



          {/* Medical Specialties */}
          <SectionCard title="Medical Specialties" subtitle="Visible to Patient" Icon={pencil} onIconClick={() => setSpecialtiesOpen(true)}>
            <div className="flex flex-wrap gap-2">
              {(profile.specialties || ['Anaesthesiology', 'Cardiology', 'Dermatology', 'Orthopedics']).map((s, i) => (
                <span key={i} className="px-1 rounded-[2px] border border-gray-100 bg-gray-50 text-sm text-secondary-grey400 hover:border-blue-primary150 hover:text-blue-primary250 cursor-pointer">{s}</span>
              ))}
            </div>
          </SectionCard>

          {/* Services & Facilities */}
          <SectionCard title="Hospital Services & Facilities" subtitle="Visible to Patient" Icon={pencil} onIconClick={() => setServicesOpen(true)}>
            <div className="flex flex-wrap gap-3">
              {(profile.services || ['MRI Scan', 'CT Scan', 'Blood Bank', 'Parking']).map((s, i) => (
                <span key={i} className="px-1 rounded-[2px] border border-gray-100 bg-gray-50 text-sm text-secondary-grey400 hover:border-blue-primary150 hover:text-blue-primary250 cursor-pointer">{s}</span>
              ))}
            </div>
          </SectionCard>

          {/* Awards & Publications (EXACT FROM DOC SETTINGS) */}
          <SectionCard
            title="Awards & Publications"
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
                      setAccreditationEditMode("add");
                      setAccreditationEditData(null);
                      setAccreditationOpen(true);
                    }}
                  >
                    <img src={publication} alt="" className="w-4 h-4" /> Add Accreditations
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-2">
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
                          setAccreditationEditData(pub);
                          setAccreditationEditMode("edit");
                          setAccreditationOpen(true);
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

        {/* Right Column (5/12) */}
        <div className="col-span-12 xl:col-span-6 space-y-6">

          {/* Address */}
          <SectionCard title="Hospital Address" subtitle="Visible to Patient" Icon={pencil} onIconClick={() => setHospitalInfoOpen(true)}>
            <InputWithMeta
              label="Map Location"
              showInput={false}
              infoIcon
            />

            <div className="h-[100px] bg-gray-100 rounded-lg border border-gray-200 mb-3 overflow-hidden relative">
              <MapLocation overlay={false} />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-2 gap-8">
                <InfoField label="Block no./Shop no./House no." value={profile.address?.block || "Survey No 111/11/1"} />
                <InfoField label="Road/Area/Street" value={profile.address?.road || "Veerbhadra Nagar Road, Mhalunge Main Road, Baner"} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <InfoField label="Landmark" value={profile.address?.landmark || "Near Chowk"} />
                <InfoField label="Pincode" value={profile.address?.pincode || "444001"} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <InfoField label="City" value={profile.city || "Akola"} />
                <InfoField label="State" value={profile.state || "Maharashtra"} />
              </div>
            </div>
          </SectionCard>

          {/* Primary Admin */}
          <SectionCard title="Primary Admin Account Details" subo="To Change Admin Details" headerRight={<></>}>
            <div className="grid grid-cols-2 gap-x-7 gap-y-3">
              <InfoField label="First Name" value={profile.admin?.firstName || "Milind"} />
              <InfoField label="Last Name" value={profile.admin?.lastName || "Chauhan"} />
              <InfoField label="Mobile Number" value={profile.admin?.phone || "91753 67487"} right={<VerifiedBadge />} />
              <InfoField label="Email" value={profile.admin?.email || "milindchachun.gmail.com"} right={<VerifiedBadge />} />
              <InfoField label="Gender" value={profile.admin?.gender || "Male"} />
              <InfoField label="City" value={profile.admin?.city || "Akola, Maharashtra"} />
              <InfoField label="Designation" value={profile.admin?.designation || "Business Owner"} />
              <InfoField label="Role" value={profile.admin?.role || "Super Admin"} />
            </div>
          </SectionCard>

          {/* Verification Documents - Grid Layout */}
          <SectionCard title="Verification Documents" subtitle="Visible to Patient" subo="To change your Medical proof please">
            <div className="space-y-3">

              {/* GST */}
              <div className='flex flex-col gap-2'>
                <h4 className="text-sm font-medium text-secondary-grey400">
                  <span className="relative inline-block pb-2">
                    GST Details
                    <span className="absolute left-1/2 bottom-0 h-[2px] w-full -translate-x-3/4 scale-x-50 bg-blue-primary150/50"></span>
                  </span>
                </h4>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div><InfoField label="GST Number" value={profile.gst?.number || "27AAECA1234F1Z5"} /></div>
                  <div>
                    <div className="text-[14px] text-secondary-grey200 mb-1">Proof of GST Registration</div>
                    <InputWithMeta imageUpload={true} fileName="GST Proof.pdf" showInput={false} />
                  </div>
                </div>
              </div>

              {/* CIN */}
              <div className='flex flex-col gap-2'>
                <h4 className="text-sm font-semibold text-secondary-grey400">
                  <span className="relative inline-block pb-2">
                    CIN Details
                    <span className="absolute left-1/2 bottom-0 h-[2px] w-full -translate-x-3/4 scale-x-50 bg-blue-primary150/50"></span>
                  </span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 gap-y-4">
                  <InfoField label="CIN Number" value={profile.cin?.number || "27AAECA1234F1Z5"} />
                  <InfoField label="Registered Company Name" value={profile.cin?.company || "Manipal Hospital Pvt. Ltd."} />
                  <InfoField label="Company Type" value={profile.cin?.type || "Private Limited"} />
                  <InfoField label="Date of Incorporation" value={profile.cin?.incorporation || "02/05/2015"} />
                  <InfoField label="Registered Office Address" value={profile.cin?.address || "101, FC Road, Pune"} />
                  <InfoField label="State and ROC Code" value={profile.cin?.stateCode || "PN (Maharashtra)"} />
                  <InfoField label="Authorized Director" value={profile.cin?.director || "Dr. R. Mehta"} />
                  <InfoField label="Registration Number" value="012345" />
                  <InfoField label="Authorized Email (From MCA)" value="info@manipalhospital.in" />
                  <div>


                    <div>
                      <div className="text-[14px] text-secondary-grey200 mb-">Proof of CIN Registration</div>
                      <InputWithMeta imageUpload={true} fileName="CIN Proof.pdf" showInput={false} />
                    </div>

                  </div>
                </div>
              </div>

              {/* State Health Registration */}
              <div className="flex flex-col pt-2 gap-2">
                <h4 className="text-sm font-semibold text-secondary-grey400">
                  <span className="relative inline-block pb-2">
                    State Health Registration Details
                    <span className="absolute left-1/2 bottom-0 h-[2px] w-full -translate-x-3/4 scale-x-50 bg-blue-primary150/50"></span>
                  </span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <InfoField label="State Health Registartion Number" value="27AAECA1234F1Z5" />
                  <div>
                    <div className="text-[14px] text-secondary-grey200 ">Proof of State Health Registration</div>
                    <InputWithMeta imageUpload={true} fileName="SHR Proof.pdf" showInput={false} />
                  </div>
                </div>
              </div>

              {/* PAN Card */}
              <div className="pt-2 gap-2 flex flex-col">
                <h4 className="text-sm font-semibold text-secondary-grey400">
                  <span className="relative inline-block pb-2">
                    PAN CardQ3 Details
                    <span className="absolute left-1/2 bottom-0 h-[2px] w-full -translate-x-3/4 scale-x-50 bg-blue-primary150/50"></span>
                  </span>
                </h4>              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <InfoField label="Pan Card Number" value="27AAECA1234F1Z5" />
                  <div>
                    <div className="text-[14px] text-secondary-grey200 ">Proof of Pan Card</div>
                    <InputWithMeta imageUpload={true} fileName="PAN Proof.pdf" showInput={false} />
                  </div>
                </div> 
                </div>
              </div>

              {/* Rohini */}
              <div className="pt-2 gap-2 flex flex-col">
                <h4 className="text-sm font-semibold text-secondary-grey400">
                  <span className="relative inline-block pb-2">
                    Rohini Details
                    <span className="absolute left-1/2 bottom-0 h-[2px] w-full -translate-x-3/4 scale-x-50 bg-blue-primary150/50"></span>
                  </span>
                </h4>              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoField label="Rohini ID" value="27AAECA1234F1Z5" />
                  <div>
                    <div className="text-[14px] text-secondary-grey200 mb-1">Proof of Rohini</div>
                    <InputWithMeta imageUpload={true} fileName="Rohini Proof.pdf" showInput={false} />
                  </div>
                </div>
              </div>

              {/* NABH */}
              <div className="pt-2 flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-secondary-grey400">
                  <span className="relative inline-block pb-2">
                    NABH Accreditation Details
                    <span className="absolute left-1/2 bottom-0 h-[2px] w-full -translate-x-3/4 scale-x-50 bg-blue-primary150/50"></span>
                  </span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoField label="NABH Number" value="27AAECA1234F1Z5" />
                  <div>
                    <div className="text-[14px] text-secondary-grey200 mb-1">Proof of NABH</div>
                    <InputWithMeta imageUpload={true} fileName="NABH Proof.pdf" showInput={false} />
                  </div>
                </div>
              </div>

            </div>
          </SectionCard>

        </div>
      </div>

      <HospitalInfoDrawer
        open={hospitalInfoOpen}
        onClose={() => setHospitalInfoOpen(false)}
        initial={profile}
        onSave={(updatedData) => {
          console.log("Updated Hospital Info:", updatedData);
          // Here you would typically call an API to update the profile
        }}
      />
      <MedicalSpecialtiesDrawer
        open={specialtiesOpen}
        onClose={() => setSpecialtiesOpen(false)}
        selectedItems={profile.specialties || ['Anaesthesiology', 'Cardiology', 'Dermatology', 'Orthopedics']}
        onSave={(items) => console.log('Updated Specialties:', items)}
      />
      <HospitalServicesDrawer
        open={servicesOpen}
        onClose={() => setServicesOpen(false)}
        selectedItems={profile.services || ['MRI Scan', 'CT Scan', 'Blood Bank', 'Parking']}
        onSave={(items) => console.log('Updated Services:', items)}
      />
      <AddAwardDrawer
        open={awardOpen}
        onClose={() => setAwardOpen(false)}
        mode={awardEditMode}
        initial={awardEditData || {}}
        onSave={(data) => console.log("Saved Award:", data)}
      />
      <AccreditationDrawer
        open={accreditationOpen}
        onClose={() => setAccreditationOpen(false)}
        mode={accreditationEditMode}
        initial={accreditationEditData || {}}
        onSave={(data) => console.log("Saved Accreditation:", data)}
      />
    </>
  )
}
