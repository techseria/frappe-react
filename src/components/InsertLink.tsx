import React, { useState, ChangeEvent } from 'react';
import { Button } from './Button/Button'; // Assuming Button component exists
import { TextInput } from './TextInput'; // Assuming TextInput component exists
// Removed unused FeatherIcon import

interface InsertLinkProps {
  initialUrl?: string;
  onLinkSubmit: (url: string) => void; // Callback with the submitted URL
}

const InsertLink: React.FC<InsertLinkProps> = ({ initialUrl = '', onLinkSubmit }) => {
  const [url, setUrl] = useState(initialUrl);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = () => {
    // Basic validation: check if URL is not empty
    if (url.trim()) {
      onLinkSubmit(url.trim());
      setUrl(''); // Clear input after submit
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border rounded">
      <TextInput
        type="url"
        placeholder="Enter URL (e.g., https://example.com)"
        value={url}
        onChange={handleChange}
        className="flex-grow"
        aria-label="Link URL"
      />
      <Button
        variant="solid" // Use 'solid' or another valid variant
        theme="blue"    // Use a valid theme
        onClick={handleSubmit}
        disabled={!url.trim()} // Disable if input is empty
        iconLeft="check" // Use 'check' icon for submit
        aria-label="Submit link"
      >
        {/* Optional: Add text like "Insert" */}
      </Button>
    </div>
  );
};

export default InsertLink;
