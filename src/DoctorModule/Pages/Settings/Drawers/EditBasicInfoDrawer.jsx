import React, { useEffect, useMemo, useState } from "react";
import GeneralDrawer from "@/components/GeneralDrawer/GeneralDrawer";
import InputWithMeta from "@/components/GeneralDrawer/InputWithMeta";
import Dropdown from "@/components/GeneralDrawer/Dropdown";
import RadioButton from "@/components/GeneralDrawer/RadioButton";
import RichTextBox from "@/components/GeneralDrawer/RichTextBox";
import { ChevronDown, BadgeCheck } from "lucide-react";

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

  // Disable update until something has changed from initialData
  const isDirty = useMemo(() => {
    const norm = (v) => (v ?? "");
    const arrEq = (a = [], b = []) => {
      if (!Array.isArray(a) || !Array.isArray(b)) return false;
      if (a.length !== b.length) return true; // different length => dirty
      // compare as sets preserving values
      const as = [...a].sort();
      const bs = [...b].sort();
      for (let i = 0; i < as.length; i++) {
        if (as[i] !== bs[i]) return true;
      }
      return false;
    };
    return (
      norm(firstName) !== norm(initialData.firstName) ||
      norm(lastName) !== norm(initialData.lastName) ||
      norm(mobile) !== norm(initialData.mobile || initialData.phone) ||
      norm(email) !== norm(initialData.email) ||
      norm(gender) !== norm(initialData.gender && (initialData.gender.charAt(0).toUpperCase() + initialData.gender.slice(1).toLowerCase())) ||
      norm(city) !== norm(initialData.city) ||
      arrEq(languages, Array.isArray(initialData.languages) ? initialData.languages : []) ||
      norm(website) !== norm(initialData.website) ||
      norm(headline) !== norm(initialData.headline) ||
      norm(about) !== norm(initialData.about)
    );
  }, [firstName, lastName, mobile, email, gender, city, languages, website, headline, about, initialData]);

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
  primaryActionDisabled={!canSave() || !isDirty}
      width={600}
    >
      <div className="flex flex-col gap-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 ">
          <InputWithMeta label="First Name" requiredDot value={firstName} onChange={setFirstName} placeholder="Enter First Name" />
          <InputWithMeta label="Last Name" requiredDot value={lastName} onChange={setLastName} placeholder="Enter Last Name" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <InputWithMeta
            label="Mobile Number"
            requiredDot
            value={mobile}
            immutable
            ImmutableRightIcon={BadgeCheck}
          />
          <InputWithMeta
            label="Email"
            requiredDot
            value={email}
            immutable
            ImmutableRightIcon={BadgeCheck}
          />
        </div>

        <div className="flex gap-1 items-center text-[12px]">
          <span className="text-secondary-grey200 ">To Change your Mobile & Email please</span>
          <span className="text-blue-primary250">Call Us</span>
        </div>

        {/* Gender + Language with InputWithMeta layout; inputs optional, radios/chips inside */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Gender as radio group using the InputWithMeta label row */}
          <InputWithMeta label="Gender" requiredDot showInput={false}>
            <div className="flex items-center gap-3 mt-1">
              {genders.map((g) => (
                <RadioButton
                  key={g}
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(v) => setGender(v)}
                  label={g}
                />
              ))}
            </div>
          </InputWithMeta>

          {/* Language chips using built-in badges mode */}
          <InputWithMeta
            label="Language"
            badges={languages}
            onBadgeRemove={(b) => setLanguages((prev) => prev.filter((l) => l !== b))}
            badgesEmptyPlaceholder="Select Language"
          />
        </div>

        {/* City + Website on the same row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
          <div className="w-full rounded-md border-[0.5px] border-secondary-grey200 ">
            <textarea
              className="w-full p-2 h-16 text-sm text-secondary-grey400 placeholder:text-secondary-grey100 focus:ring-0 focus:outline-none  resize-none rounded-md"
              value={headline}
              onChange={(e) => setHeadline(e.target.value.slice(0, 220))}
              placeholder=""
              maxLength={220}
            />
            <div className="text-xs text-secondary-grey200 pr-2 pb-2 text-right">
              {headline?.length || 0}/220
            </div>
          </div>
        </div>

  {/* About Us using shared component */}
  <RichTextBox label="About Us" value={about} onChange={setAbout} />
      </div>
    </GeneralDrawer>
  );
}
