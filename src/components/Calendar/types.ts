export interface EventType {
  id: string;
  title: string;
  date: string;
  from_time?: string;
  to_time?: string;
  isFullDay?: boolean;
  color?: string;
  isResizing?: boolean;
  resizeEdge?: 'start' | 'end';
  originalStart?: string; // For tracking resize origin
  [key: string]: any;
}

export interface DropResult {
  date: Date;
  time?: string;
  sourceView?: 'month' | 'week' | 'day';
}
