declare module './CalendarMonthly' {
  import { FC } from 'react';
  import { EventType } from './types';

  interface CalendarMonthlyProps {
    events: EventType[];
    currentMonth: number;
    currentMonthDates: Date[];
    onEventDrop: (event: EventType, date: Date) => void;
  }

  const CalendarMonthly: FC<CalendarMonthlyProps>;
  export default CalendarMonthly;
}
