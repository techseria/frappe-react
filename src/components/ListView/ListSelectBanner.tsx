import React, { useContext, useMemo, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { Checkbox } from '../Checkbox'; // Assuming Checkbox exists
import { Button } from '../Button/Button'; // Assuming Button exists
// Assuming ListContext is defined elsewhere (e.g., ListView.tsx) and imported
// import { ListContext } from './ListView'; // Placeholder

// TODO: Define ListContextValue properly, likely in ListView.tsx or a types file
interface ListContextValue<T = any> {
  selections: Set<T[keyof T]>;
  allRowsSelected: boolean; // Assuming this state is managed in the main ListView
  toggleAllRows: (select: boolean) => void; // Function to select/deselect all
  // ... other context properties
}

// Placeholder context - replace with actual import
const ListContext = React.createContext<ListContextValue | null>(null);

interface ListSelectBannerProps<T> {
  className?: string;
  renderActions?: React.ComponentType<{ // Render prop for custom actions
    selections: Set<T[keyof T]>;
    allRowsSelected: boolean;
    selectAll: () => void;
    unselectAll: () => void;
  }>;
  children?: React.ReactNode; // Allow overriding default content
}

export function ListSelectBanner<T extends { [key: string]: any }>() {
  const list = useContext(ListContext);

  if (!list) {
    // Don't render if not inside a provider
    return null;
  }

  const { selections, allRowsSelected, toggleAllRows } = list;
  const show = selections.size > 0;

  const selectedText = useMemo(() => {
    const count = selections.size;
    const title = count === 1 ? 'Row' : 'Rows';
    return `${count} ${title} selected`;
  }, [selections.size]);

  const selectAll = () => toggleAllRows(true);
  const unselectAll = () => toggleAllRows(false);

  // Extract props needed for renderActions
  const renderActionsProps = {
    selections,
    allRowsSelected,
    selectAll,
    unselectAll,
  };

  // Find renderActions from props if passed directly, otherwise assume it's on context (less ideal)
  // It's better practice to pass renderActions as a direct prop to ListSelectBanner
  // const RenderActionsComponent = props.renderActions || list.renderActions; // Example if context had it

  // For this migration, assume renderActions is passed as a prop to ListView which then passes it here
  // We need to adjust ListView.tsx later to accept and pass this prop.
  // For now, we'll just define the prop interface.
  // Let's assume a prop `renderActions` is passed down.

  // Placeholder for the actual prop - this needs to be passed from the parent ListView component
  const renderActions: ListSelectBannerProps<T>['renderActions'] | undefined = undefined;


  return (
    <Transition
      as={Fragment} // Use Fragment to avoid adding extra DOM nodes
      show={show}
      enter="duration-300 ease-out"
      enterFrom="transform opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-200 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="fixed inset-x-0 bottom-6 z-20 mx-auto w-max text-sm"> {/* Use fixed positioning */}
        <div
          className="flex min-w-[500px] items-center space-x-3 rounded-lg bg-white dark:bg-gray-800 px-4 py-2 shadow-2xl border border-gray-200 dark:border-gray-700"
          // className={props.className} // Apply custom class if provided
        >
          {/* Default Content Slot */}
          <div className="flex flex-1 items-center justify-between border-r border-gray-200 dark:border-gray-600 pr-3">
            <div className="flex items-center space-x-3 text-gray-900 dark:text-gray-100">
              {/* Use a disabled checked checkbox purely for visual indication */}
              <Checkbox checked={true} readOnly={true} className="opacity-50" />
              <span>{selectedText}</span>
            </div>
            <div className="ml-3">
              {/* Actions Slot */}
              {renderActions && React.createElement(renderActions, renderActionsProps)}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300"
              disabled={allRowsSelected}
              onClick={selectAll}
            >
              Select all
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon="x"
              onClick={unselectAll}
              aria-label="Clear selection"
            />
          </div>
        </div>
      </div>
    </Transition>
  );
}
