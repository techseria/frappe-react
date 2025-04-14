import { useRef, useEffect } from 'react';

export function useFocus<T extends HTMLElement>(): React.RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
  return ref;
}
