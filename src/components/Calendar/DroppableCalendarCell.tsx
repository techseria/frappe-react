import { useDrop } from 'react-dnd';
import type { EventType, DropResult } from './types';

interface DroppableCalendarCellProps {
  date: Date;
  time?: string;
  onDrop: (event: EventType, date: Date, time?: string) => void;
  children: React.ReactNode;
}

export function DroppableCalendarCell({
  date,
  time,
  onDrop,
  children,
}: DroppableCalendarCellProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['CALENDAR_EVENT', 'RESIZE_HANDLE'],
    drop: (item: { event: EventType; resizeEdge?: 'start' | 'end'; sourceView?: 'month' | 'week' | 'day' }) => {
      if (item.resizeEdge) {
        // Handle resize operation
        const updatedEvent = {
          ...item.event,
          date: date.toISOString().split('T')[0],
          [item.resizeEdge === 'start' ? 'from_time' : 'to_time']: time
        };
        onDrop(updatedEvent, date, time);
      } else {
        // Handle normal drop
        onDrop(item.event, date, time);
      }
      return { date, time, sourceView: item.sourceView } as DropResult;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
}
