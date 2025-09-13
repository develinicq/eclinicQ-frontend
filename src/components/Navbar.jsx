import { ChevronDown } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bell, stethoscopeBlue, hospitalIcon } from '../../public/index.js'

const Partition = () => {
  return (
    <div className='w-[8.5px] h-[20px] flex gap-[10px] items-center justify-center'>
        <div className='w-[0.5px] h-full bg-[#B8B8B8]'>
        </div>
    </div>
  )
}

const AddNewDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleAddDoctor = () => {
    navigate('/register/doctor');
    onClose();
  };

  const handleAddHospital = () => {
    navigate('/register/hospital');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-1 w-[190px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden p-2 z-[60]">
      <div className="flex flex-col gap-1  ">
        <button
          onClick={handleAddDoctor}
          className=" rounded-md flex items-center gap-2 hover:bg-gray-50 h-8 transition-colors"
        >
          <div className="w-4 h-4 ml-1 flex items-center justify-center">
            <img src={stethoscopeBlue} alt="Add Doctor" />
          </div>
          <span className="text-[#424242] font-normal text-sm">Add Doctor</span>
        </button>
        
        <button
          onClick={handleAddHospital}
          className="w-full rounded-md flex items-center gap-2 hover:bg-gray-50 h-8 transition-colors"
        >
          <div className="w-4 h-4 flex items-center justify-center ml-1">
            <img src={hospitalIcon} alt="Add Hospital" />
          </div>
          <span className="text-[#424242] font-normal text-sm">Add Hospital</span>
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className='w-full h-12 border-b-[0.5px]  border-[#D6D6D6] flex items-center px-4 justify-between'>
        <div>
            <span className='text-sm text=[#424242]'>Doctors</span>
        </div>
        <div className='flex gap-2 items-center'>
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleDropdown}
              className='flex items-center bg-[#2372EC] p-2 h-8 min-w-8 rounded-[4px] gap-2 hover:bg-blue-600 transition-colors' 
            >
                <span className='text-white text-sm font-medium'>Add New</span>
                <div className='flex border-l border-blue-400 pl-1'>
                    <ChevronDown className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}/>
                </div>
            </button>
            
            <AddNewDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
          </div>

          <Partition/>

          <div className="w-7 h-7 p-1 relative">
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 flex items-center justify-center rounded-full w-[14px] h-[14px] bg-[#F04248]">
              <span className="font-medium text-[10px] text-white">8</span>
            </div>

            {/* Bell icon */}
            <img src={bell} alt="Notifications" className="w-5 h-5" />
          </div>

          <Partition/>

          <div className='flex items-center gap-2'>
            <span className='font-semibold text-base text-[#424242]'>Super Admin</span>

            <div className='flex justify-center rounded-full border-[0.5px] border-[#D6D6D6] bg-[#F9F9F9] w-8 h-8 items-center'>
                <span className='text-sm font-normal text-[#424242]'>S</span>
            </div>

          </div>




        </div>
    </div>
  )
}

export default Navbar
