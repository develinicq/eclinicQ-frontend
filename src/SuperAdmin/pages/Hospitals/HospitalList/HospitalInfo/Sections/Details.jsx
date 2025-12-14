import React, { useEffect, useState } from 'react'
import { getDownloadUrl } from '../../../../../../services/uploadsService'

// Fixed label width to keep consistent spacing between labels and values
const labelWidth = 'min-w-[220px]'

const InfoRow = ({ label, value, link, verified = false, valueClassName = '' }) => (
  <div className="flex gap-36 py-[2px] items-start">
    <span className={`font-normal ${labelWidth} text-sm text-[#626060]`}>{label}</span>
    {link ? (
      <a
        href={link}
        className="font-medium text-sm text-blue-600 underline inline-flex items-center"
        target="_blank"
        rel="noreferrer"
      >
        <span>{value}</span>
        {verified ? <img src="/normal-tick.png" alt="verified" className="ml-2 h-4 w-4" /> : null}
      </a>
    ) : (
  <span className={`font-medium text-sm inline-flex items-center ${valueClassName || 'text-[#424242]'}`}>
        <span>{value}</span>
        {verified ? <img src="/normal-tick.png" alt="verified" className="ml-2 h-4 w-4" /> : null}
      </span>
    )}
  </div>
)

const InfoSection = ({ title, children }) => (
  <div className="flex flex-col gap-1 w-full m ">
    <span className="text-[#424242] font-medium text-sm">{title}</span>
    <div className="border-t border-[#D6D6D6] flex flex-col">{children}</div>
  </div>
)

const Chips = ({ title, items = [] }) => (
  <div className="flex flex-col gap-2 w-full">
    <span className="text-[#424242] font-medium text-sm">{title}</span>
    <div className="border-t border-[#D6D6D6] pt-2 flex flex-wrap gap-2">
      {items.map((t, i) => (
        <span
          key={i}
          className="px-3 py-1 rounded-md text-sm bg-[#F2F2F2] text-[#424242]"
        >
          {t}
        </span>
      ))}
    </div>
  </div>
)

const DocLink = ({ label, value }) => {
  const text = typeof value === 'object' ? (value.text ?? '-') : (value ?? '-')
  const href = typeof value === 'object' ? value.href : undefined
  const linkText = typeof value === 'object' ? (value.linkText || (href ? 'View' : '')) : ''
  return (
    <div className="border-b border-[#F0F0F0] flex items-center py-2">
      <span className={`font-normal ${labelWidth} text-sm text-[#626060] mr-36`}>{label}</span>
      <span className="text-sm font-medium text-[#424242]">{text}</span>
      {href ? (
        <a
          href={href}
          className="ml-auto text-sm font-medium text-[#2F66F6] underline"
          target="_blank"
          rel="noreferrer"
        >
          {linkText || 'View'}
        </a>
      ) : null}
    </div>
  )
}

const Details = ({ hospital }) => {
  const name = hospital?.name || '-'
  const estYear = hospital?.establishmentYear || '-'
  const estWithExp = estYear && estYear !== '-' ? `${estYear} (${new Date().getFullYear() - parseInt(estYear || '0')} Years of Experience)` : '-'
  const contactEmail = hospital?.emailId || '-'
  const contactPhone = hospital?.phone || '-'
  const emailVerified = Boolean(hospital?.isEmailVerified || hospital?.emailVerified)
  const phoneVerified = Boolean(hospital?.isPhoneVerified || hospital?.phoneVerified)
  
  // Flexible OPD/Appointment timing formatter
  const format12 = (t) => {
    if (!t || typeof t !== 'string') return null
    const [hh, mm] = t.split(':')
    if (isNaN(parseInt(hh))) return t
    let h = parseInt(hh, 10)
    const m = parseInt(mm || '0', 10)
    const ampm = h >= 12 ? 'PM' : 'AM'
    h = h % 12 || 12
    return `${h}:${String(m).padStart(2, '0')} ${ampm}`
  }
  const startT = hospital?.opdStartTime || hospital?.startTime
  const endT = hospital?.opdEndTime || hospital?.endTime
  const days = hospital?.opdDays || hospital?.workingDays || hospital?.days
  const daysText = Array.isArray(days) && days.length
    ? (days.length > 1 ? `${days[0]} to ${days[days.length - 1]}` : days[0])
    : (typeof days === 'string' ? days : null)
  const formattedTiming = (startT && endT)
    ? `${format12(startT) || startT} - ${format12(endT) || endT}${daysText ? ` (${daysText})` : ''}`
    : (hospital?.appointmentAndOpdTiming || hospital?.opdTiming || hospital?.timings || '-')

  const emergencyContact = hospital?.emergencyContactNumber || hospital?.phone || hospital?.emergencyContact || '-'
  const ambulanceContact = hospital?.phone || hospital?.ambulanceNumber || '-'
  const bloodBankContact = hospital?.bloodBankContactNumber || hospital?.phone || '-'
  const addressLine = [hospital?.address?.street, hospital?.address?.blockNo, hospital?.address?.landmark].filter(Boolean).join(', ')
  const city = hospital?.city || '-'
  const state = hospital?.state || '-'
  const zip = hospital?.pincode || '-'
  const specialties = (hospital?.specialties || hospital?.specialtiesList || []).map(s => s?.specialty?.name || s?.name).filter(Boolean)
  const services = hospital?.hospitalServices || []
  const accreditations = hospital?.accreditation || []
  const documents = hospital?.documents || []

  // Helpers to resolve document details by type keywords
  const findDoc = (keywords = []) => {
    const lower = (v) => String(v || '').toLowerCase()
    return documents.find((d) => keywords.some((k) => lower(d?.docType).includes(lower(k)))) || null
  }
  const docVal = (primary, keys = []) => primary || findDoc(keys)?.docNo || '-'
  const docUrl = (keys = []) => findDoc(keys)?.docUrl || undefined
  const primaryAdmin = Array.isArray(hospital?.adminDetails) && hospital.adminDetails.length ? hospital.adminDetails[0] : null
  const photos = Array.isArray(hospital?.photos)
      ? hospital.photos
      : (Array.isArray(hospital?.images) ? hospital.images : [])

  // Resolve photo keys to URLs (best-effort, memoized via internal state)
  const [resolvedPhotos, setResolvedPhotos] = useState([])
  useEffect(() => {
    let ignore = false
    const run = async () => {
      try {
        const keys = photos || []
        const urls = await Promise.all(keys.map((k) => getDownloadUrl(k)))
        if (!ignore) setResolvedPhotos(urls.map((u) => u || ''))
      } catch {
        if (!ignore) setResolvedPhotos([])
      }
    }
    run()
    return () => { ignore = true }
  }, [JSON.stringify(photos)])
  return (
    <div className="flex flex-col pt-3 px-3 pb-6 gap-6">
      {/* About Hospital */}
      <div className="border flex flex-col p-3 gap-2 border-[#B8B8B8] rounded-lg">
        <div className="flex gap-1 items-center">
          <span className="text-[#424242] text-sm font-semibold">About Hospital</span>
        </div>
        <span className="font-normal text-[#626060] text-xs">
          {name} provides comprehensive healthcare services. It has specialties in {specialties.length ? specialties.join(', ') : '—'}.
        </span>
      </div>

      {/* Info + Address using a fixed 7/5 grid like the reference */}
      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-12 md:col-span-6">
          <InfoSection title="Info">
            <InfoRow label="Name:" value={name} />
            <InfoRow label="Establishment Year:" value={estWithExp} />
            <InfoRow label="Appointment & OPD timing:" value={formattedTiming} />
            <InfoRow label="Hospital Contact Email:" value={contactEmail} verified={emailVerified} />
            <InfoRow label="Hospital Contact Number:" value={contactPhone} verified={phoneVerified} />
            <InfoRow label="Emergency Contact Number:" value={emergencyContact} />
            <InfoRow label="Ambulance Contact Number:" value={ambulanceContact} />
            <InfoRow label="Blood Bank Contact Number:" value={bloodBankContact} />
          </InfoSection>

          <div className="mt-6 flex flex-col gap-6">
            <Chips title="Medical Specialties" items={specialties} />
            <Chips
              title="Hospital Services & Facilities"
              items={services}
            />
            <Chips title="Accreditations" items={accreditations} />

            <div className="flex flex-col gap-1">
              <span className="text-[#424242] font-medium text-sm">Certificates & Documents</span>
              <div className="border-t border-[#D6D6D6] flex flex-col">
                <DocLink label="GST Number:" value={{ text: docVal(hospital?.gstNumber, ['gst']), href: docUrl(['gst']), linkText: 'GST Number.pdf' }} />
                <DocLink label="ABHA Facility ID:" value={{ text: docVal(hospital?.abhaFacilityId, ['abha']), href: docUrl(['abha']) }} />
                <DocLink label="CIN Number:" value={docVal(hospital?.cinNumber, ['cin'])} />
                <DocLink label="State Health Registration Number:" value={{ text: docVal(hospital?.stateHealthRegistrationNumber, ['state health','shrn']), href: docUrl(['state health','shrn']) }} />
                <DocLink label="PAN Card of Hospital:" value={{ text: docVal(hospital?.panNumber, ['pan']), href: docUrl(['pan']) }} />
                <DocLink label="Rohini ID:" value={{ text: docVal(hospital?.rohiniId, ['rohini']), href: docUrl(['rohini']) }} />
                <DocLink label="NABH Accreditation:" value={{ text: docVal(hospital?.nabhAccreditation, ['nabh']), href: docUrl(['nabh']) }} />
              </div>
            </div>
          </div>
        </div>

    <div className="col-span-12 md:col-span-6">
          <InfoSection title="Hospital Address">
            <InfoRow label="Address:" value={addressLine || '-'} />
            <InfoRow label="City:" value={city} />
            <InfoRow label="State:" value={state} />
            <InfoRow label="Zip Code:" value={zip} />
      <InfoRow label="Map Location"  />
            <div className="mt-2 border rounded-md overflow-hidden border-[#E1E1E1] w-full h-[220px]">
              <iframe
                title="Hospital Map"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.84%2C18.96%2C72.88%2C19.00&layer=mapnik&marker=18.98%2C72.86"
              />
            </div>
          </InfoSection>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[#424242] font-medium text-sm">Hospital Photos</span>
                  <div className="border-t border-[#D6D6D6] pt-3 grid grid-cols-[repeat(auto-fill,minmax(100px,100px))] justify-start gap-4">
                    {(resolvedPhotos && resolvedPhotos.filter(Boolean).length ? resolvedPhotos.filter(Boolean) : [
                      '/hospital-sample.png',
                      '/hospital-sample.png',
                      '/hospital-sample.png',
                      '/hospital-sample.png'
                    ]).map((src, idx) => (
                      <div key={idx} className="w-[100px] h-[100px] rounded-lg overflow-hidden border border-[#E3E3E3] bg-white">
                        <img src={src} alt={`Hospital photo ${idx+1}`} className="w-full h-full object-cover" loading="lazy" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='/hospital-sample.png';}} />
                      </div>
                    ))}
                  </div>
            </div>

      <div className="flex flex-col gap-1">
              <span className="text-[#424242] font-medium text-sm">Primary Admin Account Details</span>
              <div className="border-t border-[#D6D6D6] flex flex-col">
        <InfoRow label="User Name:" value={primaryAdmin?.name || '-'} />
        <InfoRow label="Email:" value={primaryAdmin?.emailId || '-'} />
        <InfoRow label="Designation:" value="Super Admin" />
        <InfoRow label="Contact:" value={primaryAdmin?.phone || '-'} />
  <InfoRow label="Role:" value="Admin" />
  <InfoRow label="MFA Status:" value="Done" valueClassName="text-[#3EAF3F]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
