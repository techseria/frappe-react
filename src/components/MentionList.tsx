import React, { useState, useEffect } from 'react';

// Define a type for the suggestion items
interface MentionItem {
  id: string | number;
  label: string; // Text to display
  value?: any; // Optional value associated with the item
}

interface MentionListProps {
  items: MentionItem[]; // Array of suggestion items
  onSelect: (item: MentionItem) => void; // Callback when an item is selected
}

const MentionList: React.FC<MentionListProps> = ({ items, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle keyboard navigation (basic example)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
        event.preventDefault();
      } else if (event.key === 'ArrowDown') {
        setSelectedIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
        event.preventDefault();
      } else if (event.key === 'Enter') {
        if (items[selectedIndex]) {
          onSelect(items[selectedIndex]);
        }
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [items, selectedIndex, onSelect]);

  if (!items.length) {
    return null; // Don't render if no items
  }

  return (
    <div className="border rounded shadow-md bg-white max-h-60 overflow-y-auto py-1">
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          onMouseEnter={() => setSelectedIndex(index)} // Highlight on hover
          className={`block w-full text-left px-3 py-1.5 text-sm ${
            index === selectedIndex ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
          }`}
          aria-selected={index === selectedIndex}
          role="option"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default MentionList;
