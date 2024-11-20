import React from 'react';
import type { CoachingTopic } from '../types/coaching';

interface SuggestedQuestionsProps {
  topic: CoachingTopic;
  onSelectQuestion: (question: string) => void;
}

export function SuggestedQuestions({ topic, onSelectQuestion }: SuggestedQuestionsProps) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Questions</h3>
      <div className="flex flex-wrap gap-2">
        {topic.suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(question)}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}