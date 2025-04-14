import React from 'react';

export interface FeatherIconProps {
  className?: string;
  name: string;
}

export const FeatherIcon: React.FC<FeatherIconProps> = ({ className, name }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <text x="0" y="15">{name}</text>
  </svg>
);
