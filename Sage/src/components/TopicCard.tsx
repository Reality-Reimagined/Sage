import React from 'react';
import type { CoachingTopic } from '../types/coaching';

interface TopicCardProps {
  topic: CoachingTopic;
  isSelected: boolean;
  onSelect: (topic: CoachingTopic) => void;
}

export function TopicCard({ topic, isSelected, onSelect }: TopicCardProps) {
  return (
    <button
      onClick={() => onSelect(topic)}
      className={`flex flex-col items-center p-4 rounded-xl border transition-all
        ${
          isSelected
            ? 'bg-indigo-50 border-indigo-200 shadow-md'
            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
        }`}
    >
      <topic.icon className={`h-6 w-6 ${topic.color} mb-2`} />
      <span className="text-sm font-medium text-gray-700">{topic.name}</span>
      {isSelected && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          {topic.description}
        </p>
      )}
    </button>
  );
}