import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for routing
import { Checkbox } from '../Checkbox'; // Assuming Checkbox exists
import { ListRowItem } from './ListRowItem'; // Use the actual component
import { alignmentMap, getGridTemplateColumns } from './utils';
// import { ListContext } from './ListView'; // Assuming context is defined in ListView.tsx

// TODO: Define ListContextValue and Column types properly, likely in ListView.tsx or a types file
interface Column {
  key: string;
  align?: 'left' | 'center' | 'right';
  width?: number; // Added width property
  // Add other potential column properties like label, etc.
}

interface ListContextValue<T = any> {
  columns: Column[];
  rows: T[];
  rowKey: Extract<keyof T, string | number>; // Constrained rowKey type
  options: {
    selectable?: boolean;
    getRowRoute?: (row: T) => string; // Or Route object from react-router-dom
    onRowClick?: (row: T) => void;
    rowHeight?: number | string;
  };
  selections: Set<T[keyof T]>;
  toggleRow: (key: T[keyof T]) => void;
  renderCell?: React.ComponentType<{ column: Column; row: T; item: any; align?: string }>; // Using render prop instead of slots
}

// Placeholder context - replace with actual import
const ListContext = React.createContext<ListContextValue | null>(null);

interface ListRowProps<T> {
  row: T;
  rowIndex: number; // Added for key and isLastRow calculation
}

export function ListRow<T extends { [key: string]: any }>({ row, rowIndex }: ListRowProps<T>) {
  const list = useContext(ListContext);

  if (!list) {
    // Handle case where context is not available, maybe throw an error or return null
    console.error('ListRow must be used within a ListProvider');
    return null;
  }

  const { columns, rows, rowKey, options, selections, toggleRow, renderCell } = list;

  const isLastRow = useMemo(() => {
    if (!rows?.length) return false;
    return rowIndex === rows.length - 1;
  }, [rows, rowIndex]);

  const rowKeyValue = row[rowKey];

  const isSelected = useMemo(() => {
    return selections.has(rowKeyValue);
  }, [selections, rowKeyValue]);

  const isHoverable = useMemo(() => {
    return !!options.getRowRoute || !!options.onRowClick;
  }, [options.getRowRoute, options.onRowClick]);

  const rowHeightStyle = useMemo(() => {
    if (typeof options.rowHeight === 'number') {
      return `${options.rowHeight}px`;
    }
    return options.rowHeight || 'auto'; // Default height if not specified
  }, [options.rowHeight]);

  const gridTemplateColumns = useMemo(() => {
    return getGridTemplateColumns(columns, options.selectable);
  }, [columns, options.selectable]);

  const handleRowClick = (e: React.MouseEvent) => {
    // Prevent checkbox click from triggering row click if they overlap
    if ((e.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    if (options.onRowClick && !options.getRowRoute) {
      options.onRowClick(row);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click when clicking checkbox
    toggleRow(rowKeyValue);
  };

  const rowContent = (
    <div
      className={`grid items-center space-x-4 rounded px-2 transition-colors duration-150 ease-in-out ${
        isSelected ? 'bg-gray-100 dark:bg-gray-700' : ''
      } ${
        isHoverable
          ? isSelected
            ? 'hover:bg-gray-200 dark:hover:bg-gray-600'
            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
          : ''
      }`}
      style={{
        height: rowHeightStyle,
        gridTemplateColumns: gridTemplateColumns,
      }}
    >
      {options.selectable && (
        <Checkbox
          checked={isSelected}
          onChange={() => toggleRow(rowKeyValue)} // Use onChange for controlled component
          onClick={handleCheckboxClick} // Keep stopPropagation logic
          className="cursor-pointer"
          aria-label={`Select row ${rowIndex + 1}`} // Accessibility improvement
        />
      )}
      {columns.map((column, i) => (
        <div
          key={column.key}
          className={`${alignmentMap[column.align || 'left']} ${ // Default to left align
            i === 0 ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-600 dark:text-gray-400'
          } overflow-hidden text-ellipsis whitespace-nowrap`} // Added text overflow handling
        >
          {renderCell ? (
            React.createElement(renderCell, {
              column,
              row,
              item: row[column.key],
              align: column.align,
            })
          ) : (
            <ListRowItem
              column={column}
              row={row}
              item={row[column.key]}
              align={column.align}
            />
          )}
        </div>
      ))}
    </div>
  );

  const rowWrapperProps = {
    className: `flex flex-col ${isHoverable ? 'cursor-pointer' : ''}`,
    onClick: !options.getRowRoute ? handleRowClick : undefined,
  };

  return (
    <div {...rowWrapperProps}>
      {options.getRowRoute ? (
        <Link to={options.getRowRoute(row)} className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
          {rowContent}
        </Link>
      ) : (
        rowContent
      )}
      {!isLastRow && (
        <div className="mx-2 h-px border-t border-gray-200 dark:border-gray-700" />
      )}
    </div>
  );
}
