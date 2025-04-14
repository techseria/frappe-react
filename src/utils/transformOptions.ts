import React, { ReactNode, isValidElement } from 'react';

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type AutocompleteOption = string | {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
};

function isOptionElement(child: any): child is React.ReactElement<{
  value: string;
  disabled?: boolean;
  children: string;
}> {
  return isValidElement(child) && child.type === 'option';
}

export function transformSelectOptions(children: ReactNode | (string | { label: string; value: string })[]): SelectOption[] {
  if (!children) return [];
  
  if (Array.isArray(children)) {
    return children.map(option => 
      typeof option === 'string' 
        ? { label: option, value: option }
        : { label: option.label, value: option.value }
    );
  }

  return React.Children.toArray(children)
    .filter(isOptionElement)
    .map(child => ({
      label: child.props.children,
      value: child.props.value,
      disabled: child.props.disabled
    }));
}

export function transformAutocompleteOptions(children: ReactNode | (string | { label: string; value: string })[]): AutocompleteOption[] {
  if (!children) return [];
  
  if (Array.isArray(children)) {
    return children.map(option => 
      typeof option === 'string' 
        ? option
        : { label: option.label, value: option.value }
    );
  }

  return React.Children.toArray(children)
    .filter(isOptionElement)
    .map(child => ({
      label: child.props.children,
      value: child.props.value,
      disabled: child.props.disabled
    }));
}
