import React, { useMemo, useState } from 'react'
import Header from '../../../components/DoctorList/Header'
import Table from '../../../components/DoctorList/Table'

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
    exp: '12 yrs exp',
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
    exp: '8 yrs exp',
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
    exp: '6 yrs exp',
    status: 'Inactive',
  },
]

export default function HDoctors(){
  const [selected, setSelected] = useState('all')

  const counts = useMemo(() => ({
    all: SAMPLE_ACTIVE.length + SAMPLE_INACTIVE.length,
    active: SAMPLE_ACTIVE.length,
    inactive: SAMPLE_INACTIVE.length,
  }), [])

  const doctorsAll = useMemo(() => ([...SAMPLE_ACTIVE, ...SAMPLE_INACTIVE]), [])

  const doctors = useMemo(() => {
    if (selected === 'active') return doctorsAll.filter(d => d.status === 'Active')
    if (selected === 'inactive') return doctorsAll.filter(d => d.status === 'Inactive')
    return doctorsAll
  }, [doctorsAll, selected])

  return (
    <div className="pb-2">
      <div className="mt-2">
        <Header counts={counts} selected={selected} onChange={setSelected} addLabel="Add New Doctor" />
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden m-3">
          <Table doctors={doctors} />
        </div>
      </div>
    </div>
  )
}
