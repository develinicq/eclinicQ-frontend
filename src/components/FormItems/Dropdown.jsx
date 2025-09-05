import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

const Dropdown = ({ 
  className, 
  compulsory, 
  label, 
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  placeholder = "Select an option"
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options.find(opt => opt.value === value) || null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setSelectedOption(options.find(opt => opt.value === value) || null)
  }, [value, options])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
    
    // Create a synthetic event for the onChange handler
    const syntheticEvent = {
      target: {
        name: name,
        value: option.value,
        type: 'select-one'
      }
    }
    onChange(syntheticEvent)
  }

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={`${className} flex flex-col`}>
      <div className='flex gap-1 items-center mb-1'>
        <label className='text-sm font-medium text-gray-700'>
          {label}
        </label>
        {compulsory && (
          <div className='bg-red-500 w-1 h-1 rounded-full'></div>
        )}
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={toggleDropdown}
          className={`w-full h-[32px] px-2 border border-gray-300 rounded-lg outline-none transition-colors cursor-pointer flex items-center justify-between ${
            isOpen 
              ? 'border-blue-500 ring-2 ring-blue-500' 
              : 'hover:border-blue-400 focus:border-blue-500'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
        >
          <span className={`text-sm ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between ${
                  selectedOption?.value === option.value ? 'bg-blue-50' : ''
                }`}
              >
                <span className="text-sm text-gray-900">{option.label}</span>
                {selectedOption?.value === option.value && (
                  <Check className="w-4 h-5 text-blue-600" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
