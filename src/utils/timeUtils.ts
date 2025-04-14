export function calculateMinutes(time: string): number {
  const [h, m] = time.split(':');
  
  // Explicit type conversion with validation
  const hours = Math.max(0, Math.min(23, Number(h) || 0));
  const minutes = Math.max(0, Math.min(59, Number(m) || 0));
  
  return hours * 60 + minutes;
}
