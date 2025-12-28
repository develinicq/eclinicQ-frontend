import React, { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { calendarMinimalistic } from "../../../public/index.js";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import GeneralDrawer from "../GeneralDrawer/GeneralDrawer";
import InputWithMeta from "../GeneralDrawer/InputWithMeta";
import Dropdown from "../GeneralDrawer/Dropdown";

export default function AddPatientDrawer({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    mobile: "",
    email: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGenderDD, setShowGenderDD] = useState(false);
  const [showBloodDD, setShowBloodDD] = useState(false);

  const CalendarIcon = () => (
    <img src={calendarMinimalistic} alt="Calendar" className="w-4 h-4" />
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const canSave =
    form.firstName &&
    form.lastName &&
    form.dob &&
    form.gender &&
    form.bloodGroup &&
    form.mobile;

  const handleDateSelect = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      set("dob", `${year}-${month}-${day}`);
      setShowCalendar(false);
    }
  };

  const handleSave = () => {
    if (canSave) {
      onSave?.(form);
      // Reset form after save
      setForm({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        mobile: "",
        email: "",
      });
    }
  };

  return (
    <GeneralDrawer
      isOpen={open}
      onClose={onClose}
      title="Add New Patient"
      primaryActionLabel="Save"
      onPrimaryAction={handleSave}
      primaryActionDisabled={!canSave}
      width={600}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <InputWithMeta
            label="First Name"
            requiredDot
            value={form.firstName}
            onChange={(v) => set("firstName", v)}
            placeholder="Enter First Name"
          />
          <InputWithMeta
            label="Last Name"
            requiredDot
            value={form.lastName}
            onChange={(v) => set("lastName", v)}
            placeholder="Enter Last Name"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <InputWithMeta
              label="Date of Birth"
              requiredDot
              value={form.dob}
              placeholder="Select Date of Birth"
              RightIcon={CalendarIcon}
              onIconClick={() => setShowCalendar(!showCalendar)}
              dropdownOpen={showCalendar}
              onRequestClose={() => setShowCalendar(false)}
            />
            {showCalendar && (
              <div className="shadcn-calendar-dropdown absolute z-[10000] bg-white border border-gray-200 rounded-xl shadow-2xl p-2">
                <ShadcnCalendar
                  mode="single"
                  selected={form.dob ? new Date(form.dob) : undefined}
                  onSelect={handleDateSelect}
                  className="rounded-lg p-1"
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  classNames={{
                    day_selected:
                      "bg-blue-primary250 text-white hover:bg-blue-primary250",
                  }}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <InputWithMeta
              label="Gender"
              requiredDot
              value={form.gender}
              onChange={(v) => set("gender", v)}
              placeholder="Select Gender"
              RightIcon={ChevronDown}
              onFieldOpen={() => setShowGenderDD(!showGenderDD)}
              dropdownOpen={showGenderDD}
            />
            <Dropdown
              open={showGenderDD}
              onClose={() => setShowGenderDD(false)}
              items={["Male", "Female", "Other"].map((g) => ({
                label: g,
                value: g,
              }))}
              onSelect={(it) => set("gender", it.value)}
              className="w-full"
              selectedValue={form.gender}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <InputWithMeta
              label="Blood Group"
              requiredDot
              value={form.bloodGroup}
              onChange={(v) => set("bloodGroup", v)}
              placeholder="Select Blood Group"
              RightIcon={ChevronDown}
              onFieldOpen={() => setShowBloodDD(!showBloodDD)}
              dropdownOpen={showBloodDD}
            />
            <Dropdown
              open={showBloodDD}
              onClose={() => setShowBloodDD(false)}
              items={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                (bg) => ({ label: bg, value: bg })
              )}
              onSelect={(it) => set("bloodGroup", it.value)}
              className="w-full"
              selectedValue={form.bloodGroup}
            />
          </div>

          <InputWithMeta
            label="Mobile Number"
            requiredDot
            value={form.mobile}
            onChange={(v) => set("mobile", v)}
            placeholder="Enter Mobile Number"
          />
        </div>

        <InputWithMeta
          label="Email ID"
          value={form.email}
          onChange={(v) => set("email", v)}
          placeholder="Enter Email"
        />
      </div>
    </GeneralDrawer>
  );
}
