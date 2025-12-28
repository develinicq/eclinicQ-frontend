import React, { useEffect, useMemo, useState } from "react";
import GeneralDrawer from "@/components/GeneralDrawer/GeneralDrawer";
import InputWithMeta from "@/components/GeneralDrawer/InputWithMeta";
import Dropdown from "@/components/GeneralDrawer/Dropdown";
import { ChevronDown, FileText } from "lucide-react";
import MapLocation from "@/components/FormItems/MapLocation";
import useImageUploadStore from "@/store/useImageUploadStore";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import calendarWhite from "/Doctor_module/sidebar/calendar_white.png";

/**
 * EditClinicDetailsDrawer — unified drawer for Clinic Info + Address.
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - onSave: (data) => Promise<void> | void
 * - initial: {
 *     name, phone, email, establishmentDate, proof,
 *     noOfBeds, about, clinicPhotos: string[],
 *     latitude, longitude,
 *     blockNo, areaStreet, landmark, pincode, city, state
 *   }
 */
export default function EditClinicDetailsDrawer({ open, onClose, onSave, initial = {} }) {
  // Clinic Info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [establishmentDate, setEstablishmentDate] = useState("");
  const [noOfBeds, setNoOfBeds] = useState("");
  const [about, setAbout] = useState("");
  const [proofKey, setProofKey] = useState("");
  const [proofName, setProofName] = useState("");
  const [showEstDateCalendar, setShowEstDateCalendar] = useState(false);

  // Address + Map
  const [blockNo, setBlockNo] = useState("");
  const [areaStreet, setAreaStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latLng, setLatLng] = useState({ lat: null, lng: null });

  // Photos
  const [photos, setPhotos] = useState([]); // array of storage keys

  // Dropdown open flags
  const [cityOpen, setCityOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);

  const cityOptions = useMemo(
    () => [
      "Akola, Maharashtra",
      "Mumbai, Maharashtra",
      "Pune, Maharashtra",
      "Nagpur, Maharashtra",
      "Nashik, Maharashtra",
    ],
    []
  );

  const stateOptions = useMemo(
    () => ["Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh", "Goa"],
    []
  );

  const { getUploadUrl, isLoading: uploading, error: uploadError, reset } = useImageUploadStore();

  // Calendar icon used in InputWithMeta right slot
  const CalendarWhiteIcon = () => (
    <img src={calendarWhite} alt="Calendar" className="w-4 h-4" />
  );

  // Hydrate on open
  useEffect(() => {
    if (!open) return;
    setName(initial?.name || "");
    setPhone(initial?.phone || "");
    setEmail(initial?.email || "");
    setEstablishmentDate(
      initial?.establishmentDate
        ? String(initial.establishmentDate).split("T")[0]
        : ""
    );
    setNoOfBeds(initial?.noOfBeds ? String(initial.noOfBeds) : "");
    setAbout(initial?.about || "");
    setProofKey(initial?.proof || "");
    setProofName(
      initial?.proof
        ? typeof initial.proof === "string"
          ? initial.proof.split("/").pop()
          : "Uploaded File"
        : ""
    );
    setPhotos(Array.isArray(initial?.clinicPhotos) ? initial.clinicPhotos : []);
    setBlockNo(initial?.blockNo || "");
    setAreaStreet(initial?.areaStreet || "");
    setLandmark(initial?.landmark || "");
    setPincode(initial?.pincode || "");
    setCity(initial?.city || "");
    setState(initial?.state || "Maharashtra");
    setLatLng({
      lat: initial?.latitude ? parseFloat(initial.latitude) : null,
      lng: initial?.longitude ? parseFloat(initial.longitude) : null,
    });
    setCityOpen(false);
    setStateOpen(false);
  }, [open, initial]);

  // Close calendar on outside click
  useEffect(() => {
    if (!showEstDateCalendar) return;
    const handleClickOutside = (event) => {
      const target = event.target;
      const isCalendarClick = target.closest(".shadcn-calendar-dropdown");
      if (!isCalendarClick) setShowEstDateCalendar(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEstDateCalendar]);

  const canSave = Boolean(
    name && email && blockNo && areaStreet && pincode && city && state
  );

  const onUploadProof = async (file) => {
    if (!file) return;
    try {
      reset();
      const info = await getUploadUrl(file.type, file);
      if (!info?.uploadUrl || !info?.key) return;
      await fetch(info.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      setProofKey(info.key);
      setProofName(file.name);
    } catch (e) {
      console.error("Proof upload failed", e);
    }
  };

  const onUploadPhotos = async (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    const newKeys = [];
    for (const f of files) {
      try {
        const info = await getUploadUrl(f.type, f);
        if (!info?.uploadUrl || !info?.key) continue;
        await fetch(info.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": f.type },
          body: f,
        });
        newKeys.push(info.key);
      } catch (e) {
        console.error("Photo upload failed", e);
      }
    }
    setPhotos((prev) => [...prev, ...newKeys]);
  };

  const removePhoto = (key) => setPhotos((prev) => prev.filter((k) => k !== key));

  const save = () => {
    if (!canSave) return;
    const payload = {
      name,
      phone,
      email,
      establishmentDate,
      noOfBeds: noOfBeds ? Number(noOfBeds) : undefined,
      about,
      proof: proofKey || undefined,
      clinicPhotos: photos,
      blockNo,
      areaStreet,
      landmark,
      pincode,
      city,
      state,
      latitude: latLng?.lat ?? undefined,
      longitude: latLng?.lng ?? undefined,
    };
    onSave?.(payload);
    onClose?.();
  };

  return (
    <GeneralDrawer
      isOpen={open}
      onClose={onClose}
      title="Edit Clinical Details"
      primaryActionLabel="Update"
      onPrimaryAction={save}
      primaryActionDisabled={!canSave}
      width={600}
    >
      <div className="flex flex-col gap-4">
        {/* Section: Clinic Details */}
        <div className="text-sm text-secondary-grey300 font-medium">Clinic Details</div>

        {/* Row 1: Clinic Name (full width) */}
        <div>
          <InputWithMeta label="Clinic Name" requiredDot value={name} onChange={setName} placeholder="Chauhan Clinic" />
        </div>

        {/* Row 2: Mobile + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputWithMeta label="Mobile Number" value={phone} onChange={setPhone} placeholder="91753 67487" />
          <InputWithMeta label="Email" requiredDot value={email} onChange={setEmail} placeholder="milindchachun.gmail.com" />
        </div>

        {/* Row 3: Establishment Date + Establishment Proof */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
          <div className="relative">
            <InputWithMeta
              label="Establishment Date"
              value={establishmentDate}
              onChange={setEstablishmentDate}
              placeholder="YYYY-MM-DD"
              RightIcon={CalendarWhiteIcon}
              onIconClick={() => setShowEstDateCalendar((v) => !v)}
              dropdownOpen={showEstDateCalendar}
              onRequestClose={() => setShowEstDateCalendar(false)}
            />
            {showEstDateCalendar && (
              <div className="shadcn-calendar-dropdown absolute z-[10000] mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl p-2">
                <ShadcnCalendar
                  mode="single"
                  selected={establishmentDate ? new Date(establishmentDate) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, "0");
                      const day = String(date.getDate()).padStart(2, "0");
                      setEstablishmentDate(`${year}-${month}-${day}`);
                    }
                    setShowEstDateCalendar(false);
                  }}
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  className="rounded-lg p-1"
                  classNames={{
                    day_selected: "bg-blue-600 text-white hover:bg-blue-600",
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-secondary-grey300">Establishment Proof</label>
            <label className="mt-1 h-9 border border-secondary-grey300 rounded-md flex items-center justify-between px-2 text-sm cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp, application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onUploadProof(f);
                }}
              />
              <span className="flex items-center gap-2 text-secondary-grey300">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-gray-100">
                  <FileText size={14} />
                </span>
                {uploading ? "Uploading..." : proofName || (proofKey ? "Establishment.pdf" : "Upload File")}
              </span>
              <span className="text-blue-600 text-xs">Change</span>
            </label>
            {uploadError ? (
              <div className="text-[11px] text-red-500 mt-1">{String(uploadError)}</div>
            ) : null}
          </div>
        </div>

  {/* Row 4: Number of Beds (full width) */}
  <div>
            <label className="text-sm text-secondary-grey300">Number of Beds</label>
            <div className="mt-1 relative">
              <input
                className="h-9 w-full border border-secondary-grey300 rounded-md pl-2 pr-12 text-sm outline-none"
                placeholder="Enter Number of Beds"
                value={noOfBeds}
                onChange={(e) => setNoOfBeds(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-secondary-grey200 pointer-events-none">Beds</span>
            </div>
  </div>

  <div>
          <div className="text-sm text-secondary-grey300 mb-1">About Clinic</div>
          <div className="border border-secondary-grey300 rounded-md">
            <div className="px-2 py-1 border-b border-secondary-grey200 text-secondary-grey300 text-sm flex items-center gap-2">
              <button className="hover:text-gray-700">✎</button>
              <button className="hover:text-gray-700 font-bold">B</button>
              <button className="hover:text-gray-700 italic">I</button>
              <button className="hover:text-gray-700 underline">U</button>
              <button className="hover:text-gray-700">•</button>
            </div>
            <textarea
              className="w-full min-h-[120px] p-3 text-sm outline-none"
              value={about}
              onChange={(e) => setAbout(e.target.value.slice(0, 1600))}
            />
            <div className="px-3 pb-2 text-[12px] text-secondary-grey200 text-right">{about.length}/1600</div>
          </div>
        </div>

        <div>
          <div className="text-sm text-secondary-grey300 mb-1">Clinic Photos</div>
          <div className="flex flex-wrap gap-3 items-center">
            {photos.map((key) => (
              <div key={key} className="relative w-28 h-28 bg-gray-100 rounded-md border border-gray-200 overflow-hidden">
                <img src={key} alt="Clinic" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(key)}
                  className="absolute top-1 right-1 bg-white/80 hover:bg-white text-gray-700 rounded px-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
            <label className="w-[110px] h-[110px] border border-dashed border-secondary-grey300 rounded-md grid place-items-center text-blue-600 text-sm cursor-pointer">
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
                onChange={(e) => onUploadPhotos(e.target.files)}
              />
              Upload File
            </label>
          </div>
          <div className="text-[12px] text-secondary-grey200 mt-1">
            Support Size upto 2MB in .png, .jpg, .svg, .webp
          </div>
        </div>

        {/* Section: Clinic Address */}
        <div className="text-sm text-secondary-grey300 font-medium">Clinic Address</div>
        {/* Address + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <div className="text-sm text-secondary-grey300 mb-1 flex items-center gap-1">
              Map Location <span className="text-secondary-grey200" title="Select location on map">ⓘ</span>
            </div>
            <input
              className="w-full h-8 border border-secondary-grey300 rounded-md px-2 text-sm mb-2"
              placeholder="Search Location"
              onChange={() => {}}
            />
            <div className="h-[100px] rounded-md overflow-hidden border">
              <MapLocation
                heightClass="h-full"
           
                initialPosition={latLng.lat && latLng.lng ? [latLng.lat, latLng.lng] : null}
                onChange={({ lat, lng }) => setLatLng({ lat, lng })}
              />
            </div>
          </div>

          <InputWithMeta label="Block no./Shop no./House no." requiredDot value={blockNo} onChange={setBlockNo} placeholder="Shop No 2" />
          <InputWithMeta label="Road/Area/Street" requiredDot value={areaStreet} onChange={setAreaStreet} placeholder="Jawahar Nagar, Gokul Colony" />
          <InputWithMeta label="Landmark" value={landmark} onChange={setLandmark} placeholder="Near Chowk" />
          <InputWithMeta label="Pincode" requiredDot value={pincode} onChange={(v) => setPincode(v.replace(/[^0-9]/g, "").slice(0, 6))} placeholder="444001" />

          <div className="relative">
            <InputWithMeta
              label="City"
              requiredDot
              value={city}
              onChange={setCity}
              placeholder="Akola"
              RightIcon={ChevronDown}
              onFieldOpen={() => setCityOpen((o) => !o)}
              dropdownOpen={cityOpen}
              onRequestClose={() => setCityOpen(false)}
            />
            <Dropdown
              open={cityOpen}
              onClose={() => setCityOpen(false)}
              items={cityOptions.map((c) => ({ label: c, value: c }))}
              selectedValue={city}
              onSelect={(it) => {
                setCity(it.value);
                setCityOpen(false);
              }}
              anchorClassName="w-full h-0"
              className="input-meta-dropdown w-full"
            />
          </div>

          <div className="relative">
            <InputWithMeta
              label="State"
              requiredDot
              value={state}
              onChange={() => {}}
              placeholder="Maharashtra"
              RightIcon={ChevronDown}
              onFieldOpen={() => setStateOpen((o) => !o)}
              dropdownOpen={stateOpen}
              onRequestClose={() => setStateOpen(false)}
              readonlyWhenIcon
            />
            <Dropdown
              open={stateOpen}
              onClose={() => setStateOpen(false)}
              items={stateOptions.map((s) => ({ label: s, value: s }))}
              selectedValue={state}
              onSelect={(it) => {
                setState(it.value);
                setStateOpen(false);
              }}
              anchorClassName="w-full h-0"
              className="input-meta-dropdown w-full"
            />
          </div>
        </div>

        {/* Bottom upload: Upload Clinic Image (extra dropzone) */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-secondary-grey300">Upload Clinic Image</label>
          <label className="mt-1 border border-dashed border-[#CFE0FF] rounded-md min-h-24 grid place-items-center text-center cursor-pointer py-4">
            <input
              type="file"
              className="hidden"
              multiple
              accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
              onChange={(e) => onUploadPhotos(e.target.files)}
            />
            <div className="flex flex-col items-center gap-1 text-[#2F66F6]">
              <span className="text-lg">⇧</span>
              <span className="text-[13px]">Drag and Drop Clinic Images</span>
            </div>
          </label>
          <div className="text-[12px] text-secondary-grey200">Support Size upto 2MB in .png, .jpg, .svg, .webp</div>
        </div>
      </div>
    </GeneralDrawer>
  );
}
