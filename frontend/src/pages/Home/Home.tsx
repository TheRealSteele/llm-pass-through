import { ReactElement, useState } from 'react';
import { PromptInput } from '../../components/PromptInput/PromptInput';
import { ResponseDisplay } from '../../components/ResponseDisplay/ResponseDisplay';
import apiService from '../../services/apiService';
import type { QuestionRequest } from '../../types/api';

export function Home(): ReactElement {
  const [response, setResponse] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (prompt: string) => {
    try {
      setIsLoading(true);
      setError(undefined);
      
      const questionRequest: QuestionRequest = { prompt };
      const result = await apiService.postQuestion(questionRequest);
      
      setResponse(result.response);
    } catch (error) {
      console.error('Error submitting prompt:', error);
      setError('Failed to get response from the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-page">
      <PromptInput onSubmit={handleSubmit} />
      <ResponseDisplay 
        response={response} 
        isLoading={isLoading}
        error={error} 
      />
    </div>
  );
}