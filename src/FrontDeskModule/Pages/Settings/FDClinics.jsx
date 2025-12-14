import React, { useMemo, useState, useEffect } from 'react'
import { CheckCircle2, FileText, Pencil } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import AvatarCircle from '../../../components/AvatarCircle'
import Input from '../../../components/FormItems/Input'
import MapLocation from '../../../components/FormItems/MapLocation'
import { hospital } from '../../../../public/index.js'
import useClinicStore from '../../../store/settings/useClinicStore'

const SectionCard = ({ title, subtitle, action, children }) => (
  <div className="bg-white rounded-lg border border-gray-200">
    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
      <div className="text-sm">
        <div className="font-medium text-gray-900">{title}</div>
        {subtitle ? <div className="text-[12px] text-gray-500">{subtitle}</div> : null}
      </div>
      {action}
    </div>
    <div className="p-4">{children}</div>
  </div>
)

export default function FDClinics() {
  const profile = useMemo(() => ({ name: 'Front Desk' }), [])
  
  // Clinic store
  const {
    clinic,
    fetchClinicInfo,
    updateClinicInfo,
  } = useClinicStore();

  const [clinicEditMode, setClinicEditMode] = useState(false);

  // Clinic form state
  const [clinicForm, setClinicForm] = useState({
    name: '',
    phone: '',
    email: '',
    establishmentDate: '',
    noOfBeds: '',
    about: '',
    blockNo: '',
    areaStreet: '',
    landmark: '',
    pincode: '',
    city: '',
    state: ''
  });

  // Fetch clinic info on mount
  useEffect(() => {
    fetchClinicInfo().catch(() => {
      console.log("Error in fetch clinic info");
    });
  }, [fetchClinicInfo]);

  // Update clinic form when clinic data is loaded
  useEffect(() => {
    if (clinic) {
      setClinicForm({
        name: clinic.name || '',
        phone: clinic.phone || '',
        email: clinic.email || '',
        establishmentDate: clinic.establishmentDate ? clinic.establishmentDate.split('T')[0] : '',
        noOfBeds: clinic.noOfBeds || '',
        about: clinic.about || '',
        blockNo: clinic.blockNo || '',
        areaStreet: clinic.areaStreet || '',
        landmark: clinic.landmark || '',
        pincode: clinic.pincode || '',
        city: clinic.city || '',
        state: clinic.state || 'Maharashtra'
      });
    }
  }, [clinic]);

  return (
    <div className="px-6 pb-10">
      {/* Header with banner + avatar + tabs */}
      <div className="-mx-6">
        <div className="relative">
          <img src={hospital} alt="cover" className="w-full h-32 object-cover" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <div className="rounded-full ring-4 ring-white shadow-md">
              <AvatarCircle name={profile.name} size="l" color="blue" className="w-20 h-20 text-2xl" />
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 pt-10">
            <nav className="flex items-center gap-6 overflow-x-auto text-sm">
              <NavLink to="/fd/settings/clinics" className={({isActive})=>`pb-3 border-b-2 ${isActive? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>Clinic Details</NavLink>
              <NavLink to="/fd/settings/consultation" className={({isActive})=>`pb-3 border-b-2 ${isActive? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>Consultation Details</NavLink>
              <NavLink to="/fd/settings/staff-permissions" className={({isActive})=>`pb-3 border-b-2 ${isActive? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>Staff Permissions</NavLink>
            </nav>
          </div>
        </div>
      </div>

      {/* Content copied from Doctor Settings – Clinical Details */}
      <div className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-6">
          <SectionCard 
            title="Clinic Info" 
            subtitle="Visible to Patient"
            action={
              <button 
                onClick={() => setClinicEditMode(!clinicEditMode)}
                className="text-gray-400 hover:text-blue-600 transition"
                title={clinicEditMode ? "Cancel" : "Edit"}
              >
                {clinicEditMode ? '✕' : <Pencil size={18} />}
              </button>
            }
          >
            <div className="space-y-3">
              <Input 
                label="Clinic Name" 
                compulsory 
                placeholder="Clinic Name" 
                value={clinicForm.name}
                onChange={(e) => setClinicForm({...clinicForm, name: e.target.value})}
                disabled={!clinicEditMode}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Input 
                    label="Mobile Number" 
                    placeholder="91753 67487" 
                    value={clinicForm.phone}
                    onChange={(e) => setClinicForm({...clinicForm, phone: e.target.value})}
                    disabled={!clinicEditMode}
                  />
                  <div className="mt-1 text-[12px] text-green-600 inline-flex items-center gap-1"><CheckCircle2 size={14}/>Verified</div>
                </div>
                <div>
                  <Input 
                    label="Email" 
                    compulsory 
                    placeholder="email@example.com" 
                    value={clinicForm.email}
                    onChange={(e) => setClinicForm({...clinicForm, email: e.target.value})}
                    disabled={!clinicEditMode}
                  />
                  <div className="mt-1 text-[12px] text-green-600 inline-flex items-center gap-1"><CheckCircle2 size={14}/>Verified</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input 
                  label="Establishment Date" 
                  compulsory 
                  type="date" 
                  value={clinicForm.establishmentDate}
                  onChange={(e) => setClinicForm({...clinicForm, establishmentDate: e.target.value})}
                  disabled={!clinicEditMode}
                />
                <div>
                  <label className="text-sm text-gray-700">Establishment Proof</label>
                  <div className="mt-1 h-[32px] border border-gray-300 rounded-lg flex items-center justify-between px-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600"><span className="inline-flex items-center justify-center w-5 h-5 rounded bg-gray-100"><FileText size={14}/></span> {clinic?.proof ? 'Establishment.pdf' : 'No file'}</div>
                    <button className="text-blue-600 text-xs">Change</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                <div>
                  <label className="text-sm text-gray-700">Number of Beds</label>
                  <div className="mt-1 flex items-center gap-2">
                    <input 
                      className="h-8 w-full border border-gray-300 rounded-lg px-2 text-sm" 
                      placeholder="Enter Number of Beds" 
                      value={clinicForm.noOfBeds}
                      onChange={(e) => setClinicForm({...clinicForm, noOfBeds: e.target.value})}
                      disabled={!clinicEditMode}
                    />
                    <span className="text-xs text-gray-500">Beds</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-700 mb-1">About Clinic</div>
                <div className="border border-gray-200 rounded-md">
                  <div className="px-2 py-1 border-b border-gray-200 text-gray-600 text-sm flex items-center gap-2">
                    <button className="hover:text-gray-900">✎</button>
                    <button className="hover:text-gray-900 font-bold">B</button>
                    <button className="hover:text-gray-900 italic">I</button>
                    <button className="hover:text-gray-900 underline">U</button>
                    <button className="hover:text-gray-900">•</button>
                  </div>
                  <textarea 
                    className="w-full min-h-[140px] p-3 text-sm outline-none" 
                    value={clinicForm.about}
                    onChange={(e) => setClinicForm({...clinicForm, about: e.target.value})}
                    disabled={!clinicEditMode}
                  />
                  <div className="px-3 pb-2 text-[12px] text-gray-500 text-right">{clinicForm.about.length}/1600</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-700 mb-2">Clinic Photos</div>
                <div className="flex flex-wrap gap-3 items-center">
                  {clinic?.clinicPhotos && clinic.clinicPhotos.length > 0 ? (
                    clinic.clinicPhotos.map((photo, i) => (
                      <div key={i} className="w-28 h-20 bg-gray-100 rounded-md border border-gray-200 overflow-hidden">
                        <img src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173'}/${photo}`} alt={`Clinic ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    [1,2,3,4].map((i) => (<div key={i} className="w-28 h-20 bg-gray-100 rounded-md border border-gray-200" />))
                  )}
                  <label className="w-40 h-20 border border-dashed border-gray-300 rounded-md grid place-items-center text-blue-600 text-sm cursor-pointer">
                    <input type="file" className="hidden" /> Upload File
                  </label>
                </div>
                <div className="text-[12px] text-gray-500 mt-1">Support Size upto 2MB in .png, .jpg, .svg, .webp</div>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <SectionCard title="Clinic Address" subtitle="Visible to Patient">
            <div className="space-y-3">
              <label className="text-sm text-gray-700">Map Location</label>
              <div className="h-[220px]">
                <MapLocation 
                  heightClass="h-full" 
                  addButtonLabel="Add Location" 
                  initialPosition={
                    clinic?.latitude && clinic?.longitude 
                      ? [parseFloat(clinic.latitude), parseFloat(clinic.longitude)]
                      : null
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input 
                  label="Block no./Shop no./House no." 
                  compulsory 
                  placeholder="Shop No 2" 
                  value={clinicForm.blockNo}
                  onChange={(e) => setClinicForm({...clinicForm, blockNo: e.target.value})}
                  disabled={!clinicEditMode}
                />
                <Input 
                  label="Road/Area/Street" 
                  compulsory 
                  placeholder="Jawahar Nagar, Gokul Colony" 
                  value={clinicForm.areaStreet}
                  onChange={(e) => setClinicForm({...clinicForm, areaStreet: e.target.value})}
                  disabled={!clinicEditMode}
                />
                <Input 
                  label="Landmark" 
                  compulsory 
                  placeholder="Near Chowk" 
                  value={clinicForm.landmark}
                  onChange={(e) => setClinicForm({...clinicForm, landmark: e.target.value})}
                  disabled={!clinicEditMode}
                />
                <Input 
                  label="Pincode" 
                  compulsory 
                  placeholder="444001" 
                  value={clinicForm.pincode}
                  onChange={(e) => setClinicForm({...clinicForm, pincode: e.target.value})}
                  disabled={!clinicEditMode}
                />
                <Input 
                  label="City" 
                  compulsory 
                  placeholder="Akola" 
                  value={clinicForm.city}
                  onChange={(e) => setClinicForm({...clinicForm, city: e.target.value})}
                  disabled={!clinicEditMode}
                />
                <div>
                  <label className="text-sm text-gray-700">State</label>
                  <select 
                    className="mt-1 h-8 w-full border border-gray-300 rounded-lg px-2 text-sm"
                    value={clinicForm.state}
                    onChange={(e) => setClinicForm({...clinicForm, state: e.target.value})}
                    disabled={!clinicEditMode}
                  >
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                    <option>Gujarat</option>
                  </select>
                </div>
              </div>
            </div>
          </SectionCard>
          {clinicEditMode && (
            <div className="flex justify-end mt-4">
              <button 
                onClick={async () => {
                  try {
                    await updateClinicInfo(clinicForm);
                    setClinicEditMode(false);
                  } catch (error) {
                    console.error('Error updating clinic info:', error);
                  }
                }}
                className="px-4 h-9 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
