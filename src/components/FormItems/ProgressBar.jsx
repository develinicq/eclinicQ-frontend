import React from 'react'


const ProgressBar = ({ step, total }) => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center">
        
        <div className="w-[100px] bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 ml-4">{step} of {total}</span>
      </div>
    </div>
  );
export default ProgressBar


