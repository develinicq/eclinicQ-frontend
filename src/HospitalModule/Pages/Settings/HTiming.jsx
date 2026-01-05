// HTiming.jsx
import React, { useState } from 'react'
import Toggle from '../../../components/FormItems/Toggle'
import TimeInput from '../../../components/FormItems/TimeInput'
import { Checkbox } from '../../../components/ui/checkbox'
import { Trash2 } from 'lucide-react'

export default function HTiming() {
  const dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const [schedule, setSchedule] = useState(() =>
    dayList.map(day => ({
      day,
      available: true,
      is24Hours: false,
      sessions: [{ startTime: '09:00', endTime: '18:00' }]
    }))
  )

  const updateDay = (dayName, updates) => {
    setSchedule(prev => prev.map(d => d.day === dayName ? { ...d, ...updates } : d))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {schedule.map((dayData) => {
        const { day, available, is24Hours, sessions } = dayData

        const handleUpdate = (updates) => updateDay(day, updates)

        return (
          <div key={day} className="border h-auto min-h-[46px] rounded-lg border-gray-200 p-3 bg-white transition-all duration-200">
            {/* Header Row: Day Name + Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">{day}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Available</span>
                <Toggle
                  checked={available}
                  onChange={(e) => handleUpdate({ available: e.target.checked })}
                />
              </div>
            </div>

            {/* Expanded Content */}
            {available && (
              <div className="mt-3 border-t border-secondary-grey100 pt-4 space-y-3">
                {/* Sessions List (only if not 24 hours) */}
                {!is24Hours && sessions && (
                  <div className="space-y-4">
                    {sessions.map((session, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between min-w-0 mb-3 last:mb-0">
                        <div className='flex items-center gap-2 min-w-0'>
                          <span className="text-sm whitespace-nowrap text-secondary-grey300">Availability Time:</span>
                          <TimeInput
                            value={session.startTime}
                            onChange={(e) => {
                              const newSessions = [...sessions]
                              newSessions[sIdx] = { ...newSessions[sIdx], startTime: e.target.value }
                              handleUpdate({ sessions: newSessions })
                            }}
                            className=""
                          />
                          <span className="text-sm text-gray-400">-</span>
                          <TimeInput
                            value={session.endTime}
                            onChange={(e) => {
                              const newSessions = [...sessions]
                              newSessions[sIdx] = { ...newSessions[sIdx], endTime: e.target.value }
                              handleUpdate({ sessions: newSessions })
                            }}
                            className=""
                          />
                        </div>

                        <div className="flex items-center gap-2 ml-2">
                          {/* Delete Button (only if > 1 session) */}
                          {sessions.length > 1 && sIdx !== sessions.length - 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newSessions = sessions.filter((_, i) => i !== sIdx)
                                handleUpdate({ sessions: newSessions })
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}

                          {/* Add More Button (only on last item) */}
                          {sIdx === sessions.length - 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (sessions.length >= 6) {
                                  alert("Maximum 6 slots allowed")
                                  return
                                }
                                const newSessions = [...sessions, { startTime: '09:00', endTime: '18:00' }]
                                handleUpdate({ sessions: newSessions })
                              }}
                              className="text-sm text-blue-600 hover:bg-blue-50 p-1 rounded-md ml-2 whitespace-nowrap"
                            >
                              + Add More
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 24 Hours Toggle Row */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`24h-${day}`}
                    checked={is24Hours}
                    onCheckedChange={(checked) => handleUpdate({ is24Hours: !!checked })}
                    className="w-4 h-4 rounded-[4px] border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label htmlFor={`24h-${day}`} className="text-xs text-gray-500 cursor-pointer select-none">
                    Available 24 Hours
                  </label>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
