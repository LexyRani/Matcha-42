import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
it('renders the main heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
  it('renders at least one heading', () => {
    render(<App />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);});
});
