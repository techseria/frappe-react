import toast, { ToastOptions, ToastPosition, Toast as ToastType } from 'react-hot-toast';
import { ReactNode } from 'react';
import { FeatherIcon, FeatherIconName } from '../components/FeatherIcon';
import clsx from 'clsx';

// Define custom toast options
interface ShowToastOptions extends ToastOptions {
  title?: ReactNode;
  message: ReactNode;
  icon?: FeatherIconName;
  iconClasses?: string;
  type?: 'success' | 'error' | 'info' | 'warning' | 'loading';
  actions?: ReactNode;
  position?: ToastPosition;
  duration?: number;
}

// Map types to icons and classes
const typeIconMap: Record<NonNullable<ShowToastOptions['type']>, FeatherIconName> = {
  success: 'check', error: 'x', info: 'info', warning: 'help-circle', loading: 'clock',
};
const typeIconClasses: Record<NonNullable<ShowToastOptions['type']>, string> = {
  success: 'text-green-500', error: 'text-red-500', info: 'text-blue-500', warning: 'text-yellow-500', loading: 'animate-spin text-gray-700',
};

// Custom Toast component structure - Defined as a standard function
function CustomToast({ t, options }: { t: ToastType; options: ShowToastOptions }) {
  const iconName = options.icon || (options.type ? typeIconMap[options.type] : undefined);
  const defaultIconClasses = options.type ? typeIconClasses[options.type] : 'text-gray-700';
  const finalIconClasses = clsx(defaultIconClasses, options.iconClasses);

  return (
    <div
      className={clsx(
        'my-2 min-w-[15rem] max-w-[40rem] rounded-lg border bg-surface-white p-4 shadow-md'
      )}
    >
      <div className="flex items-start">
        {/* Icon */}
        {iconName && (
          <div className="mr-3 flex-shrink-0 pt-0.5">
            <FeatherIcon name={iconName} className={clsx('h-5 w-5', finalIconClasses)} />
          </div>
        )}
        {/* Content */}
        <div className="flex-1">
          {options.title && (
            <p className={clsx("text-base font-medium text-ink-gray-9", options.message ? 'mb-1' : '')}>
              {options.title}
            </p>
          )}
          {/* Render message directly */}
          <div className="text-base text-ink-gray-5">{options.message}</div>
        </div>
        {/* Actions/Close */}
        <div className="ml-auto pl-2 flex-shrink-0">
          {options.actions ? options.actions : (
            <button
              type="button"
              className="grid h-5 w-5 place-items-center rounded hover:bg-surface-gray-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              onClick={() => toast.dismiss(t.id)}
              aria-label="Close"
            >
              <FeatherIcon name="x" className="h-4 w-4 text-ink-gray-7" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


// Main function to show toasts
export function showToast(options: ShowToastOptions) {
  const {
    duration = 5000,
    position = 'top-center',
    ...restOptions
  } = options;

  toast(
    (t: ToastType) => <CustomToast t={t} options={options} />,
    {
      id: restOptions.id,
      duration: options.type === 'loading' ? Infinity : duration,
      position,
      ariaProps: restOptions.ariaProps,
      className: restOptions.className,
      style: restOptions.style,
      iconTheme: restOptions.iconTheme,
    }
  );
}

// Helper functions
export const toastSuccess = (message: ReactNode, options?: Omit<ShowToastOptions, 'message' | 'type'>) => {
    showToast({ ...options, message, type: 'success' });
};
export const toastError = (message: ReactNode, options?: Omit<ShowToastOptions, 'message' | 'type'>) => {
    showToast({ ...options, message, type: 'error' });
};
export const toastInfo = (message: ReactNode, options?: Omit<ShowToastOptions, 'message' | 'type'>) => {
    showToast({ ...options, message, type: 'info' });
};
export const toastWarning = (message: ReactNode, options?: Omit<ShowToastOptions, 'message' | 'type'>) => {
    showToast({ ...options, message, type: 'warning' });
};
export const toastLoading = (message: ReactNode, options?: Omit<ShowToastOptions, 'message' | 'type'>) => {
    const id = options?.id || 'loading-toast';
    showToast({ ...options, id, message, type: 'loading' });
    return id;
};
export const dismissToast = (id: string) => {
    toast.dismiss(id);
}

// Reminder for Toaster setup
// import { Toaster } from 'react-hot-toast';
// function App() { return (<div> <YourApp /> <Toaster position="top-center" /> </div>); }
