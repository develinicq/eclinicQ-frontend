import { ChevronDown, Hospital, MoreHorizontal, Building2, Stethoscope, MoreVertical, Plus, MinusCircle, Trash2, Calendar, CalendarOff, Link, UserX } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import AvatarCircle from '../../AvatarCircle';
import { docIcon, blueBag, whiteBag } from '../../../../public/index.js';
import InfoBox from './InfoBox';
import RadioButton from '../../GeneralDrawer/RadioButton';
import Badge from '@/components/Badge';
const star = '/star.png'
const down = '/angel-down.svg'
const horizontal = '/superAdmin/Doctors/Threedots.svg'
const hospital2 = '/superAdmin/Doctors/Hospital.svg'
const clinic = '/superAdmin/Doctors/Medical Kit.svg'


const hospital = '/icons/Sidebar/MainSidebar/hospital_unselect.png'
const DoctorBanner = ({ doctor }) => {
  const isActive = (doctor?.status || '').toLowerCase() === 'active'
  const [isClinicOpen, setIsClinicOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open by name or id
  const [showActionMenu, setShowActionMenu] = useState(false);
  const clinicRef = useRef(null);
  const actionMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clinicRef.current && !clinicRef.current.contains(event.target)) {
        setIsClinicOpen(false);
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setShowActionMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isClinicOpen) {
      setOpenMenu(null)
    }
  }, [isClinicOpen])


  const ICONS = {
    clinic: clinic,
    hospital: hospital2,
  };

  function FacilityCard({
    name,
    location,
    variant = "clinic", // "clinic" | "hospital"
    selected = false,
    onClick,
  }) {
    const Icon = ICONS[variant];

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick(e);
        }}
        className={`flex items-center justify-between hover:bg-secondary-grey50 rounded-md  border p-2 w-[310px] cursor-pointer transition
        ${selected
            ? "border-blue-primary150 bg-blue-primary50"
            : "border-transparent"
          }
      `}
      >
        {/* LEFT */}
        <div className="flex items-center gap-1">
          {/* Radio */}
          <RadioButton
            checked={selected}
            onChange={() => { }} // Controlled by parent div click
            name="account-select"
            className="pointer-events-none" // clicking the card handles selection
          />

          {/* Icon */}
          <div
            className={` w-[32px] h-[32px] rounded-full flex items-center justify-center border
            border-warning-400 bg-warning-50
          `}
          >
            <img src={Icon} alt={variant} className="w-[20px] h-[20px]" />
          </div>

          {/* Text */}
          <div>
            <p className=" text-secondary-grey400 text-sm leading-tight">{name}</p>
            <p className="text-xs text-secondary-grey200">{location}</p>
          </div>
        </div>

        {/* Right menu */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(openMenu === name ? null : name);
            }}
            className="p-1 hover:bg-gray-100 rounded-full facility-card-menu-button"
          >
            <img src={horizontal} alt="" className="" />
          </button>

          {openMenu === name && (
            <div className="absolute right-0 top-6 w-40 bg-white shadow-lg rounded-md border border-gray-100 z-50 py-1 facility-card-menu">
              <button className="w-full text-left px-3 py-2 text-[12px] text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <MinusCircle size={14} className="text-gray-400" />
                Mark as Inactive
              </button>
              <button className="w-full text-left px-3 py-2 text-[12px] text-red-500 hover:bg-red-50 flex items-center gap-2">
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div >
    );
  }

  return (
    <div className="w-full p-4 flex  items-center gap-4 bg-white">
      {/* Profile Circle with tick using reusable AvatarCircle */}
      <div className="relative">
        <AvatarCircle name={doctor?.name || 'Doctor'} color="blue" className="w-[90px] h-[90px] text-[2rem]" />
        <img src="/tick.png" alt="Verified" className="absolute -bottom-0 left-16 w-6 h-6" />
      </div>

      {/* Doctor Info */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-secondary-grey400 font-semibold text-[20px]">
            {doctor?.name || 'Doctor'}
          </span>
          <div className={`min-w-[22px] px-[6px] py-[2px] rounded-sm ${isActive ? 'bg-success-100' : 'bg-[#FFF8F2]'}`}>
            <span className={` text-sm ${isActive ? 'text-success-300' : 'text-[#F59E0B]'}`}>{isActive ? 'Active' : 'Inactive'}</span>
          </div>
          <div
            ref={clinicRef}
            onClick={() => setIsClinicOpen(!isClinicOpen)}
            className={`bg-secondary-grey50 flex items-center px-[6px] py-[2px] gap-1 border hover:border-blue-primary150 rounded-sm  transition-colors hover:text-blue-primary250 relative cursor-pointer select-none ${isClinicOpen ? ' border-blue-primary150 text-blue-primary250' : 'border-transparent text-secondary-grey400'}`}
          >
            <img src={hospital} alt="" className='h-4 w-4' />
            <span className=" text-sm font-normal">
              {doctor?.clinicHospitalName || 'Sunrise Family Clinic'}
            </span>
            <div className='flex items-center pl-2 pr-1 border-l ml-1 '>
              <img
                src={down}
                alt=""
                className={`w-3 h-3 transition-transform duration-200 ${isClinicOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {isClinicOpen && (
              <div className="absolute top-full left-0 mt-1 p-2  bg-white shadow-lg rounded-lg border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className='flex flex-col gap-1'>
                  <span className='text-secondary-grey300 px-2 font-medium text-[12px]'>SWITCH ACCOUNT</span>
                  <FacilityCard
                    name="Chauhan Clinic"
                    location="Aundh"
                    variant="clinic"
                    selected={selectedId === 1}
                    onClick={() => setSelectedId(1)}
                  />



                  <div className='h-[32px] px-2 flex gap-1 items-center hover:bg-secondary-grey50'>
                    <Plus className='w-3.5 h-3.5' />
                    <span className='text-blue-primary250 text-[14px]'>Add Branch</span>
                  </div>


                </div>

                <div className='bg-secondary-grey100/50 h-[1px] mt-1 mb-2'></div>
                <div className='flex flex-col gap-1'>
                  <FacilityCard
                    name="Chauhan Hospital"
                    location="Baner"
                    variant="hospital"
                    selected={selectedId === 2}
                    onClick={() => setSelectedId(2)}
                  />
                </div>

              </div>
            )}

          </div>
          <div>
            <Badge
              size="xs"
              color="warning"
              leadingIcon={<img src={star} alt="" className='w-2.5' />}
            >
              {doctor?.rating || '4.5'}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm text-secondary-grey400">
          <div className="flex gap-1 items-center">
            <img src={docIcon} alt="Doctor icon" className="w-4 h-4" />
            <span className="">
              {doctor?.designation || 'MBBS, MD - General Medicine'}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <img src={blueBag} alt="Blue bag icon" className="w-4 h-4" />
            <span className="">{doctor?.specialization || 'General Physician'}</span>
          </div>
          <div className="flex  items-center gap-1">
            <img src={whiteBag} alt="White bag icon" className="w-4 h-4" />
            <span className="">{doctor?.exp || 'Experience details'}</span>
          </div>
        </div>
      </div>



      {/* Info Boxes + menu */}
      <div className="flex items-start gap-4">
        <InfoBox label="No. of Patient Managed" value="1,000" valueClass="text-[#2372EC]" />
        <InfoBox label="No. of Appointments Booked" value="1,000" valueClass="text-[#2372EC]" />
        <InfoBox label="Active Package" value={doctor?.activePackage || '-'} valueClass="text-green-600" />
        <InfoBox label="eClinic-Q ID" value={doctor?.id || '-'} valueClass="text-[#2372EC] break-all" />
        <div className="relative" ref={actionMenuRef}>
          <button
            onClick={() => setShowActionMenu(!showActionMenu)}
            className="p-2 text-gray-500 hover:text-gray-700 mr-2 ml-1 mt-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="More options"
          >
            <img src={horizontal} alt="" />
          </button>
          {showActionMenu && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-white shadow-lg rounded-lg border border-gray-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-100">
              <button className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <Calendar size={16} className="text-gray-500" />
                Update Availability Timing
              </button>
              <button className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <CalendarOff size={16} className="text-gray-500" />
                Set Out of Office
              </button>
              <button className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <Link size={16} className="text-gray-500" />
                Send Magic Link
              </button>
              <button className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <UserX size={16} className="text-gray-500" />
                Mark as Inactive
              </button>
              <div className="h-[1px] bg-gray-100 my-1 mx-2" />
              <button className="w-full text-left px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 flex items-center gap-3">
                <Trash2 size={16} />
                Delete Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorBanner;
