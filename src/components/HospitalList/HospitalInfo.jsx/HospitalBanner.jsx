import { LocateIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getDownloadUrl } from '../../../services/uploadsService'

// Reusable Stat Card Component
const StatCard = ({ label, value, valueColor = "text-[#2372EC]" }) => (
  <div className="w-[171.75px] h-[90px] border-dashed border border-[#D6D6D6] rounded-sm flex flex-col justify-between items-center p-2 text-center">
    <span className="text-[#626060] text-sm">{label}</span>
    <span className={`font-semibold text-sm ${valueColor}`}>{value}</span>
  </div>
)

// Reusable Info Item Component
const InfoItem = ({ icon: Icon, text }) => (
  <div className='flex gap-1 items-center'>
    <Icon className='w-4 h-4'/>
    <span className='text-[#424242] text-sm'>{text}</span>
  </div>
)

// Divider Component
const Divider = () => (
  <div className='flex gap-[10px] px-1 w-[8.5px] h-[20px] items-center'>
    <div className='border-[0.5px] h-[20px] border-[#B8B8B8]'></div>
  </div>
)

const HospitalBanner = ({ 
  hospitalData = {
    name: "Manipal Hospital - Banner",
    status: "Active",
    address: "Survey No 111/11/1, Veerbhadra Nagar Road, Mhalunge Main Road, Baner, Pune, Maharashtra - 411045.",
    type: "Multi-Speciality",
    established: "1975",
    website: "https://citygeneral.com",
    bannerImage: "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg",
    logoImage: "https://images.pexels.com/photos/230129/pexels-photo-230129.jpeg",
    stats: {
      patientsManaged: "1,000",
      appointmentsBooked: "1,000",
      activePackage: "Premium",
      eClinicQID: "D0654321"
    }
  }
}) => {
  const { name, status, address, type, established, website, bannerImage, logoImage, stats } = hospitalData
  const [resolvedBanner, setResolvedBanner] = useState('')
  const [resolvedLogo, setResolvedLogo] = useState('')
  useEffect(() => {
    let ignore = false
    const run = async () => {
      try {
        const [b, l] = await Promise.all([
          getDownloadUrl(bannerImage),
          getDownloadUrl(logoImage)
        ])
        if (!ignore) {
          setResolvedBanner(b || '')
          setResolvedLogo(l || '')
        }
      } catch {
        if (!ignore) {
          setResolvedBanner('')
          setResolvedLogo('')
        }
      }
    }
    run()
    return () => { ignore = true }
  }, [bannerImage, logoImage])

  const statCards = [
  { label: "Patients Served", value: stats.patientsManaged },
  { label: "Total Appointments Booked", value: stats.appointmentsBooked },
    { label: "Total Beds", value: stats.totalBeds || '—' },
    { label: "Total ICU Beds", value: stats.totalICUBeds || '—' },
    { label: "Total Doctors", value: stats.totalDoctors || '—' },
    { label: "Total Specializations", value: stats.totalSpecializations || '—' },
    { label: "Total Surgeries", value: stats.totalSurgeries || '—' },
    { label: "Active Package", value: stats.activePackage, valueColor: "text-green-600" },
  ]

  return (
    <div>
      {/* Banner Section */}
      <div className='relative w-full h-[179px]'>
        <img 
          src={resolvedBanner || bannerImage} 
          className='h-[140px] w-full object-cover' 
          alt={`${name} banner`} 
          onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/hospital-sample.png'; }}
        />
        {/* Circular logo with verified tick overlay */}
        <div className='absolute z-10 bottom-2 left-1/2 -translate-x-1/2 w-[60px] h-[60px]'>
          <div className='relative w-full h-full'>
            <img 
              src={resolvedLogo || logoImage}
              alt={`${name} logo`}
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/hospital_logo.png';
              }}
              className='rounded-full w-full h-full border-[2px] border-[#2372EC] bg-white object-cover'/>
            <img src='/tick.png' alt='Verified' className='absolute -top-1 -right-1 w-[18px] h-[18px]' />
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className='px-4 pt-3 pb-1 flex flex-col gap-5'>
        {/* Hospital Info */}
        <div className='flex flex-col gap-2 items-center'>
          {/* Name and Status */}
          <div className='flex gap-3 items-center'>
            <span className='font-semibold text-xl text-[#424242]'>{name}</span>
            <div className={`rounded-md min-w-[22px] py-[1px] px-[6px] ${String(status).toLowerCase()==='inactive' ? 'bg-[#FFF8F2]' : 'bg-[#F2FFF3]'}`}>
              <span className={`text-sm ${String(status).toLowerCase()==='inactive' ? 'text-[#F59E0B]' : 'text-[#3EAF3F]'}`}>{status}</span>
            </div>
          </div>

          {/* Details */}
          <div className='flex flex-col gap-1 items-center'>
            <InfoItem icon={LocateIcon} text={address} />
            
            <div className='flex gap-1 items-center'>
              <InfoItem icon={LocateIcon} text={type} />
              <Divider />
              <InfoItem icon={LocateIcon} text={`Establish in ${established} (${new Date().getFullYear() - parseInt(established)} Years of Experience)`} />
              <Divider />
              <InfoItem icon={LocateIcon} text={website} />
            </div>
          </div>
        </div>

        {/* Stats Grid (no kebab in UI) */}
        <div className="flex items-start ">
          <div className="flex gap-3 flex-wrap">
            {statCards.map((card, index) => (
              <StatCard 
                key={index}
                label={card.label}
                value={card.value}
                valueColor={card.valueColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HospitalBanner
