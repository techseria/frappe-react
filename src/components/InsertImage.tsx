import React, { ChangeEvent, useRef } from 'react';
import { Button } from './Button/Button'; // Use named import
// Removed unused FeatherIcon import

interface InsertImageProps {
  onImageSelect: (file: File) => void; // Callback with the selected image file
}

const InsertImage: React.FC<InsertImageProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*" // Accept common image types
        onChange={handleFileChange}
        className="hidden" // Hide the default input
        aria-label="Upload image"
      />
      {/* Use a button to trigger the hidden file input */}
      <Button
        variant="subtle" // Changed variant to 'subtle'
        onClick={triggerFileInput}
        iconLeft="plus" // Pass the icon name string directly
        aria-label="Insert image"
      >
        {/* Optional: Add text like "Insert Image" */}
      </Button>
    </div>
  );
};

export default InsertImage;
