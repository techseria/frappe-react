import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useEffect, useState } from 'react'
import { Button, ButtonProps } from './Button/Button'
import { FeatherIcon, FeatherIconName } from './FeatherIcon';

type DialogIcon = {
  name: FeatherIconName
  appearance?: 'warning' | 'info' | 'danger' | 'success'
}

export type DialogOptions = { // Export DialogOptions
  title?: string
  message?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  icon?: DialogIcon | string
  actions?: DialogAction[] // Use the exported DialogAction type
  position?: 'top' | 'center'
}

export type DialogActionContext = { // Export DialogActionContext
  close: () => void
}

// Define DialogAction with specific props needed, avoiding full ButtonProps intersection
export type DialogAction = {
  label?: string; // Change label to string | undefined to match ButtonProps
  variant?: ButtonProps['variant']; // Use specific types from ButtonProps
  theme?: ButtonProps['theme'];
  icon?: ButtonProps['icon'];
  iconLeft?: ButtonProps['iconLeft'];
  iconRight?: ButtonProps['iconRight'];
  loading?: boolean; // Keep loading state separate
  disabled?: boolean; // Keep disabled state separate
  // Define the specific onClick signature expected by Dialog
  onClick?: (context: DialogActionContext) => void | Promise<void>;
  // Add any other ButtonProps needed by Dialog actions explicitly
};

interface DialogProps {
  open: boolean
  onClose: () => void
  options?: DialogOptions
  disableOutsideClickToClose?: boolean
  children?: ReactNode
  afterLeave?: () => void
}

export function Dialog({
  open,
  onClose,
  options = {},
  disableOutsideClickToClose = false,
  children,
  afterLeave
}: DialogProps) {
  const [isOpen, setIsOpen] = useState(open)
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleClose = () => {
    if (!disableOutsideClickToClose) {
      setIsOpen(false)
      onClose()
    }
  }

  const icon = typeof options.icon === 'string'
    ? { name: options.icon as FeatherIconName }
    : options.icon as DialogIcon

  const dialogPositionClasses = {
    center: 'justify-center',
    top: 'pt-[20vh]'
  }[options.position || 'center']

  const getDialogIconClasses = (appearance?: 'warning' | 'info' | 'danger' | 'success') => {
    const bgClasses = {
      warning: 'bg-surface-amber-2',
      info: 'bg-surface-blue-2',
      danger: 'bg-surface-red-2',
      success: 'bg-surface-green-2',
    }
    const textClasses = {
      warning: 'text-ink-amber-3',
      info: 'text-ink-blue-3',
      danger: 'text-ink-red-4',
      success: 'text-ink-green-3',
    }

    return {
      bg: appearance ? bgClasses[appearance] : 'bg-surface-gray-2',
      text: appearance ? textClasses[appearance] : 'text-ink-gray-5'
    }
  }

  const iconClasses = getDialogIconClasses(icon?.appearance)

  const sizeClasses = {
    'xs': 'max-w-xs',
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  }[options.size || 'lg']

  const handleActionClick = async (action: DialogAction, index: number) => {
    if (!action.onClick) {
      handleClose()
      return
    }

    setLoadingActions(prev => ({...prev, [index]: true}))
    try {
      const context: DialogActionContext = { close: handleClose }
      await action.onClick(context)
    } finally {
      setLoadingActions(prev => ({...prev, [index]: false}))
    }
  }

  return (
    <Transition show={isOpen} as={Fragment} afterLeave={afterLeave}>
      <HeadlessDialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleClose}
      >
        <div className={`flex min-h-screen flex-col items-center px-4 py-4 text-center ${dialogPositionClasses}`}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black-overlay-200 transition-opacity dark:backdrop-filter dark:backdrop-blur-[1px]" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-50 translate-y-2 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-50 translate-y-4 scale-95"
          >
            <HeadlessDialog.Panel
              className={`my-8 inline-block w-full transform overflow-hidden rounded-xl bg-surface-modal text-left align-middle shadow-xl transition-all ${sizeClasses}`}
            >
              {children || (
                <>
                  <div className="bg-surface-modal px-4 pb-6 pt-5 sm:px-6">
                    <div className="flex">
                      <div className="w-full flex-1">
                        <div className="mb-6 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {icon && (
                              <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${iconClasses.bg}`}>
                                <FeatherIcon
                                  name={icon.name}
                                  className={`h-4 w-4 ${iconClasses.text}`}
                                  aria-hidden="true"
                                />
                              </div>
                            )}
                            <HeadlessDialog.Title as="h3" className="text-2xl font-semibold leading-6 text-ink-gray-9">
                              {options.title || 'Untitled'}
                            </HeadlessDialog.Title>
                          </div>
                          <Button variant="ghost" onClick={handleClose}>
                            {/* Placeholder for Close Icon SVG or Component */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                          </Button>
                        </div>

                        {options.message && (
                          <p className="text-p-base text-ink-gray-7">
                            {options.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {(options.actions?.length || children) && (
                    <div className="px-4 pb-7 pt-4 sm:px-6">
                      <div className="space-y-2">
                        {options.actions?.map((action, index) => { // Explicit block
                          const { onClick, ...buttonProps } = action; // Separate props
                          return ( // Explicit return
                            <Button
                              key={index}
                              className="w-full"
                              loading={loadingActions[index]}
                              {...buttonProps} // Spread compatible props
                              onClick={() => handleActionClick(action, index)} // Use wrapper handler
                            >
                              {/* Label is passed via {...buttonProps}, no need for children here */}
                            </Button>
                          ); // Semicolon for return
                        })} {/* Correct closing brace and parenthesis for map */}
                      </div>
                    </div>
                  )}
                </>
              )}
            </HeadlessDialog.Panel>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}
