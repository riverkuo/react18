import '@testing-library/jest-dom'; // tobeInTheDocument is unknown in vitest, so we need to import this
import { server } from '@/libs/msw/server';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';

// Start worker before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

//  Close worker after all tests
afterAll(() => {
  server.close();
});

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers();

  cleanup(); // cleanup after each test
});
