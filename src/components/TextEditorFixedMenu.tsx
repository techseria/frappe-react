import React from 'react';
import Menu, { MenuItem } from './Menu'; // Reuse the Menu component

interface TextEditorFixedMenuProps {
  items: MenuItem[]; // Actions to display in the menu
  className?: string;
}

const TextEditorFixedMenu: React.FC<TextEditorFixedMenuProps> = ({ items, className = '' }) => {
  if (!items.length) {
    return null;
  }

  // Basic fixed positioning at the bottom for demonstration
  const style: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    borderTop: '1px solid #e5e7eb', // Example border
  };

  return (
    <div style={style} className={`bg-white p-1 ${className}`}>
      <Menu items={items} className="justify-center" /> {/* Center items */}
    </div>
  );
};

export default TextEditorFixedMenu;
