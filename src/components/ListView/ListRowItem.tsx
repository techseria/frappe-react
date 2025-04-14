import React, { useContext, useState, useMemo } from 'react';
import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react';
import { alignmentMap } from './utils';
// Assuming ListContext is defined elsewhere (e.g., ListView.tsx) and imported
// import { ListContext, Column } from './ListView'; // Placeholder

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
    showTooltip?: boolean; // Added tooltip option
  };
  selections: Set<T[keyof T]>;
  toggleRow: (key: T[keyof T]) => void;
  renderCell?: React.ComponentType<{ column: Column<T>; row: T; item: any; align?: string }>;
}

// Placeholder context - replace with actual import
const ListContext = React.createContext<ListContextValue | null>(null);


interface ListRowItemProps<T> {
  column: Column<T>;
  row: T;
  item: any; // The value for this specific cell
  align?: 'left' | 'center' | 'right';
}

// Helper to normalize item value
function normalizeItemValue(value: any): { label: string | number } {
  if (value && typeof value === 'object' && 'label' in value) {
    return { label: String(value.label) };
  }
  return { label: String(value ?? '') }; // Ensure label is always a string or number
}

export function ListRowItem<T extends { [key: string]: any }>({
  column,
  row,
  item,
  align = 'left', // Default alignment
}: ListRowItemProps<T>) {
  const list = useContext(ListContext);

  if (!list) {
    console.error('ListRowItem must be used within a ListProvider');
    return null;
  }

  const { options } = list;
  const showTooltip = options.showTooltip ?? false; // Default to false if not provided

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5), // Space between trigger and tooltip
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
    ],
  });

  // Interaction hooks
  const hover = useHover(context, { move: false, enabled: showTooltip });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const normalizedItem = useMemo(() => normalizeItemValue(item), [item]);
  const displayLabel = useMemo(() => {
    return column.getLabel ? column.getLabel({ row }) : normalizedItem.label;
  }, [column, row, normalizedItem.label]);

  const renderPrefix = () => {
    if (!column.prefix) return null;
    if (typeof column.prefix === 'function') {
      return column.prefix({ row });
    }
    return column.prefix;
  };

  const content = (
    <div
      ref={showTooltip ? refs.setReference : undefined}
      className={`flex items-center space-x-2 ${alignmentMap[align]}`}
      {...(showTooltip ? getReferenceProps() : {})}
    >
      {renderPrefix()}
      <div className="truncate text-sm"> {/* Use text-sm for consistency */}
        {displayLabel}
      </div>
      {/* Suffix slot equivalent - can be added via column definition if needed */}
    </div>
  );

  return (
    <>
      {content}
      {showTooltip && isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="bg-gray-900 text-white text-xs rounded py-1 px-2 z-50 shadow-md"
          {...getFloatingProps()}
        >
          {displayLabel}
        </div>
      )}
    </>
  );
}
