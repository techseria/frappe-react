import type { EventType } from './types';

export function getCalendarDates(month: number, year: number): Date[] {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const firstDay = new Date(year, month, 1);
  const leftPadding = firstDay.getDay();

  const datesInPreviousMonth = getBeforeDates(firstDay, leftPadding);
  const datesInCurrentMonth = getCurrentMonthDates(firstDay);
  const datesTillNow = [...datesInPreviousMonth, ...datesInCurrentMonth];
  const datesInNextMonth = getNextMonthDates(datesTillNow);

  return [...datesTillNow, ...datesInNextMonth];

  function getCurrentMonthDates(date: Date): Date[] {
    const month = date.getMonth();
    if (month === 1 && isLeapYear(date)) {
      daysInMonth[month] = 29;
    }

    const numberOfDays = daysInMonth[month] + 1;
    return getDatesAfter(date, 1, numberOfDays);
  }

  function getBeforeDates(firstDay: Date, leftPadding: number): Date[] {
    const allDates = getDatesAfter(firstDay, 0, leftPadding, -1);
    return allDates.reverse();
  }

  function getNextMonthDates(currentAndPreviousMonthDates: Date[]): Date[] {
    const numberofDaysInCalendar = 
      currentAndPreviousMonthDates.length > 35 ? 42 : 35;
    const lengthOfDates = currentAndPreviousMonthDates.length;
    const lastDate = currentAndPreviousMonthDates[lengthOfDates - 1];
    const diff = numberofDaysInCalendar - lengthOfDates + 1;

    return getDatesAfter(lastDate, 1, diff, 1, true);
  }

  function getDatesAfter(
    date: Date,
    startIndex: number,
    counter: number,
    stepper = 1,
    getNextMonthDates = false,
  ): Date[] {
    const allDates: Date[] = [];
    for (let index = startIndex; index < counter; index++) {
      const tempDate = new Date(
        date.getFullYear(),
        getNextMonthDates ? date.getMonth() + 1 : date.getMonth(),
        index * stepper,
      );
      allDates.push(tempDate);
    }
    return allDates;
  }

  function isLeapYear(date: Date): boolean {
    const year = date.getFullYear();
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }
}

export function parseDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  return `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`;
}

export function handleSeconds(time: string): string {
  return time.split(':').slice(0, 2).join(':') + ':00';
}

export function formatTime(time: string, format: '12h' | '24h' = '24h'): string {
  if (format === '12h') {
    let [hours, minutes] = time.split(':');
    let hoursNum = parseInt(hours);
    const ampm = hoursNum >= 12 ? 'pm' : 'am';
    hoursNum = hoursNum % 12;
    hoursNum = hoursNum ? hoursNum : 12; // the hour '0' should be '12'

    if (minutes === '00') {
      return `${hoursNum} ${ampm}`;
    }
    return `${hoursNum}:${minutes} ${ampm}`;
  }
  return time;
}

export const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
export const daysListFull = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const twelveHoursFormat = [
  '12 am',
  '1 am',
  '2 am',
  '3 am',
  '4 am',
  '5 am',
  '6 am',
  '7 am',
  '8 am',
  '9 am',
  '10 am',
  '11 am',
  '12 pm',
  '1 pm',
  '2 pm',
  '3 pm',
  '4 pm',
  '5 pm',
  '6 pm',
  '7 pm',
  '8 pm',
  '9 pm',
  '10 pm',
  '11 pm',
] as const;

export function getWeekDates(date: Date): Date[] {
  const dayOfWeek = date.getDay();
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - dayOfWeek);
  
  const weekDates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    weekDates.push(currentDate);
  }
  return weekDates;
}

export function calculateNewTimeRange(
  event: EventType,
  newTime: string,
  edge: 'start' | 'end'
): EventType {
  if (edge === 'start') {
    return {
      ...event,
      from_time: newTime,
      // Ensure end time is after start time
      to_time: event.to_time && newTime > event.to_time 
        ? newTime 
        : event.to_time
    };
  } else {
    return {
      ...event,
      to_time: newTime,
      // Ensure start time is before end time
      from_time: event.from_time && newTime < event.from_time
        ? newTime
        : event.from_time
    };
  }
}

export function validateTimeRange(from?: string, to?: string): boolean {
  if (!from || !to) return true;
  return from <= to;
}

export const twentyFourHoursFormat = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
] as const;
