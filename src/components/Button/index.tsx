import React from 'react';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'> {
  label?: string;
  theme?: string;
  prefix?: React.ReactNode;
  variant?: string;
}

const Button: React.FC<ButtonProps> = ({ label, theme, variant, prefix, children, ...props }) => {
  const variantClass = variant ? `btn-${variant}` : '';
  const themeClass = theme ? `btn-${theme}` : '';
  return (
    <button {...props} className={`btn ${variantClass} ${themeClass}`}>
      {prefix}
      {label || children}
    </button>
  );
};

export default Button;
