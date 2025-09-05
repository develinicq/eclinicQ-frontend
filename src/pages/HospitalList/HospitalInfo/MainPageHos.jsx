import React from 'react'
import HospitalBanner from '../../../components/HospitalList/HospitalInfo.jsx/HospitalBanner'
import HospitalNav from '../../../components/HospitalList/HospitalInfo.jsx/HospitalNav'

const MainPageHos = () => {
  return (
    <div className='flex flex-col gap-6 w-full h-full'>
        <div className=''>
            <HospitalBanner/>
            <HospitalNav/>
        </div>
    </div>
  )
}

export default MainPageHos

