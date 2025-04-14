import { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Alias to avoid naming conflict

// Define props, extending standard anchor attributes
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string; // Make 'to' required, as it's fundamental
  children: ReactNode;
  className?: string;
}

export function Link({ to, children, className = '', ...props }: LinkProps) {
  const isExternal = to.startsWith('http');

  const baseClasses = "cursor-pointer text-blue-500 hover:text-blue-600";
  const combinedClassName = `${baseClasses} ${className}`.trim();

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer" // Good practice for external links
        className={combinedClassName}
        {...props} // Spread other anchor attributes like title, etc.
      >
        {children}
      </a>
    );
  } else {
    // For internal links, use React Router's Link component
    // We need to filter out props that are not valid for RouterLink if necessary,
    // but for common ones like className, title, it should be fine.
    // If specific anchor-only props cause issues, filter them out before spreading.
    return (
      <RouterLink
        to={to}
        className={combinedClassName}
        {...props} // Spread other relevant attributes
      >
        {children}
      </RouterLink>
    );
  }
}