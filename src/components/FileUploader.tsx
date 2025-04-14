import React, { useState, useRef, useMemo, useCallback } from 'react';
import FileUploadHandler from '../utils/fileUploadHandler'; // Assuming this path is correct

interface FileUploaderProps {
  fileTypes?: string; // Corresponds to input accept attribute
  uploadArgs?: Record<string, any>;
  validateFile?: (file: File) => Promise<string | null | undefined> | string | null | undefined;
  onSuccess?: (data: any) => void; // Callback on successful upload
  onFailure?: (error: any) => void; // Callback on failed upload
  children: (props: {
    file: File | null;
    uploading: boolean;
    progress: number;
    uploaded: number;
    message: string; // Consider if message state is needed or derived
    error: string | null;
    total: number;
    success: boolean;
    openFileSelector: () => void;
  }) => React.ReactNode;
}

export function FileUploader({
  fileTypes = "*/*", // Default to all file types
  uploadArgs = {},
  validateFile,
  onSuccess,
  onFailure,
  children,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>(''); // Example message state
  const [finishedUploading, setFinishedUploading] = useState<boolean>(false);

  const progress = useMemo(() => {
    if (total === 0) return 0;
    const value = Math.floor((uploaded / total) * 100);
    return isNaN(value) ? 0 : value;
  }, [uploaded, total]);

  const success = useMemo(() => {
    return finishedUploading && !error;
  }, [finishedUploading, error]);

  const openFileSelector = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const uploadFile = useCallback(async (fileToUpload: File) => {
    setError(null);
    setUploaded(0);
    setTotal(0);
    setUploading(true); // Set uploading true immediately
    setFinishedUploading(false);
    setMessage('Uploading...'); // Set initial message

    const uploader = new FileUploadHandler();

    uploader.on('onStart', () => { // Corrected event name
      // Already set uploading to true
    });

    uploader.on('onProgress', (data: { uploaded: number; total: number }) => { // Corrected event name
      setUploaded(data.uploaded);
      setTotal(data.total);
    });

    uploader.on('onError', (err: Error) => { // Corrected event name
      setUploading(false);
      setError(err.message || 'Error Uploading File');
      setMessage('Upload failed.');
      setFinishedUploading(true); // Mark as finished even on error
    });

    uploader.on('onFinish', () => { // Corrected event name
      // Note: Axios handler might resolve *before* finish is called if using simple POST
      // We rely on the promise resolution/rejection for final state
    });

    try {
      const data = await uploader.upload(fileToUpload, uploadArgs);
      setUploading(false);
      setFinishedUploading(true);
      setMessage('Upload complete.');
      onSuccess?.(data);
    } catch (uploadError: any) {
      setUploading(false);
      setFinishedUploading(true); // Mark as finished on catch
      let errorMessage = 'Error Uploading File';
      // Attempt to parse Frappe-style errors (adjust based on actual API response)
      try {
         if (uploadError?.response?.data?._server_messages) {
           const serverMessage = JSON.parse(JSON.parse(uploadError.response.data._server_messages)[0]);
           errorMessage = serverMessage.message || errorMessage;
         } else if (uploadError?.response?.data?.exc) {
            const excLines = JSON.parse(uploadError.response.data.exc)[0].split('\n');
            errorMessage = excLines[excLines.length - 2] || errorMessage; // Second to last line often has the specific error
         } else if (uploadError instanceof Error) {
            errorMessage = uploadError.message;
         }
      } catch (parseError) {
          console.error("Error parsing upload error message:", parseError);
      }
      setError(errorMessage);
      setMessage('Upload failed.');
      onFailure?.(uploadError); // Pass the original error
    } finally {
       // Reset the input value to allow uploading the same file again
       if (inputRef.current) {
           inputRef.current.value = '';
       }
    }
  }, [uploadArgs, onSuccess, onFailure]);


  const onFileAdd = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setMessage('');
    setFinishedUploading(false);
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setFile(selectedFile); // Set file state immediately

    if (validateFile) {
      try {
        const validationMessage = await validateFile(selectedFile);
        if (validationMessage) {
          setError(validationMessage);
          setMessage('Validation failed.');
          // Reset input value if validation fails
          if (inputRef.current) {
              inputRef.current.value = '';
          }
          setFile(null); // Clear file state if validation fails
          return; // Stop processing
        }
      } catch (validationError: any) {
        setError(validationError?.message || 'File validation failed');
        setMessage('Validation error.');
         if (inputRef.current) {
             inputRef.current.value = '';
         }
         setFile(null);
        return; // Stop processing
      }
    }

    // If validation passes (or no validator), proceed to upload
    uploadFile(selectedFile);

  }, [validateFile, uploadFile]);


  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={fileTypes}
        className="hidden"
        onChange={onFileAdd}
        // Add 'multiple' prop if needed
      />
      {children({
        file,
        uploading,
        progress,
        uploaded,
        message,
        error,
        total,
        success,
        openFileSelector,
      })}
    </div>
  );
}