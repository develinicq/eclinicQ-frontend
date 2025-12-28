import React, { useEffect, useMemo, useState } from "react";
import GeneralDrawer from "@/components/GeneralDrawer/GeneralDrawer";
import InputWithMeta from "@/components/GeneralDrawer/InputWithMeta";
import Dropdown from "@/components/GeneralDrawer/Dropdown";
import RadioButton from "@/components/GeneralDrawer/RadioButton";
import { ChevronDown } from "lucide-react";

/**
 * EditBasicInfoDrawer — doctor settings: Basic Info form.
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - onSave: (data) => void
 * - initialData: object with doctor fields
 */
export default function EditBasicInfoDrawer({ open, onClose, onSave, initialData = {} }) {
  const [firstName, setFirstName] = useState(initialData.firstName || "");
  const [lastName, setLastName] = useState(initialData.lastName || "");
  const [mobile, setMobile] = useState(initialData.mobile || initialData.phone || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [gender, setGender] = useState(initialData.gender || "");
  const [city, setCity] = useState(initialData.city || "");
  const [cityOpen, setCityOpen] = useState(false);
  const [languages, setLanguages] = useState(Array.isArray(initialData.languages) ? initialData.languages : []);
  const [website, setWebsite] = useState(initialData.website || "");
  const [headline, setHeadline] = useState(initialData.headline || "");
  const [about, setAbout] = useState(initialData.about || "");

  // Re-hydrate form state whenever drawer opens or initialData updates
  useEffect(() => {
    if (!open) return;
    const normGender = (() => {
      const g = initialData.gender || "";
      if (!g) return "";
      const cap = g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();
      return ["Male", "Female", "Other"].includes(cap) ? cap : cap;
    })();
    setFirstName(initialData.firstName || "");
    setLastName(initialData.lastName || "");
    setMobile(initialData.mobile || initialData.phone || "");
    setEmail(initialData.email || "");
    setGender(normGender);
    setCity(initialData.city || "");
  setCityOpen(false);
    setLanguages(Array.isArray(initialData.languages) ? initialData.languages : []);
    setWebsite(initialData.website || "");
    setHeadline(initialData.headline || "");
    setAbout(initialData.about || "");
  }, [open, initialData]);

  const genders = ["Male", "Female", "Other"]; // radio group in UI
  const cityOptions = useMemo(() => [
    "Akola, Maharashtra",
    "Mumbai, Maharashtra",
    "Pune, Maharashtra",
    "Nagpur, Maharashtra",
  ], []);
  // Language options will come from API via initialData.languages; no static options needed here.

  const canSave = () => {
    return Boolean(firstName && lastName && mobile);
  };

  const save = () => {
    if (!canSave()) return;
    const data = {
      firstName,
      lastName,
      mobile,
      email,
      gender,
      city,
      languages,
      website,
      headline,
      about,
    };
    onSave?.(data);
    onClose?.();
  };

  return (
    <GeneralDrawer
      isOpen={open}
      onClose={onClose}
      title="Edit Basic Info"
      primaryActionLabel="Update"
      onPrimaryAction={save}
      primaryActionDisabled={!canSave()}
      width={600}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
          <InputWithMeta label="First Name" requiredDot value={firstName} onChange={setFirstName} placeholder="Enter First Name" />
          <InputWithMeta label="Last Name" requiredDot value={lastName} onChange={setLastName} placeholder="Enter Last Name" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
          <InputWithMeta label="Mobile Number" requiredDot value={mobile} onChange={setMobile} placeholder="Enter Mobile Number" />
          <InputWithMeta label="Email" value={email} onChange={setEmail} placeholder="Enter Email" />
        </div>

        {/* Gender + Language in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-secondary-grey300 flex items-center gap-1">
         Gender
            <div className="bg-red-500 w-1 h-1 rounded-full"></div>
        
        </label>
            <div className="flex items-center gap-3 ">
              {genders.map((g) => (
                <RadioButton key={g} name="gender" value={g} checked={gender === g} onChange={(v) => setGender(v)} label={g} />
              ))}
            </div>
          </div>

          {/* Language chips inside input field (no dropdown icon) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-secondary-grey300">Language</label>
            <div className="w-full rounded-md border-[0.5px] border-secondary-grey300 p-1 min-h-8 text-sm text-secondary-grey400 flex flex-wrap gap-1">
              {Array.isArray(languages) && languages.length > 0 ? (
                languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center h-5 gap-1 px-[6px]  text-sm rounded  bg-secondary-grey50 text-secondary-grey400"
                  >
                    <span>{lang}</span>
                    <button
                      type="button"
                      aria-label={`remove ${lang}`}
                      className="text-secondary-grey300 hover:text-gray-700"
                      onClick={() => setLanguages((prev) => prev.filter((l) => l !== lang))}
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-secondary-grey100 px-1">Select Language</span>
              )}
            </div>
          </div>
        </div>

        {/* City + Website on the same row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <InputWithMeta
              label="City"
              value={city}
              onChange={setCity}
              placeholder="Select City"
              requiredDot
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

          <InputWithMeta label="Website" value={website} onChange={setWebsite} placeholder="Paste Website Link" />
        </div>

        


        {/* Profile Headline with counter */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-secondary-grey300">Profile Headline</label>
          <div className="w-full rounded-md border-[0.5px] border-secondary-grey300">
            <textarea
              className="w-full p-2 h-16 text-sm text-secondary-grey400 placeholder:text-secondary-grey100 focus:ring-0 focus:outline-none resize-none rounded-md"
              value={headline}
              onChange={(e) => setHeadline(e.target.value.slice(0, 220))}
              placeholder=""
              maxLength={220}
            />
            <div className="text-[11px] text-secondary-grey200 pr-2 pb-1 text-right">
              {headline?.length || 0}/220
            </div>
          </div>
        </div>

        {/* About Us with toolbar and bordered box */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-secondary-grey300">About Us</label>
          <div className="w-full rounded-md border-[0.5px] border-secondary-grey300 overflow-hidden">
            <div className="flex items-center gap-3 px-2 py-1 border-b border-secondary-grey200 text-secondary-grey300 text-sm">
              <button type="button" className="hover:text-gray-700" aria-label="attach">
                📎
              </button>
              <button type="button" className="hover:text-gray-700 font-bold" aria-label="bold">B</button>
              <button type="button" className="hover:text-gray-700 italic" aria-label="italic">I</button>
              <button type="button" className="hover:text-gray-700 underline" aria-label="underline">U</button>
              <button type="button" className="hover:text-gray-700" aria-label="list">≡</button>
            </div>
            <textarea
              className="w-full p-2 h-28 text-sm text-secondary-grey400 placeholder:text-secondary-grey100 focus:ring-0 outline-none resize-none"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder=""
            />
          </div>
        </div>
      </div>
    </GeneralDrawer>
  );
}
