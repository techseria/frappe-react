import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FormGenerator } from './FormGenerator';
import { DoctypeDefinition, DoctypeDataField, DoctypeSelectField } from '../types/doctype';

describe('FormGenerator', () => {
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

  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  describe('Validation', () => {
    it('should show error for required fields when empty', () => {
      render(<FormGenerator doctype={sampleDoctype} onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText(/Full Name/);
      fireEvent.change(nameInput, { target: { value: '' } });
      fireEvent.blur(nameInput);
      
      expect(screen.getByText('Name must be at least 3 characters')).toBeInTheDocument();
    });

    it('should validate minimum length', () => {
      render(<FormGenerator doctype={sampleDoctype} onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText(/Full Name/);
      fireEvent.change(nameInput, { target: { value: 'ab' } });
      fireEvent.blur(nameInput);
      
      expect(screen.getByText('Name must be at least 3 characters')).toBeInTheDocument();
    });

    it('should validate email format', () => {
      render(<FormGenerator doctype={sampleDoctype} onSubmit={mockSubmit} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      fireEvent.change(emailInput, { target: { value: 'invalid' } });
      fireEvent.blur(emailInput);
      
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });

    it('should not show error for optional fields when empty', () => {
      render(<FormGenerator doctype={sampleDoctype} onSubmit={mockSubmit} />);
      
      const genderInput = screen.getByLabelText('Gender');
      fireEvent.blur(genderInput);
      
      expect(screen.queryByText('required')).not.toBeInTheDocument();
    });
  });

  describe('Field Interactions', () => {
    it('should update field values when changed', () => {
      render(<FormGenerator doctype={sampleDoctype} onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText(/Full Name/i);
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      expect(nameInput).toHaveValue('John Doe');
    });

    it('should update validation state when field becomes valid', () => {
      render(<FormGenerator doctype={sampleDoctype} onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText('Full Name');
      fireEvent.change(nameInput, { target: { value: 'John' } });
      fireEvent.blur(nameInput);
      
      expect(screen.queryByText('Name must be at least 3 characters')).not.toBeInTheDocument();
    });

    it('should enable submit button when all required fields are valid', () => {
      render(<FormGenerator doctype={sampleDoctype} onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      
      // Initially disabled
      expect(submitButton).toBeDisabled();
      
      // Fill valid values
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.blur(nameInput);
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.blur(emailInput);
      
      // Should be enabled now
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Submission Handling', () => {
    it('should call onSubmit with form values when valid and submitted', () => {
      render(<FormGenerator doctype={sampleDoctype} onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      
      // Fill valid values
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.blur(nameInput);
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.blur(emailInput);
      const genderInput = screen.getByLabelText('Gender');
      fireEvent.change(genderInput, { target: { value: '' } });
      
      // Submit form
      fireEvent.click(submitButton);
      
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        gender: ''
      });
    });

    it('should not call onSubmit when form is invalid', () => {
      render(<FormGenerator doctype={sampleDoctype} onSubmit={mockSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);
      
      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('should include optional field values when provided', () => {
      render(<FormGenerator doctype={sampleDoctype} onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email');
      const genderInput = screen.getByLabelText('Gender');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      
      // Fill all fields
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.blur(nameInput);
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.blur(emailInput);
      fireEvent.change(genderInput, { target: { value: 'Male' } });
      
      // Submit form
      fireEvent.click(submitButton);
      
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        gender: 'Male'
      });
    });
  });
});
