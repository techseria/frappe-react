import React, { useContext } from 'react';
import FeatherIcon from '../FeatherIcon';
// Assuming ListContext is defined elsewhere (e.g., ListView.tsx) and imported
// import { ListContext } from './ListView'; // Placeholder

// Define the structure for a group object
export interface ListGroup<T = any> {
  group: string; // The group identifier/title
  rows: T[]; // Rows belonging to this group
  collapsed?: boolean; // State for collapsed/expanded
}

// TODO: Define ListContextValue properly, likely in ListView.tsx or a types file
interface ListContextValue<T = any> {
  // ... other context properties
  renderGroupHeader?: React.ComponentType<{ group: ListGroup<T> }>; // Render prop for custom header
  // ... rest of context
}

// Placeholder context - replace with actual import
const ListContext = React.createContext<ListContextValue | null>(null);

interface ListGroupHeaderProps<T> {
  group: ListGroup<T>;
  onToggle: (groupTitle: string) => void; // Callback to toggle collapse state
  children?: React.ReactNode; // Allow overriding default content
}

export function ListGroupHeader<T>({ group, onToggle, children }: ListGroupHeaderProps<T>) {
  const list = useContext(ListContext);
  const renderCustomHeader = list?.renderGroupHeader;

  const handleToggle = () => {
    onToggle(group.group);
  };

  // If children are provided, render them instead of the default structure
  if (children) {
    return <div className="border-b border-gray-200 dark:border-gray-700">{children}</div>;
  }

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <button
          onClick={handleToggle}
          className="ml-[3px] mr-[11px] rounded p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-expanded={!group.collapsed}
          aria-controls={`list-group-${group.group.replace(/\s+/g, '-')}`} // Accessibility
        >
          <FeatherIcon
            name="chevron-down"
            className={`h-4 w-4 transition-transform duration-200 ${
              group.collapsed ? '-rotate-90' : ''
            }`}
          />
           <span className="sr-only">{group.collapsed ? 'Expand' : 'Collapse'} group {group.group}</span>
        </button>
        <div className="w-full py-1.5 pr-2">
          {renderCustomHeader ? (
            React.createElement(renderCustomHeader, { group })
          ) : (
            <span className="text-sm font-medium leading-6 text-gray-800 dark:text-gray-200">
              {group.group}
            </span>
          )}
        </div>
      </div>
      {/* Optional: Divider was outside the slot in Vue, kept here for similar structure */}
      {/* <div className="mx-2 h-px border-t border-gray-200 dark:border-gray-700" /> */}
    </div>
  );
}
