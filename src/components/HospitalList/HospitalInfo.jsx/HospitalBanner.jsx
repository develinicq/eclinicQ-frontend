import React, { useEffect, useState } from 'react'
import { MapPin, Building2, Calendar, Globe, MoreHorizontal } from 'lucide-react'
import AvatarCircle from '../../AvatarCircle'
import { getPublicUrl } from '../../../services/uploadsService'
import UniversalLoader from "@/components/UniversalLoader";
const horizontal = '/horizontal.png'

// Reusable Stat Card Component (Matched to InfoBox style)
const StatCard = ({ label, value, valueClass = "text-[#2372EC]" }) => (
  <div className="w-[116px] h-[90px] border-dashed border border-secondary-grey100/50 rounded-sm text-left p-[10px]">
    <div className='flex flex-col h-full justify-between items-start'>
      <span className="text-[#626060] text-sm text-left" style={{ lineHeight: '14px' }}>{label}</span>
      <span className={`font-semibold text-sm text-left ${valueClass} break-words w-full`} style={{ lineHeight: '16px', wordBreak: 'break-word' }}>{value}</span>
    </div>
  </div>
)

const HospitalBanner = ({
  hospitalData = {
    name: "Manipal Hospital",
    status: "Active",
    address: "-",
    type: "-",
    established: "-",
    website: "-",
    bannerImage: "",
    logoImage: "",
    stats: {}
  },
  isLoading = false
}) => {
  console.log("HospitalBanner: received hospitalData:", hospitalData);
  const { name, status, address, type, established, website, bannerImage, logoImage, stats } = hospitalData
  const [resolvedLogo, setResolvedLogo] = useState('')
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => {
    let ignore = false
    const run = async () => {
      if (!logoImage) {
        setResolvedLogo('')
        return
      }
      // If it's already a URL, use it
      if (typeof logoImage === 'string' && (logoImage.startsWith('http') || logoImage.startsWith('data:') || logoImage.startsWith('/'))) {
        setResolvedLogo(logoImage)
        return
      }

      setImageLoading(true)
      try {
        const l = await getPublicUrl(logoImage)
        if (!ignore) setResolvedLogo(l || '')
      } catch {
        if (!ignore) setResolvedLogo('')
      } finally {
        if (!ignore) setImageLoading(false)
      }
    }
    run()
    return () => { ignore = true }
  }, [logoImage])

  // Determine active status for styling
  const isActive = (status || '').toLowerCase() === 'active'

  const statCards = [
    { label: "No. of Patient Manages", value: stats.patientsManaged },
    { label: "No. of Appt. Booked", value: stats.appointmentsBooked }, // Shortened label
    { label: "Active Package", value: stats.activePackage || 'Premium', valueClass: "text-[#90BE6D] font-semibold text-sm" },
    { label: "UpChar-Q ID", value: stats.upCharQId || '—' },
  ]

  return (
    <div className="w-full p-4 flex items-center gap-4 bg-white relative">
      {/* Profile Circle with tick */}
      <div className="relative">
        <div className="w-[90px] h-[90px] rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50">
          {imageLoading ? (
            <UniversalLoader size={20} />
          ) : resolvedLogo ? (
            <img
              src={resolvedLogo}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/images/hospital_logo.png' }}
            />
          ) : (
            <AvatarCircle name={name || 'Hospital'} color="blue" className="w-full h-full text-[2rem] border-none" style={{ borderWidth: 0 }} />
          )}
        </div>
        <img src="/tick.png" alt="Verified" className="absolute -bottom-0 left-16 w-6 h-6" />
      </div>

      {/* Hospital Info */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-secondary-grey400 font-semibold text-[20px]">
            {name}
          </span>
          <div className={`min-w-[22px] px-[6px] py-[2px] rounded-sm ${isActive ? 'bg-success-100' : 'bg-[#FFF8F2]'}`}>
            <span className={` text-sm ${isActive ? 'text-success-300' : 'text-[#F59E0B]'}`}>
              {status}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm text-secondary-grey400">
          <div className="flex gap-2 items-center">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="line-clamp-1">{address}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Building2 className="w-4 h-4 text-gray-400" />
            <span>{type}</span>
            <span className="text-gray-300">|</span>
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Est. {established}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Globe className="w-4 h-4 text-gray-400" />
            <a href={website} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-600 text-inherit">
              {website}
            </a>
          </div>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="flex items-start gap-4 flex-wrap justify-end max-w-[60%]">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            label={card.label}
            value={card.value}
            valueClass={card.valueClass}
          />
        ))}
        <button className="p-2 text-gray-500 hover:text-gray-700 mr-2 ml-1 mt-2" aria-label="More options">
          <img src={horizontal} alt="" />
        </button>

      </div>
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
          <UniversalLoader size={30} className="bg-white" />
        </div>
      )}
    </div>
  )
}

export default HospitalBanner
