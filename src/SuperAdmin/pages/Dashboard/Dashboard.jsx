import React from 'react'
import Overview_cards from '../../../components/Dashboard/Overview_cards'
import AppointmentsChart from '../../../components/Dashboard/AppointmentsChart'


const Dashboard = () => {
  return (
    <>
    <div className='p-5 flex flex-col gap-6'>
      {/* Heading and search live in navbar per mock; no extra top tabs here */}

      {/* Platform Overview using Overview_cards */}
      <div>
        <div className='text-sm font-medium text-[#424242] mb-3'>Platform Overview</div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <Overview_cards title='Total Active Doctors' value={120043} percent={12} periodText='from last year' variant='profit' />
          <Overview_cards title='Total Clinics' value={20043} percent={12} periodText='from last year' variant='profit' />
          <Overview_cards title='Total Active Hospitals' value={50000} percent={2} periodText='from last year' variant='profit' />
          <Overview_cards title='Total Enrolled Patients' value={'1.3M'} percent={8} periodText='from last year' variant='profit' />
        </div>
        {/* Controls row: tabs on the left, month/year dropdowns on the right */}
        <div className='mt-6 flex items-center justify-between'>
          <div className='flex items-center bg-white border border-[#E5E7EB] rounded h-8 overflow-hidden w-fit'>
            <button className='px-3 h-8 text-xs text-[#6B7280] hover:bg-gray-100'>Daily</button>
            <div className='w-px h-5 bg-[#E5E7EB]' />
            <button className='px-3 h-8 text-xs text-[#6B7280] hover:bg-gray-100'>Weekly</button>
            <div className='w-px h-5 bg-[#E5E7EB]' />
            <button className='px-3 h-8 text-xs text-[#6B7280] hover:bg-gray-100'>Monthly</button>
            <div className='w-px h-5 bg-[#E5E7EB]' />
            <button className='px-3 h-8 text-xs font-medium text-[#2372EC] bg-[#EEF5FF] border-l border-[#BFD3F7]'>Yearly</button>
          </div>

          <div className='flex items-center gap-3'>
            {/* All Months dropdown pill */}
            <div className='flex items-center gap-2 border border-[#E5E7EB] rounded px-3 h-8 bg-white text-xs text-[#424242] shadow-[inset_0_1px_0_#fff]'>
              <span className='text-[#6B7280]'>All Months</span>
              <svg width='12' height='12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='text-[#9CA3AF]'>
                <path d='M6 9l6 6 6-6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round'/>
              </svg>
            </div>
            {/* Year dropdown pill */}
            <div className='flex items-center gap-2 border border-[#E5E7EB] rounded px-3 h-8 bg-white text-xs text-[#424242] shadow-[inset_0_1px_0_#fff]'>
              <span className='text-[#6B7280]'>2025</span>
              <svg width='12' height='12' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='text-[#9CA3AF]'>
                <path d='M6 9l6 6 6-6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round'/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Overview metrics — full grid per mock */}
      <div className='flex flex-col gap-3'>
        <div className='text-sm font-medium text-[#424242]'>Appointment Overview</div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <Overview_cards title='Avg. Appointment Booked' value={103} percent={12} periodText='from last Year' variant='profit' />
          <Overview_cards title='Avg. Engage Patient' value={80} percent={8} periodText='from last Year' variant='loss' />
          <Overview_cards title='Avg. Patient Serve' value={'100 /Doctor'} percent={12} periodText='from last Year' variant='profit' />
          <Overview_cards title='Avg. time Spent/Doctor' value={'06:05 min/Patient'} percent={5} periodText='from last Year' variant='profit' />
          <Overview_cards title='Avg. Waiting Time' value={'12:30 min / Patient'} percent={12} periodText='from last Year' variant='profit' />
          <Overview_cards title='Avg. Appt Cancelled by Patient' value={5} percent={12} periodText='from last Year' variant='loss' />
          <Overview_cards title='Avg. Appt Cancelled by Doctor' value={5} percent={12} periodText='from last Year' variant='loss' />
        </div>
      </div>

      {/* Analytics Overview */}
      <div className='flex flex-col gap-3'>
        <div className='text-sm font-medium text-[#424242]'>Analytics Overview</div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='bg-white rounded-lg border border-gray-200 p-3'>
            <div className='text-sm text-gray-600 mb-2'>Patients Served</div>
            {/* placeholder chart */}
            <AppointmentsChart />
          </div>
          <div className='bg-white rounded-lg border border-gray-200 p-3'>
            <div className='text-sm text-gray-600 mb-2'>Appointment Booking Through</div>
            {/* placeholder chart */}
            <AppointmentsChart />
          </div>
        </div>
      </div>

    </div>
    </>
    
  )
}

export default Dashboard

