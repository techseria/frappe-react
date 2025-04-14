import React from 'react';

interface MinimizeIconProps {
  className?: string;
}

const MinimizeIcon: React.FC<MinimizeIconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <rect x="4" y="9" width="12" height="2" />
  </svg>
);

export default MinimizeIcon;
