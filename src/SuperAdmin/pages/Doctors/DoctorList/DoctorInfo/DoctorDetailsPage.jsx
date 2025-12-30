import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DoctorBanner from "../../../../../components/DoctorList/DoctorInfo/DoctorBanner";
import PageNav from "../../../../../components/DoctorList/DoctorInfo/PageNav";
import { getDoctorDetailsByIdBySuperAdmin } from "../../../../../services/doctorService";
import useAuthStore from "../../../../../store/useAuthStore";

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
        const userId = decodeURIComponent(String(id || "")).trim() || location.state?.doctor?.userId;
        if (!userId) throw new Error("Doctor userId is missing");
        const resp = await getDoctorDetailsByIdBySuperAdmin(userId);
        if (ignore) return;
        const d = resp?.data || {};
        // Map API details to UI contract used by banner & tabs
        const mapped = {
          id: d?.doctorCode || userId,
          userId,
          name: d?.doctorName || location.state?.doctor?.name || "",
          designation: d?.qualification || "",
          specialization: d?.specialization || "",
          exp: d?.experience != null ? `${d.experience} yrs exp` : "",
          status: d?.status || location.state?.doctor?.status,
          avatar: d?.profilePhoto || "",
          activePackage: d?.activePackage,
          clinicHospitalName: d?.clinicHospitalName,
          mrnNumber: d?.mrnNumber,
          registrationCouncil: d?.registrationCouncil,
          registrationYear: d?.registrationYear,
          specializationWithExperience: d?.specializationWithExperience || [],
          primaryPhone: d?.primaryPhone,
          emailAddress: d?.emailAddress,
          graduationDegree: d?.graduationDegree,
          postGraduationDegree: d?.postGraduationDegree,
          address: d?.address,
          location: d?.location,
          hospitalDetails: d?.hospitalDetails || [],
          dateOfBirth: d?.dateOfBirth,
          age: d?.age,
          dateJoinedPlatform: d?.dateJoinedPlatform,
          profileCreated: d?.profileCreated,
        };
        setDoctor(mapped);
      } catch (e) {
        if (ignore) return;
        // Fallback: prefer route state if present; if API returned 401/403 (or forbidden text), suppress server message
        const stateDoc = location.state?.doctor;
        const status = e?.response?.status;
        const serverMsg = e?.response?.data?.message || e?.message || '';
        const isAuthError = status === 401 || status === 403 || /forbidden/i.test(serverMsg) || /SUPER_ACCESS/i.test(serverMsg);
        if (stateDoc) {
          const mapped = {
            id: stateDoc.id || stateDoc.docId,
            userId: stateDoc.userId,
            name: stateDoc.name,
            designation: stateDoc.designation,
            specialization: stateDoc.specialization,
            exp: stateDoc.exp,
            status: stateDoc.status || 'Active',
            avatar: '',
          };
          setDoctor(mapped);
        } else if (isAuthError) {
          // show a minimal dummy doctor when permissions prevent fetching details
          setDoctor({ id: id || 'DOC-DUMMY', userId: id || 'user-dummy', name: 'Doctor (preview)', designation: '', specialization: '', exp: '', status: 'Active', avatar: '' });
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
          id: stateDoc.id || stateDoc.docId,
          userId: stateDoc.userId,
          name: stateDoc.name,
          designation: stateDoc.designation,
          specialization: stateDoc.specialization,
          exp: stateDoc.exp,
          status: stateDoc.status || 'Active',
          avatar: '',
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
  if (error) return <div className="p-6 text-red-600">{String(error)}</div>;
  if (!doctor) return <div className="p-6 text-gray-600">Doctor not found.</div>;

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div>
        <DoctorBanner doctor={doctor} />
        <PageNav doctor={doctor} />
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
