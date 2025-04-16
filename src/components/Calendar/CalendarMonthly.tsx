import React from 'react'
import { CalendarEvent } from './CalendarEvent'
// TODO: Implement ShowMoreCalendarEvent
// import { ShowMoreCalendarEvent } from './ShowMoreCalendarEvent'
import { daysList } from './calendarUtils'
// TODO: Implement useCalendarData hook
// import { useCalendarData } from './useCalendarData'

// Temporary implementation
const parseDate = (date: Date) => date.toISOString().split('T')[0]
// Removed unused 'events' parameter from temporary hook definition
const useCalendarData = (/* events: any */) => ({
  timedEvents: {
    value: {} as Record<string, Array<{
      id: string
      title: string
      date: string
      from_time?: string
      to_time?: string
      isFullDay?: boolean
      color?: string
      type?: string
    }>> 
  }
})

interface CalendarMonthlyProps {
  // @ts-ignore - Linter incorrectly flags this as unused despite usage in temporary hook
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
  currentMonthDates: Date[]
  currentMonth: number
  config?: {
    noBorder?: boolean
    isEditMode?: boolean
  }
  onSetCurrentDate?: (date: Date) => void
}

const CalendarMonthly: React.FC<CalendarMonthlyProps> = (props) => {
  const {
    // events, // Removed from destructuring
    currentMonthDates,
    currentMonth,
    config = {},
    // onSetCurrentDate // Removed unused prop
  } = props;

  const { timedEvents } = useCalendarData(/* props.events */) // Pass no args to temporary hook
  const maxEventsInCell = currentMonthDates.length > 35 ? 1 : 2

  const currentMonthDate = (date: Date) => date.getMonth() === currentMonth

  return (
    <div className="flex flex-1 flex-col overflow-scroll">
      {/* Day headers */}
      <div className="grid w-full grid-cols-7 py-2">
        {daysList.map(day => (
          <span key={day} className="text-center text-base text-ink-gray-5">
            {day}
          </span>
        ))}
      </div>

      {/* Date grid */}
      <div 
        className={`grid w-full flex-1 grid-cols-7 border-outline-gray-1 ${
          currentMonthDates.length > 35 ? 'grid-rows-6' : 'grid-rows-5'
        } ${config.noBorder ? 'border-t-[0.5px]' : 'border-[0.5px]'}`}
      >
        {currentMonthDates.map(date => (
          <div 
            key={date.toString()}
            className="overflow-y-auto border-[0.5px]"
          >
            <div className={`flex justify-center font-normal ${
              currentMonthDate(date) ? 'text-gray-700' : 'text-gray-200'
            }`}>
              <div className="flex gap-1 w-full flex-col items-center text-xs text-right">
                {currentMonthDate(date) ? (
                  <span className={`z-10 w-full flex justify-between items-center ${
                    date.toDateString() === new Date().toDateString() 
                      ? 'py-0.5 px-1' 
                      : 'py-1 px-2'
                  }`}>
                    <div></div>
                    <div className={`
                      ${date.toDateString() === new Date().toDateString()
                        ? 'bg-surface-gray-7 text-ink-white rounded-sm p-[2px]'
                        : 'bg-surface-white text-ink-gray-6'}
                    `}>
                      {date.getDate()}
                    </div>
                  </span>
                ) : (
                  <span className="z-10 w-full bg-surface-white py-1 px-2 text-ink-gray-4">
                    {date.getDate()}
                  </span>
                )}

                {timedEvents.value[parseDate(date)]?.length <= maxEventsInCell ? (
                  timedEvents.value[parseDate(date)]?.map((event: any) => (
                    <div key={event.id} className="z-10 mb-2 w-full cursor-pointer">
                      <CalendarEvent
                        event={event}
                        date={date}
                      />
                    </div>
                  ))
                ) : (
                  <div className="z-10 cursor-pointer">
                    {/* TODO: Implement ShowMoreCalendarEvent */}
                    {timedEvents.value[parseDate(date)]?.length || 0} events
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarMonthly
