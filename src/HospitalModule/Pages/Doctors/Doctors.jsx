import React, { useMemo, useState, useEffect } from 'react'
import Header from '../../../components/DoctorList/Header'
import SampleTable from '../../../pages/SampleTable'
import { doctorColumns } from './columns'
import { useNavigate } from 'react-router-dom';

import { getDoctorsForHospital } from '../../../services/doctorService';
import useHospitalAuthStore from '../../../store/useHospitalAuthStore';
import UniversalLoader from '../../../components/UniversalLoader';

export default function HDoctors() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('all')
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { hospitalId } = useHospitalAuthStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!hospitalId) {
        return;
      }
      setLoading(true);
      try {
        const res = await getDoctorsForHospital(hospitalId);
        if (res.success && res.data && Array.isArray(res.data.doctors)) {
          // Map API response to UI shape
          const mapped = res.data.doctors.map(d => {
            const specsArray = d.specialization ? d.specialization.split(',').map(s => s.trim()) : [];
            return {
              id: d.doctorCode,
              userId: d.doctorId,
              name: d.name,
              gender: d.gender === 'MALE' ? 'M' : (d.gender === 'FEMALE' ? 'F' : '-'),
              contact: d.phone,
              email: d.email,
              location: '-', // API response doesn't show location, defaulting to -
              specialization: specsArray[0] || '-',
              specializationMore: specsArray.length > 1 ? specsArray.length - 1 : 0,
              designation: '-', // API response doesn't show designation
              exp: '-',         // API response doesn't show exp
              status: (d.status && d.status.toUpperCase() === 'ACTIVE') ? 'Active' : 'Inactive',
              consultationFee: d.consultationFee,
            };
          });
          setData(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [hospitalId]);

  const counts = useMemo(() => ({
    all: data.length,
    active: data.filter(d => d.status === 'Active').length,
    inactive: data.filter(d => d.status === 'Inactive').length,
  }), [data])

  const doctors = useMemo(() => {
    let filtered = data;
    if (selected === 'active') filtered = data.filter(d => d.status === 'Active')
    if (selected === 'inactive') filtered = data.filter(d => d.status === 'Inactive')
    return filtered;
  }, [data, selected])

  const pagedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return doctors.slice(start, start + pageSize);
  }, [doctors, page, pageSize]);

  const handleRowClick = (doc) => {
    navigate(`/hospital/doctor/${encodeURIComponent(doc.userId || doc.id)}`, { state: { doctor: doc } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary-grey50">
        <UniversalLoader size={32} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-secondary-grey50">
      <div className="shrink-0 mt-2">
        <Header counts={counts} selected={selected} onChange={setSelected} addLabel="Add New Doctor" />
      </div>

      <div className="h-[calc(100vh-140px)] overflow-hidden m-3 border border-gray-200 rounded-lg shadow-sm bg-white">
        <SampleTable
          columns={doctorColumns}
          data={pagedData}
          page={page}
          pageSize={pageSize}
          total={doctors.length}
          onPageChange={setPage}
          stickyLeftWidth={335}
          stickyRightWidth={120}
          onRowClick={handleRowClick}
          hideSeparators={true}
        />
      </div>
    </div>
  )
}
