import { useDrag } from 'react-dnd';
import type { EventType } from './types';

interface DraggableEventProps {
  event: EventType;
  children: React.ReactNode;
}

export function DraggableEvent({ event, children }: DraggableEventProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CALENDAR_EVENT',
    item: { event, sourceView: 'week' }, // Default to week view for now
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, resizeStart] = useDrag(() => ({
    type: 'RESIZE_HANDLE',
    item: { ...event, resizeEdge: 'start' },
  }));

  const [, resizeEnd] = useDrag(() => ({
    type: 'RESIZE_HANDLE', 
    item: { ...event, resizeEdge: 'end' },
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        position: 'relative',
      }}
    >
      {children}
      <div 
        ref={resizeStart}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          cursor: 'row-resize',
          backgroundColor: 'transparent',
        }}
      />
      <div
        ref={resizeEnd} 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          cursor: 'row-resize',
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
}
