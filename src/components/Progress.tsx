import { useMemo, ReactNode } from 'react';
import clsx from 'clsx'; // Utility for conditional classes

const MIN_VALUE = 0;
const MAX_VALUE = 100;

type ProgressSize = 'sm' | 'md' | 'lg' | 'xl';

interface ProgressProps {
  value: number; // Percentage value (0-100)
  size?: ProgressSize;
  label?: ReactNode;
  hint?: ReactNode | boolean; // Show percentage if true, custom node if ReactNode
  intervals?: boolean;
  intervalCount?: number;
  className?: string; // Class for the root container
}

export function Progress({
  value,
  size = 'sm',
  label,
  hint = false, // Default to not showing hint
  intervals = false,
  intervalCount = 6,
  className = '',
}: ProgressProps) {
  // Clamp value between MIN and MAX
  const clampedValue = Math.max(MIN_VALUE, Math.min(MAX_VALUE, value));

  const indicatorContainerClasses = useMemo(() => {
    const heightClass: Record<ProgressSize, string> = {
      sm: 'h-[2px]',
      md: 'h-1',
      lg: 'h-2',
      xl: 'h-3',
    };

    const layoutClasses = intervals
      ? 'flex space-x-1' // Use space-x for intervals
      : 'relative bg-surface-gray-2'; // Background for continuous

    return clsx(
      'overflow-hidden rounded-xl w-full', // Ensure full width and rounding
      heightClass[size],
      layoutClasses
    );
  }, [size, intervals]);

  const filledIntervalCount = useMemo(() => {
    if (!intervals) return 0;
    // Ensure intervalCount is at least 1 to avoid division by zero
    const count = Math.max(1, intervalCount);
    return Math.round((clampedValue / MAX_VALUE) * count);
  }, [clampedValue, intervals, intervalCount]);

  const renderHint = () => {
    if (hint === true) {
      return (
        <span className="text-base font-medium text-ink-gray-4">
          {clampedValue}%
        </span>
      );
    }
    if (hint) { // If it's a ReactNode
      return hint;
    }
    return null;
  };

  return (
    <div className={clsx("w-full space-y-[10px]", className)}>
      {(label || hint) && (
        <div className="flex items-baseline justify-between">
          {label ? (
            <span className="text-base font-medium text-ink-gray-8">
              {label}
            </span>
          ) : (
            <span /> // Empty span for alignment if no label
          )}
          <span className="self-end">
            {renderHint()}
          </span>
        </div>
      )}

      <div
        className={indicatorContainerClasses}
        role="progressbar"
        aria-valuemin={MIN_VALUE}
        aria-valuemax={MAX_VALUE}
        aria-valuenow={clampedValue}
      >
        {intervals ? (
          // Interval Progress Bar
          Array.from({ length: intervalCount }).map((_, index) => (
            <div
              key={index}
              className={clsx(
                'h-full w-full', // Each interval takes full height and width within flex item
                index < filledIntervalCount
                  ? 'bg-surface-gray-7' // Filled color
                  : 'bg-surface-gray-2' // Empty color
              )}
            />
          ))
        ) : (
          // Continuous Progress Bar
          <div
            className="h-full bg-surface-gray-7 transition-width duration-300 ease-in-out" // Added transition
            style={{ width: `${clampedValue}%` }}
          />
        )}
      </div>
    </div>
  );
}