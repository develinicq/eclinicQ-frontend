import React, { useEffect, useMemo, useState } from "react";
import GeneralDrawer from "@/components/GeneralDrawer/GeneralDrawer";
import InputWithMeta from "@/components/GeneralDrawer/InputWithMeta";
import Dropdown from "@/components/GeneralDrawer/Dropdown";
import { ChevronDown } from "lucide-react";

export default function EditPracticeDetailsDrawer({ open, onClose, initial = {}, onSave }) {
  const [data, setData] = useState({
    workExperience: "",
    medicalPracticeType: "",
    practiceArea: [],
    specialties: [], // [{ id?, specialtyName, expYears }]
  });

  // Dropdown states
  const [typeOpen, setTypeOpen] = useState(false);
  const [specialtyOpenIdx, setSpecialtyOpenIdx] = useState(null);

  useEffect(() => {
    if (open) {
      setData({
        workExperience: initial?.workExperience ? String(initial.workExperience) : "",
        medicalPracticeType: initial?.medicalPracticeType || "",
        practiceArea: Array.isArray(initial?.practiceArea) ? initial.practiceArea : [],
        specialties: Array.isArray(initial?.specialties)
          ? initial.specialties.map((s) => ({
              id: s?.id,
              specialtyName: s?.specialtyName || s?.name || "",
              expYears: s?.expYears !== undefined && s?.expYears !== null ? String(s.expYears) : "",
            }))
          : [],
      });
    }
  }, [open, initial]);

  const practiceTypes = useMemo(() => [
    { label: "Allopathy", value: "Allopathy" },
    { label: "Homeopathy", value: "Homeopathy" },
    { label: "Ayurveda", value: "Ayurveda" },
    { label: "Dentistry", value: "Dentistry" },
  ], []);

  const specialtyOptions = useMemo(
    () => [
      "General Medicine",
      "Cardiology",
      "Dermatology",
      "Orthopedics",
      "ENT",
      "Neurology",
      "Pediatrics",
      "Gynecology",
      "Ophthalmology",
      "Psychiatry",
      "Physiotherapy",
      "Oncology",
      "Pulmonology",
      "Gastroenterology",
    ].map((x) => ({ label: x, value: x })),
    []
  );

  const areaOptions = useMemo(
    () => [
      "Cough",
      "Cold",
      "Headache",
      "Nausea",
      "Dizziness",
      "Muscle Pain",
      "Sore Throat",
    ],
    []
  );

  const setField = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const setSpecialty = (idx, patch) =>
    setData((d) => ({
      ...d,
      specialties: d.specialties.map((s, i) => (i === idx ? { ...s, ...patch } : s)),
    }));

  const addSpecialty = () =>
    setData((d) => ({
      ...d,
      specialties: [...(d.specialties || []), { specialtyName: "", expYears: "" }],
    }));

  const removeSpecialty = (idx) =>
    setData((d) => ({
      ...d,
      specialties: d.specialties.filter((_, i) => i !== idx),
    }));

  const toggleArea = (a) =>
    setData((d) => ({
      ...d,
      practiceArea: d.practiceArea.includes(a)
        ? d.practiceArea.filter((x) => x !== a)
        : [...d.practiceArea, a],
    }));

  const validate = () => {
    if (!data.workExperience || isNaN(Number(data.workExperience))) return false;
    if (!data.medicalPracticeType) return false;
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    await onSave?.(data);
    onClose?.();
  };

  return (
    <GeneralDrawer
      isOpen={open}
      onClose={onClose}
      title="Edit Practice Details"
      primaryActionLabel="Save"
      onPrimaryAction={handleSave}
      primaryActionDisabled={!validate()}
      width={600}
    >
      <div className="p-1 grid grid-cols-1 gap-3">
        {/* Work Experience */}
        <InputWithMeta
          label="Work Experience"
          requiredDot
          value={data.workExperience}
          onChange={(v) => setField("workExperience", v.replace(/[^0-9]/g, ""))}
          placeholder="15"
          inputRightMeta="Years"
        />

        {/* Medical Practice Type */}
        <div className="relative">
          <InputWithMeta
            label="Medical Practice Type"
            requiredDot
            value={data.medicalPracticeType}
            onChange={(v) => setField("medicalPracticeType", v)}
            placeholder="Select"
            RightIcon={ChevronDown}
            onFieldOpen={() => setTypeOpen((o) => !o)}
            dropdownOpen={typeOpen}
            onRequestClose={() => setTypeOpen(false)}
          />
          <Dropdown
            open={typeOpen}
            onClose={() => setTypeOpen(false)}
            items={practiceTypes}
            selectedValue={data.medicalPracticeType}
            onSelect={(it) => {
              setField("medicalPracticeType", it.value);
              setTypeOpen(false);
            }}
            anchorClassName="w-full h-0"
            className="input-meta-dropdown w-full"
          />
        </div>

        {/* Specialization list */}
        <div className="flex flex-col gap-2">
          <div className="text-sm text-secondary-grey300">Specialization</div>
          {(data.specialties?.length ? data.specialties : [{ specialtyName: "", expYears: "" }]).map((sp, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-8 gap-2 items-end">
              <div className="md:col-span-5 relative">
                <InputWithMeta
                  label="Speciality"
                  value={sp.specialtyName}
                  onChange={(v) => setSpecialty(idx, { specialtyName: v })}
                  placeholder="Select speciality"
                  RightIcon={ChevronDown}
                  onFieldOpen={() => setSpecialtyOpenIdx((o) => (o === idx ? null : idx))}
                  dropdownOpen={specialtyOpenIdx === idx}
                  onRequestClose={() => setSpecialtyOpenIdx(null)}
                />
                <Dropdown
                  open={specialtyOpenIdx === idx}
                  onClose={() => setSpecialtyOpenIdx(null)}
                  items={specialtyOptions}
                  selectedValue={sp.specialtyName}
                  onSelect={(it) => {
                    setSpecialty(idx, { specialtyName: it.value });
                    setSpecialtyOpenIdx(null);
                  }}
                  anchorClassName="w-full h-0"
                  className="input-meta-dropdown w-full"
                />
              </div>

              <div className="md:col-span-2">
                <InputWithMeta
                  label="Experience"
                  value={sp.expYears}
                  onChange={(v) => setSpecialty(idx, { expYears: v.replace(/[^0-9]/g, "") })}
                  placeholder="0"
                  inputRightMeta="Years"
                />
              </div>

              <div className="md:col-span-1 flex items-center gap-2">
                <button
                  type="button"
                  className="text-secondary-grey300 hover:text-secondary-grey400 text-sm border border-secondary-grey150 rounded-md px-2 py-1 w-full md:w-auto"
                  onClick={() => removeSpecialty(idx)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div>
            <button
              type="button"
              onClick={addSpecialty}
              className="text-blue-primary250 hover:text-blue-primary300 text-xs font-medium"
            >
              + Add More Specialities
            </button>
          </div>
        </div>

        {/* Practice Area */}
        <div className="flex flex-col gap-2">
          <InputWithMeta
            label="Practice Area"
            showInput={false}
          >
            <div className="mt-1 flex flex-wrap gap-2">
              {areaOptions.map((a) => {
                const active = data.practiceArea.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleArea(a)}
                    className={`px-2 h-7 rounded-md border text-[12px] ${
                      active
                        ? "bg-[#EAF2FF] border-[#BFD3FF] text-[#2F66F6]"
                        : "bg-white border-[#E6E6E6] text-[#424242] hover:bg-gray-50"
                    }`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </InputWithMeta>
        </div>
      </div>
    </GeneralDrawer>
  );
}
