import {
  createContext, // Keep only one import
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  ComponentType,
} from 'react';

// Import sub-components
import { ListHeader } from './ListHeader';
import { ListRows } from './ListRows';
import { ListGroups } from './ListGroups';
import { ListEmptyState } from './ListEmptyState';
import { ListSelectBanner } from './ListSelectBanner';
import { ListGroup } from './ListGroupHeader'; // Import group type

// Make interface generic and fix duplicate/conflicting label
interface ListViewColumn<T = ListViewRowData> { // Make generic
  key: string;
  label?: string; // Consolidate to optional label
  width?: number;
  align?: 'left' | 'center' | 'right';
  // format?: (value: any) => ReactNode // Replaced by renderCell
  prefix?: React.ReactNode | ((props: { row: T }) => React.ReactNode);
  getLabel?: (props: { row: T }) => string;
}

// Define Row type more generically
type ListViewRowData = { [key: string]: any };

// Update ListViewRow to represent either a data row or a group structure
// This might need further refinement based on how grouping is implemented upstream
// For now, assume `rows` prop can contain EITHER ListViewRowData[] OR ListGroup<ListViewRowData>[]
// The `showGroupedRows` logic will differentiate.

interface ListViewOptions<T = ListViewRowData> {
  getRowRoute?: (row: T) => string;
  onRowClick?: (row: T) => void;
  showTooltip?: boolean;
  selectable?: boolean;
  resizeColumn?: boolean;
  rowHeight?: number | string; // Allow string for flexibility
  emptyState?: {
    title?: string;
    description?: string;
    button?: any; // Reuse ButtonProps from ListEmptyState if needed
  };
  // Add render props to options or directly to ListViewProps?
  // Adding to ListViewProps is generally cleaner.
}

interface ListViewProps<T = ListViewRowData> {
  columns: ListViewColumn<T>[];
  rows: T[] | ListGroup<T>[]; // Can be flat rows or groups
  rowKey: Extract<keyof T, string | number>; // Use constrained type
  options?: ListViewOptions<T>;
  className?: string;
  children?: ReactNode; // For custom layout override
  // Render Props
  renderCell?: ComponentType<{ column: ListViewColumn<T>; row: T; item: any; align?: string }>;
  renderGroupHeader?: ComponentType<{ group: ListGroup<T> }>;
  renderSelectBannerActions?: ComponentType<{ // Renamed for clarity
    selections: Set<T[keyof T]>;
    allRowsSelected: boolean;
    selectAll: () => void;
    unselectAll: () => void;
  }>;
  // Add other potential render props: renderHeader, renderFooter, etc.
}

interface ListViewContextType<T = ListViewRowData> {
  rowKey: Extract<keyof T, string | number>;
  rows: T[]; // Represents flat rows for selection logic etc.
  groups?: ListGroup<T>[]; // Represents grouped structure if applicable
  columns: ListViewColumn<T>[];
  options: {
    getRowRoute: ((row: T) => string) | null;
    onRowClick: ((row: T) => void) | null;
    showTooltip: boolean;
    selectable: boolean;
    resizeColumn: boolean;
    rowHeight: number | string; // Allow string
    emptyState?: { // Make optional
      title?: string;
      description?: string;
      button?: any;
    };
  };
  selections: Set<T[keyof T]>;
  allRowsSelected: boolean;
  toggleRow: (key: T[keyof T]) => void;
  toggleAllRows: (select: boolean) => void;
  // Group state management
  collapsedGroups: Set<string>;
  toggleGroupCollapse: (groupTitle: string) => void;
  // Render props passed down via context
  renderCell?: ComponentType<{ column: ListViewColumn<T>; row: T; item: any; align?: string }>;
  renderGroupHeader?: ComponentType<{ group: ListGroup<T> }>;
  renderSelectBannerActions?: ComponentType<{
    selections: Set<T[keyof T]>;
    allRowsSelected: boolean;
    selectAll: () => void;
    unselectAll: () => void;
  }>;
}

// Use generic type for context
const ListViewContext = createContext<ListViewContextType<any> | null>(null);

export default function ListView<T extends ListViewRowData = ListViewRowData>({
  columns,
  rows: data, // Rename prop to avoid confusion with internal flat `rows` state/context
  rowKey,
  options = {},
  className = '',
  children,
  renderCell, // Destructure render props
  renderGroupHeader,
  renderSelectBannerActions,
}: ListViewProps<T>) {
  const [selections, setSelections] = useState<Set<T[keyof T]>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const mergedOptions = useMemo(() => ({
    getRowRoute: options.getRowRoute || null, // Type assertion needed if T is not strictly ListViewRowData
    onRowClick: options.onRowClick || null, // Type assertion needed
    showTooltip: options.showTooltip ?? true,
    selectable: options.selectable ?? true,
    resizeColumn: options.resizeColumn ?? false,
    rowHeight: options.rowHeight || 40, // Keep default
    emptyState: options.emptyState, // Pass through, ListEmptyState handles defaults
  }), [options]);

  // Determine if data is grouped and memoize flat rows and groups
  const { isGrouped, flatRows, groups } = useMemo(() => {
    const isGroupedData = Array.isArray(data) && data.length > 0 && 'group' in data[0] && 'rows' in data[0];
    let currentFlatRows: T[] = [];
    let currentGroups: ListGroup<T>[] | undefined = undefined;

    if (isGroupedData) {
      currentGroups = (data as ListGroup<T>[]).map(group => {
        currentFlatRows = currentFlatRows.concat(group.rows);
        // Add collapsed state from component state
        return { ...group, collapsed: collapsedGroups.has(group.group) };
      });
    } else {
      currentFlatRows = data as T[];
    }
    return { isGrouped: isGroupedData, flatRows: currentFlatRows, groups: currentGroups };
  }, [data, collapsedGroups]);


  const allRowsSelected = useMemo(() => {
    if (!flatRows.length) return false;
    // Check against flatRows length regardless of grouping
    return selections.size === flatRows.length && selections.size > 0;
  }, [flatRows, selections]);

  const toggleRow = useCallback((key: T[keyof T]) => {
    setSelections(prev => {
      const newSelections = new Set(prev);
      if (!newSelections.delete(key)) {
        newSelections.add(key);
      }
      return newSelections;
    });
  }, []);

  const toggleAllRows = useCallback((select: boolean) => {
    if (!select || allRowsSelected) {
      setSelections(new Set());
      return;
    }
    // Select all from flatRows
    const newSelections = new Set<T[keyof T]>(flatRows.map(r => r[rowKey]));
    setSelections(newSelections);
  }, [allRowsSelected, flatRows, rowKey]);

  const toggleGroupCollapse = useCallback((groupTitle: string) => {
    setCollapsedGroups(prev => {
      const newCollapsed = new Set(prev);
      if (!newCollapsed.delete(groupTitle)) {
        newCollapsed.add(groupTitle);
      }
      return newCollapsed;
    });
  }, []);

  const contextValue: ListViewContextType<T> = useMemo(() => ({
    rowKey,
    rows: flatRows, // Provide flat rows for selection logic
    groups: groups, // Provide groups for rendering ListGroups
    columns,
    options: mergedOptions,
    selections,
    allRowsSelected,
    toggleRow,
    toggleAllRows,
    collapsedGroups,
    toggleGroupCollapse,
    renderCell, // Pass down render props
    renderGroupHeader,
    renderSelectBannerActions,
  }), [
    rowKey, flatRows, groups, columns, mergedOptions, selections, allRowsSelected,
    toggleRow, toggleAllRows, collapsedGroups, toggleGroupCollapse,
    renderCell, renderGroupHeader, renderSelectBannerActions
  ]);

  const hasData = isGrouped ? groups && groups.length > 0 : flatRows.length > 0;

  return (
    // Use ListViewContext<T> for Provider
    <ListViewContext.Provider value={contextValue}>
      <div className={`relative flex h-full w-full flex-1 flex-col overflow-hidden border border-gray-200 dark:border-gray-700 rounded-md ${className}`}>
        {/* Allow children override */}
        {children ? (
          children
        ) : (
          <>
            <ListHeader />
            <div className="flex-1 overflow-y-auto"> {/* Scrollable body */}
              {!hasData ? (
                <ListEmptyState />
              ) : isGrouped ? (
                <ListGroups<T> />
              ) : (
                <ListRows<T> />
              )}
            </div>
            {/* Footer would go here if migrated */}
            {/* <ListFooter /> */}
          </>
        )}
        {/* Select Banner floats above */}
        {mergedOptions.selectable && <ListSelectBanner<T> />}
      </div>
    </ListViewContext.Provider>
  );
}

// Update hook to use generic type
export function useListView<T = ListViewRowData>() {
  const context = useContext<ListViewContextType<T> | null>(ListViewContext);
  if (!context) {
    throw new Error('useListView must be used within a ListView provider')
  }
  return context
}
