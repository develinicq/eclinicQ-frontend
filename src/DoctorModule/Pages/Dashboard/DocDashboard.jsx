import React, { useState, useRef, useEffect } from 'react'
import { Download, ChevronLeft, ChevronRight, UserPlus, Check } from 'lucide-react'
import Overview_cards from '../../../components/Dashboard/Overview_cards'
import BookAppointmentDrawer from '../../../components/Appointment/BookAppointmentDrawer.jsx'

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
  // Month dropdown state
  const months = ['All Months','January','February','March','April','May','June','July','August','September','October','November','December']
  const [selectedMonth, setSelectedMonth] = useState('All Months')
  const [isMonthOpen, setMonthOpen] = useState(false)
  const monthBtnRef = useRef(null)
  const monthDropRef = useRef(null)
  const [bookOpen, setBookOpen] = useState(false)
  // Close handlers for month dropdown

  useEffect(() => {
    const onClick = (e) => {
      const inBtn = monthBtnRef.current && monthBtnRef.current.contains(e.target)
      const inDrop = monthDropRef.current && monthDropRef.current.contains(e.target)
      if (isMonthOpen && !inBtn && !inDrop) setMonthOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setMonthOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [isMonthOpen])

  return (
  <div className="p-4">
      {/* Header and top metrics */}
      <div className="mb-4 sm:mb-6">
        {/* Welcome + Walk-In */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-sm text-[#626060]">Welcome, Dr. Millin Chavan. Here's an overview of your practice.</p>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block w-px h-6 bg-[#E5F0FF]" />
            <button onClick={()=> setBookOpen(true)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm border-[#BFD6FF] bg-[#F3F8FF] text-[#2372EC] hover:bg-[#E9F2FF]">
              <UserPlus className="w-4 h-4" />
              <span>Walk-In Appointment</span>
            </button>
          </div>
        </div>

        {/* Top metrics: Total Patients + Total Appointments Booked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
            <div>
              <div className="text-[13px] text-[#626060]">Total Patients</div>
              <div className="text-[28px] leading-8 font-semibold text-[#1F2937]">12,043</div>
            </div>
            {/* right icon badge */}
            <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gray-500">
                <path stroke="currentColor" strokeWidth="1.5" d="M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM3.5 20.5c0-3.037 2.463-5.5 5.5-5.5s5.5 2.463 5.5 5.5v.5H3.5v-.5Zm9.5-5.5c2.485 0 4.5 2.015 4.5 4.5v.5H13v-.5c0-2.485 2.015-4.5 4.5-4.5Z"/>
              </svg>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
            <div>
              <div className="text-[13px] text-[#626060]">Total Appointments Booked</div>
              <div className="text-[28px] leading-8 font-semibold text-[#1F2937]">15,000</div>
            </div>
            {/* right icon badge */}
            <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gray-500">
                <path stroke="currentColor" strokeWidth="1.5" d="M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM3.5 20.5c0-3.037 2.463-5.5 5.5-5.5s5.5 2.463 5.5 5.5v.5H3.5v-.5Zm9.5-5.5c2.485 0 4.5 2.015 4.5 4.5v.5H13v-.5c0-2.485 2.015-4.5 4.5-4.5Z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Period tabs and selectors */}
        <div className="flex items-center justify-between mb-2">
          <PeriodTabs value={period} onChange={setPeriod} />
          <div className="flex items-center gap-3 relative">
            {/* Month dropdown trigger */}
            <button
              ref={monthBtnRef}
              type="button"
              onClick={() => setMonthOpen(v => !v)}
              className={`inline-flex items-center gap-2 px-3 h-8 rounded-md border border-gray-200 bg-white text-sm text-[#424242] ${isMonthOpen ? 'ring-1 ring-[#2372EC]/30' : ''}`}
              aria-haspopup="listbox"
              aria-expanded={isMonthOpen}
            >
              <span className="text-[#6B7280]">{selectedMonth}</span>
              <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${isMonthOpen ? 'rotate-90' : ''}`} />
            </button>
            {/* Month dropdown */}
            {isMonthOpen && (
              <div
                ref={monthDropRef}
                className="absolute z-[1000] left-0 top-10 w-[200px] rounded-md border border-gray-200 bg-white shadow-lg"
                role="listbox"
              >
                <div className="py-1">
                  {months.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => { setSelectedMonth(m); setMonthOpen(false) }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50 ${selectedMonth===m ? 'bg-[#F5F9FF] border border-[#D5E6FF]' : ''}`}
                      role="option"
                    >
                      <span>{m}</span>
                      {selectedMonth===m && (<Check className="w-4 h-4 text-[#2372EC]" />)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        <Overview_cards title="Avg. Appointment Booked" value={103} percent={12} periodText="from last Year" variant="profit" />
        <Overview_cards title="Avg. Engage Patient" value={80} percent={-8} periodText="from last Year" variant="loss" />
        <Overview_cards title="Avg. Patient Admitted" value={4} percent={12} periodText="from last Year" variant="profit" />
        <Overview_cards title="Avg. No-Show Patients" value={5} percent={-12} periodText="from last Year" variant="loss" />
        <Overview_cards title="Avg. time Spent/ Patient" value={'06:05 min'} percent={5} periodText="from last Year" variant="profit" />
        <Overview_cards title="Avg. Token Utilization" value={'85 Tokens'} percent={12} periodText="from last Year" variant="profit" />
        <Overview_cards title="Avg. Waiting Time" value={'12:30 min / Patient'} percent={12} periodText="from last year" variant="profit" />
        <Overview_cards title="Avg. New Patient Visit" value={'12 Patients'} percent={12} periodText="from last year" variant="profit" />
        <Overview_cards title="Total Patients" value={12043} percent={12} periodText="from last month" variant="profit" />
        <Overview_cards title="Total Appointments Booked" value={15000} percent={8} periodText="from last month" variant="profit" />
      </div>

      {/* Analytics Overview section */}
      <div className="mb-2">
        <span className="text-sm sm:text-base font-medium text-[#424242]">Analytics Overview</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <SectionCard title="Patients Served" right={<span className="text-xs text-[#626060]">Patients added over the Year</span>}>
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

  {/* Bottom section */}
  <SectionCard title="Appointment Booking Through">
        <div className="h-[220px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
          Additional charts/table placeholder — to be added
        </div>
      </SectionCard>

      {/* Appointment booking drawer */}
      <BookAppointmentDrawer open={bookOpen} onClose={()=> setBookOpen(false)} />
    </div>
  )
}

export default DocDashboard
