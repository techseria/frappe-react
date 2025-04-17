import React, { useState, useMemo, useCallback } from 'react' // Removed useEffect
import Button from '../Button'
import { TabButtons } from '../TabButtons'
import { FeatherIcon } from '../FeatherIcon'
import CalendarMonthly from './CalendarMonthly'
import CalendarWeekly from './CalendarWeekly'
import CalendarDaily from './CalendarDaily'
// import { monthList } from './calendarUtils' // Removed unused import

// TODO: Implement these missing components
// import NewEventModal from './NewEventModal'

interface EventType {
  id: string
  title: string
  date: string
  fromDate?: string
  toDate?: string
  from_time?: string
  to_time?: string
  isFullDay?: boolean
  color?: string
  type?: string
}

interface CalendarProps {
  events?: EventType[]
  config?: {
    scrollToHour?: number
    disableModes?: string[]
    defaultMode?: 'Day' | 'Week' | 'Month'
    isEditMode?: boolean
    eventIcons?: Record<string, React.ComponentType>
    redundantCellHeight?: number
    hourHeight?: number
    enableShortcuts?: boolean
    showIcon?: boolean
    timeFormat?: '12h' | '24h'
  }
  onClick?: (params: { e: React.MouseEvent; calendarEvent: any }) => void
  onDblClick?: (params: { e: React.MouseEvent; calendarEvent: any }) => void
  onCellDblClick?: (params: { e: React.MouseEvent; date: Date; time?: string }) => void
  onCreate?: (event: any) => void
  onUpdate?: (event: any) => void
  onDelete?: (eventId: string) => void
}

const Calendar: React.FC<CalendarProps> = ({
  events = [],
  config = {},
  // onClick, // Removed unused prop
  // onDblClick, // Removed unused prop
  // onCellDblClick, // Removed unused prop
  // onCreate, // Removed unused prop
  // onUpdate, // Removed unused prop
  // onDelete, // Removed unused prop
}) => {
  const defaultConfig = {
    scrollToHour: 15, // Note: This seems unused currently
    disableModes: [],
    defaultMode: 'Month',
    isEditMode: false,
    eventIcons: {},
    redundantCellHeight: 50,
    hourHeight: 50,
    enableShortcuts: true,
    showIcon: true,
    timeFormat: '12h',
  }

  const overrideConfig = { ...defaultConfig, ...config }
  // Ensure initial value conforms to the type
  const [activeView, setActiveView] = useState<'Day' | 'Week' | 'Month'>(
    ['Day', 'Week', 'Month'].includes(overrideConfig.defaultMode)
      ? overrideConfig.defaultMode as 'Day' | 'Week' | 'Month'
      : 'Month' // Default fallback
  );
  const [viewDate, setViewDate] = useState(new Date()); // State for the current date being viewed

  // Removed unused state for modal
  // const [showEventModal, setShowEventModal] = useState(false)
  // const [newEvent, setNewEvent] = useState<any>(null)


  // Date calculation logic
  const getWeekDates = (date: Date): Date[] => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Start from Sunday
    return Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const getMonthDates = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay(); // 0=Sun, 1=Mon,...
    const lastDayWeekday = lastDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const dates: Date[] = [];

    // Days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      dates.push(new Date(year, month - 1, prevMonthLastDay - i));
    }

    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }

    // Days from next month
    for (let i = 1; i < 7 - lastDayWeekday; i++) {
      dates.push(new Date(year, month + 1, i));
    }
    return dates;
  };


  // Navigation functions
  const increment = useCallback(() => {
    setViewDate(current => {
      const newDate = new Date(current);
      if (activeView === 'Month') {
        newDate.setMonth(current.getMonth() + 1);
      } else if (activeView === 'Week') {
        newDate.setDate(current.getDate() + 7);
      } else { // Day
        newDate.setDate(current.getDate() + 1);
      }
      return newDate;
    });
  }, [activeView]);

  const decrement = useCallback(() => {
    setViewDate(current => {
      const newDate = new Date(current);
      if (activeView === 'Month') {
        newDate.setMonth(current.getMonth() - 1);
      } else if (activeView === 'Week') {
        newDate.setDate(current.getDate() - 7);
      } else { // Day
        newDate.setDate(current.getDate() - 1);
      }
      return newDate;
    });
  }, [activeView]);


  // Calculate props for child views
  const currentMonthDates = useMemo(() => getMonthDates(viewDate), [viewDate]);
  const currentWeekDates = useMemo(() => getWeekDates(viewDate), [viewDate]);
  const currentDate = viewDate; // For daily view
  const currentMonth = viewDate.getMonth(); // For monthly view styling

  // View options for tab buttons
  const actionOptions = [
    { label: 'Day', value: 'Day', variant: 'solid' },
    { label: 'Week', value: 'Week', variant: 'solid' },
    { label: 'Month', value: 'Month', variant: 'solid' },
  ]

  const enabledModes = useMemo(() => 
    actionOptions.filter(mode => !overrideConfig.disableModes.includes(mode.label)),
    [overrideConfig.disableModes]
  )

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header with navigation controls */}
      <div className="mb-2 flex justify-between">
        <span className="text-lg font-medium text-ink-gray-8">
          {/* Current month/year display */}
        </span>
        <div className="flex gap-x-1">
          <Button 
            onClick={() => decrement()}
            variant="ghost"
            className="h-4 w-4"
          >
            <FeatherIcon name="chevron-left" className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => increment()}
            variant="ghost"
            className="h-4 w-4"
          >
            <FeatherIcon name="chevron-right" className="h-4 w-4" />
          </Button>
          <TabButtons
            buttons={enabledModes}
            className="ml-2"
            value={activeView}
            onChange={(value) => setActiveView(value as 'Day' | 'Week' | 'Month')}
          />
        </div>
      </div>

      {/* Calendar Views - Pass calculated date props */}
      {activeView === 'Month' && (
        <CalendarMonthly
          events={events}
          config={overrideConfig}
          currentMonthDates={currentMonthDates}
          currentMonth={currentMonth}
        />
      )}
      {activeView === 'Week' && (
        <CalendarWeekly
          events={events}
          config={overrideConfig}
          currentWeekDates={currentWeekDates}
        />
      )}
      {activeView === 'Day' && (
        <CalendarDaily
          events={events}
          config={overrideConfig}
          currentDate={currentDate}
        />
      )}

      {/* TODO: Implement Event Modal - Requires state removed above */}
      {/* <NewEventModal
        open={showEventModal}
        onClose={() => setShowEventModal(false)}
        event={newEvent}
      /> */}
    </div>
  )
}

export default Calendar
