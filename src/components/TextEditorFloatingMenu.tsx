import React from 'react';
import Menu, { MenuItem } from './Menu'; // Reuse the Menu component

interface TextEditorFloatingMenuProps {
  items: MenuItem[]; // Actions to display in the menu
  // In a real implementation, props for positioning would be needed
  isVisible?: boolean; // Control visibility
  className?: string;
}

const TextEditorFloatingMenu: React.FC<TextEditorFloatingMenuProps> = ({
  items,
  isVisible = true, // Default to visible for placeholder
  className = '',
}) => {
  if (!isVisible || !items.length) {
    return null;
  }

  // Basic absolute positioning for demonstration
  const style: React.CSSProperties = {
    position: 'absolute',
    top: '10px', // Example position (different from bubble)
    left: '10px', // Example position (different from bubble)
    zIndex: 50,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  return (
    <div style={style} className={className}>
      {/* Use Menu but maybe with different styling */}
      <Menu items={items} className="bg-gray-100 border-gray-300" />
    </div>
  );
};

export default TextEditorFloatingMenu;
