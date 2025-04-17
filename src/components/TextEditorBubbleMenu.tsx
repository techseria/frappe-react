import React from 'react';
import Menu, { MenuItem } from './Menu'; // Reuse the Menu component

interface TextEditorBubbleMenuProps {
  items: MenuItem[]; // Actions to display in the menu
  // In a real implementation, props for positioning (e.g., top, left) would be needed
  // based on editor selection state.
  isVisible?: boolean; // Control visibility
  className?: string;
}

const TextEditorBubbleMenu: React.FC<TextEditorBubbleMenuProps> = ({
  items,
  isVisible = true, // Default to visible for placeholder
  className = '',
}) => {
  if (!isVisible || !items.length) {
    return null;
  }

  // Basic absolute positioning for demonstration
  // A real implementation would calculate position based on editor state
  const style: React.CSSProperties = {
    position: 'absolute',
    top: '50px', // Example position
    left: '50px', // Example position
    zIndex: 50,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  };

  return (
    <div style={style} className={className}>
      <Menu items={items} className="bg-white shadow-lg" />
    </div>
  );
};

export default TextEditorBubbleMenu;
