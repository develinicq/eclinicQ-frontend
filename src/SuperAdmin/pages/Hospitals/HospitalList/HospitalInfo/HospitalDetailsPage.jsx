import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import HospitalBanner from "../../../../../components/HospitalList/HospitalInfo.jsx/HospitalBanner.jsx";
import HospitalNav from "../../../../../components/HospitalList/HospitalInfo.jsx/HospitalNav.jsx";
import { getHospitalByIdBySuperAdmin } from "../../../../../services/hospitalService";
import useAuthStore from "../../../../../store/useAuthStore";

const HospitalDetailsPage = () => {
  // Route uses /hospital/:id
  const { id } = useParams();
  const location = useLocation();

  const isAuthed = useAuthStore((s) => Boolean(s.token));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [subscriptionName, setSubscriptionName] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // Prefer backend id coming from state (mapped as `temp` in list),
        // fallback to the URL param `id`.
        const stateHospital = location?.state?.hospital || {};
        const backendId = stateHospital?.temp; // original DB id from backend list
        const urlParam = id ? decodeURIComponent(String(id)) : "";
        const hospitalId = backendId || urlParam;
        const resp = await getHospitalByIdBySuperAdmin(hospitalId);
        if (ignore) return;
        const h = resp?.data?.hospital || {};
        setHospital(h);
        setSubscriptionName(resp?.data?.subscriptionName || null);
        setSpecialties(resp?.data?.specialties || []);
        setDocuments(resp?.data?.documents || []);
      } catch (e) {
        if (ignore) return;
        setError(e?.message || "Failed to fetch hospital details");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    if (isAuthed) load();
    else {
      setLoading(false);
      setError("Not authenticated");
    }
    return () => { ignore = true; };
  }, [id, location?.state, isAuthed]);

  if (loading) return <div className="p-6 text-gray-600">Loading hospital details…</div>;
  if (error) return <div className="p-6 text-red-600">{String(error)}</div>;
  if (!hospital) return <div className="p-6 text-gray-600">Hospital not found.</div>;

  // Determine status from navigation state or fetched hospital
  const statusRaw = (location?.state?.hospital?.status || hospital?.status || '').toLowerCase();
  const statusLabel = statusRaw === 'inactive' ? 'Inactive' : (statusRaw === 'active' ? 'Active' : '-');

  const bannerData = {
    name: hospital?.name || '-',
    status: statusLabel,
    address: [hospital?.address?.blockNo, hospital?.address?.street,hospital?.address?.landmark, hospital?.city, hospital?.state, hospital?.pincode].filter(Boolean).join(', '),
    type: hospital?.type || '-',
    established: hospital?.establishmentYear || '-',
    website: hospital?.url || '-',
    bannerImage: hospital?.image || '/hospital-sample.png',
    logoImage: hospital?.logo || '/images/hospital_logo.png',
    stats: {
  patientsManaged: '1,000',
  appointmentsBooked: '1,000',
  totalBeds: hospital?.noOfBeds != null ? String(hospital.noOfBeds) : '—',
  totalICUBeds: '—',
  totalDoctors: String(hospital?.userCount ?? '—'),
  totalSpecializations: specialties?.length ? String(specialties.length) : '—',
  totalSurgeries: '—',
      activePackage: subscriptionName || '—',
      eClinicQID: hospital?.hospitalCode || hospital?.id || '-',
    },
  };

  return (
    <div className='flex flex-col gap-6 w-full h-full'>
      <div>
        <HospitalBanner hospitalData={bannerData} />
  <HospitalNav hospital={{ ...hospital, subscriptionName, specialties, documents }} />
      </div>
    </div>
  );
}

export default HospitalDetailsPage;
