import React from 'react';

export type FeatherIconName = 
  | 'calendar'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'clock'
  | 'edit'
  | 'help-circle'
  | 'info'
  | 'plus'
  | 'search'
  | 'settings'
  | 'star'
  | 'trash-2'
  | 'x';

export interface FeatherIconProps {
  className?: string;
  name: FeatherIconName;
  strokeWidth?: number;
}

export const FeatherIcon: React.FC<FeatherIconProps> = ({ className, name }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <text x="0" y="15">{name}</text>
  </svg>
);
