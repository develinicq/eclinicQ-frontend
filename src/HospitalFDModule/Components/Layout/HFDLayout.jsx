import React from 'react'
import HFDSidebar from '../HFDSidebar'
import HFDNavbar from '../HFDNavbar'
import { Outlet } from 'react-router-dom'

export default function HFDLayout(){
  return (
    <div className="min-h-screen bg-[#F3F6FB] flex">
      <HFDSidebar />
      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-10 bg-white border-b"><HFDNavbar /></div>
        <main className="min-h-[calc(100vh-56px)]"><Outlet /></main>
      </div>
    </div>
  )
}
