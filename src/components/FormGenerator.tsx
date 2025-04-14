import React from 'react';
import { FormControl } from './FormControl';
import { DoctypeDefinition } from '../types/doctype';
import { validateField } from '../utils/validateField';

interface FormGeneratorProps {
  doctype: DoctypeDefinition;
  onSubmit: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
}

export function FormGenerator({ doctype, onSubmit, initialValues = {} }: FormGeneratorProps) {
  // Initialize all fields with empty values if not provided
  const initialFieldValues = doctype.fields.reduce((acc, field) => {
    acc[field.fieldname] = initialValues[field.fieldname] ?? '';
    return acc;
  }, {} as Record<string, any>);

  const [values, setValues] = React.useState<Record<string, any>>(initialFieldValues);
  const [fieldValidity, setFieldValidity] = React.useState<Record<string, boolean>>(
    doctype.fields.reduce((acc, field) => {
      acc[field.fieldname] = field.required ? false : true;
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    // Recalculate validity when values or field validity changes
    const allFieldsValid = Object.values(fieldValidity).every(valid => valid);
    setIsValid(allFieldsValid);
  }, [values, fieldValidity]);

  const handleChange = (fieldname: string, value: any, fieldIsValid: boolean) => {
    setValues(prev => ({
      ...prev,
      [fieldname]: value
    }));
    setFieldValidity(prev => ({
      ...prev,
      [fieldname]: fieldIsValid
    }));
    
    // Check overall form validity
    const allFieldsValid = Object.values({
      ...fieldValidity,
      [fieldname]: fieldIsValid
    }).every(valid => valid);
    
    setIsValid(allFieldsValid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    // Final validation check
    const finalValues: Record<string, any> = {};
    let allValid = true;
    
    doctype.fields.forEach(field => {
      const value = values[field.fieldname];
      const isValid = validateField(value, field) === undefined;
      if (!isValid) allValid = false;
      finalValues[field.fieldname] = value;
    });

    if (allValid) {
      onSubmit(finalValues);
    } else {
      setIsValid(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {doctype.fields.map(field => (
        <FormControl
          key={field.fieldname}
          doctypeField={field}
          value={values[field.fieldname]}
          onChange={(value, fieldIsValid) => handleChange(field.fieldname, value, fieldIsValid)}
        />
      ))}
      <button 
        type="submit" 
        disabled={!isValid}
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
}
