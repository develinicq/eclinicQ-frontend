import React, { useMemo, useState } from 'react'
import Header from '../../../components/DoctorList/Header'
import SampleTable from '../../../pages/SampleTable'
import { doctorColumns } from './columns'
import { useNavigate } from 'react-router-dom';

// Temporary hardcoded dataset for Hospital doctors
const SAMPLE_ACTIVE = [
  {
    id: 'DOC001',
    userId: 'u-001',
    name: 'Dr. Aditi Sharma',
    gender: 'F',
    contact: '+91 98765 43210',
    email: 'aditi.sharma@example.com',
    location: 'Mumbai, MH',
    specialization: 'Cardiology',
    specializationMore: 2,
    designation: 'Senior Cardiologist, Fortis',
    exp: '12',
    status: 'Active',
  },
  {
    id: 'DOC002',
    userId: 'u-002',
    name: 'Dr. Rohan Mehta',
    gender: 'M',
    contact: '+91 98222 11111',
    email: 'rohan.mehta@example.com',
    location: 'Pune, MH',
    specialization: 'Orthopedics',
    specializationMore: 0,
    designation: 'Consultant Orthopedic Surgeon',
    exp: '8',
    status: 'Active',
  },
]

const SAMPLE_INACTIVE = [
  {
    id: 'DOC101',
    userId: 'u-101',
    name: 'Dr. Neha Kapoor',
    gender: 'F',
    contact: '+91 90000 12345',
    email: 'neha.kapoor@example.com',
    location: 'Delhi, DL',
    specialization: 'Dermatology',
    specializationMore: 1,
    designation: 'Consultant Dermatologist',
    exp: '6',
    status: 'Inactive',
  },
]

export default function HDoctors() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('all')
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const counts = useMemo(() => ({
    all: SAMPLE_ACTIVE.length + SAMPLE_INACTIVE.length,
    active: SAMPLE_ACTIVE.length,
    inactive: SAMPLE_INACTIVE.length,
  }), [])

  const doctorsAll = useMemo(() => ([...SAMPLE_ACTIVE, ...SAMPLE_INACTIVE]), [])

  const doctors = useMemo(() => {
    let filtered = doctorsAll;
    if (selected === 'active') filtered = doctorsAll.filter(d => d.status === 'Active')
    if (selected === 'inactive') filtered = doctorsAll.filter(d => d.status === 'Inactive')
    return filtered;
  }, [doctorsAll, selected])

  const pagedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return doctors.slice(start, start + pageSize);
  }, [doctors, page, pageSize]);

  const handleRowClick = (doc) => {
    navigate(`/hospital/doctor/${encodeURIComponent(doc.userId || doc.id)}`, { state: { doctor: doc } });
  };

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
