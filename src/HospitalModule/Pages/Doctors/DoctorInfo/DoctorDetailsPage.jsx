import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import HospitalDoctorBanner from "./HospitalDoctorBanner";
import PageNav from "./PageNav";
import { getDoctorDetailsByIdBySuperAdmin } from "@/services/doctorService";
import useAuthStore from "@/store/useAuthStore";

const DoctorDetailsPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const isAuthed = useAuthStore((s) => Boolean(s.token));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        let ignore = false;
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                // prefer userId from route param; fallback to state.doctor.userId
                // The route is /hospital/doctor/:id. This ID is likely the userId or doctorId.
                const routeId = id ? decodeURIComponent(String(id)).trim() : "";
                const stateUserId = location.state?.doctor?.userId || location.state?.doctor?.id;
                const userId = routeId || stateUserId;

                if (!userId) throw new Error("Doctor userId is missing");

                const resp = await getDoctorDetailsByIdBySuperAdmin(userId);
                if (ignore) return;

                const d = resp?.data?.doctor || resp?.data || {};

                // Map API details to UI contract used by banner & tabs
                // Ensure legacy support for fields if API varies
                const mapped = {
                    ...d,
                    id: d?.doctorCode || d?.id || userId,
                    userId,
                    name: d?.name || d?.doctorName || location.state?.doctor?.name || "Doctor",
                    designation: d?.designation || d?.qualification || location.state?.doctor?.designation || "",
                    specialization: d?.specialization || location.state?.doctor?.specialization || "",
                    exp: d?.exp || d?.experience,
                    status: d?.status || location.state?.doctor?.status || 'Active',
                    profileImage: d?.image || d?.profilePhoto || d?.avatar || location.state?.doctor?.image || "",
                    coverImage: d?.coverImage || d?.bannerImage || "",
                    activePackage: d?.activePackage,
                    clinicHospitalName: d?.clinicHospitalName,
                    mrnNumber: d?.mrnNumber || "",
                    registrationCouncil: d?.registrationCouncil || "",
                    registrationYear: d?.registrationYear || "",
                    specializationWithExperience: d?.specializationWithExperience || [],
                    primaryPhone: d?.primaryPhone || d?.contact,
                    emailAddress: d?.emailAddress || d?.email,
                    graduationDegree: d?.graduationDegree || "",
                    postGraduationDegree: d?.postGraduationDegree || "",
                    address: d?.address,
                    location: d?.location,
                    hospitalDetails: d?.hospitalDetails || [],
                    dateOfBirth: d?.dateOfBirth,
                    age: d?.age,
                    dateJoinedPlatform: d?.dateJoinedPlatform,
                    profileCreated: d?.profileCreated,
                    consultationDetails: d?.consultationDetails || {}, // Important for Consultation tab
                };
                setDoctor(mapped);
            } catch (e) {
                if (ignore) return;
                console.error("Failed to load doctor details", e);

                // Fallback: prefer route state if present; if API returned 401/403 (or forbidden text), suppress server message
                const stateDoc = location.state?.doctor;
                const status = e?.response?.status;
                const serverMsg = e?.response?.data?.message || e?.message || '';
                const isAuthError = status === 401 || status === 403 || /forbidden/i.test(serverMsg) || /SUPER_ACCESS/i.test(serverMsg);

                if (stateDoc) {
                    const mapped = {
                        ...stateDoc,
                        id: stateDoc.id || stateDoc.docId,
                        userId: stateDoc.userId,
                        name: stateDoc.name,
                        designation: stateDoc.designation,
                        specialization: stateDoc.specialization,
                        exp: stateDoc.exp,
                        status: stateDoc.status || 'Active',
                        profileImage: stateDoc.image || stateDoc.profilePhoto || '',
                    };
                    setDoctor(mapped);
                } else if (isAuthError) {
                    // show a minimal dummy doctor when permissions prevent fetching details
                    setDoctor({
                        id: id || 'DOC-DUMMY',
                        userId: id || 'user-dummy',
                        name: 'Doctor (preview)',
                        designation: 'General',
                        specialization: 'General',
                        exp: '5',
                        status: 'Active',
                        profileImage: ''
                    });
                    setError(null);
                } else {
                    setError('Failed to fetch doctor details');
                }
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        if (isAuthed) load();
        else {
            // Not authed: allow viewing from route state if present
            const stateDoc = location.state?.doctor;
            if (stateDoc) {
                setDoctor({
                    ...stateDoc,
                    id: stateDoc.id || stateDoc.docId,
                    userId: stateDoc.userId,
                    name: stateDoc.name,
                    designation: stateDoc.designation,
                    specialization: stateDoc.specialization,
                    exp: stateDoc.exp,
                    status: stateDoc.status || 'Active',
                    profileImage: stateDoc.image || '',
                });
                setError(null);
            } else {
                setError("Not authenticated");
            }
            setLoading(false);
        }
        return () => { ignore = true; };
    }, [id, isAuthed, location.state]);

    if (loading) return <div className="p-6 text-gray-600">Loading doctor details…</div>;
    // Suppress error if we have a partial doctor loaded via fallback? No, existing logic sets doctor if fallback succeeds.
    if (error && !doctor) return <div className="p-6 text-red-600">{String(error)}</div>;
    if (!doctor) return <div className="p-6 text-gray-600">Doctor not found.</div>;

    return (
        <div className="flex flex-col gap-6 w-full h-full">
            <div>
                <HospitalDoctorBanner doctor={doctor} />
                <PageNav doctor={doctor} />
            </div>
        </div>
    );
};

export default DoctorDetailsPage;
