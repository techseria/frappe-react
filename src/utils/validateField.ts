import { DoctypeField } from '../types/doctype';

export function validateField(
  value: any,
  field: DoctypeField
): string | undefined {
  if (!field.validation) return undefined;

  const { validation } = field;
  const fieldValue = value ?? '';

  if (field.required && !value) {
    return validation.message || `${field.label} is required`;
  }

  if (validation.min !== undefined && Number(value) < validation.min) {
    return validation.message || 
      `${field.label} must be at least ${validation.min}`;
  }

  if (validation.max !== undefined && Number(value) > validation.max) {
    return validation.message || 
      `${field.label} must be at most ${validation.max}`;
  }

  if (validation.min_length !== undefined && 
      String(fieldValue).length < validation.min_length) {
    return validation.message || 
      `${field.label} must be at least ${validation.min_length} characters`;
  }

  if (validation.max_length !== undefined && 
      String(fieldValue).length > validation.max_length) {
    return validation.message || 
      `${field.label} must be at most ${validation.max_length} characters`;
  }

  if (validation.regex && !new RegExp(validation.regex).test(String(fieldValue))) {
    return validation.message || 
      `${field.label} format is invalid`;
  }

  return undefined;
}
