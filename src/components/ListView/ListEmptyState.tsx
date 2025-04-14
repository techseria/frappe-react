import React, { useContext } from 'react';
import { Button, ButtonProps } from '../Button/Button'; // Assuming Button component exists and exports props type
// Assuming ListContext is defined elsewhere (e.g., ListView.tsx) and imported
// import { ListContext } from './ListView'; // Placeholder

// TODO: Define ListContextValue properly, likely in ListView.tsx or a types file
interface EmptyStateOptions {
  title?: string;
  description?: string;
  button?: ButtonProps & { label?: string }; // Reuse ButtonProps and add label if needed
}

interface ListContextValue {
  // ... other context properties
  options: {
    // ... other options
    emptyState?: EmptyStateOptions;
  };
  // ... rest of context
}

// Placeholder context - replace with actual import
const ListContext = React.createContext<ListContextValue | null>(null);

interface ListEmptyStateProps {
  children?: React.ReactNode; // To allow overriding the default content
}

export function ListEmptyState({ children }: ListEmptyStateProps) {
  const list = useContext(ListContext);

  // Default content if no context or emptyState options are provided
  const defaultTitle = 'No items found';
  const defaultDescription = 'There are no items to display in this list.';

  const emptyStateOptions = list?.options?.emptyState;
  const title = emptyStateOptions?.title ?? defaultTitle;
  const description = emptyStateOptions?.description ?? defaultDescription;
  const buttonProps = emptyStateOptions?.button;

  // If children are provided, render them instead of the default structure
  if (children) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
      <div className="text-lg font-medium text-gray-800 dark:text-gray-200">{title}</div>
      {description && (
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </div>
      )}
      {buttonProps && (
        <Button {...buttonProps} className={`mt-4 ${buttonProps.className || ''}`}>
          {/* Button component should handle its own label/children */}
          {buttonProps.label || buttonProps.children}
        </Button>
      )}
    </div>
  );
}
