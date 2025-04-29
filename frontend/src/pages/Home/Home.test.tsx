import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Home } from './Home';
import apiService, { type ApiService } from '../../services/apiService';
import type { QuestionResponse } from '../../types/api';

vi.mock('../../services/apiService', () => ({
  default: {
    postQuestion: vi.fn(),
  },
}));

describe('Home Page', () => {
  let user: UserEvent;
  const mockedApiService = apiService as ApiService & { 
    postQuestion: vi.Mock<Promise<QuestionResponse>> 
  };

  beforeEach(() => {
    user = userEvent.setup();
    vi.resetAllMocks();
  });

  const submitPrompt = async (promptText = 'What is the capital of France?') => {
    const inputField = screen.getByPlaceholderText(/Enter your prompt/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    await user.type(inputField, promptText);
    await user.click(submitButton);
  };

  it('should display prompt input and response display components', () => {
    render(<Home />);
    
    const inputField = screen.getByPlaceholderText(/Enter your prompt/i);
    const responseArea = screen.getByText(/Submit a prompt to see a response/i);
    
    expect(inputField).toBeVisible();
    expect(responseArea).toBeVisible();
  });

  it('should send request to backend when user submits a prompt', async () => {
    const promptText = 'What is the capital of France?';
    const mockResponse = { response: 'Paris is the capital of France.' };
    mockedApiService.postQuestion.mockResolvedValue(mockResponse);
    
    render(<Home />);
    await submitPrompt(promptText);
    
    await waitFor(() => {
      expect(mockedApiService.postQuestion).toHaveBeenCalledWith({
        prompt: promptText
      });
    });
  });

  it('should display loading state while waiting for response', async () => {
    mockedApiService.postQuestion.mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ response: 'Paris is the capital of France.' });
        }, 100);
      });
    });
    
    render(<Home />);
    await submitPrompt();
    
    const loadingElement = await screen.findByRole('status');
    expect(loadingElement).toBeVisible();
    expect(loadingElement).toHaveTextContent(/Loading/i);
  });

  it('should display response when backend returns data', async () => {
    const responseText = 'Paris is the capital of France.';
    const mockResponse = { response: responseText };
    mockedApiService.postQuestion.mockResolvedValue(mockResponse);
    
    render(<Home />);
    await submitPrompt();
    
    const responseElement = await screen.findByText(responseText);
    expect(responseElement).toBeVisible();
    
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should display error message when request fails', async () => {
    mockedApiService.postQuestion.mockRejectedValue(new Error('API error'));
    
    render(<Home />);
    await submitPrompt();
    
    const errorElement = await screen.findByRole('alert');
    expect(errorElement).toBeVisible();
    expect(errorElement).toHaveTextContent(/Failed to get response/i);
    
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});