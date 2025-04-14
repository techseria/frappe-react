import React from 'react';

interface HelpIconProps {
  className?: string;
}

const HelpIcon: React.FC<HelpIconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
    <text x="10" y="14" textAnchor="middle" fill="currentColor" fontSize="10">?</text>
  </svg>
);

export default HelpIcon;
