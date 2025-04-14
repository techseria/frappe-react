import { DroppableCalendarCell } from './DroppableCalendarCell';
import { DraggableEvent } from './DraggableEvent';
import { parseDate, getWeekDates } from './calendarUtils';
import type { EventType } from './types';

interface CalendarWeeklyProps {
  events: EventType[];
  currentDate: Date;
  onEventDrop: (event: EventType, date: Date) => void;
}

const CalendarWeekly: React.FC<CalendarWeeklyProps> = ({
  events,
  currentDate,
  onEventDrop,
}: CalendarWeeklyProps) => {
  const weekDates = getWeekDates(currentDate);

  return (
    <div className="grid grid-cols-7 gap-1">
      {weekDates.map((date: Date, i: number) => (
        <DroppableCalendarCell
          key={i}
          date={date}
          onDrop={(event) => onEventDrop(event, date)}
        >
          <div className="h-32 p-1 border border-gray-200">
            <div className="text-xs text-gray-500">
              {date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
            </div>
            {events
              .filter(e => parseDate(e.date) === parseDate(date))
              .map(event => (
                <DraggableEvent key={event.id} event={event}>
                  <div className="text-xs p-1 mb-1 rounded bg-blue-100">
                    {event.title}
                  </div>
                </DraggableEvent>
              ))}
          </div>
        </DroppableCalendarCell>
      ))}
    </div>
  );
};

export default CalendarWeekly;
