import { useEffect, useMemo, useState } from "react";
import Header from "../../components/DoctorList/Header";
import HospitalGrid from "../../components/HospitalList/HospitalGrid";
import { getAllHospitalsBySuperAdmin } from "../../services/hospitalService";
import useAuthStore from "../../store/useAuthStore";

function HospitalList() {
  const isAuthed = useAuthStore((s) => Boolean(s.token));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState([]);
  const [inactive, setInactive] = useState([]);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await getAllHospitalsBySuperAdmin();
        if (ignore) return;
        const a = resp?.data?.active || [];
        const i = resp?.data?.inactive || [];
        setActive(a);
        setInactive(i);
      } catch (e) {
        if (ignore) return;
        setError(e?.message || "Failed to fetch hospitals");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    if (isAuthed) load();
    else {
      setLoading(false);
      setError("Not authenticated");
    }
    return () => {
      ignore = true;
    };
  }, [isAuthed]);

  const hospitals = useMemo(() => {
    const mapOne = (h, statusLabel) => ({
      temp: h?.id || "",
      id: h?.hospitalCode || "",
      name: h?.name || "",
      address: [h?.address?.street, h?.city, h?.state, h?.pincode].filter(Boolean).join(", "),
      email: h?.emailId || "",
      phone: h?.phone || "",
      type: h?.type || "",
      doctors: h?.userCount != null ? `${h.userCount}+ Users` : undefined,
      beds: h?.noOfBeds != null ? `${h.noOfBeds} Beds` : undefined,
      estYear: h?.establishmentYear || "",
      validity: "",
      status: statusLabel,
      logo: h?.logo || "",
      image: h?.image || "/hospital-sample.png",
    });
    return [
      ...active.map((h) => mapOne(h, "Active")),
      ...inactive.map((h) => mapOne(h, "Inactive")),
    ];
  }, [active, inactive]);

  const counts = useMemo(() => ({
    all: (active?.length || 0) + (inactive?.length || 0),
    active: active?.length || 0,
    inactive: inactive?.length || 0,
  }), [active, inactive]);

  const [selected, setSelected] = useState('all');

  const hospitalsFiltered = useMemo(() => {
    if (selected === 'active') return hospitals.filter(h => h.status === 'Active');
    if (selected === 'inactive') return hospitals.filter(h => h.status === 'Inactive');
    return hospitals;
  }, [hospitals, selected]);

  return(
  <div className="flex flex-col h-full">
    <div className="sticky mt-2 top-0 z-10 bg-white ">
      <Header counts={counts} selected={selected} onChange={setSelected} addLabel="Add New Hospital" />
    </div>
    <div className="flex-1 overflow-y-auto p-3">
      {loading && <div className="p-6 text-gray-600">Loading hospitals…</div>}
      {!loading && error && <div className="p-6 text-red-600">{String(error)}</div>}
      {!loading && !error && <HospitalGrid hospitals={hospitalsFiltered} />}
    </div>
  </div>
  )
}

export default HospitalList;
