// Chat types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// API Key types
export type AIProvider = 'openai' | 'gemini' | 'openrouter' | 'ollama';

export interface APIKeyConfig {
  provider: AIProvider;
  key: string;
  model?: string;
}

// Settings types
export interface Settings {
  apiKeys: {
    openai?: string;
    gemini?: string;
    openrouter?: string;
    ollama?: string; // Ollama base URL (default: http://localhost:11434)
  };
  activeProvider: AIProvider;
  activeModel: string;
  theme: 'light' | 'dark' | 'system';
  saveHistory: boolean;
}

// Protocol types
export interface Protocol {
  id: string;
  name: string;
  emoji: string;
  description: string;
  situation: string;
  usage: string[];
  rules: string[];
  examples: {
    before: string[];
    after: string[];
  };
}

// Theory types
export interface Theory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  keyPoints: string[];
  applications: string[];
}

// API Response types
export interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  provider: AIProvider;
  apiKey: string;
  model?: string;
}

export interface ChatResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
