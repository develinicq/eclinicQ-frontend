import React, { useEffect, useState } from 'react'

import AvatarCircle from '../../AvatarCircle'
import { getDownloadUrl } from '../../../services/uploadsService'
import {verified,mapPoint,medicineBox,box,globe,threedots} from "/Users/khushiagrawal1367/Desktop/eclinicQ-frontend/public/index.js"

// Reusable Stat Card Component (Matched to InfoBox style)
const StatCard = ({ label, value, valueClass = "text-[#2372EC]" }) => (
  <div className="w-[116px] h-[90px] border-dashed border border-secondary-grey100/50 rounded-sm text-left p-[10px]">
    <div className='flex flex-col h-full justify-between items-start'>
      <span className="text-[#626060] text-sm text-left" style={{ lineHeight: '17px' }}>{label}</span>
      <span className={`font-semibold text-sm text-left ${valueClass}`} style={{ lineHeight: '17px' }}>{value}</span>
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
  }
}) => {
  const { name, status, address, type, established, website, bannerImage, logoImage, stats } = hospitalData
  const [resolvedLogo, setResolvedLogo] = useState('')

  useEffect(() => {
    let ignore = false
    const run = async () => {
      try {
        const l = await getDownloadUrl(logoImage)
        if (!ignore) setResolvedLogo(l || '')
      } catch {
        if (!ignore) setResolvedLogo('')
      }
    }
    if (logoImage) run()
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
    <div className="w-full p-4 flex items-center gap-4 bg-white">
      {/* Profile Circle with tick */}
      <div className="relative">
        <div className="w-[90px] h-[90px] rounded-full overflow-hidden border border-gray-100">
          <img
            src={resolvedLogo || logoImage || '/images/hospital_logo.png'}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = '/images/hospital_logo.png' }}
          />
        </div>
        <img src={verified} alt="Verified" className="absolute -bottom-0 left-16 w-6 h-6" />
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
           <img src={mapPoint} alt="map-point" />
            <span className="line-clamp-1">{address}</span>
          </div>
          <div className="flex gap-2 items-center">
           <img src={medicineBox} alt="medical-box" />
            <span>{type}</span>
            <span className="text-gray-300">|</span>
          <img src={box} alt="est-box" />
            <span>Est. {established}</span>
          </div>
          <div className="flex gap-2 items-center">
           <img src={globe} alt="globe" />
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
        <button className="p-2 text-gray-500 hover:text-gray-700 mt-2" aria-label="More options">
          <img src={threedots} alt="More options"  />
        </button>
      </div>
    </div>
  )
}

export default HospitalBanner
