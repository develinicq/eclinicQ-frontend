import React from 'react';

const Toggle = ({ checked, onChange, disabled = false, className = "" }) => {
  return (
    <label className={`relative inline-flex items-center cursor-pointer ${disabled ? 'cursor-not-allowed' : ''} ${className}`}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div className={`w-11 h-6 rounded transition-all relative ${
        checked ? 'bg-blue-600' : 'bg-gray-200'
      } ${disabled ? 'opacity-50' : ''}`}>
        <div className={`w-5 h-5 bg-white border border-gray-300 rounded absolute top-0.5 transition-all transform ${
          checked ? 'translate-x-6' : 'translate-x-0.5'
        }`} />
      </div>
    </label>
  );
};

export default Toggle;
