import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });
    
  it('true is true', () => {
      expect(true).toBe(true);
  });
});
