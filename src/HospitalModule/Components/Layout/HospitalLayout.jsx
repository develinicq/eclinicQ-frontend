import React from 'react'
import HSidebar from '../HSidebar'
import HNavbar from '../HNavbar'
import { Outlet } from 'react-router-dom'

export default function HospitalLayout(){
  return (
    <div className="min-h-screen bg-white flex">
      <HSidebar />
      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-10 bg-white border-b"><HNavbar /></div>
        <main className="min-h-[calc(100vh-56px)]"><Outlet /></main>
      </div>
    </div>
  )
}
