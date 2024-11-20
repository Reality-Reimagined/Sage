import React, { useState, useRef } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { generateResponse } from '../lib/groq';

interface ChatInputProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

export function ChatInput({ isRecording, onToggleRecording }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addMessage, selectedTopic, messages } = useChatStore();
  const recognition = useRef<SpeechRecognition | null>(null);

  const initializeSpeechRecognition = () => {
    if (!recognition.current && 'webkitSpeechRecognition' in window) {
      recognition.current = new webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setMessage(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        onToggleRecording();
      };

      recognition.current.onend = () => {
        onToggleRecording();
      };
    }
  };

  const toggleRecording = () => {
    if (!recognition.current) {
      initializeSpeechRecognition();
    }

    if (recognition.current) {
      if (isRecording) {
        recognition.current.stop();
      } else {
        recognition.current.start();
      }
      onToggleRecording();
    }
  };

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      type: 'user' as const,
      content: message,
      timestamp: new Date().toISOString(),
      topicId: selectedTopic?.id,
    };

    addMessage(userMessage);
    setMessage('');
    setIsLoading(true);

    try {
      const chatHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const response = await generateResponse([
        ...chatHistory,
        { role: 'user', content: message }
      ]);

      addMessage({
        type: 'ai',
        content: response,
        timestamp: new Date().toISOString(),
        topicId: selectedTopic?.id,
      });
    } catch (error) {
      console.error('Failed to generate response:', error);
      addMessage({
        type: 'ai',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
        topicId: selectedTopic?.id,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-gray-50">
      <div className="flex items-center space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
        >
          <Send className="h-5 w-5" />
        </button>
        <button
          onClick={toggleRecording}
          disabled={isLoading}
          className={`p-2 rounded-full transition-colors ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gray-200 hover:bg-gray-300'
          } disabled:bg-gray-300`}
        >
          {isRecording ? (
            <MicOff className="h-5 w-5 text-white" />
          ) : (
            <Mic className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </div>
      {isLoading && (
        <div className="text-sm text-indigo-600 mt-2 text-center animate-pulse">
          Generating response...
        </div>
      )}
      {isRecording && (
        <div className="text-sm text-red-500 mt-2 text-center animate-pulse">
          Recording... Click the microphone to stop.
        </div>
      )}
    </div>
  );
}