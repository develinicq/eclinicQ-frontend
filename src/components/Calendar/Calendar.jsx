import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";

/**
 * Full-featured Calendar Component
 * Supports Day, Week, and Month views with event display
 *
 * @param {Object} props
 * @param {Array} props.events - Array of event objects {id, title, start, end, color, info}
 * @param {Function} props.onEventClick - Callback when event is clicked
 * @param {Function} props.onAddNew - Callback for add new button
 * @param {Function} props.onDateSelect - Callback when date is selected
 * @param {string} props.className - Additional CSS classes
 */
const Calendar = ({
  events = [],
  onEventClick,
  onAddNew,
  onDateSelect,
  className = "",
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); // 'day', 'week', 'month'
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get calendar data
  const { year, month, monthName } = useMemo(() => {
    return {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      monthName: currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    };
  }, [currentDate]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  }, [year, month]);

  // Mini calendar days
  const miniCalendarDays = useMemo(() => {
    return calendarDays.filter((d) => d.isCurrentMonth);
  }, [calendarDays]);

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Get week days
  const getWeekDays = () => {
    const curr = new Date(currentDate);
    const first = curr.getDate() - curr.getDay();
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(new Date(curr.setDate(first + i)));
    }
    return days;
  };

  // Navigation
  const navigate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === "month") {
      newDate.setMonth(currentDate.getMonth() + direction);
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() + direction * 7);
    } else {
      newDate.setDate(currentDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className={`flex flex-col h-full bg-gray-50 ${className}`}>
      <style>{`
        .flex-1.overflow-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Header - Spans full width */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Left: Dynamic Month/Year with Navigation */}
          <div className="flex items-center gap-3">
            {view === "day" && (
              <>
                <h2 className="text-lg font-semibold">{monthName}</h2>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => navigate(-1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                    ,{" "}
                    {selectedDate.toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={() => setSelectedDate(new Date())}
                    className="px-2 py-0.5 text-xs border border-blue-500 text-blue-600 rounded hover:bg-blue-50"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigate(1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
            {view === "week" && (
              <>
                <h2 className="text-lg font-semibold">
                  {(() => {
                    const weekDays = getWeekDays();
                    const firstDay = weekDays[0];
                    const lastDay = weekDays[6];
                    if (firstDay.getMonth() === lastDay.getMonth()) {
                      return monthName;
                    }
                    return `${firstDay.toLocaleDateString("en-US", {
                      month: "short",
                    })} - ${lastDay.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}`;
                  })()}
                </h2>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => navigate(-1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {(() => {
                      const weekDays = getWeekDays();
                      const firstDay = weekDays[0];
                      const lastDay = weekDays[6];
                      return `${firstDay.getDate()} ${firstDay.toLocaleDateString(
                        "en-US",
                        { month: "short" }
                      )} - ${lastDay.getDate()} ${lastDay.toLocaleDateString(
                        "en-US",
                        { month: "short" }
                      )}`;
                    })()}
                  </span>
                  <button
                    onClick={() => navigate(1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
            {view === "month" && (
              <>
                <h2 className="text-lg font-semibold">{monthName}</h2>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => navigate(-1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate(1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right: Search and View Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Patient..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              {["Day", "Week", "Month"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v.toLowerCase())}
                  className={`
                    px-3 py-2 text-sm rounded-md transition-colors
                    ${
                      view === v.toLowerCase()
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }
                  `}
                >
                  {v}
                </button>
              ))}
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Sidebar and Calendar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 flex flex-col">
          {/* Walk-In Appointment Button */}
          <div className="p-4 pb-2">
            <button
              onClick={onAddNew}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Walk-In Appointment
            </button>
          </div>

          {/* Divider */}
          <div className="border-b border-gray-200 mx-4"></div>

          {/* Mini Calendar */}
          <div className="p-4 pt-2">
            <div className="border border-gray-200 rounded-lg p-3 bg-white overflow-hidden">
              <ShadcnCalendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setCurrentDate(date);
                    onDateSelect?.(date);
                  }
                }}
                className="rounded-md border-0 p-0"
                captionLayout="dropdown"
              />
            </div>
          </div>
        </div>

        {/* Main Calendar Area */}
        <div className="flex-1 flex flex-col overflow-hidden border border-gray-200 rounded-lg ml-2 mt-4 mr-6 mb-6 bg-white">
          {/* Calendar Grid */}
          <div
            className="flex-1 overflow-auto"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            {view === "month" && (
              <div className="grid grid-cols-7 h-full">
                {/* Day headers */}
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                  (day) => (
                    <div
                      key={day}
                      className="border-b border-r border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50"
                    >
                      {day}
                    </div>
                  )
                )}

                {/* Calendar days */}
                {calendarDays.map((day, idx) => {
                  const dayEvents = getEventsForDate(day.date);
                  return (
                    <div
                      key={idx}
                      className={`
                      border-b border-r border-gray-200 p-2 min-h-[120px]
                      ${!day.isCurrentMonth ? "bg-gray-50" : "bg-white"}
                      ${isToday(day.date) ? "bg-blue-50/50" : ""}
                      ${
                        isSelected(day.date)
                          ? "ring-2 ring-blue-500 ring-inset"
                          : ""
                      }
                    `}
                    >
                      <div
                        className={`text-sm mb-1 ${
                          !day.isCurrentMonth
                            ? "text-gray-400"
                            : isToday(day.date)
                            ? "text-blue-600 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {day.day}
                      </div>

                      {/* Events */}
                      <div className="space-y-1">
                        {dayEvents.map((event) => (
                          <button
                            key={event.id}
                            onClick={() => onEventClick?.(event)}
                            className={`
                            w-full text-left px-2 py-1 rounded text-xs font-medium
                            ${
                              event.color === "orange"
                                ? "bg-orange-400 text-white"
                                : ""
                            }
                            ${
                              event.color === "green"
                                ? "bg-green-500 text-white"
                                : ""
                            }
                            ${
                              event.color === "blue"
                                ? "bg-blue-500 text-white"
                                : ""
                            }
                            hover:opacity-90
                          `}
                          >
                            <div>
                              {new Date(event.start).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </div>
                            {event.info && (
                              <div className="text-[10px] opacity-90">
                                ({event.info})
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {view === "week" && (
              <div className="flex flex-col h-full">
                {/* Week header */}
                <div className="flex border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
                  {/* GMT column - fixed width to match time column */}
                  <div className="w-20 flex-shrink-0 border-r border-gray-200 p-3 text-xs text-gray-500 flex items-center justify-center">
                    GMT +5
                  </div>

                  {/* Day columns - flex-1 for equal spacing */}
                  {getWeekDays().map((day, idx) => (
                    <div
                      key={idx}
                      className="flex-1 border-r border-gray-200 p-3 text-left last:border-r-0"
                    >
                      <div className="text-3xl font-semibold text-blue-600">
                        {day.getDate().toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-gray-700 mt-1">
                        {day.toLocaleDateString("en-US", { month: "short" })},{" "}
                        {day.toLocaleDateString("en-US", { weekday: "long" })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time grid */}
                <div className="flex-1 overflow-auto">
                  <div className="flex">
                    {/* Time column - fixed width to match header GMT column */}
                    <div className="w-20 flex-shrink-0 border-r border-gray-200">
                      {Array.from({ length: 15 }, (_, i) => i + 7).map(
                        (hour) => (
                          <div
                            key={hour}
                            className="h-16 border-b border-gray-200 px-2 py-1 text-xs text-gray-500"
                          >
                            {`${hour.toString().padStart(2, "0")}:00`}
                          </div>
                        )
                      )}
                    </div>

                    {/* Day columns - flex-1 to match header day columns */}
                    {getWeekDays().map((day, dayIdx) => {
                      const dayEvents = getEventsForDate(day);
                      return (
                        <div
                          key={dayIdx}
                          className="flex-1 border-r border-gray-200 relative last:border-r-0"
                        >
                          {Array.from({ length: 15 }, (_, i) => i + 7).map(
                            (hour) => (
                              <div
                                key={hour}
                                className="h-16 border-b border-gray-200"
                              />
                            )
                          )}

                          {/* Events for this day */}
                          {dayEvents.map((event) => {
                            const eventStart = new Date(event.start);
                            const eventEnd = new Date(event.end);
                            const startHour = eventStart.getHours();
                            const startMinute = eventStart.getMinutes();
                            const duration =
                              (eventEnd - eventStart) / (1000 * 60); // minutes

                            // Calculate position
                            const top =
                              (startHour - 7) * 64 + (startMinute / 60) * 64;
                            const height = (duration / 60) * 64;

                            return (
                              <button
                                key={event.id}
                                onClick={() => onEventClick?.(event)}
                                className={`absolute left-1 right-1 rounded px-2 py-1 text-xs font-medium text-white
                                  ${
                                    event.color === "orange"
                                      ? "bg-orange-500"
                                      : ""
                                  }
                                  ${
                                    event.color === "green"
                                      ? "bg-green-500"
                                      : ""
                                  }
                                  ${event.color === "blue" ? "bg-blue-500" : ""}
                                  hover:opacity-90
                                `}
                                style={{
                                  top: `${top}px`,
                                  height: `${height}px`,
                                }}
                              >
                                <div className="truncate">{event.title}</div>
                                <div className="text-[10px] opacity-90">
                                  ({event.info})
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {view === "day" && (
              <div className="flex flex-col h-full">
                {/* Day header - matching time grid layout */}
                <div className="border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
                  <div className="relative">
                    {/* Time zone label - aligned with time column */}
                    <div className="absolute left-0 w-20 h-full flex items-center justify-center border-r border-gray-200">
                      <div className="text-xs text-gray-500">GMT +5</div>
                    </div>

                    {/* Date info - aligned with main calendar area */}
                    <div className="ml-20 p-3">
                      <div className="text-3xl font-semibold text-blue-600">
                        {selectedDate.getDate().toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        {selectedDate.toLocaleDateString("en-US", {
                          month: "short",
                        })}
                        ,{" "}
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time grid */}
                <div className="flex-1 overflow-auto">
                  <div className="relative">
                    {/* Time labels */}
                    <div className="absolute left-0 w-20">
                      {Array.from({ length: 15 }, (_, i) => i + 7).map(
                        (hour) => (
                          <div
                            key={hour}
                            className="h-16 px-2 py-1 text-xs text-gray-500 border-b border-gray-200"
                          >
                            {`${hour.toString().padStart(2, "0")}:00`}
                          </div>
                        )
                      )}
                    </div>

                    {/* Event area */}
                    <div className="ml-20 border-l border-gray-200 relative">
                      {/* Hour lines */}
                      {Array.from({ length: 15 }, (_, i) => i + 7).map(
                        (hour) => (
                          <div
                            key={hour}
                            className="h-16 border-b border-gray-200"
                          />
                        )
                      )}

                      {/* Events */}
                      {getEventsForDate(selectedDate).map((event) => {
                        const eventStart = new Date(event.start);
                        const eventEnd = new Date(event.end);
                        const startHour = eventStart.getHours();
                        const startMinute = eventStart.getMinutes();
                        const duration = (eventEnd - eventStart) / (1000 * 60); // minutes

                        // Calculate position
                        const top =
                          (startHour - 7) * 64 + (startMinute / 60) * 64;
                        const height = (duration / 60) * 64;

                        return (
                          <button
                            key={event.id}
                            onClick={() => onEventClick?.(event)}
                            className={`absolute left-2 right-2 rounded px-3 py-2 text-sm font-medium text-white
                            ${event.color === "orange" ? "bg-orange-500" : ""}
                            ${event.color === "green" ? "bg-green-500" : ""}
                            ${event.color === "blue" ? "bg-blue-500" : ""}
                            hover:opacity-90
                          `}
                            style={{ top: `${top}px`, height: `${height}px` }}
                          >
                            <div>{event.title}</div>
                            <div className="text-xs opacity-90">
                              {eventStart.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: false,
                              })}{" "}
                              ({event.info})
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
