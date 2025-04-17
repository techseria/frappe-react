import React from 'react';

// Define and export a type for menu items
export interface MenuItem { // Added export
  id: string | number;
  label: string;
  action: () => void; // Function to call when item is clicked
  disabled?: boolean;
  icon?: React.ReactNode; // Optional icon element
}

interface MenuProps {
  items: MenuItem[]; // Array of menu items
  className?: string; // Optional additional CSS classes
}

const Menu: React.FC<MenuProps> = ({ items, className = '' }) => {
  if (!items.length) {
    return null;
  }

  return (
    <nav className={`flex items-center gap-1 p-1 border rounded bg-gray-50 ${className}`} role="menubar">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={item.action}
          disabled={item.disabled}
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-sm ${
            item.disabled
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:bg-gray-200'
          }`}
          role="menuitem"
          aria-label={item.label}
        >
          {item.icon && <span aria-hidden="true">{item.icon}</span>}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Menu;
