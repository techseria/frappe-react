import clsx from 'clsx';
import { FeatherIcon, FeatherIconName } from '../FeatherIcon'; // Adjust path if needed

// Define the structure of the item object
export interface CommandPaletteItemType {
  name: string; // Assuming 'name' is used as key like in Vue version
  title: string;
  icon?: FeatherIconName; // Use FeatherIconName type
  description?: string;
  disabled?: boolean;
  // Add any other relevant properties from the item object
}

interface CommandPaletteItemProps {
  item: CommandPaletteItemType;
  active: boolean;
}

export function CommandPaletteItem({ item, active }: CommandPaletteItemProps) {
  return (
    <div
      className={clsx(
        'flex w-full min-w-0 items-center rounded px-2 py-2 text-base font-medium text-ink-gray-8',
        { 'bg-surface-gray-3': active }, // Apply active class conditionally
        item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer' // Handle disabled state
      )}
    >
      {item.icon && (
        <FeatherIcon
          name={item.icon}
          className="mr-3 h-4 w-4 text-ink-gray-7 flex-shrink-0" // Added flex-shrink-0
        />
      )}
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {item.title}
      </span>
      {item.description && (
        <span
          className="ml-auto whitespace-nowrap pl-2 text-ink-gray-5"
        >
          {item.description}
        </span>
      )}
    </div>
  );
}