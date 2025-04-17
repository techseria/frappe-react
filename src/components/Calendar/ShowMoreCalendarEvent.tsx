import React from 'react'
import { CalendarEvent } from './CalendarEvent'

interface ShowMoreCalendarEventProps {
  event: {
    id: string
    title: string
    date: string
    from_time?: string
    to_time?: string
    isFullDay?: boolean
    color?: string
    type?: string
  }
  date: Date
  totalEventsCount: number
  onShowMoreEvents?: (date: Date) => void
  className?: string
}

const ShowMoreCalendarEvent: React.FC<ShowMoreCalendarEventProps> = ({
  event,
  date,
  totalEventsCount,
  onShowMoreEvents,
  className = ''
}) => {
  return (
    <div 
      className={`${className} flex items-center gap-1 text-xs text-ink-gray-6`}
      onClick={() => onShowMoreEvents?.(date)}
    >
      <CalendarEvent event={event} date={date} compact />
      <span>+{totalEventsCount - 1} more</span>
    </div>
  )
}

export default ShowMoreCalendarEvent
