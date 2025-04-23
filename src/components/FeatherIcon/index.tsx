import FeatherIcon from 'feather-icons-react';

export interface FeatherIconProps {
  className?: string;
  name: string;
  strokeWidth?: number;
}

export default function ({
  className,
  name,
  strokeWidth,
}: FeatherIconProps) {
  return (
    <FeatherIcon icon={name || ''} className={className} strokeWidth={strokeWidth} />
  );
}
