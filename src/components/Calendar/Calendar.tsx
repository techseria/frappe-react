import { useState, useEffect } from 'react';
import CalendarWeekly from './CalendarWeekly';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getCalendarDates, monthList, parseDate, handleSeconds, calculateNewTimeRange } from './calendarUtils';
import CalendarMonthly from './CalendarMonthly';
import CalendarDaily from './CalendarDaily';
import type { EventType } from './types';

interface CalendarProps {
  events?: EventType[];
  onUpdate?: (event: EventType) => void;
  view?: 'month' | 'week' | 'day';
}

export default function Calendar({ 
  events: propEvents = [], 
  onUpdate,
  view: propView = 'month'
}: CalendarProps) {
  const [events, setEvents] = useState<EventType[]>([]);
  const [currentMonth] = useState(new Date().getMonth()); // Removed setCurrentMonth
  const [currentYear] = useState(new Date().getFullYear()); // Removed setCurrentYear
  const [view, setView] = useState<'month' | 'week' | 'day'>(propView);

  useEffect(() => {
    setEvents(propEvents.map(event => ({
      ...event,
      from_time: event.from_time ? handleSeconds(event.from_time) : undefined,
      to_time: event.to_time ? handleSeconds(event.to_time) : undefined
    })));
  }, [propEvents]);

  function handleEventDrop(event: EventType, date: Date, time?: string, sourceView?: 'month' | 'week' | 'day') {
    let updatedEvent: EventType;
    
    if (event.isResizing && event.resizeEdge) {
      // Handle resize operation
      updatedEvent = calculateNewTimeRange(
        event,
        time || '00:00',
        event.resizeEdge
      );
    } else {
      // Handle normal drop
      updatedEvent = {
        ...event,
        date: parseDate(date),
        ...(time && { from_time: time })
      };
    }

    // Handle view switching logic
    if (sourceView && sourceView !== view) {
      // When moving from month to day view, set default time
      if (sourceView === 'month' && view === 'day' && !time) {
        updatedEvent = {
          ...updatedEvent,
          from_time: '09:00',
          to_time: '10:00'
        };
      }
      // When moving from day to month view, clear times
      else if (sourceView === 'day' && view === 'month') {
        updatedEvent = {
          ...updatedEvent,
          from_time: undefined,
          to_time: undefined
        };
      }
    }

    setEvents(events.map(e => e.id === event.id ? updatedEvent : e));
    onUpdate?.(updatedEvent);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="calendar-container">
        <div className="calendar-header flex justify-between items-center">
          <h2>{monthList[currentMonth]} {currentYear}</h2>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 rounded ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setView('month')}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1 rounded ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 rounded ${view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setView('day')}
            >
              Day
            </button>
          </div>
        </div>
        {view === 'month' ? (
          <CalendarMonthly
            events={events}
            currentMonth={currentMonth}
            currentMonthDates={getCalendarDates(currentMonth, currentYear)}
            onEventDrop={handleEventDrop}
          />
        ) : view === 'week' ? (
          <CalendarWeekly
            events={events}
            currentDate={new Date(currentYear, currentMonth, 1)}
            onEventDrop={handleEventDrop}
          />
        ) : (
          <CalendarDaily
            events={events}
            currentDate={new Date(currentYear, currentMonth, 1)}
            onEventDrop={handleEventDrop}
          />
        )}
      </div>
    </DndProvider>
  );
}
