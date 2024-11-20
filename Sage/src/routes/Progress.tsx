import React from 'react';
import { useChatStore } from '../store/chatStore';
import { coachingTopics } from '../data/topics';
import { BarChart, Clock, MessageSquare } from 'lucide-react';

export function Progress() {
  const { sessions, messages, currentSessionId } = useChatStore();

  // Combine current session with past sessions for analysis
  const allSessions = [
    ...(currentSessionId && messages.length > 0
      ? [{
          id: currentSessionId,
          startTime: new Date().toISOString(),
          messages,
        }]
      : []),
    ...sessions,
  ];

  // Calculate cumulative statistics for each topic
  const topicStats = coachingTopics.map(topic => {
    const topicMessages = allSessions.flatMap(session => 
      session.messages.filter(msg => msg.topicId === topic.id)
    );

    const userMessages = topicMessages.filter(msg => msg.type === 'user');
    const aiResponses = topicMessages.filter(msg => msg.type === 'ai');
    
    const sessionsWithTopic = allSessions.filter(session => 
      session.messages.some(msg => msg.topicId === topic.id)
    );

    const lastActive = topicMessages.length > 0
      ? new Date(Math.max(...topicMessages.map(msg => new Date(msg.timestamp).getTime())))
      : null;

    return {
      ...topic,
      totalMessages: topicMessages.length,
      userMessages: userMessages.length,
      aiResponses: aiResponses.length,
      sessionCount: sessionsWithTopic.length,
      lastActive,
    };
  });

  // Calculate overall statistics
  const totalSessions = allSessions.length;
  const totalMessages = allSessions.reduce((sum, session) => sum + session.messages.length, 0);
  const averageMessagesPerSession = totalSessions > 0
    ? Math.round(totalMessages / totalSessions)
    : 0;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Progress Overview</h1>
      
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3 mb-2">
            <BarChart className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold">Total Sessions</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalSessions}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3 mb-2">
            <MessageSquare className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold">Total Messages</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalMessages}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Avg Messages/Session</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{averageMessagesPerSession}</p>
        </div>
      </div>

      {/* Topic-specific Statistics */}
      <h2 className="text-xl font-semibold mb-4">Progress by Topic</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topicStats.map(topic => (
          <div key={topic.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-4">
              <topic.icon className={`h-6 w-6 ${topic.color}`} />
              <h3 className="text-lg font-semibold">{topic.name}</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Sessions</span>
                <span className="font-medium">{topic.sessionCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Your Messages</span>
                <span className="font-medium">{topic.userMessages}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">AI Responses</span>
                <span className="font-medium">{topic.aiResponses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Active</span>
                <span className="font-medium">
                  {topic.lastActive
                    ? new Date(topic.lastActive).toLocaleDateString()
                    : 'Never'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}