import { useListView } from './ListView'
import { Checkbox } from '../Checkbox'
import { ListHeaderItem } from './ListHeaderItem'
import { getGridTemplateColumns } from './utils'

interface ListHeaderProps {
  className?: string
  children?: React.ReactNode
  onColumnWidthUpdated?: (column: any) => void
}

export function ListHeader({ 
  className = '',
  children,
  onColumnWidthUpdated
}: ListHeaderProps) {
  const list = useListView()

  return (
    <div
      className={`mb-2 grid items-center space-x-4 rounded bg-surface-gray-2 p-2 ${className}`}
      style={{
        gridTemplateColumns: getGridTemplateColumns(
          list.columns,
          list.options.selectable
        )
      }}
    >
      {list.options.selectable && (
        <Checkbox 
          checked={list.allRowsSelected}
          onChange={() => list.toggleAllRows(!list.allRowsSelected)}
        />
      )}
      {children || (
        <>
          {list.columns.map((column) => (
            <ListHeaderItem
              key={column.key}
              item={column}
              onColumnWidthUpdated={onColumnWidthUpdated}
            />
          ))}
        </>
      )}
    </div>
  )
}
