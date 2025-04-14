import React, { ReactNode, useMemo } from 'react';
import {
  Switch as HeadlessSwitch,
  SwitchGroup as HeadlessSwitchGroup,
  SwitchLabel as HeadlessSwitchLabel,
  SwitchDescription as HeadlessSwitchDescription,
} from '@headlessui/react';
import clsx from 'clsx';

type SwitchSize = 'sm' | 'md';

interface SwitchProps {
  size?: SwitchSize;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  checked: boolean; // Use 'checked' for controlled component
  onChange: (checked: boolean) => void; // Standard onChange handler
  className?: string; // Allow className on the group
}

enum SwitchVariant {
  DEFAULT,
  ONLY_LABEL,
  WITH_LABEL_AND_DESCRIPTION,
}

export function Switch({
  size = 'sm',
  label,
  description,
  disabled = false,
  checked,
  onChange,
  className = '',
}: SwitchProps) {

  const switchType = useMemo(() => {
    if (label && description) {
      return SwitchVariant.WITH_LABEL_AND_DESCRIPTION;
    }
    if (label) {
      return SwitchVariant.ONLY_LABEL;
    }
    return SwitchVariant.DEFAULT;
  }, [label, description]);

  // --- Class Calculations (similar logic to Vue computed props) ---

  const switchGroupClasses = useMemo(() => {
    const base = ['flex', 'justify-between'];
    let variantClasses: string[] = [];

    if (switchType === SwitchVariant.ONLY_LABEL) {
      variantClasses = [
        'group', 'items-center', 'space-x-3', 'cursor-pointer', 'rounded',
        'focus-visible:bg-surface-gray-2', 'focus-visible:outline-none',
        'focus-visible:ring-1', 'focus-visible:ring-outline-gray-3',
        disabled
          ? 'cursor-not-allowed'
          : 'hover:bg-surface-gray-3 active:bg-surface-gray-4',
        size === 'md' ? 'px-3 py-1.5' : 'px-2.5 py-1.5',
      ];
    } else if (switchType === SwitchVariant.WITH_LABEL_AND_DESCRIPTION) {
      variantClasses = [
        'items-start',
        size === 'md' ? 'space-x-3.5' : 'space-x-2.5',
      ];
    }
    // Add DEFAULT variant specific classes if any

    return clsx(base, variantClasses, className);
  }, [switchType, disabled, size, className]);

  const labelContainerClasses = useMemo(() => {
    return clsx('flex', 'flex-col', 'text-left', 'space-y-0.5');
  }, []);

  const switchLabelClasses = useMemo(() => {
    return clsx(
      'font-medium', 'leading-normal',
      disabled && switchType === SwitchVariant.ONLY_LABEL
        ? 'text-ink-gray-4'
        : 'text-ink-gray-8',
      size === 'md' ? 'text-lg' : 'text-base'
    );
  }, [disabled, switchType, size]);

  const switchDescriptionClasses = useMemo(() => {
    return clsx('max-w-xs', 'text-p-base', 'text-ink-gray-7');
  }, []);

  const switchClasses = useMemo(() => {
    return clsx(
      'relative inline-flex flex-shrink-0 items-center rounded-full border-transparent transition-colors duration-100 ease-in-out',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3',
      disabled
        ? 'cursor-not-allowed bg-surface-gray-3'
        : checked
          ? 'bg-surface-gray-7 hover:bg-surface-gray-6 active:bg-surface-gray-5 group-hover:enabled:bg-surface-gray-6'
          : 'bg-surface-gray-4 hover:bg-gray-400 active:bg-gray-500 group-hover:enabled:bg-gray-400',
      size === 'md' ? 'h-5 w-8 border-[3px]' : 'h-4 w-[26px] border-2',
      // Note: Headless UI handles the cursor based on disabled state, explicit cursor-pointer might not be needed here
    );
  }, [checked, disabled, size]);

  const switchCircleClasses = useMemo(() => {
    return clsx(
      'pointer-events-none inline-block transform rounded-full bg-surface-white shadow ring-0 transition duration-100 ease-in-out',
      size === 'md' ? 'h-3.5 w-3.5' : 'h-3 w-3',
      size === 'md'
        ? checked ? 'translate-x-3' : 'translate-x-0'
        : checked ? 'translate-x-2.5' : 'translate-x-0'
    );
  }, [checked, size]);

  // Handle spacebar press on the group when only label is present
  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (switchType === SwitchVariant.ONLY_LABEL && event.key === ' ') {
      event.preventDefault(); // Prevent scrolling
      if (!disabled) {
        onChange(!checked);
      }
    }
  };

  return (
    <HeadlessSwitchGroup
      as="div"
      // Add tabindex only if it's focusable via label click/space
      tabIndex={switchType === SwitchVariant.ONLY_LABEL && !disabled ? 0 : -1}
      onKeyUp={handleKeyUp}
      className={switchGroupClasses}
    >
      {(label || description) && (
        <span className={labelContainerClasses}>
          {label && (
            <HeadlessSwitchLabel className={switchLabelClasses} passive={disabled}>
              {label}
            </HeadlessSwitchLabel>
          )}
          {description && (
            <HeadlessSwitchDescription className={switchDescriptionClasses}>
              {description}
            </HeadlessSwitchDescription>
          )}
        </span>
      )}
      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={switchClasses}
      >
        <span aria-hidden="true" className={switchCircleClasses} />
      </HeadlessSwitch>
    </HeadlessSwitchGroup>
  );
}