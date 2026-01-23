import { create } from 'zustand';
import { fetchClinicStaff } from '../services/staffService';
import { fetchAllRoles } from '../services/rbac/roleService';
import { fetchAllPermissions } from '../services/rbac/permissionService';

const useStaffStore = create((set, get) => ({
    roles: [],
    staffList: [],
    permissions: null,
    loadingRoles: false,
    loadingStaff: false,
    loadingPermissions: false,
    lastClinicIdForRoles: null,
    lastClinicIdForStaff: null,

    fetchRoles: async (clinicId) => {
        if (!clinicId) return;
        if (get().lastClinicIdForRoles === clinicId && get().roles.length > 0) {
            console.log("[useStaffStore] Skipping fetchRoles: ClinicId same and data exists.");
            return;
        }

        set({ loadingRoles: true });
        try {
            const res = await fetchAllRoles(clinicId);
            if (res?.data && Array.isArray(res.data)) {
                const mapped = res.data.map((r) => ({
                    id: r.id,
                    name: r.name,
                    subtitle: r.description || "Custom Role",
                    staffCount: 0,
                    permissions: r.permissions?.length || 0,
                    created: new Date(r.createdAt).toLocaleDateString(),
                    icon: "clipboard",
                }));
                set({ roles: mapped, lastClinicIdForRoles: clinicId });
            }
        } catch (err) {
            console.error("Failed to fetch roles:", err);
        } finally {
            set({ loadingRoles: false });
        }
    },

    fetchStaff: async (clinicId) => {
        if (!clinicId) return;
        if (get().lastClinicIdForStaff === clinicId && get().staffList.length > 0) {
            console.log("[useStaffStore] Skipping fetchStaff: ClinicId same and data exists.");
            return;
        }

        set({ loadingStaff: true });
        try {
            const res = await fetchClinicStaff(clinicId);
            if (res && Array.isArray(res)) {
                const mapped = res.map((s) => ({
                    id: s.id,
                    name: `${s.firstName || ""} ${s.lastName || ""}`.trim(),
                    position: s.roles?.[0]?.name || "Staff",
                    role: s.roles?.[0]?.name || "Staff",
                    phone: s.phoneNumber || s.email,
                    joined: new Date(s.createdAt).toLocaleDateString(),
                }));
                set({ staffList: mapped, lastClinicIdForStaff: clinicId });
            }
        } catch (err) {
            console.error("Failed to fetch staff:", err);
        } finally {
            set({ loadingStaff: false });
        }
    },

    fetchPermissions: async () => {
        if (get().permissions) {
            console.log("[useStaffStore] Skipping fetchPermissions: Data already exists.");
            return;
        }

        set({ loadingPermissions: true });
        try {
            const res = await fetchAllPermissions();
            const gp = res?.data?.groupedPermissions;
            const list = res?.data?.permissions;
            let groupedPermissions = gp;
            if (!groupedPermissions && Array.isArray(list)) {
                groupedPermissions = list.reduce((acc, p) => {
                    const mod = p.module || "Other";
                    if (!acc[mod]) acc[mod] = [];
                    acc[mod].push({
                        id: p.id,
                        name: p.name,
                        description: p.description,
                    });
                    return acc;
                }, {});
            }
            set({ permissions: groupedPermissions || {} });
        } catch (err) {
            console.error("Failed to fetch permissions:", err);
        } finally {
            set({ loadingPermissions: false });
        }
    },

    clearStaffStore: () => set({
        roles: [],
        staffList: [],
        permissions: null,
        lastClinicIdForRoles: null,
        lastClinicIdForStaff: null
    })
}));

export default useStaffStore;
