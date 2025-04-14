import { 
  useFrappeGetDoc,
  useFrappeCreateDoc,
  useFrappeUpdateDoc,
  useFrappeDeleteDoc
} from 'frappe-react-sdk';

/**
 * Hook that provides document CRUD operations
 * 
 * @template T - Type of the document being operated on
 * @returns Object containing the following hooks:
 * - getDoc: Hook for fetching a single document
 * - createDoc: Hook for creating documents
 * - updateDoc: Hook for updating documents 
 * - deleteDoc: Hook for deleting documents
 */
export function useDocumentService<T>() {
  // Get document hook with proper type parameters and default values
  const getDoc = useFrappeGetDoc<T>('', '', undefined, undefined);
  
  // Create document hook
  const createDoc = useFrappeCreateDoc();
  
  // Update document hook 
  const updateDoc = useFrappeUpdateDoc();
  
  // Delete document hook
  const deleteDoc = useFrappeDeleteDoc();

  return {
    getDoc,
    createDoc,
    updateDoc,
    deleteDoc
  };
}
