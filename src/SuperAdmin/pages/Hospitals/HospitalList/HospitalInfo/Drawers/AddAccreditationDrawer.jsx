import React, { useEffect, useState } from "react";
import GeneralDrawer from "@/components/GeneralDrawer/GeneralDrawer";
import InputWithMeta from "@/components/GeneralDrawer/InputWithMeta";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import RichTextBox from "@/components/GeneralDrawer/RichTextBox";
import { addHospitalAccreditationForSuperAdmin } from "@/services/hospitalService";
import useToastStore from "@/store/useToastStore";
import UniversalLoader from "@/components/UniversalLoader";

export default function AddAccreditationDrawer({ open, onClose, onSuccess, hospitalId, mode = "add", initial = {} }) {
    const [name, setName] = useState("");
    const [body, setBody] = useState("");
    const [certNo, setCertNo] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState("ACTIVE");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);

    const [showIssueCalendar, setShowIssueCalendar] = useState(false);
    const [showExpiryCalendar, setShowExpiryCalendar] = useState(false);
    const addToast = useToastStore(state => state.addToast);

    useEffect(() => {
        if (!open) return;
        setName(initial?.accreditationName || "");
        setBody(initial?.accreditingBody || "");
        setCertNo(initial?.certificateNumber || "");
        setIssueDate(initial?.issueDate ? initial.issueDate.split("T")[0] : "");
        setExpiryDate(initial?.expiryDate ? initial.expiryDate.split("T")[0] : "");
        setUrl(initial?.certificateUrl || "");
        setStatus(initial?.status || "ACTIVE");
        setDesc(initial?.description || "");
        setLoading(false);
    }, [open]); // Only reset when opening

    const canSave = Boolean(name.trim() && body.trim() && issueDate && !loading);

    const save = async () => {
        if (!canSave || !hospitalId) return;
        setLoading(true);
        try {
            const payload = {
                accreditationName: name.trim(),
                accreditingBody: body.trim(),
                certificateNumber: certNo.trim(),
                issueDate,
                expiryDate: expiryDate || null,
                certificateUrl: url.trim(),
                status,
                description: desc.trim()
            };
            const res = await addHospitalAccreditationForSuperAdmin(hospitalId, payload);
            if (res.success) {
                addToast({
                    title: "Success",
                    message: "Accreditation added successfully",
                    type: "success"
                });
                onSuccess?.();
                onClose?.();
            }
        } catch (error) {
            console.error("Failed to add accreditation:", error);
            addToast({
                title: "Error",
                message: error?.response?.data?.message || "Failed to add accreditation",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <GeneralDrawer
            isOpen={open}
            onClose={onClose}
            title={mode === "edit" ? "Edit Accreditation" : "Add Accreditation"}
            primaryActionLabel={loading ? (
                <div className="flex items-center gap-2">
                    <UniversalLoader size={16} />
                    <span>Saving...</span>
                </div>
            ) : "Save"}
            onPrimaryAction={save}
            primaryActionDisabled={!canSave}
            width={600}
        >
            <div className="flex flex-col gap-4">
                <InputWithMeta label="Accreditation Name" requiredDot value={name} onChange={setName} placeholder="e.g. NABH Accreditation" />
                <InputWithMeta label="Accrediting Body" requiredDot value={body} onChange={setBody} placeholder="e.g. National Accreditation Board" />
                <InputWithMeta label="Certificate Number" value={certNo} onChange={setCertNo} placeholder="Enter Certificate Number" />

                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <InputWithMeta label="Issue Date" requiredDot value={issueDate} onChange={setIssueDate} placeholder="Select Date" RightIcon='/Doctor_module/settings/calendar.png' onIconClick={() => setShowIssueCalendar((v) => !v)} dropdownOpen={showIssueCalendar} onRequestClose={() => setShowIssueCalendar(false)} readonlyWhenIcon={true} />
                        {showIssueCalendar && (
                            <div className="shadcn-calendar-dropdown absolute right-1 top-full z-[10000] mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl p-2">
                                <ShadcnCalendar mode="single" selected={issueDate ? new Date(issueDate) : undefined} onSelect={(d) => { if (!d) return; const yyyy = d.getFullYear(); const mm = String(d.getMonth() + 1).padStart(2, "0"); const dd = String(d.getDate()).padStart(2, "0"); setIssueDate(`${yyyy}-${mm}-${dd}`); setShowIssueCalendar(false); }} />
                            </div>
                        )}
                    </div>
                    <div className="relative flex-1">
                        <InputWithMeta label="Expiry Date" value={expiryDate} onChange={setExpiryDate} placeholder="Select Date" RightIcon='/Doctor_module/settings/calendar.png' onIconClick={() => setShowExpiryCalendar((v) => !v)} dropdownOpen={showExpiryCalendar} onRequestClose={() => setShowExpiryCalendar(false)} readonlyWhenIcon={true} />
                        {showExpiryCalendar && (
                            <div className="shadcn-calendar-dropdown absolute right-1 top-full z-[10000] mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl p-2">
                                <ShadcnCalendar mode="single" selected={expiryDate ? new Date(expiryDate) : undefined} onSelect={(d) => { if (!d) return; const yyyy = d.getFullYear(); const mm = String(d.getMonth() + 1).padStart(2, "0"); const dd = String(d.getDate()).padStart(2, "0"); setExpiryDate(`${yyyy}-${mm}-${dd}`); setShowExpiryCalendar(false); }} />
                            </div>
                        )}
                    </div>
                </div>

                <InputWithMeta label="Certificate URL" value={url} onChange={setUrl} placeholder="Paste Certificate URL" />
                <RichTextBox label="Description" value={desc} onChange={(v) => setDesc(v.slice(0, 1600))} placeholder="Description" showCounter={true} maxLength={1600} />
            </div>
        </GeneralDrawer>
    );
}
