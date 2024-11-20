import { Target, Heart, Brain, Briefcase, Smile, Compass, Shield, Book, Coffee, Users } from 'lucide-react';
import type { CoachingTopic } from '../types/coaching';

export const coachingTopics: CoachingTopic[] = [
  {
    id: 'goal-setting',
    name: 'Goal Setting',
    icon: Target,
    color: 'text-blue-600',
    description: 'Define and achieve your personal and professional goals',
    prompts: [
      "What's the most important goal you'd like to achieve in the next 6 months?",
      "What obstacles have prevented you from reaching your goals in the past?",
      "How would achieving this goal impact your life?"
    ],
    suggestedQuestions: [
      "How can I break down my goals into manageable steps?",
      "What habits can I develop to support my goals?",
      "How do I stay motivated when facing setbacks?"
    ]
  },
  {
    id: 'relationships',
    name: 'Relationships',
    icon: Heart,
    color: 'text-pink-600',
    description: 'Improve your personal and professional relationships',
    prompts: [
      "What relationship would you like to improve the most right now?",
      "What patterns do you notice in your relationships?",
      "How do you handle conflict in your relationships?"
    ],
    suggestedQuestions: [
      "How can I communicate more effectively?",
      "How do I set healthy boundaries?",
      "How can I build deeper connections?"
    ]
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    icon: Brain,
    color: 'text-purple-600',
    description: 'Develop presence and emotional awareness',
    prompts: [
      "How do you currently practice mindfulness?",
      "What situations trigger stress or anxiety for you?",
      "How do you typically respond to challenging emotions?"
    ],
    suggestedQuestions: [
      "How can I start a meditation practice?",
      "What are some quick stress-relief techniques?",
      "How can I be more present in daily life?"
    ]
  },
  {
    id: 'career',
    name: 'Career Growth',
    icon: Briefcase,
    color: 'text-green-600',
    description: 'Advance your professional development',
    prompts: [
      "Where do you see yourself professionally in 3-5 years?",
      "What skills would you like to develop?",
      "What's holding you back in your career?"
    ],
    suggestedQuestions: [
      "How can I prepare for a promotion?",
      "Should I change careers?",
      "How do I improve my work-life balance?"
    ]
  },
  {
    id: 'well-being',
    name: 'Well-being',
    icon: Smile,
    color: 'text-yellow-600',
    description: 'Enhance your overall health and happiness',
    prompts: [
      "How would you rate your current well-being?",
      "What activities bring you the most joy?",
      "What areas of your life need more balance?"
    ],
    suggestedQuestions: [
      "How can I develop better sleep habits?",
      "What self-care practices should I adopt?",
      "How can I boost my energy levels?"
    ]
  }
];