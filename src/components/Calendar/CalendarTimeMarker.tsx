import React from 'react'

interface CalendarTimeMarkerProps {
  date: Date
  redundantCellHeight?: number
  hourHeight?: number
}

const CalendarTimeMarker: React.FC<CalendarTimeMarkerProps> = ({
  date,
  redundantCellHeight = 0,
  hourHeight = 72
}) => {
  const minuteHeight = hourHeight / 60
  const currentDate = new Date()

  if (date.toDateString() !== currentDate.toDateString()) {
    return null
  }

  const hour = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const top = (hour * 60 + minutes) * minuteHeight + redundantCellHeight

  return (
    <div 
      className="absolute top-20 z-10 w-full pl-2"
      style={{ top: `${top}px` }}
    >
      <div className="current-time relative h-0.5 bg-red-600 before:absolute before:left-[-8px] before:top-[-5px] before:block before:h-3 before:w-3 before:rounded-full before:bg-red-600" />
    </div>
  )
}

export default CalendarTimeMarker
