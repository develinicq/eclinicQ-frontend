import React from 'react'
import { CheckCircle, Circle } from 'lucide-react'

const AgreementBox = ({
  title,
  description,
  bullets = [],
  accepted = false,
  onToggle,
  confirmText,
  className = ''
}) => {
  return (
    <div className={`bg-white border-[0.5px] border-[#B8B8B8] rounded-lg p-3 flex flex-col gap-2 ${className}`}>
      <div className='w-[668px] '>
        {title && (
          <h3 className="text-base font-semibold text-black">{title}</h3>
        )}
        {description && (
          <p className="text-sm font-normal text-[#626060]">{description}</p>
        )}
      </div>
      
      {bullets.length > 0 && (
        <div className="bg-[#F9F9F9] p-2 flex flex-col text-sm gap-1">
          {bullets.map((item, idx) => (
            <div key={idx}>
              <span className="font-medium ">{idx + 1}. {item.title}</span>
              {item.text ? <span className="font-light">: {item.text}</span> : null}
            </div>
          ))}
        </div>
      )}

      {typeof onToggle === 'function' && (
        <div className="flex items-center mt-1">
          <button
            onClick={onToggle}
            className="mr-2 focus:outline-none"
            type="button"
          >
            {accepted ? (
              
              <div className='w-5 h-5'>
                <img src="/checkbox.png" alt=""  className='w-full h-full'/>
              </div>
            ) : (
              <div className='w-5 h-5 border-[1px] border-[#8E8E8E] rounded'></div>
            )}
          </button>
          <span className="text-sm text-gray-700">{confirmText}</span>
        </div>
      )}
    </div>
  )
}

export default AgreementBox


