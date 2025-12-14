
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DocNavbar from '../../DoctorModule/Components/DocNavbar'
import { hospitalIcon, stethoscopeBlue } from '../../../public/index.js'

// Wrap the Doctor navbar and add a hospital/doctor module switcher to match the requested UI.
export default function HNavbar(){
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('hospital');

  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('doctor')) setActiveModule('doctor');
    else setActiveModule('hospital');
  }, []);

  const switchToHospital = () => { setActiveModule('hospital'); navigate('/hospital'); };
  const switchToDoctor = () => { setActiveModule('doctor'); navigate('/doc'); };

  const switcherEl = (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={switchToHospital}
        className={`flex items-center justify-center h-8 w-8 rounded-[6px] border ${activeModule==='hospital' ? 'bg-[#2372EC] border-[#2372EC]' : 'bg-white border-[#D6D6D6]'} hover:bg-blue-50 transition-colors`}
        aria-label="Hospital Module"
        title="Hospital"
      >
        <img src={hospitalIcon} alt="Hospital" className={`w-4 h-4 ${activeModule==='hospital' ? '' : ''}`} />
      </button>
      <button
        type="button"
        onClick={switchToDoctor}
        className={`flex items-center justify-center h-8 w-8 rounded-[6px] border ${activeModule==='doctor' ? 'bg-[#2372EC] border-[#2372EC]' : 'bg-white border-[#D6D6D6]'} hover:bg-blue-50 transition-colors`}
        aria-label="Doctor Module"
        title="Doctor"
      >
        <img src={stethoscopeBlue} alt="Doctor" className={`w-4 h-4 ${activeModule==='doctor' ? '' : ''}`} />
      </button>
    </div>
  );

  return (
    <DocNavbar moduleSwitcher={switcherEl} />
  )
}
