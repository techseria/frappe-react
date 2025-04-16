import React, { useEffect, useRef } from 'react'
import { CalendarEvent } from './CalendarEvent'
import CalendarTimeMarker from './CalendarTimeMarker'
import { parseDate, parseDateWithDay, twelveHoursFormat, twentyFourHoursFormat } from './calendarUtils'
import { useCalendarData } from './useCalendarData'

interface CalendarDailyProps {
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
  currentDate: Date
  config?: {
    noBorder?: boolean
    hourHeight?: number
    redundantCellHeight?: number
    timeFormat?: string
  }
  calendarActions?: {
    handleCellDblClick: (e: React.MouseEvent, date: Date, time: string) => void
  }
}

const CalendarDaily: React.FC<CalendarDailyProps> = ({
  events,
  currentDate,
  config = {
    hourHeight: 72,
    redundantCellHeight: 50,
    timeFormat: '12h'
  },
  calendarActions = {
    handleCellDblClick: () => {}
  }
}) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const { timedEvents, fullDayEvents } = useCalendarData(events) // Removed second argument
  const minuteHeight = (config.hourHeight || 72) / 60
  const timeArray = config.timeFormat === '24h' ? twentyFourHoursFormat : twelveHoursFormat

  useEffect(() => {
    if (gridRef.current) {
      const currentHour = new Date().getHours()
      gridRef.current.scrollBy(0, currentHour * 60 * minuteHeight)
    }
  }, [])

  return (
    <div className="h-[90%] min-h-[500px] min-w-[600px]">
      <p className="pb-2 text-base font-semibold text-ink-gray-8">
        {parseDateWithDay(currentDate, true)}
      </p>
      
      <div className="h-full overflow-hidden">
        <div
          ref={gridRef}
          className={`flex h-full w-full overflow-scroll border-outline-gray-1 ${
            config.noBorder ? 'border-t-[1px]' : 'border-[1px] border-r-0'
          }`}
        >
          {/* Left time column */}
          <div className="grid h-full w-16 grid-cols-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="flex h-[72px] items-end justify-center text-center text-sm font-normal text-ink-gray-5"
                style={{ height: `${config.hourHeight}px` }}
              />
            ))}
          </div>

          {/* Main calendar grid */}
          <div className="grid h-full w-full grid-cols-1 pb-2">
            <div className="calendar-column relative border-r-[1px] border-l-[1px] border-outline-gray-1">
              {/* Full day events */}
              <div
                className="flex h-[50px] w-full flex-wrap gap-2 overflow-y-scroll border-b-[1px] border-outline-gray-1 transition-all"
                style={{ height: `${config.redundantCellHeight}px` }}
              >
                {fullDayEvents.value[parseDate(currentDate)]?.map((event: {
                id: string
                title: string
                date: string
                from_time?: string
                to_time?: string
                isFullDay?: boolean
                color?: string
                type?: string
              }, idx: number) => (
                  <CalendarEvent
                    key={event.id}
                    event={{ ...event, idx }}
                    date={currentDate}
                    className="mb-1 w-[20%] cursor-pointer"
                  />
                ))}
              </div>

              {/* Time grid */}
              {timeArray.map(time => (
                <div
                  key={time}
                  className="relative flex text-ink-gray-8"
                  data-time-attr={time}
                  onDoubleClick={(e) => calendarActions.handleCellDblClick(e, currentDate, time)}
                >
                  <div
                    className="w-full border-b-[1px] border-outline-gray-1"
                    style={{ height: `${config.hourHeight}px` }}
                  />
                </div>
              ))}

              {/* Timed events */}
              {timedEvents.value[parseDate(currentDate)]?.map((event: {
                id: string
                title: string
                date: string
                from_time?: string
                to_time?: string
                isFullDay?: boolean
                color?: string
                type?: string
              }) => (
                <CalendarEvent
                  key={event.id}
                  event={event}
                  date={currentDate}
                  className="absolute mb-2 cursor-pointer"
                />
              ))}

              <CalendarTimeMarker 
                date={currentDate}
                redundantCellHeight={config.redundantCellHeight}
                hourHeight={config.hourHeight}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarDaily
