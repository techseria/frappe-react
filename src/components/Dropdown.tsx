import React, { useState } from 'react';

export interface DropdownOption {
  icon: React.FC<{ className?: string }>;
  label: string;
  onClick: () => void;
  condition: () => boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  children: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, children, className }) => {
  const [open, setOpen] = useState(false);
  
  const filteredOptions = options.filter(option => option.condition());

  return (
    <div className={`relative inline-block ${className || ''}`}>
      <div onClick={() => setOpen(!open)}>
        {children}
      </div>
      {open && filteredOptions.length > 0 && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                option.onClick();
                setOpen(false);
              }}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <option.icon className="mr-2" />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
