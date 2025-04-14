import axios from 'axios';

type UploadProgressCallback = (progress: {
  uploaded: number;
  total: number;
}) => void;

type UploadCallbacks = {
  onStart?: () => void;
  onProgress?: UploadProgressCallback;
  onError?: (error: Error) => void;
  onFinish?: () => void;
};

export default class FileUploadHandler {
  private callbacks: UploadCallbacks = {};

  on(event: keyof UploadCallbacks, callback: any) {
    this.callbacks[event] = callback;
    return this;
  }

  async upload(file: File, args: Record<string, any> = {}) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(args).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      this.callbacks.onStart?.();

      const response = await axios.post('/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            this.callbacks.onProgress?.({
              uploaded: progressEvent.loaded,
              total: progressEvent.total,
            });
          }
        },
      });

      this.callbacks.onFinish?.();
      return response.data;
    } catch (error) {
      this.callbacks.onError?.(error as Error);
      throw error;
    }
  }
}