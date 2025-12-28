import React, { useEffect, useMemo, useState } from "react";
import GeneralDrawer from "@/components/GeneralDrawer/GeneralDrawer";
import InputWithMeta from "@/components/GeneralDrawer/InputWithMeta";
import Dropdown from "@/components/GeneralDrawer/Dropdown";
import { ChevronDown, CalendarDays } from "lucide-react";

/**
 * AddAwardDrawer — Add/Edit Award form matching provided design
 * Props:
 * - open, onClose
 * - onSave: ({ title, issuer, with, date, url, desc }) => void
 * - mode: 'add' | 'edit'
 * - initial: optional initial values for edit
 */
export default function AddAwardDrawer({ open, onClose, onSave, mode = "add", initial = {} }) {
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [assoc, setAssoc] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");

  const [assocOpen, setAssocOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle(initial?.title || initial?.awardName || "");
    setIssuer(initial?.issuer || initial?.issuerName || "");
    setAssoc(initial?.with || initial?.associatedWith || "");
    setDate(initial?.date || (initial?.issueDate ? initial.issueDate.split("T")[0] : ""));
    setUrl(initial?.url || initial?.awardUrl || "");
    setDesc(initial?.desc || initial?.description || "");
    setAssocOpen(false);
  }, [open, initial]);

  const canSave = Boolean(title && issuer && date);

  // Suggestion options for Associated With (can type custom as well)
  const assocOptions = useMemo(
    () => [
      "Department",
      "Hospital",
      "Clinic",
      "University",
      "Conference",
    ],
    []
  );

  const save = () => {
    if (!canSave) return;
    onSave?.({ title, issuer, with: assoc, date, url, desc });
    onClose?.();
  };

  return (
    <GeneralDrawer
      isOpen={open}
      onClose={onClose}
      title={mode === "edit" ? "Edit Award" : "Add Award"}
      primaryActionLabel="Save"
      onPrimaryAction={save}
      primaryActionDisabled={!canSave}
      width={600}
    >
      <div className="flex flex-col gap-3">
        <InputWithMeta
          label="Award Name"
          requiredDot
          value={title}
          onChange={setTitle}
          placeholder="Enter Award Name"
        />
        <InputWithMeta
          label="Issuer Name"
          requiredDot
          value={issuer}
          onChange={setIssuer}
          placeholder="Enter Issuer Name"
        />

        <div className="relative">
          <InputWithMeta
            label="Associated With"
            value={assoc}
            onChange={setAssoc}
            placeholder="Select or Enter Associated"
            RightIcon={ChevronDown}
            onFieldOpen={() => setAssocOpen((o) => !o)}
            dropdownOpen={assocOpen}
            onRequestClose={() => setAssocOpen(false)}
            // allow typing even when icon present
            readonlyWhenIcon={false}
          />
          <Dropdown
            open={assocOpen}
            onClose={() => setAssocOpen(false)}
            items={assocOptions.map((a) => ({ label: a, value: a }))}
            selectedValue={assoc}
            onSelect={(it) => {
              setAssoc(it.value);
              setAssocOpen(false);
            }}
            anchorClassName="w-full h-0"
            className="input-meta-dropdown w-full"
          />
        </div>

        {/* Issue Date with calendar icon; simple text field with placeholder */}
        <InputWithMeta
          label="Issue Date"
          requiredDot
          value={date}
          onChange={setDate}
          placeholder="Select Date"
          RightIcon={CalendarDays}
          // keep input editable; future: hook calendar dropdown
          readonlyWhenIcon={false}
        />

        <InputWithMeta
          label="Award URL"
          value={url}
          onChange={setUrl}
          placeholder="Paste Award URL"
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm text-secondary-grey300">Description</label>
          <div className="w-full rounded-md border-[0.5px] border-secondary-grey300 overflow-hidden">
            <div className="flex items-center gap-3 px-2 py-1 border-b border-secondary-grey200 text-secondary-grey300 text-sm">
              <button type="button" className="hover:text-gray-700" aria-label="attach">📎</button>
              <button type="button" className="hover:text-gray-700 font-bold" aria-label="bold">B</button>
              <button type="button" className="hover:text-gray-700 italic" aria-label="italic">I</button>
              <button type="button" className="hover:text-gray-700 underline" aria-label="underline">U</button>
              <button type="button" className="hover:text-gray-700" aria-label="list">≡</button>
            </div>
            <textarea
              className="w-full p-2 h-28 text-sm text-secondary-grey400 placeholder:text-secondary-grey100 focus:ring-0 outline-none resize-none"
              value={desc}
              onChange={(e) => setDesc(e.target.value.slice(0, 1600))}
              placeholder="List your Duties, Highlights and Achievements"
              maxLength={1600}
            />
            <div className="text-[11px] text-secondary-grey200 pr-2 pb-1 text-right">{desc.length}/1600</div>
          </div>
        </div>
      </div>
    </GeneralDrawer>
  );
}
