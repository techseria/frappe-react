import React from 'react';
import { FormGenerator } from './FormGenerator';
import { DoctypeDefinition, DoctypeDataField, DoctypeSelectField } from '../types/doctype';

export function FormGeneratorTest() {
  const sampleDoctype: DoctypeDefinition = {
    doctype: 'Sample',
    fields: [
      {
        fieldname: 'name',
        label: 'Full Name',
        fieldtype: 'Data',
        required: true,
        validation: {
          min_length: 3,
          message: 'Name must be at least 3 characters'
        }
      } as DoctypeDataField,
      {
        fieldname: 'email',
        label: 'Email',
        fieldtype: 'Data',
        required: true,
        validation: {
          regex: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
          message: 'Please enter a valid email'
        }
      } as DoctypeDataField,
      {
        fieldname: 'gender',
        label: 'Gender',
        fieldtype: 'Select',
        options: ['Male', 'Female', 'Other'],
        required: false
      } as DoctypeSelectField
    ]
  };

  const handleSubmit = (values: Record<string, any>) => {
    console.log('Form submitted with values:', values);
    alert(`Form submitted successfully!\n${JSON.stringify(values, null, 2)}`);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Sample Form Generator</h2>
      <FormGenerator 
        doctype={sampleDoctype}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
