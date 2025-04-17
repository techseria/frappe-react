import { useEffect } from 'react'
import { FeatherIcon, FeatherIconName } from './FeatherIcon'

export type ToastProps = {
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
  icon?: FeatherIconName
  iconClasses?: string
  title?: string
  text?: string
  timeout?: number
  onClose: () => void
  children?: React.ReactNode
}

export default function Toast({
  // position = 'top-center', // Removed unused prop
  icon,
  iconClasses,
  title,
  text,
  timeout = 5,
  onClose,
  children
}: ToastProps) {
  useEffect(() => {
    if (timeout > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, timeout * 1000)
      return () => clearTimeout(timer)
    }
  }, [timeout, onClose])

  return (
    <div className="my-2 min-w-[15rem] max-w-[40rem] rounded-lg border bg-surface-white p-4 shadow-md">
      <div className="flex items-start">
        {icon && (
          <div className="mr-3 grid h-5 w-5 place-items-center">
            <FeatherIcon name={icon} className={`h-5 w-5 ${iconClasses}`} />
          </div>
        )}
        <div>
          {children || (
            <>
              {title && (
                <p className={`text-base font-medium text-ink-gray-9 ${text ? 'mb-1' : ''}`}>
                  {title}
                </p>
              )}
              {text && <p className="text-base text-ink-gray-5" dangerouslySetInnerHTML={{ __html: text }} />}
            </>
          )}
        </div>
        <div className="ml-auto pl-2">
          <button
            className="grid h-5 w-5 place-items-center rounded hover:bg-surface-gray-2"
            onClick={onClose}
          >
            <FeatherIcon name="x" className="h-4 w-4 text-ink-gray-7" />
          </button>
        </div>
      </div>
    </div>
  )
}
