import React, { useState, useRef, useEffect } from 'react'
import Overview_cards from '../../../components/Dashboard/Overview_cards'
import AppointmentsChart from '../../../components/Dashboard/AppointmentsChart'
import Button from '../../../components/Button'
import { angelDown, calenderArrowLeft, calenderArrowRight } from '../../../../public/index.js'
import { getPlatformOverview } from '../../../services/superAdminService'
import UniversalLoader from '../../../components/UniversalLoader'

const Dashboard = () => {
  const [activeRange, setActiveRange] = useState('Yearly')
  const ranges = ['Daily', 'Weekly', 'Monthly', 'Yearly']
  const [loading, setLoading] = useState(true)
  const [overviewData, setOverviewData] = useState(null)

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await getPlatformOverview()
        if (res.success) {
          setOverviewData(res.data)
        }
      } catch (error) {
        console.error("Failed to fetch platform overview:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchOverview()
  }, [])

  // Month dropdown state
  const months = [
    "All Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [isMonthOpen, setMonthOpen] = useState(false);
  const monthBtnRef = useRef(null);
  const monthDropRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      const inBtn =
        monthBtnRef.current && monthBtnRef.current.contains(e.target);
      const inDrop =
        monthDropRef.current && monthDropRef.current.contains(e.target);
      if (isMonthOpen && !inBtn && !inDrop) setMonthOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMonthOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isMonthOpen]);

  return (
    <>
      <div className='p-5 flex flex-col gap-6 bg-white'>
        {/* Heading and search live in navbar per mock; no extra top tabs here */}

        {/* Platform Overview using Overview_cards */}
        <div>
          <div className='text-[20px] font-medium text-secondary-grey400 mb-3'>Platform Overview</div>
          {loading ? (
            <div className='flex items-center justify-center p-12 '>
              <UniversalLoader size={30} />
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              <Overview_cards
                title='Total Active Doctors'
                value={overviewData?.totalActiveDoctors || 0}
                percent={overviewData?.deltas?.doctors || 0}
                periodText='from last year'
                variant={(overviewData?.deltas?.doctors || 0) >= 0 ? 'profit' : 'loss'}
              />
              <Overview_cards
                title='Total Clinics'
                value={overviewData?.totalClinics || 0}
                percent={overviewData?.deltas?.clinics || 0}
                periodText='from last year'
                variant={(overviewData?.deltas?.clinics || 0) >= 0 ? 'profit' : 'loss'}
              />
              <Overview_cards
                title='Total Active Hospitals'
                value={overviewData?.totalActiveHospitals || 0}
                percent={overviewData?.deltas?.hospitals || 0}
                periodText='from last year'
                variant={(overviewData?.deltas?.hospitals || 0) >= 0 ? 'profit' : 'loss'}
              />
              <Overview_cards
                title='Total Enrolled Patients'
                value={overviewData?.totalEnrolledPatients || 0}
                percent={overviewData?.deltas?.patients || 0}
                periodText='from last year'
                variant={(overviewData?.deltas?.patients || 0) >= 0 ? 'profit' : 'loss'}
              />
            </div>
          )}
          {/* Controls row: tabs on the left, month/year dropdowns on the right */}
          <div className='mt-6 flex items-center justify-between'>
            <div className='flex items-center gap-2 p-[2px] rounded-sm bg-blue-primary50  h-8 overflow-hidden w-fit'>
              {ranges.map((range, idx) => {
                const isActive = activeRange === range

                return (
                  <React.Fragment key={range}>
                    <button
                      onClick={() => setActiveRange(range)}
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


            <div className="flex items-center gap-3 relative">
              {/* Month dropdown trigger */}
              <button
                ref={monthBtnRef}
                type="button"
                onClick={() => setMonthOpen((v) => !v)}
                className={`inline-flex items-center gap-2 px-3 h-8 rounded-md border border-secondary-grey200 bg-white text-sm text-[#424242] ${isMonthOpen ? "ring-1 ring-[#2372EC]/30" : ""
                  }`}
                aria-haspopup="listbox"
                aria-expanded={isMonthOpen}
              >
                <span className="text-secondary-grey400  font-medium">
                  {selectedMonth}
                </span>
                <img
                  src={angelDown}
                  alt="Dropdown"
                  className={`w-3 h-3 transition-transform ${isMonthOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              <button
                type="button"
                className={`inline-flex items-center gap-1 px-2 h-8 rounded-md border border-secondary-grey200 bg-white text-sm text-[#424242]`}
              >
                <img src={calenderArrowLeft} alt="Previous" className="w-3 h-3" />
                <span className="text-secondary-grey400  font-medium">2025</span>
                <img src={calenderArrowRight} alt="Next" className="w-3 h-3" />
              </button>

              {/* Month dropdown */}
              {isMonthOpen && (
                <div
                  ref={monthDropRef}
                  className="absolute z-[1000] right-0 top-10 w-[126px] rounded-lg bg-monochrom-white p-2 overflow-hidden"
                  style={{
                    borderWidth: "0.5px",
                    borderColor: "#D6D6D6",
                    boxShadow: "0px 12px 60px -15px rgba(0, 0, 0, 0.06)",
                  }}
                  role="listbox"
                >
                  <div
                    className="flex flex-col gap-2 overflow-y-auto no-scrollbar"
                    style={{ maxHeight: "236px" }}
                  >
                    {months.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setSelectedMonth(m);
                          setMonthOpen(false);
                        }}
                        className={`w-[108px] h-8 px-2 py-1 rounded text-secondary-grey400 text-left ${selectedMonth === m
                          ? "bg-blue-primary50 border-[0.5px] border-blue-primary150"
                          : "hover:bg-secondary-grey50"
                          }`}
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "120%",
                          letterSpacing: "0%",
                          verticalAlign: "middle",
                        }}
                        role="option"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Appointment Overview metrics — full grid per mock */}
        <div className='flex flex-col gap-3'>
          <div className='text-md font-medium text-secondary-grey400'>Appointment Overview</div>
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
