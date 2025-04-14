import { DroppableCalendarCell } from './DroppableCalendarCell';
import { DraggableEvent } from './DraggableEvent';
import { parseDate, twentyFourHoursFormat } from './calendarUtils';
import type { EventType } from './types';

interface CalendarDailyProps {
  events: EventType[];
  currentDate: Date;
  onEventDrop: (event: EventType, date: Date, time?: string) => void;
}

const CalendarDaily: React.FC<CalendarDailyProps> = ({
  events,
  currentDate,
  onEventDrop,
}: CalendarDailyProps) => {
  return (
    <div className="grid grid-cols-1 gap-1">
      {twentyFourHoursFormat.map((time, i) => (
        <DroppableCalendarCell
          key={i}
          date={currentDate}
          time={time}
          onDrop={(event, date, time) => onEventDrop(event, date, time)}
        >
          <div className="h-16 p-1 border border-gray-200">
            <div className="text-xs text-gray-500">
              {time}
            </div>
            {events
              .filter((e: EventType) => parseDate(e.date) === parseDate(currentDate))
              .filter((e: EventType) => e.from_time === time)
              .map((event: EventType) => (
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

export default CalendarDaily;
