// Define props if needed, e.g., for size or className
interface GreenCheckIconProps {
  className?: string;
  // Add other props like width, height if you want to make it configurable
}

export function GreenCheckIcon({ className, ...props }: GreenCheckIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} // Allow passing className
      {...props} // Pass other standard SVG props
    >
      <path
        d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16z"
        fill="#59B179"
      />
      <path
        d="M9.333 17.227l1.333 1.333 2.667 2.667 5.333-5.333 2.667-2.667 1.333-1.333"
        stroke="#fff"
        strokeWidth="2" // Use camelCase for JSX attributes
        strokeMiterlimit="10"
        strokeLinecap="round" // Use camelCase
        strokeLinejoin="round" // Use camelCase
      />
    </svg>
  );
}