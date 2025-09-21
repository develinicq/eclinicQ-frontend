import { Search } from 'lucide-react'
import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bell } from '../../../public/index.js'

const Partition = () => {
  return (
    <div className='w-[8.5px] h-[20px] flex gap-[10px] items-center justify-center'>
        <div className='w-[0.5px] h-full bg-[#B8B8B8]'>
        </div>
    </div>
  )
}

const DocNavbar = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Focus search when pressing Ctrl+/
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className='w-full h-12 border-b-[0.5px] border-[#D6D6D6] flex items-center px-4 gap-3'>
      {/* Left: Title */}
      <div className='shrink-0'>
        <span className='text-sm text-[#424242]'>Dashboard</span>
      </div>

      {/* Center: Search (right-aligned, fixed width) */}
      <div className='ml-auto'>
        <div className='relative w-[360px] max-w-[60vw]'>
          <Search className='absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#959595]' />
          <input
            ref={searchRef}
            type='text'
            placeholder='Search Patients'
            className='w-full h-8 rounded border border-[#E3E3E3] bg-[#F9F9F9] pl-8 pr-16 text-sm text-[#424242] placeholder:text-[#959595] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#2372EC]'
          />
          <div className='absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-[#6B7280] border border-[#E5E7EB] rounded px-1 py-0.5 bg-white'>
            Ctrl+/
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className='flex items-center gap-2'>
        <button
          onClick={() => navigate('/register/patient')}
          className='flex items-center bg-[#2372EC] px-3 h-8 rounded-[4px] gap-2 hover:bg-blue-600 transition-colors'
        >
          <span className='text-white text-sm font-medium'>Add New Patient</span>
        </button>

        <Partition />

        <div className='w-7 h-7 p-1 relative'>
          <div className='absolute -top-1 -right-1 flex items-center justify-center rounded-full w-[14px] h-[14px] bg-[#F04248]'>
            <span className='font-medium text-[10px] text-white'>8</span>
          </div>
          <img src={bell} alt='Notifications' className='w-5 h-5' />
        </div>

        <Partition />

        <div className='flex items-center gap-2'>
          <span className='font-semibold text-base text-[#424242]'>Milind Chauhan</span>
          <div className='flex justify-center rounded-full border-[0.5px] border-[#D6D6D6] bg-[#F9F9F9] w-8 h-8 items-center'>
            <span className='text-sm font-normal text-[#424242]'>MC</span>
          </div>
        </div>
      </div>
  </div>
  )
}

export default DocNavbar
