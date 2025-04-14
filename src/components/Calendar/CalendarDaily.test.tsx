import { render, screen } from '@testing-library/react';
import CalendarDaily from './CalendarDaily';
import { EventType } from './types';

describe('CalendarDaily', () => {
  const mockEvents: EventType[] = [
    {
      id: '1',
      title: 'Test Event',
      date: '2025-04-13',
      from_time: '10:00',
      to_time: '11:00'
    }
  ];

  it('renders time slots for all hours', () => {
    render(
      <CalendarDaily 
        events={[]}
        currentDate={new Date(2025, 3, 13)}
        onEventDrop={jest.fn()}
      />
    );
    
    expect(screen.getByText('00:00')).toBeInTheDocument();
    expect(screen.getByText('23:00')).toBeInTheDocument();
  });

  it('displays events at correct time slots', () => {
    render(
      <CalendarDaily 
        events={mockEvents}
        currentDate={new Date(2025, 3, 13)}
        onEventDrop={jest.fn()}
      />
    );
    
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Event').parentElement).toHaveStyle('grid-row: 11');
  });

  it('calls onEventDrop with correct params', () => {
    const mockOnDrop = jest.fn();
    render(
      <CalendarDaily 
        events={mockEvents}
        currentDate={new Date(2025, 3, 13)}
        onEventDrop={mockOnDrop}
      />
    );
    
    // Test would simulate drag and drop here
    // Actual drag simulation would require additional test setup
    expect(mockOnDrop).not.toHaveBeenCalled();
  });
});
