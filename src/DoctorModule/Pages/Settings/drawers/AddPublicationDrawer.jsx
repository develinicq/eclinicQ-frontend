import React, { useEffect, useState } from "react";
import GeneralDrawer from "@/components/GeneralDrawer/GeneralDrawer";
import InputWithMeta from "@/components/GeneralDrawer/InputWithMeta";
import RichTextBox from "@/components/GeneralDrawer/RichTextBox";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import calendarWhite from "/Doctor_module/sidebar/calendar_white.png";

/**
 * AddPublicationDrawer — Add/Edit Publication form
 * Props:
 * - open, onClose
 * - onSave: ({ title, publisher, date, url, desc }) => void
 * - mode: 'add' | 'edit'
 * - initial: optional initial values for edit
 */
export default function AddPublicationDrawer({ open, onClose, onSave, mode = "add", initial = {} }) {
  useEffect(() => {
    console.log("[AddPublicationDrawer] open prop:", open);
  }, [open]);
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (!open) return;
  console.log("[AddPublicationDrawer] initializing with initial:", initial);
    setTitle(initial?.title || "");
    setPublisher(initial?.publisher || "");
    setDate(initial?.date || (initial?.publicationDate ? initial.publicationDate.split("T")[0] : ""));
    setUrl(initial?.url || initial?.publicationUrl || "");
    setDesc(initial?.desc || initial?.description || "");
    setShowCalendar(false);
  }, [open, initial]);

  const canSave = Boolean(title && publisher && date);

  const save = () => {
    if (!canSave) return;
    onSave?.({ title, publisher, date, url, desc });
    onClose?.();
  };

  return (
    <GeneralDrawer
      isOpen={open}
      onClose={onClose}
      title={mode === "edit" ? "Edit Publication" : "Add Publication"}
      primaryActionLabel="Save"
      onPrimaryAction={save}
      primaryActionDisabled={!canSave}
      width={600}
    >
      <div className="flex flex-col gap-4">
        <InputWithMeta
          label="Title"
          requiredDot
          value={title}
          onChange={setTitle}
          placeholder="Enter Title"
        />
        <InputWithMeta
          label="Publication / Publisher"
          requiredDot
          value={publisher}
          onChange={setPublisher}
          placeholder="Enter Publication"
        />

        {/* Publication Date with calendar icon and dropdown */}
        <div className="relative">
          <InputWithMeta
            label="Publication Date"
            requiredDot
            value={date}
            onChange={setDate}
            placeholder="Select Date"
            RightIcon='/Doctor_module/settings/calendar.png'
            onIconClick={() => setShowCalendar((v) => !v)}
            dropdownOpen={showCalendar}
            onRequestClose={() => setShowCalendar(false)}
            readonlyWhenIcon={true}
          />
          {showCalendar && (
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
                  setShowCalendar(false);
                }}
              />
            </div>
          )}
        </div>

        <InputWithMeta
          label="Publication URL"
          value={url}
          onChange={setUrl}
          placeholder="Paste Publication URL"
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
