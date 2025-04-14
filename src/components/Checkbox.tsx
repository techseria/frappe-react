import { forwardRef, InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant */
  variantSize?: 'sm' | 'md'
  /** Label text */
  label?: string
  /** Show padding around checkbox */
  padding?: boolean
  /** Controlled checked state */
  checked?: boolean
  /** Uncontrolled checked state */
  defaultChecked?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Additional class names */
  className?: string
  /** Label class names */
  labelClassName?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    variantSize = 'sm',
    label,
    padding = false,
    checked,
    defaultChecked,
    disabled = false,
    className = '',
    labelClassName = '',
    ...props
  }, ref) => {

    const inputClasses = [
      'rounded-sm',
      disabled 
        ? 'border-outline-gray-2 bg-surface-menu-bar text-ink-gray-3'
        : 'border-outline-gray-4 text-ink-gray-9 hover:border-gray-600 focus:ring-offset-0 focus:border-gray-900 active:border-gray-700 transition',
      disabled
        ? ''
        : padding
          ? 'focus:ring-0'
          : 'hover:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3 active:bg-surface-gray-2',
      variantSize === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4',
      className
    ].join(' ')

    const labelClasses = [
      'block select-none',
      variantSize === 'sm' ? 'text-base font-medium' : 'text-lg font-medium',
      disabled ? 'text-ink-gray-4' : 'text-ink-gray-8',
      labelClassName
    ].join(' ')

    const containerClasses = [
      'inline-flex items-center space-x-2 rounded transition',
      padding && variantSize === 'sm' ? 'px-2.5 py-1.5' : '',
      padding && variantSize === 'md' ? 'px-3 py-2' : '',
      padding && !disabled 
        ? 'focus-within:bg-surface-gray-2 focus-within:ring-2 focus-within:ring-outline-gray-3 hover:bg-surface-gray-3 active:bg-surface-gray-4' 
        : '',
    ].join(' ')

    return (
      <div className={containerClasses}>
        <input
          ref={ref}
          type="checkbox"
          className={inputClasses}
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          {...props}
        />
        {label && (
          <label className={labelClasses}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
