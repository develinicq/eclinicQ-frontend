import React, { useState } from 'react'
import { Calendar, Download, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react'
import Overview_cards from '../../../components/Dashboard/Overview_cards'

const PeriodTabs = ({ value, onChange }) => {
  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly']
  return (
  <div className="flex items-center gap-2 text-xs sm:text-sm">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
      className={`px-2.5 sm:px-3 py-1 rounded-md transition-colors ${
            value === t
        ? 'bg-[#2372EC] text-white'
        : 'bg-transparent text-[#626060] hover:bg-gray-50'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

const SectionCard = ({ title, children, right }) => (
  <div className="bg-white border border-gray-200 rounded-[12px]">
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <h3 className="text-[#424242] text-sm sm:text-base font-medium">{title}</h3>
      <div className="flex items-center gap-2">
        {right}
        <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50">
          <Download className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
    <div className="p-4">{children}</div>
  </div>
)

const DocDashboard = () => {
  const [period, setPeriod] = useState('Daily')

  return (
    <div className="p-3 sm:p-4 md:p-3">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        {/* Top row: welcome + Walk-In button */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-sm text-[#626060]">Welcome, Dr. Millin Chavan. Here's an overview of your practice.</p>
          <div className="flex items-center gap-2">
            {/* Divider to mimic design */}
            <div className="hidden sm:block w-px h-6 bg-[#E5F0FF]" />
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm border-[#BFD6FF] bg-[#F3F8FF] text-[#2372EC] hover:bg-[#E9F2FF]">
              <UserPlus className="w-4 h-4" />
              <span>Walk-In Appointment</span>
            </button>
          </div>
        </div>

        {/* Bottom row: tabs + date pill */}
        <div className="flex items-center justify-between gap-3">
          <PeriodTabs value={period} onChange={setPeriod} />
          <div className="flex items-center">
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-gray-200 bg-white text-sm text-[#424242]">
              <ChevronLeft className="w-4 h-4 text-gray-700" />
              <span>20 Jan, 2025</span>
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Overview_cards title="Total Patients" value={12043} percent={12} periodText="from last month" variant="profit" />
        <Overview_cards title="Total Appointments" value={12043} percent={-12} periodText="from last month" variant="loss" />
        <Overview_cards title="Average Weekly Appointments" value={600} percent={8} periodText="from last week" variant="profit" />
        <Overview_cards title="Today's Appointments" value={80} percent={2} periodText="from Yesterday" variant="profit" />
        <Overview_cards title="Completed Appointments" value={600} percent={-8} periodText="from last week" variant="loss" />
        <Overview_cards title="Cancelled Appointments" value={80} percent={-2} periodText="from Yesterday" variant="profit" />
        <Overview_cards title="Weekly Revenue" value={"₹1200k"} percent={-12} periodText="from last week" variant="loss" />
        <Overview_cards title="Total Revenue" value={"₹1200k"} percent={12} periodText="from last Year" variant="profit" />
      </div>

      {/* Graphs row - placeholders (to be implemented later) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <SectionCard title="Patients Log" right={<span className="text-xs text-[#626060]">Patients added over the Year</span>}>
          <div className="h-[300px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
            Chart placeholder — to be added
          </div>
        </SectionCard>

        <SectionCard title="Appointment Booking Through" right={<span className="text-xs text-[#626060]">Appointment trends over the Year</span>}>
          <div className="h-[300px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
            Chart placeholder — to be added
          </div>
        </SectionCard>
      </div>

      {/* Bottom placeholder section (optional) */}
      <SectionCard title="Appointment Booking Through">
        <div className="h-[220px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
          Additional charts/table placeholder — to be added
        </div>
      </SectionCard>
    </div>
  )
}

export default DocDashboard
