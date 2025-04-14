import { ComponentProps, forwardRef } from 'react'

type SelectOption = 
  | string
  | {
      label: string
      value: string
      disabled?: boolean
    }

type SelectProps = ComponentProps<'select'> & {
  /** Select options */
  options: SelectOption[]
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Visual variant */
  variant?: 'subtle' | 'outline' | 'ghost'
  /** Placeholder text */
  placeholder?: string
  /** Disabled state */
  disabled?: boolean
  /** Prefix element */
  prefix?: React.ReactNode
  /** Additional class names */
  className?: string,
  onChange?: (value: string) => void
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    options,
    size = 'sm',
    variant = 'subtle',
    placeholder,
    disabled = false,
    prefix,
    className = '',
    ...props
  }, ref) => {

    const fontSizeClasses = {
      sm: 'text-base',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    }[size]

    const paddingClasses = {
      sm: 'pl-2 pr-5',
      md: 'pl-2.5 pr-5.5',
      lg: 'pl-3 pr-6',
      xl: 'pl-3 pr-6',
    }[size]

    const sizeClasses = {
      sm: 'rounded h-7',
      md: 'rounded h-8',
      lg: 'rounded-md h-10',
      xl: 'rounded-md h-10',
    }[size]

    const variantClasses = disabled
      ? `border ${variant === 'outline' ? 'border-outline-gray-2' : 'border-transparent'} ${variant !== 'ghost' ? 'bg-surface-gray-1' : ''}`
      : {
          subtle: 'border border-[--surface-gray-2] bg-surface-gray-2 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:border-outline-gray-4 focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3',
          outline: 'border border-outline-gray-2 bg-surface-white hover:border-outline-gray-3 focus:border-outline-gray-4 focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3',
          ghost: 'bg-transparent border-transparent hover:bg-surface-gray-3 focus:bg-surface-gray-3 focus:border-outline-gray-4 focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3'
        }[variant]

    const textColor = disabled ? 'text-ink-gray-4' : 'text-ink-gray-8'

    const prefixClasses = {
      sm: 'pl-2',
      md: 'pl-2.5',
      lg: 'pl-3',
      xl: 'pl-3',
    }[size]

    return (
      <div className={`relative flex items-center ${className}`}>
        {prefix && (
          <div className={`absolute inset-y-0 left-0 flex items-center ${textColor} ${prefixClasses}`}>
            {prefix}
          </div>
        )}
        {placeholder && !props.value && (
          <div className={`pointer-events-none absolute text-ink-gray-4 truncate w-full ${fontSizeClasses} ${paddingClasses}`}>
            {placeholder}
          </div>
        )}
        <select
          ref={ref}
          className={`${sizeClasses} ${fontSizeClasses} ${paddingClasses} ${variantClasses} ${textColor} transition-colors w-full py-0 truncate ${
            disabled ? 'cursor-not-allowed' : ''
          } ${prefix ? 'pl-8' : ''}`}
          disabled={disabled}
          {...props}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => props.onChange?.(e.target.value)}
        >
          {options.map((option) => {
            const opt = typeof option === 'string'
              ? { label: option, value: option }
              : option
            return (
              <option 
                key={opt.value} 
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
)

Select.displayName = 'Select'
