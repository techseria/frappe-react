import { DroppableCalendarCell } from './DroppableCalendarCell';
import { DraggableEvent } from './DraggableEvent';
import { parseDate } from './calendarUtils';
import type { EventType } from './types';

export interface CalendarMonthlyProps {
  events: EventType[];
  currentMonthDates: Date[];
  onEventDrop: (event: EventType, date: Date) => void;
}

export const CalendarMonthly: React.FC<CalendarMonthlyProps> = ({
  events,
  currentMonthDates,
  onEventDrop,
}: CalendarMonthlyProps) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {currentMonthDates.map((date, i) => (
        <DroppableCalendarCell
          key={i}
          date={date}
          onDrop={(event) => onEventDrop(event, date)}
        >
          <div className="h-24 p-1 border border-gray-200">
            <div className="text-xs text-gray-500">
              {date.getDate()}
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

export default CalendarMonthly;
