import { 
  forwardRef,
  // useState, // Removed as unused
  // useEffect, // Removed as unused
  useRef,
  ReactNode 
} from 'react'
import { alignmentMap, useDebounceFn } from './utils'
import { useListView } from './ListView'

interface ListHeaderItemProps {
  item: {
    label?: string
    align?: 'left' | 'center' | 'right'
    width?: number | string
  }
  debounce?: number
  children?: ReactNode
  className?: string
  onColumnWidthUpdated?: (item: any) => void
}

export const ListHeaderItem = forwardRef<HTMLDivElement, ListHeaderItemProps>(
  ({ 
    item, 
    debounce = 1000, 
    children,
    className = '',
    onColumnWidthUpdated,
    ...props 
  }, _ref) => { // Changed ref to _ref as it's unused
    const { options } = useListView()
    const resizerRef = useRef<HTMLDivElement>(null)
    const columnRef = useRef<HTMLDivElement>(null)
    // const [isResizing, setIsResizing] = useState(false) // Removed as unused

    const widthInPx = () => {
      if (typeof item.width === 'string') {
        const parsedWidth = parseInt(item.width)
        if (item.width.includes('rem')) {
          return parsedWidth * 16
        } else if (item.width.includes('px')) {
          return parsedWidth
        }
      }
      return columnRef.current?.offsetWidth || 0
    }

    const startResizing = (e: React.MouseEvent) => {
      e.preventDefault()
      const initialX = e.clientX
      const initialWidth = widthInPx()
      // setIsResizing(true) // Removed as unused

      const onMouseMove = (e: MouseEvent) => {
        document.body.classList.add('select-none', 'cursor-col-resize')
        if (resizerRef.current) {
          resizerRef.current.style.backgroundColor = 'rgb(199 199 199)'
        }
        const newWidth = initialWidth + (e.clientX - initialX)
        const clampedWidth = Math.max(50, newWidth)
        item.width = `${clampedWidth}px`
        debouncedUpdate(item.width)
      }

      const onMouseUp = () => {
        document.body.classList.remove('select-none', 'cursor-col-resize')
        if (resizerRef.current) {
          resizerRef.current.style.backgroundColor = ''
        }
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
        // setIsResizing(false) // Removed as unused
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    }

    const debouncedUpdate = useDebounceFn((width: string) => {
      item.width = width
      onColumnWidthUpdated?.(item)
    }, debounce)

    return (
      <div
        ref={columnRef}
        className={`group relative flex items-center ${
          item.align ? alignmentMap[item.align] : 'justify-between'
        } ${className}`}
        {...props}
      >
        <div className="flex items-center space-x-2 truncate text-sm text-ink-gray-5">
          {children || (
            <div className="truncate">
              {item.label}
            </div>
          )}
        </div>
        {options.resizeColumn && (
          <div
            ref={resizerRef}
            className="flex h-4 absolute -right-2 w-2 cursor-col-resize justify-center"
            onMouseDown={startResizing}
          >
            <div className="h-full w-[2px] rounded-full transition-all duration-300 ease-in-out group-hover:bg-gray-400" />
          </div>
        )}
      </div>
    )
  }
)

ListHeaderItem.displayName = 'ListHeaderItem'
