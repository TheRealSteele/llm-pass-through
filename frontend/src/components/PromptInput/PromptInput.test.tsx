import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { PromptInput } from './PromptInput';

describe('PromptInput Component - Scenario 1: User submits a prompt', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should render input field and submit button', () => {
    render(<PromptInput />);
    
    const inputField = screen.getByPlaceholderText(/Enter your prompt/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    expect(inputField).toBeVisible();
    expect(submitButton).toBeVisible();
  });

  it('should enable submit button only when input is not empty', async () => {
    render(<PromptInput />);
    
    const inputField = screen.getByPlaceholderText(/Enter your prompt/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    expect(submitButton).toBeDisabled();
    
    await user.type(inputField, 'What is the capital of France?');
    
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });

  it('should call onSubmit with the prompt text when form is submitted', async () => {
    const mockOnSubmit = vi.fn();
    render(<PromptInput onSubmit={mockOnSubmit} />);
    
    const inputField = screen.getByPlaceholderText(/Enter your prompt/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    await user.type(inputField, 'What is the capital of France?');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('What is the capital of France?');
    });
  });
});