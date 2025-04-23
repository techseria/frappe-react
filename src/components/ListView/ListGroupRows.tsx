import React, { useContext } from 'react';
import { ListRow } from './ListRow';
import { ListGroup } from './ListGroupHeader'; // Import the group type definition
import { ListViewContext } from './ListView'; // Assuming context is defined in ListView.tsx

// TODO: Define ListContextValue properly, likely in ListView.tsx or a types file
interface ListContextValue<T = any> {
  // ... other context properties
  rowKey: Extract<keyof T, string | number>;
  // ... rest of context
}

interface ListGroupRowsProps<T> {
  group: ListGroup<T>;
  children?: React.ReactNode; // Allow overriding default content
}

export function ListGroupRows<T extends { [key: string]: any }>({ group, children }: ListGroupRowsProps<T>) {
  const list = useContext(ListViewContext);

  if (!list) {
    console.error('ListGroupRows must be used within a ListProvider');
    return null;
  }

  const { rowKey } = list;

  // Don't render anything if the group is collapsed
  if (group.collapsed) {
    return null;
  }

  // If children are provided, render them instead of the default row mapping
  if (children) {
    return <div className="mb-5 mt-2">{children}</div>;
  }

  return (
    <div
      className="mb-5 mt-2"
      id={`list-group-${group.group.replace(/\s+/g, '-')}`} // Matching ID for aria-controls
      role="region" // Accessibility: identify as a region controlled by the header
      aria-labelledby={`list-group-header-${group.group.replace(/\s+/g, '-')}`} // Needs ID on header text
    >
      {group.rows.map((row, index) => (
        <ListRow<T>
          key={String(row[rowKey])} // Ensure key is a string or number
          row={row}
          rowIndex={index} // Pass index relative to the group? Or overall index? Needs clarification. Using group index for now.
        />
      ))}
    </div>
  );
}
