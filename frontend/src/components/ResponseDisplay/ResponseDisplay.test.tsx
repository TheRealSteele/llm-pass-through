import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ResponseDisplay } from './ResponseDisplay';

describe('ResponseDisplay Component', () => {
  it('should display the response content when provided', () => {
    const testResponse = 'Paris is the capital of France.';
    render(<ResponseDisplay response={testResponse} />);
    
    const responseElement = screen.getByText(testResponse);
    expect(responseElement).toBeVisible();
  });

  it('should display a placeholder when no response is provided', () => {
    render(<ResponseDisplay />);
    
    const placeholderElement = screen.getByText('Submit a prompt to see a response');
    expect(placeholderElement).toBeVisible();
  });

  it('should display a loading indicator when isLoading is true', () => {
    render(<ResponseDisplay isLoading={true} />);
    
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeVisible();
    expect(loadingElement).toHaveTextContent('Loading...');
  });
});