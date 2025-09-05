import React from 'react'
import DoctorBanner from '../../../components/DoctorList/DoctorInfo/DoctorBanner'
import PageNav from '../../../components/DoctorList/DoctorInfo/PageNav'

const MainPage = () => {
  return (
      <div className='flex flex-col gap-6 w-full h-full'>
        <div className=''>
            <DoctorBanner/>
            <PageNav/>
        </div>
    </div>
  )
}

export default MainPage
