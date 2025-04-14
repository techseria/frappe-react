import { beforeAll, vi } from 'vitest';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure test-id attribute
configure({ testIdAttribute: 'data-test-id' });

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
