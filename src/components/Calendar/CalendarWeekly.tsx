import React from 'react'
import { CalendarEvent } from './CalendarEvent'
import { daysList, hoursList } from './calendarUtils'
import { useCalendarData } from './useCalendarData.ts' // Added .ts extension

interface CalendarWeeklyProps {
  events: Array<{
    id: string
    title: string
    date: string
    from_time?: string
    to_time?: string
    isFullDay?: boolean
    color?: string
    type?: string
  }>
  currentWeekDates: Date[]
  config?: {
    noBorder?: boolean
    isEditMode?: boolean
  }
  onSetCurrentDate?: (date: Date) => void
}

const CalendarWeekly: React.FC<CalendarWeeklyProps> = ({
  events,
  currentWeekDates,
  // config = {}, // Removed unused prop
  // onSetCurrentDate // Removed unused prop
}) => {
  const { timedEvents } = useCalendarData(events) // Removed second argument
  // const maxEventsInCell = 3 // Removed unused variable

  return (
    <div className="flex flex-1 flex-col overflow-scroll">
      {/* Day headers */}
      <div className="grid w-full grid-cols-8 border-b-[0.5px]">
        <div className="border-r-[0.5px]"></div>
        {daysList.map((day, i) => (
          <div 
            key={day} 
            className="border-r-[0.5px] py-2 text-center text-base text-ink-gray-5"
          >
            {day}
            <div className="text-xs">
              {currentWeekDates[i]?.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="flex flex-1 overflow-y-auto">
        {/* Time column */}
        <div className="w-16 flex-none">
          {hoursList.map(hour => (
            <div 
              key={hour} 
              className="h-16 border-b-[0.5px] border-r-[0.5px] text-right pr-2 text-xs text-ink-gray-5"
            >
              {hour}
            </div>
          ))}
        </div>

        {/* Day columns */}
        <div className="grid flex-1 grid-cols-7">
          {currentWeekDates.map(date => (
            <div key={date.toString()} className="relative border-r-[0.5px]">
              {hoursList.map(hour => (
                <div 
                  key={hour}
                  className="h-16 border-b-[0.5px]"
                ></div>
              ))}

              {/* Events */}
              {timedEvents.value[date.toISOString().split('T')[0]]?.map((event: {
                id: string
                title: string
                date: string
                from_time?: string
                to_time?: string
                isFullDay?: boolean
                color?: string
                type?: string
              }) => (
                <div key={event.id} className="absolute left-0 right-0 mx-1">
                  <CalendarEvent
                    event={event}
                    date={date}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CalendarWeekly
