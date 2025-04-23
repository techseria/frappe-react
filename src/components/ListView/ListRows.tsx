import React, { useContext } from 'react';
import { ListRow } from './ListRow';
import { ListViewContext } from './ListView'; // Adjust path as needed

// TODO: Define ListContextValue and Column types properly, likely in ListView.tsx or a types file
interface Column<T = any> {
  key: string;
  align?: 'left' | 'center' | 'right';
  width?: number;
  prefix?: React.ReactNode | ((props: { row: T }) => React.ReactNode);
  getLabel?: (props: { row: T }) => string;
}

interface ListContextValue<T = any> {
  columns: Column<T>[];
  rows: T[];
  rowKey: Extract<keyof T, string | number>;
  options: {
    selectable?: boolean;
    getRowRoute?: (row: T) => string;
    onRowClick?: (row: T) => void;
    rowHeight?: number | string;
    showTooltip?: boolean;
  };
  selections: Set<T[keyof T]>;
  toggleRow: (key: T[keyof T]) => void;
  renderCell?: React.ComponentType<{ column: Column<T>; row: T; item: any; align?: string }>;
}

// No specific props needed for ListRows itself, it relies on context
export function ListRows<T extends { [key: string]: any }>() {
  const list = useContext(ListViewContext);

  if (!list) {
    console.error('ListRows must be used within a ListProvider');
    return null;
  }

  const { rows, rowKey } = list;

  if (!rows || rows.length === 0) {
    // Optionally render an empty state here or let the parent handle it
    return null; // Or <ListEmptyState /> when migrated
  }

  return (
    <div className="h-full overflow-y-auto">
      {rows.map((row, index) => (
        <ListRow<T>
          key={String(row[rowKey])} // Ensure key is a string or number
          row={row}
          rowIndex={index}
        />
      ))}
    </div>
  );
}
