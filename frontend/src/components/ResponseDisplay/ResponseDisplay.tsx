import { ReactElement } from 'react';

export interface ResponseDisplayProps {
  response?: string;
  isLoading?: boolean;
}

export function ResponseDisplay({ response, isLoading = false }: ResponseDisplayProps): ReactElement {
  if (isLoading) {
    return (
      <div className="response-display">
        <div role="status" aria-live="polite">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="response-display">
      {response ? response : 'Submit a prompt to see a response'}
    </div>
  );
}