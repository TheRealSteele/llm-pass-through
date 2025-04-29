import type { QuestionRequest, QuestionResponse } from '../types/api';

export interface ApiService {
  postQuestion(question: QuestionRequest): Promise<QuestionResponse>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const makePostRequest = async <TResponse = any, TRequest = any>(
  endpoint: string, 
  data: TRequest
): Promise<TResponse> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
};

const apiService: ApiService = {
  async postQuestion(question: QuestionRequest): Promise<QuestionResponse> {
    return makePostRequest<QuestionResponse, QuestionRequest>('/questions', question);
  }
};

export default apiService;