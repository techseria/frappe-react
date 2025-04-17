import React, { useState } from 'react' // Removed useEffect
// import { Dialog } from '../Dialog' // Removed unused import
// import { FormControl } from '../FormControl' // Removed unused import

// Removed unused local type definitions for DialogProps and FormControlProps

import { ErrorMessage } from '../ErrorMessage'
// import Button from '../Button' // Removed unused import
import { colorMap } from './calendarUtils'

function calculateDiff(from: string, to: string): number {
  const [fromHours, fromMins] = from.split(':').map(Number)
  const [toHours, toMins] = to.split(':').map(Number)
  return (toHours * 60 + toMins) - (fromHours * 60 + fromMins)
}

function handleSeconds(time: string): string {
  return time.split(':').slice(0, 2).join(':')
}

interface NewEventModalProps {
  event?: {
    id?: string
    title: string
    date: string
    participant?: string
    from_time?: string
    to_time?: string
    venue?: string
    color?: string
    isFullDay?: boolean
  }
  show: boolean
  onClose: () => void
  calendarActions: {
    createNewEvent: (event: any) => void
    updateEventState: (event: any) => void
  }
}

const NewEventModal: React.FC<NewEventModalProps> = ({
  event = {
    title: '',
    date: '',
    participant: '',
    from_time: '',
    to_time: '',
    venue: '',
    color: 'green',
    isFullDay: false
  },
  show,
  onClose,
  calendarActions
}) => {
  const [newEvent, setNewEvent] = useState({
    title: event?.title || '',
    date: event?.date || '',
    participant: event?.participant || '',
    from_time: event?.from_time || '',
    to_time: event?.to_time || '',
    venue: event?.venue || '',
    color: event?.color || 'green',
    id: '',
    isFullDay: event?.isFullDay || false
  })

  const [errorMessage, setErrorMessage] = useState('')
  const colors = Object.keys(colorMap)

  const isUpdated = () => {
    return Object.keys(event).some(key => {
      if (key === 'id') return false
      const typedKey = key as keyof typeof newEvent
      return newEvent[typedKey] !== event[typedKey]
    })
  }

  const validateFields = () => {
    if (!newEvent.date) {
      setErrorMessage('Date is required')
    } else if (!newEvent.from_time && !newEvent.isFullDay) {
      setErrorMessage('Start Time is required')
    } else if (!newEvent.to_time && !newEvent.isFullDay) {
      setErrorMessage('End Time is required')
    } else {
      setErrorMessage('')
    }
    if (newEvent.from_time && newEvent.to_time) {
      validateStartEndTime()
    }
  }

  const validateStartEndTime = () => {
    const timeDiff = calculateDiff(newEvent.from_time, newEvent.to_time)
    if (timeDiff <= 0) {
      setErrorMessage('Start time must be less than End Time')
    }
  }

  const handleEventTime = () => {
    if (newEvent.isFullDay) {
      setNewEvent(prev => ({
        ...prev,
        from_time: '',
        to_time: ''
      }))
    } else {
      setNewEvent(prev => ({
        ...prev,
        from_time: handleSeconds(prev.from_time),
        to_time: handleSeconds(prev.to_time)
      }))
    }
  }

  const submitEvent = () => {
    validateFields()
    if (errorMessage) return

    if (!isUpdated()) {
      onClose()
      return
    }

    handleEventTime()

    if (event?.id) {
      calendarActions.updateEventState({
        ...newEvent,
        id: event.id
      })
    } else {
      const id = '#' + Math.random().toString(36).substring(3, 9)
      calendarActions.createNewEvent({
        ...newEvent,
        id
      })
    }
    onClose()
  }

  const handleChange = (field: keyof typeof newEvent) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : e.target.value
      setNewEvent({...newEvent, [field]: value})
    }

  const handleBlur = () => validateFields()

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium">{event?.id ? 'Edit Event' : 'New Event'}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={handleChange('title')}
            placeholder="Meet with John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input
            type="date"
            value={newEvent.date}
            onChange={handleChange('date')}
            onBlur={handleBlur}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">Person</label>
          <input
            type="text"
            value={newEvent.participant}
            onChange={handleChange('participant')}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {!newEvent.isFullDay && (
          <>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="time"
                value={newEvent.from_time}
                onChange={handleChange('from_time')}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                value={newEvent.to_time}
                onChange={handleChange('to_time')}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
          <input
            type="text"
            value={newEvent.venue}
            onChange={handleChange('venue')}
            placeholder="Frappe, Neelkanth Business Park"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <div className="flex items-center">
            <div
              className="h-5 w-5 rounded-full shadow-md mr-2"
              style={{
                backgroundColor: colorMap[newEvent.color]?.background_color || 'bg-green-100'
              }}
            />
            <select
              value={newEvent.color}
              onChange={handleChange('color')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {colors.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group flex items-center">
          <input
            type="checkbox"
            id="isFullDay"
            checked={newEvent.isFullDay}
            onChange={handleChange('isFullDay')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isFullDay" className="ml-2 block text-sm text-gray-700">
            Full Day Event?
          </label>
        </div>

        {errorMessage && <ErrorMessage message={errorMessage} />}
          </div>
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={submitEvent}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewEventModal
