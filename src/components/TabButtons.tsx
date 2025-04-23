import { RadioGroup } from '@headlessui/react';
import FeatherIcon from './FeatherIcon'; // Assuming FeatherIcon exists

interface TabButtonOption<T> {
  label?: string; // Label is optional if icon is provided
  value: T;
  icon?: string;
  hideLabel?: boolean;
}

interface TabButtonsProps<T extends string | number | boolean> {
  buttons: TabButtonOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function TabButtons<T extends string | number | boolean>({
  buttons,
  value,
  onChange,
  className = '',
}: TabButtonsProps<T>) {
  return (
    <RadioGroup value={value} onChange={onChange} className={className}>
      <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5 text-sm">
        {buttons.map((button) => (
          <RadioGroup.Option
            key={String(button.value)} // Ensure key is string
            value={button.value}
            className={({ active, checked }) =>
              `
              ${active ? 'ring-2 ring-offset-1 ring-offset-gray-100 dark:ring-offset-gray-700 ring-blue-500 dark:ring-blue-400 focus-visible:ring' : ''}
              ${checked
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow'
                : 'text-gray-700 dark:text-gray-300 hover:bg-white/[0.5] dark:hover:bg-black/[0.1]'
              }
              flex flex-1 justify-center items-center gap-2 whitespace-nowrap rounded-[7px] px-3 py-[5px] leading-none transition-all focus:outline-none cursor-pointer
              `
            }
          >
            {() => (
              <>
                {button.icon && (
                  <FeatherIcon
                    name={button.icon}
                    className="h-4 w-4"
                    aria-hidden="true" // Hide decorative icon from screen readers
                  />
                )}
                {button.label && !button.hideLabel && (
                  <RadioGroup.Label as="span" className="flex h-4 items-center">
                    {button.label}
                  </RadioGroup.Label>
                )}
                {/* For icon-only buttons, provide an accessible label */}
                {button.icon && (!button.label || button.hideLabel) && (
                   <span className="sr-only">{button.label || String(button.value)}</span>
                )}
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
