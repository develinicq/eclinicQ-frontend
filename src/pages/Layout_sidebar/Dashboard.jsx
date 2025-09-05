<<<<<<< HEAD
import React from 'react'
import Overview_cards from '../../components/Dashboard/Overview_cards'
import AppointmentsChart from '../../components/Dashboard/AppointmentsChart'
import Tire_cards from '../../components/Dashboard/Tire_cards'


const Dashboard = () => {
  return (
    <>
    <div className='p-5 flex flex-col gap-6'>

      <div className='gap-3 flex flex-col h-[171px]'>
          <div>
            <span className='text-xl font-medium text-[#424242]'>Overview</span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full'>
            <Overview_cards />
            <Overview_cards />
            <Overview_cards />
            <Overview_cards />
            <Overview_cards />
          </div>
      </div>
      

      <div className='flex flex-col gap-3'>
      <div>
        <span className='text-xl font-medium text-[#424242]'>Appointments Overview</span>
      </div>

      <div className='' >
        <AppointmentsChart className='' />
      </div>
      </div>


      <div className='flex flex-col gap-3'>
      <div>
        <span className='text-xl font-medium text-[#424242]'>Tire Usages</span>
      </div>

      <div className="flex justify-between w-full">
        <Tire_cards className="" />
        <Tire_cards className="" />
        <Tire_cards className="" />
        <Tire_cards className="" />
        <Tire_cards className="" />
      </div>

      </div>

 
      
    </div>
    </>
    
  )
}

export default Dashboard
=======
import React from 'react'
import Overview_cards from '../../components/Dashboard/Overview_cards'
import AppointmentsChart from '../../components/Dashboard/AppointmentsChart'
import Tire_cards from '../../components/Dashboard/Tire_cards'


const Dashboard = () => {
  return (
    <>
    <div className='p-5 flex flex-col gap-6'>

      <div className='gap-3 flex flex-col h-[171px]'>
          <div>
            <span className='text-xl font-medium text-[#424242]'>Overview</span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full'>
            <Overview_cards />
            <Overview_cards />
            <Overview_cards />
            <Overview_cards />
            <Overview_cards />
          </div>
      </div>
      

      <div className='flex flex-col gap-3'>
      <div>
        <span className='text-xl font-medium text-[#424242]'>Appointments Overview</span>
      </div>

      <div className='' >
        <AppointmentsChart className='' />
      </div>
      </div>


      <div className='flex flex-col gap-3'>
      <div>
        <span className='text-xl font-medium text-[#424242]'>Tire Usages</span>
      </div>

      <div className="flex justify-between w-full">
        <Tire_cards className="" />
        <Tire_cards className="" />
        <Tire_cards className="" />
        <Tire_cards className="" />
        <Tire_cards className="" />
      </div>

      </div>

 
      
    </div>
    </>
    
  )
}

export default Dashboard
>>>>>>> dev
