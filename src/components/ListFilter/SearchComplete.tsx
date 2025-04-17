import { useState, useEffect } from 'react';
import { Autocomplete } from '../Autocomplete';
import { useList } from '../../hooks/useList.ts';

interface SearchCompleteProps {
  value?: string;
  doctype: string;
  searchField?: string;
  labelField?: string;
  valueField?: string;
  pageLength?: number;
  onChange?: (value: string) => void;
}

export function SearchComplete({
  value = '',
  doctype,
  searchField = 'name',
  labelField = 'name',
  valueField = 'name',
  pageLength = 10,
  onChange,
}: SearchCompleteProps) {
  const [selection, setSelection] = useState(value);
  const [query, setQuery] = useState('');

  const { data: options, reload } = useList({
    doctype,
    fields: ['*'], // Fetch all fields
    filters: query ? { [searchField]: ['like', `%${query}%`] } : {},
    pageLength,
    auto: true,
  });

  useEffect(() => {
    if (value && options) {
      const selected = options.find((o: any) => o[valueField] === value);
      setSelection(selected);
    }
  }, [value, options, valueField]);

  const formattedOptions = options?.map((item: any) => ({
    label: item[labelField],
    value: item[valueField],
  }));

  const handleChange = (val: any) => {
    setSelection(val);
    onChange?.(val?.value || '');
  };

  const handleQueryChange = (q: string) => {
    setQuery(q);
    reload();
  };

  return (
    <Autocomplete
      placeholder="Select an option"
      options={formattedOptions || []}
      value={selection}
      onChange={handleChange}
      onQueryChange={handleQueryChange}
    />
  );
}
