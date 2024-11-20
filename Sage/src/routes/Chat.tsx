import React, { useState } from 'react';
import { ChatInput } from '../components/ChatInput';
import { ChatMessage } from '../components/ChatMessage';
import { ChatControls } from '../components/ChatControls';
import { CoachingTopics } from '../components/CoachingTopics';
import { SuggestedQuestions } from '../components/SuggestedQuestions';
import { useChatStore } from '../store/chatStore';
import { generateResponse } from '../lib/groq';
import type { CoachingTopic } from '../types/coaching';

export function Chat() {
  const [isRecording, setIsRecording] = useState(false);
  const { messages, selectedTopic, setSelectedTopic, addMessage } = useChatStore();

  const handleTopicSelect = async (topic: CoachingTopic) => {
    setSelectedTopic(topic);
    
    try {
      const systemMessage = {
        role: 'system',
        content: `You are a professional life coach specializing in ${topic.name.toLowerCase()}. Your goal is to help the user with: ${topic.description}`
      };

      const response = await generateResponse([
        systemMessage,
        { role: 'user', content: topic.prompts[0] }
      ]);

      addMessage({
        type: 'ai',
        content: response,
        timestamp: new Date().toISOString(),
        topicId: topic.id
      });
    } catch (error) {
      console.error('Failed to generate initial response:', error);
      addMessage({
        type: 'ai',
        content: "I'm here to help you with " + topic.name.toLowerCase() + ". How can I assist you today?",
        timestamp: new Date().toISOString(),
        topicId: topic.id
      });
    }
  };

  const handleQuestionSelect = async (question: string) => {
    addMessage({
      type: 'user',
      content: question,
      timestamp: new Date().toISOString(),
      topicId: selectedTopic?.id
    });

    if (selectedTopic) {
      try {
        const chatHistory = messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));

        const response = await generateResponse([
          {
            role: 'system',
            content: `You are a professional life coach specializing in ${selectedTopic.name.toLowerCase()}.`
          },
          ...chatHistory,
          { role: 'user', content: question }
        ]);

        addMessage({
          type: 'ai',
          content: response,
          timestamp: new Date().toISOString(),
          topicId: selectedTopic.id
        });
      } catch (error) {
        console.error('Failed to generate response:', error);
        addMessage({
          type: 'ai',
          content: 'I apologize, but I encountered an error. Please try again.',
          timestamp: new Date().toISOString(),
          topicId: selectedTopic.id
        });
      }
    }
  };

  return (
    <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Your Coaching Session
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Select a topic or start speaking about anything on your mind.
        </p>
      </div>

      <CoachingTopics
        selectedTopic={selectedTopic}
        onSelectTopic={handleTopicSelect}
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 min-h-[400px] max-h-[600px] flex flex-col">
        <ChatControls />
        
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        {selectedTopic && (
          <div className="border-t border-gray-100 dark:border-gray-700 p-4">
            <SuggestedQuestions
              topic={selectedTopic}
              onSelectQuestion={handleQuestionSelect}
            />
          </div>
        )}

        <ChatInput
          isRecording={isRecording}
          onToggleRecording={() => setIsRecording(!isRecording)}
        />
      </div>
    </main>
  );
}