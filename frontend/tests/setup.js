import { expect, afterEach,beforeAll  } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

beforeAll(() => {
  if (typeof globalThis.structuredClone === 'undefined') {
    globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
  }
});


expect.extend(matchers);

afterEach(() => {
  cleanup();
});