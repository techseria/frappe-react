import Calendar from './Calendar';
import type { EventType } from './types';

const testEvents: EventType[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2025-04-15',
    from_time: '10:00',
    to_time: '11:00'
  },
  {
    id: '2', 
    title: 'Lunch',
    date: '2025-04-15',
    from_time: '12:00',
    to_time: '13:00'
  }
];

export default function CalendarTest() {
  return (
    <div className="p-4">
      <Calendar 
        events={testEvents}
        onUpdate={(updatedEvent) => console.log('Event updated:', updatedEvent)}
      />
    </div>
  );
}
