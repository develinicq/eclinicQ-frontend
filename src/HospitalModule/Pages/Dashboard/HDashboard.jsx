import React, { useState, useRef, useEffect } from 'react'
import { Download, ChevronLeft, ChevronRight, UserPlus, Check, ChevronsUpDown } from 'lucide-react'
import Overview_cards from '../../../components/Dashboard/Overview_cards'
import AvatarCircle from '../../../components/AvatarCircle'
import BookAppointmentDrawer from '../../../components/Appointment/BookAppointmentDrawer.jsx'
import SampleTable from '../../../pages/SampleTable'
import TableHeader from '../../../components/TableHeader'

const PeriodTabs = ({ value, onChange }) => {
  const ranges = ['Daily', 'Weekly', 'Monthly', 'Yearly']
  return (
    <div className='flex items-center gap-2 p-[2px] rounded-sm bg-blue-primary50  h-8 overflow-hidden w-fit'>
      {ranges.map((range, idx) => {
        const isActive = value === range

        return (
          <React.Fragment key={range}>
            <button
              onClick={() => onChange(range)}
              className={`
                px-[6px] h-7 py-1 text-sm rounded-sm transition
                ${isActive
                  ? 'bg-blue-primary250 text-white'
                  : 'text-[#6B7280] hover:bg-gray-100'}
              `}
            >
              {range}
            </button>
          </React.Fragment>
        )
      })}
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

export default function HDashboard() {
  const [period, setPeriod] = useState('Daily')
  const [activeTab, setActiveTab] = useState('hospital')
  // Month dropdown state
  const months = ['All Months', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [selectedMonth, setSelectedMonth] = useState('All Months')
  const [isMonthOpen, setMonthOpen] = useState(false)
  const monthBtnRef = useRef(null)
  const monthDropRef = useRef(null)
  const [bookOpen, setBookOpen] = useState(false)

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
      {/* Welcome + Walk-In */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-sm text-[#626060]">Welcome, Manipal Hospital. Here's an overview of your practice.</p>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block w-px h-6 bg-[#E5F0FF]" />
          <button onClick={() => setBookOpen(true)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm border-[#BFD6FF] bg-[#F3F8FF] text-[#2372EC] hover:bg-[#E9F2FF]">
            <UserPlus className="w-4 h-4" />
            <span>Walk-In Appointment</span>
          </button>
        </div>
      </div>

      {/* Tabs row with optional right-side filters */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 p-[2px] rounded-sm bg-blue-primary50 h-8 overflow-hidden w-fit flex-shrink-0">
          {['hospital', 'appointment', 'doctors'].map((t) => {
            const isActive = activeTab === t;
            return (
              <React.Fragment key={t}>
                <button
                  type="button"
                  onClick={() => setActiveTab(t)}
                  className={`
                    px-[6px] h-7 py-1 text-sm rounded-sm transition
                    ${isActive
                      ? 'bg-blue-primary250 text-white'
                      : 'text-[#6B7280] hover:bg-gray-100'}
                  `}
                >
                  {t === 'hospital' ? 'Hospital Overview' : t === 'appointment' ? 'Appointment Analytics' : 'Doctors overview'}
                </button>
              </React.Fragment>
            )
          })}
        </div>
        {activeTab === 'appointment' && (
          // Right column strictly aligned to the far right
          <div className="flex flex-col items-end w-auto">
            {/* Top row: period + months + year aligned right */}
            <div className="flex items-center gap-2 sm:gap-3">
              <PeriodTabs value={period} onChange={setPeriod} />
              {/* All Months dropdown */}
              <div className="relative">
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
                {isMonthOpen && (
                  <div ref={monthDropRef} className="absolute z-[1000] right-0 top-10 w-[200px] rounded-md border border-gray-200 bg-white shadow-lg" role="listbox">
                    <div className="py-1">
                      {months.map((m) => (
                        <button key={m} type="button" onClick={() => { setSelectedMonth(m); setMonthOpen(false); }} className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50 ${selectedMonth === m ? 'bg-[#F5F9FF] border border-[#D5E6FF]' : ''}`} role="option" aria-selected={selectedMonth === m}>
                          <span className="text-[#424242]">{m}</span>
                          {selectedMonth === m && <Check className="w-4 h-4 text-[#2372EC]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'doctors' && (
          // Right column strictly aligned to the far right for Doctors Overview
          <div className="flex flex-col items-end w-auto">
            {/* Top row: period + months + year aligned right */}
            <div className="flex items-center gap-2 sm:gap-3">
              <PeriodTabs value={period} onChange={setPeriod} />
              {/* All Months dropdown */}
              <div className="relative">
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
                {isMonthOpen && (
                  <div ref={monthDropRef} className="absolute z-[1000] right-0 top-10 w-[200px] rounded-md border border-gray-200 bg-white shadow-lg" role="listbox">
                    <div className="py-1">
                      {months.map((m) => (
                        <button key={m} type="button" onClick={() => { setSelectedMonth(m); setMonthOpen(false); }} className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50 ${selectedMonth === m ? 'bg-[#F5F9FF] border border-[#D5E6FF]' : ''}`} role="option" aria-selected={selectedMonth === m}>
                          <span className="text-[#424242]">{m}</span>
                          {selectedMonth === m && <Check className="w-4 h-4 text-[#2372EC]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Conditional: Hospital Overview KPIs */}
      {activeTab === 'hospital' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">
          <Overview_cards title="Total Patients Served" value={12043} percent={-8} periodText="from last week" variant="loss" />
          <Overview_cards title="Total Doctors Onboarded" value={120} percent={12} periodText="from last month" variant="profit" />
          <Overview_cards title="Total Staff Onboarded" value={200} percent={12} periodText="from last month" variant="profit" />
          <Overview_cards title="Total Beds" value={600} percent={12} periodText="from last month" variant="profit" />
          <Overview_cards title="ICU Beds" value={120} percent={12} periodText="from last month" variant="profit" />
          <Overview_cards title="Total Specialities" value={10} percent={12} periodText="from last month" variant="profit" />
        </div>
      )}

      {/* Conditional: Hospital Overview Charts */}
      {activeTab === 'hospital' && (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm sm:text-base font-medium text-[#424242]">Analytics Overview</span>
            <div className="inline-flex items-center gap-2 px-3 h-8 rounded-md border border-gray-200 bg-white text-sm text-[#424242]">
              <span>2025</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <SectionCard title="Patients Count Per Month" right={<span className="text-xs text-[#626060]">Patients added over the Year</span>}>
              <div className="h-[320px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
                Bar chart placeholder — to be added
              </div>
            </SectionCard>
            <SectionCard title="Patient Demographics" right={<span className="text-xs text-[#626060]">Age and gender distribution</span>}>
              <div className="h-[320px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
                Bar chart placeholder — to be added
              </div>
            </SectionCard>
          </div>
        </>
      )}

      {/* Conditional: Appointment Analytics UI */}
      {activeTab === 'appointment' && (
        <>
          {/* Appointment Overview header: title only (controls moved to tabs row) */}
          <div className="mb-3">
            <span className="text-sm sm:text-base font-medium text-[#424242]">Appointment Overview</span>
          </div>

          {/* Appointment Overview KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-2">
            <Overview_cards title="Avg. Appointment Booked" value={103} percent={12} periodText="from last Year" variant="profit" />
            <Overview_cards title="Avg. Engage Patient" value={80} percent={-8} periodText="from last Year" variant="loss" />
            <Overview_cards title="Avg. Patient Admitted" value={4} percent={12} periodText="from last Year" variant="profit" />
            <Overview_cards title="Avg. No-Show Patients" value={5} percent={-12} periodText="from last Year" variant="loss" />
            <Overview_cards title="Avg. New Patient Visit" value={'12 Patients'} percent={12} periodText="from last year" variant="profit" />
            <Overview_cards title="Avg. Token Utilization" value={'85 Tokens'} percent={12} periodText="from last year" variant="profit" />
          </div>

          {/* Analytics Overview */}
          <div className="mb-2">
            <span className="text-sm sm:text-base font-medium text-[#424242]">Analytics Overview</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <SectionCard title="Appointment Booking Through" right={<span className="text-xs text-[#626060]">Online vs Walk-In</span>}>
              <div className="h-[320px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">Line chart placeholder — Online vs Walk-In</div>
            </SectionCard>
            <SectionCard title="Patients Served">
              <div className="h-[320px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">Bar chart placeholder — Monthly</div>
            </SectionCard>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-2 sm:mb-4">
            <SectionCard title="Appointment Booking Status">
              <div className="h-[240px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">Stacked bar placeholder</div>
            </SectionCard>
            <SectionCard title="Appointment Type vs. Patient" right={<span className="text-xs text-[#626060]">Breakdown by visit type over time</span>}>
              <div className="h-[240px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">Grouped bar placeholder</div>
            </SectionCard>
          </div>
        </>
      )}

      {/* Conditional: Doctors Overview UI */}
      {activeTab === 'doctors' && (
        <>
          {/* Single KPI card row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3">
            <Overview_cards title="Total Doctors Onboarded" value={120} percent={12} periodText="from last month" variant="profit" />
          </div>
          {/* Doctor Appointment Performance heading */}
          <div className="mb-2">
            <h3 className="text-[#424242] text-sm sm:text-base font-medium">Doctor Appointment Performance</h3>
          </div>
          {/* Doctor Appointment Performance table card (no inner heading bar) */}
          <div className="bg-white border border-gray-200 rounded-[12px]">
            <div className="">
              <div className="overflow-auto">
                <SampleTable
                  columns={[
                    {
                      key: 'name',
                      header: <TableHeader label="Doctor Name"  />,
                      width: 280,
                      render: (row) => (
                        <div className="flex items-center gap-3">
                          <AvatarCircle size="s" name={row.name} color={row.badgeColor} />
                          <div className="leading-tight">
                            <div className="text-[14px] font-medium text-[#424242]">{row.name}</div>
                            <div className="text-[12px] text-[#6B7280]">{row.spec} | {row.exp}</div>
                          </div>
                        </div>
                      )
                    },
                    { key: 'total', header: <TableHeader label="Total" />, width: 80 },
                    { key: 'engaged', header: <TableHeader label="Engaged" />, width: 90, render: (row) => <span className="text-[#15A364]">{row.engaged}</span> },
                    { key: 'noshow', header: <TableHeader label="No-show" />, width: 90, render: (row) => <span className="text-[#E45050]">{row.noshow}</span> },
                    { key: 'admitted', header: <TableHeader label="Admitted" />, width: 90, render: (row) => <span className="text-[#2372EC]">{row.admitted}</span> },
                    { key: 'rescheduled', header: <TableHeader label="Rescheduled" />, width: 110 },
                    {
                      key: 'completion',
                      header: <TableHeader label="Completion rate" />,
                      width: 140,
                      render: (row) => (
                        <span className="inline-flex items-center gap-1 text-[#15A364] bg-[#EAF7F1] px-2 py-0.5 rounded text-xs font-medium">
                          {row.completion}
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                        </span>
                      )
                    },
                    {
                      key: 'rating',
                      header: <TableHeader label="Rating" />,
                      width: 100,
                      render: (row) => (
                        <span className="inline-flex items-center gap-1 bg-[#FFF7E6] text-[#B97700] px-2 py-0.5 rounded text-xs font-medium">
                          <span className="text-[10px]">★</span> {row.rating}
                        </span>
                      )
                    }
                  ]}
                  data={[
                    { name: 'Dr. Millin Chavan', exp: '19 Years Exps', spec: 'G', total: 789, engaged: 712, noshow: 60, admitted: 20, rescheduled: 5, completion: '90%', rating: '4.5/5', badgeColor: "orange" },
                    { name: 'John Doe', exp: '12 Years Exps', spec: 'L', total: 845, engaged: 620, noshow: 45, admitted: 18, rescheduled: 3, completion: '85%', rating: '4.0/5', badgeColor: "orange" },
                    { name: 'Jane Smith', exp: '25 Years Exps', spec: 'M', total: 912, engaged: 680, noshow: 50, admitted: 22, rescheduled: 4, completion: '95%', rating: '4.8/5', badgeColor: "orange" },
                    { name: 'Alice Johnson', exp: '15 Years Exps', spec: 'G', total: 710, engaged: 590, noshow: 30, admitted: 15, rescheduled: 2, completion: '88%', rating: '4.2/5', badgeColor: "orange" },
                    { name: 'Robert Brown', exp: '20 Years Exps', spec: 'L', total: 800, engaged: 700, noshow: 55, admitted: 19, rescheduled: 4, completion: '92%', rating: '4.6/5', badgeColor: "orange" },
                    { name: 'Emily Davis', exp: '10 Years Exps', spec: 'M', total: 765, engaged: 530, noshow: 35, admitted: 12, rescheduled: 3, completion: '80%', rating: '4.1/5', badgeColor: "orange" },
                    { name: 'Michael Wilson', exp: '17 Years Exps', spec: 'G', total: 920, engaged: 710, noshow: 60, admitted: 25, rescheduled: 5, completion: '93%', rating: '4.7/5', badgeColor: "orange" },
                    { name: 'Jessica Taylor', exp: '22 Years Exps', spec: 'L', total: 850, engaged: 640, noshow: 40, admitted: 20, rescheduled: 3, completion: '84%', rating: '4.3/5', badgeColor: "orange" },
                    { name: 'David Lee', exp: '14 Years Exps', spec: 'M', total: 780, engaged: 620, noshow: 50, admitted: 17, rescheduled: 2, completion: '81%', rating: '4.0/5', badgeColor: "orange" },
                    { name: 'Sophia Martinez', exp: '18 Years Exps', spec: 'G', total: 900, engaged: 710, noshow: 55, admitted: 21, rescheduled: 4, completion: '90%', rating: '4.5/5', badgeColor: "orange" },
                  ]}
                  page={1}
                  pageSize={10}
                  total={120} // Mock total
                  onPageChange={() => { }}
                  hideSeparators={true}
                />
              </div>
            </div>
          </div>

          {/* Analytics: Speciality Performance */}
          <div className="mt-4">
            <span className="text-sm sm:text-base font-medium text-[#424242]">Analytics</span>
          </div>
          <SectionCard title="Speciality Performance" right={<span className="text-xs text-[#626060]">Appointment metrics by speciality</span>}>
            <div className="h-[420px] sm:h-[520px] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm">
              Horizontal bar chart placeholder — Specialities
            </div>
          </SectionCard>
        </>
      )}

      {/* Appointment booking drawer */}
      <BookAppointmentDrawer open={bookOpen} onClose={() => setBookOpen(false)} />
    </div>
  )
}
