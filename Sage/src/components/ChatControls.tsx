import React from 'react';
import { Trash2, Download } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export function ChatControls() {
  const { clearChat, messages } = useChatStore();

  const handleExport = () => {
    const chatHistory = messages.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp).toLocaleString()
    }));
    
    const blob = new Blob([JSON.stringify(chatHistory, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-end space-x-2 p-2">
      <button
        onClick={handleExport}
        className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
        title="Export chat history"
      >
        <Download className="h-5 w-5" />
      </button>
      <button
        onClick={clearChat}
        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
        title="Clear chat"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}