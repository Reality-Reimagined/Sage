export interface CoachingTopic {
  id: string;
  name: string;
  icon: React.ComponentType;
  color: string;
  description: string;
  prompts: string[];
  suggestedQuestions: string[];
}

export interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  topicId?: string;
  read?: boolean;
  userId?: string;
}