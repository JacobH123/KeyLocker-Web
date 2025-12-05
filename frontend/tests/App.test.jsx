import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { App } from '../src/App';

describe('App Component', () => {
  test('should render without crashing', () => {
    render(<App />);
    // Just verify it renders something
    expect(document.body).toBeTruthy();
  });
  
  test('should render router', () => {
    const { container } = render(<App />);
    // Check that the main element exists
    const main = container.querySelector('main');
    expect(main).toBeTruthy();
  });
});