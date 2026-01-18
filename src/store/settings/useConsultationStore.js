import { create } from "zustand";
import {
    getDoctorConsultationDetails,
    putDoctorConsultationDetails,
} from "../../services/doctorConsultationService";

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

const useConsultationStore = create((set, get) => ({
    consultationDetails: DEFAULT_CONSULTATION_DETAILS,
    loading: false,
    saving: false,
    fetchError: null,
    saveError: null,
    isDirty: false,

    setConsultationDetails: (details) => set({ consultationDetails: details, isDirty: true }),

    setDirty: (isDirty) => set({ isDirty }),

    fetchConsultationDetails: async (params) => {
        if (!params || (!params.hospitalId && !params.clinicId)) return;
        set({ loading: true, fetchError: null });
        try {
            const response = await getDoctorConsultationDetails(params);
            if (response.success && response.data) {
                const data = response.data;

                // Map API data to UI structure if needed
                const schedule = data.slotTemplates?.schedule?.length
                    ? data.slotTemplates.schedule
                    : DEFAULT_SCHEDULE.map((d) => ({ ...d }));

                const fees = Array.isArray(data.consultationFees) && data.consultationFees.length
                    ? data.consultationFees.map(f => ({
                        ...f,
                        // Map availabilityDays to availabilityDurationDays if needed
                        availabilityDurationDays: f.availabilityDurationDays ?? f.availabilityDays
                    }))
                    : DEFAULT_CONSULTATION_DETAILS.consultationFees;

                set({
                    consultationDetails: {
                        consultationFees: fees,
                        slotTemplates: { schedule },
                    },
                    loading: false,
                    isDirty: false,
                });
            } else {
                set({
                    consultationDetails: DEFAULT_CONSULTATION_DETAILS,
                    loading: false,
                });
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Failed to fetch consultation details";
            set({
                fetchError: message,
                loading: false,
                consultationDetails: DEFAULT_CONSULTATION_DETAILS,
            });
        }
    },

    updateConsultationDetails: async (payload) => {
        set({ saving: true, saveError: null });
        try {
            const response = await putDoctorConsultationDetails(payload);
            if (response.success) {
                set({ saving: false, isDirty: false });
                return response;
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Failed to update consultation details";
            set({
                saveError: message,
                saving: false,
            });
            throw error;
        }
    },

    reset: () => set({
        consultationDetails: DEFAULT_CONSULTATION_DETAILS,
        loading: false,
        saving: false,
        fetchError: null,
        saveError: null,
        isDirty: false,
    }),
}));

export default useConsultationStore;
