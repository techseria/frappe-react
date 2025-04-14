import React from 'react'; // eslint-disable-line no-unused-vars
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { FormGenerator } from '../FormGenerator';
import { DoctypeDefinition, DoctypeDataField, DoctypeSelectField, DoctypeCheckField } from '../../types/doctype';

describe('FormGenerator', () => {
  const mockDoctype: DoctypeDefinition = {
    doctype: 'Test',
    fields: [
      {
        fieldname: 'name',
        label: 'Name',
        fieldtype: 'Data',
        required: true
      } as DoctypeDataField,
      {
        fieldname: 'email',
        label: 'Email',
        fieldtype: 'Data',
        required: true,
        validation: {
          regex: '^\\S+@\\S+\\.\\S+$',
          message: 'Invalid email'
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

  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  test('renders all form fields', () => {
    render(<FormGenerator doctype={mockDoctype} onSubmit={mockSubmit} />);
    
    expect(screen.getByText('Name', { selector: 'label' })).toBeInTheDocument();
    expect(screen.getByText('Email', { selector: 'label' })).toBeInTheDocument();
    expect(screen.getByText('Gender', { selector: 'label' })).toBeInTheDocument();
  });

  test('prevents submission when required fields are empty', () => {
    render(<FormGenerator doctype={mockDoctype} onSubmit={mockSubmit} />);
    
    fireEvent.click(screen.getByText('Submit'));
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Submit')).toBeDisabled();
  });

  test('validates email format', () => {
    render(<FormGenerator doctype={mockDoctype} onSubmit={mockSubmit} />);
    
    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeDisabled();
  });

  test('submits form with valid data', () => {
    render(<FormGenerator doctype={mockDoctype} onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox', { name: /Name/i }), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Email/i }), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByRole('combobox', { name: /Gender/i }), { 
      target: { value: 'Male' } 
    });

    fireEvent.click(screen.getByText('Submit'));
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'Male'
    });
  });

  test('handles initial values correctly', () => {
    render(
      <FormGenerator 
        doctype={mockDoctype} 
        onSubmit={mockSubmit}
        initialValues={{ name: 'Jane', email: 'jane@example.com' }}
      />
    );
    
    expect(screen.getByRole('textbox', { name: /Name/i })).toHaveValue('Jane');
    expect(screen.getByRole('textbox', { name: /Email/i })).toHaveValue('jane@example.com');
  });

  test('handles conditional field visibility', () => {
    const conditionalDoctype: DoctypeDefinition = {
      ...mockDoctype,
      fields: [
        ...mockDoctype.fields,
        {
          fieldname: 'show_extra',
          label: 'Show Extra Field',
          fieldtype: 'Check',
          required: false
        } as DoctypeCheckField,
        {
          fieldname: 'extra_field',
          label: 'Extra Field',
          fieldtype: 'Data',
          required: false,
          depends_on: 'show_extra'
        } as DoctypeDataField
      ]
    };

    render(<FormGenerator doctype={conditionalDoctype} onSubmit={mockSubmit} />);
    
    expect(screen.queryByText('Extra Field')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByLabelText('Show Extra Field'));
    expect(screen.getByText('Extra Field')).toBeInTheDocument();
  });

  test('handles form reset', () => {
    render(
      <FormGenerator 
        doctype={mockDoctype} 
        onSubmit={mockSubmit}
        initialValues={{ name: 'Jane', email: 'jane@example.com' }}
      />
    );
    
    fireEvent.change(screen.getByRole('textbox', { name: /Name/i }), { target: { value: 'John' } });
    fireEvent.click(screen.getByText('Reset'));
    
    expect(screen.getByRole('textbox', { name: /Name/i })).toHaveValue('Jane');
  });

  test('handles submission errors', () => {
    const errorSubmit = vi.fn(() => Promise.reject(new Error('Submission failed')));
    render(<FormGenerator doctype={mockDoctype} onSubmit={errorSubmit} />);
    
    fireEvent.change(screen.getByRole('textbox', { name: /Name/i }), { target: { value: 'John' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Email/i }), { 
      target: { value: 'john@example.com' } 
    });
    
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.findByText('Submission failed')).resolves.toBeInTheDocument();
  });
});
