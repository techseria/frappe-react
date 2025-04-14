import { Button } from './Button/Button'

interface DividerAction {
  label: string
  handler: () => void
  loading?: boolean
}

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  position?: 'start' | 'center' | 'end'
  flexItem?: boolean
  action?: DividerAction
}

export function Divider({
  orientation = 'horizontal',
  position = 'center',
  flexItem = false,
  action
}: DividerProps) {
  const alignmentClasses = {
    horizontal: 'border-t-[1px] w-full',
    vertical: 'border-l-[1px]'
  }[orientation]

  const flexClasses = flexItem ? 'self-stretch h-auto' : 'h-full'

  const actionAlignmentClasses = {
    horizontal: {
      center: 'left-1/2 top-0 -translate-y-2/4 -translate-x-1/2',
      start: 'left-0 top-0 -translate-y-2/4 ml-4',
      end: 'right-0 -translate-y-2/4 mr-4'
    },
    vertical: {
      center: '-translate-x-2/4 top-1/2 left-0 -translate-y-1/2',
      start: '-translate-x-2/4 top-0 mt-4 left-0',
      end: '-translate-x-2/4 bottom-0 mb-4 left-0'
    }
  }[orientation][position]

  const Component = action ? 'div' : 'hr'

  return (
    <Component 
      className={`relative whitespace-nowrap border-0 border-outline-gray-2 ${alignmentClasses} ${flexClasses}`}
    >
      {action && (
        <span className={`absolute ${actionAlignmentClasses}`}>
          <Button
            label={action.label}
            loading={action.loading}
            size="sm"
            variant="outline"
            onClick={action.handler}
          />
        </span>
      )}
    </Component>
  )
}
