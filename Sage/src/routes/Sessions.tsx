import React from 'react';
import { useChatStore } from '../store/chatStore';
import { format } from 'date-fns';
import { Download } from 'lucide-react';

export function Sessions() {
  const { sessions, currentSessionId, messages, downloadSession } = useChatStore();

  // Combine current session with past sessions
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Coaching Sessions</h1>
      
      <div className="space-y-6">
        {allSessions.map((session) => (
          <div key={session.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {format(new Date(session.startTime), 'MMMM dd, yyyy HH:mm')}
              </h2>
              <button
                onClick={() => downloadSession(session.id)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                title="Download session"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {session.messages.map((message, msgIndex) => (
                <div key={msgIndex} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    message.type === 'user' ? 'bg-indigo-600' : 'bg-gray-400'
                  }`} />
                  <div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(message.timestamp), 'HH:mm')}
                    </div>
                    <div className="text-gray-800">{message.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}