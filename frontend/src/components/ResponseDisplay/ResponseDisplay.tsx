import { ReactElement } from 'react';

export interface ResponseDisplayProps {
  response?: string;
  isLoading?: boolean;
  error?: string;
}

export function ResponseDisplay({ 
  response, 
  isLoading = false, 
  error 
}: ResponseDisplayProps): ReactElement {
  if (isLoading) {
    return (
      <div className="response-display">
        <div role="status" aria-live="polite">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="response-display error" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="response-display">
      {response ? response : 'Submit a prompt to see a response'}
    </div>
  );
}