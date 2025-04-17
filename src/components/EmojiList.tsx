import React from 'react';

interface EmojiListProps {
  onSelect: (emoji: string) => void; // Callback when an emoji is selected
}

const commonEmojis = ['😀', '😂', '😍', '👍', '🎉', '🤔', '😢', '🙏', '🚀', '💡'];

const EmojiList: React.FC<EmojiListProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded max-w-xs">
      {commonEmojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="text-xl p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
          aria-label={`Select emoji ${emoji}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiList;
