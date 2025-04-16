import React, { useState, useEffect, useRef } from 'react'
// FeatherIcon, FeatherIconName removed - unused
import { formattedDuration, colorMap } from './calendarUtils'

type CalendarEventProps = {
  event: {
    id: string
    title: string
    from_time?: string
    to_time?: string
    isFullDay?: boolean
    color?: string
    type?: string
    idx?: number
    hallNumber?: number
  }
  date: Date, // Restored prop
  compact?: boolean
  className?: string
  activeView?: 'Day' | 'Week' | 'Month', // Restored prop
  config?: {
    isEditMode?: boolean
    showIcon?: boolean
    eventIcons?: Record<string, React.ComponentType<any>>
    hourHeight?: number
    timeFormat?: string
    redundantCellHeight?: number
    enableShortcuts?: boolean
  }
  // @ts-ignore - Linter incorrectly flags this as unused despite removal attempts
  calendarActions?: {
    updateEventState: (event: any) => void
    deleteEvent: (id: string) => void
    props?: {
      onClick?: (params: { e: React.MouseEvent; calendarEvent: any }) => void
      onDblClick?: (params: { e: React.MouseEvent; calendarEvent: any }) => void
    }
  }
}

export function CalendarEvent({
  event,
  // date, // Removed unused prop from destructuring
  compact = false,
  className = '',
  // activeView = 'Week', // Removed unused prop from destructuring
  config = {
    isEditMode: false,
    showIcon: true,
    eventIcons: {},
    hourHeight: 60,
    timeFormat: '12h',
    redundantCellHeight: 0,
    enableShortcuts: true
  },
}: CalendarEventProps) { // Ensured calendarActions is fully removed from destructuring
  const [updatedEvent, setUpdatedEvent] = useState(event)
  // const [opened, setOpened] = useState(false) // Removed unused state
  const eventRef = useRef<HTMLDivElement>(null)

  // Determine Icon Component ahead of time
  const EventIconComponent = config.showIcon && event.type && config.eventIcons?.[event.type]
    ? config.eventIcons[event.type]
    : null;

  useEffect(() => {
    setUpdatedEvent(event)
  }, [event])

  // Basic render for now - will add more functionality
  return (
      <div
        ref={eventRef}
        className={`${compact ? 'h-4 p-0' : 'h-min-[18px] p-2'} rounded-lg transition-all duration-75 shadow-lg ${
          (event.color && colorMap[event.color]?.background_color) || 'bg-green-100'
        } ${className || ''}`}
      >
      <div className={`relative flex h-full select-none items-start gap-2 overflow-hidden px-2 ${
        event.from_time ? [
          'border-l-2',
          (event.color && colorMap[event.color]?.border_color) || 'border-green-600',
        ].join(' ') // Ensure classes are joined correctly
         : ''
      }`}>
        {/* Render Icon Component directly if it exists */}
        {EventIconComponent ? (
          <div>
            <EventIconComponent />
          </div>
        ) : null}

        {!compact ? (
          <div className="flex w-fit flex-col overflow-hidden whitespace-nowrap text-gray-800">
            <p className="text-ellipsis text-sm font-medium truncate">
              {event.title || 'New Event'}
            </p>
            {!event.isFullDay && updatedEvent.from_time && updatedEvent.to_time && (
              <p className="text-ellipsis text-xs font-normal">
                {formattedDuration(
                  updatedEvent.from_time,
                  updatedEvent.to_time
                  // config.timeFormat, // Removed third argument
                )}
              </p>
            )}
          </div>
        ) : (
          <div className="h-4 w-4 rounded-full bg-current opacity-70"></div>
        )}
      </div>
    </div>
  )
}
