import { useState, useEffect } from 'react'
import { FeatherIcon } from './FeatherIcon'

interface RatingProps {
  value?: number
  max?: number
  label?: string
  readOnly?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onChange?: (value: number) => void
}

export default function Rating({
  value = 0,
  max = 5,
  label,
  readOnly = false,
  size = 'md',
  onChange,
}: RatingProps) {
  const [rating, setRating] = useState(value)
  const [hoveredRating, setHoveredRating] = useState(0)

  useEffect(() => {
    setRating(value)
  }, [value])

  const iconClasses = (index: number) => {
    const sizeClasses = {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    }[size]

    let fillClass = 'fill-gray-300'
    if (index <= hoveredRating && index > rating) {
      fillClass = '!fill-yellow-200'
    } else if (index <= rating) {
      fillClass = '!fill-yellow-500'
    }

    return [
      sizeClasses,
      fillClass,
      !readOnly ? 'cursor-pointer' : '',
    ].join(' ')
  }

  const handleClick = (index: number) => {
    if (readOnly) return
    setRating(index)
    onChange?.(index)
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs text-ink-gray-5">
          {label}
        </label>
      )}
      <div className="flex text-center">
        {Array.from({ length: max }).map((_, index) => (
          <div
            key={index + 1}
            onMouseOver={() => !readOnly && setHoveredRating(index + 1)}
            onMouseLeave={() => !readOnly && setHoveredRating(0)}
          >
            <FeatherIcon
              name="star"
              className={`text-transparent mr-0.5 ${iconClasses(index + 1)}`}
              onClick={() => handleClick(index + 1)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
