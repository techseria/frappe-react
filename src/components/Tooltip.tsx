import { useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  Placement,
} from '@floating-ui/react'

interface TooltipProps {
  text?: string
  hoverDelay?: number
  placement?: Placement
  arrowClass?: string
  disabled?: boolean
  children: React.ReactNode
}

export default function Tooltip({
  text = '',
  hoverDelay = 500,
  placement = 'top',
  arrowClass = 'fill-surface-gray-7',
  disabled = false,
  children,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 5 }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, {
    delay: {
      open: hoverDelay,
      close: 0,
    },
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])

  if (disabled) {
    return children
  }

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-[100]"
        >
          <div className="rounded bg-surface-gray-7 px-2 py-1 text-xs text-ink-white shadow-xl">
            {text}
          </div>
          <div className={`absolute ${arrowClass}`}>
            <svg
              width="8"
              height="4"
              viewBox="0 0 8 4"
              fill="currentColor"
            >
              <path d="M0 0 L4 4 L8 0" />
            </svg>
          </div>
        </div>
      )}
    </>
  )
}
