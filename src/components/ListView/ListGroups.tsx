import React, { useContext } from 'react';
import { ListGroupHeader, ListGroup } from './ListGroupHeader'; // Import group type and header component
import { ListGroupRows } from './ListGroupRows'; // Import group rows component
import { ListViewContext } from './ListView'; // Assuming context is defined in ListView.tsx

// TODO: Define ListContextValue properly, likely in ListView.tsx or a types file
// This context needs to provide the grouped data and a way to toggle group collapse state
interface ListContextValue<T = any> {
  groups?: ListGroup<T>[]; // Expect grouped data here
  toggleGroupCollapse?: (groupTitle: string) => void; // Function to manage collapse state
  renderGroupHeader?: React.ComponentType<{ group: ListGroup<T> }>; // Optional custom header render prop
  // ... other context properties
}

export function ListGroups<T extends { [key: string]: any }>() {
  const list = useContext(ListViewContext);

  if (!list) {
    console.error('ListGroups must be used within a ListProvider');
    return null;
  }

  const { groups, toggleGroupCollapse } = list;

  if (!groups || groups.length === 0) {
    // Optionally render an empty state here or let the parent handle it
    // This might conflict with ListEmptyState if used in the same parent
    return null;
  }

  if (!toggleGroupCollapse) {
    console.warn('ListGroups requires a toggleGroupCollapse function in the ListContext to manage group states.');
    // Render groups as always expanded if toggle function is missing
  }

  return (
    <div className="h-full overflow-y-auto">
      {groups.map((group) => (
        <div key={group.group}>
          <ListGroupHeader<T>
            group={group}
            onToggle={toggleGroupCollapse || (() => {})} // Pass toggle handler
          />
          <ListGroupRows<T> group={group} />
        </div>
      ))}
    </div>
  );
}
