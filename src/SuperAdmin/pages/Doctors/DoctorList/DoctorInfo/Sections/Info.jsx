import React, { useState , useEffect} from "react";
import {
  cap,
  add,
  verifiedTick,
  pencil,
  pdf_blue,
  experience,
  publication,
  award
} from "../../../../../../../public/index.js";
import { ChevronDown } from "lucide-react";



import EditBasicInfoDrawer from "../Drawers/EditBasicInfoDrawer.jsx";
import { getDoctorBasicInfoForSuperAdmin } from "../../../../../../services/doctorService";
import AddEducationDrawer from "../Drawers/AddEducationDrawer.jsx";
import AddAwardDrawer from "../Drawers/AddAwardDrawer.jsx";
import AddPublicationDrawer from "../Drawers/AddPublicationDrawer.jsx";
import EditPracticeDetailsDrawer from "../Drawers/EditPracticeDetailsDrawer.jsx";
import ExperienceDrawerNew from "../Drawers/ExperienceDrawer.jsx";

const InfoField = ({ label, value, right, className: Class }) => (
  <div
    className={`${Class} flex flex-col gap-1 text-[14px] border-b-[0.5px] pb-2 border-secondary-grey100`}
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
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-sm">
          <div className="font-medium text-[14px] text-gray-900">{title}</div>

          {subtitle && (
            <div className="px-1 py-[2px] bg-secondary-grey50 rounded-md text-[12px] text-gray-500">
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
              <img src={Icon} alt="icon" className="w-7 h-7" />
            ) : (
              <Icon className="w-7 h-7" />
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
    <div className="flex  py-3 border-b rounded-md bg-white">
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
            <img src={pdf_blue} alt="" className="w-4 h-4" />
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
const Info = ({ doctor }) => {
  // --- UI State for Drawers/Menus (Visual only for SuperAdmin) ---
  const [basicOpen, setBasicOpen] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);
  const [awardOpen, setAwardOpen] = useState(false);
  const [pubOpen, setPubOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Edit State Placeholders
  const [eduEditData, setEduEditData] = useState(null);
  const [awardEditData, setAwardEditData] = useState(null);
  const [pubEditData, setPubEditData] = useState(null);
  const [expEditData, setExpEditData] = useState(null);

  const [eduEditMode, setEduEditMode] = useState("add");
  const [awardEditMode, setAwardEditMode] = useState("add");
  const [pubEditMode, setPubEditMode] = useState("add");
  const [expEditMode, setExpEditMode] = useState("add");

  const onFileView = (fileName) => { console.log("View file:", fileName); };

  const formatExperienceRange = (start, end, current) => {
    if (!start) return "";
    const s = new Date(start).getFullYear();
    const e = current ? "Present" : (end ? new Date(end).getFullYear() : "");
    return `${s} - ${e}`;
  };

  // --- Data Adapters ---

  // Basic Info state fetched from API for Super Admin view
  const [basic, setBasic] = useState({
    firstName: doctor?.name?.split(' ')[0] || '',
    lastName: doctor?.name?.split(' ').slice(1).join(' ') || '',
    phone: doctor?.primaryPhone || doctor?.contact || '',
    email: doctor?.emailAddress || doctor?.email || '',
    gender: doctor?.gender || '',
    languages: doctor?.languages || [],
    city: doctor?.location?.split(',')[0] || '',
    website: doctor?.website || '',
    headline: doctor?.designation || '',
    about: doctor?.about || ''
  });

  useEffect(() => {
    const id = doctor?.userId || doctor?.id;
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await getDoctorBasicInfoForSuperAdmin(id);
        const d = res?.data || {};
        const mapped = {
          firstName: d.firstName || '',
          lastName: d.lastName || '',
          phone: d.phone || '',
          email: d.emailId || '',
          gender: d.gender || '',
          city: d.city || '',
          website: d.website || '',
          headline: d.headline || '',
          about: d.about || '',
          languages: Array.isArray(d.languages) ? d.languages : []
        };
        if (!cancelled) setBasic(mapped);
      } catch (err) {
        console.error('Failed to fetch basic info for SuperAdmin:', err);
      }
    })();
    return () => { cancelled = true; };
  }, [doctor?.userId, doctor?.id]);

  // 'profile' object wrapper to match Doc_settings JSX structure
  const profile = { basic };

  // Medical Registration Adapter
  const medicalRegistration = {
    medicalCouncilRegistrationNumber: doctor?.mrnNumber || '',
    registrationYear: doctor?.registrationYear || '',
    registrationCouncil: doctor?.registrationCouncil || '',
    proofDocumentUrl: doctor?.mrnNumberProof || ''
  };

  // Practice Details Adapter
  const practiceDetails = {
    workExperience: doctor?.experience || '', // 'experience' is typically a string "12 years" or number
    medicalPracticeType: doctor?.practiceType || '', // hypothetical
    specialties: doctor?.specialization ? [{ id: 1, specialtyName: doctor.specialization, expYears: doctor.experience }] : [],
    practiceArea: doctor?.services || [] // hypothetical
  };

  // Experience Adapter
  // If doctor.experiences is actually an array, use it. Otherwise empty.
  const experiences = Array.isArray(doctor?.experiences) ? doctor.experiences :
    (doctor?.experienceDetails ? doctor.experienceDetails : []);


  // Mock data/adapters for lists not fully in doctor prop
  // In a real scenario, we'd ensure doctor prop has these lists or fetch them

  // Education adapter
  const education = [
    doctor?.graduationDegree && {
      degree: doctor.graduationDegree.degree,
      fieldOfStudy: '',
      graduationType: 'Graduation',
      instituteName: doctor.graduationDegree.college,
      startYear: '',
      completionYear: doctor.graduationDegree.completionYear,
      proofDocumentUrl: doctor.graduationDegreeProof
    },
    doctor?.postGraduationDegree && {
      degree: doctor.postGraduationDegree.degree,
      fieldOfStudy: '',
      graduationType: 'Post Graduation',
      instituteName: doctor.postGraduationDegree.college,
      startYear: '',
      completionYear: doctor.postGraduationDegree.completionYear,
      proofDocumentUrl: doctor.postGraduationProof
    }
  ].filter(Boolean);

  // Awards/Publications (mocked/empty if not present)
  // Assuming doctor object might have these in future, currently using empty arrays or props if available
  const awards = doctor?.awards || [];
  const publications = doctor?.publications || [];

  return (
    <div className="pt-6 px-4 grid grid-cols-12 gap-6 bg-secondary-grey50">
      {/* Left column */}
      <div className="col-span-12 xl:col-span-6 space-y-6">
        <SectionCard
          title="Basic Info"
          subtitle="Visible to Patient"
          Icon={pencil}
          onIconClick={() => setBasicOpen(true)}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-[14px] mb-4">
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
                  <span className="inline-flex items-center text-success-300 border bg-success-100 border-success-300 py-0.5 px-1 rounded-md text-[12px]">
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
                  <span className="inline-flex items-center text-success-300 border bg-success-100 border-success-300 py-0.5 px-1 rounded-md text-[12px]">
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

              <InfoField
                label="Language"
                value={
                  Array.isArray(profile.basic?.languages) && profile.basic.languages.length > 0 ? (
                    <div className="flex gap-1">
                      {profile.basic.languages.map((lang, idx) => (
                        <span
                          key={`${lang}-${idx}`}
                          className="inline-flex items-center h-5 gap-2 px-[6px] rounded-[4px] bg-secondary-grey50 text-secondary-grey400"
                        >
                          <span className="text-[14px] text-secondary-grey400 inline-flex items-center">{lang}</span>
                          {/* removable button omitted in read-only view */}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-secondary-grey100 px-1">Select Language</span>
                  )
                }
              />
              <InfoField label="City" value={profile.basic?.city} />
              <InfoField label="Website" value={profile.basic?.website} />
            </div>

            <div className="flex flex-col gap-5">
              <InfoField
                label="Profile Headline"
                value={profile.basic?.headline}
              />
              <InfoField label="About" value={profile.basic?.about} />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Educational Details"
          subtitle="Visible to Patient"
          Icon={add}
          onIconClick={() => setEduOpen(true)}
          subo="To Change your Graduation Details please"
        >
          <div className="space-y-3">
            {education.map((ed, idx) => (
              <ProfileItemCard
                key={ed.id || idx}
                icon={cap}
                title={`${ed.degree}${ed.fieldOfStudy ? ` in ${ed.fieldOfStudy}` : ""
                  }`}
                badge={ed.graduationType}
                subtitle={ed.instituteName}
                date={`${ed.startYear} - ${ed.completionYear}`}
                linkLabel="Degree_Certificate.pdf"
                linkUrl={ed.proofDocumentUrl}
                showEditEducation={true}
                editEducationIcon={pencil}
                onEditEducationClick={() => {
                  setEduEditData({
                    id: ed.id,
                    school: ed.instituteName,
                    gradType: ed.graduationType,
                    degree: ed.degree,
                    field: ed.fieldOfStudy || "",
                    start: ed.startYear?.toString() || "",
                    end: ed.completionYear?.toString() || "",

                  });
                  setEduEditMode("edit");
                  setEduOpen(true);
                }}
              // rightActions={
              //   <button
              //     onClick={() => {
              //       setEduEditData({
              //         id: ed.id,
              //         school: ed.instituteName,
              //         gradType: ed.graduationType,
              //         degree: ed.degree,
              //         field: ed.fieldOfStudy || "",
              //         start: ed.startYear?.toString() || "",
              //         end: ed.completionYear?.toString() || "",
              //         proof: ed.proofDocumentUrl || "",
              //       });
              //       setEduEditMode("edit");
              //       setEduOpen(true);
              //     }}
              //     className="text-gray-400 hover:text-blue-600"
              //     title="Edit"
              //   ></button>
              // }
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Awards & Publications"
          subtitle="Visible to Patient"
          headerRight={
            <div className="relative">
              <button
                onClick={() => setShowAddMenu((v) => !v)}
                className="p-1 text-gray-500 hover:bg-gray-50 rounded"
              >
                <img src={add} alt="add" className="w-7 h-7" />
              </button>
              {showAddMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-xl rounded-md p-1 text-[13px] z-50">
                  <button
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 w-full text-left bg-white text-gray-700 hover:text-blue-600 rounded-sm"
                    onClick={() => { setShowAddMenu(false); setAwardEditMode("add"); setAwardEditData(null); setAwardOpen(true); }}
                  >
                    <img src={award} alt="" className="w-4 h-4" /> Add Awards
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 w-full text-left bg-white text-gray-700 hover:text-blue-600 rounded-sm"
                    onClick={() => {
                      setShowAddMenu(false);
                      setPubEditMode("add");
                      setPubEditData(null);
                      setPubOpen(true);
                    }}
                  >
                    <img src={publication} alt="" className="w-4 h-4" /> Add Publications
                  </button>
                </div>
              )}
            </div>
          }
        >
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

      {/* Right column */}
      <div className="col-span-12 xl:col-span-6 space-y-4">
        <SectionCard
          title="Professional Details"
          subtitle="Visible to Patient"
          Icon={pencil}
          onIconClick={() => setPracticeOpen(true)}
        >
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-12 gap-y-1 gap-x-6 text-[13px]">

              <div className="col-span-12 text-[14px] text-secondary-grey400 font-semibold">
                Medical Registration Details
              </div>
              <div className="relative col-span-12 mt-[0.7px] text-[12px] text-secondary-grey200 pb-2 mb-3">
                To Change your MRN proof please{" "}
                <a
                  className="text-blue-primary250"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Call Us
                </a>

                <span className="absolute left-0 bottom-0 h-[0.5px] w-[50px] bg-blue-primary250" />
              </div>


              <div className="col-span-12 md:col-span-6 space-y-3 ">
                <InfoField
                  label="Medical Council Registration Number"
                  value={
                    medicalRegistration?.medicalCouncilRegistrationNumber ||
                    "-"
                  }
                />
                <InfoField
                  label="Registration Year"
                  value={medicalRegistration?.registrationYear || "-"}
                />
              </div>
              <div className="col-span-12 md:col-span-6 space-y-5">
                <InfoField
                  label="Registration Council"
                  value={medicalRegistration?.registrationCouncil || "-"}
                />

                <div className="h-[32px]  w-full border-[0.5px] border-dashed border-secondary-grey200 rounded-md flex items-center justify-between px-2 text-sm overflow-x-hidden bg-secondary-grey50">
                  <span className="flex items-center gap-3 text-secondary-grey300 flex-1 min-w-0 p-[0.5px]">
                    <img src="/Doctor_module/settings/pdf_black.png" alt="file" className="h-6 w-6" />
                    <span className="whitespace-normal break-words break-all overflow-hidden text-secondary-grey400">
                      {(() => {
                        const url = String(medicalRegistration?.proofDocumentUrl || "");
                        const name = url ? (url.split("/").pop() || "MRN Proof.pdf") : "-";
                        const max = 22;
                        if (name.length <= max) return name;
                        const keep = Math.max(4, Math.floor((max - 3) / 2));
                        return `${name.slice(0, keep)}...${name.slice(-keep)}`;
                      })()}
                    </span>

                    <button
                      type="button"
                      title="View"
                      className="hover:text-secondary-grey400"
                      onClick={() => onFileView?.(fileName)}
                    >

                    </button>
                  </span>
                  <span className="flex items-center gap-3 text-secondary-grey300 flex-shrink-0">
                    <button
                      type="button"
                      title="View"
                      className="hover:text-secondary-grey400 p-2"
                      onClick={() => onFileView?.(fileName)}
                    >
                      {/* simple eye */}
                      <img src="/Doctor_module/settings/eye.png" alt="" className="w-4 h-4" />
                    </button>

                    {medicalRegistration?.proofDocumentUrl ? (
                      <a
                        href={medicalRegistration.proofDocumentUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="View"
                        className="hover:text-secondary-grey400 inline-flex items-center justify-center"
                      >
                        <img src="/Doctor_module/settings/eye.png" alt="view" className="w-3.5 h-3.5" />
                      </a>
                    ) : null}
                  </span>
                </div>


              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 text-[13px]">
              {/* Section title */}
              <div className="relative col-span-12 text-[14px] text-gray-600 font-semibold flex items-center justify-between ">
                <div className="col-span-12 text-[14px] text-secondary-grey400 font-semibold mb-3">
                  Practice Details
                </div>
                <span className="absolute left-0 bottom-0 h-[0.5px] w-[50px] bg-blue-primary250" />
                {/* <button
                  type="button"
                  onClick={() => setPracticeOpen(true)}
                  className="inline-flex items-center justify-center rounded hover:bg-secondary-grey50 text-secondary-grey300"
                  title="Edit Practice Details"
                  aria-label="Edit Practice Details"
                >
                  <img src={pencil} alt="edit" className="w-7" />
                </button> */}
              </div>

              {/* Content grid MUST span full width */}
              <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                <InfoField
                  label="Work Experience"
                  value={
                    practiceDetails?.workExperience
                      ? `${practiceDetails.workExperience} years`
                      : "-"
                  }
                />

                <InfoField
                  label="Medical Practice Type"
                  value={practiceDetails?.medicalPracticeType || "-"}
                />

                {/* Specialization */}
                <div className="md:col-span-2">
                  <InfoField
                    label="Specialization"
                    value={
                      Array.isArray(practiceDetails?.specialties) &&
                        practiceDetails.specialties.length > 0 ? (
                        practiceDetails.specialties.map((spec, idx) => (
                          <span key={spec.id}>
                            {spec.specialtyName} (Exp: {spec.expYears}{" "}
                            years)
                            {idx < practiceDetails.specialties.length - 1 &&
                              ", "}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">—</span>
                      )
                    }
                  />
                </div>

                {/* Practice Area */}
                <div className="md:col-span-2">
                  <InfoField
                    label="Practice Area"
                    className="border-none"
                    value={
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {Array.isArray(practiceDetails?.practiceArea) &&
                          practiceDetails.practiceArea.length > 0 ? (
                          practiceDetails.practiceArea.map((a) => (
                            <Badge key={a} color="gray" size="s">
                              {a}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-[12px] text-gray-600">
                            No details available
                          </span>
                        )}
                      </div>
                    }
                  />
                </div>
              </div>
            </div>


          </div>
        </SectionCard>

        <SectionCard
          title="Experience Details"
          subtitle="Visible to Patient"
          Icon={add}
          onIconClick={() => setExpOpen(true)}
        >
          <div className="space-y-3">
            {Array.isArray(experiences) &&
              experiences.map((ex) => (
                <ProfileItemCard
                  key={ex.id}
                  icon={experience}
                  title={ex.jobTitle}
                  badge={
                    ex.isCurrentlyWorking
                      ? 'Current'
                      : ex.employmentType
                  }
                  subtitle={ex.hospitalOrClinicName}
                  date={formatExperienceRange(ex.startDate, ex.endDate, ex.isCurrentlyWorking)}
                  showEditEducation={true}
                  editEducationIcon={pencil}
                  location={[ex.city, ex.state, ex.location]
                    .filter(Boolean)
                    .join(', ') || undefined}
                  description={ex.description}
                  onEditEducationClick={() => {
                    setExpEditData(ex);
                    setExpEditMode('edit');
                    setExpOpen(true);
                  }}

                />
              ))}
          </div>
        </SectionCard>
      </div>

      {/* --- Drawers --- */}

      <EditBasicInfoDrawer
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
        initialData={basic}
  doctorId={doctor?.userId || doctor?.id}
        onSave={async () => {
          const id = doctor?.userId || doctor?.id;
          if (!id) { setBasicOpen(false); return; }
          try {
            const res = await getDoctorBasicInfoForSuperAdmin(id);
            const d = res?.data || {};
            const mapped = {
              firstName: d.firstName || '',
              lastName: d.lastName || '',
              phone: d.phone || '',
              email: d.emailId || '',
              gender: d.gender || '',
              city: d.city || '',
              website: d.website || '',
              headline: d.headline || '',
              about: d.about || '',
              languages: Array.isArray(d.languages) ? d.languages : []
            };
            setBasic(mapped);
          } catch (err) {
            console.error('Failed to refresh basic info after update:', err);
          } finally {
            setBasicOpen(false);
          }
        }}
      />

      <AddEducationDrawer
        open={eduOpen}
        onClose={() => setEduOpen(false)}
        mode={eduEditMode}
        initial={eduEditData}
        onSave={(data) => {
          console.log("SuperAdmin updated education (mock):", data);
          setEduOpen(false);
        }}
      />

      <AddAwardDrawer
        open={awardOpen}
        onClose={() => setAwardOpen(false)}
        mode={awardEditMode}
        initial={awardEditData}
        onSave={(data) => {
          console.log("SuperAdmin updated award (mock):", data);
          setAwardOpen(false);
        }}
      />

      <AddPublicationDrawer
        open={pubOpen}
        onClose={() => setPubOpen(false)}
        mode={pubEditMode}
        initial={pubEditData}
        onSave={(data) => {
          console.log("SuperAdmin updated publication (mock):", data);
          setPubOpen(false);
        }}
      />

      <EditPracticeDetailsDrawer
        open={practiceOpen}
        onClose={() => setPracticeOpen(false)}
        initial={practiceDetails}
        onSave={(data) => {
          console.log("SuperAdmin updated practice (mock):", data);
          setPracticeOpen(false);
        }}
      />

      <ExperienceDrawerNew
        open={expOpen}
        onClose={() => setExpOpen(false)}
        mode={expEditMode}
        initial={expEditData}
        onSave={(data) => {
          console.log("SuperAdmin updated experience (mock):", data);
          setExpOpen(false);
        }}
      />

    </div>
  );
};

export default Info;
