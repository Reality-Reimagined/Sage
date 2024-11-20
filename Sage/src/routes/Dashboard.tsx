import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import { format } from 'date-fns';
import { PlusCircle, List } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuthStore();
  const { messages, startNewSession } = useChatStore();
  const navigate = useNavigate();

  const recentSessions = messages.reduce((acc: any[], message) => {
    if (message.type === 'user') {
      const date = format(new Date(message.timestamp), 'MMM dd, yyyy');
      const existingSession = acc.find(session => session.date === date);
      
      if (existingSession) {
        existingSession.messageCount++;
      } else {
        acc.push({ date, messageCount: 1 });
      }
    }
    return acc;
  }, []);

  const handleNewSession = () => {
    startNewSession();
    navigate('/');
  };

  const handleViewAllSessions = () => {
    navigate('/sessions');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.email}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Sessions</h2>
          <div className="space-y-2">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{session.date}</span>
                <span className="text-gray-600">{session.messageCount} messages</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Progress Overview</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Total Sessions</span>
              <span className="text-gray-600">{recentSessions.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Messages</span>
              <span className="text-gray-600">{messages.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={handleNewSession}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <PlusCircle className="h-5 w-5" />
              Start New Session
            </button>
            <button
              onClick={handleViewAllSessions}
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <List className="h-5 w-5" />
              View All Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}