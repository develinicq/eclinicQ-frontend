import React, { useEffect, useMemo, useState } from "react";
import GeneralDrawer from "@/components/GeneralDrawer/GeneralDrawer";
import InputWithMeta from "@/components/GeneralDrawer/InputWithMeta";
import Dropdown from "@/components/GeneralDrawer/Dropdown";
import { ChevronDown } from "lucide-react";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import calendarWhite from "/Doctor_module/sidebar/calendar_white.png";
import RichTextBox from "@/components/GeneralDrawer/RichTextBox";

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
  const [showIssueCalendar, setShowIssueCalendar] = useState(false);

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
      <div className="flex flex-col gap-4">
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

        {/* Issue Date with calendar icon and dropdown calendar */}
        <div className="relative">
          <InputWithMeta
            label="Issue Date"
            requiredDot
            value={date}
            onChange={setDate}
            placeholder="Select Date"
            RightIcon=
             '/Doctor_module/settings/calendar.png'
            
            onIconClick={() => setShowIssueCalendar((v) => !v)}
            dropdownOpen={showIssueCalendar}
            onRequestClose={() => setShowIssueCalendar(false)}
            readonlyWhenIcon={true}
          />
          {showIssueCalendar && (
            <div className="shadcn-calendar-dropdown absolute right-1 top-full z-[10000] mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl p-2">
              <ShadcnCalendar
                mode="single"
                selected={date ? new Date(date) : undefined}
                onSelect={(d) => {
                  if (!d) return;
                  const yyyy = d.getFullYear();
                  const mm = String(d.getMonth() + 1).padStart(2, "0");
                  const dd = String(d.getDate()).padStart(2, "0");
                  setDate(`${yyyy}-${mm}-${dd}`);
                  setShowIssueCalendar(false);
                }}
              />
            </div>
          )}
        </div>

        <InputWithMeta
          label="Award URL"
          value={url}
          onChange={setUrl}
          placeholder="Paste Award URL"
        />

        <RichTextBox
          label="Description"
          value={desc}
          onChange={(v) => setDesc(v.slice(0, 1600))}
          placeholder="List your Duties, Highlights and Achievements"
          showCounter={true}
          maxLength={1600}
        />
      </div>
    </GeneralDrawer>
  );
}
