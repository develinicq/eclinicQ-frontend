
import { ArrowDownRight, ArrowUpRight, CalendarCheck, Users } from 'lucide-react'
import React from 'react'

const Overview_cards = ({
  title = 'Title',
  value = 0,
  percent = 0,
  periodText = 'from last period',
  variant = 'profit',
  icon,
  className = '',
}) => {
  const isProfit = variant === 'profit'

  const gradient = isProfit
    ? 'linear-gradient(to right, rgba(255,255,255,1) 70%, rgba(109,219,114,0.15) 100%)'
    : 'linear-gradient(to right, rgba(255,255,255,1) 70%, rgba(240,68,56,0.12) 100%)'

  const borderClass = isProfit ? 'border-[#6DDB72]/50' : 'border-[#F04438]/40'
  const BadgeIcon = isProfit ? ArrowUpRight : ArrowDownRight
  const badgeTone = isProfit
    ? 'text-green-600 bg-green-50'
    : 'text-red-500 bg-red-50'

  const RightIcon = ({ className = '' }) => (
    <div className={`w-11 h-11 rounded-full border flex items-center justify-center bg-white shadow-sm ${className}`}>
      {icon ? (
        icon
      ) : isProfit ? (
        <Users className="w-5 h-5 text-gray-700" />
      ) : (
        <CalendarCheck className="w-5 h-5 text-gray-700" />
      )}
    </div>
  )

  const formattedValue =
    typeof value === 'number' ? new Intl.NumberFormat().format(value) : value

  return (
    <div className={`p-4 rounded-[12px] border-[0.5px] bg-white relative ${borderClass} ${className}`}>
      <div
        className="absolute inset-0 rounded-[12px]"
        style={{
          background: isProfit
            ? 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 56.54%, rgba(109,219,114,0.15) 100%)'
            : 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 56.54%, rgba(240,68,56,0.12) 100%)',
        }}
      ></div>
      <div className="relative z-10 flex items-stretch justify-between gap-6">
        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            <h2 className="text-[#424242] text-sm sm:text-base font-medium leading-tight">{title}</h2>
            <p className="text-[22px] sm:text-2xl font-bold text-[#424242] leading-tight">{formattedValue}</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-normal text-[#626060] mt-1">
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded leading-none ${badgeTone}`}>
              <BadgeIcon className="w-3 h-3" /> {percent}%
            </span>
            <span className="leading-none">{periodText}</span>
          </div>
  </div>
  <RightIcon className="self-center" />
      </div>
    </div>
  )
}

export default Overview_cards
