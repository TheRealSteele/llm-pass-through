import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add the custom matchers from testing-library/jest-dom
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

// Suppress React act() warnings
// These warnings are often false positives when using React Testing Library
const originalConsoleError = console.error;
console.error = (message, ...args) => {
  if (
    typeof message === 'string' &&
    message.includes('Warning: An update to') &&
    message.includes('inside a test was not wrapped in act')
  ) {
    return;
  }
  originalConsoleError(message, ...args);
};

// Alternatively, we could use this method:
// vi.spyOn(console, 'error').mockImplementation((...args) => {
//   if (typeof args[0] === 'string' && args[0].includes('inside a test was not wrapped in act')) {
//     return;
//   }
//   // eslint-disable-next-line no-console
//   console.warn(...args);
// });