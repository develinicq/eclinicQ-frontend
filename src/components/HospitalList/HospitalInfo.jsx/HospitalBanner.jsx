import { LocateIcon } from 'lucide-react'
import React from 'react'

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

  const statCards = [
    { label: "No. of Patient Managed", value: stats.patientsManaged },
    { label: "No. of Appointments Booked", value: stats.appointmentsBooked },
    { label: "Active Package", value: stats.activePackage, valueColor: "text-green-600" },
    { label: "eClinic QID", value: stats.eClinicQID },
    { label: "Active Package", value: stats.activePackage, valueColor: "text-green-600" },
    { label: "eClinic QID", value: stats.eClinicQID },
    { label: "Active Package", value: stats.activePackage, valueColor: "text-green-600" },
    { label: "eClinic QID", value: stats.eClinicQID }
  ]

  return (
    <div>
      {/* Banner Section */}
      <div className='relative w-full h-[179px]'>
        <img 
          src={bannerImage} 
          className='h-[140px] w-full object-cover' 
          alt={`${name} banner`} 
        />
        <img 
          src={logoImage} 
          alt={`${name} logo`} 
          className='absolute rounded-full w-[60px] h-[60px] bottom-2 border-[2px] border-[#2372EC] right-1/2 transform translate-x-1/2'/>
      </div>
      
      {/* Content Section */}
      <div className='px-4 pt-3 pb-1 flex flex-col gap-5'>
        {/* Hospital Info */}
        <div className='flex flex-col gap-2 items-center'>
          {/* Name and Status */}
          <div className='flex gap-3 items-center'>
            <span className='font-semibold text-xl text-[#424242]'>{name}</span>
            <div className='rounded-md min-w-[22px] py-[1px] px-[6px] bg-[#F2FFF3]'>
              <span className='text-sm text-[#3EAF3F]'>{status}</span>
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

        {/* Stats Grid */}
        <div className="flex justify-between">
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
  )
}

export default HospitalBanner
