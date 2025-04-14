export type Size = 'sm' | 'md';

export interface CommonFormControlProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  description?: string;
  placeholder?: string;
  size?: Size;
}

export interface TextInputProps extends CommonFormControlProps {
  size?: Size;
  type?: string;
}

export interface SelectProps extends CommonFormControlProps {
  size?: Size;
  options: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
}

export interface CheckboxProps extends CommonFormControlProps {
  variantSize?: Size;
}

export interface AutocompleteProps extends CommonFormControlProps {
  options: Array<
    string | {
      label: string;
      value: string | number | boolean;
      disabled?: boolean;
    }
  >;
  size?: Size;
  className?: string;
  id?: string;
}

export interface TextareaProps extends CommonFormControlProps {
  size?: Size;
  variant?: 'subtle' | 'outline';
  debounce?: number;
}