
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreference {
  id: string;
  industry?: string;
  targetAudience?: string;
  contentGoals?: string[];
  previousTrends?: string[];
}

export interface TrendData {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: Date;
  category: string;
  relevanceScore?: number;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
