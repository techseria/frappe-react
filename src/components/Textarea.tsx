import { ComponentProps, forwardRef } from 'react'

type TextareaProps = ComponentProps<'textarea'> & {
  /** Textarea label */
  label?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Visual variant */
  variant?: 'subtle' | 'outline'
  /** Debounce time in ms */
  debounce?: number
  /** Disabled state */
  disabled?: boolean
  /** Additional class names */
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      size = 'sm',
      variant = 'subtle',
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'text-base rounded',
      md: 'text-base rounded',
      lg: 'text-lg rounded-md',
      xl: 'text-xl rounded-md',
    }[size]

    const paddingClasses = {
      sm: 'py-1.5 px-2',
      md: 'py-1.5 px-2.5',
      lg: 'py-1.5 px-3',
      xl: 'py-1.5 px-3',
    }[size]

    const variantClasses = disabled
      ? 'border bg-surface-gray-1 placeholder-ink-gray-3 text-ink-gray-5 ' +
        (variant === 'outline' ? 'border-outline-gray-2' : 'border-transparent')
      : {
          subtle:
            'border border-[--surface-gray-2] bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3',
          outline:
            'border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3',
        }[variant]

    const labelClasses = {
      sm: 'text-xs',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    }[size]

    return (
      <div className={`space-y-1.5 ${className}`}>
        {label && (
          <label className={`block ${labelClasses} text-ink-gray-5`}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${sizeClasses} ${paddingClasses} ${variantClasses} transition-colors w-full block ${
            disabled ? 'cursor-not-allowed' : ''
          }`}
          disabled={disabled}
          {...props}
        />
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
