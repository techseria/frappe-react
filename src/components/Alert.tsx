import { ReactNode } from 'react';

type AlertProps = {
  title?: string;
  type?: 'warning';
  children?: ReactNode;
  actions?: ReactNode;
};

export default function Alert({ title, type = 'warning', children, actions }: AlertProps) {
  const classes = {
    warning: 'text-ink-gray-7 bg-surface-blue-1',
  }[type];

  return (
    <div className="block w-full">
      <div className={`flex items-start rounded-md px-4 py-3.5 text-base md:px-5 ${classes}`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.8"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 10.5C12.5523 10.5 13 10.9477 13 11.5V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V11.5C11 10.9477 11.4477 10.5 12 10.5ZM13 7.99976C13 7.44747 12.5523 6.99976 12 6.99976C11.4477 6.99976 11 7.44747 11 7.99976V8.1C11 8.65228 11.4477 9.1 12 9.1C12.5523 9.1 13 8.65228 13 8.1V7.99976Z"
            fill="#318AD8"
          />
        </svg>
        <div className="ml-2 w-full">
          <div className="flex flex-col md:flex-row md:items-baseline">
            {title && <h3 className="text-lg font-medium text-ink-gray-9">{title}</h3>}
            <div className="mt-1 md:ml-2 md:mt-0">
              {children}
            </div>
            {actions && <div className="mt-3 md:ml-auto md:mt-0">
              {actions}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
