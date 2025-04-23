import { useState, useMemo } from 'react'
import { Popover } from './Popover'
import { Button } from './Button/Button'
import FeatherIconfrom './FeatherIcon'
import { TextInput } from './TextInput'
import dayjs from 'dayjs'

type DatePickerProps = {
  value?: string | null
  onChange?: (value: string) => void
  placeholder?: string
  formatter?: (value: string) => string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  readonly?: boolean
  inputClass?: string
  disabledDates?: string[] // Array of dates in YYYY-MM-DD format
  minDate?: string // Minimum selectable date (YYYY-MM-DD)
  maxDate?: string // Maximum selectable date (YYYY-MM-DD)
}

export function DatePicker(props: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1)
  const [currentYear, setCurrentYear] = useState(dayjs().year())
  const [dateValue, setDateValue] = useState(props.value || '')

  const formattedMonth = dayjs()
    .year(currentYear)
    .month(currentMonth - 1)
    .format('MMMM YYYY')

  const datesAsWeeks = useMemo(() => {
    const firstDayOfMonth = dayjs()
      .year(currentYear)
      .month(currentMonth - 1)
      .startOf('month')
    const lastDayOfMonth = firstDayOfMonth.endOf('month')

    // Get days from previous month to fill first week
    const daysFromPrevMonth = firstDayOfMonth.day()
    const startDate = firstDayOfMonth.subtract(daysFromPrevMonth, 'day')

    // Get days from next month to fill last week
    const totalDays = lastDayOfMonth.diff(startDate, 'day') + 1
    const weeks = Math.ceil(totalDays / 7)
    const endDate = startDate.add(weeks * 7 - 1, 'day')

    const dates = []
    let currentDate = startDate
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      dates.push(currentDate.toDate())
      currentDate = currentDate.add(1, 'day')
    }

    // Split into weeks
    const weeksArray = []
    for (let i = 0; i < dates.length; i += 7) {
      weeksArray.push(dates.slice(i, i + 7))
    }

    return weeksArray
  }, [currentYear, currentMonth])

  function getDateValue(date: Date | string) {
    if (!date) return ''
    return dayjs(date).format('YYYY-MM-DD')
  }
  return (
    <Popover
      placement={props.placement}
      trigger="click"
      renderTarget={({ ref, props: popoverProps }) => (
        <TextInput
          {...popoverProps}
          ref={ref}
          readOnly={props.readonly}
          type="text"
          iconLeft="calendar"
          placeholder={props.placeholder}
          value={dateValue && props.formatter ? props.formatter(dateValue) : dateValue}
              className={`w-full ${props.inputClass || ''}`}
              size={undefined}
        />
      )}
    >
      {() => (
        <div className="w-fit select-none text-base text-ink-gray-9 divide-y divide-outline-gray-modals rounded-lg bg-surface-modal shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* Month Switcher */}
          <div className="flex items-center p-1 text-ink-gray-4">
            <Button variant="ghost" className="h-7 w-7" onClick={prevMonth}>
              <FeatherIcon
                strokeWidth={2}
                name="chevron-left"
                className="h-4 w-4"
              />
            </Button>
            <div className="flex-1 text-center text-base font-medium text-ink-gray-6">
              {formattedMonth}
            </div>
            <Button variant="ghost" className="h-7 w-7" onClick={nextMonth}>
              <FeatherIcon
                strokeWidth={2}
                name="chevron-right"
                className="h-4 w-4"
              />
            </Button>
          </div>

          {/* Date Input */}
          <div className="flex items-center justify-center gap-1 p-1">
            <TextInput
              className="text-sm"
              type="text"
              value={dateValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => selectDate(e.target.value)}
            />
            <Button
              label="Today"
              className="text-sm"
              onClick={() => {
                selectDate(getDateValue(dayjs().toDate()))
                togglePopover()
              }}
            />
          </div>

          {/* Calendar */}
          <div className="flex flex-col items-center justify-center p-1 text-ink-gray-8">
            <div className="flex items-center text-xs uppercase">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="flex h-6 w-8 items-center justify-center text-center">
                  {d}
                </div>
              ))}
            </div>
            {datesAsWeeks.map((week, i) => {
              return (
                <div key={i} className="flex items-center">
                  {week.map((date) => {
                    const dateStr = getDateValue(date)
                    const isCurrentMonth = date.getMonth() === currentMonth - 1
                    const isToday = dateStr === getDateValue(dayjs().toDate())
                    const isSelected = dateStr === dateValue
                    const isDisabled = 
                      props.disabledDates?.includes(dateStr) ||
                      (props.minDate && dayjs(dateStr).isBefore(props.minDate)) ||
                      (props.maxDate && dayjs(dateStr).isAfter(props.maxDate))

                    return (
                      <div
                        key={dateStr}
                        className={`flex h-8 w-8 items-center justify-center rounded ${
                          !isDisabled && 'cursor-pointer hover:bg-surface-gray-2'
                        } ${
                          !isCurrentMonth ? 'text-ink-gray-3' : ''
                        } ${
                          isToday ? 'font-extrabold text-ink-gray-9' : ''
                        } ${
                          isSelected ? 'bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6' : ''
                        } ${
                          isDisabled ? 'text-ink-gray-3 cursor-not-allowed' : ''
                        }`}
                        onClick={() => {
                          if (!isDisabled) {
                            selectDate(dateStr)
                            togglePopover()
                          }
                        }}
                      >
                        {date.getDate()}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex justify-end p-1">
            <Button
              label="Clear"
              className="text-sm"
              onClick={() => {
                selectDate('')
                togglePopover()
              }}
            />
          </div>
        </div>
      )}
    </Popover>
  )

  function prevMonth() {
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  function nextMonth() {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  function selectDate(date: string) {
    if (!date) {
      setDateValue('')
      props.onChange?.('')
      return
    }

    const dateStr = dayjs(date).format('YYYY-MM-DD')
    const isDisabled = 
      props.disabledDates?.includes(dateStr) ||
      (props.minDate && dayjs(dateStr).isBefore(props.minDate)) ||
      (props.maxDate && dayjs(dateStr).isAfter(props.maxDate))

    if (!isDisabled) {
      setDateValue(dateStr)
      props.onChange?.(dateStr)
    }
  }

  function togglePopover() {
    // Will be handled by Popover component
  }
}
