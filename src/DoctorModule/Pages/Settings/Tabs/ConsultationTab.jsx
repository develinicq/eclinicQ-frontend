import React from "react";
import SectionCard from "../components/SectionCard";
import InfoField from "../components/InfoField";
import TimeInput from "../../../../components/FormItems/TimeInput";
import Toggle from "../../../../components/FormItems/Toggle";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Trash2 } from "lucide-react";

const DEFAULT_SCHEDULE = [
    { day: "Monday", available: true, sessions: [] },
    { day: "Tuesday", available: false, sessions: [] },
    { day: "Wednesday", available: false, sessions: [] },
    { day: "Thursday", available: false, sessions: [] },
    { day: "Friday", available: false, sessions: [] },
    { day: "Saturday", available: false, sessions: [] },
    { day: "Sunday", available: false, sessions: [] },
];

const DEFAULT_CONSULTATION_DETAILS = {
    consultationFees: [
        {
            consultationFee: "",
            followUpFee: "",
            autoApprove: false,
            avgDurationMinutes: 0,
            availabilityDurationDays: undefined,
        },
    ],
    slotTemplates: {
        schedule: DEFAULT_SCHEDULE.map((d) => ({ ...d })),
    },
};

const ConsultationTab = ({
    consultationDetails = DEFAULT_CONSULTATION_DETAILS,
    consultationLoading,
    setConsultationDetails,
    setConsultationDirty,
    handleSaveConsultation,
    savingConsultation,
    consultationDirty,
}) => {
    if (consultationLoading) {
        return <div className="p-4 text-sm text-gray-400">Loading consultation details...</div>;
    }

    const fees = consultationDetails?.consultationFees?.[0] || {};
    const setFees = (k, v) => {
        setConsultationDetails((prev) => ({
            ...prev,
            consultationFees: [{ ...(prev.consultationFees?.[0] || {}), [k]: v }],
        }));
        setConsultationDirty(true);
    };
    const setSched = (idx, dayObj) => {
        const arr = [...(consultationDetails.slotTemplates?.schedule || [])];
        arr[idx] = dayObj;
        setConsultationDetails((prev) => ({
            ...prev,
            slotTemplates: { ...prev.slotTemplates, schedule: arr },
        }));
        setConsultationDirty(true);
    };

    return (
        <div className="p-4 no-scrollbar pb-24">
            {/* Fees / Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <SectionCard title="Consultation Fees">
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-xs text-secondary-grey300 font-medium">
                                Consultation Fee
                            </span>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    placeholder="500"
                                    className="w-full h-9 pl-6 pr-2 rounded-md border border-secondary-grey100 text-sm outline-none focus:border-blue-primary200 transition"
                                    value={fees.consultationFee || ""}
                                    onChange={(e) => setFees("consultationFee", e.target.value)}
                                />
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                    ₹
                                </span>
                            </div>
                        </label>
                        <label className="block">
                            <span className="text-xs text-gray-500 font-medium">
                                Follow-up Fee
                            </span>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    placeholder="300"
                                    className="w-full h-9 pl-6 pr-2 rounded-md border border-gray-300 text-sm outline-none focus:border-blue-300 transition"
                                    value={fees.followUpFee || ""}
                                    onChange={(e) => setFees("followUpFee", e.target.value)}
                                />
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                    ₹
                                </span>
                            </div>
                        </label>
                        <div className="col-span-2 flex items-center justify-between border-t pt-3 mt-1">
                            <span className="text-sm text-gray-700">Auto Approve</span>
                            <Toggle
                                checked={fees.autoApprove || false}
                                onChange={(val) => setFees("autoApprove", val)}
                            />
                        </div>
                    </div>
                </SectionCard>

                {/* Timings */}
                <SectionCard title="Timing and Slot Duration">
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-xs text-gray-500 font-medium">
                                Avg. Consult Time
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                <input
                                    type="text"
                                    placeholder="15"
                                    className="w-full h-9 px-3 rounded-md border border-gray-300 text-sm outline-none focus:border-blue-300"
                                    value={fees.avgDurationMinutes || ""}
                                    onChange={(e) => setFees("avgDurationMinutes", e.target.value)}
                                />
                                <span className="text-xs text-gray-400">Min</span>
                            </div>
                        </label>
                        <label className="block">
                            <span className="text-xs text-gray-500 font-medium">
                                Availability for
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                <select
                                    className="w-full h-9 px-2 rounded-md border border-gray-300 text-sm outline-none bg-white focus:border-blue-300"
                                    value={fees.availabilityDurationDays || ""}
                                    onChange={(e) =>
                                        setFees("availabilityDurationDays", e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Select
                                    </option>
                                    <option value="7">7 Days</option>
                                    <option value="15">15 Days</option>
                                    <option value="30">30 Days</option>
                                    <option value="60">60 Days</option>
                                </select>
                            </div>
                        </label>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100 text-xs text-blue-700 leading-relaxed">
                        Changing these settings will reflect on your main availability
                        calendar for patients.
                    </div>
                </SectionCard>
            </div>

            <div className="mt-5">
                <SectionCard title="Schedule & Availability">
                    <div className="mt-2 text-sm text-gray-500">
                        Set your daily availability. Uncheck days you are off. Add multiple
                        slots (e.g. Morning, Evening).
                    </div>

                    {/* Days grid */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 items-start">
                        {(
                            consultationDetails?.slotTemplates?.schedule?.length
                                ? consultationDetails.slotTemplates.schedule
                                : DEFAULT_SCHEDULE
                        ).map((d, i) => (
                            <div
                                key={d.day}
                                className={`p-3 rounded-lg border transition-colors ${d.available
                                    ? "bg-white border-gray-200 shadow-sm"
                                    : "bg-gray-50 border-gray-100 opacity-60"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-3 border-b-2 bg-[#F9FAFB] border-[#F2F4F7] p-2 rounded-t-lg">
                                    <span
                                        className={`font-semibold text-[15px] ${d.available ? "text-gray-800" : "text-gray-400"
                                            }`}
                                    >
                                        {d.day}
                                    </span>
                                    <Toggle
                                        checked={d.available}
                                        onChange={(val) => setSched(i, { ...d, available: val })}
                                    />
                                </div>

                                {d.available && (
                                    <div className="space-y-3">
                                        {/* If no sessions, show placeholder or empty state */}
                                        {(!d.sessions || d.sessions.length === 0) && (
                                            <div className="text-xs text-gray-400 italic pl-1">
                                                No sessions added
                                            </div>
                                        )}

                                        {/* Render existing sessions */}
                                        {d.sessions?.map((sess, sIdx) => (
                                            <div
                                                key={sIdx}
                                                className="flex items-center gap-2 bg-gray-50 p-2 rounded border border-gray-100 relative group"
                                            >
                                                <div className="flex-1 grid grid-cols-2 gap-2">
                                                    <label className="block">
                                                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                                                            Start
                                                        </span>
                                                        <TimeInput
                                                            value={sess.startTime} // "HH:mm"
                                                            onChange={(val) => {
                                                                const newSess = [...(d.sessions || [])];
                                                                newSess[sIdx] = { ...sess, startTime: val };
                                                                setSched(i, { ...d, sessions: newSess });
                                                            }}
                                                            disabled={!d.available}
                                                            className="h-8 text-sm"
                                                        />
                                                    </label>
                                                    <label className="block">
                                                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                                                            End
                                                        </span>
                                                        <TimeInput
                                                            value={sess.endTime}
                                                            onChange={(val) => {
                                                                const newSess = [...(d.sessions || [])];
                                                                newSess[sIdx] = { ...sess, endTime: val };
                                                                setSched(i, { ...d, sessions: newSess });
                                                            }}
                                                            disabled={!d.available}
                                                            className="h-8 text-sm"
                                                        />
                                                    </label>
                                                </div>
                                                {d.sessions.length > 1 && (
                                                    <button
                                                        onClick={() => {
                                                            const newSess = d.sessions.filter(
                                                                (_, x) => x !== sIdx
                                                            );
                                                            setSched(i, { ...d, sessions: newSess });
                                                        }}
                                                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Remove Slot"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        {/* Footer actions for this day */}
                                        <div className="mt-4 flex items-center justify-between">
                                            <button
                                                className={`text-sm font-normal text-blue-primary250 hover:text-blue-700 flex items-center gap-1 ${(!d.sessions || d.sessions.length < 6)
                                                    ? ""
                                                    : "opacity-50 cursor-not-allowed"
                                                    }`}
                                                disabled={!d.available || (d.sessions && d.sessions.length >= 6)}
                                                onClick={() => {
                                                    const currentSessions = d.sessions || [];
                                                    if (currentSessions.length >= 6) return;

                                                    let newSessionsToAdd = [];
                                                    if (currentSessions.length === 0) {
                                                        newSessionsToAdd = [
                                                            { startTime: "09:00", endTime: "13:00" },
                                                            { startTime: "17:00", endTime: "21:00" }
                                                        ]
                                                    } else {
                                                        newSessionsToAdd = [{ startTime: "09:00", endTime: "13:00" }]
                                                    }

                                                    const newSess = [
                                                        ...currentSessions,
                                                        ...newSessionsToAdd
                                                    ];
                                                    setSched(i, { ...d, sessions: newSess });
                                                }}
                                            >
                                                + Add More (Max 6 Slots)
                                            </button>

                                            {/* Apply to all logic */}
                                            <label className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none hover:text-gray-800">
                                                <Checkbox
                                                    checked={false} // stateless trigger
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            const confirm = window.confirm(
                                                                `Copy ${d.day}'s schedule to all other days?`
                                                            );
                                                            if (confirm) {
                                                                // apply d.sessions to all other days
                                                                const masterSessions = d.sessions || [];
                                                                const newSchedule =
                                                                    consultationDetails.slotTemplates.schedule.map(
                                                                        (dayItem) => ({
                                                                            ...dayItem,
                                                                            available: true,
                                                                            sessions: masterSessions.map((ms) => ({
                                                                                ...ms,
                                                                            })),
                                                                        })
                                                                    );
                                                                setConsultationDetails((prev) => ({
                                                                    ...prev,
                                                                    slotTemplates: {
                                                                        ...prev.slotTemplates,
                                                                        schedule: newSchedule,
                                                                    },
                                                                }));
                                                                setConsultationDirty(true);
                                                            }
                                                        }
                                                    }}
                                                    disabled={!d.available}
                                                    className="w-4 h-4"
                                                />
                                                <span>Apply to All Days</span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>

            {/* Sticky footer for saving */}
            <div className="fixed bottom-0 left-[260px] right-0 p-4 bg-white border-t border-gray-200 flex items-center justify-between z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Checkbox checked disabled />
                    <span>I agree to the terms and declaration.</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        className="px-6 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium transition"
                        onClick={() => {
                            // reset logic could go here if prop provided, or just do nothing
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveConsultation}
                        disabled={savingConsultation || !consultationDirty}
                        className={`px-6 py-2 rounded-md text-white text-sm font-medium shadow-sm transition-all ${savingConsultation || !consultationDirty
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
                            }`}
                    >
                        {savingConsultation ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsultationTab;
