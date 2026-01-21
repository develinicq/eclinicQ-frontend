import React, { useMemo, useState, useEffect } from 'react'
import { CheckCircle2, Pencil } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import AvatarCircle from '../../../components/AvatarCircle'
import MapLocation from '../../../components/FormItems/MapLocation'
import { hospital, verifiedTick, pencil } from '../../../../public/index.js'
import useClinicStore from '../../../store/settings/useClinicStore'
import useFrontDeskAuthStore from '../../../store/useFrontDeskAuthStore'
import { getPublicUrl } from '../../../services/uploadsService'
import EditClinicDetailsDrawer from '../../../DoctorModule/Pages/Settings/Drawers/EditClinicDetailsDrawer'
import InputWithMeta from '../../../components/GeneralDrawer/InputWithMeta'

const InfoField = ({ label, value, right, className: Class }) => (
  <div className={`${Class} flex flex-col gap-1 text-[14px] border-b-[0.5px] pb-2 border-secondary-grey100`}>
    <div className="text-secondary-grey200">{label}</div>
    <div className="text-secondary-grey400 flex items-center justify-between">
      <span className="truncate">{value || "-"}</span>
      {right}
    </div>
  </div>
);

const SectionCard = ({ title, subtitle, headerRight, Icon, onIconClick, children }) => (
  <div className="px-4 py-3 flex flex-col gap-3 bg-white rounded-lg border border-gray-200">
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-sm">
          <div className="font-medium text-[14px] text-gray-900">{title}</div>
          {subtitle && (
            <div className="px-1 border border-secondary-grey50 bg-secondary-grey50 rounded-sm text-[12px] text-gray-500">
              {subtitle}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {headerRight}
        {Icon && (
          <button onClick={onIconClick} className="p-1 text-gray-500 hover:bg-gray-50">
            {typeof Icon === "string" ? <img src={Icon} alt="icon" className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
          </button>
        )}
      </div>
    </div>
    <div>{children}</div>
  </div>
);

export default function FDClinics() {
  const { user } = useFrontDeskAuthStore();
  const { clinic, fetchClinicInfo } = useClinicStore();
  const [clinicDrawerOpen, setClinicDrawerOpen] = useState(false);
  const [resolvedClinicPhotos, setResolvedClinicPhotos] = useState([]);

  useEffect(() => {
    fetchClinicInfo();
  }, [fetchClinicInfo]);

  useEffect(() => {
    const resolvePhotos = async () => {
      if (!clinic) return;
      const photosToResolve = Array.isArray(clinic.clinicPhotos) && clinic.clinicPhotos.length > 0
        ? clinic.clinicPhotos
        : (clinic.image ? [clinic.image] : []);

      if (photosToResolve.length > 0) {
        try {
          const urls = await Promise.all(photosToResolve.map(key => getPublicUrl(key)));
          setResolvedClinicPhotos(urls.filter(Boolean));
        } catch (e) {
          console.error("Failed to resolve clinic photos", e);
        }
      } else {
        setResolvedClinicPhotos([]);
      }
    };
    resolvePhotos();
  }, [clinic]);

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="px-6 pb-10">
        {/* Header with banner + avatar + tabs */}
        <div className="-mx-6">
          <div className="relative">
            <img src={hospital} alt="cover" className="w-full h-32 object-cover" />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
              <div className="rounded-full ring-4 ring-white shadow-md">
                <AvatarCircle name={user?.name} size="l" color="blue" className="w-20 h-20 text-2xl" />
              </div>
            </div>
          </div>
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 pt-10">
              <nav className="flex items-center gap-6 overflow-x-auto text-sm">
                <NavLink to="/fd/settings/clinics" className={({ isActive }) => `pb-3 border-b-2 ${isActive ? 'border-blue-600 text-blue-primary250' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>Clinic Details</NavLink>
                <NavLink to="/fd/settings/consultation" className={({ isActive }) => `pb-3 border-b-2 ${isActive ? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>Consultation Details</NavLink>
                <NavLink to="/fd/settings/staff-permissions" className={({ isActive }) => `pb-3 border-b-2 ${isActive ? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>Staff Permissions</NavLink>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-6">
            <SectionCard
              title="Clinic Info"
              subtitle="Visible to Patient"
              Icon={pencil}
              onIconClick={() => setClinicDrawerOpen(true)}
            >
              <div className="space-y-4">
                <InfoField label="Clinic Name" value={clinic?.name} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField
                    label="Mobile Number"
                    value={clinic?.phone}
                    right={<span className="inline-flex items-center text-success-300 border bg-success-100 border-success-300 py-0.5 px-1 rounded-md text-[12px]"><img src={verifiedTick} alt="V" className="w-3.5 h-3.5 mr-1" />Verified</span>}
                  />
                  <InfoField
                    label="Email"
                    value={clinic?.email}
                    right={<span className="inline-flex items-center text-success-300 border bg-success-100 border-success-300 py-0.5 px-1 rounded-md text-[12px]"><img src={verifiedTick} alt="V" className="w-3.5 h-3.5 mr-1" />Verified</span>}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="Establishment Date" value={clinic?.establishmentDate ? new Date(clinic.establishmentDate).toLocaleDateString() : "-"} />
                  <InputWithMeta
                    label="Establishment Proof"
                    imageUpload={true}
                    fileName={(() => {
                      const url = String(clinic?.proofDocumentUrl || clinic?.establishmentProof || "");
                      return url ? (url.split("/").pop() || "Establishment.pdf") : "Establishment.pdf";
                    })()}
                    onFileView={() => {
                      const url = clinic?.proofDocumentUrl || clinic?.establishmentProof;
                      if (url) window.open(url, "_blank");
                    }}
                    disabled={true}
                  />
                </div>
                <div>
                  <div className="text-[14px] text-secondary-grey200 mb-1">About</div>
                  <p className="text-sm text-secondary-grey400 leading-relaxed">{clinic?.about || "-"}</p>
                </div>
                <div>
                  <div className="text-[14px] text-secondary-grey200 mb-2">Clinic Photos</div>
                  <div className="flex gap-4 flex-wrap">
                    {resolvedClinicPhotos.length > 0 ? resolvedClinicPhotos.map((url, i) => (
                      <div key={i} className="w-[120px] h-[120px] rounded-md overflow-hidden border bg-gray-100">
                        <img src={url} alt={`P${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    )) : [1, 2, 3, 4].map(i => <div key={i} className="w-[120px] h-[120px] rounded-md overflow-hidden border bg-gray-100" />)}
                  </div>
                  <div className="mt-2 text-[11px] text-gray-400">Support Size upto 2MB in .png, .jpg, .svg, .webp</div>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="col-span-12 xl:col-span-6">
            <SectionCard
              title="Clinic Address"
              subtitle="Visible to Patient"
              Icon={pencil}
              onIconClick={() => setClinicDrawerOpen(true)}
            >
              <div className="space-y-4">
                <div className="h-[220px] rounded overflow-hidden border">
                  <MapLocation
                    heightClass="h-full"
                    initialPosition={[parseFloat(clinic?.latitude) || 19.07, parseFloat(clinic?.longitude) || 72.87]}
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="Block no./Shop no./House no." value={clinic?.blockNo} />
                  <InfoField label="Road/Area/Street" value={clinic?.areaStreet} />
                  <InfoField label="Landmark" value={clinic?.landmark} />
                  <InfoField label="Pincode" value={clinic?.pincode} />
                  <InfoField label="City" value={clinic?.city} />
                  <InfoField label="State" value={clinic?.state} />
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>

      <EditClinicDetailsDrawer
        open={clinicDrawerOpen}
        onClose={() => setClinicDrawerOpen(false)}
        initial={{
          name: clinic?.name || "",
          phone: clinic?.phone || "",
          email: clinic?.email || "",
          establishmentDate: clinic?.establishmentDate || "",
          proof: clinic?.proofDocumentUrl || clinic?.establishmentProof || "",
          noOfBeds: clinic?.noOfBeds || "",
          about: clinic?.about || "",
          clinicPhotos: Array.isArray(clinic?.clinicPhotos) && clinic.clinicPhotos.length > 0 ? clinic.clinicPhotos : (clinic?.image ? [clinic.image] : []),
          latitude: clinic?.latitude || null,
          longitude: clinic?.longitude || null,
          blockNo: clinic?.blockNo || "",
          areaStreet: clinic?.areaStreet || "",
          landmark: clinic?.landmark || "",
          pincode: clinic?.pincode || "",
          city: clinic?.city || "",
          state: clinic?.state || "Maharashtra",
        }}
        onSave={async () => {
          await fetchClinicInfo();
        }}
      />
    </div>
  )
}
