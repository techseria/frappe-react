import { useState, useEffect } from 'react'

interface CalendarEvent {
  id: string
  title: string
  date: string
  from_time?: string
  to_time?: string
  isFullDay?: boolean
  color?: string
  type?: string
}

export function useCalendarData(events: CalendarEvent[]) { // Removed unused 'view' parameter
  const [timedEvents, setTimedEvents] = useState({
    value: {} as Record<string, CalendarEvent[]>
  })
  const [fullDayEvents, setFullDayEvents] = useState({
    value: {} as Record<string, CalendarEvent[]>
  })

  useEffect(() => {
    const groupedTimedEvents: Record<string, CalendarEvent[]> = {}
    const groupedFullDayEvents: Record<string, CalendarEvent[]> = {}
    
    events.forEach(event => {
      const dateKey = event.date.split('T')[0]
      if (event.isFullDay) {
        if (!groupedFullDayEvents[dateKey]) {
          groupedFullDayEvents[dateKey] = []
        }
        groupedFullDayEvents[dateKey].push(event)
      } else {
        if (!groupedTimedEvents[dateKey]) {
          groupedTimedEvents[dateKey] = []
        }
        groupedTimedEvents[dateKey].push(event)
      }
    })

    setTimedEvents({ value: groupedTimedEvents })
    setFullDayEvents({ value: groupedFullDayEvents })
  }, [events])

  return { 
    timedEvents,
    fullDayEvents 
  }
}
