import { ComponentProps, forwardRef } from 'react'
import FeatherIcon from './FeatherIcon'

/**
 * TextInput component - A styled text input with optional label and icon
 */
type TextInputProps = Omit<ComponentProps<'input'>, 'onChange'> & {
  /** Input label */
  label?: string
  /** Left icon name (from Feather Icons) */
  iconLeft?: string
  /** Additional class names */
  className?: string
  /** Error state */
  error?: boolean
  /** Custom onChange handler */
  onChange?: 
    | React.ChangeEventHandler<HTMLInputElement>
    | ((value: string, isValid: boolean) => void)
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: 'sm' | 'md'
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, iconLeft, className = '', error = false, disabled = false, ...props }, ref) => {
    return (
      <label className={`block ${className}`}>
        {label && (
          <span className="mb-2 block text-sm leading-4 text-gray-700">
            {label}
          </span>
        )}
        <div className="relative flex items-center">
          {iconLeft && (
            <FeatherIcon
              name={iconLeft}
              className="absolute mx-2 h-4 w-4 text-gray-600"
            />
          )}
          <input
            ref={ref}
            className={`form-input block w-full border-gray-400 placeholder-gray-500 ${
              iconLeft ? 'pl-8' : ''
            } ${error ? 'border-red-500' : ''} ${
              disabled ? 'cursor-not-allowed opacity-70' : ''
            }`}
            disabled={disabled}
            {...props}
            onChange={(e) => {
              if (typeof props.onChange === 'function') {
                if (props.onChange.length <= 1) {
                  (props.onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
                } else {
                  (props.onChange as (value: string, isValid: boolean) => void)(e.target.value, true);
                }
              }
            }}
          />
        </div>
      </label>
    )
  }
)

TextInput.displayName = 'TextInput'
