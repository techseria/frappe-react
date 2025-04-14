import React from 'react';

interface MaximizeIconProps {
  className?: string;
}

const MaximizeIcon: React.FC<MaximizeIconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <rect x="4" y="4" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default MaximizeIcon;
