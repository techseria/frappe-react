import React, { useMemo } from 'react';
import { TabButtons } from '../TabButtons'; // Import the new TabButtons
import { Button } from '../Button/Button'; // Import Button

// Define the expected structure for options passed to the footer
interface ListFooterOptions {
  rowCount?: number;
  totalCount?: number;
  pageLengthOptions?: number[];
}

interface ListFooterProps {
  pageLength: number; // Current page length (controlled from parent)
  onPageLengthChange: (newLength: number) => void; // Callback to update page length
  onLoadMore: () => void; // Callback for load more action
  options: ListFooterOptions;
  className?: string;
  children?: React.ReactNode; // Allow overriding default content
  renderLeft?: React.ReactNode; // Slot equivalent
  renderRight?: React.ReactNode; // Slot equivalent
}

export function ListFooter({
  pageLength,
  onPageLengthChange,
  onLoadMore,
  options,
  className = '',
  children,
  renderLeft,
  renderRight,
}: ListFooterProps) {
  const {
    rowCount = 0,
    totalCount = 0,
    pageLengthOptions = [20, 50, 100], // Default options
  } = options;

  const showLoadMore = useMemo(() => {
    return rowCount > 0 && totalCount > 0 && rowCount < totalCount;
  }, [rowCount, totalCount]);

  const tabButtonsOptions = useMemo(() => {
    return pageLengthOptions.map((o) => ({ label: String(o), value: o }));
  }, [pageLengthOptions]);

  // If children are provided, render them instead of the default structure
  if (children) {
    return <div className={`p-2 ${className}`}>{children}</div>;
  }

  return (
    <div className={`flex justify-between items-center gap-2 p-2 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Left Slot */}
      {renderLeft !== undefined ? (
        renderLeft
      ) : (
        <TabButtons<number> // Specify the type for value
          buttons={tabButtonsOptions}
          value={pageLength}
          onChange={onPageLengthChange}
        />
      )}

      {/* Right Slot */}
      {renderRight !== undefined ? (
        renderRight
      ) : (
        <div className="flex items-center">
          {showLoadMore && (
            <Button
              variant="ghost" // Use ghost variant for less emphasis
              size="sm"
              label="Load More"
              onClick={onLoadMore}
            />
          )}
          {showLoadMore && (
            <div className="mx-3 h-5 border-l border-gray-300 dark:border-gray-600" />
          )}
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>{rowCount}</span>
            <span>of</span>
            <span>{totalCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
