import React from 'react';
import './Spinner.css'; // Import the CSS file
import clsx from 'clsx'; // For combining class names

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  // Add any specific props if needed, e.g., size
  className?: string;
}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <svg
      className={clsx('spinner', className)} // Apply base spinner class and any passed className
      viewBox="0 0 50 50"
      {...props} // Spread other SVG props
    >
      <defs>
        {/* Gradient definition remains the same */}
        <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,110,219,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <circle
        stroke="url(#spinner-gradient)" // Reference the gradient ID
        className="spinner-path" // Apply animation class
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5" // Use camelCase
      ></circle>
    </svg>
  );
}