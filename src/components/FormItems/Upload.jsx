import React from 'react'

const Upload = ({label = "Upload File", className = "", compulsory = false}) => {
  return (
    <div className={`${className} flex flex-col gap-1 `}>
        <div className='flex gap-1 items-center'>
        <label className='text-sm font-normal text-gray-700'>
          {label}
        </label>
        <img src="/i-icon.png" alt="" className='w-3 h-3' />

        {compulsory && (
          <div className='bg-red-500 w-1 h-1 rounded-full'></div>
        )}
      </div>
      <button className=" w-full h-[32px] text-left text-blue-600 text-sm font-medium border border-dashed border-blue-400 rounded-lg px-4 hover:bg-blue-50">
         Upload File
    </button>
    </div>
  )
}

export default Upload
