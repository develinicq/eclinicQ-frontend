import React from 'react';

const TimeInput = ({ value, onChange, placeholder = "00:00", className = "" }) => {
  // Convert 24-hour format to 12-hour format for display
  const formatTimeForDisplay = (timeValue) => {
    if (!timeValue) return "09:00 AM";
    const [hours, minutes] = timeValue.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  return (
    <div className={`relative ${className}`}>
      <div className="h-8 px-2 py-1 text-xs border border-gray-300 rounded bg-white flex items-center justify-between w-24">
        <span className="text-gray-700">{formatTimeForDisplay(value)}</span>
        <svg 
          className="w-4 h-4 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      <input
        type="time"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default TimeInput;
