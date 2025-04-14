import React, { Fragment, useMemo, ReactNode, ComponentType } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from './Button/Button'; // Assuming Button exists
import { FeatherIcon, FeatherIconName } from './FeatherIcon'; // Assuming FeatherIcon exists

// Types for Dropdown Options
type RouteTarget = string; // Simplified route type for now

interface DropdownOption {
  label: string;
  icon?: FeatherIconName | ComponentType<{ className?: string }>; // Allow component icons
  component?: ComponentType<{ active: boolean }>; // Custom component for the item
  onClick?: () => void;
  route?: RouteTarget;
  condition?: () => boolean;
}

interface DropdownGroupOption {
  key?: string | number; // Added key for React list rendering
  group?: string; // Group title (optional if hideLabel is true)
  items: DropdownOption[];
  hideLabel?: boolean;
}

// Union type for options array
type DropdownOptions = Array<DropdownOption | DropdownGroupOption>;

interface DropdownProps {
  buttonProps?: ButtonProps; // Props for the default trigger button
  options?: DropdownOptions; // Menu items configuration
  placement?: 'left' | 'right' | 'center'; // Menu alignment
  children?: ReactNode; // Custom trigger element (overrides default button)
  className?: string; // Class for the main wrapper div
}

// Helper to normalize and filter options
const useProcessedOptions = (options: DropdownOptions = [], navigate: ReturnType<typeof useNavigate>) => {
  return useMemo(() => {
    const normalizeItem = (option: DropdownOption): DropdownOption | null => {
      if (option.condition && !option.condition()) {
        return null; // Filter out based on condition
      }

      let clickHandler = option.onClick;
      if (option.route) {
        // Override onClick if route is present
        clickHandler = () => navigate(option.route as string); // Basic navigation
      }

      return {
        ...option,
        onClick: clickHandler,
      };
    };

    const groups: DropdownGroupOption[] = [];
    let currentGroupItems: DropdownOption[] = [];
    let groupKeyCounter = 0;

    const finalizeCurrentGroup = () => {
      if (currentGroupItems.length > 0) {
        groups.push({
          key: `implicit-${groupKeyCounter++}`,
          items: currentGroupItems,
          hideLabel: true, // Implicit group has no label
        });
        currentGroupItems = [];
      }
    };

    for (const option of options) {
      if (option == null) continue;

      if ('group' in option) {
        // Finalize any previous implicit group
        finalizeCurrentGroup();
        // Process the explicit group
        const filteredItems = option.items
          .map(normalizeItem)
          .filter((item): item is DropdownOption => item !== null);

        if (filteredItems.length > 0) {
          groups.push({
            ...option,
            key: option.key ?? option.group ?? `explicit-${groupKeyCounter++}`,
            items: filteredItems,
          });
        }
      } else {
        // It's a single item, add to the current implicit group
        // Explicitly assert type here as TS doesn't narrow it automatically in the else block
        const normalized = normalizeItem(option as DropdownOption);
        if (normalized) {
          currentGroupItems.push(normalized);
        }
      }
    }

    // Finalize any remaining implicit group
    finalizeCurrentGroup();

    return groups;
  }, [options, navigate]);
};


export function Dropdown({
  buttonProps,
  options = [],
  placement = 'left',
  children,
  className = '',
}: DropdownProps) {
  const navigate = useNavigate();
  const processedGroups = useProcessedOptions(options, navigate);

  const originClass = {
    left: 'origin-top-left left-0',
    right: 'origin-top-right right-0',
    center: 'origin-top', // Centering might need more CSS depending on context
  }[placement];

  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <Menu.Button as={Fragment}>
        {children || (
          <Button {...buttonProps}>
            {buttonProps?.label || buttonProps?.children || 'Options'}
          </Button>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute z-10 mt-2 min-w-[160px] divide-y divide-gray-100 dark:divide-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ${originClass}`}
        >
          {processedGroups.map((group) => (
            <div key={group.key} className="p-1.5">
              {group.group && !group.hideLabel && (
                <div className="flex h-7 items-center px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {group.group}
                </div>
              )}
              {group.items.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) =>
                    item.component ? (
                      // Render custom component if provided
                      React.createElement(item.component, { active })
                    ) : (
                      // Default button rendering
                      <button
                        onClick={item.onClick}
                        className={`
                          ${active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}
                          group flex w-full items-center rounded px-2 py-1.5 text-sm
                        `} // Adjusted padding/text size
                      >
                        {item.icon && (
                          typeof item.icon === 'string' ? (
                            <FeatherIcon
                              name={item.icon}
                              className="mr-2 h-4 w-4 flex-shrink-0"
                              aria-hidden="true"
                            />
                          ) : (
                             React.createElement(item.icon, { className: "mr-2 h-4 w-4 flex-shrink-0" })
                          )
                        )}
                        <span className="whitespace-nowrap">{item.label}</span>
                      </button>
                    )
                  }
                </Menu.Item>
              ))}
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
