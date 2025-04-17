
export const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const hoursList = [
  '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', 
  '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
  '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM',
  '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
]

export const colorMap: Record<string, {
  background_color: string
  border_color: string
}> = {
  blue: {
    background_color: 'bg-blue-100',
    border_color: 'border-blue-600'
  },
  green: {
    background_color: 'bg-green-100',
    border_color: 'border-green-600'  
  },
  red: {
    background_color: 'bg-red-100',
    border_color: 'border-red-600'
  },
  yellow: {
    background_color: 'bg-yellow-100',
    border_color: 'border-yellow-600'
  },
  gray: {
    background_color: 'bg-gray-100',
    border_color: 'border-gray-600'
  }
}

export function parseDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function parseDateWithDay(date: Date, fullDay = false): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  }
  if (fullDay) {
    options.year = 'numeric'
  }
  return date.toLocaleDateString(undefined, options)
}

export const twelveHoursFormat = [
  '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM',
  '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
  '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM',
  '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
]

export const twentyFourHoursFormat = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
]

// Removed unused 'format' parameter
export function formattedDuration(from: string, to: string): string | null {
  // Basic placeholder implementation - refine later
  if (!from || !to) return null;
  // TODO: Implement proper time formatting based on 'format' ('12h' or '24h')
  return `${from} - ${to}`; 
}
