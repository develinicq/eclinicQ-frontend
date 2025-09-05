<<<<<<< HEAD
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const Overview_cards = () => {
  return (
    <div className="w-full max-w-sm h-auto px-4 pt-3 pb-4 rounded-2xl border border-[#6DDB7280]/50 bg-white relative">
      <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_right,rgba(255,255,255,1)_70%,rgba(109,219,114,0.15)_100%)]"></div>
      <div className="relative z-10 flex flex-col gap-3">
        
        <div className="flex items-center justify-between">
          <h2 className="text-[#424242] text-base font-medium">Total Active Doctors</h2>
          <div className="w-11 h-11 rounded-full border flex items-center justify-center bg-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 3v7a6 6 0 0012 0V3m-6 10v7m0 0h6m-6 0H6" />
            </svg>
          </div>
        </div>

        <div>
          <p className="text-2xl font-bold text-[#424242]">120,043</p>
          <p className="flex items-center text-xs font-normal text-[#626060] mt-1">
            <span className="flex items-center gap-1 text-[#3EAF3F] bg-green-50 px-1 py-0.5 rounded font-normal"><ArrowUpRight className='w-3 h-3' /> 12%</span>
            &nbsp;from last month
          </p>
        </div>
      </div>
    </div>
  )
}

export default Overview_cards
=======
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

const Overview_cards = () => {
  return (
    <div className="w-full max-w-sm h-auto px-4 pt-3 pb-4 rounded-2xl border border-[#6DDB7280]/50 bg-white relative">
      <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_right,rgba(255,255,255,1)_70%,rgba(109,219,114,0.15)_100%)]"></div>
      <div className="relative z-10 flex flex-col gap-3">
        
        <div className="flex items-center justify-between">
          <h2 className="text-[#424242] text-base font-medium">Total Active Doctors</h2>
          <div className="w-11 h-11 rounded-full border flex items-center justify-center bg-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 3v7a6 6 0 0012 0V3m-6 10v7m0 0h6m-6 0H6" />
            </svg>
          </div>
        </div>

        <div>
          <p className="text-2xl font-bold text-[#424242]">120,043</p>
          <p className="flex items-center text-xs font-normal text-[#626060] mt-1">
            <span className="flex items-center gap-1 text-[#3EAF3F] bg-green-50 px-1 py-0.5 rounded font-normal"><ArrowUpRight className='w-3 h-3' /> 12%</span>
            &nbsp;from last month
          </p>
        </div>
      </div>
    </div>
  )
}

export default Overview_cards
>>>>>>> dev
