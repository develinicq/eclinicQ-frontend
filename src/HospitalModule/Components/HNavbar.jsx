
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DocNavbar from '../../DoctorModule/Components/DocNavbar'
import { hospitalIcon, stethoscopeBlue } from '../../../public/index.js'
import useHospitalAuthStore from '@/store/useHospitalAuthStore'
import { getPublicUrl } from '@/services/uploadsService'

// Wrap the Doctor navbar and add a hospital/doctor module switcher to match the requested UI.
export default function HNavbar() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('hospital');

  const { user, fetchMe } = useHospitalAuthStore();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('doctor')) setActiveModule('doctor');
    else setActiveModule('hospital');

    // Fetch hospital admin profile if not already fetched
    if (!user) {
      fetchMe();
    }
  }, [user, fetchMe]);

  useEffect(() => {
    const fetchImage = async () => {
      if (user?.profilePhoto) {
        const url = await getPublicUrl(user.profilePhoto);
        setProfilePhotoUrl(url);
      }
    };
    fetchImage();
  }, [user?.profilePhoto]);

  const switchToHospital = () => { setActiveModule('hospital'); navigate('/hospital'); };
  const switchToDoctor = () => { setActiveModule('doctor'); navigate('/doc'); };

  const switcherEl = null;

  return (
    <DocNavbar
      moduleSwitcher={switcherEl}
      hospitalAdminData={user}
      hospitalAdminPhoto={profilePhotoUrl}
    />
  )
}
