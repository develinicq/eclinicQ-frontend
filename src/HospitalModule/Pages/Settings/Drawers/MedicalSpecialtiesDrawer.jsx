import React, { useEffect, useState } from 'react';
import GeneralDrawer from '../../../../components/GeneralDrawer/GeneralDrawer';
import { Checkbox } from '../../../../components/ui/checkbox';
import useHospitalAuthStore from '../../../../store/useHospitalAuthStore';
import { updateHospitalSpecialtiesForAdmin } from '../../../../services/hospitalService';
import useToastStore from '../../../../store/useToastStore';
import UniversalLoader from '../../../../components/UniversalLoader';

const allSpecialties = [
    "Anesthesiology", "Cardiology", "Dermatology", "Endocrinology", "Gastroenterology", "Hematology", "Infectious Diseases", "Internal Medicine", "Nephrology", "Neurology", "Obstetrics & Gynecology", "Oncology", "Ophthalmology", "Orthopedics", "Pediatrics", "Plastic Surgery", "Psychiatry", "Pulmonology", "Radiology", "Rheumatology", "Surgery", "Urology"
];

export default function MedicalSpecialtiesDrawer({ open, onClose, selectedItems = [], onSave }) {
    const { hospitalId } = useHospitalAuthStore();
    const addToast = useToastStore(state => state.addToast);

    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => { if (open) setSelected(selectedItems || []); }, [open, selectedItems]);

    const toggleItem = (item) => setSelected((sel) => sel.includes(item) ? sel.filter(i => i !== item) : [...sel, item]);

    const handleSave = async () => {
        if (!hospitalId) return;
        setLoading(true);
        try {
            const res = await updateHospitalSpecialtiesForAdmin(hospitalId, selected);
            if (res.success) {
                addToast({ title: "Success", message: "Specialties updated successfully", type: "success" });
                onSave?.(selected);
                onClose?.();
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            console.error("Failed to update specialties:", error);
            addToast({ title: "Error", message: error?.response?.data?.message || "Failed to update specialties", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    // calculate changes
    const isDirty = JSON.stringify((selectedItems || []).sort()) !== JSON.stringify(selected.sort());

    const selectedList = allSpecialties.filter(s => selected.includes(s));
    const unselectedList = allSpecialties.filter(s => !selected.includes(s));

    return (
        <GeneralDrawer
            isOpen={open}
            onClose={onClose}
            title="Add Medical Specialties"
            primaryActionLabel={loading ? (
                <div className="flex items-center gap-2">
                    <UniversalLoader size={16} />
                    <span>Updating...</span>
                </div>
            ) : "Update"}
            onPrimaryAction={handleSave}
            primaryActionDisabled={!isDirty || loading}
        >
            <div className="flex flex-col gap-2">
                {selectedList.length > 0 && (
                    <div className='flex flex-col gap-[9px]'>
                        <div className="text-secondary-grey300 text-sm">Selected</div>
                        <div className="flex flex-col gap-2">
                            {selectedList.map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <Checkbox id={`spec-${item}`} checked onCheckedChange={() => toggleItem(item)} />
                                    <label htmlFor={`spec-${item}`} className="text-xs text-secondary-grey300">{item}</label>
                                </div>
                            ))}
                        </div>
                        <div className="border-b-[0.5px] border-secondary-grey100/50 my-1"></div>
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    {unselectedList.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                            <Checkbox id={`spec-${item}`} checked={false} onCheckedChange={() => toggleItem(item)} />
                            <label htmlFor={`spec-${item}`} className="text-xs text-secondary-grey300">{item}</label>
                        </div>
                    ))}
                </div>
            </div>
        </GeneralDrawer>
    );
}
