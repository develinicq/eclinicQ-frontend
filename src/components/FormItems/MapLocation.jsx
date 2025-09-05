import React from 'react'

const MapLocation = ({ 
  className = '', 
  heightClass = 'h-[100px]', 
  addButtonLabel = 'Add Location', 
  captionText 
}) => {
  return (
    <div className={`w-full ${heightClass} bg-gray-100 border border-gray-300 rounded-lg relative ${className}`}>
      <div className="absolute top-4 right-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
          {addButtonLabel}
        </button>
      </div>
      {captionText && (
        <div className="absolute bottom-4 left-4 text-sm text-gray-600">
          {captionText}
        </div>
      )}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  )
}

export default MapLocation
