import { ReactElement, useState } from 'react';

export interface PromptInputProps {
  onSubmit?: (prompt: string) => void;
}

export function PromptInput({ onSubmit = () => {} }: PromptInputProps): ReactElement {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <form className="prompt-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        aria-label="Prompt input"
      />
      <button 
        type="submit" 
        disabled={!prompt}
        aria-label="Submit prompt"
      >
        Submit
      </button>
    </form>
  );
}