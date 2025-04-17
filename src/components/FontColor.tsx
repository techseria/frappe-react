import React, { ChangeEvent } from 'react';

interface FontColorProps {
  value?: string; // Current color value (e.g., '#RRGGBB')
  onChange: (color: string) => void; // Callback when color changes
}

const FontColor: React.FC<FontColorProps> = ({ value = '#000000', onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="inline-flex items-center gap-2 p-1 border rounded">
      <label htmlFor="font-color-picker" className="text-sm sr-only">Font Color</label>
      <input
        id="font-color-picker"
        type="color"
        value={value}
        onChange={handleChange}
        className="w-6 h-6 border-none cursor-pointer p-0 rounded"
        title="Select font color"
      />
      {/* Optionally display the hex code */}
      {/* <span className="text-xs font-mono">{value}</span> */}
    </div>
  );
};

export default FontColor;
