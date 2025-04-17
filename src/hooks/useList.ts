// Removed unused useEffect import
import { useFrappeGetDocList, Filter } from 'frappe-react-sdk';

type DocField = 'owner' | 'creation' | 'modified' | 'modified_by' | 'idx' | 
  'docstatus' | 'parent' | 'parentfield' | 'parenttype' | 'name' | '*';

interface UseListOptions {
  doctype: string;
  fields?: DocField[];
  filters?: Record<string, any>;
  pageLength?: number;
  auto?: boolean;
}

function convertFilters(filters: Record<string, any>): Filter[] {
  return Object.entries(filters).map(([field, value]) => {
    if (Array.isArray(value)) {
      return [field, ...value] as Filter;
    }
    return [field, '=', value] as Filter;
  });
}

export function useList(options: UseListOptions) {
  const { doctype, fields = ['*'] as DocField[], filters = {}, pageLength = 20, auto = false } = options;
  
  const { data, isLoading, error, mutate } = useFrappeGetDocList(
    doctype,
    {
      fields,
      filters: convertFilters(filters),
      limit: pageLength,
    },
    {
      revalidateOnMount: auto
    }
  );

  const reload = () => {
    mutate();
  };

  return {
    data: data || [],
    loading: isLoading,
    error,
    reload,
  };
}
