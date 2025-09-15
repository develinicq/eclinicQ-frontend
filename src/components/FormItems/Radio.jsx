import React from 'react'

const Radio = ({ 
  className, 
  compulsory, 
  label, 
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  stacked = false,
}) => {
  return (
    <div className={`${className} ${stacked ? 'flex flex-col gap-2' : 'flex gap-6'}`}>
      <div className='flex gap-1 items-center'>
        <label className='text-sm font-medium text-gray-700'>
          {label}
        </label>
        {compulsory && (
          <div className='bg-red-500 w-1 h-1 rounded-full'></div>
        )}
      </div>
      
      <div className={`${stacked ? 'mt-1' : ''} flex gap-6`}>
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              className="accent-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default Radio
