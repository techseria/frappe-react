import { useMemo } from 'react'; // Removed React import
import Button from '../Button'; // Keep importing default from index.tsx
import { Autocomplete } from '../Autocomplete';
import { FormControl } from '../FormControl';
import { FilterIcon } from './FilterIcon';
import { NestedPopover } from './NestedPopover';
import { SearchComplete } from './SearchComplete';
import { FeatherIcon } from '../FeatherIcon';

// Removed unused Option interface

type OptionValue = string; // Restore local alias for operator dropdown

interface Field {
  fieldname: string;
  fieldtype: string;
  label: string;
  options?: string;
  is_virtual?: boolean;
}

interface Filter {
  fieldname: string;
  operator: string;
  value: any;
  field: Field;
}

interface ListFilterProps {
  value?: Record<string, [string, any]>;
  docfields: Field[];
  onChange?: (value: Record<string, [string, any]>) => void;
}

const typeCheck = ['Check'];
const typeLink = ['Link'];
const typeNumber = ['Float', 'Int'];
const typeSelect = ['Select'];
const typeString = [
  'Data',
  'Long Text',
  'Small Text',
  'Text Editor',
  'Text',
  'JSON',
  'Code',
];

export function ListFilter({ value = {}, docfields, onChange }: ListFilterProps) {
  const fields = useMemo(() => {
    return docfields
      .filter((field) => {
        return (
          !field.is_virtual &&
            (typeCheck.includes(field.fieldtype) ||
              typeLink.includes(field.fieldtype) ||
              typeNumber.includes(field.fieldtype) ||
              typeSelect.includes(field.fieldtype) ||
              typeString.includes(field.fieldtype))
          ); // Added closing parenthesis
      })
      .map((field) => ({
        ...field, // Spread first
        value: field.fieldname, // Define specific props after
        description: field.fieldtype,
        // label is already in field
      }));
  }, [docfields]);

  const filters = useMemo(() => {
    return Object.entries(value).map(([fieldname, [operator, value]]) => {
      const field = fields.find((f) => f.fieldname === fieldname);
      if (!field) return null;
      return {
        fieldname,
        operator,
        value,
        field,
      };
    }).filter(Boolean) as Filter[];
  }, [value, fields]);

  const handleChange = (newFilters: Filter[]) => {
    const newValue = newFilters.reduce((acc, filter) => {
      const { fieldname, operator, value } = filter;
      acc[fieldname] = [operator, value];
      return acc;
    }, {} as Record<string, [string, any]>);
    onChange?.(newValue);
  };

  const getField = (fieldname: string): Field => {
    const field = fields.find((f) => f.fieldname === fieldname);
    if (!field) {
      throw new Error(`Field ${fieldname} not found`);
    }
    return field;
  };

  const getOperators = (fieldtype: string) => {
    let options = [];
    if (typeString.includes(fieldtype) || typeLink.includes(fieldtype)) {
      options.push(
        { label: 'Equals', value: '=' },
        { label: 'Not Equals', value: '!=' },
        { label: 'Like', value: 'like' },
        { label: 'Not Like', value: 'not like' },
      );
    }
    if (typeNumber.includes(fieldtype)) {
      options.push(
        { label: '<', value: '<' },
        { label: '>', value: '>' },
        { label: '<=', value: '<=' },
        { label: '>=', value: '>=' },
        { label: 'Equals', value: '=' },
        { label: 'Not Equals', value: '!=' },
      );
    }
    if (typeSelect.includes(fieldtype)) {
      options.push(
        { label: 'Equals', value: '=' },
        { label: 'Not Equals', value: '!=' },
      );
    }
    if (typeCheck.includes(fieldtype)) {
      options.push({ label: 'Equals', value: '=' });
    }
    return options;
  };

  const getDefaultOperator = (fieldtype: string) => {
    if (
      typeSelect.includes(fieldtype) ||
      typeLink.includes(fieldtype) ||
      typeCheck.includes(fieldtype) ||
      typeNumber.includes(fieldtype)
    ) {
      return '=';
    }
    return 'like';
  };

  const getDefaultValue = (field: Field) => {
    if (typeSelect.includes(field.fieldtype)) {
      return getSelectOptions(field.options)[0];
    }
    if (typeCheck.includes(field.fieldtype)) {
      return 'Yes';
    }
    return '';
  };

  const getSelectOptions = (options?: string) => {
    return options?.split('\n') || [];
  };

  const addFilter = (fieldname: string) => {
    const field = getField(fieldname);
    if (!field) return;

    const newFilter = {
      fieldname,
      operator: getDefaultOperator(field.fieldtype),
      value: getDefaultValue(field),
      field,
    };
    handleChange([...filters, newFilter]);
  };

  const removeFilter = (index: number) => {
    handleChange(filters.filter((_, i) => i !== index));
  };

  return (
    <NestedPopover>
      <div>
        <Button>
          <FilterIcon className="h-4" />
          {filters.length > 0 && (
            <div className="flex h-5 w-5 items-center justify-center rounded bg-surface-gray-7 pt-[1px] text-2xs font-medium text-ink-white">
              {filters.length}
            </div>
          )}
        </Button>
      </div>
      <div className="my-2 rounded-lg border border-gray-100 bg-surface-white shadow-xl">
        <div className="min-w-[400px] p-2">
          {filters.length > 0 ? (
            filters.map((filter, i) => (
              <div key={i} className="mb-3 flex items-center justify-between gap-2">
                <div className="flex flex-1 items-center gap-2">
                  <div className="w-13 flex-shrink-0 pl-2 text-end text-base text-ink-gray-5">
                    {i === 0 ? 'Where' : 'And'}
                  </div>
                  <div className="!min-w-[140px] flex-1">
                    <Autocomplete
                      value={filter.fieldname}
                      options={fields}
                      onChange={(value: any) => { // Use 'any' type for now, keep param name 'value'
                        if (!value) return;
                        // Ensure fieldnameValue is treated as string
                        const fieldnameValue = String(typeof value === 'string' ? value : value.value);
                        const newFilters = [...filters];
                        newFilters[i].fieldname = fieldnameValue;
                        handleChange(newFilters);
                      }}
                      placeholder="Filter by..."
                    />
                  </div>
                  <div className="!min-w-[140px] flex-shrink-0">
                    <FormControl
                      type="select"
                      value={filter.operator}
                      onChange={(value: OptionValue | null) => { // Accept value directly
                        if (!value) return;
                        // value is OptionValue (string)
                        const newFilters = [...filters];
                        newFilters[i].operator = value;
                        handleChange(newFilters);
                      }}
                      placeholder="Operator"
                    >
                      {getOperators(filter.field.fieldtype).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </FormControl>
                  </div>
                  <div className="!min-w-[140px] flex-1">
                    {typeLink.includes(filter.field.fieldtype) &&
                    ['=', '!='].includes(filter.operator) ? (
                      <SearchComplete
                        doctype={filter.field.options || ''}
                        value={filter.value}
                        onChange={(val) => {
                          const newFilters = [...filters];
                          newFilters[i].value = val;
                          handleChange(newFilters);
                        }}
                      />
                    ) : (
                      <FormControl
                        type={typeSelect.includes(filter.field.fieldtype) ||
                              typeCheck.includes(filter.field.fieldtype) ? 'select' : 'text'}
                        value={filter.value}
                        onChange={(value: string) => { // Accept value directly (expecting string)
                          const newFilters = [...filters];
                          newFilters[i].value = value; // Assign directly
                          handleChange(newFilters);
                        }}
                        placeholder="Value"
                      >
                        {typeSelect.includes(filter.field.fieldtype) && 
                          getSelectOptions(filter.field.options).map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        {typeCheck.includes(filter.field.fieldtype) && (
                          <>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </>
                        )}
                      </FormControl>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button 
                    variant="ghost" 
                    onClick={() => removeFilter(i)}
                    prefix={<FeatherIcon name="x" className="h-4" />} // Revert back to prefix
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="mb-3 flex h-7 items-center px-3 text-sm text-ink-gray-5">
              Empty - Choose a field to filter by
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Autocomplete
                value=""
                options={fields}
                onChange={(value: any) => { // Use 'any' type for now, keep param name 'value'
                  if (!value) return;
                   // Ensure fieldnameValue is treated as string
                  const fieldnameValue = String(typeof value === 'string' ? value : value.value);
                  addFilter(fieldnameValue);
                }}
                placeholder="Filter by..."
              />
              <Button
                className="!text-ink-gray-5"
                variant="ghost"
                label="Add filter"
                prefix={<FeatherIcon name="plus" className="h-4" />} // Revert back to prefix
              />
            </div>
            {filters.length > 0 && (
              <Button
                className="!text-ink-gray-5"
                variant="ghost"
                label="Clear all filters"
                onClick={() => handleChange([])}
              />
            )}
          </div>
        </div>
      </div>
    </NestedPopover>
  );
}
