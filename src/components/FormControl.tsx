import React, { useState, useEffect } from 'react';
import { TextInput } from './TextInput';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Checkbox } from './Checkbox';
import { Autocomplete } from './Autocomplete';
import { DoctypeField } from '../types/doctype';
import { validateField } from '../utils/validateField';

import { useId } from '../utils/useId';
import {
  Size,
  CommonFormControlProps,
  CheckboxProps,
} from '../types/components';
import {
  transformSelectOptions,
  transformAutocompleteOptions
} from '../utils/transformOptions';

type TextInputTypes = React.ComponentProps<typeof TextInput>['type'];

interface FormControlProps extends CommonFormControlProps {
  type?: TextInputTypes | 'textarea' | 'select' | 'checkbox' | 'autocomplete';
  size?: Size;
  children?: React.ReactNode | 
            (string | { label: string; value: string })[];
  doctypeField?: DoctypeField;
  value?: any;
  onChange?: 
    | ((value: any, isValid: boolean) => void)
    | React.ChangeEventHandler<HTMLInputElement>;
}

export function FormControl(props: FormControlProps) {
  const [error, setError] = useState<string | undefined>();
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    if (props.doctypeField) {
      const validationError = validateField(value, props.doctypeField);
      setError(validationError);
      props.onChange?.(value, !validationError);
    }
  }, [value, props.doctypeField]);

  const validate = (value: any) => {
    if (!props.doctypeField) return;
    const validationError = validateField(value, props.doctypeField);
    setError(validationError);
    props.onChange?.(value, !validationError);
  };

  const handleChange = (newValue: any) => {
    setValue(newValue);
    validate(newValue);
  };

  const handleBlur = () => {
    validate(value);
  };
  const {
    doctypeField,
    label = doctypeField?.label,
    description,
    type = doctypeField?.fieldtype === 'Select' ? 'select' : 
          doctypeField?.fieldtype === 'Date' ? 'date' :
          doctypeField?.fieldtype === 'Int' || doctypeField?.fieldtype === 'Float' ? 'number' :
          'text',
    size = 'sm',
    required = doctypeField?.required || false,
    className = '',
    disabled = doctypeField?.read_only || false,
    placeholder,
    children: children = doctypeField?.fieldtype === 'Select' && 'options' in doctypeField ? 
               doctypeField.options : props.children,
    ...rest
  } = props;

  const id = useId();

  const labelClasses = `text-ink-gray-5 ${size === 'sm' ? 'text-xs' : 'text-base'}`;
  const descriptionClasses = `text-ink-gray-5 ${size === 'sm' ? 'text-xs' : 'text-base'}`;

  if (type === 'checkbox') {
    const checkboxProps: CheckboxProps = {
      id,
      label,
      variantSize: size,
      className,
      required,
      disabled
    };
    return <Checkbox {...checkboxProps} />;
  }

  return (
    <div className={`space-y-1.5 ${className}`}>
      {error && (
        <p className="text-ink-red-3 text-xs">
          {error}
        </p>
      )}
      {label && (
        <label className={labelClasses} htmlFor={id}>
          {label}
          {required && <span className="text-ink-red-3">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <Select
          id={id}
          disabled={disabled}
          options={Array.isArray(children) ? 
            transformSelectOptions(children) : 
            []}
          placeholder={placeholder || doctypeField?.label}
          value={value}
          onChange={(val) => handleChange(val)}
        />
      ) : type === 'autocomplete' ? (
        <Autocomplete
          label={label}
          options={Array.isArray(children) ? 
            transformAutocompleteOptions(children) : 
            []}
          placeholder={placeholder || doctypeField?.label}
        />
      ) : type === 'textarea' ? (
        <Textarea
          id={id}
          size={size}
          disabled={disabled}
          required={required}
          placeholder={placeholder || doctypeField?.label}
          className={className}
          label={label}
        />
      ) : (
        <TextInput
          id={id}
          type={type}
          required={required}
          placeholder={placeholder || doctypeField?.label}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            handleChange(value);
            if (typeof props.onChange === 'function' && props.onChange.length <= 1) {
              (props.onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
            }
          }}
          onBlur={handleBlur}
          error={!!error}
          {...rest}
        />
      )}

      {description && <p className={descriptionClasses}>{description}</p>}
    </div>
  );
}
