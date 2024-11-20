import React from 'react';
import { coachingTopics } from '../data/topics';
import { TopicCard } from './TopicCard';
import type { CoachingTopic } from '../types/coaching';

interface CoachingTopicsProps {
  selectedTopic: CoachingTopic | null;
  onSelectTopic: (topic: CoachingTopic) => void;
}

export function CoachingTopics({ selectedTopic, onSelectTopic }: CoachingTopicsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {coachingTopics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          isSelected={selectedTopic?.id === topic.id}
          onSelect={onSelectTopic}
        />
      ))}
    </div>
  );
}