import React, { useState, useRef, useEffect } from 'react'
import { Download, ChevronLeft, ChevronRight, UserPlus, Check, ChevronsUpDown } from 'lucide-react'
import { angelDown, calenderArrowLeft, calenderArrowRight } from '../../../../public/index.js'
import Overview_cards from '../../../components/Dashboard/Overview_cards'
import AvatarCircle from '../../../components/AvatarCircle'
import BookAppointmentDrawer from '../../../components/Appointment/BookAppointmentDrawer.jsx'
import SampleTable from '../../../pages/SampleTable'
import TableHeader from '../../../components/TableHeader'
import DropdownMenu from '../../../components/GeneralDrawer/DropdownMenu'
import {
  walkInBlue,

} from "../../../../public/index.js";
import useHospitalAuthStore from '../../../store/useHospitalAuthStore'
import axiosInstance from '../../../lib/axios'
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
  const monthRef = useRef(null)

  // Year state
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const handlePrevYear = () => setSelectedYear(prev => prev - 1);
  const handleNextYear = () => setSelectedYear(prev => prev + 1);

  const [bookOpen, setBookOpen] = useState(false)
  const { hospitalId } = useHospitalAuthStore()
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loadingAnalytics, setLoadingAnalytics] = useState(false)

  const [doctorOverviewData, setDoctorOverviewData] = useState(null)
  const [loadingDoctorOverview, setLoadingDoctorOverview] = useState(false)

  const fetchAnalyticsSummary = async () => {
    if (!hospitalId) return
    setLoadingAnalytics(true)
    try {
      const res = await axiosInstance.get(`/hospitals/analytics/summary`, {
        params: {
          hospitalId,
          year: selectedYear
        }
      })
      if (res.data?.success) {
        setAnalyticsData(res.data.data)
      }
    } catch (error) {
      console.error('Error fetching analytics summary:', error)
    } finally {
      setLoadingAnalytics(false)
    }
  }

  const fetchDoctorOverview = async () => {
    if (!hospitalId) return
    setLoadingDoctorOverview(true)
    try {
      const monthIndex = months.indexOf(selectedMonth)
      const queryMonth = monthIndex === 0 ? 13 : monthIndex

      const res = await axiosInstance.get(`/hospitals/analytics/doctor-overview`, {
        params: {
          hospitalId,
          year: selectedYear,
          month: queryMonth,
          aggregationType: 'weekly'
        }
      })
      if (res.data?.success) {
        setDoctorOverviewData(res.data.data)
      }
    } catch (error) {
      console.error('Error fetching doctor overview:', error)
    } finally {
      setLoadingDoctorOverview(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'hospital') {
      fetchAnalyticsSummary()
    } else if (activeTab === 'doctors') {
      fetchDoctorOverview()
    }
  }, [hospitalId, selectedYear, selectedMonth, activeTab])

  useEffect(() => {
    const onClick = (e) => {
      if (isMonthOpen && monthRef.current && !monthRef.current.contains(e.target)) {
        setMonthOpen(false)
      }
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
          <button
            onClick={() => setBookOpen(true)}
            className=" group inline-flex items-center gap-2 h-[32px] min-w-[32px] p-2 rounded-md border text-sm border-[#BFD6FF] bg-[#F3F8FF] text-[#2372EC] hover:bg-[#2372EC] hover:text-white transition-colors"
          >
            <img
              src={walkInBlue}
              alt=""
              className="h-4  group-hover:invert group-hover:brightness-0"
            />
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
            <div className="flex items-center gap-2 sm:gap-3" ref={monthRef}>
              <PeriodTabs value={period} onChange={setPeriod} />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMonthOpen(!isMonthOpen)}
                  className={`w-full flex items-center gap-4 px-2 h-8 rounded-lg bg-white text-sm transition-colors border ${isMonthOpen ? "border-[#2372EC]/30 ring-1 ring-[#2372EC]/30" : "border-secondary-grey100"}`}
                >
                  <span className="text-secondary-grey400 font-medium">{selectedMonth}</span>
                  <img src={angelDown} alt="Dropdown" className={`w-3 h-3 transition-transform ${isMonthOpen ? "rotate-180" : ""}`} />
                </button>

                {isMonthOpen && (
                  <DropdownMenu
                    items={months}
                    selectedItem={selectedMonth}
                    onSelect={(it) => {
                      setSelectedMonth(typeof it === 'object' ? (it.value ?? it.label) : it)
                      setMonthOpen(false)
                    }}
                    width="w-[170px]"
                  />
                )}
              </div>

              <div className="inline-flex items-center gap-1 px-2 h-8 rounded-lg border border-secondary-grey100 bg-white text-sm text-[#424242]">
                <button
                  type="button"
                  onClick={handlePrevYear}
                  className="p-1 hover:bg-gray-100 rounded-sm transition-colors"
                >
                  <img src={calenderArrowLeft} alt="Previous" className="w-3 h-3" />
                </button>
                <span className="text-secondary-grey400 font-medium px-1">
                  {selectedYear}
                </span>
                <button
                  type="button"
                  onClick={handleNextYear}
                  className="p-1 hover:bg-gray-100 rounded-sm transition-colors"
                >
                  <img src={calenderArrowRight} alt="Next" className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {
          activeTab === 'doctors' && (
            // Right column strictly aligned to the far right for Doctors Overview
            <div className="flex flex-col items-end w-auto">
              {/* Top row: period + months + year aligned right */}
              <div className="flex items-center gap-2 sm:gap-3" ref={monthRef}>
                {/* Reusing the same ref for outer click handling if shared, or we can use separate refs if both visible, but they aren't visible at same time due to tabs */}
                <PeriodTabs value={period} onChange={setPeriod} />

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMonthOpen(!isMonthOpen)}
                    className={`w-full flex items-center gap-4 px-2 h-8 rounded-lg bg-white text-sm transition-colors border ${isMonthOpen ? "border-[#2372EC]/30 ring-1 ring-[#2372EC]/30" : "border-secondary-grey100"}`}
                  >
                    <span className="text-secondary-grey400 font-medium">{selectedMonth}</span>
                    <img src={angelDown} alt="Dropdown" className={`w-3 h-3 transition-transform ${isMonthOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isMonthOpen && (
                    <DropdownMenu
                      items={months}
                      selectedItem={selectedMonth}
                      onSelect={(it) => {
                        setSelectedMonth(typeof it === 'object' ? (it.value ?? it.label) : it)
                        setMonthOpen(false)
                      }}
                      width="w-[170px]"
                    />
                  )}
                </div>

                <div className="inline-flex items-center gap-1 px-2 h-8 rounded-lg border border-secondary-grey100 bg-white text-sm text-[#424242]">
                  <button
                    type="button"
                    onClick={handlePrevYear}
                    className="p-1 hover:bg-gray-100 rounded-sm transition-colors"
                  >
                    <img src={calenderArrowLeft} alt="Previous" className="w-3 h-3" />
                  </button>
                  <span className="text-secondary-grey400 font-medium px-1">
                    {selectedYear}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextYear}
                    className="p-1 hover:bg-gray-100 rounded-sm transition-colors"
                  >
                    <img src={calenderArrowRight} alt="Next" className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </div >

      {/* Conditional: Hospital Overview KPIs */}
      {
        activeTab === 'hospital' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">
            <Overview_cards
              title="Total Patients Served"
              value={analyticsData?.patientsServed?.current ?? 0}
              percent={analyticsData?.patientsServed?.change ?? 0}
              periodText={`from ${analyticsData?.patientsServed?.period ?? 'last week'}`}
              variant={(analyticsData?.patientsServed?.change ?? 0) >= 0 ? "profit" : "loss"}
            />
            <Overview_cards
              title="Total Doctors Onboarded"
              value={analyticsData?.doctorsOnboarded?.current ?? 0}
              percent={analyticsData?.doctorsOnboarded?.change ?? 0}
              periodText={`from ${analyticsData?.doctorsOnboarded?.period ?? 'last month'}`}
              variant={(analyticsData?.doctorsOnboarded?.change ?? 0) >= 0 ? "profit" : "loss"}
            />
            <Overview_cards
              title="Total Staff Onboarded"
              value={analyticsData?.staffOnboarded?.current ?? 0}
              percent={analyticsData?.staffOnboarded?.change ?? 0}
              periodText={`from ${analyticsData?.staffOnboarded?.period ?? 'last month'}`}
              variant={(analyticsData?.staffOnboarded?.change ?? 0) >= 0 ? "profit" : "loss"}
            />
            <Overview_cards
              title="Total Beds"
              value={analyticsData?.totalBeds?.current ?? 0}
              percent={analyticsData?.totalBeds?.change ?? 0}
              periodText={`from ${analyticsData?.totalBeds?.period ?? 'last month'}`}
              variant={(analyticsData?.totalBeds?.change ?? 0) >= 0 ? "profit" : "loss"}
            />
            <Overview_cards
              title="ICU Beds"
              value={analyticsData?.icuBeds?.current ?? 0}
              percent={analyticsData?.icuBeds?.change ?? 0}
              periodText={`from ${analyticsData?.icuBeds?.period ?? 'last month'}`}
              variant={(analyticsData?.icuBeds?.change ?? 0) >= 0 ? "profit" : "loss"}
            />
            <Overview_cards
              title="Total Specialities"
              value={analyticsData?.specialties?.current ?? 0}
              percent={analyticsData?.specialties?.change ?? 0}
              periodText={`from ${analyticsData?.specialties?.period ?? 'last month'}`}
              variant={(analyticsData?.specialties?.change ?? 0) >= 0 ? "profit" : "loss"}
            />
          </div>
        )
      }

      {/* Conditional: Hospital Overview Charts */}
      {
        activeTab === 'hospital' && (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base font-medium text-[#424242]">Analytics Overview</span>
              <div className="inline-flex items-center gap-1 px-2 h-8 rounded-lg border border-secondary-grey100 bg-white text-sm text-[#424242]">
                <button
                  type="button"
                  onClick={handlePrevYear}
                  className="p-1 hover:bg-gray-100 rounded-sm transition-colors"
                >
                  <img src={calenderArrowLeft} alt="Previous" className="w-3 h-3" />
                </button>
                <span className="text-secondary-grey400 font-medium px-1">
                  {selectedYear}
                </span>
                <button
                  type="button"
                  onClick={handleNextYear}
                  className="p-1 hover:bg-gray-100 rounded-sm transition-colors"
                >
                  <img src={calenderArrowRight} alt="Next" className="w-3 h-3" />
                </button>
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
        )
      }

      {/* Conditional: Appointment Analytics UI */}
      {
        activeTab === 'appointment' && (
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
        )
      }

      {/* Conditional: Doctors Overview UI */}
      {
        activeTab === 'doctors' && (
          <>
            {/* Single KPI card row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3">
              <Overview_cards
                title="Total Doctors Onboarded"
                value={doctorOverviewData?.totalDoctorsOnboarded?.total ?? 0}
                percent={doctorOverviewData?.totalDoctorsOnboarded?.percentageChange ?? 0}
                periodText={doctorOverviewData?.totalDoctorsOnboarded?.comparisonPeriod ?? 'from last month'}
                variant={doctorOverviewData?.totalDoctorsOnboarded?.trend === 'down' ? 'loss' : 'profit'}
              />
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
                        header: <TableHeader label="Doctor Name" />,
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
                    data={doctorOverviewData?.doctorPerformance?.map(doc => ({
                      id: doc.id,
                      name: doc.name,
                      exp: `${doc.experienceYears} Years Exps`,
                      spec: doc.speciality ?? 'N/A', // Assuming specialty might be added or handled
                      total: doc.total,
                      engaged: doc.engaged,
                      noshow: doc.noShow,
                      admitted: doc.admitted,
                      rescheduled: doc.rescheduled,
                      completion: `${Math.round(doc.completionRate * 100)}%`,
                      rating: `${doc.rating}/5`,
                      badgeColor: "orange", // Default to orange as per initial mock
                      profilePhoto: doc.profilePhoto
                    })) || []}
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
        )
      }

      {/* Appointment booking drawer */}
      <BookAppointmentDrawer open={bookOpen} onClose={() => setBookOpen(false)} />
    </div >
  )
}
