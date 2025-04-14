import { ReactNode } from 'react';

interface ListItemProps {
  title: ReactNode;
  subtitle?: ReactNode; // Accept ReactNode for flexibility
  actions?: ReactNode; // Slot content for actions
  className?: string; // Allow passing additional classes
}

export function ListItem({ title, subtitle, actions, className = '' }: ListItemProps) {
  // Combine base classes with any provided className
  const combinedClassName = `flex items-center justify-between py-3 ${className}`.trim();

  return (
    <div className={combinedClassName}>
      {/* Left section for title and subtitle */}
      <div>
        <h3 className="text-base font-medium text-gray-900">
          {title}
        </h3>
        {/* Conditionally render subtitle */}
        {subtitle && (
          <div className="mt-1 text-base text-gray-600">
            {subtitle}
          </div>
        )}
      </div>

      {/* Right section for actions */}
      {actions && (
        <div>
          {actions}
        </div>
      )}
    </div>
  );
}