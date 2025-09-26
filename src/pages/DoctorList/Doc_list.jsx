import React from 'react'
import Header from '../../components/DoctorList/Header'
import Table from '../../components/DoctorList/Table'

const Doc_list = () => {
  return (
    <div className="pb-2">{/* no fixed footer now; small bottom padding */}
      <div className="mt-2">
        {/* Header sits outside, no outline */}
        <Header />

        {/* Table has its own outline */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden m-3">
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Doc_list
