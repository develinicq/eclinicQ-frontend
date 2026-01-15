import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useHospitalAuthStore from "@/store/useHospitalAuthStore";
import useAuthStore from "@/store/useAuthStore";
import useUIStore from "@/store/useUIStore";

/**
 * ProtectedHospitalRoute - Only accessible to users with HOSPITAL_ADMIN role.
 */
export const ProtectedHospitalRoute = () => {
    const { token, roleNames } = useHospitalAuthStore();
    const { isLoggingOut } = useUIStore();

    if (!token) {
        if (isLoggingOut) {
            return <Navigate to="/hospital/signin" replace />;
        }
        return <Navigate to="/hospital/signin" replace state={{ fromGuard: true }} />;
    }

    // Role check
    if (!roleNames.includes("HOSPITAL_ADMIN")) {
        return <Navigate to="/hospital/signin" replace state={{ fromGuard: true, message: "HOSPITAL_ADMIN role required" }} />;
    }

    return <Outlet />;
};

/**
 * ProtectedDoctorRoute - Only accessible to users with DOCTOR role.
 * Checked against hospital store (for dual-role users) or doc store (legacy/single-role).
 */
export const ProtectedDoctorRoute = () => {
    const hAuth = useHospitalAuthStore();
    const dAuth = useAuthStore();
    const { isLoggingOut } = useUIStore();

    const hToken = hAuth.token;
    const hRoles = hAuth.roleNames || [];

    const dToken = dAuth.token;
    // Note: useAuthStore might not store roleNames explicitly in the same way, 
    // but we check if it has a token as a fallback for legacy login.

    const hasDocAccess = hRoles.includes("DOCTOR") || hRoles.includes("HOSPITAL_ADMIN") || (dToken && !hToken);

    if (!hToken && !dToken) {
        if (isLoggingOut) {
            return <Navigate to="/hospital/signin" replace />;
        }
        return <Navigate to="/hospital/signin" replace state={{ fromGuard: true }} />;
    }

    if (!hasDocAccess) {
        // If they have hospital access but NOT doctor access
        return <Navigate to="/hospital" replace state={{ fromGuard: true, message: "DOCTOR role required" }} />;
    }

    return <Outlet />;
};

/**
 * PublicHospitalRoute - For public-facing hospital routes like Sign-In.
 */
export const PublicHospitalRoute = ({ children }) => {
    const { token } = useHospitalAuthStore();

    if (token) {
        return <Navigate to="/hospital" replace />;
    }

    return children ? children : <Outlet />;
};
