/**
 * Type definitions for Doctype Field Integration.
 * Defines the structure of Frappe doctype field definitions.
 */

export interface BaseDoctypeField {
  fieldname: string;
  label: string;
  fieldtype: string;
  required?: boolean;
  read_only?: boolean;
  default?: any;
  validation?: {
    min?: number;
    max?: number;
    min_length?: number;
    max_length?: number;
    regex?: string;
    message?: string;
  };
}

export interface DoctypeDataField extends BaseDoctypeField {
  fieldtype: 'Data' | 'Text';
}

export interface DoctypeNumberField extends BaseDoctypeField {
  fieldtype: 'Int' | 'Float';
}

export interface DoctypeDateField extends BaseDoctypeField {
  fieldtype: 'Date';
}

export interface DoctypeSelectField extends BaseDoctypeField {
  fieldtype: 'Select';
  options: string[] | { label: string; value: string }[];
}

export interface DoctypeCheckField extends BaseDoctypeField {
  fieldtype: 'Check';
  options?: never[];
}

export type DoctypeField =
  | DoctypeDataField
  | DoctypeNumberField
  | DoctypeDateField
  | DoctypeSelectField
  | DoctypeCheckField;

export interface DoctypeDefinition {
  doctype: string;
  fields: DoctypeField[];
}
