import React from 'react';

interface LightningIconProps {
  className?: string;
}

const LightningIcon: React.FC<LightningIconProps> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M11 0L0 10h7v10l9-10h-7z" />
  </svg>
);

export default LightningIcon;
