import React, { useState, ChangeEvent } from 'react';
import { TextInput } from './TextInput';
import ListView from './ListView/ListView'; // Corrected import for default export

interface Option {
  label: string;
  value: string;
}

interface AutocompleteProps {
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const AutocompleteV2: React.FC<AutocompleteProps> = ({ options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );

  const columns = [{ key: 'label', title: 'Label' }];

  return (
    <div>
      <TextInput
        placeholder={placeholder}
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <div style={{
          position: 'absolute',
          zIndex: 10,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <ListView
            columns={columns}
            rows={filteredOptions}
            rowKey="value"
          >
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setQuery(option.label);
                  setIsOpen(false);
                }}
                style={{ padding: '8px', cursor: 'pointer' }}
              >
                {option.label}
              </div>
            ))}
          </ListView>
        </div>
      )}
    </div>
  );

}

export default AutocompleteV2;
