import React, { useEffect, useMemo, useState } from "react";
import GeneralDrawer from "@/components/GeneralDrawer/GeneralDrawer";
import InputWithMeta from "@/components/GeneralDrawer/InputWithMeta";
import Dropdown from "@/components/GeneralDrawer/Dropdown";
import { ChevronDown, Info } from "lucide-react";
import FileUploadBox from "@/components/GeneralDrawer/FileUploadBox";
import useImageUploadStore from "@/store/useImageUploadStore";

/**
 * AddEducationDrawer — Add/Edit Education with dropdowns and file upload
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - onSave: (data) => void // data shape: { school, gradType, degree, field, start, end, proof }
 * - mode: 'add' | 'edit'
 * - initial: object // when editing; { school, gradType, degree, field, start, end, proof }
 */
export default function AddEducationDrawer({ open, onClose, onSave, mode = "add", initial = {} }) {
  const [school, setSchool] = useState("");
  const [gradType, setGradType] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [proofKey, setProofKey] = useState("");
  const [proofName, setProofName] = useState("");

  // Dropdown states
  const [schoolOpen, setSchoolOpen] = useState(false);
  const [gradOpen, setGradOpen] = useState(false);
  const [degreeOpen, setDegreeOpen] = useState(false);
  const [fieldOpen, setFieldOpen] = useState(false);

  const { getUploadUrl, isLoading: uploading, error: uploadError, reset } = useImageUploadStore();

  // Prefill on open/edit
  useEffect(() => {
    if (!open) return;
    setSchool(initial?.school || "");
    setGradType(initial?.gradType || "");
    setDegree(initial?.degree || "");
    setField(initial?.field || "");
    setStart(initial?.start || "");
    setEnd(initial?.end || "");
    setProofKey(initial?.proof || "");
    setProofName(initial?.proof ? (typeof initial.proof === 'string' ? initial.proof.split('/').pop() : "Uploaded File") : "");
  }, [open, initial]);

  const canSave = Boolean(school && gradType && degree && start && end);

  // Suggestions (can be later sourced from API)
  const schoolOptions = useMemo(
    () => [
      "AIIMS New Delhi",
      "KEM Hospital, Mumbai",
      "BJ Medical College, Pune",
      "Grant Medical College, Mumbai",
      "GMC Nagpur",
    ],
    []
  );

  const gradTypeOptions = useMemo(
    () => [
      { label: "Graduation", value: "UG" },
      { label: "Post-Graduation", value: "PG" },
      { label: "Fellowship", value: "Fellowship" },
    ],
    []
  );

  const degreeOptions = useMemo(
    () => [
      "MBBS",
      "MD",
      "MS",
      "DNB",
      "DM",
      "MCh",
      "BDS",
      "MDS",
    ],
    []
  );

  const fieldOptions = useMemo(
    () => [
      "General Medicine",
      "Pediatrics",
      "Orthopedics",
      "Gynecology",
      "Cardiology",
      "Dermatology",
    ],
    []
  );

  const onUploadFile = async (file) => {
    if (!file) return;
    try {
      reset();
      const info = await getUploadUrl(file.type, file);
      if (!info?.uploadUrl || !info?.key) return;
      // Upload to storage
      await fetch(info.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      setProofKey(info.key);
      setProofName(file.name);
    } catch (e) {
      console.error("Upload failed", e);
    }
  };

  const save = () => {
    if (!canSave) return;
    onSave?.({ school, gradType, degree, field, start, end, proof: proofKey || initial?.proof || "" });
    onClose?.();
  };

  return (
    <GeneralDrawer
      isOpen={open}
      onClose={onClose}
      title={mode === "edit" ? "Edit Education" : "Add Education"}
      primaryActionLabel="Save"
      onPrimaryAction={save}
      primaryActionDisabled={!canSave}
      width={600}
    >
      <div className="flex flex-col gap-3.5">
        {/* School/College/University */}
        <div className="relative">
          <InputWithMeta
            label="School/College/ University"
            requiredDot
            value={school}
            onChange={setSchool}
            placeholder="Select or Enter Institute Name"
            RightIcon={ChevronDown}
            onFieldOpen={() => setSchoolOpen((o) => !o)}
            dropdownOpen={schoolOpen}
            onRequestClose={() => setSchoolOpen(false)}
          />
          <Dropdown
            open={schoolOpen}
            onClose={() => setSchoolOpen(false)}
            items={schoolOptions.map((s) => ({ label: s, value: s }))}
            selectedValue={school}
            onSelect={(it) => {
              setSchool(it.value);
              setSchoolOpen(false);
            }}
            anchorClassName="w-full h-0"
            className="input-meta-dropdown w-full"
          />
        </div>

        {/* Graduation Type */}
        <div className="relative">
          <InputWithMeta
            label="Graduation Type"
            requiredDot
            value={gradType}
            onChange={() => {}}
            placeholder="Select Type"
            RightIcon={ChevronDown}
            onFieldOpen={() => setGradOpen((o) => !o)}
            dropdownOpen={gradOpen}
            onRequestClose={() => setGradOpen(false)}
            readonlyWhenIcon
          />
          <Dropdown
            open={gradOpen}
            onClose={() => setGradOpen(false)}
            items={gradTypeOptions.map((g) => ({ label: g.label, value: g.value }))}
            selectedValue={gradType}
            onSelect={(it) => {
              setGradType(it.value);
              setGradOpen(false);
            }}
            anchorClassName="w-full h-0"
            className="input-meta-dropdown w-full"
          />
        </div>

        {/* Degree */}
        <div className="relative">
          <InputWithMeta
            label="Degree"
            requiredDot
            value={degree}
            onChange={setDegree}
            placeholder="Select or Enter Degree"
            RightIcon={ChevronDown}
            onFieldOpen={() => setDegreeOpen((o) => !o)}
            dropdownOpen={degreeOpen}
            onRequestClose={() => setDegreeOpen(false)}
          />
          <Dropdown
            open={degreeOpen}
            onClose={() => setDegreeOpen(false)}
            items={degreeOptions.map((d) => ({ label: d, value: d }))}
            selectedValue={degree}
            onSelect={(it) => {
              setDegree(it.value);
              setDegreeOpen(false);
            }}
            anchorClassName="w-full h-0"
            className="input-meta-dropdown w-full"
          />
        </div>

        {/* Field of Study */}
        <div className="relative">
          <InputWithMeta
            label="Field Of Study"
            value={field}
            onChange={setField}
            placeholder="Select or Enter your Field of Study"
            RightIcon={ChevronDown}
            onFieldOpen={() => setFieldOpen((o) => !o)}
            dropdownOpen={fieldOpen}
            onRequestClose={() => setFieldOpen(false)}
          />
          <Dropdown
            open={fieldOpen}
            onClose={() => setFieldOpen(false)}
            items={fieldOptions.map((f) => ({ label: f, value: f }))}
            selectedValue={field}
            onSelect={(it) => {
              setField(it.value);
              setFieldOpen(false);
            }}
            anchorClassName="w-full h-0"
            className="input-meta-dropdown w-full"
          />
        </div>

        {/* Years */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputWithMeta
            label="Start Year"
            requiredDot
            value={start}
            onChange={(v) => setStart(v.replace(/[^0-9]/g, "").slice(0, 4))}
            placeholder="2020"
          />
          <InputWithMeta
            label="Year of Completion"
            requiredDot
            value={end}
            onChange={(v) => setEnd(v.replace(/[^0-9]/g, "").slice(0, 4))}
            placeholder="2024"
          />
        </div>

  {/* Upload Proof using InputWithMeta label with info icon */}
          <InputWithMeta label="Upload Proof" showInput={false} infoIcon InfoIconComponent={Info}>
          <FileUploadBox
            value={proofName ? { name: proofName } : null}
            onChange={(file) => {
              if (file) onUploadFile(file);
            }}
            accept={".png,.jpg,.jpeg,.svg,.webp"}
            maxSizeMB={1}
            helperText={uploadError ? uploadError : "Support Size upto 1MB in .png, .jpg, .svg, .webp"}
            disabled={uploading}
          />
        </InputWithMeta>
      </div>
    </GeneralDrawer>
  );
}
