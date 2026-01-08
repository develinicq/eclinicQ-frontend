import { useEffect, useMemo, useState } from "react";
import Header from "../../../../components/DoctorList/Header";
import HospitalGrid from "../../../../components/HospitalList/HospitalGrid";
import { getAllHospitalsBySuperAdmin } from "../../../../services/hospitalService";
import useAuthStore from "../../../../store/useAuthStore";
import TablePagination from "@/pages/TablePagination";

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
        const status = e?.response?.status;
        const serverMsg = e?.response?.data?.message || e?.message || '';
        // suppress showing server permission errors to the UI and render dummy list
        setError(null);

        // Fallback dummy hospitals for exploration when unauthorized/forbidden
        const dummy = [
          {
            id: "1",
            hospitalCode: "HO-0268790",
            name: "Manipal Hospital",
            address: {
              street: "Jawahar Nagar",
              city: "Akola",
              state: "MH",
              pincode: "444001"
            },
            email: "manipal@gmail.com",
            phone: "+91 91753 67847",
            type: "Multi-speciality",
            userCount: 10,
            noOfBeds: 250,
            establishmentYear: "2010",
            status: "Active",
            logo: "",
            image: "/hospital-sample.png",
          },
          {
            id: "2",
            hospitalCode: "HO-0435621",
            name: "Apollo Hospital",
            address: {
              street: "Civil Lines",
              city: "Nagpur",
              state: "MH",
              pincode: "440001"
            },
            email: "apollo@gmail.com",
            phone: "+91 98234 56123",
            type: "Super-speciality",
            userCount: 50,
            noOfBeds: 400,
            establishmentYear: "2005",
            status: "Inactive",
            logo: "",
            image: "/hospital-sample.png",
          },
          {
            id: "3",
            hospitalCode: "HO-0178943",
            name: "Care Hospital",
            address: {
              street: "Pimple Saudagar",
              city: "Pune",
              state: "MH",
              pincode: "411027"
            },
            email: "carehospital@gmail.com",
            phone: "+91 77090 12345",
            type: "General",
            userCount: 5,
            noOfBeds: 120,
            establishmentYear: "2012",
            status: "Active",
            logo: "",
            image: "/hospital-sample.png",
          },
        ];
        // Mark Manipal and Care as active; Apollo as inactive
        setActive(dummy.filter(h => (h.status || '').toLowerCase() === 'active'));
        setInactive(dummy.filter(h => (h.status || '').toLowerCase() === 'inactive'));
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    if (isAuthed) load();
    else {
      // Not authed: still show dummy hospitals for exploration
      const dummy = [
        {
          id: "4",
          hospitalCode: "HO-1001001",
          name: "CityCare Clinic",
          address: {
            street: "HSR Layout",
            city: "Bengaluru",
            state: "KA",
            pincode: "560102"
          },
          email: "citycare@example.com",
          phone: "+91 90000 11111",
          type: "Clinic",
          userCount: 6,
          noOfBeds: 20,
          establishmentYear: "2018",
          status: "Active",
          logo: "",
          image: "/hospital-sample.png",
        },
        {
          id: "5",
          hospitalCode: "HO-1001002",
          name: "LifeLine Hospital",
          address: {
            street: "Andheri West",
            city: "Mumbai",
            state: "MH",
            pincode: "400053"
          },
          email: "lifeline@example.com",
          phone: "+91 98888 22222",
          type: "Multi-speciality",
          userCount: 22,
          noOfBeds: 150,
          establishmentYear: "2014",
          status: "Active",
          logo: "",
          image: "/hospital-sample.png",
        },
      ];
      setActive(dummy);
      setInactive([]);
      setLoading(false);
      setError(null);
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

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="sticky mt-2 top-0 z-10 ">
        <Header counts={counts} selected={selected} onChange={setSelected} addLabel="Add New Hospital" addPath="/register/hospital" />
      </div>
      <div className="flex-1  overflow-y-auto p-3 bg-white">
        {loading && <div className="p-6 text-gray-600">Loading hospitals…</div>}
        {!loading && error && <div className="p-6 text-red-600">{String(error)}</div>}
        {!loading && !error && <HospitalGrid hospitals={hospitalsFiltered} />}
      </div>
      <div className="bg-white fixed bottom-0 w-full flex items-center justify-center pr-20">
        <TablePagination></TablePagination>
      </div>
      
    </div>
  )
}

export default HospitalList;
